import React from "react";
import "./MoviesList.css";
import FlipMove from "react-flip-move";
import Movie from "./Movie";
function MoviesList({ movies }) {
  return (
    <div className="moviesList">
      <FlipMove
        style={{
          display: "flex",
          flexWrap: "wrap",
        }}
      >
        {movies.map((movie) => (
          <Movie key={movie.id} movie={movie} />
        ))}
      </FlipMove>
    </div>
  );
}

export default MoviesList;
