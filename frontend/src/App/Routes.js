import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import Page from './Routes/Page';
import FourOhFour from './Routes/FourOhFour';
import Home from './Routes/Home';

class Routes extends Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/page" component={Page} />
        <Route component={FourOhFour}/>
      </Switch>
    );
  }
}

export default Routes;
