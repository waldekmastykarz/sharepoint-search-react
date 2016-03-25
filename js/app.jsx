var React = require('react');
var ReactDOM = require('react-dom');
var SearchBox = require('./components/SearchBox.jsx');
var SearchStatus = require('./components/SearchStatus.jsx');
var SearchResults = require('./components/SearchResults.jsx');

require('../node_modules/office-ui-fabric/dist/css/fabric.css');
require('../node_modules/office-ui-fabric/dist/css/fabric.components.css');
require('../css/styles.css');

var App = React.createClass({ 
  render: function() {    
    return (
      <div>
        <div className="ms-font-xxl">Search</div>
        <SearchBox />
        <SearchStatus />
        <SearchResults />
      </div>
    );
  },
});

ReactDOM.render(<App />, document.getElementById('app'));