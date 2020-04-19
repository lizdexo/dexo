import React, { Component } from 'react'


class Sidebar extends Component {
  constructor(props) {
    super(props);
  };
  render() {
    return (
     
      <aside id="sidebar">     
        {this.props.children}
       
      </aside>
        
       
    )
  }
}




export default Sidebar