import React from 'react'
import { BlogTileButton } from './Button'

const PostTile = ({ post, i, buttonName }) => {
  <div className="post-container" key={i}>
    <a className="post-content" href={post.post_url}>
      <div className="post-summary-text">{post.summary}</div>
      <img className="post-image" src={post.image_permalink} alt="" />
    </a>
    <div className="blog-button-container">
      <BlogTileButton buttonName={buttonName} />
    </div>
  </div>
}

export default PostTile