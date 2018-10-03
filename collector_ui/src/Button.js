import React from 'react'
import './Button.css'

const FormButton = ({ buttonName }) => (
  <input type="submit" className="form-button" value={buttonName}></input>
)

const BlogTileButton = ({ buttonName }) => (
  <a href="" className={`blog-tile-button-${buttonName}`}>{buttonName}</a>
)

export { FormButton, BlogTileButton }