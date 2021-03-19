import './css/App.css';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import React, { useState, useEffect } from 'react';
import Landing from './../Landing/Landing';
import Feedback from './../Feedback/Feedback';

function App() {
  const [activeUser, setActiveUser] = useState(null);
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
    <div className="text-xs md:text-base">
      {isLoading && <div className="loader">Loading...</div>}
      {error && <div>Erreur d'accès à la base de données : {error.message}</div>}
      <Router>
        <Switch>
          <Route
            exact path="/" 
            render={routeProps => (<Landing feedbacks={feedbacks} onClick={(user) => {setActiveUser(user)}} />)} 
          />
          <Route 
            exact path="/:id" 
            render={routeProps => (
              <div className="centered w-4/5 xl:w-2/5 max-w-screen-sm">
                <Feedback {...routeProps} id={activeUser.id} link={"landing"} 
                  picture={activeUser.picture} 
                  fullname={activeUser.fullname} 
                  specialty={activeUser.specialty} 
                  country={activeUser.country} 
                  quote={activeUser.quote}
                />
              </div>
            )} 
          />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
