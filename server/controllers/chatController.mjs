import OpenAI from "openai";

export const chatWithAI = async (req, res) => {
  try {
    const client = new OpenAI({
      baseURL: "https://openrouter.ai/api/v1",
      apiKey: process.env.OPENROUTER_API_KEY,
    });

    const { message } = req.body;

    const completion =
      await client.chat.completions.create({
        model: "openai/gpt-oss-20b:free",
        messages: [
          {
            role: "system",
            content:
              "You are ThinkFlow AI, a helpful futuristic AI assistant.",
          },
          {
            role: "user",
            content: message,
          },
        ],
      });

    const reply =
      completion.choices[0].message.content;

    res.json({
      success: true,
      reply,
    });
  } catch (error) {
    console.error("AI Error:", error.message);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};