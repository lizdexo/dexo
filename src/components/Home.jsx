import React, { Component } from 'react'
import { Link } from "react-router-dom";



class Home extends Component {
  constructor(props) {
    super(props);
  };
  render() {
    return (
      <article>
         <section className="intro">
        <h1>Hi there!</h1>
        </section>
        <section className="content">  
        <h2>This site is under construction</h2>
    
       <p>Please come back later.</p>
        </section>
      </article>
    )
  }
}




export default Home