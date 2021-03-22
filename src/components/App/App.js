import './css/App.css';
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import React, { useState, useEffect } from 'react';
import Landing from './../Landing/Landing';
import Feedback from './../Feedback/Feedback';
import Error404 from './../Error404/Error404';

function App() {
  const [activeFeedback, setActiveFeedback] = useState(null);
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
            render={routeProps => (<Landing feedbacks={feedbacks} onClick={(user) => {setActiveFeedback(user)}} />)} 
          />
          <Route 
            path="/page-not-found"
            component={Error404} 
          />
          <Route 
            exact path="/:id" 
            render={(routeProps) => {
              let isFeedback = false;

              for(let i of feedbacks) {                
                if(i.id == routeProps.match.params.id) {                  
                  isFeedback = true;
                  break;                  
                }                
              }

              if(isFeedback === true) {
                return (
                  <div className="centered w-4/5 xl:w-2/5 max-w-screen-sm">
                    <Feedback 
                      {...routeProps} 
                      id={activeFeedback.id} 
                      link={"/"} 
                      onClick={() => setActiveFeedback(null)}
                      picture={activeFeedback.picture} 
                      fullname={activeFeedback.fullname} 
                      specialty={activeFeedback.specialty} 
                      country={activeFeedback.country} 
                      quote={activeFeedback.quote}
                    />
                  </div>
                );
              }
              else {
                return <Redirect to="/page-not-found" />
              }
            }} 
          />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
