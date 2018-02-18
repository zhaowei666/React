import React from 'react'
import 'bootstrap/dist/css/bootstrap.css';
import {MyHeader} from "./base";

class MovieQuotes extends React.Component{
  componentWillMount() {
    document.title = 'Movie Quote recommendations from Zhaowei'
  };
  constructor(props) {
    super(props);
    this.state = {
      query: '',
      quotes: []
    };
    this.queryOnChange = this.queryOnChange.bind(this);
  }

  submitQuery() {
    const url = 'http://18.220.117.37/quotes?query=' + this.state.query;
    fetch (url, {
      method: "GET",
      headers: {
        "Access-Control-Allow-Origin": "*",
        "mode": 'no-cors',
        dataType: 'json'
      }
    })
      .then(res => res.json())
      .then(res => {
        this.setState({
          quotes: res
        });
      })
      .catch((error) => {
        document.write(error);
      });
  }

  queryOnChange({target}) {
    this.setState({
      query: target.value
    });
  }

  render () {
    const quotes = this.state.quotes;
    const recommendations = quotes.map((quote, idx) => {
      const movieInfo = '----' + quote['name'] + '(' + quote['year'] + ')';
      return (
        <div>
          <div class="bg-light text-dark mt-">{quote['text']}</div>
          <div class="bg-dark text-light">{movieInfo}</div>
        </div>
        )
    });
    return (
      <div>
        <MyHeader />
        <div className="container mt-4">
          <h2>Type one or more words separated by blank</h2>
          <div class="col-md-10 col-lg-8 col-xl-7 max-auto mt-4">
            <form>
              <div class="form-row">
                <div class="col-12 col-md-9 mb-2 mb-md-0">
                  <input class="form-control form-control-lg" type="queryText" value={this.state.query} placeholder="Key Words" onChange={this.queryOnChange} />
                </div>
                <div class="col-12 col-md-3">
                  <input type="button" className="btn btn-block btn-lg btn-primary" value="Submit" onClick={() => this.submitQuery()} />
                </div>
              </div>
            </form>
            {recommendations}
          </div>
        </div>
      </div>
    );
  }
}

export default MovieQuotes;

