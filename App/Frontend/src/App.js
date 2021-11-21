import './App.css';
import { useState, useEffect } from 'react'
import { Routes, Route, Link, Navigate, useNavigate } from 'react-router-dom';
import Home from './pages/Home';
import Products from './pages/Products';
import Product from './pages/Product';
import Login from './pages/Login'


function AuthRoute(props) {
  return props.isAuthenticated ? props.children : <Navigate to="/login" />
}

function AuthDiv(props) {
  return props.isAuthenticated ? props.children : null
}


function App(props) {

  const [isAuthenticated, setAuthenticated] = useState(false)
  let navigate = useNavigate();


  const handleLogin = () => {
    setAuthenticated(true)
    navigate('/', { replace: true })
  }


  useEffect(() => {
    localStorage.getItem('token') ? handleLogin() : setAuthenticated(false)
  }, [])

  return (
    <div className="App">
      <h1>Este es el titulo de mi pagina web</h1>
      <AuthDiv isAuthenticated={isAuthenticated}>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/products">Products</Link>
            </li>
          </ul>
        </nav>
      </AuthDiv>
      <Routes>
        <Route path="/" element={
          <AuthRoute isAuthenticated={isAuthenticated}><Home /></AuthRoute>
        } />
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
        <Route path="/products" element={
          <AuthRoute isAuthenticated={isAuthenticated}><Products /></AuthRoute>
        } />
        <Route path="/products/:id" element={<Product />} />
        <Route path="/404" element={<h1>Bloqueado por bobi</h1>} />
        <Route path="*" element={<Navigate to="/404" />} />
      </Routes>
    </div>
  );
}

export default App;
