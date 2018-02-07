import React from 'react';
import ReactDOM from 'react-dom';
import createHistory from 'history/createBrowserHistory';
import { Route } from 'react-router';
import { BrowserRouter } from 'react-router-dom'
import './index.css';
import Game from './game';
//import MovieQuotes from './movieQuotes';


const history = createHistory();


class Home extends React.Component {
  componentWillMount() {
      document.title = "Zhaowei's Front End"
  };
  render() {
    return (
      <div>
        <h1>Welcome</h1>
        <div>
          <h2>Navigation</h2>
          <a href="/game">Tic-Tac-Toe</a>
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
    </div>
  </BrowserRouter>
), document.getElementById('root'));

