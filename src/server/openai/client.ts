import "server-only";
import OpenAI from "openai";

export const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const assertOpenAIKey = () => {
  if (!process.env.OPENAI_API_KEY) {
    throw new Error(
      "OPENAI_API_KEY is not set. Add it to the server environment to use auto-translation.",
    );
  }
};
