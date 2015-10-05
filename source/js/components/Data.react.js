var React = require('react');
var CartActions = require('../actions/CartActions');

var Data = React.createClass({
  displayName: 'Data',
  handleAddToCart: function(event) {
    var items = this.props.items;
    var item = items[Math.floor(Math.random() * items.length)];
    var update = {
      id: item.id,
      title: item.title,
      price: item.price
    };
    CartActions.add(item.id, update);
    CartActions.updateCartVisible(true);
    console.log('Add to Cart:', update);
  },
  render: function() {
    return (
      <div className={"ta-center" + (this.props.cartvisible ? ' cart-col' : '')}>
        <a id="add-to-cart" className="cart-btn" href="javascript:void(0)"
          onClick={this.handleAddToCart} title="Add something to Cart">
          <i className="fa fa-magic fa-lg"></i>
          <span className={this.props.cartvisible ? 'hidden' : ''}>
            &nbsp;Apply some magic
          </span>
        </a>
      </div>
    );
  }
});

module.exports = Data;
