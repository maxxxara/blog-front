import React, { useState, useEffect } from 'react'
import { useParams } from "react-router-dom";
import axios from "../axios/axios";
const BlogSingle = () => {
  let params = useParams()
  const [data, setData] = useState([])
  useEffect(() => {
    axios({
        method: 'get',
        url: 'blog/get/' + params.blogId
      }).then(function (response) {
        setData(response.data)
        console.log(response.data)
    });
  }, [])

  return (
    <div className="single">
      <div className="container single__content">
        <div className="blog">
          <p className="blog__tag">{data.tag}</p>
          <p className="blog__title">{data.title}</p>
          <p className="blog__time">{data.created_at}</p>
          <div className="blog__image">
            <img src={"http://localhost/blog-api/" + data.image} />
          </div>
          <div className="blog__author">
            <img src="https://i.ibb.co/QbM0q1K/avatar.png" />
            <p>{data.username}</p>
          </div>
          <p className="blog__desc">{data.description}</p>
        </div>
      </div>
    </div>
  )
}

export default BlogSingle