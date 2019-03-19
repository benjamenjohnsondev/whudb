import App from '../frontend/App/App';
import ReactDOMServer from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import React from 'react';

// Material-ui
import JssProvider from 'react-jss/lib/JssProvider';
import {
  MuiThemeProvider,
  createGenerateClassName,
} from '@material-ui/core/styles';
import {
  SheetsRegistry
} from 'jss';
import theme from '../frontend/Theme/theme';
import CssBaseline from '@material-ui/core/CssBaseline';

function handleRender(req, context) {
  // Create a sheetsRegistry instance.
  const sheetsRegistry = new SheetsRegistry();

  // Create a sheetsManager instance.
  const sheetsManager = new Map();

  // Create a new class name generator.
  const generateClassName = createGenerateClassName();

  // Render the component to a string.
  const html = ReactDOMServer.renderToString(
    <StaticRouter location={req.url} context={context}>
      <JssProvider registry={sheetsRegistry} generateClassName={generateClassName}>
        <MuiThemeProvider theme={theme} sheetsManager={sheetsManager}>
          <CssBaseline />
          <App />
        </MuiThemeProvider>
      </JssProvider>
    </StaticRouter>
  );

  // Grab the CSS from our sheetsRegistry.
  const css = sheetsRegistry.toString();

  let content = { css, html };
  return content;
}

export { handleRender };
