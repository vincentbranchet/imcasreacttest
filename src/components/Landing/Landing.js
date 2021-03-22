import Feedback from './../Feedback/Feedback';

/**
 * This component acts as a <Feedback> wrapper ; it loops trough fetched data and renders an array of <Feedback> components.
 */
export default function Landing(props) {
    const comps = [];

    props.feedbacks.forEach(fback => {
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
    })

    return(
        <div className="container mx-auto flex flex-col xl:flex-row flex-wrap justify-around items-center pt-10 pb-10">
            {comps}
        </div>
    );
}