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
      blogName: '',
      tag: ''
    }

    this.handleClick = this.handleClick.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  handleClick(e) {
    e.preventDefault()

    axios
      .get(`${server_path}/`, {
        params: {
          blog_name: this.state.blogName
        }
      })
      .then(res => {
        console.log('posts', res)
        this.setState({
          posts: res.data.posts
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
  
  render() {
    let { posts } = this.state
    let postsList = posts.map((post, i) => (
      <div class="postContainer">
        <div class="textContainer">
          <a href={post.post_url}>
            <div class="blogSummaryBox" >
            <p class="summaryText" key={i}>{post.body.replace(/<\/?p>/g, '')}</p>
            </div>
          </a>
        </div>
        <div>
          <BlogTileButton buttonName="add" />
        </div>
      </div>
    ))

    return (
      <div id="tumblrDemoApp">
        <div id="formContainer" >
          <form id="searchForm" onSubmit={this.handleClick}>
            <SearchField title="Blog name:" name="blogName" blogName={this.state.blogName} handleChange={this.handleChange} />
            <SearchField title="Tag:" name="tag" tag={this.state.tag} handleChange={this.handleChange} />
            <FormButton buttonName="Search" />
          </form>
        </div>

        <div id="postsContainer">
          {postsList}
        </div>
      </div>
    )
  }
}

export default App
