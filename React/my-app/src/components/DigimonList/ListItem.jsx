import './css/ListItem.css'

function DigimonListItem(props) {
    return (
        <li className="ListItem">
            <img src={props.img} alt={props.name} />
            <h3>{props.name}</h3>
            <p>{props.level}</p>
        </li>
    )
}

export default DigimonListItem