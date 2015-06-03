/** @jsx React.DOM */
var React = require('react');
var Link = require('react-router-component').Link;

function CartTotals() {
  return AppStore.getCartTotals();
}

var CartSummary = React.createClass({
  mixins: [StoreWatchMixin(CartTotals)],
  render: function() {
    return (
      <div>
        <Link
          href="/cart"
          className="btn btn-success">
          Cart Items: {this.state.qty} / ${this.state.total}
        </Link>
      </div>
    );
  }
});

module.exports = CartSummary;