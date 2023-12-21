type OpenAIMessage = {
  role: 'system' | 'user' | 'assistant';
  content: string;
};

interface Message {
  content: string | ChatCompletion | {};
  createdAt: admin.firestore.Timestamp;
  role: 'user' | 'system' | 'assistant';
  id: string;
}

// interface ChatGPTMessage extends Message {
//   finish: string | null;
//   model: string | null;
//   promptTokens: number | undefined;
//   completionTokens: number | undefined;
//   totalTokens: number | undefined;
//   temperature: number;
//   topP: number;
//   frequencyPenalty: number;
//   presencePenalty: number;
//   maxTokens: number;
// }
