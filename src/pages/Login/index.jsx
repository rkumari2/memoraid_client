import React, { useEffect, useState } from 'react'
import { useAuth } from '../../authContext'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useSelector } from 'react-redux'

const Login = () => {

  const { isLoggedIn, login } = useAuth()
  const [ inputEmail, setInputEmail ] = useState('')
  const [ inputPassword, setInputPassword ] = useState('')
  const [ loginFeedback, setLoginFeedback ] = useState(false)

  const navigate = useNavigate()

  const { spacing, lineSpacing, size } = useSelector((state) => state.accessibility)

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
      setLoginFeedback(true)
      // alert('Logged In successfully!')

      setTimeout(() => {
        setLoginFeedback(false)
        navigate('/')
      }, 1000)
    }
  }, [isLoggedIn])

  return (
    <div className='page-layout'>
      <img className='bg-image' src="favicon.png" alt="light bulb graphic" />

      <div id='form-cont'>
        {loginFeedback && <motion.div className='feedback' animate={{y:'120px'}}> Logged In Successfully! </motion.div>}
        <h1 style={{lineHeight: lineSpacing, letterSpacing: spacing}}>Log In</h1>
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

          <motion.button type='submit' className='button' whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}
          style={{fontSize: size, lineHeight: lineSpacing, letterSpacing: spacing}}> Log In </motion.button>

          <p className='redirection-txt' style={{fontSize: size, lineHeight: lineSpacing, letterSpacing: spacing}}> Don't have an account? <a href="/register"> Sign Up </a></p>
        </form>
      </div>
    </div>
  )
}

export default Login
