import React, { Component } from 'react'
import axios from 'axios'
import { FormButton } from './atoms/Button'
import SearchField from './atoms/SearchField'
import PostTile from './molecules/PostTile'
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
  }

  handleSubmit = e => {
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

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleAdd = (i, e) => {
    e.preventDefault()

    let { posts, favPosts } = this.state 
    let newPosts = [...posts.slice(0, i), ...posts.slice(i + 1)]
    let newFavPosts = [...favPosts, posts[i]]
    this.setState({
      posts: newPosts,
      favPosts: newFavPosts
    })
  }

  handleRemove = (i, e) => {
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
        <div class="no-result">{noResults}</div>

    let favsList = 
      favPosts ? 
        favPosts.map((post, i) => (
          <PostTile post={post} key={i} buttonName="remove" handleRemove={this.handleRemove.bind(this, i)} />
        ))
      :
        ""    

    return (
      <div class="tumblr-demo-app">
        <div class="left-container" >
          <div class="form-container" >
            <form onSubmit={this.handleSubmit}>
              <div class="search-field-container">
                <SearchField title="Blog name:" name="blogName" blogName={this.state.blogName} handleChange={this.handleChange} />
                <SearchField title="Tag:" name="tag" tag={this.state.tag} handleChange={this.handleChange} />
              </div>
              <div class="search-button-container">
                <FormButton buttonName="Search" />
              </div>
            </form>
          </div>

          <div class="posts-container">
            {postsList}
          </div>          
        </div>
      
        <div class="right-container" >
          <div class="favorites-container">
            <h2>Favorites:</h2>
          </div>

          <div class="posts-container">
            {favsList}
          </div>
        </div>
      </div>
    )
  }
}

export default App
