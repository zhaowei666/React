import React from 'react';
import ReactDOM from 'react-dom';
import createHistory from 'history/createBrowserHistory';
import { Route } from 'react-router';
import { BrowserRouter } from 'react-router-dom'
import './ticTacToe/game.css';
import Game from './ticTacToe/game';
import MovieQuotes from './movieQuotes/movieQuotes';
import CardDistributor from './gameTool/gameTool';
import FiveInRow from './fiveInRow/fiveInRow';
import {MyHeader} from './header/header';


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
        <div className="container">
        <div className="card m-2">
          <div className="card-body">
            <h4>A tool for Werewolf and Avalon game. Create a room, and draw a card.</h4>
            <a href="/game-tool" className="btn btn-my text-white"><span className="fa fa-asterisk mr-1" />Card Distributor</a>
          </div>
        </div>
        <div className="card m-2">
          <div className="card-body">
            <h4>Type a word we'll help you find related classic movie quotes</h4>
            <a href="/movie-quotes" className="btn btn-my text-white"><span className="fa fa-film mr-1" />Movie Quotes</a>
          </div>
        </div>
        <div className="card m-2">
          <div className="card-body">
            <h4>A tic-tac-toe game</h4>
            <a href="/five-in-row" className="btn btn-my text-white"><span className="fa fa-th mr-1" />Five in row Game</a>
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
      <Route path='/tic-tac-toe' component={Game} />
      <Route path='/movie-quotes' component={MovieQuotes} />
      <Route path='/game-tool' component={CardDistributor} />
      <Route path='/five-in-Row' component={FiveInRow} />
    </div>
  </BrowserRouter>
), document.getElementById('root'));

