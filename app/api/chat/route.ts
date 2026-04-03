import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";
import { fetchStockAnalysis } from "../../../lib/api";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  baseURL: process.env.OPENAI_BASE_URL,
  defaultHeaders: {
    "HTTP-Referer": "http://localhost:3000", // change after deploy
    "X-Title": "Stock AI Chatbot",
  },
});

const systemPrompt = `You are a financial AI assistant.

Your job is to analyze stock data and explain it clearly in a human-friendly way.

When given stock analysis JSON:
- Explain prediction (UP/DOWN)
- Interpret confidence
- Explain risk level
- Interpret sentiment
- Give final recommendation (BUY / HOLD / SELL)
- Keep it simple and practical

Do NOT just repeat JSON.
Explain insights like a real advisor.`;

export async function POST(request: NextRequest) {
  try {
    const { message } = await request.json();

    if (!message) {
      return NextResponse.json(
        { response: "Message is required" },
        { status: 400 }
      );
    }

    const userMessage = message;

    // ✅ Step 1: Extract stock symbol (reliable)
    const match = userMessage.toUpperCase().match(/\b[A-Z]{2,5}\b/);
    const stock = match ? match[0] : null;

    if (!stock) {
      return NextResponse.json({
        response:
          "Please mention a valid stock symbol like AAPL, TSLA, or MSFT.",
      });
    }

    // ✅ Step 2: Fetch stock data from your API
    let data;
    try {
      data = await fetchStockAnalysis(stock);
    } catch (error) {
      console.error("Stock API error:", error);
      return NextResponse.json({
        response: `I couldn't fetch analysis for ${stock}. The API might be down. Try again later.`,
      });
    }

    // ✅ Step 3: Ask LLM to explain
    const completion = await openai.chat.completions.create({
      model: "meta-llama/llama-3-8b-instruct",
      temperature: 0.7,
      messages: [
        { role: "system", content: systemPrompt },
        {
          role: "user",
          content: `
User asked: "${userMessage}"

Stock data:
${JSON.stringify(data, null, 2)}

Explain clearly:
- What is happening
- Whether it's good to invest
- Risk level
- Final recommendation
          `,
        },
      ],
    });

    const reply = completion.choices[0].message.content;

    return NextResponse.json({ response: reply });

  } catch (error) {
    console.error("Error in chat API:", error);

    return NextResponse.json(
      {
        response:
          "Something went wrong while processing your request. Please try again.",
      },
      { status: 500 }
    );
  }
}