import { StreamingTextResponse, LangChainStream, Message } from "ai";
import { CallbackManager } from "langchain/callbacks";
import { ChatOpenAI } from "langchain/chat_models/openai";
import { AIChatMessage, HumanChatMessage } from "langchain/schema"; // ! this information is outdated or not availabe anymroe

export const runtime = "edge";

export async function POST(req: Request) {
  const { messages, context, langchain } = await req.json();
  console.log("🚀 ~ file: route.ts:10 ~ POST ~ messages:", messages);

  const { stream, handlers } = LangChainStream();

  const llm = new ChatOpenAI({
    streaming: true,
    callbacks: CallbackManager.fromHandlers(handlers),
  });

  llm
    .call(
      (messages as Message[]).map((m) =>
        m.role == "user"
          ? new HumanChatMessage(m.content)
          : new AIChatMessage(m.content)
      )
    )
    .catch(console.error);

  return new StreamingTextResponse(stream);
}
