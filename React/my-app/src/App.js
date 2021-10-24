import logo from './logo.svg';
import './App.css';
import Button from './components/Button'
import ButtonMagic from './components/ButtonMagic';


function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <Button pedro="Texto del Boton"/>
        <ButtonMagic />
      </header>
    </div>
  );
}

export default App;
