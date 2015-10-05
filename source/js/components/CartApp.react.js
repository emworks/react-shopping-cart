var React = require('react');
var LocalStorageMixin = require('react-localstorage');
var CartStore = require('../stores/CartStore');
var DataStore = require('../stores/DataStore');
var Data = require('./Data.react');
var Cart = require('./Cart.react');
var BuyButton = require('./BuyButton.react');

function getCartState() {
  return {
    items: DataStore.getData(),
    cartItems: CartStore.getCartItems(),
    cartCount: CartStore.getCartCount(),
    cartSortOptions: CartStore.getSortOptions(),
    cartTotal: CartStore.getCartTotal(),
    cartVisible: CartStore.getCartVisible()
  };
}

var CartApp = React.createClass({
  displayName: 'CartApp',
  mixins: [LocalStorageMixin],
  getInitialState: function() {
    return getCartState();
  },
  componentDidMount: function() {
    DataStore.addChangeListener(this._onChange);
    CartStore.addChangeListener(this._onChange);
  },
  componentWillUnmount: function() {
    DataStore.removeChangeListener(this._onChange);
    CartStore.removeChangeListener(this._onChange);
  },
  render: function() {
    return (
      <div className="cart-app">
        <Data items={this.state.items} cartvisible={this.state.cartVisible}/>
        <Cart items={this.state.cartItems} count={this.state.cartCount}
              sort={this.state.cartSortOptions} total={this.state.cartTotal}
              visible={this.state.cartVisible}/>
        <BuyButton items={this.state.cartItems} cartvisible={this.state.cartVisible}/>
      </div>
    );
  },
  _onChange: function() {
    this.setState(getCartState());
  }
});

module.exports = CartApp;
