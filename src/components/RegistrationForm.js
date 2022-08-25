import React, { useContext, useState, useEffect } from 'react'
import { FiLock, FiMail, FiUser } from "react-icons/fi";
import { Link, useNavigate } from 'react-router-dom';
import authContext from '../context/AuthContext';
import axios from "../axios/axios";

const RegistrationForm = () => {
  useEffect(() => {
    if(localStorage.getItem("user")) {
      navigate("/")
    }
  }, [])

  const navigate = useNavigate();
  const {auth, setAuth}  = useContext(authContext);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('')

  let onFormSubmit = (e) => {
    e.preventDefault();
    setError('')
    axios.post('/user/new', {
      username: username,
      email: email,
      password: password
    })
    .then(function (response) {
      return navigate("/login")
    })
    .catch(function (error) {
      setError(error.response.data)
    });
  }

  return (
    <form className="form">
      <div className="container form__content">
        <h1 className="form__title">Sign up</h1>
        <p className="form__desc">Please make account to make your own post on our blog. <br /> if you already have account <Link to="/login">Sign in</Link></p>
        <div className="form__input">
          <FiUser />
          <input type="text" placeholder="Username" 
            value={username} onChange={(e) => {setUsername(e.target.value)}} 
          />
        </div>
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
        {error ? <p className="form__error">{error}</p> : null}
        <button className="form__submit" onClick={onFormSubmit} type='submit'>Sign in</button>
      </div>

    </form>
  )
}

export default RegistrationForm