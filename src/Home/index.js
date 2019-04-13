import React from 'react';
import CenteredPage from 'common/CenteredPage';

const Home = () => (
  <CenteredPage>
    <h1>React App template</h1>
    <p>SPA Production ready setup using latest React</p>
    <br />

    <h2>If you run ...</h2>
    <pre>
      <code>
        git clone git@github.com:IvanDimanov/react-app-template.git<br />
        cd react-app-template<br />
        npm install<br />
        npm run local-development<br />
      </code>
    </pre>

    <h2>... you will get</h2>
    <ul>
      <li>production Webpack config with dynamic chunks - <code>npm run build</code></li>
      <li>local development server with webpack-serve - <a href='http://localhost:8080' rel='nofollow'>http://localhost:8080</a></li>
      <li>React app with routing and Material UI - <a href='https://material-ui.com' rel='nofollow'>https://material-ui.com</a></li>
    </ul>
  </CenteredPage>
);

export default Home;
