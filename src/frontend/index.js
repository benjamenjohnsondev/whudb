import React from 'react';
import ReactDOM from 'react-dom';
import App from './App/App';
import { BrowserRouter } from 'react-router-dom';
// MATERIAL UI
import JssProvider from 'react-jss/lib/JssProvider';
import { MuiThemeProvider, createGenerateClassName } from '@material-ui/core/styles';
import theme from './Theme/theme';
import CssBaseline from '@material-ui/core/CssBaseline';
import { __dbInit } from '../data/Helpers';

const generateClassName = createGenerateClassName();

class Main extends React.Component {
  // Remove the server-side injected CSS.
  componentDidMount() {
    const jssStyles = document.getElementById('jss-server-side');
    if (jssStyles && jssStyles.parentNode) {
      jssStyles.parentNode.removeChild(jssStyles);
    }
    __dbInit();
  }

  render() {
    return <App />;
  }
}

ReactDOM.hydrate(
  <BrowserRouter>
    <JssProvider generateClassName={generateClassName}>
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        <Main />
      </MuiThemeProvider>
    </JssProvider>
  </BrowserRouter>,
  document.getElementById('root'),
);
