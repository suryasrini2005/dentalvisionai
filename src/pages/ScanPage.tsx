import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Camera, X, Zap, RotateCcw, Image, AlertCircle, Crown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { dentalObjects } from '@/data/dentalData';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { useAuth } from '@/contexts/AuthContext';
import { useSubscription } from '@/hooks/useSubscription';
import { PaywallModal } from '@/components/PaywallModal';

interface AIResult {
  name: string;
  category: 'material' | 'instrument' | 'tooth' | 'equipment';
  subcategory?: string;
  confidence: number;
  description: string;
  keyFeatures: string[];
  clinicalUse: string;
}

export default function ScanPage() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { isPro } = useSubscription();
  const [showPaywall, setShowPaywall] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isScanning, setIsScanning] = useState(false);
  const [hasCamera, setHasCamera] = useState(false);
  const [aiResult, setAiResult] = useState<AIResult | null>(null);
  const [matchedObject, setMatchedObject] = useState<typeof dentalObjects[0] | null>(null);
  const [scanPhase, setScanPhase] = useState<'idle' | 'capturing' | 'analyzing' | 'done'>('idle');
  const [freeScansUsed, setFreeScansUsed] = useState(() => {
    return parseInt(localStorage.getItem('freeScansUsed') || '0', 10);
  });
  const FREE_SCAN_LIMIT = 3;

  useEffect(() => {
    startCamera();
    return () => stopCamera();
  }, []);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment' },
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        setHasCamera(true);
      }
    } catch {
      setHasCamera(false);
    }
  };

  const stopCamera = () => {
    if (videoRef.current?.srcObject) {
      (videoRef.current.srcObject as MediaStream).getTracks().forEach(t => t.stop());
    }
  };

  const captureFrame = (): string | null => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (!video || !canvas) return null;

    canvas.width = video.videoWidth || 640;
    canvas.height = video.videoHeight || 480;
    const ctx = canvas.getContext('2d');
    if (!ctx) return null;

    ctx.drawImage(video, 0, 0);
    const dataUrl = canvas.toDataURL('image/jpeg', 0.8);
    return dataUrl.split(',')[1]; // return base64 only
  };

  const handleScan = async () => {
    setIsScanning(true);
    setScanPhase('capturing');

    let imageBase64: string | null = null;

    if (hasCamera) {
      imageBase64 = captureFrame();
    }

    if (!imageBase64) {
      // Demo mode: create a realistic-sized placeholder
      toast.info('No camera available — running in demo mode');
      const canvas = document.createElement('canvas');
      canvas.width = 640;
      canvas.height = 480;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        // Draw a simple dental-themed scene
        ctx.fillStyle = '#e8e8e8';
        ctx.fillRect(0, 0, 640, 480);
        ctx.fillStyle = '#cccccc';
        ctx.fillRect(200, 150, 240, 180);
        ctx.fillStyle = '#888888';
        ctx.font = 'bold 24px sans-serif';
        ctx.fillText('Dental Object', 230, 250);
        ctx.font = '16px sans-serif';
        ctx.fillText('Demo Image', 255, 280);
      }
      imageBase64 = canvas.toDataURL('image/jpeg', 0.8).split(',')[1];
    }

    setScanPhase('analyzing');

    try {
      const { data, error } = await supabase.functions.invoke('identify-dental-object', {
        body: { imageBase64 },
      });

      if (error) {
        throw new Error(error.message || 'AI analysis failed');
      }

      if (data?.error) {
        throw new Error(data.error);
      }

      const result = data as AIResult;
      setAiResult(result);

      // Try to match with local data
      const matched = dentalObjects.find(obj => {
        const nameMatch = obj.name.toLowerCase().includes(result.name.toLowerCase()) ||
          result.name.toLowerCase().includes(obj.name.toLowerCase());
        const categoryMatch = obj.category === result.category;
        return nameMatch && categoryMatch;
      }) || dentalObjects.find(obj => {
        return result.name.toLowerCase().split(' ').some(word =>
          word.length > 3 && obj.name.toLowerCase().includes(word)
        ) && obj.category === result.category;
      });

      setMatchedObject(matched || null);
      setScanPhase('done');
      if (!isPro) {
        const newCount = freeScansUsed + 1;
        setFreeScansUsed(newCount);
        localStorage.setItem('freeScansUsed', String(newCount));
      }
    } catch (err: any) {
      console.error('Scan error:', err);
      toast.error(err.message || 'Failed to analyze image');
      setScanPhase('idle');
    } finally {
      setIsScanning(false);
    }
  };

  const handleReset = () => {
    setAiResult(null);
    setMatchedObject(null);
    setScanPhase('idle');
  };

  const getCategoryEmoji = (category: string) => {
    const map: Record<string, string> = {
      material: '🧪',
      instrument: '🔧',
      tooth: '🦷',
      equipment: '⚙️',
    };
    return map[category] || '❓';
  };

  return (
    <div className="min-h-screen bg-foreground relative overflow-hidden">
      {/* Hidden canvas for frame capture */}
      <canvas ref={canvasRef} className="hidden" />

      {/* Camera View */}
      <div className="absolute inset-0">
        {hasCamera ? (
          <video
            ref={videoRef}
            autoPlay
            playsInline
            muted
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-muted to-muted/80 flex items-center justify-center">
            <div className="text-center text-muted-foreground">
              <Camera className="w-16 h-16 mx-auto mb-4 opacity-30" />
              <p className="text-sm">Camera preview</p>
              <p className="text-xs mt-1 opacity-60">Demo mode — AI will still analyze</p>
            </div>
          </div>
        )}
      </div>

      {/* Overlay */}
      <div className="absolute inset-0 bg-foreground/20" />

      {/* Header */}
      <div className="absolute top-0 left-0 right-0 z-10">
        <div className="glass-strong m-4 rounded-xl px-4 py-3 flex items-center justify-between">
          <Button variant="ghost" size="icon-sm" onClick={() => navigate(-1)} className="text-foreground">
            <X className="w-5 h-5" />
          </Button>
          <h1 className="font-semibold text-foreground">AI Scan</h1>
          <Button variant="ghost" size="icon-sm" className="text-foreground">
            <Image className="w-5 h-5" />
          </Button>
        </div>
      </div>

      {/* Scan Frame */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <motion.div
          animate={isScanning ? { scale: [1, 1.02, 1] } : {}}
          transition={{ duration: 1, repeat: Infinity }}
          className="relative"
        >
          <div className="w-64 h-64 relative">
            <div className="absolute top-0 left-0 w-12 h-12 border-l-4 border-t-4 border-primary rounded-tl-xl" />
            <div className="absolute top-0 right-0 w-12 h-12 border-r-4 border-t-4 border-primary rounded-tr-xl" />
            <div className="absolute bottom-0 left-0 w-12 h-12 border-l-4 border-b-4 border-primary rounded-bl-xl" />
            <div className="absolute bottom-0 right-0 w-12 h-12 border-r-4 border-b-4 border-primary rounded-br-xl" />

            {isScanning && (
              <motion.div
                className="absolute left-0 right-0 h-1 bg-primary shadow-glow"
                animate={{ top: ['0%', '100%'] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
              />
            )}
          </div>
        </motion.div>
      </div>

      {/* Status Messages */}
      <AnimatePresence mode="wait">
        {scanPhase === 'idle' && (
          <motion.div
            key="idle"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-1/3 left-0 right-0 text-center px-4"
          >
            <p className="text-primary-foreground text-sm font-medium drop-shadow-lg">
              Point at a dental material or instrument
            </p>
          </motion.div>
        )}

        {scanPhase === 'capturing' && (
          <motion.div
            key="capturing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute top-1/3 left-0 right-0 text-center px-4"
          >
            <div className="inline-flex items-center gap-2 bg-primary/90 text-primary-foreground px-4 py-2 rounded-full">
              <Camera className="w-4 h-4" />
              <span className="text-sm font-medium">Capturing image...</span>
            </div>
          </motion.div>
        )}

        {scanPhase === 'analyzing' && (
          <motion.div
            key="analyzing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute top-1/3 left-0 right-0 text-center px-4"
          >
            <div className="inline-flex items-center gap-2 bg-primary/90 text-primary-foreground px-4 py-2 rounded-full">
              <Zap className="w-4 h-4 animate-pulse" />
              <span className="text-sm font-medium">AI analyzing...</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* AI Detection Result */}
      <AnimatePresence>
        {scanPhase === 'done' && aiResult && (
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 100 }}
            className="absolute bottom-0 left-0 right-0 z-20"
          >
            <div className="glass-strong mx-4 mb-24 rounded-2xl p-4 max-h-[50vh] overflow-y-auto">
              <div className="flex items-start gap-4">
                <div className="w-16 h-16 bg-primary/10 rounded-xl flex items-center justify-center text-3xl shrink-0">
                  {getCategoryEmoji(aiResult.category)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                      aiResult.confidence >= 70
                        ? 'text-success bg-success/10'
                        : aiResult.confidence >= 40
                        ? 'text-warning bg-warning/10'
                        : 'text-destructive bg-destructive/10'
                    }`}>
                      {Math.round(aiResult.confidence)}% confidence
                    </span>
                  </div>
                  <h3 className="font-semibold text-foreground">{aiResult.name}</h3>
                  <p className="text-sm text-muted-foreground capitalize">
                    {aiResult.subcategory ? `${aiResult.subcategory} · ` : ''}{aiResult.category}
                  </p>
                </div>
              </div>

              {/* AI Description */}
              <p className="text-sm text-muted-foreground mt-3">{aiResult.description}</p>

              {/* Key Features */}
              {aiResult.keyFeatures.length > 0 && (
                <div className="mt-3">
                  <p className="text-xs font-semibold text-foreground mb-1">Key Features</p>
                  <div className="flex flex-wrap gap-1.5">
                    {aiResult.keyFeatures.map((f, i) => (
                      <span key={i} className="text-xs bg-muted text-muted-foreground px-2 py-0.5 rounded-full">
                        {f}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Clinical Use */}
              <div className="mt-3">
                <p className="text-xs font-semibold text-foreground mb-1">Clinical Use</p>
                <p className="text-xs text-muted-foreground">{aiResult.clinicalUse}</p>
              </div>

              {/* Low confidence warning */}
              {aiResult.confidence < 40 && (
                <div className="mt-3 flex items-start gap-2 bg-destructive/10 rounded-lg p-2">
                  <AlertCircle className="w-4 h-4 text-destructive shrink-0 mt-0.5" />
                  <p className="text-xs text-destructive">
                    Low confidence — try better lighting or a closer angle.
                  </p>
                </div>
              )}

              <div className="flex gap-2 mt-4">
                <Button variant="outline" size="sm" onClick={handleReset} className="flex-1">
                  <RotateCcw className="w-4 h-4 mr-1" />
                  Scan Again
                </Button>
                {matchedObject ? (
                  <Button size="sm" onClick={() => navigate(`/object/${matchedObject.id}`)} className="flex-1">
                    View Full Details
                  </Button>
                ) : (
                  <Button size="sm" variant="secondary" onClick={() => navigate('/search')} className="flex-1">
                    Search Database
                  </Button>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Capture Button */}
      {scanPhase !== 'done' && (
        <div className="absolute bottom-8 left-0 right-0 flex justify-center z-10">
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={handleScan}
            disabled={isScanning}
            className="w-20 h-20 rounded-full gradient-primary shadow-lg flex items-center justify-center disabled:opacity-70"
          >
            <div className="w-16 h-16 rounded-full border-4 border-primary-foreground/30 flex items-center justify-center">
              {isScanning ? (
                <div className="w-6 h-6 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin" />
              ) : (
                <Camera className="w-8 h-8 text-primary-foreground" />
              )}
            </div>
          </motion.button>
        </div>
      )}
    </div>
  );
}
