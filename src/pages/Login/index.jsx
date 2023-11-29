import React, { useEffect, useState } from 'react'
import { useAuth } from '../../authContext'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'

const Login = () => {

  const { isLoggedIn, login } = useAuth()
  const [ inputEmail, setInputEmail ] = useState('')
  const [ inputPassword, setInputPassword ] = useState('')
  const navigate = useNavigate()

  const handleEmailInput = (e) => {
    const email = e.target.value
    setInputEmail(email)
  }

  const handlePasswordInput = (e) => {
    const password = e.target.value
    setInputPassword(password)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    await login(inputEmail, inputPassword)
  }

  useEffect(() => {
    if (isLoggedIn) {
      setInputEmail('')
      setInputPassword('')
      alert('Logged In successfully!')
      navigate('/')
    }
  }, [isLoggedIn])


  return (
    <div className='page-layout'>
      <img className='bg-image' src="favicon.png" alt="light bulb graphic" />

      <div id='form-cont'>
        <h1>Log In</h1>
        <form onSubmit={handleSubmit}>

          <input 
            type="text"
            name='email' required
            className='input-field'
            value={inputEmail}
            onChange={handleEmailInput}
            placeholder='Email'
          />

          <input 
            type="password"
            name='password' required
            className='input-field'
            value={inputPassword}
            onChange={handlePasswordInput}
            placeholder='Password' 
          />

          <motion.button type='submit' className='button' whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}> LOG IN </motion.button>

          <p className='redirection-txt'> Don't have an account? <a href="/register"> SIGN UP </a></p>

        </form>
      </div>
    </div>
  )
}

export default Login
