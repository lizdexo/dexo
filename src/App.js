import React, { Component } from "react";
import {
  Switch,
  Route
} from "react-router-dom";

import logo from "./logo.svg";
import "./sass/index.scss";

/* the basic layout */
import Header from "./components/Header.jsx";
import Nav from "./components/Nav.jsx";
import Sidebar from "./components/Sidebar.jsx";
import Main from "./components/Main.jsx";
import Footer from "./components/Footer.jsx";

/* placeholder components */
import LoremIpsum, {
  Spinner,
  SpinnerCards
} from "./components/Placeholder.jsx";

/* pages */
import Gallery from "./components/Gallery.jsx";
import Category from "./components/Category.jsx";
import About from "./components/About.jsx";
import Contact from "./components/Contact.jsx";
import Airtable from "./components/AirtableEmbed.jsx";
import Home from "./components/Home.jsx";

/* setting up some cool icons */
import { library } from "@fortawesome/fontawesome-svg-core";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { faTimes, faSpinner, faEnvelopeSquare, faDribbbleSquare, faLinkedIn, faExternalLinkAlt, faGripHorizontal, faBookOpen, faExpand, faImages} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

library.add(fab, faTimes, faSpinner, faEnvelopeSquare, faExternalLinkAlt, faGripHorizontal, faBookOpen, faExpand, faImages );

/* navigation */

const route = [

    {
      id: 1,
      url: "/webdev",
      label: "Web Development Resources"
    },
  {
      id: 2,
      url: "/uxui",
      label: "UX/UI Resources"
    },
    {
      id: 3,
      url: "/about",
      label: "about"
    },
    {
      id: 4,
      url: "/contact",
      label: "contact"
    }
   
  ];


/* the magic */

class App extends Component {

  
  render() {
       
    return (
   
      <div className="app-container">
        
   
        
        <Main>
         
          
            <Sidebar> 
                <Header siteTitle="Dexo" tagline="Projects, Resources, and Whatever">
          
        </Header>
             <Nav pages={route} />
              
           
          </Sidebar>
        
       
           <Switch>
              <Route exact path="/">
                <Home />
              </Route>
              <Route path="/webdev">
             <Category />
             </Route>
             <Route path="/uxui">
                <Airtable />
              </Route>  
              <Route path="/about">
                <About />
              </Route>
              <Route path="/contact">
                <Contact />
              </Route>   
           </Switch>
            
        
        </Main>
        
             <Footer
          MM="4"
          DD="18"
          YYYY="2020"         
          />
       
      </div>
     
    );
  }
}

export default App;
