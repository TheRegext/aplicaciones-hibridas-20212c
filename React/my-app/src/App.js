import './App.css';
import React from 'react'
import Contador from './components/Contador'
import DigimonView from './components/DigimonView';


class App extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      text: "Texto"
    }
  }

  cambiar(){
    this.setState({
      text: "Nuevo Texto"
    })
  }
  
  render(){
    return (
      <div className="App">
        <Contador text={this.state.text} />
        <button onClick={()=>this.cambiar()}>{this.state.text}</button>
        <DigimonView />
      </div>
    );
  }
  
}

export default App;
