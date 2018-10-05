import React, { Component } from 'react'
import axios from 'axios'
import logo from './logo.svg';
import { FormButton, BlogTileButton } from './Button'
import SearchField from './SearchField'
import './App.css'

const server_path = 'http://localhost:3001'

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      posts: [],
      favPosts: [],
      blogName: '',
      tag: ''
    }

    this.handleClick = this.handleClick.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  handleClick(e) {
    e.preventDefault()

    let searchingPosts = this.state.blogName ? true : false
    let noSpacesBlogName = this.state.blogName.replace(/ /g, "")

    axios
      .get(`${server_path}/`, {
        params: {
          blog_name: noSpacesBlogName,
          tag: this.state.tag
        }
      })
      .then(res => {
        console.log('posts', res)
        this.setState({
          posts: searchingPosts ? res.data.posts : res.data
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
    let { posts, favPosts } = this.state
    let postsList = 
      posts ? 
        posts.map((post, i) => (
          <div className="post-container" key={i}>
            <a className="post-content" href={post.post_url}>
              <div className="post-summary-text">{post.summary}</div>
              <img className="post-image" src={post.image_permalink} alt="" />
            </a>
            <div className="blog-button-container">
              <BlogTileButton buttonName="add" handleAdd={this.handleAdd.bind(this, i)} />
            </div>
          </div>
        ))
      :
        ""

    let favsList = 
      favPosts ? 
        favPosts.map((post, i) => (
          <div className="post-container" key={i}>
            <a className="post-content" href={post.post_url}>
              <div className="post-summary-text">{post.summary}</div>
              <img className="post-image" src={post.image_permalink} alt="" />
            </a>
            <div className="blog-button-container">
              <BlogTileButton buttonName="remove" handleRemove={this.handleRemove.bind(this, i)} />
            </div>
          </div>
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
