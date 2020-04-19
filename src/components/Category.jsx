import React, { Component } from "react";
import { Card } from "./Library.jsx";
import Airtable from "airtable";
import GalleryModal from "./Modal2.jsx";
import Gallery from "./Gallery2.jsx";
import Item from "./Item.jsx";
import LazyLoad from "react-lazyload";
import { Spinner, SpinnerCards } from "./Placeholder.jsx";
import Sort from "./Sort.jsx";
import { Route, Link, Switch, NavLink } from "react-router-dom";
import Masonry from "react-masonry-css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  disableBodyScroll,
  enableBodyScroll,
  clearAllBodyScrollLocks
} from "body-scroll-lock";
//considering adding this: https://reacttraining.com/react-router/web/example/modal-gallery
import ScrollLock from 'react-scroll-lock-component';

const base = new Airtable({
  apiKey: process.env.REACT_APP_AIRTABLE_API_KEY
}).base(process.env.REACT_APP_API_AIRTABLE_BASE_ID);

class Category extends Component {
  constructor(props) {
    super(props);
    this.state = {
      projects: "yer mum",
      recordsInit: [],
      records: [],
      showModal: false,
      showFilter: false,
      selectedRecord: "recdjhA2dqh6P1eIC",
      observerRecord: "",
      content: [],
      columns: 3,
      selectedCategory: "essential"
    };
  }

  
  
  componentDidMount() {
    base("Categories")
      .select({ view: "All", fields: ["Name", "ResourceDump"]})
      .eachPage((records, fetchNextPage) => {
        this.setState({ records: records });
        fetchNextPage();
      });
   
  }




  componentDidUpdate(prevProps, prevState) {
    if (prevState.records !== this.state.records) {
      console.log("records initially loaded");
      
      if (prevState.showFilter !== true) {
      this.setState({showFilter: true});
      }
      
    } else {
    }

    if (prevState.content !== this.state.content) {
      console.log("record content loaded:", this.state.content[0]);
    } else {
      console.log("no new content loaded yet");
    }
  }

  

  updateContent(newContent) {
    const contentToUpdate = newContent;
    this.setState({ content: contentToUpdate });
  }

    handleShow = (category) => {
      
    this.setState({ selectedCategory: category });

  };



  render() {
 

    return (
     
   <article id="gallery">
        <section className="intro">
       <h1>Web Development Resources</h1>
          </section>
       
        
       <nav>
     <ul>
        
        
         {this.state.records.length > 0 ? (
            this.state.records.map((record, index) => (
        
             <li>
           <NavLink
                    to={`/webdev/${record.fields["Name"]}`}
                    data-link="internal"
             activeClassName="selectedCategory"
      >
           {record.fields["Name"]}
        </NavLink>     
              </li>
         
              
       
          ))
          ) : (
            <SpinnerCards />
          )}
        
        </ul>
        </nav> 
       
        <Route exact path="/webdev/"
          render={props =>(<Content />)}          
          />
          
        
         {this.state.records.length > 0 ? (
            this.state.records.map((record, index) => (
        
              
              <Route
          exact
          path={`/webdev/${record.fields["Name"]}`}
          render={props => (
        <Gallery 
          {...props}          
          category={record.fields["Name"]}
          />
          )}
        /> 
        
   
         
              
       
          ))
          ) : (
            <SpinnerCards />
          )}
       
         
      
        
        
        
        
       
     
        
        </article>
      
   
      
        
    );
  }
}


export default Category;


        
        const Content = (props) => {
          return (
           <section className="content">
      
          
           <h2>Stuff you should know</h2>
      <h3>Here's a list of things you should know to become proficient.</h3>
      <p>Keep in mind this is beginner & intermediate level stuff. It only scratches the surface of how deep you can go with web/front end development.</p>
      <p>One day I'll re-organize this section and add links to related resources, but for now just keep this stuff in mind while you're learning.</p>
      <p>Keep scrolling to see the resource links.</p>
      <br />
      <details>
        <summary>Development Essentials</summary>
                <ul>
              <li>How to create a website from scratch using HTML, CSS, and JS</li>
              <li>HTML & CSS, without relying on Bootstrap</li>
              <li>JavaScript, without relying on jQuery</li>
              <li>command line git and/or github</li>
              <li>webpack & other build tools</li>
                  <li>HTTPS, SSL & security</li>
              <li>htaccess</li>
              <li>Domains & DNS</li>
                  <li>Where & how to host your website and data</li>
              <li>Browser inspect/Dev Tools</li>
              <li>How to decide on the frameworks & tools that are best for your project</li>
             <li>How to set up a full dev environment</li>
            </ul>
      </details>
      <details>
        <summary>HTML</summary>
             <ul>
                <li>Semantic page structure</li>
                <li>Accessibility</li>
                <li>Forms</li>
                <li>Deprecated tags to avoid</li>
                <li>importing styles & scripts to a page</li>
              </ul>
      </details>
      <details>
        <summary>CSS</summary>
             <ul>
              <li>Specificity & cascade</li>
              <li>The Box Model</li>
              <li>Media Queries</li>
              <li>Length units</li>
               <li>Typography</li>
              <li>Pre-Processors</li>
              <li>Selectors & Pseudo-selectors</li>
              <li>Properties & their values</li>
              <li>Display & Positioning</li>
              <li>Grid & Flexbox</li>
              <li>Animations & transitions</li>
              <li>SVG</li>
              <li>Browser compatibility</li>
            </ul>
      </details>
      <details>
        <summary>JavaScript</summary>
         <ul>
               <li>Asynchronous vs Synchronous</li>
           <li>AJAX programming</li>
              <li>Functional vs Object-Oriented</li>
              <li>The Document Object Model</li>   
              <li>HTTP requests & APIs</li>
              <li>front end vs back end uses of JavaScript </li>
               <li>Familiarity with frameworks & libraries</li>
            </ul>
      </details>
      <details>
        <summary>Other</summary>
       <ul>
         <li>User experience principles & best practices</li>
         <li>Accessibility best practices</li>
         <li>Knowledge of color theory & graphic design basics</li>
         <li>Information architecture</li>
         <li>Good project management & file organization</li>
        </ul>
      </details>
      
      <h3><strong>Always remember:</strong></h3> 
          <p><mark>HTML is for content structure</mark></p>
      <p><mark>CSS is for appearance</mark></p>
      <p><mark>JavaScript is for interactivity</mark></p>
          
      
        </section>
        
          
          )
          
          
          
        }
        export {Content};