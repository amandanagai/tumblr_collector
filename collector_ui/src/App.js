import React, { Component } from 'react'
import axios from 'axios'
import { FormButton } from './Button'
import SearchField from './SearchField'
import PostTile from './PostTile'
import './App.css'

const server_path = 'http://localhost:3001'

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      posts: [],
      favPosts: [],
      blogName: '',
      tag: '',
      noResults: ''
    }
    this.handleClick = this.handleClick.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  handleClick(e) {
    e.preventDefault()

    let noSpacesBlogName = this.state.blogName.replace(/ /g, "")

    axios
      .get(`${server_path}/`, {
        params: {
          blog_name: noSpacesBlogName,
          tag: this.state.tag
        }
      })
      .then(res => {
        this.setState({
          posts: res.data,
          noResults: 'no results'
        })
      })
      .catch(error => {
         console.log(error)
      })
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleAdd(i, e) {
    e.preventDefault()

    let { posts, favPosts } = this.state 
    let newPosts = [...posts.slice(0, i), ...posts.slice(i + 1)]
    let newFavPosts = [...favPosts, posts[i]]
    this.setState({
      posts: newPosts,
      favPosts: newFavPosts
    })
  }

  handleRemove(i, e) {
    e.preventDefault()

    let { posts, favPosts } = this.state 
    let newFavPosts = [...favPosts.slice(0, i), ...favPosts.slice(i + 1)]
    let newPosts = [...posts, favPosts[i]]
    this.setState({
      posts: newPosts,
      favPosts: newFavPosts
    })
  }
  
  render() {
    let { posts, favPosts, noResults } = this.state
    let postsList = 
      posts.length > 0 ? 
        posts.map((post, i) => (
           <PostTile post={post} key={i} buttonName="add" handleAdd={this.handleAdd.bind(this, i)} />
        ))
      :
        <div id="no-result">{noResults}</div>

    let favsList = 
      favPosts ? 
        favPosts.map((post, i) => (
          <PostTile post={post} key={i} buttonName="remove" handleRemove={this.handleRemove.bind(this, i)} />
        ))
      :
        ""    

    return (
      <div id="tumblr-demo-app">
        <div id="left-container" >
          <div id="form-container" >
            <form id="search-form" onSubmit={this.handleClick}>
              <div id="search-field-container">
                <SearchField title="Blog name:" name="blogName" blogName={this.state.blogName} handleChange={this.handleChange} />
                <SearchField title="Tag:" name="tag" tag={this.state.tag} handleChange={this.handleChange} />
              </div>
              <div id="search-button-container">
                <FormButton buttonName="Search" />
              </div>
            </form>
          </div>

          <div id="posts-container">
            {postsList}
          </div>          
        </div>
      
        <div id="right-container" >
          <div id="favorites-container">
            <h2>Favorites:</h2>
          </div>

          <div id="posts-container">
            {favsList}
          </div>
        </div>
      </div>
    )
  }
}

export default App
