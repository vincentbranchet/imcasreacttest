import './css/App.css';
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import React, { useState } from 'react';
import Landing from './../Landing/Landing';
import Detail from './../Detail/Detail';
import Error404 from './../Error404/Error404';

export default function App() {
  const [feedbacks, setFeedbacks] = useState([]);
  const [activeFeedback, setActiveFeedback] = useState(null);

/**
 * At render we check URL vs 3 routes including 404, to which we redirect if URL/:id doesn't match fetched API data.
 * When the first page (Landing) is rendered data flows up to <App> state to serve 404 redirection logic.
 * When the user clicks on a specific feedback box on the first page (Landing), data flows up to <App> state to be passed on to the second page (Detail).
 */
  return (
    <div className="text-xs md:text-base">

      <Router>
        <Switch>

          <Route
            exact path="/" 
            render={() => {
              return (
                <div className="bg-gradient-to-tr from-purple-100 via-red-100 to-yellow-100">
                  <Landing 
                    onClick={(user) => {setActiveFeedback(user)}} 
                    onFetch={(fbks) => setFeedbacks(fbks)} 
                  />
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
                  <Detail
                    id={activeFeedback.id}
                    onClick={() => setActiveFeedback(null)}
                  />
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
