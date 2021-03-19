import './css/App.css';
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import React, { useState, useEffect } from 'react';
import Landing from './../Landing/Landing';
import Feedback from './../Feedback/Feedback';

function App() {
  const [activeId, setActiveId] = useState(1);
  const feedbacks = [1];

  return (
    <div className="App">
      <Router>
        <Switch>
          <Route
            exact path="/" 
            render={routeProps => (<Landing feedbacks={feedbacks} />)} 
          />
          <Route 
            exact path="/:id" 
            render={routeProps => (
              <Feedback {...routeProps} id={activeId} link={"landing"} />
            )} 
          />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
