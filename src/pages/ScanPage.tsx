import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Camera, X, Zap, RotateCcw, Image } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { dentalObjects } from '@/data/dentalData';

export default function ScanPage() {
  const navigate = useNavigate();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isScanning, setIsScanning] = useState(false);
  const [hasCamera, setHasCamera] = useState(false);
  const [detectedObject, setDetectedObject] = useState<typeof dentalObjects[0] | null>(null);
  const [confidence, setConfidence] = useState(0);

  useEffect(() => {
    startCamera();
    return () => {
      stopCamera();
    };
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
    } catch (err) {
      console.log('Camera not available, using demo mode');
      setHasCamera(false);
    }
  };

  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const tracks = (videoRef.current.srcObject as MediaStream).getTracks();
      tracks.forEach((track) => track.stop());
    }
  };

  const handleScan = () => {
    setIsScanning(true);
    setConfidence(0);

    // Simulate AI detection with progressive confidence
    const interval = setInterval(() => {
      setConfidence((prev) => {
        if (prev >= 95) {
          clearInterval(interval);
          // Pick a random object for demo
          const randomObject =
            dentalObjects[Math.floor(Math.random() * dentalObjects.length)];
          setDetectedObject(randomObject);
          setIsScanning(false);
          return 95;
        }
        return prev + Math.random() * 20;
      });
    }, 200);
  };

  const handleReset = () => {
    setDetectedObject(null);
    setConfidence(0);
  };

  return (
    <div className="min-h-screen bg-foreground relative overflow-hidden">
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
              <p className="text-xs mt-1 opacity-60">Demo mode active</p>
            </div>
          </div>
        )}
      </div>

      {/* Overlay */}
      <div className="absolute inset-0 bg-foreground/20" />

      {/* Header */}
      <div className="absolute top-0 left-0 right-0 z-10">
        <div className="glass-strong m-4 rounded-xl px-4 py-3 flex items-center justify-between">
          <Button
            variant="ghost"
            size="icon-sm"
            onClick={() => navigate(-1)}
            className="text-foreground"
          >
            <X className="w-5 h-5" />
          </Button>
          <h1 className="font-semibold text-foreground">Scan Object</h1>
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
          {/* Corner markers */}
          <div className="w-64 h-64 relative">
            <div className="absolute top-0 left-0 w-12 h-12 border-l-4 border-t-4 border-primary rounded-tl-xl" />
            <div className="absolute top-0 right-0 w-12 h-12 border-r-4 border-t-4 border-primary rounded-tr-xl" />
            <div className="absolute bottom-0 left-0 w-12 h-12 border-l-4 border-b-4 border-primary rounded-bl-xl" />
            <div className="absolute bottom-0 right-0 w-12 h-12 border-r-4 border-b-4 border-primary rounded-br-xl" />

            {/* Scan line animation */}
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

      {/* Instructions */}
      <AnimatePresence mode="wait">
        {!detectedObject && !isScanning && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-1/3 left-0 right-0 text-center px-4"
          >
            <p className="text-primary-foreground text-sm font-medium drop-shadow-lg">
              Align the dental object within the frame
            </p>
          </motion.div>
        )}

        {isScanning && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute top-1/3 left-0 right-0 text-center px-4"
          >
            <div className="inline-flex items-center gap-2 bg-primary/90 text-primary-foreground px-4 py-2 rounded-full">
              <Zap className="w-4 h-4 animate-pulse" />
              <span className="text-sm font-medium">
                Analyzing... {Math.round(confidence)}%
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Detection Result */}
      <AnimatePresence>
        {detectedObject && (
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 100 }}
            className="absolute bottom-0 left-0 right-0 z-20"
          >
            <div className="glass-strong mx-4 mb-24 rounded-2xl p-4">
              <div className="flex items-start gap-4">
                <div className="w-16 h-16 bg-primary/10 rounded-xl flex items-center justify-center text-3xl shrink-0">
                  {detectedObject.category === 'material' && '🧪'}
                  {detectedObject.category === 'instrument' && '🔧'}
                  {detectedObject.category === 'tooth' && '🦷'}
                  {detectedObject.category === 'equipment' && '⚙️'}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-medium text-success bg-success/10 px-2 py-0.5 rounded-full">
                      {Math.round(confidence)}% match
                    </span>
                  </div>
                  <h3 className="font-semibold text-foreground truncate">
                    {detectedObject.name}
                  </h3>
                  <p className="text-sm text-muted-foreground capitalize">
                    {detectedObject.category}
                  </p>
                </div>
              </div>

              <div className="flex gap-2 mt-4">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleReset}
                  className="flex-1"
                >
                  <RotateCcw className="w-4 h-4 mr-1" />
                  Scan Again
                </Button>
                <Button
                  size="sm"
                  onClick={() => navigate(`/object/${detectedObject.id}`)}
                  className="flex-1"
                >
                  View Details
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Capture Button */}
      {!detectedObject && (
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
