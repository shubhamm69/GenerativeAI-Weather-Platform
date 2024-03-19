import OpenAI from "openai";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

import { ChatCompletionSystemMessageParam } from "openai/resources/index.mjs";
import { getData } from "@/lib/getData";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

async function getInstructionMessage(): Promise<ChatCompletionSystemMessageParam> {
  const data = await getData();
  console.log("Chat Data:" + data)
  return {
    role: "system",
    content: `You are a Weather Report Assistant. I will give you questions related to weather and you will answer them based on the ${data.temperature} temperature and ${data.humidity} humidity. This is the real time information.`,
  };
}

export async function POST(req: Request) {
  try {
    const { userId } = auth();
    const body = await req.json();
    const { messages } = body;

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!openai.apiKey) {
      return new NextResponse("OpenAI API Key not configured", { status: 500 });
    }

    if (!messages) {
      return new NextResponse("Messages are required", { status: 400 });
    }

    const instructionMessage = await getInstructionMessage();

    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [instructionMessage, ...messages],
    });

    console.log(response.choices[0].message);
    return NextResponse.json(response.choices[0].message);
  } catch (error) {
    console.log("[CODE_ERROR]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
