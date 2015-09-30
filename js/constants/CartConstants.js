var keyMirror = require('react/lib/keyMirror');

// Define action constants
module.exports = keyMirror({
  CART_ADD: null,     // Add item to cart
  CART_REMOVE: null,  // Remove item from cart
  CART_SORT: null,    // Sort cart items by key
  CART_CLEAR: null,   // Remove all items from cart
  CART_VISIBLE: null, // Show or hide the cart
  RECEIVE_DATA: null  // Load data
});
