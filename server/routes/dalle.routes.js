import express from 'express';
import * as dotenv from 'dotenv';
import OpenAI from 'openai';

dotenv.config();

const router = express.Router();

// Replace 'YOUR_OPENAI_API_KEY' with your actual API key
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

router.route('/').get((req, res) => {
  res.status(200).json({ message: 'Hello from the future.' });
});

router.route('/').post(async (req, res) => {
  try {
    const { prompt } = req.body;

    // Use the OpenAI API to generate an image
    const response = await openai.images.generate({
      prompt,
      n: 1,
      size: '1024x1024',
    });

    const image = response.data.images[0];

    // You might need to adjust the response format based on your requirements
    res.status(200).json({ photo: image });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong" });
  }
});

export default router;
