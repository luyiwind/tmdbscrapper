const { getAllMovies, searchMovies, getTrends, getMovie,getBackdrop } = require("./scraper");
const express = require("express");
const cors = require("cors");
const app = express();
app.use(cors());
app.get("/", (req, res) => {
  res.send("<h1>Hello world<h1>");
});

app.get("/movies", (req, res) => {
  getAllMovies().then((movies) => {
    res.json(movies);
  });
});

app.get("/trends", (req, res) => {
  getTrends().then((movies) => {
    res.json(movies);
  });
});

app.get("/search/:searchterm", (req, res) => {
  searchMovies(req.params.searchterm).then((results) => {
    res.json(results);
  });
});

app.get("/movie/:id", (req, res) => {
  getMovie(req.params.id).then((movie) => {
    res.json(movie);
  });
});

app.get("/drop/:id", (req, res) => {
  getBackdrop(req.params.id).then((result) => {
    res.json(result);
  });
});

app.get("/collection/:id", (req, res) => {
  getMovie(req.params.id).then((movie) => {
    res.json(movie);
  });
});
app.get("/tv/:id", (req, res) => {
  getMovie(req.params.id).then((movie) => {
    res.json(movie);
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.info(`Server listening on port...`);
});
