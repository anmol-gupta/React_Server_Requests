import React, { Component } from "react";
import axios from "axios";
import Post from "../../components/Post/Post";
import FullPost from "../../components/FullPost/FullPost";
import NewPost from "../../components/NewPost/NewPost";
import "./Blog.css";

class Blog extends Component {
  state = {
    posts: [],
    selectedPostId: null
  };

  fullPostHandler = (idx) => {
    this.setState({selectedPostId: idx});
  }

  componentDidMount() {
    axios
      .get("https://jsonplaceholder.typicode.com/posts")
      .then(resolve => {
        const posts = resolve.data.slice(0,4);
        const updatedPosts = posts.map(post => {
            return {
                ...post,
                author: 'Anmol'
            }
        })
        this.setState({ posts: updatedPosts });
        console.log(resolve);
      })
      .catch(reject => {
        console.log(reject);
      });
  }
  render() {
    const posts = this.state.posts.map(post => (
      <Post key={post.id} author={post.author} title={post.title} clicked={this.fullPostHandler.bind({},post.id)}/>
    ));
    return (
      <div>
        <section className="Posts">{posts}</section>
        <section>
          <FullPost postId={this.state.selectedPostId}/>
        </section>
        <section>
          <NewPost />
        </section>
      </div>
    );
  }
}

export default Blog;
