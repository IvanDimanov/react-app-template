import React from 'react'
import CenteredGrid from 'common/CenteredGrid'

const Home = () => <CenteredGrid>
  <h1>React App template</h1>
  <p>Production ready setup for pure React</p>
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
    <li>production webpack config with dynamic chunks - <code>npm run build</code></li>
    <li>local development server with webpack dashboard - <a href='http://localhost:8080' rel='nofollow'>http://localhost:8080</a></li>
    <li>React app with routing and Material UI v1 - <a href='https://material-ui-next.com' rel='nofollow'>https://material-ui-next.com</a></li>
  </ul>
</CenteredGrid>

export default Home
