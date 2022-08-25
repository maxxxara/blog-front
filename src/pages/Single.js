import React, { Fragment } from 'react'
import { useParams } from "react-router-dom";
import BlogSingle from "../components/BlogSingle";

const Single = () => {
  let {blogId} = useParams()
  return (
    <Fragment>
      <BlogSingle />
    </Fragment>
  )
}

export default Single