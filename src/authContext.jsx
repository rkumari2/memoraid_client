import axios from "axios";
import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext()

export function useAuth() {
    return useContext(AuthContext)
}

export function AuthProvider({ children }) {
    const [ isRegistered, setIsRegistered ] = useState(false)
    const [ isLoggedIn, setIsLoggedIn ] = useState(false)
    const [ responseToken, setResponseToken ] = useState(null)

    const register = async (inputName, inputEmail, inputPassword) => {

        try {
            const response = await axios.post('https://memoraide-server.onrender.com/users/register', {
                name: inputName, 
                email: inputEmail, 
                password: inputPassword
            })

            if (response.status === 201) {
                setIsRegistered(true)
            } else {
                alert('cannot sign up, please try again.')
            }

        } catch (err) {
            alert('Error signing up')
        }
    }

    const login = async (inputEmail, inputPassword) => {

        try {
            const response = await axios.post('https://memoraide-server.onrender.com/users/login', {
                email: inputEmail, 
                password: inputPassword
            })

            if (response.status === 200) {
                setIsLoggedIn(true)
                setResponseToken(response.data)

                localStorage.setItem('token', response.data.token)
            } else {
                alert ('Unable to Log In')
            }

        } catch (err) {
            alert('Wrong Credentials')   
        }
    }

    const logout = async () => {

        try {
            
            await axios.delete(`https://memoraide-server.onrender.com/users/tokens/${responseToken.token_id}`)

            localStorage.removeItem('token')
            setResponseToken(null)
            setIsLoggedIn(false)

        } catch (err) {
            alert('Error while logging out')
        }
    }

    useEffect(() => {
    }, [responseToken])

    return (
        <AuthContext.Provider value={{ isRegistered, setIsRegistered, isLoggedIn, register, login, logout}}>
            {children}
        </AuthContext.Provider>
    )
}
