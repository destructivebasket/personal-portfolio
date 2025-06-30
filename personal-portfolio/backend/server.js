const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const app = express();

dotenv.config();

app.use(cors());
app.use(express.json());

const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

app.get('/api/google_flights', async (req, res) => {
  const { q } = req.query;
  if (!q) return res.json([]);

  const apiURL = `https://serpapi.com/google_flights.json?q=${encodeURIComponent(q)}&api_key=${process.env.GOOGLE_API_KEY}`;

  try {
    const response = await fetch(apiURL);

    if (!response.ok) {
      const text = await response.text();
      console.error('SerpAPI error response:', text);
      return res.status(response.status).json({ error: 'SerpAPI returned error', details: text });
    }

    const data = await response.json();
    res.json(data || {});
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch flights' });
  }
});

app.listen(8081, () => {
    console.log("Listening...");
})