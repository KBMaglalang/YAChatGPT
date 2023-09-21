type OpenAIMessage = {
  role: "system" | "user" | "assistant";
  content: string;
};

interface Message {
  content: string | ChatCompletion | {};
  createdAt: admin.firestore.Timestamp;

  user: {
    _id: string;
    name: string;
  };
}

interface ChatGPTMessage extends Message {
  finish: string | null;
  model: string | null;
  promptTokens: number | undefined;
  completionTokens: number | undefined;
  totalTokens: number | undefined;
  temperature: number;
  topP: number;
  frequencyPenalty: number;
  presencePenalty: number;
  maxTokens: number;
}
