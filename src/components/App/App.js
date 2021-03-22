import './css/App.css';
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import React, { useState, useEffect } from 'react';
import Landing from './../Landing/Landing';
import Feedback from './../Feedback/Feedback';
import Error404 from './../Error404/Error404';
import ErrorAPI from './../ErrorAPI/ErrorAPI';
import Loading from './../Loading/Loading';

export default function App() {
  const [activeFeedback, setActiveFeedback] = useState(null);
  const [feedbacks, setFeedbacks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(null);

/**
 * We use this hook to fetch API data once, before first render, and make sure to only fetch it once (because we don't need more)
 */
  useEffect(() => {
    fetch(`http://api.imcas.com/v1/feedbacks`)
    .then(res => res.json())
    .then(res => {
      setFeedbacks(res.data);
      setPage(res.current_page);
      setIsLoading(false);
    })
    .catch(error => {setError(error)})
  }, [page]);

/**
 * At render we check URL vs 3 routes including 404, to which we redirect if URL/:id doesn't match API state data.
 * When user clicks on a specific feedback box in the first page, data flows up to <App> state in activeFeedback to be rendered back on the second page.
 */
  return (
    <div className="text-xs md:text-base">

      {isLoading && <Loading />}

      {error && <ErrorAPI message={error.message} />}

      <Router>
        <Switch>

          <Route
            exact path="/" 
            render={() => {
              return (
                <div className="bg-gradient-to-tr from-purple-100 via-red-100 to-yellow-100">
                  <Landing feedbacks={feedbacks} onClick={(user) => {setActiveFeedback(user)}} />
                </div>
              );
            }} 
          />

          <Route 
            path="/page-not-found"
            component={Error404} 
          />

          <Route 
            path="/:id" 
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
                  <div className="w-screen h-screen bg-gradient-to-tr from-purple-100 via-red-100 to-yellow-100">
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
