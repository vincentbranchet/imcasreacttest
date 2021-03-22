export default function ErrorAPI(props) {
    return (
        <div className="text-center border-2 border-red-700">Erreur d'accès à la base de données : {props.message}</div>
    );
}