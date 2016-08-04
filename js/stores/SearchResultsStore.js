var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var SearchConstants = require('../constants/SearchConstants');
var q = require('q');
var assign = require('object-assign');

var _searchResults = [];
var _error = null;
var _searching = false;
var _hasSearched = false;

var CHANGE_EVENT = 'change';

function getValueFromResults(key, results) {
  var value = '';

  if (results !== null &&
    results.length > 0 &&
    key !== null) {
    for (var i = 0; i < results.length; i++) {
      var resultItem = results[i];

      if (resultItem.Key === key) {
        value = resultItem.Value;
        break;
      }
    }
  }

  return value;
}

function search(searchQuery) {
  var defer = q.defer();

  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function() {
    if (this.readyState === 4) {
      if (this.status === 200) {
        defer.resolve(this.response);
      }
      else if (this.status >= 400) {
        defer.reject({
          message: this.response['odata.error'].message.value,
          statusText: this.statusText,
          status: this.status
        });
      }
    }
  }
  xhr.open('GET', `https://contoso.sharepoint.com/_api/search/query?querytext='${searchQuery}'`, true);

  xhr.setRequestHeader('Accept', 'application/json;odata=nometadata');

  xhr.responseType = 'json';
  xhr.send();

  return defer.promise;
}

var SearchResultsStore = assign({}, EventEmitter.prototype, {
  getResults: function() {
    return _searchResults;
  },

  getError: function() {
    return _error;
  },

  isSearching: function() {
    return _searching;
  },
  
  hasSearched: function() {
    return _hasSearched;
  },

  emitChange: function() {
    this.emit(CHANGE_EVENT);
  },

  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  removeChangeListener: function(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  }
});

AppDispatcher.register(function(action) {
  switch (action.actionType) {
    case SearchConstants.SEARCH:
      var searchQuery = action.text.trim();
      if (searchQuery.length > 0) {
        _searchResults.length = 0;
        _error = null;
        _searching = true;
        SearchResultsStore.emitChange();

        search(searchQuery).then(function(response) {
          if(typeof(response) === "string") {
            response = JSON.parse(response);
          }
          if (response &&
            response.PrimaryQueryResult &&
            response.PrimaryQueryResult.RelevantResults &&
            response.PrimaryQueryResult.RelevantResults.RowCount > 0) {
            response.PrimaryQueryResult.RelevantResults.Table.Rows.forEach((row) => {
              _searchResults.push({
                title: getValueFromResults('Title', row.Cells),
                url: getValueFromResults('Path', row.Cells),
                description: getValueFromResults('HitHighlightedSummary', row.Cells)
              });
            });
          }
        }, function(err) {
          _error = err;
        }).finally(function() {
          _searching = false;
          _hasSearched = true;
          SearchResultsStore.emitChange();
        });
      }
      break;
  }
});

module.exports = SearchResultsStore;
