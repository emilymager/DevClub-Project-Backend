import express from 'express';
import fetch from 'node-fetch';
import dotenv from 'dotenv';
dotenv.config();

const router = express.Router();

router.post('/eventAssistant', async (req, res) => {
  const { services, budget } = req.body;

  const prompt = `You are an expert event planner in Israel.

I am planning an event in Israel with a budget of $${budget}.
Here are the services I am considering: ${services.join(', ')}.

Please return a JSON array of supplier recommendations based in Israel.
Each object in the array must follow this exact schema:
{
  "supplierType": one of [ "Photographer", "Magnet Photographer", "Catering Service", "DJ", "Security", "Lighting Technician / Lighting Setup", "Bartender / Bar Services", "Florist / Flower Decoration", "Furniture Rental", "Balloon Artist / Kids Entertainment", "Live Musicians", "Private Chef / Live Food Stations", "Makeup Artist", "Transportation Services", "Graphic Designer" ],
  "description": string (include a short recommendation for a real or realistic supplier in Israel, with their name if possible, and an estimated price range in Israeli shekels [₪] relevant to the Israeli market)
}

Important:
- All suppliers must be based in Israel.
- Return only the JSON array.
- Do not include any explanation, titles, or non-JSON content.
- Make sure the JSON is valid.
`;

  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-3-haiku-20240307',
        max_tokens: 500,
        temperature: 0.7,
        messages: [
          {
            role: 'user',
            content: prompt,
          },
        ],
      }),
    });

    const result = await response.json();
    const aiText = result?.content?.[0]?.text || '[]';
    let recommendations = [];

    try {
      recommendations = JSON.parse(aiText);
    } catch (parseError) {
      console.error('JSON parse error:', parseError);
      return res.status(500).json({
        message: 'Error parsing AI response.',
        recommendations: [],
      });
    }

    res.json({
      message: 'AI Recommendations:',
      recommendations,
    });

  } catch (error) {
    console.error('AI Error:', error);
    res.status(500).json({
      message: 'Error: Failed to get response from AI.',
      recommendations: [],
    });
  }
});

export default router;
