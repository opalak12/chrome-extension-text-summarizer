import express from "express";
import cors from "cors";
import fetch from "node-fetch";
import dotenv from "dotenv";
import axios from "axios";
import * as cheerio from "cheerio";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

app.get("/summarize", (req, res) => {
  res.send("Send a POST request with JSON { text: '...' } to get a summary.");
});

app.post("/summarize-url", async (req, res) => {
  const { url } = req.body;
  if (!url) return res.status(400).json({ error: "No URL provided" });

  try {
    // 1. Scrape the page
    const { data: html } = await axios.get(url);
    const $ = cheerio.load(html);

    // 2. Extract text from paragraphs
    let text = $("p").map((i, el) => $(el).text()).get().join(" ");
    text = text.replace(/\s+/g, " ").trim();

    const MAX_CHARS = 1500;
    if (text.length > MAX_CHARS) text = text.slice(0, MAX_CHARS);

    // 4. Send to Hugging Face summarization
    const response = await fetch(
      "https://api-inference.huggingface.co/models/facebook/bart-large-cnn",
      {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${process.env.HF_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ inputs: text }),
      }
    );

    const data = await response.json();
    const summary = data[0]?.summary_text || "Could not generate summary.";

    res.json({ summary });
  } catch (err) {
    console.error(err);
    res.status(500).json({ summary: "Error: " + err.message });
  }
});

app.listen(3000, () => console.log("Server running on port 3000"));
