var React = require('react');
var CartActions = require('../actions/CartActions');

var BuyButton = React.createClass({
  buyAll: function(event) {
    var self = this;
    // Sort Cart items by 'id'
    CartActions.sort('id');
    // Here we can send data
    // then Cart will be cleaned
    setTimeout(function(){
      console.log('Buy all:', self.props.items);
      alert('Got it!');
      // Delete all items and hide Cart
      CartActions.clear();
      CartActions.updateCartVisible(false);
    }, 1);
  },
  render: function() {
    return (
      <div className={"ta-center cart-col" + (this.props.cartvisible ? '' : ' hidden')}>
        <a id="buy-btn" className="cart-btn" href="javascript:void(0)"
            onClick={this.buyAll}  title="Buy">
          <i className="fa fa-shopping-cart fa-lg"></i>
        </a>
      </div>
    );
  }
});

module.exports = BuyButton;
