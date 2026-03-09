import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const notes = body.notes;

    const response = await client.responses.create({
      model: "gpt-4.1-mini",
      input: `
You are a real estate deal triage assistant.

Analyze these seller notes and return:
- Authority
- Timeline
- Financial viability
- Motivation
- Verdict (PURSUE / CAUTION / PASS)

Notes:
${notes}
`
    });

    return Response.json({
      result: response.output_text
    });

  } catch (error) {
    console.error("Analyze error:", error);
    return Response.json({ error: "analysis failed" }, { status: 500 });
  }
}