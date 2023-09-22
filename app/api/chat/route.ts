import { StreamingTextResponse, LangChainStream, Message } from "ai";
import { CallbackManager } from "langchain/callbacks";
import { ChatOpenAI } from "langchain/chat_models/openai";
import { AIMessage, HumanMessage } from "langchain/schema"; // ! this information is outdated or not availabe anymroe
import { NextResponse } from "next/server";

export const runtime = "edge";

export async function POST(req: Request) {
  try {
    const { messages, settings } = await req.json();

    // should do messages validation
    if (!messages) {
      return NextResponse.json(
        {
          message: "Internal Server Error",
        },
        { status: 500 }
      );
    }

    // should do settings validation
    if (!settings) {
      return NextResponse.json(
        {
          message: "Internal Server Error",
        },
        { status: 500 }
      );
    }

    const { stream, handlers } = LangChainStream();
    const llm = new ChatOpenAI({
      streaming: true,

      temperature: settings?.temperature || 0.8,
      maxTokens: settings?.max_tokens || 1000,
      topP: settings?.top_p || 1,
      frequencyPenalty: settings?.frequencyPenalty || 0,
      presencePenalty: settings?.presencePenalty || 0,
      modelName: settings?.modelName || "gpt-3.5-turbo",

      callbacks: CallbackManager.fromHandlers(handlers),
    });

    llm
      .call(
        (messages as Message[]).map((m) =>
          m.role == "user"
            ? new HumanMessage(m.content)
            : new AIMessage(m.content)
        )
      )
      .catch(console.error);

    return new StreamingTextResponse(stream);
  } catch (error) {
    // handle error
    console.error("Error in handler:", (error as Error).message); // Type assertion
    return NextResponse.json(
      {
        message: "Internal Server Error",
      },
      { status: 500 }
    );
  }
}
