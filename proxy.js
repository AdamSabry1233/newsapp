const express = require('express');
const fetch = require('node-fetch');
const app = express();

app.use(express.json());

app.get('/news', async (req, res) => {
    const apiKey = 'YOUR_NEWS_API_KEY';
    const apiUrl = `https://newsapi.org/v2/top-headlines?country=us&q=${encodeURIComponent(req.query.q)}&apiKey=${apiKey}`;

    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while fetching data from the News API' });
    }
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
