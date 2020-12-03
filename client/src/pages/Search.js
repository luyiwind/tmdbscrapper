import React, { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import axios from "../axios";
import Navbar from "../components/Navbar";
import "./Search.css";
import CircularProgress from "@material-ui/core/CircularProgress";
function Search() {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const { searchTerm } = useParams();
  const fetchData = async () => {
    setLoading(true);
    await axios
      .get(`/search/${searchTerm}`)
      .then((results) => {
        console.log(results);
        setResults(results.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    fetchData();
  }, [searchTerm]);

  function truncate(str, n) {
    return str?.length > n ? str.substr(0, n - 1) + "..." : str;
  }
  return (
    <div className="search">
      <Navbar />
      {!loading && results ? (
        results.map((result) => (
          <NavLink to={`${result.id}`} key={result.id}>
            <div className="searchCard" key={result.id}>
              <img src={result.image} />
              <div className="searchDetails">
                <p className="search__title">{result.title}</p>
                <p className="search__overview">
                  {truncate(result.overview, 70)}
                </p>
              </div>
            </div>
          </NavLink>
        ))
      ) : (
        <div className="progress">
          <CircularProgress />
        </div>
      )}
    </div>
  );
}

export default Search;
