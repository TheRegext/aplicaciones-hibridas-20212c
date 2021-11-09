import React from 'react'
import DigimonList from './DigimonList/List'



class DigimonView extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            list: [],
            filter: "",
            loading: true
        }
    }

    getDigimons() {
        this.setState({ loading: true })

        fetch('https://digimon-api.vercel.app/api/digimon')
            .then(response => response.json())
            .then(list => {
                this.setState({
                    list: list.filter(e => e.name.includes(this.state.filter)),
                    loading: false
                })
            })
    }

    componentDidMount() {
        this.getDigimons()
    }

    handleChangeFilter(event) {
        this.setState({
            filter: event.target.value
        })
        console.log(event.target.value)
    }

    // Enviando el formulario, enter dentro del input y tambien cuando se haga click en el boton
    handleSubmitFilter(event) {
        event.preventDefault()
        this.getDigimons()
    }

    render() {
        // {this.state.loading ? <h3>Cargando Digimones... </h3> : <DigimonList items={this.state.list} />}
        
        return (
            <div>
                <h1>Lista de Digimones</h1>
                <form onSubmit={this.handleSubmitFilter.bind(this)}>
                    <input type="text" value={this.state.filter} onChange={this.handleChangeFilter.bind(this)} />
                    <button>Filtrar</button>
                </form>

                {this.state.loading && <h3>Cargando Digimones... </h3>}
                {!this.state.loading && <DigimonList items={this.state.list} />}
                



                
            </div>
        );
    }
}

export default DigimonView