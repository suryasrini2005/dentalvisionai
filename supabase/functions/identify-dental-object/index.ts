import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { imageBase64 } = await req.json();
    if (!imageBase64) {
      return new Response(JSON.stringify({ error: "No image provided" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    const systemPrompt = `You are an expert dental professional and educator. Analyze the provided image and identify any dental materials, instruments, equipment, or teeth visible. 

You must call the identify_dental_object function with your analysis. Be specific about the exact type, brand-agnostic name, category, and provide educational details.

Categories: material, instrument, tooth, equipment

For materials, identify specific types like: Glass Ionomer Cement, Composite Resin, Amalgam, Alginate, PVS/Addition Silicone, Polyether, Polysulfide, Zinc Phosphate Cement, ZOE, Resin Cement, RMGIC, Impression Compound, Agar, Condensation Silicone, Vinyl Polyether Silicone.

For instruments, identify types like: Dental Explorer, Mouth Mirror, K-File, H-File, Spreader, Plugger, Gates-Glidden Drill, Band Pusher, Ligature Cutter, Bracket Holder, Weingart Plier, Extraction Forceps, Elevator, Periosteal Elevator, Gracey Curette, Universal Curette, Sickle Scaler, Periodontal Probe, Face Bow, Crown Remover.

If the image doesn't contain any dental object, still call the function but set confidence to 0 and name to "Unknown".`;

    const response = await fetch(
      "https://ai.gateway.lovable.dev/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${LOVABLE_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "google/gemini-2.5-flash",
          messages: [
            { role: "system", content: systemPrompt },
            {
              role: "user",
              content: [
                {
                  type: "image_url",
                  image_url: { url: `data:image/jpeg;base64,${imageBase64}` },
                },
                {
                  type: "text",
                  text: "Identify the dental object(s) in this image. Provide detailed information.",
                },
              ],
            },
          ],
          tools: [
            {
              type: "function",
              function: {
                name: "identify_dental_object",
                description:
                  "Return identification results for a dental object in an image",
                parameters: {
                  type: "object",
                  properties: {
                    name: {
                      type: "string",
                      description: "Name of the identified dental object",
                    },
                    category: {
                      type: "string",
                      enum: ["material", "instrument", "tooth", "equipment"],
                      description: "Category of the dental object",
                    },
                    subcategory: {
                      type: "string",
                      description:
                        "Subcategory (e.g., Restorative, Impression, Diagnostic, Endodontic)",
                    },
                    confidence: {
                      type: "number",
                      description: "Confidence score from 0 to 100",
                    },
                    description: {
                      type: "string",
                      description:
                        "Brief educational description of the identified object",
                    },
                    keyFeatures: {
                      type: "array",
                      items: { type: "string" },
                      description:
                        "Key identifying features visible in the image",
                    },
                    clinicalUse: {
                      type: "string",
                      description: "Primary clinical use/application",
                    },
                  },
                  required: [
                    "name",
                    "category",
                    "confidence",
                    "description",
                    "keyFeatures",
                    "clinicalUse",
                  ],
                  additionalProperties: false,
                },
              },
            },
          ],
          tool_choice: {
            type: "function",
            function: { name: "identify_dental_object" },
          },
        }),
      }
    );

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: "Rate limit exceeded. Please try again shortly." }),
          { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: "AI credits exhausted. Please add credits in workspace settings." }),
          { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      const errorText = await response.text();
      console.error("AI gateway error:", response.status, errorText);
      throw new Error(`AI gateway error: ${response.status}`);
    }

    const data = await response.json();
    const toolCall = data.choices?.[0]?.message?.tool_calls?.[0];

    if (!toolCall) {
      throw new Error("No tool call in AI response");
    }

    const result = JSON.parse(toolCall.function.arguments);

    return new Response(JSON.stringify(result), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("identify-dental-object error:", e);
    return new Response(
      JSON.stringify({
        error: e instanceof Error ? e.message : "Unknown error",
      }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});
