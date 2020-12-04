import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "../axios";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import { Button, IconButton } from "@material-ui/core";
import "./SingleMovie.css";
import movieTrailer from "movie-trailer";
import YouTube from "react-youtube";
import Dialog from "@material-ui/core/Dialog";
import CircularProgress from "@material-ui/core/CircularProgress";

function SingleMovie(props) {
  const [movie, setMovie] = useState({});
  const [trailerUrl, setTrailerUrl] = useState();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  const fetchData = async () => {
    setLoading(true);
    await axios
      .get(`${props.location.pathname}`)
      .then((results) => {
        setMovie(results.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    fetchData();
  }, [id]);

  const handleClick = (title) => {
    if (trailerUrl) {
      setTrailerUrl("");
    } else {
      movieTrailer(title)
        .then((url) => {
          const urlParams = new URLSearchParams(new URL(url).search);
          setTrailerUrl(urlParams.get("v"));
          setOpen(true);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const handleClose = () => {
    setOpen(!open);
  };
  const opts = {
    height: "390px",
    width: "100%",
    playerVars: {
      autoplay: 1,
    },
  };
  return (
    <div>
      {!loading && movie ? (
        <div className="singleMovie">
          <div
            className="singleMovie__bg"
            style={{ background: `url(${movie?.image})` }}
          >
            <img src={movie?.image} alt="" />
            <div className="singleMovie__header">
              <Dialog onClose={handleClose} open={open}>
                {trailerUrl ? (
                  <YouTube videoId={trailerUrl} opts={opts} />
                ) : (
                  <p>Sorry no trailer found</p>
                )}
              </Dialog>
            </div>
          </div>
          <div className="singleMovie__details">
            <div className="singleMovie__details__header">
              <span className="singleMovie__tagline">{movie?.tagline}</span>
              <div>
                <IconButton
                  onClick={() => handleClick(movie?.title)}
                  style={{ color: "white" }}
                >
                  <PlayArrowIcon fontSize="large" />
                </IconButton>
                <small>Play trailer</small>
              </div>
            </div>

            <div>
              <span>Overview</span>
              <p>{movie?.overview}</p>
            </div>
            <div>
              <span>Runtime</span>
              <p>{movie?.runTime}</p>
            </div>
            <div>
              <span>Release Year</span>
              <p>{movie?.release_date}</p>
            </div>
            <div>
              <span>Genres</span>
              <p>{movie?.genres}</p>
            </div>
          </div>
          <Link to="/">
            <Button color="secondary" variant="outlined">
              Go back
            </Button>
          </Link>
        </div>
      ) : (
        <div className="progress">
          <CircularProgress />
        </div>
      )}
    </div>
  );
}

export default SingleMovie;
