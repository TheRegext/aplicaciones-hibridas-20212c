// Componte de clase
import React from 'react'

class ButtonMagic extends React.Component{

    constructor(props){
        super(props)
        this.state = {
            text: 'Hola que hace'
        }
    }

    cambiar(){
        this.setState({
            text: 'Nuevo Valor'
        })
    }

    render(){
        return (
            <button onClick={this.cambiar}>{this.state.text}</button>
        )
    }
}

export default ButtonMagic
