import { useState } from 'react'

import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { FormGroup, Container, Box } from '@mui/material';
import { useAuth } from '../context/Auth.Context'

import * as API from '../api/auth.api'



function Login({ onLogin }) {
    const { state, dispatch } = useAuth()
    const [email, setEMail] = useState("")
    const [password, setPassword] = useState("")

    function onSubmit(e) {
        e.preventDefault()

        API.login(email, password)
            .then(function (data) {
                localStorage.setItem('token', data.token)
                localStorage.setItem('user', JSON.stringify(data.user))
                dispatch({ type: 'LOGIN', payload: data.user })
            })
            .catch(function (err) {
                alert(JSON.stringify(err))
            })
    }

    return (
        <Container maxWidth="sm">
            <Box>
                <FormGroup>
                    <TextField label="E-Mail" value={email} onChange={(e) => { setEMail(e.target.value) }} />
                </FormGroup>
                <FormGroup>
                    <TextField label="Password" type="password" value={password} onChange={(e) => { setPassword(e.target.value) }} />
                </FormGroup>

                <Button variant="outlined" onClick={(e) => onSubmit(e)}>Acceder</Button>
            </Box>
        </Container>
    )
}

export default Login