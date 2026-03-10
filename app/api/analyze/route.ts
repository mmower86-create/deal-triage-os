import { NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const notes: string = body?.notes ?? "";
    
    if (!notes || notes.trim() === "") {
      return NextResponse.json(
        { error: "No seller notes provided." },
        { status: 400 }
      );
    }

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: `You are Deal Triage OS, an expert system for real estate wholesalers. 
          
          Analyze the seller notes and return ONLY a valid JSON object with EXACTLY this structure, no other text:
          {
            "classification": "CHASE" or "PARK" or "DROP",
            "score_breakdown": {
              "authority_score": number between 0-5,
              "timeline_score": number between 0-5,
              "priority_score": number between 0-5,
              "cooperation_score": number between 0-5
            },
            "extracted_signals": {
              "timeline_days": number or null,
              "listing_trigger_days": number or null,
              "decision_maker_count": number or null,
              "authority_aligned": "yes" or "no" or "partial",
              "payoff_known": boolean,
              "retail_anchor": number or null,
              "motivation_strength": "low" or "medium" or "high",
              "occupancy_type": "owner" or "tenant" or "vacant",
              "cooperation_level": "low" or "moderate" or "high"
            },
            "immediate_next_action": {
              "action": string,
              "why": string
            }
          }
          
          Base your analysis only on what's in the notes. Be concise and accurate.`
        },
        {
          role: "user",
          content: notes
        }
      ],
      response_format: { type: "json_object" },
      temperature: 0.3,
    });

    const result = JSON.parse(completion.choices[0].message.content || "{}");
    
    return NextResponse.json(result);

  } catch (error: any) {
    console.error("OpenAI API error:", error);
    return NextResponse.json(
      { error: error.message || "Analysis failed" },
      { status: 500 }
    );
  }
}