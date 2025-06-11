require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { OpenAI } = require("openai");

const app = express();
app.use(cors());
app.use(express.json());

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

app.post("/chat", async (req, res) => {
  const { prompt } = req.body;

  if (!prompt || prompt.trim() === "") {
    return res.status(400).json({ response: "कृपया एक प्रश्न दर्ज करें।" });
  }

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content:
            "You are a helpful assistant for Indian farmers who speaks Hindi. Please answer in simple, polite Hindi.",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
    });

    const message = completion.choices[0].message.content || "❌ कोई जवाब नहीं आया";
    res.json({ response: message });
  } catch (error) {
    console.error("❌ Backend Error message:", error.message);
    if (error.response) {
      console.error("❌ OpenAI API response error:", error.response.data);
    }
    res.status(500).json({ response: "❌ एआई से कनेक्शन नहीं हुआ।" });
  }
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ AI किसान सहायक चल रहा है: http://localhost:${PORT}`);
});


// backend/index.js

// const express = require('express');
// const mongoose = require('mongoose');
// const axios = require('axios');
// const cors = require('cors');


// const app = express();
// const PORT = process.env.PORT || 5000;
// app.use(cors());

// // MongoDB connection string
// const MONGO_URI = 'mongodb://localhost:27017/kutta';  // apna URI yahan lagao

// // NewsAPI key
// const NEWS_API_KEY = '49517647681c48bfb801a33bd743e661';

// // Connect to MongoDB
// mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
// .then(() => console.log('MongoDB connected'))
// .catch(err => console.log('MongoDB connection error:', err));

// // Define schema and model for news articles
// const newsSchema = new mongoose.Schema({
//   title: String,
//   description: String,
//   url: String,
//   publishedAt: Date,
//   sourceName: String,
// });

// const News = mongoose.model('News', newsSchema);

// // Endpoint to fetch & save news from NewsAPI
// app.get('/fetch-news', async (req, res) => {
//   try {
//     const response = await axios.get('https://newsapi.org/v2/everything', {
//       params: {
//         q: 'farming OR agriculture OR farming techniques OR crops',
//         language: 'en',
//         sortBy: 'publishedAt',
//         apiKey: NEWS_API_KEY,
//         pageSize: 20,
//       }
//     });

//     const articles = response.data.articles;

//     for (let article of articles) {
//       await News.findOneAndUpdate(
//         { url: article.url },
//         {
//           title: article.title,
//           description: article.description,
//           url: article.url,
//           publishedAt: article.publishedAt,
//           sourceName: article.source.name,
//         },
//         { upsert: true }
//       );
//     }

//     res.json({ message: 'Farming news fetched and saved successfully', count: articles.length });
//   } catch (error) {
//     console.error('Error fetching news:', error.message);
//     res.status(500).json({ error: 'Failed to fetch farming news' });
//   }
// });


// // Endpoint to get news from MongoDB
// app.get('/news', async (req, res) => {
//   try {
//     const newsList = await News.find().sort({ publishedAt: -1 }).limit(50);
//     res.json(newsList);
//   } catch (error) {
//     res.status(500).json({ error: 'Failed to get news' });
//   }
// });

// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });
