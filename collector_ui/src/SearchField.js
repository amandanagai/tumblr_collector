import React from 'react'

const SearchField = ({ title, name, handleChange, blogName, tag }) => (
  <div>
    <label>{title}</label>
    <input type="text" onChange={handleChange} name={name} value={blogName || tag}></input>
  </div>
)

export default SearchField