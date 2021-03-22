import {Link} from 'react-router-dom';

/**
 * The component the app most uses. It expects a bunch of data as props and is either rendered several times on a page (first page) or once (second page).
 * Its position is not declared here and must be declared in an external wrapper. 
 * No margins.
 * Size unit is rem.
 * Responsive inner space (padding & margin).
 * It will cas a light grey shadow (with purple tones) all around.
 */
export default function Feedback(props) {

    return (
        <Link to={props.link} onClick={() => props.onClick(props)}>
            <div className="w-full h-full bg-white flex justify-start items-start p-3 md:p-7 rounded-2xl shadow-custom">
                <img className="w-14 h-14 mr-5 object-cover rounded-full" src={props.picture} alt="Portrait" />
                <div className="">
                    <div className="mb-2 md:mb-5 mt-3">
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