import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import Output from './Components/Output';
import Select from './Components/Controls/Select';
import Text from './Components/Controls/Text';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      paras: 2,
      format: "",
      text: "",
      html: "true"
    }
  }

  getFormat() {
    if (this.state.html === "true") {
        return "html";
    } else {
      return "text";
    }

  }

// life-cycle function whenever making API calls
  componentWillMount() {
    this.getSampleText();
  }

  // the second line will return a 'promise'
  getSampleText() {
    const apiCall = "https://baconipsum.com/api/?type=all-meat&paras="+this.state.paras+"&format="+this.getFormat()
    axios.get(apiCall)
      .then((response) => {
        this.setState({ text: response.data }, function() {
          // callback function
          console.log(this.state);
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  showHtml(bool) {
    this.setState({html: bool}, this.getSampleText);
  }

  changeParas(num) {
    this.setState({paras: num}, this.getSampleText);
  }

  render() {
    return (
      <div className="App container">
        <h1 className="text-center">ReactJS Random Text Generator</h1>
        <hr />
        <form className="form-inline">
          <div className="form-group">
            <label>Paragraphs:</label>
            <Text value={this.state.paras} onChange={this.changeParas.bind(this)} />
          </div>
          <div className="form-group">
            <label>Select html:</label>
            <Select value={this.state.html} onChange={this.showHtml.bind(this)} />
          </div>
        </form>
        <br /> <br />
        <Output value={this.state.text} />
      </div>
    );
  }
}

export default App;
