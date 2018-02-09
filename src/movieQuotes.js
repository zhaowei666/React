import React from 'react'


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
          <div>{quote['text']}</div>
          <div>{movieInfo}</div>
        </div>
        )
    });
    return (
      <div>
        <div>
          <input type="queryText" value={this.state.query} placeholder="Type a word" onChange={this.queryOnChange} />
          <input type="button" value="Submit" onClick={() => this.submitQuery()} />
        </div>
        <div>{recommendations}</div>
      </div>
    );
  }
}

export default MovieQuotes;

