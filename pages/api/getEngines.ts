import type { NextApiRequest, NextApiResponse } from "next";
import openai from "@/lib/chatgpt";

type Option = {
  value: string;
  label: string;
};

type Data = {
  modelOptions: Option[];
};

/**
 * Handles the Next.js API request and retrieves a list of models from OpenAI.
 *
 * @param {NextApiRequest} req - The request object.
 * @param {NextApiResponse<Data>} res - The response object.
 * @returns {Promise<void>}
 */
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  // Retrieves a list of models from OpenAI and returns the data.
  const models = await openai.models.list().then((res) => {
    return res.data;
  });

  // sort received models alphabetically
  const modelOptions = models
    .map((model) => ({
      value: model.id,
      label: model.id,
    }))
    .sort((a, b) => a.label.localeCompare(b.label));

  res.status(200).json({ modelOptions });
}
