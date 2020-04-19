import React, { Component } from "react";
import { Card } from "./Library.jsx";
import Airtable from "airtable";
import GalleryModal from "./Modal2.jsx";
import Item from "./Item.jsx";
import LazyLoad from "react-lazyload";
import { Spinner, SpinnerCards } from "./Placeholder.jsx";
import Sort from "./Sort.jsx";
import { Route, Link } from "react-router-dom";
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

class SubCategory extends Component {
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
      columns: 3
    };
  }

  
  
  componentDidMount() {
    base("SubCategories")
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




  render() {
 

    return (
     
   <>
         {this.state.records.length > 0 ? (
            this.state.records.map((record, index) => (
        <section>
        <h2>{record.fields["Name"]}</h2>
       
                <Item recordID="
recz6tp8EofMHbZWl"></Item>
        
        {this.props.children}
        </section>
          ))
          ) : (
            <SpinnerCards />
          )}
        
        </>
      
   
      
        
    );
  }
}


export default SubCategory;

