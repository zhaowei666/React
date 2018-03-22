import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';


export class MyHeader extends React.Component {
  render() {
    return (
      <div>
        <nav className="navbar navbar-expand-lg nvabar-light navbar-static-top sb-navbar bg-white">
          <div className="container">
            <a className="navbar-brand text-secondary text-left font-weight-bold" href="/">Home</a>
            <div className="collapse navbar-collapse">
              <a className="navbar-brand text-secondary text-left nav-item" href="/game-tool">Card Distributor</a>
              <a className="navbar-brand text-secondary text-left" href="movie-quotes">Movie</a>
              <a className="navbar-brand text-secondary text-left" href="/five-in-row">Five in row</a>
            </div>
          </div>
        </nav>
        <header className="page-heading text-light" style={{backgroundColor: "#3b7ca6"}}>
          <div className="container" >
                <h1>Welcome to Zhaowei's homepage</h1>
                <p>Be a dreamer, or a dry fish</p>
          </div>
        </header>
      </div>
    )
  }
}

