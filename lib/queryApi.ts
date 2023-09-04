import openai from "./chatgpt";

/**
 * Performs a query to the OpenAI chat completions API.
 *
 * @param {OpenAIMessage[]} prompt - The prompt messages.
 * @param {string} model - The model to use for completion.
 * @param {{
 *   temperature: number;
 *   topP: number;
 *   frequencyPenalty: number;
 *   presencePenalty: number;
 *   maxTokens: number;
 * }} promptSettings - The settings for the prompt.
 * @returns {Promise<any>} - The completion response from the API.
 * @throws {Error} - If the API call fails.
 */
const query = async (
  prompt: OpenAIMessage[],
  model: string,
  promptSettings: {
    temperature: number;
    topP: number;
    frequencyPenalty: number;
    presencePenalty: number;
    maxTokens: number;
  }
) => {
  const res = await openai.chat.completions
    .create({
      model,
      messages: prompt,
      temperature: promptSettings.temperature || 0.9,
      top_p: promptSettings.topP || 1,

      max_tokens: promptSettings.maxTokens || 1000,
      frequency_penalty: promptSettings.frequencyPenalty || 0.0,
      presence_penalty: promptSettings.presencePenalty || 0.0,
    })
    .then((res) => {
      return res;
    })
    .catch((err) => {
      throw new Error(
        `ChatGPT was unable to find an answer for that! (Error: ${err.message})`
      );
    });

  return res;
};

export default query;
