import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';


export class MyHeader extends React.Component {
  render() {
    return (
      <header class="page-heading bg-secondary text-light">
        <div class="row">
          <div class="col-sm-3 bg-warning navbar-brand">
            <a class="text-light" href="/"><h1>Home</h1></a>
          </div>

          <div class="col-sm-7">
            <h1>Welcome to Zhaowei's homepage</h1>
            <p>Be a dreamer, or a dry fish</p>
          </div>
        </div>
      </header>
    )
  }
}

