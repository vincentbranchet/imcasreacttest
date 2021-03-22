import React, {useState, useEffect} from 'react';
import Loading from './../Loading/Loading';
import ErrorAPI from './../ErrorAPI/ErrorAPI';
import Feedback from './../Feedback/Feedback';

/**
 * This component expects one feedback id in its props to make its API call.
 * If its API call is successful, it will render one <Feedback> component matching props.id.
 * The <Feedback> component will be displayed within a <div> that centers it in the middle of the screen using a class defined in App.css.
 */
export default function Detail(props) {
    const [feedback, setFeedback] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        let mounted = true;
        
        fetch(`http://api.imcas.com/v1/feedbacks/${props.id}`)
        .then(res => res.json())
        .then(res => {
            if(mounted) {
                setFeedback(res);
                setIsLoading(false);
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
    else return (        
        <div className="w-screen h-screen bg-gradient-to-tr from-purple-100 via-red-100 to-yellow-100">            

            {error && <ErrorAPI message={error.message} />}

            <div className="centered w-4/5 xl:w-2/5 max-w-screen-sm">
                <Feedback
                    id={feedback.id} 
                    link={"/"} 
                    onClick={props.onClick}
                    picture={feedback.user.picture_url} 
                    fullname={feedback.user.fullname} 
                    specialty={feedback.user.specialty} 
                    country={feedback.user.country} 
                    quote={feedback.translations}
                />
            </div>
        </div>
    );
}