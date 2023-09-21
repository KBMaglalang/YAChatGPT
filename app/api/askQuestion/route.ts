import query from "@/lib/queryApi";
import type { NextApiRequest, NextApiResponse } from "next";
import admin from "firebase-admin";
import { adminDb } from "@/firebaseAdmin";
import { NextResponse } from "next/server";

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
// export default async function handler(
//   req: NextApiRequest,
//   res: NextApiResponse<Data>
// ) {
//   try {
//     const { prompt, chatId, model, session, promptSettings } = req.body;

//     // Input validation
//     if (!prompt || !chatId || !model || !session || !promptSettings) {
//       return res.status(400).json({ answer: "Missing parameters" });
//     }

//     // Check if user is authenticated
//     if (!session?.user?.email) {
//       return res.status(403).json({ answer: "Unauthorized" });
//     }

//     /**
//      * Fetches a list of messages from the "messages" collection within a specific chat in the "users" collection of Firebase, ordered by creation time.
//      *
//      * @returns {Promise<OpenAIMessage[]>} - A promise that resolves with an array of messages, with each message containing the role and content.
//      */
//     const messagesList = await adminDb
//       .collection("users")
//       .doc(session?.user?.email)
//       .collection("chats")
//       .doc(chatId)
//       .collection("messages")
//       .orderBy("createdAt", "asc")
//       .get()
//       .then((querySnapshot) => {
//         const messages: OpenAIMessage[] = [];
//         querySnapshot.forEach((doc) => {
//           messages.push({
//             role: doc.data().user.name,
//             content: doc.data().text,
//           });
//         });
//         return messages;
//       });

//     // ChatGPT Query
//     const response = await query(messagesList, model, promptSettings);

//     // organize information from the response into a ChatGPTMessage
//     const message: ChatGPTMessage = {
//       text:
//         response.choices[0].message.content ||
//         "ChatGPT was unable to find an answer for that!",
//       finish: response.choices[0].finish_reason,
//       createdAt: admin.firestore.Timestamp.now(),
//       model: response.model,
//       promptTokens: response.usage?.prompt_tokens,
//       completionTokens: response.usage?.completion_tokens,
//       totalTokens: response.usage?.total_tokens,

//       temperature: promptSettings.temperature,
//       topP: promptSettings.topP,
//       frequencyPenalty: promptSettings.frequencyPenalty,
//       presencePenalty: promptSettings.presencePenalty,
//       maxTokens: promptSettings.maxTokens,

//       user: {
//         _id: "assistant",
//         name: "assistant",
//         avatar:
//           "https://upload.wikimedia.org/wikipedia/commons/0/04/ChatGPT_logo.svg",
//       },
//     };

//     // Save message to Firestore
//     await adminDb
//       .collection("users")
//       .doc(session?.user?.email)
//       .collection("chats")
//       .doc(chatId)
//       .collection("messages")
//       .add(message);

//     res.status(200).json({ answer: message.text });
//   } catch (error) {
//     console.error("Error in handler:", (error as Error).message); // Type assertion
//     res.status(500).json({ answer: "Internal Server Error" });
//   }
// }

// ------------------------------------------------------------

// export async function GET(request: Request) {}

// export async function HEAD(request: Request) {}

export async function POST(req: Request) {
  try {
    const { prompt, chatId, model, session, promptSettings } = await req.json();

    // Input validation
    if (!prompt || !chatId || !model || !session || !promptSettings) {
      // return res.status(400).json({ answer: "Missing parameters" });
      return NextResponse.json(
        {
          answer: "Missing parameters",
        },
        { status: 400 }
      );
    }

    // Check if user is authenticated
    if (!session?.user?.email) {
      // return res.status(403).json({ answer: "Unauthorized" });
      return NextResponse.json(
        {
          answer: "Unauthorized",
        },
        { status: 403 }
      );
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
          messages.push({
            role: doc.data().user.name,
            content: doc.data().text,
          });
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

    // res.status(200).json({ answer: message.text });
    return NextResponse.json(
      {
        answer: message.text,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error in handler:", (error as Error).message); // Type assertion
    return NextResponse.json(
      {
        answer: "Internal Server Error",
      },
      { status: 500 }
    );
  }
}

// export async function PUT(request: Request) {}

// export async function DELETE(request: Request) {}

// export async function PATCH(request: Request) {}

// // If `OPTIONS` is not defined, Next.js will automatically implement `OPTIONS` and  set the appropriate Response `Allow` header depending on the other methods defined in the route handler.
// export async function OPTIONS(request: Request) {}
