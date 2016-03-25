var React = require('react');
var SearchResultsStore = require('../stores/SearchResultsStore');
var Spinner = require('./Spinner.jsx');

function getSearchResultsState() {
  return {
    error: SearchResultsStore.getError(),
    searching: SearchResultsStore.isSearching()
  }
}

var SearchStatus = React.createClass({
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
    var errorMessage = this.state.error ? `An error has occured while searching: ${this.props.error.message}` : '';
    var searching = this.state.searching ? <Spinner label={'Searching...'}/> : ''
    
    return (
      <div>
        {searching}
        {errorMessage}
      </div>
    );
  },
  
  _onChange: function() {
    this.setState(getSearchResultsState());
  }
});

module.exports = SearchStatus;