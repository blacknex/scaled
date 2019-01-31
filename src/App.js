import React, { Component } from 'react';
import './App.css';

//Components
import Measurer from "./components/measurer"
import Index from './components';

import facebook from "./icons/facebook.svg";
import instagram from "./icons/instagram.svg";
import linkedin from "./icons/linkedin.svg";
import twitter from "./icons/twitter.svg";

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      image: null
    }
  }

  newImage = () => {
    this.setState({image: null})
  }

  setImage = file => {
    this.setState({image: file});
  }

  go =(event, link) => {
    event.preventDefault();
    window.open(link, '_blank');
  }

  render() {
    return <div className="app_wrapper">
      <div className="app_header">
        <div className="app_header_dummy">
        </div>
        <div className="app_header_logo">
          Scaled
        </div>
        <div className="app_header_social">
          <img src={facebook} className="facebook" alt="fb" onClick={e => this.go(e, "https://www.facebook.com/ville.ylipelkonen")}/>
          <img src={instagram} className="instagram" alt="ig" onClick={e => this.go(e, "https://www.instagram.com/villeylipelkonen/")}/>
          <img src={twitter} className="twitter" alt="twitter" onClick={e => this.go(e, "https://twitter.com/VilleYli")}/>
          <img src={linkedin} className="linkedin" alt="linkedin" onClick={e => this.go(e, "https://www.linkedin.com/in/ville-yli-pelkonen-b0020a168/")}/>
        </div>
      </div>
      <div className="app_content">
        {(this.state.image !== null) 
          ? <Measurer newImage={this.newImage} image={this.state.image}/>
          : <Index setImage={this.setImage}/>}
      </div>
    </div>

  }
}

export default App;
