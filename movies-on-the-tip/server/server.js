const express = require('express');
const app = express();
const PORT = 4000; // Or any port you want to use

// Middleware to parse JSON bodies
app.use(express.json());

// Sample data for movie suggestions
const movies = [
  'The Shawshank Redemption',
  'The Godfather',
  'The Dark Knight',
  'The Lord of the Rings',
  'Forrest Gump',
  'Inception',
  'The Matrix',
];

// Route to handle suggestions
app.get('/movies-in-theaters', (req, res) => {
  const { query } = req.query;
  const filteredMovies = movies.filter(movie =>
    movie.toLowerCase().includes(query.toLowerCase())
  );
  res.json(filteredMovies);
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
