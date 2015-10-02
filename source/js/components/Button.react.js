var React = require('react');
var CartActions = require('../actions/CartActions');

var Button = React.createClass({
  buyAll: function(event) {
    var self = this;
    CartActions.sort('id');
    setTimeout(function(){
      console.log('Buy all:', self.props.items);
      alert('Got it!');
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

module.exports = Button;
