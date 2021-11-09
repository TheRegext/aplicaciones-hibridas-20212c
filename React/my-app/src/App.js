import './App.css';
import React from 'react'
import Button from './components/Button'
//import Contador from './components/Contador'
//import DigimonView from './components/DigimonView';


class App extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      text: true
    }

  }

  componentDidMount(){
    setTimeout(()=>{
      this.cambiar()
    }, 5000)
  }

  cambiar(){
    this.setState({
      text: false
    })
  }
  
  render(){
    return (
      <div className="App">
        {this.state.text && <Button></Button>}
      </div>
    );
  }
  
}

export default App;
