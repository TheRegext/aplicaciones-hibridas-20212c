import './App.css';
import { useState, useEffect } from 'react'
import { Routes, Route, Link, Navigate, useNavigate } from 'react-router-dom';
import Home from './pages/Home';
import Products from './pages/Products';
import Product from './pages/Product';
import Login from './pages/Login'
import { useAuth } from './context/Auth.Context'
//import Chat from './pages/Chat'



function AuthRoute({ children }) {
  const { state } = useAuth()
  return state.isAuthenticated ? children : <Navigate to="/login" />
}

function AuthDiv({ children }) {
  const { state } = useAuth()
  return state.isAuthenticated ? children : null
}


function App(props) {
  const auth = useAuth()

  let navigate = useNavigate();

  useEffect(() => {
    if (auth.state.isAuthenticated) {
      navigate('/')
    }
    else {
      navigate('/login')
    }
  }, [auth.state])

  useEffect(() => {
    if (localStorage.getItem('token') && localStorage.getItem('user')) {
      const user = JSON.parse(localStorage.getItem('user'))
      auth.dispatch({ type: 'LOGIN', payload: user })
    }
  }, [])

  return (
    <div className="App">
      <h1>Este es el titulo de mi pagina web</h1>
      <AuthDiv>
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
          <AuthRoute><Home /></AuthRoute>
        } />
        <Route path="/login" element={<Login />} />
        <Route path="/products" element={
          <AuthRoute><Products /></AuthRoute>
        } />
        <Route path="/products/:id" element={<Product />} />


        <Route path="/404" element={<h1>Bloqueado por bobi</h1>} />

        <Route path="*" element={<Navigate to="/404" />} />
      </Routes>
    </div>
  );
}

export default App;
