import React, { Component } from "react";
import { Card } from "./Library.jsx";
import Airtable from "airtable";
import GalleryModal from "./Modal2.jsx";
import SubCategory from "./SubCategory.jsx";
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

class Gallery extends Component {
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
      selectedCategory: this.props.category
    };
  }

  
  
  componentDidMount() {
    // let paramID = this.props.match.params;
   // let thisCategory = paramID.category;
    
   // console.log(thisCategory);
  //  this.setState({ selectedCategory: thisCategory });
    
    base("ResourceDump")
      .select({ view: `${this.state.selectedCategory}`, fields: ["Name", "URL", "Description", "recordID", "ModifiedDate", "CategoryLink", "Cover", "Author", "Tags", "TagText", "SubCategory", "NotFree"]})
      .eachPage((records, fetchNextPage) => {
        this.setState({ records: records });
        fetchNextPage();
      });
   
  }




  componentDidUpdate(prevProps, prevState) {
    
    
    if(prevState.selectedCategory !== this.state.selectedCategory) { 
     console.log("yay");
    } else {
      console.log("go to bed");
    }
    
    
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
        <h2 className="white-heading">{this.props.category}</h2>
        
        <div
          className="gallery-masonry"
        >
          
          {this.state.records.length > 0 ? (
            this.state.records.map((record, index) => (
                <a href={record.fields["URL"]} target="_blank" className="list-item-link"
                    data-link="internal">
              <Card
                key={record.fields["recordID"]}
                id={record.fields["recordID"]}
                category={record.fields["Category"]}
              >
               
                
                
                <figure>
                                 
                    <img
                      src={record.fields["Cover"][0].url}
                      alt="project cover"
                    />
    
                  <figcaption>
                  
                    
<h3>{record.fields["Name"]}</h3>
                    <p>
                      {record.fields["Description"]}
                    </p>
                    
                    <time dateTime={record.fields["ModifiedDate"]}>
                        {record.fields["ModifiedDate"]}
                      </time>
                   
                  </figcaption>
                  
             
                   
                </figure>
       
                    

                    <dl className="tags">
                      
                   
                      {record.fields["TagText"].length > 0 ? (
                        record.fields["TagText"].map((tag, index) => (
                          <dd key={index}>{tag}</dd>
                        ))
                      ) : (
                        <dd>No example available</dd>
                      )}

                    
                    </dl>
               
              </Card>
                </a>
            ))
          ) : (
            <SpinnerCards />
          )}
       
         </div>
     
       
        </>   
     
      
        
    );
  }
}


export default Gallery;

