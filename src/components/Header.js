import React, { useContext } from 'react'
import { Link } from 'react-router-dom';
import authContext from '../context/AuthContext';

const Header = () => {
  const {auth, setAuth}  = useContext(authContext);

  return (
    <header>
        <div className="container header__content">
            <div className="header__logo">
                <Link to="/"><h3>React Blog</h3></Link>
            </div>
            <div className="heaeder__nav">
                <ul className="header__nav-list">
                    <li className="header__nav-item">
                        <Link to="/" className="header__nav-link">Home</Link>
                    </li>
                    {auth ? <li className="header__nav-item">
                        <Link to="/logout" className="header__nav-link">Logout</Link>
                    </li> : null}
                    <li className="header__nav-item">
                        {!auth ? 
                        <Link to="/registration" className="header__nav-link">
                            <button className="header__nav-button">Sign Up</button>
                        </Link> : 
                        <Link to="/newpost" className="header__nav-link">
                            <button className="header__nav-button" style={{background: '#000638', color: '#fff', borderColor: '#000638'}}>Post Something</button>
                        </Link>}
                    </li>
                </ul>
            </div>
        </div>
    </header>
  )
}

export default Header