import express from 'express';
// import https from 'https';
import graphqlHTTP from 'express-graphql';
import Schema from './data/Schema';
import fs from 'fs';
import path from 'path';
import { handleRender } from './handleRender';
import Routes from '../frontend/App/Routes/Routes';
import { matchPath } from 'react-router';

const PORT = 3000;
const app = express();

// const privateKey = fs.readFileSync(path.resolve('backend/certs/key.key'), 'utf8');
// const certificate = fs.readFileSync(path.resolve('backend/certs/cert.cert'), 'utf8');
// const credentials = {
//   key: privateKey,
//   cert: certificate,
//   passphrase: 'test'
// };

/**
 * Basically following this: https://alligator.io/react/react-router-ssr/
 * @param {*} req
 * @param {*} res
 */

function renderApp(req, res) {
  const currentRoute = Routes.find(route => matchPath(req.url, route)) || {};
  let promise;

  if (currentRoute.loadData) {
    promise = currentRoute.loadData();
  } else {
    promise = Promise.resolve(null);
  }

  promise.then(data => {
    // Let's add the data to the context
    const context = { data };
    const app = handleRender(req, context);
    const indexFile = path.resolve('public/index.html');
    fs.readFile(indexFile, 'utf8', (err, data) => {
      if (err) {
        console.error('Something went wrong:', err);
        return res.status(500).send('Oops, better luck next time!');
      }

      // console.log(app.css);

      return res.send(
        data
          .replace('<div id="root"></div>', `<div id="root">${app.html}</div>`)
          .replace(
            `<style id="jss-server-side"></style>`,
            `<style id="jss-server-side">${app.css}</style>`,
          )
          .replace('</body>', `<script>window.__ROUTE_DATA__ = ${data}</script></body>`),
      );
    });
  });
}

app.use(function(err, req, res, next) {
  res.status(404).send("Sorry can't find that!");
});

app.use(
  '/api',
  graphqlHTTP({
    schema: Schema,
    graphiql: true,
  }),
);

app.use(express.static(path.resolve('dist/frontend')));

app.get('*', (req, res) => {
  renderApp(req, res);
});

app.listen(
  {
    port: PORT,
  },
  () => console.log('\x1b[1m', `GraphQL running at: "http://localhost:${PORT}/api"` + '\x1b[0m'),
);

// const httpsServer = https.createServer(credentials, app);
// httpsServer.listen({
//   port: PORT
// }, () => console.log('\x1b[1m', `GraphQL running at: "http://localhost:${PORT}/api"` + '\x1b[0m'));
