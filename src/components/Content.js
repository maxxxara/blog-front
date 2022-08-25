import React, { Fragment, useContext, useEffect, useState } from 'react'
import { FiChevronLeft, FiChevronRight, FiSearch } from "react-icons/fi";
import BlogItem from "./BlogItem";
import authContext from '../context/AuthContext';
import axios from "../axios/axios";

const Content = () => {
  const {auth, setAuth}  = useContext(authContext);
  const [data, setData] = useState([]);
  const [show, setShow] = useState([])
  const [allItem, setAllItem] = useState(0);
  const [x, setX] = useState(0)
  const [y, setY] = useState(6)
  const [pageClicked, setPageClicked] = useState({left: false, right: false})
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')

  useEffect(() => {
    setLoading(false)
    let waitingArray = data.slice(x, y)
    if(waitingArray.length !== 0) {
        setShow(data.slice(x, y))
    } 
    else if(waitingArray.length == 0 && pageClicked.right) {
        setX(x - 6)
        setY(y - 6)
    } else if(waitingArray.length == 0 && pageClicked.left) {
        setX(x + 6)
        setY(y + 6)
    }
  }, [data, x])

  let onPagination = (which) => {

    
    if(which == "right") {
        pageClicked.right = true;
        pageClicked.left = false;
        setX(x + 6)
        setY(y + 6)
    } else {
        pageClicked.left = true;
        pageClicked.right = false;
        setX(x - 6)
        setY(y - 6)
    }
  }

  useEffect(() => {
    axios({
        method: 'get',
        url: 'blog/get/'
      }).then(function (response) {
        setData(response.data)
    });
  }, [])
  useEffect(() => {
    if(search == false) {
        axios({
            method: 'get',
            url: 'blog/get/'
          }).then(function (response) {
            setData(response.data)
        });
    } else {
        axios.get('/blog/search?search=' + search)
        .then(function (response) {
            if(response.data.length !== 0) {
                setData(response.data)
            } else {
                setData([])
            }
        })
    }
  }, [search])
  
  return (
    <div className="blogs">
        <div className="container blogs__content">
            <p className="blogs__title">{auth ? <Fragment>Hello {auth.username} Welcome to <br /></Fragment> : null}React JS Simple Blog</p>
            <p className="blogs__desc">A blog about everything, created for portfolio</p>
            <div className="blogs__search">
                <input type="text" placeholder="Search for articles" value={search} onChange={(e) => {setSearch(e.target.value)}}/>
                <FiSearch />
            </div>

            <div className="blogs__row">
                {show.map((item) => {
                    return (
                        <BlogItem item={item}/>
                    )
                })}
            </div>


            <div className="blogs__pagination">
                <span><FiChevronLeft onClick={() => onPagination('left')}/></span>
                <span><FiChevronRight onClick={() => onPagination('right')}/></span>
            </div>
        </div>
    </div>
  )
}

export default Content