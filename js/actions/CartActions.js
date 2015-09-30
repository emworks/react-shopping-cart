var AppDispatcher = require('../dispatcher/AppDispatcher');
var CartConstants = require('../constants/CartConstants');

// Define actions object
var CartActions = {
  // Receive initial product data
  receiveData: function(data) {
    AppDispatcher.handleAction({
      actionType: CartConstants.RECEIVE_DATA,
      data: data
    });
  },

  // Add item to cart
  add: function(id, update) {
    AppDispatcher.handleAction({
      actionType: CartConstants.CART_ADD,
      id: id,
      update: update
    });
  },

  // Remove item from cart
  remove: function(key) {
    AppDispatcher.handleAction({
      actionType: CartConstants.CART_REMOVE,
      key: key
    });
  },

  // Sort cart items by key
  sort: function(key) {
    AppDispatcher.handleAction({
      actionType: CartConstants.CART_SORT,
      key: key
    });
  },

  // Remove all items from cart
  clear: function() {
    AppDispatcher.handleAction({
      actionType: CartConstants.CART_CLEAR
    });
  },

  // Update cart visibility status
  updateCartVisible: function(cartVisible) {
    AppDispatcher.handleAction({
      actionType: CartConstants.CART_VISIBLE,
      cartVisible: cartVisible
    });
  }
};

module.exports = CartActions;
