import DigimonListItem from './ListItem'

function DigimonList(props) {
    return (
        <ul>
            {props.items.map((digimon) => (
                <DigimonListItem key={digimon.name} img={digimon.img} name={digimon.name} level={digimon.level} />
            ))}
        </ul>)
}
export default DigimonList