import React, { Component } from 'react';

const states = {
  SET_REFERENCE: {
    info: "Select two points to set the reference"
  },
  SET_REFERENCE_2: {
    info: "Click another point"
  },
  SET_POINT_1: {
    info: "Reference is set, click first point to check"
  },
  SET_POINT_2: {
    info: "Click another point"
  }
}

class Measurer extends Component {

  constructor(props) {
    super(props);

    this.state = {
      screenLength: null,
      realLength: null,
      result: null,
      vec: {},
      status: states.SET_REFERENCE
    }

    this.image = React.createRef();
  }

  resetReference = () => {
    this.setState({status: states.SET_REFERENCE});
  }

  calcMouse = e => {
    let rect = e.target.getBoundingClientRect();
    let x = e.clientX - rect.left; 
    let y = e.clientY - rect.top;  
    let xMax = this.image.current.width;

    return {x,y,xMax};
  }

  calcDistance = (a,b) => {
    return Math.sqrt(Math.pow((a.x - b.x), 2) + Math.pow((a.y - b.y),2));
  }

  clickEvent = async e => {
    // e = Mouse click event.
    
    const {x,y,xMax} = this.calcMouse(e);

    let vec = this.state.vec;

    switch(this.state.status) {
    case states.SET_REFERENCE:
      vec.r1 = {x: x / xMax, y: y / xMax}
      this.setState({status: states.SET_REFERENCE_2, vec}); 
      break;
    case states.SET_REFERENCE_2:
      vec.r2 = {x: x / xMax, y: y / xMax};
      let screenLength = this.calcDistance(vec.r1, vec.r2);
      let realLength = window.prompt("Give length in millimeters", 0);
      this.setState({status: states.SET_POINT_1, screenLength, realLength}); 
      break;
    case states.SET_POINT_1:
      vec.c1 = {x: x / xMax, y: y / xMax};
      this.setState({status: states.SET_POINT_2}); 
      break;
    case states.SET_POINT_2:
      vec.c2 = {x: x / xMax, y: y / xMax};
      let a = this.calcDistance(vec.c1, vec.c2);
      this.setState({status: states.SET_POINT_1, result: a / this.state.screenLength * this.state.realLength});
      break;
    }
  }


  render() {
    return (
      <div className="wrapper">
        <div className="content">
          <div className="info">
            {this.state.status.info}
          </div>
          <img src={this.props.image} className="image" ref={this.image} onClick={this.clickEvent}/>
          <div className="result">
              {(this.state.result !== null) ? "Last result: "+this.state.result.toFixed(2) : ""}
          </div>
        </div>
        <div className="footer">
          <div className="actions">
            <div className="action" onClick={this.resetReference}>Reset reference</div>
            <div className="action" onClick={this.props.newImage}>New image</div>
          </div>
        </div>
      </div>
    )
  }
}

export default Measurer;