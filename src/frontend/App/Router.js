import React, {
  Component
} from 'react';
import {
  Switch,
  Route
} from 'react-router-dom';
import Routes from './Routes/Routes';

class Router extends Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    const routeComponents = Routes.map(
      ({ path, component, id, exact }) => {
        if (component && path) {
          let output = <Route path={path} component={component} key={id} />;
          exact ? output = <Route exact path={path} component={component} key={id} /> : <Route path={path} component={component} key={id} />;
          return output;
        }
      }
    );
    return (
      <Switch>
        {routeComponents}
      </Switch>
    );
  }
}

export default Router;
