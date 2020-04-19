import React, { Component } from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


class Footer extends Component {
  constructor(props) {
    super(props);
  };
  render() {
    return (
      <footer style={this.props.style}>
      
        
        <ul>
       <li>© <a href="https://www.lizdudek.com" target="_blank" rel="noopener noreferrer" title="The person behind this madness">Liz Dudek</a> 2020</li> 
      
      </ul>
        
       <small>Last updated: <time dateTime={this.props.YYYY + "-" + this.props.MM + "-" + this.props.DD}>{this.props.MM + "/" + this.props.DD + "/" + this.props.YYYY}</time></small>
        
      </footer>
    )
  }
}



export default Footer