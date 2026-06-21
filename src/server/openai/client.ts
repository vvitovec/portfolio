import "server-only";
import OpenAI from "openai";

let openaiClient: OpenAI | undefined;

export const assertOpenAIKey = () => {
  if (!process.env.OPENAI_API_KEY) {
    throw new Error(
      "OPENAI_API_KEY is not set. Add it to the server environment to use auto-translation.",
    );
  }
};

function getOpenAIClient() {
  assertOpenAIKey();

  openaiClient ??= new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });

  return openaiClient;
}

export const openai = new Proxy({} as OpenAI, {
  get(_target, prop, receiver) {
    const client = getOpenAIClient();
    const value = Reflect.get(client, prop, receiver);

    return typeof value === "function" ? value.bind(client) : value;
  },
});
