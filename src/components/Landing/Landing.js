import React, {useState, useEffect} from 'react';
import Loading from './../Loading/Loading';
import ErrorAPI from '../ErrorAPI/ErrorAPI';
import Feedback from './../Feedback/Feedback';

/**
 * This component expects an onClick prop function and an onFetch prop function to push data upstate.
 * If its API call is successful, it will render a list of <Feedback> components.
 * The list will be displayed in a responsive flexbox container.
 * Each <Feedback> component in the list has a <Link> to a <Route> with its id as parameter.
 */
export default function Landing(props) {
    const [feedbacks, setFeedbacks] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        let mounted = true;

        fetch(`http://api.imcas.com/v1/feedbacks`)
        .then(res => res.json())
        .then(res => {
            if(mounted) {
                setFeedbacks(res.data);
                setIsLoading(false);
                props.onFetch(res.data);
            }
        })
        .catch(error => {setError(error)})

        return function cleanup() {
            mounted = false;
        }
    }, []);

    if(isLoading) {
        return (
            <div className="w-screen h-screen bg-gradient-to-tr from-purple-100 via-red-100 to-yellow-100">
                <div className="centered">
                    <Loading />
                </div>
            </div>
        );
    }
    else if(feedbacks) {
        let comps = [];

        feedbacks.forEach(fback => {
            comps.push(
                <div key={fback.id} className="w-4/5 xl:w-2/5 max-w-screen-sm mt-5 mb-5">
                    <Feedback                     
                        id={fback.id}
                        link={"/" + fback.id}
                        onClick={(user) => {props.onClick(user)}} 
                        picture={fback.user.picture_url} 
                        fullname={fback.user.fullname} 
                        specialty={fback.user.specialty} 
                        country={fback.user.country} 
                        quote={fback.translations}
                    />
                </div>
            );
        });

        return(
            <div className="container mx-auto flex flex-col xl:flex-row flex-wrap justify-around items-center pt-10 pb-10">
                {comps}
            </div>
        );
    }
    else if(error) {
        return <ErrorAPI message={error.message} />
    }

}