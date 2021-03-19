import './css/App.css';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import React, { useState, useEffect } from 'react';
import Landing from './../Landing/Landing';
import Feedback from './../Feedback/Feedback';

function App() {
  const [activeId, setActiveId] = useState(1);
  const [feedbacks, setFeedbacks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);

  useEffect(() => {
    fetch(`http://api.imcas.com/v1/feedbacks`)
    .then(res => res.json())
    .then(res => {
      console.log("fetch");
      setFeedbacks(res.data);
      setPage(res.current_page);
      setIsLoading(false);
    })
    .catch(error => {setError(error)})
  }, [page]);

  return (
    <div className="App">
      {isLoading && <div>Loading data...</div>}
      {error && <div>Erreur d'accès à la base de données : {error.message}</div>}
      <Router>
        <Switch>
          <Route
            exact path="/" 
            render={routeProps => (<Landing feedbacks={feedbacks} onClick={(id) => {setActiveId(id)}} />)} 
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
