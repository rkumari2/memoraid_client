import React, { useEffect, useState } from 'react'
import { useAuth } from '../../authContext'
import { useNavigate } from 'react-router-dom'
import './style.css'
import { motion } from 'framer-motion'

const Register = () => {
  
  const { isRegistered, setIsRegistered, register } = useAuth()
  const [ inputName, setInputName ] = useState('')
  const [ inputEmail, setInputEmail ] = useState('')
  const [ inputPassword, setInputPassword ] = useState('')
  const navigate = useNavigate()

  const handleNameInput = (e) => {
    const name = e.target.value
    setInputName(name)
  }

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

    await register(inputName, inputEmail, inputPassword)
  }

  useEffect(() => {
    if (isRegistered) {
      setInputName('')
      setInputEmail('')
      setInputPassword('')
      alert('Signed Up successfully!')
      navigate('/login')

      setIsRegistered(false)
    }
  }, [isRegistered])


  return (
    <div className='page-layout'>
      <img className='bg-image' src="favicon.png" alt="light bulb graphic" />

      <div id='form-cont'>
        <h1>Register</h1>
        <form onSubmit={handleSubmit}>

          <input 
            type="text"
            name='name' required
            className='input-field'
            value={inputName}
            onChange={handleNameInput}
            placeholder='Name'
          />

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

          <motion.button type='submit' className='button' whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}> SIGN UP </motion.button>

          <p className='redirection-txt'> Already have an account? <a href="/login"> LOG IN </a></p>

        </form>
      </div>
    </div>
  )
}

export default Register
