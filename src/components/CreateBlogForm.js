import React, { createRef, useState, useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from "../axios/axios";
import authContext from '../context/AuthContext';

const CreateBlogForm = () => {
  useEffect(() => {
    if(!localStorage.getItem("user")) {
      navigate("/")
    }
  }, [])
  const {auth, setAuth}  = useContext(authContext);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [tag, setTag] = useState('');
  const [image, setImage] = useState('');
  const imageRef = createRef();
  const [error, setError] = useState('');
  const navigate = useNavigate();

  let onFormSubmit = (e) => {
    e.preventDefault();
    axios({
      method: 'post',
      url: '/blog/create',
      data: {
        title: title,
        description: description,
        tag: tag.split(' ')[0],
        image: imageRef.current.files[0],
        user_id: auth.id
      },
      headers: {'Content-Type': 'multipart/form-data' }
      })
      .then(function (response) {
        navigate("/")
      })
      .catch(function (response) {
        setError('ყველა ველის შევსება აუცილებელია');
      });
  }

  return (
    <form className="form" onSubmit={onFormSubmit}>
      <div className="container form__content">
        <h1 className="form__title" style={{marginBottom: "50px"}}>Create new Post</h1>
        <div className="form__input">
          <input type="text" placeholder="Title" 
            value={title}
            onChange={(e) => {setTitle(e.target.value)}}
          />
        </div>
        <div className="form__input">
          <input type="text" placeholder="Description" style={{height: '100px'}}
            value={description} onChange={(e) => {setDescription(e.target.value)}}
          />
        </div>
        <div className="form__input">
          <input type="text" placeholder="Tag" 
            value={tag} onChange={(e) => {setTag(e.target.value)}}
          />
        </div>
        <div className="form__input">
          <label style={{fontSize: '14px', color: '#5F5F5F', marginBottom: '8px'}}>Image</label>
          <input type="file" ref={imageRef} value={image} onChange={(e) => {setImage(e.target.value)}} />
        </div>
        {error ? <p className="form__error">{error}</p> : null}
        <button className="form__submit" type='submit' style={{width: '220px'}}>Create New Post</button>
      </div>

    </form>
  )
}

export default CreateBlogForm