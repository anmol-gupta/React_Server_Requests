import React, { Component } from "react";
import axios from "axios";
import "./FullPost.css";

class FullPost extends Component {
  state = {
    loadedPost: null
  };
  componentDidUpdate() {
    if (this.props.postId) {
      if (
        !this.state.loadedPost ||
        (this.state.loadedPost &&
          this.state.loadedPost.id !== this.props.postId)
      ) {
        axios
          .get(
            `https://jsonplaceholder.typicode.com/posts/${this.props.postId}`
          )
          .then(resolve => {
            console.log(resolve);
            this.setState({ loadedPost: resolve.data });
          });
      }
    }
  }
  deletePostHandler = () => {
    axios
      .delete(`https://jsonplaceholder.typicode.com/posts/${this.props.postId}`)
      .then(resolve => {
        console.log(resolve);
      });
  };
  render() {
    let post = <p style={{ textAlign: "center" }}>Please select a Post!</p>;
    if (this.props.postId) {
      <p style={{ textAlign: "center" }}>Loading...!!!</p>;
    }
    if (this.state.loadedPost) {
      post = (
        <div className="FullPost">
          <h1>{this.state.loadedPost.title}</h1>
          <p>{this.state.loadedPost.body}</p>
          <div className="Edit">
            <button
              className="Delete"
              onClick={this.deletePostHandler}
            >
              Delete
            </button>
          </div>
        </div>
      );
    }

    return post;
  }
}

export default FullPost;
