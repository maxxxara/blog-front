import React from 'react'
import { Link } from 'react-router-dom'

const BlogItem = ({item}) => {
  return (
    <Link className="blog" to={"/single/" + item.id}>
        <div className="blog__image">
            <img src={"http://localhost/blog-api/" + item.image} />
        </div>
        <p className="blog__tag">{item.tag}</p>
        <p className="blog__title">{item.title}</p>
        <p className="blog__time">{item.created_at.substring(0,10).replace("-", " ").replace("-", " ")}</p>
        <p className="blog__desc">{item.description}</p>
        <div className="blog__author">
            <img src="https://i.ibb.co/QbM0q1K/avatar.png" />
            <p>{item.username}</p>
        </div>
    </Link  >
  )
}

export default BlogItem