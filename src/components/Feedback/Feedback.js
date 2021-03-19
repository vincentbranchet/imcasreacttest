import {Link} from 'react-router-dom';

export default function Feedback(props) {

    if(props.match && (props.match.params.id != props.id)) {
        return (
            <div>L'adresse demandée n'a pas été trouvée. <Link to="/">Retour à l'accueil</Link></div>
        );
    }    
    else if(props.link === "landing") {
        return (
            <Link to="/">
            <div className="w-full h-full flex justify-start items-start p-3 md:p-7 rounded-2xl shadow-custom">
                <img className="w-14 h-14 mr-5 object-cover rounded-full" src={props.picture} alt="Portrait" />
                <div className="">
                    <div className="mb-5 mt-3">
                        <span className="font-bold">{props.fullname}</span><span className="text-gray-600"> - {props.specialty.translations[0].name + ", " + props.country.translations[0].name}</span>
                    </div>
                    <div className="text-gray-700 italic">
                        {"\"" + props.quote[0].content + "\""}
                    </div>
                </div>
            </div>
        </Link>
        );
    }
    else {
        return (
            <Link to={"/" + props.id} onClick={() => props.onClick(props)}>
                <div className="w-full h-full flex justify-start items-start p-3 md:p-7 rounded-2xl shadow-custom">
                    <img className="w-14 h-14 mr-5 object-cover rounded-full" src={props.picture} alt="Portrait" />
                    <div className="">
                        <div className="mb-5 mt-3">
                            <span className="font-bold">{props.fullname}</span><span className="text-gray-600"> - {props.specialty.translations[0].name + ", " + props.country.translations[0].name}</span>
                        </div>
                        <div className="text-gray-700 italic">
                            {"\"" + props.quote[0].content + "\""}
                        </div>
                    </div>
                </div>
            </Link>
        );
    }
}