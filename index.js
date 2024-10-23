const express = require('express');
const fetch = require('node-fetch');
const path = require('path');

const app = express();

// Serve the static HTML file
app.use(express.static(path.join(__dirname)));

// Proxy route to fetch Infinite Craft content
app.get('/proxy', async (req, res) => {
  const targetUrl = 'https://neal.fun/infinite-craft/';

  try {
    const response = await fetch(targetUrl);
    const content = await response.text();
    res.set('Content-Type', 'text/html');
    res.send(content);
  } catch (error) {
    res.status(500).send('Error fetching the content: ' + error.toString());
  }
});

// Listen on the port provided by Heroku
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
