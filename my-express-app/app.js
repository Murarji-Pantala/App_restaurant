// app.js or server.js
const express = require('express');
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Route to create GitHub repository
app.post('/create-repo', async (req, res) => {
  try {
    const { repoName, accessToken } = req.body;

    // GitHub API endpoint for creating a repository
    const url = 'https://api.github.com/user/repos';

    // Request body
    const data = {
      name: repoName,
      description: 'Food delivery app project',
      private: false, // Set to true for a private repository
      license_template: 'mit' // Choose your desired license
    };

    // Request headers
    const headers = {
      Authorization: `token ${accessToken}`,
      Accept: 'application/vnd.github.v3+json'
    };

    // Make POST request to GitHub API
    const response = await axios.post(url, data, { headers });

    res.status(201).json({ message: 'Repository created successfully', url: response.data.html_url });
  } catch (error) {
    console.error('Error creating repository:', error.response.data);
    res.status(500).json({ error: 'Failed to create repository' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
