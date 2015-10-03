var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var CartConstants = require('../constants/CartConstants');
var _ = require('underscore');

var _localStorageKey = 'Cart',
    _storage = localStorage.getItem(_localStorageKey)
              && JSON.parse(localStorage.getItem(_localStorageKey));

/**
 * Initialize Cart settings
 * @type {Object}
 */
var _cart = {

  // Try to set Cart data from localStorage if it possible
  // or define empty object
  data: _storage && _storage.cartItems || {},

  // Sorting options
  // First try to set options from localStorage
  // otherwise set default options (sort by 'id' in ascending order)
  sort: _storage && _storage.cartSortOptions || {
    key: 'id',
    order: 'asc'
  },

  // Check if Cart has data
  // then show it or hide
  visible: _storage && _storage.cartCount ? true : false

};

/**
 * Add item to Cart, update quantity and sort items
 * @param {Number} id
 * @param {Object} update
 */
function add(id, update) {
  update.quantity = id in _cart.data ? _cart.data[id].quantity + 1 : 1;
  _cart.data[id] = _.extend({}, _cart.data[id], update);
  sortByKey(_cart.sort.key);
}

/**
 * Get Cart items count
 * @return {Number}
 */
function getCount() {
  return Object.keys(_cart.data).length;
}

/**
 * Sort Cart items
 * @param {String} key Sorting key
 */
function sortByKey(key) {

  // Set new sorting key
  _cart.sort.key = key;

  // Sort data in the ascending order
  _cart.data = _.chain(_cart.data)
    .sortBy(_cart.sort.key)
    .value();

  // Reverse result if the order set as descending
  if (_cart.sort.order === 'desc') {
    _cart.data.reverse();
  }

  // Update data
  _cart.data = _.chain(_cart.data)
    .indexBy(_cart.sort.key)
    .value();
}

/**
 * Remove one item from Cart
 * @param {Number} key
 */
function removeItem(key) {
  delete _cart.data[key];
}

/**
 * Delete all items from Cart
 */
function clear() {
  _cart.data = {};
}

/**
 * Show/hide Cart
 * @param {Boolean} cartVisible
 */
function setCartVisible(cartVisible) {
  _cart.visible = cartVisible;
}

var CartStore = _.extend({}, EventEmitter.prototype, {

  /**
   * Get Cart items object
   * @return {Object}
   */
  getCartItems: function() {
    return _cart.data;
  },

  getCartCount: function() {
    return getCount();
  },

  /**
   * Get sorting options object
   * @return {Object}
   */
  getSortOptions: function() {
    return _cart.sort;
  },

  /**
   * Get total price
   * @return {Number}
   */
  getCartTotal: function() {
    return _.reduce(_cart.data, function(memo, item) {
        return memo + item.price;
      }, 0).toFixed(2);
  },

  getCartVisible: function() {
    return _cart.visible;
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

      // Check if the sorting key has not been changed
      var sameKey = action.key === _cart.sort.key;

      // Update sorting order
      // Toggle if the current sorting key is the same as the previous
      // Set as ascending if the key has been changed
      _cart.sort.order = (sameKey && _cart.sort.order === 'asc')
        ? 'desc'
        : 'asc';

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
