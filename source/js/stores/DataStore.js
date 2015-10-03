var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var CartConstants = require('../constants/CartConstants');
var _ = require('underscore');

var _data = {};

/**
 * Set data received from API
 * @param  {Object} data
 */
function loadData(data) {
  _data = data;
}

var DataStore = _.extend({}, EventEmitter.prototype, {
  getData: function() {
    return _data;
  },
  emitChange: function() {
    this.emit('change');
  },
  addChangeListener: function(callback) {
    this.on('change', callback);
  },
  removeChangeListener: function(callback) {
    this.removeListener('change', callback);
  }
});

AppDispatcher.register(function(payload) {
  var action = payload.action;
  switch(action.actionType) {
    case CartConstants.RECEIVE_DATA:
      loadData(action.data);
      break;
    default:
      return true;
  }
  DataStore.emitChange();
  return true;
});

module.exports = DataStore;
