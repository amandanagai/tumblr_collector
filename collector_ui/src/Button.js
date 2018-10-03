import React from 'react'
import './Button.css'

const FormButton = ({ buttonName }) => (
  <input type="submit" class="form-button" value={buttonName}></input>
)

const BlogTileButton = ({ buttonName }) => (
  <a href="" class={`blog-tile-button-${buttonName}`}>{buttonName}</a>
)

export { FormButton, BlogTileButton }