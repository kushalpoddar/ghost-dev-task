import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import HomePage from "./pages/home";

function App() { 
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/" exact component={() => <HomePage />} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
