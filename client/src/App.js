import "./App.css";
import Home from "./pages/Home";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Search from "./pages/Search";
import Movie from "./pages/SingleMovie";
function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/search/:searchTerm" component={Search} />
          <Route exact path="/movie/:id" component={Movie} />
          <Route exact path="/tv/:id" component={Movie} />
          <Route exact path="/collection/:id" component={Movie} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
