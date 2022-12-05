const cheerio = require("cheerio");
const rp = require("request-promise");
const movieCache = {};
const searchCache = {};

//play-trailer

//display-movies
function getAllMovies() {
  //get options
  var options = {
    uri: "https://www.themoviedb.org/movie",
    headers: {
      "accept-language":"zh-CN;q=0.8,zh;q=0.7"
    },
    transform: function (body) {
      return cheerio.load(body);
    },
  };

  return rp(options)
    .then(function ($) {
      const data = $("div.card.style_1");
      let movies = [];
      data.each((i, element) => {
        let movie = {};
        const $element = $(element);
        movie.image = $element
          .find("div.image div.wrapper a img")
          .attr("src");
        movie.title = $element.find("div.content h2").text();
        movie.id = $element.find("div.image div.wrapper a").attr("href");
        movie.release_date = $element.find("div.content p").text();
        movies.push(movie);
      });
      const selectedMovies = movies.slice(0, -3);
      return selectedMovies;
    })
    .catch(function (err) {
      // Crawling failed or Cheerio choked...
    });
}

function getTrends() {
  //get options
  var options = {
    uri: "https://www.themoviedb.org/remote/panel?panel=trending_scroller&group=today",
    headers: {
      "accept-language":"zh-CN;q=0.8,zh;q=0.7"
    },
    transform: function (body) {
      return cheerio.load(body);
    },
  };

  return rp(options)
    .then(function ($) {
      const data = $("div.card.style_1");
      let movies = [];
      data.each((i, element) => {
        let movie = {};
        const $element = $(element);
        movie.image = $element
          .find("div.image div.wrapper a img")
          .attr("src");
        movie.title = $element.find("div.content h2").text();
        movie.id = $element.find("div.image div.wrapper a").attr("href");
        movie.release_date = $element.find("div.content p").text();
        movies.push(movie);
      });
      const selectedMovies = movies.slice(0, -3);
      return selectedMovies;
    })
    .catch(function (err) {
      // Crawling failed or Cheerio choked...
    });
}

//search-movies
function searchMovies(searchTerm) {
  if (searchCache[searchTerm]) {
    return Promise.resolve(searchCache[searchTerm]);
  }
  //get options
  var options = {
    uri: encodeURI(`https://www.themoviedb.org/search?query=${searchTerm}`),
    headers: {
      "accept-language":"zh-CN;q=0.8,zh;q=0.7"
    },
    transform: function (body) {
      return cheerio.load(body);
    },
  };

  return rp(options)
    .then(function ($) {
      const data = $("div.card.v4.tight");
      let results = [];
      data.each((i, element) => {
        let result = {};
        const $element = $(element);
        result.id = $element
          .find("div.wrapper div.image div.poster a")
          .attr("href");
        result.image = $element
          .find("div.wrapper div.image div.poster a img")
          .attr("data-src");

        result.title = $element
          .find("div.wrapper div.details div.wrapper div.title a h2")
          .text()
          .trim();
        result.overview = $element
          .find("div.wrapper div.details div.overview p")
          .text();
        results.push(result);
      });
      //searchCache[searchTerm] = results;
      const first = results[0];
      return first;
    })
    .catch(function (err) {
      // Crawling failed or Cheerio choked...
      console.log(err);
    });
}

function getBackdrop(id) {
  //get options
  var options = {
    uri: `https://www.themoviedb.org/tv/${id}/remote/media_panel/backdrops?translate=false&item_count=1`,
    transform: function (body) {
      return cheerio.load(body);
    },
  };
  return rp(options)
  .then(function ($) {
    const data = $("div.backdrop");
    let results = [];
    data.each((i, element) => {
      let result = {};
      const $element = $(element);
      result.id = $element
        .find("img")
        .attr("src");
      result.id = "https://image.tmdb.org/t/p/original/" + result.id.replace("/t/p/w533_and_h300_bestv2/","");
      //console.log(result.id);
      results.push(result);
    });
    return results[0];
  })
  .catch(function (err) {
    // Crawling failed or Cheerio choked...
    console.log(err);
  });
}

//single movie

function getMovie(movie) {
  if (movieCache[movie]) {
    console.log("serving from cache");
    return Promise.resolve(movieCache[movie]);
  }
  //get options
  var options = {
    uri: `https://www.themoviedb.org/movie/${movie}`,
    headers: {
      "accept-language":"zh-CN;q=0.8,zh;q=0.7"
    },
    transform: function (body) {
      return cheerio.load(body);
    },
  };

  return rp(options)
    .then(function ($) {
      const data = $("section#original_header");
      let movie = {};
      const $element = $(data);
      movie.poster = $element
        .find("div.poster_wrapper div.poster div.image_content img")
        .attr("src");
      movie.image = $element
        .find("div.poster_wrapper div.poster div.image_content img")
        .attr("data-src");

      movie.release_date = $element
        .find(
          "div.header_poster_wrapper section.header div.title h2 span.release_date"
        )
        .text();

      movie.title = $element
        .find("div.header_poster_wrapper section.header h2 a")
        .text();
      movie.rating = "";
      movie.genres = $element
        .find("div.header_poster_wrapper section.header div.facts span.genres")
        .text()
        .trim();
      movie.runTime = $element
        .find("div.header_poster_wrapper section.header div.facts span.runtime")
        .text()
        .trim();
      movie.overview = $element
        .find(
          "div.header_poster_wrapper section.header div.header_info div.overview"
        )
        .text()
        .trim();

      movie.tagline = $element
        .find("div.header_poster_wrapper section.header div.header_info h3")
        .text();
      movieCache[movie] = movie;

      return movie;
    })

    .catch(function (err) {
      // Crawling failed or Cheerio choked...
    });
}
module.exports = {
  getAllMovies,
  searchMovies,
  getTrends,
  getBackdrop,
  getMovie,
};
