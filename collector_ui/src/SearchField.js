import React from 'react'
import './SearchField.css'

const SearchField = ({ title, name, handleChange, blogName, tag }) => (
  <div className="search-field">
    <label>{title}</label>
    <input type="text" onChange={handleChange} name={name} value={blogName || tag}></input>
  </div>
)

export default SearchField