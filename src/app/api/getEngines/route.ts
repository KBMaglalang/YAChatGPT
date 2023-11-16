// import type { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";
// import openai from "@/lib/chatgpt";
// import { openai } from "@/config/openai";
import { openai } from "@/config/openai/chatgpt";

// type Option = {
//   value: string;
//   label: string;
// };

// type Data = {
//   modelOptions: Option[];
// };

/**
 * Handles the Next.js API request and retrieves a list of models from OpenAI.
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
//     // Retrieves a list of models from OpenAI and returns the data.
//     const models = await openai.models.list().then((res) => res.data);

//     // sort received models alphabetically
//     const modelOptions = models
//       .map((model) => ({
//         value: model.id,
//         label: model.id,
//       }))
//       .sort((a, b) => a.label.localeCompare(b.label));

//     res.status(200).json({ modelOptions });
//   } catch (err) {
//     console.error("Error querying OpenAI models:", (err as Error).message); // log the error for debugging purposes
//     res.status(500).json({
//       modelOptions: [{ value: "Error", label: "Error fetching OpenAI models" }],
//     });
//   }
// }

// ----------------------------------------------------------------------------------------------------------

// export async function POST(request: Request) {}

export async function GET() {
  try {
    // Retrieves a list of models from OpenAI and returns the data.
    const models = await openai.models.list().then((res) => res.data);

    // sort received models alphabetically
    const modelOptions = models
      .map((model) => ({
        value: model.id,
        label: model.id,
      }))
      .sort((a, b) => a.label.localeCompare(b.label));

    return NextResponse.json(
      {
        modelOptions,
      },
      { status: 200 }
    );
  } catch (err) {
    console.error("Error querying OpenAI models:", (err as Error).message); // log the error for debugging purposes

    return NextResponse.json(
      {
        modelOptions: [
          { value: "Error", label: "Error fetching OpenAI models" },
        ],
        error: "Internal Server Error",
      },
      { status: 500 }
    );
  }
}

// export async function PUT(request: Request) {}

// export async function PATCH(request: Request) {}

// export async function DELETE(request: Request) {}
// export async function HEAD(request: Request) {}

// If `OPTIONS` is not defined, Next.js will automatically implement `OPTIONS` and  set the appropriate Response `Allow` header depending on the other methods defined in the route handler.
// export async function OPTIONS(request: Request) {}
