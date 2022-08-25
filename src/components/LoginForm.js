import React, { useContext, useState, useEffect } from 'react'
import { FiLock, FiMail } from "react-icons/fi";
import { useNavigate } from 'react-router-dom';
import authContext from '../context/AuthContext';
import axios from "../axios/axios";

const LoginForm = () => {
  const navigate = useNavigate();
  const {auth, setAuth}  = useContext(authContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if(localStorage.getItem("user")) {
      navigate("/")
    }
  }, [])

  let onLoginSubmit = (e) => {
    e.preventDefault(e)
    axios.post('/user/login', {
      email: email,
      password: password
    })
    .then(function (response) {
      setAuth(response.data)
      localStorage.setItem("user", JSON.stringify(response.data))
      navigate("/")
    })
    .catch(function(error) {
      setError('asdad')
    })
  }

  return (
    <form className="form">
      <div className="container form__content">
        <h1 className="form__title">Sign In</h1>
        <p className="form__desc">Sign in to make your own post on our blog.</p>
        <div className="form__input">
          <FiMail />
          <input type="text" placeholder="Email" 
            value={email} onChange={(e) => {setEmail(e.target.value)}}
          />
        </div>
        <div className="form__input">
          <FiLock />
          <input type="password" placeholder="password" 
            value={password} onChange={(e) => {setPassword(e.target.value)}}
          />
        </div>
        {error ? <p className="form__error">პაროლი ან მეილი არასწორია.</p> : null}
        <button className="form__submit" onClick={onLoginSubmit} type='submit'>Sign in</button>
      </div>

    </form>
  )
}

export default LoginForm