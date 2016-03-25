var AppDispatcher = require('../dispatcher/AppDispatcher');
var SearchConstants = require('../constants/SearchConstants');

var SearchActions = {
  search: function(searchQuery) {
    AppDispatcher.dispatch({
      actionType: SearchConstants.SEARCH,
      text: searchQuery
    })
  }
};

module.exports = SearchActions;