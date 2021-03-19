import Feedback from './../Feedback/Feedback';

export default function Landing(props) {
    const comps = [];
    props.feedbacks.forEach(fback => {
        comps.push(<Feedback key={fback.id} id={fback.id} onClick={props.onClick} />);
    })

    return(
        <div>
            {comps}
        </div>
    );
}