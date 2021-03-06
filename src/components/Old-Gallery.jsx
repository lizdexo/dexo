import React, { Component } from "react";
import { Card } from "./Library.jsx";
import Airtable from "airtable";
import GalleryModal from "./Modal2.jsx";
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
      columns: 3
    };
  }

  
  
  componentDidMount() {
    base("ResourceDump")
      .select({ view: "All", fields: ["Name", "URL", "Description", "recordID", "ModifiedDate", "CategoryLink", "Cover", "Author", "Tags", "TagText", "SubCategory", "NotFree"]})
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

  handleShow = (record, name, desc, attachments, skilltags, softwaretags) => {
      
    this.setState({ selectedRecord: record });

    const id = record;
    const selectedTitle = name;
    const description = desc;
    const picArray = attachments;
    const skilltagsArray = skilltags;
    const softwaretagsArray = softwaretags;
    const selectedContent = [
      selectedTitle,
      description,
      picArray,
      skilltagsArray,
      softwaretagsArray
    ];
    const prevContent = this.state.content;

    if (prevContent !== selectedContent) {
      this.updateContent(selectedContent);
      console.log("content updated to", id);
    } else {
      console.log("content was not updated");
    }
  };

  updateContent(newContent) {
    const contentToUpdate = newContent;
    this.setState({ content: contentToUpdate });
  }



unBreakColumns = (cols) => {
  console.log(cols);
  this.setState({columns: cols})
}



  render() {
    const breakpointColumnsObj = {
      default: this.state.columns,
      1100: this.state.columns,
      900: 2,
      700: 1
    };

    return (
     
      <article id="gallery">
        <section className="intro">
       <h1>Web Development Resources</h1>
          </section>
        {/*<LazyLoad height={200} offset={500} once>  */}
        {/*</LazyLoad>*/}
        
       {this.state.showFilter == true ? <Sort onFilter={this.unBreakColumns} /> : null} 
        
       
        
        <div
          className="gallery-masonry"
        >
          
          {this.state.records.length > 0 ? (
            this.state.records.map((record, index) => (
              <Card
                key={record.fields["recordID"]}
                id={record.fields["recordID"]}
                category={record.fields["Category"]}
              >
                <figure>
                  <Link
                    to={`/webdev/${record.fields["recordID"]}`}
                    onClick={() =>
                      this.handleShow(
                        record.fields["recordID"],
                        record.fields["Name"],
                        record.fields["Description"],
                        record.fields["Cover"],
                        record.fields["Tags"],
                        record.fields["Author"]
                      )
                    }
                    data-link="internal"
                  >
                 
                    <img
                      src={record.fields["Cover"][0].url}
                      alt="project cover"
                    />
                  
                    <aside><FontAwesomeIcon icon="images" /> <b>{record.fields["Tags"].length}</b></aside>
                   
                  </Link>
                  <figcaption>
                  
                    <h3>{record.fields["Name"]}</h3>

                    <p>
                      {record.fields["Description"]}
                    </p>
                    <time dateTime={record.fields["ModifiedDate"]}>
                        {record.fields["ModifiedDate"]}
                      </time>
                    <p><a href={record.fields["URL"]} target="_blank">Go to website</a></p>

                    <dl className="tags">
                      
                      <dt></dt>
                      {record.fields["TagText"].length > 0 ? (
                        record.fields["TagText"].map((tag, index) => (
                          <dd key={index}>{tag}</dd>
                        ))
                      ) : (
                        <dd>No example available</dd>
                      )}

                    
                    </dl>
                  </figcaption>
                </figure>

                <div>
                  <Link
                    to={`/webdev/${record.fields["recordID"]}`}
                    onClick={() =>
                      this.handleShow(
                        record.fields["recordID"],
                        record.fields["Name"],
                        record.fields["Description"],
                        record.fields["Images"],
                        record.fields["Tags"],
                        record.fields["Software"]
                      )
                    }
                    className="view-details-link"
                    data-link="internal"
                  >
                    view details
                  </Link>
                </div>
              </Card>
            ))
          ) : (
            <SpinnerCards />
          )}
       
         </div>
        <Route
          exact
          path="/webdev/:recordID"
          render={props => (
            <ScrollLock>
            <GalleryModal
              {...props}
              recordID={this.state.selectedRecord}
              title={this.state.content[0]}
              description={this.state.content[1]}
              pics={this.state.content[2]}
              skilltags={this.state.content[3]}
              softwaretags={this.state.content[4]}
            />
           </ScrollLock>
          )}
        />
       
        
      </article>
      
        
    );
  }
}


export default Gallery;

