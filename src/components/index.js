import React, { Component } from 'react';

class Index extends Component {
  constructor(props) {
    super(props);
    this.fileInput = React.createRef();
  }

  submitForm = event => {
    event.preventDefault();
    let file = this.fileInput.current.files[0];

    var reader = new FileReader();
    reader.onload = () => {
      this.props.setImage(reader.result);
    }
    reader.readAsDataURL(file);
  }

  render() {
    return (
      <div className="container">
        <div className="index">
          <div className="index_faq">
            <h2>What is Scaled?</h2>
            <p>
              Scaled is a tool to easily calculate any length on a image, blueprint etc. if only one
              length is given
            </p>
            <h2>Why does it exist?</h2>
            <p>
              I was looking at a product and I wanted to make a cardboard model out of it, but the given dimensions
              were bad and it was hard to find the exact dimensions I wanted. I tried to search for this kind of 
              tool online without luck. Then I decided to program one
            </p>
            <h2>How does it work?</h2>
            <p>
              Upload any image there (it is clientside so don't worry about it being stolen), set the reference and
              start measuring.
            </p>
          </div>

          <form onSubmit={this.submitForm} className="index_form">
            <h2>Start using it now, upload an image!</h2>
            <input type="file" ref={this.fileInput}/>
            <input type="submit"/>
          </form>
        </div>
        <div className="index_dummy">
        </div>
      </div>
    );
  }
}

export default Index;