// CONTEXT
import AuthContext from "./context/AuthContext";
// PAGES
import Home from "./pages/Home";
import Single from "./pages/Single";
import Login from "./pages/Login";
import Registration from "./pages/Registration";
import CreateBlog from "./pages/CreateBlog";
import Logout from "./components/Logout";

// OUTLAST
import Header from "./components/Header";
import Footer from "./components/Footer";

import { Fragment, useEffect, useState } from "react";
import { Routes, Route, Link } from "react-router-dom";
import axios from "axios";

function App() {
  const [auth, setAuth] = useState(undefined); 
  useEffect(() => {
    if(localStorage.getItem("user")) {
      setAuth(JSON.parse(localStorage.getItem("user")))
    }
  }, [])
  
  return (
    <Fragment>
      <AuthContext.Provider value={{auth, setAuth}}>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} /> 
          <Route path="/login" element={<Login />} /> 
          <Route path="/registration" element={<Registration />} /> 
          <Route path="/newpost" element={<CreateBlog />} /> 
          <Route path="/single/:blogId" element={<Single />} />
          <Route path="/logout" element={<Logout />} />
        </Routes>
      </AuthContext.Provider>

      <Footer />
    </Fragment>  
  );
}

export default App;
