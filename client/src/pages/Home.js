import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import axios from "../axios";
import "./Home.css";
import MoviesList from "../components/MoviesList";
import CircularProgress from "@material-ui/core/CircularProgress";

function Home() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const fetchData = async () => {
    setLoading(true);
    await axios
      .get("/movies")
      .then((results) => {
        setMovies(results.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div className="home">
      <div className="home__bg">
        <Navbar />
      </div>
      {!loading && movies ? (
        <MoviesList movies={movies} />
      ) : (
        <div className="progress">
          <CircularProgress />
        </div>
      )}
    </div>
  );
}

export default Home;
