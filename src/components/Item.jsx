import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import LazyLoad from "react-lazyload";
import { LittleSpinner } from "./Placeholder.jsx";
import ReactMarkdown from "react-markdown";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import { Card } from "./Library.jsx";

//gonna try this: https://www.w3schools.com/howto/howto_js_quotes_slideshow.asp

class Item extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentID: "",
      id: this.props.recordID,  
    };
  }
  
  static defaultProps = {
    recordID: "recv6f9HKNMW2RDCB"
  };

  

 async componentDidMount(props) {
    
    const apiKey = process.env.REACT_APP_AIRTABLE_API_KEY;
    const baseID = process.env.REACT_APP_API_AIRTABLE_BASE_ID;

    const fetchURL =
      "https://api.airtable.com/v0/" + baseID + "/ResourceDump/" + this.props.recordID;

    const auth = "Bearer " + apiKey;
    const header = new Headers({
      "Content-Type": "application/json",
      Authorization: auth
    });


      const response = await fetch(fetchURL, {
        method: "GET",
        withCredentials: true,
        headers: header
      });

    
    const record = await response.json();

     this.renderContent(
     this.props.recordID,
      record.fields["Name"],
     record.fields["Description"]
     );
   console.log(record);
    
  }

  renderContent = (id, name, desc) => {
    const thisArray = id;
    const prevContent = this.state.id;

   
      this.setState({
        id: id,
        title: name,
        description: desc
      });
   
  };

 

  render() {
    return (
      <div>
        
       
        
        <Card
                key={this.state.id}
                id={this.state.id}
              >
          
          
           <h3>{this.state.title}</h3>
          <p>{this.state.description}</p>
        </Card>
     
      </div>
    );
  }
}

export default Item;
