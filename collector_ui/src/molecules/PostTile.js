import React from 'react'
import { BlogTileButton } from '../atoms/Button'
import './PostTile.css'

const PostTile = ({ post, buttonName, handleAdd, handleRemove }) => (
  <div className="post-container">
    <a className="post-content" target="_blank" href={post.post_url}>
      <div className="post-summary-text">{post.summary}</div>
      <img className="post-image" src={post.photos ? post.photos[0].alt_sizes[0].url : ""} alt="" />
    </a>
    <div className="blog-button-container">
      <BlogTileButton buttonName={buttonName} handleAdd={handleAdd} handleRemove={handleRemove} />
    </div>
  </div>
)

export default PostTile