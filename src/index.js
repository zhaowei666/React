import React from 'react';
import ReactDOM from 'react-dom';
import createHistory from 'history/createBrowserHistory';
import { Route } from 'react-router';
import { BrowserRouter } from 'react-router-dom'
import './index.css';
import Game from './game';
import MovieQuotes from './movieQuotes';
import CardDistributor from './gameTool';
import {MyHeader} from './base';


const history = createHistory();


class Home extends React.Component {
  componentWillMount() {
      document.title = "Zhaowei's Front End";
      document.body.style.backgroundColor = "#e6ecf0";
  };
  render() {
    return (
      <div >
        <link href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet" />
        <MyHeader />
        <div class="container">
        <div class="card m-2">
          <div class="card-body">
            <h4>A tool for Werewolf and Avalon game. Create a room, and draw a card.</h4>
            <a href="/game-tool" class="btn btn-my text-white"><span class="fa fa-asterisk mr-1" />Card Distributor</a>
          </div>
        </div>
        <div class="card m-2">
          <div class="card-body">
            <h4>Type a word we'll help you find related classic movie quotes</h4>
            <a href="/movie-quotes" class="btn btn-my text-white"><span class="fa fa-film mr-1" />Movie Quotes</a>
          </div>
        </div>
        <div class="card m-2">
          <div class="card-body">
            <h4>A tic-tac-toe game</h4>
            <a href="/game" class="btn btn-my text-white"><span class="fa fa-th mr-1" />Tic-Tac-Toe</a>
          </div>
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
      <Route path='/game-tool' component={CardDistributor} />
    </div>
  </BrowserRouter>
), document.getElementById('root'));

