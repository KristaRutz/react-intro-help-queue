import React from "react";
import Header from "./Header";
import TicketControl from "./TicketControl";
import SignIn from "./SignIn";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <Header />
      <Switch>
        <Route path="/signin">
          <SignIn />
        </Route>
        <Route path="/">
          <TicketControl />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
