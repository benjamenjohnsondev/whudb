import React, { Component } from 'react';
import Router from './Router';
import Appshell from './Components/AppShell/AppShell';

class App extends Component {
  render() {
    return (
      <div>
        <Appshell />
        <Router />
      </div>
    );
  }
}

export default App;
