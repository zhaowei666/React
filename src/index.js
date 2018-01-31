import React from 'react';
import ReactDOM from 'react-dom';
import { Route } from 'react-router';
import { BrowserRouter } from 'react-router-dom'
import './index.css';
import Game from './game';
import createHistory from 'history/createBrowserHistory';
const history = createHistory();


class Hello extends React.Component {
    render() {
        return (
            <h1>Hello World</h1>
        );
    }
}

// ========================================

ReactDOM.render((
  <BrowserRouter history={history}>
    <div>
      <Route exact path='/' component={Hello} />
      <Route path='/hello' component={Hello} />
      <Route path='/game' component={Game} />
    </div>
  </BrowserRouter>
), document.getElementById('root'));

