import React from 'react'
import DigimonList from './DigimonList/List'

class DigimonView extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            list: []
        }
    }

    componentDidMount() {
        fetch('https://digimon-api.vercel.app/api/digimon')
            .then(response => response.json())
            .then(list => {
                this.setState({ list })
            })
    }

    render() {
        return (
            <div>
                <h1>Lista de Digimones</h1>
                <DigimonList items={this.state.list} />
            </div>
        );
    }
}

export default DigimonView