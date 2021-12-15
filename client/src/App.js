import React, { Component } from "react";
// import CreateMessage from './components/CreateMessage';
// import Messages from './components/Messages';

import socketIOClient from "socket.io-client";
console.log("in client");
let socket = socketIOClient("http://localhost:4001");

class App extends Component {
  constructor() {
    super();

    this.state = {
      altitude: "",
      adi: "",
      his: "",
    };

    if (socket == null) {
      socket = socketIOClient("http://localhost:4001");
    }

    socket.on("SEND_ARRAY", (array) => {
      console.log("array arrived");
      this.altitude = array[0];
      this.his = array[1];
      this.adi = array[2];
      console.log(
        "values from server => " +
          this.altitude +
          " " +
          this.his +
          " " +
          this.adi
      );
      // this.setState({
      //   altitude
      // });
    });

    this.myRef = React.createRef();
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div>
    );
  }
}

export default App;
