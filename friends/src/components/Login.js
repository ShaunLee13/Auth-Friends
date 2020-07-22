import React, {useState} from 'react'
import axios from 'axios'
import {useHistory} from 'react-router-dom' 
import { Spinner } from 'react-bootstrap'

const initialLogin = {
    username: '',
    password: '',
    isLoading: false
}

const Login = () => {
    const [login , setLogin] = useState(initialLogin)
    const history = useHistory()

    const handleLogin = e => {
        setLogin({...login,[e.target.name]:e.target.value})
    }

    const submitLogin = e => {
        e.preventDefault()
        setLogin({...login, isLoading:true})
        axios.post("http://localhost:5000/api/login", login)
            .then(res => {
                window.localStorage.setItem('token', res.data.payload)
                history.push('/dashboard')
            }
            //res.data.payload = token <-set to localStorage
            
            )
            .catch(err => console.log(err.message))
    }

    return (
        <div>
            <h2>I'm a Login page</h2>
            <form onSubmit={submitLogin}>
                <label>Username&nbsp;
                    <input 
                    type='text'
                    name='username'
                    value={login.username}
                    onChange={handleLogin}
                    placeholder='Enter Username'
                    />
                </label>
                <label>Password&nbsp;
                <input 
                    type='password'
                    name='password'
                    value={login.password}
                    onChange={handleLogin}
                    placeholder='Enter Password'
                    />
                </label>
                <button type='submit' id='login-btn'>
                    <Spinner
                        as="span"
                        animation="grow"
                        size="sm"
                        role="status"
                        aria-hidden="true"
                    />
                    Submit
                </button>
            </form>
        </div>
    )   
}

export default Login