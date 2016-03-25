var React = require('react');
var SearchActions = require('../actions/SearchActions');

var SearchBox = React.createClass({
  getInitialState: function() {
    return {
      searchQuery: ''
    }
  },
  
  onKeyPress: function(event) {
    if (event.charCode === 13) {
      this.search();
    }
  },
  
  onChange: function(event) {
    this.setState({searchQuery: event.target.value});
  },
  
  search: function() {
    SearchActions.search(this.state.searchQuery);
  },
  
  render: function() {
    return (
      <div className="ms-TextField">
        <input type="text" className="ms-TextField-field" value={this.state.searchQuery} onKeyPress={this.onKeyPress} onChange={this.onChange} />
        <button onClick={this.search} className="ms-Button ms-Button--primary">
          <span className="ms-Button-label">Search</span>
        </button>
      </div>
    );
  }
});

module.exports = SearchBox;