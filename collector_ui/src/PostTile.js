import React from 'react'
import { BlogTileButton } from './Button'
import './PostTile.css'

const PostTile = ({ post, buttonName, handleAdd, handleRemove }) => (
  <div className="post-container">
    <a className="post-content" href={post.post_url}>
      <div className="post-summary-text">{post.summary}</div>
      <img className="post-image" src={post.image_permalink} alt="" />
    </a>
    <div className="blog-button-container">
      <BlogTileButton buttonName={buttonName} handleAdd={handleAdd} handleRemove={handleRemove} />
    </div>
  </div>
)

export default PostTile