var React = require('react');
var SearchResultsStore = require('../stores/SearchResultsStore');

function getSearchResultsState() {
  return {
    results: SearchResultsStore.getResults(),
    hasSearched: SearchResultsStore.hasSearched(),
    isSearching: SearchResultsStore.isSearching()
  }
}

var SearchResults = React.createClass({
  getInitialState: function() {
    return getSearchResultsState();
  },

  componentDidMount: function() {
    SearchResultsStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function() {
    SearchResultsStore.removeChangeListener(this._onChange);
  },

  render: function() {
    if (this.state.hasSearched && !this.state.isSearching) {
      if (this.state.results.length > 0) {
        var items = this.state.results.map((result, i) => {
          return (
            <li className="ms-ListItem ms-ListItem--document" key={i}>
              <a href={result.url} className="ms-ListItem-primaryText">{result.title}</a>
              <span className="ms-ListItem-secondaryText" dangerouslySetInnerHTML={{ __html: result.description }}/>
              <span className="ms-ListItem-tertiaryText">{result.url}</span>
            </li>
          );
        });

        return (
          <ul className="ms-List">
            {items}
          </ul>
        );
      }
      else {
        return (
          <div className="ms-font-m">
            No results found
          </div>
        );
      }
    }
    else {
      return (<div/>);
    }
  },

  _onChange: function() {
    this.setState(getSearchResultsState());
  }
});

module.exports = SearchResults;