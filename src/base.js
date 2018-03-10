import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';


export class MyHeader extends React.Component {
  render() {
    return (
      <div>
        <nav class="navbar navbar-expand-lg nvabar-light navbar-static-top sb-navbar bg-white">
          <div class="container">
            <a class="navbar-brand text-secondary text-left font-weight-bold" href="/">Home</a>
            <div class="collapse navbar-collapse">
              <a class="navbar-brand text-secondary text-left nav-item" href="/game-tool">Game</a>
              <a class="navbar-brand text-secondary text-left" href="movie-quotes">Movie</a>
              <a class="navbar-brand text-secondary text-left" href="/game">Tic-Tac-Toe</a>
            </div>
          </div>
        </nav>
        <header class="page-heading text-light" style={{backgroundColor: "#3b7ca6"}}>
          <div class="container" >
                <h1>Welcome to Zhaowei's homepage</h1>
                <p>Be a dreamer, or a dry fish</p>
          </div>
        </header>
      </div>
    )
  }
}

