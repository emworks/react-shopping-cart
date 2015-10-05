var React = require('react');
var CartActions = require('../actions/CartActions');

var Cart = React.createClass({
  displayName: 'Cart',
  handleRemoveFromCart: function(key) {
    var self = this;
    setTimeout(function(){
      console.log('Remove from Cart:', self.props.items[key]);
      CartActions.remove(key);
      CartActions.updateCartVisible(!!self.props.count);
    }, 1);
  },
  handleSortByKey: function(key) {
    CartActions.sort(key);
  },
  render: function() {
    var self = this,
        items = this.props.items;
    return (
      <div className={"cart-block" + (this.props.visible ? '' : ' hidden')}>
        <table className="pure-table pure-table-horizontal fullwidth">
          <thead>
            <tr className="cart-row">
              <th className="cart-col">&nbsp;</th>
              <th className="cart-col">
                <span onClick={this.handleSortByKey.bind(this, 'title')}
                      className="cart-sort-switcher">
                  <span>Title</span>
                  <i className={this.props.sort.key === 'title'
                    ? 'fa fa-sort-' + this.props.sort.order
                    : 'hidden'}></i>
                </span>
              </th>
              <th className="cart-col ta-right">
                <span onClick={this.handleSortByKey.bind(this, 'price')}
                      className="cart-sort-switcher">
                  <span>Price</span>
                  <i className={this.props.sort.key === 'price'
                    ? 'fa fa-sort-' + this.props.sort.order
                    : 'hidden'}></i>
                </span>
              </th>
              <th className="cart-col ta-right">Quantity</th>
            </tr>
          </thead>
          <tbody>
          {
            Object.keys(items).map(function(key){
              return (
                <tr className="cart-row" key={key}>
                  <td className="cart-col ta-right">
                    <span className="cart-remove-btn" title="Remove"
                            onClick={self.handleRemoveFromCart.bind(self, key)}>
                      <i className="fa fa-remove"></i>
                    </span>
                  </td>
                  <td>{items[key].title}</td>
                  <td className="cart-col ta-right">${items[key].price}</td>
                  <td className="cart-col ta-right">{items[key].quantity}</td>
                </tr>
              )
            })
          }
          </tbody>
        </table>
        <div className="cart-row cart-footer ta-right">
          Total: ${this.props.total}
        </div>
      </div>
    );
  }
});

module.exports = Cart;
