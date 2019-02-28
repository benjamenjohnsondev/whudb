import React, { Component } from 'react';
import Routes from './Routes';
import Appshell from "./Components/AppShell/AppShell";
class App extends Component {

  render() {
    return (
      <div>
        <Appshell/>
        <Routes/>
      </div>
    );
  }
}

export default App;
