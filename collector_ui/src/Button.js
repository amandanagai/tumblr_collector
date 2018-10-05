import React from 'react'
import './Button.css'

const FormButton = ({ buttonName }) => (
  <input type="submit" className="form-button" value={buttonName}></input>
)

const BlogTileButton = ({ buttonName, handleAdd, handleRemove }) => (
  <a href="" className={`blog-tile-button-${buttonName}`} onClick={handleAdd || handleRemove}>{buttonName}</a>
)

export { FormButton, BlogTileButton }