import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import App from './App.js'


class MyClass extends Component {
  constructor(props){
    super(props);
    
  }
   componentWillReceiveProps(prevProps) {
    if(this.props.center !== prevProps.data){ 
       this.setState({ center: this.props.data});
       console.warn("new_Center-->",this.props.center);
       console.warn("new_Center-->",this.props.data);
    }
 }
  render() {
    return (
      <GoogleMapReact
      resetBoundsOnResize={true}
      // bootstrapURLKeys={{ key:'AIzaSyADvYN9O8i0-6ZFwwX_o13YMNKbA7qnKtw' }}
        center={this.props.data}
        defaultZoom={this.props.zoom}
        style={{height: '200px',width :'400px',float:'right' }}
      >
      </GoogleMapReact >
    );
  }
}
MyClass.defaultProps = {
  zoom:0
};

export default MyClass;