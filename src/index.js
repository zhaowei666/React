import React from 'react';
import ReactDOM from 'react-dom';
import createHistory from 'history/createBrowserHistory';
import { Route } from 'react-router';
import { BrowserRouter } from 'react-router-dom'
import './index.css';
import Game from './game';
import MovieQuotes from './movieQuotes';
import GameTool from './gameTool';
import {MyHeader} from './base';


const history = createHistory();


class Home extends React.Component {
  componentWillMount() {
      document.title = "Zhaowei's Front End"
  };
  render() {
    return (
      <div class="p-3">
        <MyHeader />
        <div class="card sbcard download-links mt-4">
          <div class="card-body">
            <h4>A tic-tac-toe game</h4>
            <a href="/game" class="btn btn-secondary">Tic-Tac-Toe</a>
          </div>
        </div>
        <div class="card sbcard download-links mt-4">
          <div class="card-body">
            <h4>Type a word we'll help you find related classic movie quotes</h4>
            <a href="/movie-quotes" class="btn btn-secondary">Movie Quotes</a>
        </div>
        </div>
      </div>
    );
  }
}

// ========================================

ReactDOM.render((
  <BrowserRouter history={history}>
    <div>
      <Route exact path='/' component={Home} />
      <Route path='/index' component={Home} />
      <Route path='/game' component={Game} />
      <Route path='/movie-quotes' component={MovieQuotes} />
      <Route path='/game-tool' component={GameTool} />
    </div>
  </BrowserRouter>
), document.getElementById('root'));

