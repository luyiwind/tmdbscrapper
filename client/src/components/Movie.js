import React, { forwardRef } from "react";
import "./Movie.css";
import { NavLink } from "react-router-dom";
const Movie = forwardRef((props, ref) => {
  const { id, title, release_date, image } = props.movie;
  return (
    <div ref={ref} className="movie">
      <NavLink to={`${id}`}>
        <img src={`${image}`} alt="" />
        <div className="movie__info">
          <p>{title}</p>
          <span>{release_date}</span>
        </div>
      </NavLink>
    </div>
  );
});

export default Movie;
