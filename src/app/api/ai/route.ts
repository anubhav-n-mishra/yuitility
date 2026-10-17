import { NextResponse } from "next/server";
import { LIVE_TOOLS } from "@/src/lib/toolRegistry";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { messages, model, baseUrl, customApiKey } = body;

    const allowedBases = new Set(['https://integrate.api.nvidia.com/v1', 'https://api.openai.com/v1', 'https://api.groq.com/openai/v1']);
    const selectedBase = typeof baseUrl === 'string' ? baseUrl.replace(/\/$/, '') : 'https://integrate.api.nvidia.com/v1';
    if (!allowedBases.has(selectedBase) || !Array.isArray(messages) || messages.length > 12 || messages.some((m: {role?: string; content?: string}) => !m || !['user','assistant','system'].includes(m.role ?? '') || typeof m.content !== 'string' || m.content.length > 16000)) {
      return NextResponse.json({error: 'Invalid provider or messages.'}, {status: 400});
    }
    if (customApiKey && (typeof customApiKey !== 'string' || customApiKey.length > 512)) return NextResponse.json({error:'Invalid key.'}, {status:400});
    // A user-controlled destination must never receive the server-owned key.
    const apiKey = customApiKey || (selectedBase === 'https://integrate.api.nvidia.com/v1' ? process.env.NVIDIA_NIM_API_KEY : '') || '';
    const targetUrl = `${selectedBase}/chat/completions`;
    const targetModel = typeof model === 'string' && model.length <= 150 ? model : 'nvidia/nemotron-mini-4b-instruct';

    if (!apiKey) return NextResponse.json({ error: 'AI is unavailable until a provider key is configured.' }, { status: 503 });

    const response = await fetch(targetUrl, {
      method: "POST",
      redirect: "error",
      signal: AbortSignal.timeout(30000),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: targetModel,
        messages: messages,
        temperature: 0.5,
        max_tokens: 512,
      }),
    });

    if (!response.ok) {
      console.error("[YUI API Error] Provider status:", response.status);
      return NextResponse.json({ error: 'The AI provider could not complete this request. Check your settings or try again later.' }, { status: 502 });
    }

    const data = await response.json();
    const reply = data.choices?.[0]?.message?.content || `How can I assist with Yuitility's ${LIVE_TOOLS.length} browser tools?`;

    return NextResponse.json({ reply });
  } catch {
    return NextResponse.json({ error: 'The request could not be completed.' }, { status: 400 });
  }
}
