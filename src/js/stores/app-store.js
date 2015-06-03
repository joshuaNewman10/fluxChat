var AppDispatcher = require('../dispatcher/app-dispatcher');
var AppConstants = require('../constants/app-constans');
var assign = require('object-assign');
var EventEmitter = require('events').EventEmitter; //Node

var CHANGE_EVENT = 'change'; //will broadcast this anytime something changes

var _catalog = [
  {id:1, title:'Widget #1', cost:1},
  {id:2, title:'Widget #2', cost:2},
  {id:3, title:'Widget #3', cost:3}
];

var _cartItems = []; //this is our db, should be in its own file

function _removeItem(index) {
  _cartItems[index].inCart =false;
  _cartItems.splice(index,1);
}

function _increaseItem(index) {
  _cartItems[index].qty++;
}

function _decreaseItem(index) {
  if ( _cartItems[index].qty > 1) {
    _cartITems[index].qty++;
  } else {
    _remoiveItem(index);
  }
}

function _addItem(item) {
  if ( !item.inCart ) {
    item.qty = 1;
    item.inCart = true;
    _cartItems.push(item);
  } else {
    _cartItems.forEach(function(cartItem,i ) {
      if ( cartItem.id === item.id ) {
        _increaseItem(i);
      }
    });
  }
}


