import React from 'react'

class Contador extends React.Component {

	// Cuando se crea el objeto se llama al constructor
    constructor(props) {
        super(props)
        console.log("Contador::constructor")
        this.state = {
            count: 0
        }
    }

    incrementar() {
        console.log("Contador::incrementar")
        this.setState({
            count: this.state.count + 1
        })
    }

    decrementar(cant) {
        console.log("Contador::decrementar")
        this.setState({
            count: this.state.count - cant
        })
    }


    // Justo despues de montar el componente en el VDOM 
    componentDidMount() {
        console.log("Contador::componentDidMount")
    }
  
    // Justo antes de desmontar el componente del VDOM 
    componentWillUnmount() {
        console.log("Contador::componentWillUnmount")
    }

	// Cada vez que se dibuja se llama a render
    // Cada vez que cambia el estado, se llama a render
    // Cada vez que cambia una propriedad se llama a render
    render() {
        console.log("Contador::Render")
        return (
            <div>
                <p>{this.props.text}</p>
                <button onClick={this.decrementar.bind(this, 2)}>-</button>
                <input type="text" value={this.state.count} />
                <button onClick={this.incrementar.bind(this)}>+</button>
            </div>
        )
    }
}

export default Contador















