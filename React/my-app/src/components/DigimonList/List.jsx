import DigimonListItem from './ListItem'

function DigimonList(props) {
    return (
        <ul>
            {props.items.map((digimon, index) => (
                <DigimonListItem key={index} img={digimon.img} name={digimon.name} level={digimon.level} />
            ))}
        </ul>)
}
export default DigimonList