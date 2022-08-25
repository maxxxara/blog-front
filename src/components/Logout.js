import React, {useContext, useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import authContext from '../context/AuthContext';

const Logout = () => {
    const navigate = useNavigate();
    const {auth, setAuth}  = useContext(authContext);
    useEffect(() => {
      localStorage.removeItem("user")
      setAuth(undefined);
      navigate("/")
    }, [])
    
  return (
    <div>

    </div>
  )
}

export default Logout