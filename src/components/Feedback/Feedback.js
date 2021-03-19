import {BrowserRouter as Router, Link} from 'react-router-dom';

export default function Feedback(props) {

    if(props.match && (props.match.params.id != props.id)) {
        return (
            <div>L'adresse demandée n'a pas été trouvée. <Link to="/">Retour à l'accueil</Link></div>
        );
    }    
    else if(props.link === "landing") {
        return (
            <Link to="/" >{"to landing"}</Link>
        );
    }
    else {
        return (
            <Link to={"/" + props.id} onClick={() => props.onClick(props.id)}>{"to" + props.id}</Link>
        );
    }
}