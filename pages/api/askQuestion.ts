import query from "@/lib/queryApi";
import type { NextApiRequest, NextApiResponse } from "next";
import admin from "firebase-admin";
import { adminDb } from "@/firebaseAdmin";

type Data = {
  answer: string;
};

/**
 * Handles the Next.js API request for asking question to openai chatgpt
 *
 * @param {NextApiRequest} req - The request object.
 * @param {NextApiResponse<Data>} res - The response object.
 * @returns {Promise<void>}
 */
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { prompt, chatId, model, session, promptSettings } = req.body;
  if (!prompt || !chatId || !model || !session || !promptSettings) {
    return res.status(400).json({ answer: "Missing parameters" });
  }

  /**
   * Fetches a list of messages from the "messages" collection within a specific chat in the "users" collection of Firebase, ordered by creation time.
   *
   * @returns {Promise<OpenAIMessage[]>} - A promise that resolves with an array of messages, with each message containing the role and content.
   */
  const messagesList = await adminDb
    .collection("users")
    .doc(session?.user?.email)
    .collection("chats")
    .doc(chatId)
    .collection("messages")
    .orderBy("createdAt", "asc")
    .get()
    .then((querySnapshot) => {
      const messages: OpenAIMessage[] = [];
      querySnapshot.forEach((doc) => {
        messages.push({ role: doc.data().user.name, content: doc.data().text });
      });
      return messages;
    });

  // ChatGPT Query
  const response = await query(messagesList, model, promptSettings);

  // organize information from the response into a ChatGPTMessage
  const message: ChatGPTMessage = {
    text:
      response.choices[0].message.content ||
      "ChatGPT was unable to find an answer for that!",
    finish: response.choices[0].finish_reason,
    createdAt: admin.firestore.Timestamp.now(),
    model: response.model,
    promptTokens: response.usage?.prompt_tokens,
    completionTokens: response.usage?.completion_tokens,
    totalTokens: response.usage?.total_tokens,

    temperature: promptSettings.temperature,
    topP: promptSettings.topP,
    frequencyPenalty: promptSettings.frequencyPenalty,
    presencePenalty: promptSettings.presencePenalty,
    maxTokens: promptSettings.maxTokens,

    user: {
      _id: "assistant",
      name: "assistant",
      avatar:
        "https://upload.wikimedia.org/wikipedia/commons/0/04/ChatGPT_logo.svg",
    },
  };

  // Save message to Firestore
  await adminDb
    .collection("users")
    .doc(session?.user?.email)
    .collection("chats")
    .doc(chatId)
    .collection("messages")
    .add(message);

  res.status(200).json({ answer: message.text });
}
