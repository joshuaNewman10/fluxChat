/** @jsx React.DOM */
var React = require('react');
var AppStore = require('../../stores/app-store.js');
var RemoveFromCart = require('./app-removefromcart.js');
var Increase = require('./app-increase.js');
var Decrease = require('./app-decrease.js');
var StoreWatchMixin = require('../../mixins/StoreWatchMixin.js');
Link = require('react-router-component').Link;

function cartItems() {
  return {items: AppStore.getCart()};
}

var Cart = React.createClass({
  mixins: [StoreWatchMixin(cartItems)],

  render: function() {
    var total = 0;
    var items = this.state.items.map(function(item, i) {
      var subTotal = item.cost*item.qty;
      total += subTotal;
      return (
        <tr key={i}>
          <td><RemoveFromCart index={i} /></td>
          <td>{item.title}</td>
          <td>{item.qty}</td>
          <td>
            <Increase index={i} />
            <Decrease index={i} />
          </td>
          <td>${subTotal}</td>
        </tr>
      );
    });
    return (
      <div>
        <table className="table table-hover">
          <thead>
            <tr>
              <th></th>
              <th>Item</th>
              <th>Qty</th>
              <th></th>
              <th>SubTotal</th>
            </tr>
          </thead>
          <tbody>
            {items}
          </tbody>
          <tfoot>
            <tr>
              <td colSpan="4" className="text-right">Total</td>
              <td>${total}</td>
            </tr>
          </tfoot>
        </table>
        <Link href='/'>Continue Shopping</Link>
      </div>
    );
  }
});

module.exports = Cart;