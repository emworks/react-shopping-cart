var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var CartConstants = require('../constants/CartConstants');
var _ = require('underscore');

var _data = {},
    _sort = {
      key: 'id',    // Sorting key
      order: 'asc'  // Sorting order
    },
    _cartVisible = false; // Cart without data is hidden

function add(id, update) {
  update.quantity = id in _data ? _data[id].quantity + 1 : 1;
  _data[id] = _.extend({}, _data[id], update);
  sortByKey(_sort.key);
}

function removeItem(key) {
  delete _data[key];
}

function sortByKey(key) {
  _sort.key = key;
  _data = _.chain(_data)
    .sortBy(_sort.key)
    .value();
  if (_sort.order === 'desc') {
    _data.reverse();
  }
  _data = _.chain(_data)
    .indexBy(_sort.key)
    .value();
}

function clear() {
  _data = {};
}

function setCartVisible(cartVisible) {
  _cartVisible = cartVisible;
}

var CartStore = _.extend({}, EventEmitter.prototype, {
  getCartItems: function() {
    return _data;
  },
  getCartCount: function() {
    return Object.keys(_data).length;
  },
  getSortOptions: function() {
    return _sort;
  },
  getCartTotal: function() {
    var total = 0;
    for(var item in _data){
      if(_data.hasOwnProperty(item)){
        total += _data[item].price * _data[item].quantity;
      }
    }
    return total.toFixed(2);
  },
  getCartVisible: function() {
    return _cartVisible;
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
    case CartConstants.CART_ADD:
      add(action.id, action.update);
      break;
    case CartConstants.CART_REMOVE:
      removeItem(action.key);
      break;
    case CartConstants.CART_SORT:
      if (_sort.key === action.key) {
        _sort.order = (_sort.order === 'asc') ? 'desc' : 'asc';
      } else {
        _sort.order = 'asc';
      }
      sortByKey(action.key);
      break;
    case CartConstants.CART_CLEAR:
      clear();
      break;
    case CartConstants.CART_VISIBLE:
      setCartVisible(action.cartVisible);
      break;
    default:
      return true;
  }
  CartStore.emitChange();
  return true;
});

module.exports = CartStore;
