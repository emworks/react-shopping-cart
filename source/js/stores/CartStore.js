var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var CartConstants = require('../constants/CartConstants');
var _ = require('underscore');

var _storage = localStorage.getItem('Cart'),

    /**
     * Try to load Cart data from localStorage if it possible
     * @type {Object}
     */
    _data = _storage && JSON.parse(_storage).cartItems || {},

    /**
     * Sorting options
     * By default the key is 'id' and the order is ascending
     * @type {Object}
     */
    _sort = {
      key: 'id',
      order: 'asc'
    },

    /**
     * Check if Cart has data
     * Then show it or hide
     * @type {Boolean}
     */
    _cartVisible = getCount() ? true : false;

/**
 * Add item to Cart, update quantity and sort items
 * @param {Number} id
 * @param {Object} update
 */
function add(id, update) {
  update.quantity = id in _data ? _data[id].quantity + 1 : 1;
  _data[id] = _.extend({}, _data[id], update);
  sortByKey(_sort.key);
}

/**
 * Get Cart items count
 * @return {Number}
 */
function getCount() {
  return Object.keys(_data).length;
}

/**
 * Sort Cart items
 * @param {String} key Sorting key
 */
function sortByKey(key) {

  // Set new sorting key
  _sort.key = key;

  // Sort data in the ascending order
  _data = _.chain(_data)
    .sortBy(_sort.key)
    .value();

  // Reverse result if the order set as descending
  if (_sort.order === 'desc') {
    _data.reverse();
  }

  // Update data
  _data = _.chain(_data)
    .indexBy(_sort.key)
    .value();
}

/**
 * Remove one item from Cart
 * @param {Number} key
 */
function removeItem(key) {
  delete _data[key];
}

/**
 * Delete all items from Cart
 */
function clear() {
  _data = {};
}

/**
 * Show/hide Cart
 * @param {Boolean} cartVisible
 */
function setCartVisible(cartVisible) {
  _cartVisible = cartVisible;
}

var CartStore = _.extend({}, EventEmitter.prototype, {

  /**
   * Get Cart items object
   * @return {Object}
   */
  getCartItems: function() {
    return _data;
  },

  getCartCount: function() {
    return getCount();
  },

  /**
   * Get sorting options object
   * @return {Object}
   */
  getSortOptions: function() {
    return _sort;
  },

  /**
   * Get total price
   * @return {Number}
   */
  getCartTotal: function() {
    return _.reduce(_data, function(memo, item) {
        return memo + item.price;
      }, 0).toFixed(2);
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

      /**
       * Update sorting order
       * Toggle if the current sorting key is the same as the previous
       * Set as ascending if the key has been changed
       * @type {String}
       */
      _sort.order = (_sort.key === action.key && _sort.order === 'asc')
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
