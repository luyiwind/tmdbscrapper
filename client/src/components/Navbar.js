import React, { useState } from "react";
import SearchIcon from "@material-ui/icons/Search";
import { IconButton } from "@material-ui/core";
import "./Navbar.css";
import { useHistory } from "react-router-dom";
function Navbar() {
  const [input, setInput] = useState("");
  const history = useHistory();
  const handleChange = (e) => {
    setInput(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim() !== 0) {
      history.push(`/search/${input}`);
    }
  };
  return (
    <div className="navbar">
      <h1>CINEMATIC</h1>
      <div className="navbarInputContainer">
        <form action="">
          <input
            type="text"
            className={`navbarInput`}
            placeholder="search"
            onChange={handleChange}
          />
          <IconButton type="submit" onClick={handleSubmit}>
            <SearchIcon />
          </IconButton>
        </form>
      </div>
    </div>
  );
}

export default Navbar;
