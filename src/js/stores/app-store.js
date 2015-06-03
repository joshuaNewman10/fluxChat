var AppDispatcher = require('../dispatchers/app-dispatcher');
var AppConstants = require('../constants/app-constants');
var assign = require('object-assign');
var EventEmitter = require('events').EventEmitter; //Node

var CHANGE_EVENT = 'change'; //will broadcast this anytime something changes



/*****************
Database Stuff
*****************/
var _catalog = [];

for(var i=1; i<9; i++) {
  _catalog.push({
    'id': 'Widget' + i,
    'title': 'Widget #' + i,
    'summary': 'This is an awesome widget',
    'description': 'Lorem ipsum dolor sit amet consectuetur elit stff',
    'cost': 1
  });
}

var _cartItems = []; //this is our db, should be in its own file

function _removeItem(index) {
  _cartItems[index].inCart = false;
  _cartItems.splice(index,1);
}

function _increaseItem(index) {
  console.log(_cartItems);
  var item = _cartItems[index];
  console.log('item', item, index);
  _cartItems[index].qty++;
}

function _decreaseItem(index) {
  if ( _cartItems[index].qty > 1) {
    _cartItems[index].qty--;
  } else {
    _removeItem(index);
  }
}

function _addItem(item) {
  if ( !item.inCart ) {
    item.qty = 1;
    item.inCart = true;
    _cartItems.push(item);
    console.log(item, _cartItems);
  } else {
    _cartItems.forEach(function(cartItem,i ) {
      if ( cartItem.id === item.id ) {
        _increaseItem(i);
      }
    });
  }
}

function _cartTotals() {
  var qty = 0, total = 0;
  _cartItems.forEach(function(cartItem) {
    qry+=cartItem.qty;
    total+=cartItem.qty*cartItem.cost;
  });
  return {'qty': qty, 'total': total};
}

/*****************
End Database Stuff
*****************/

var AppStore = assign(EventEmitter.prototype, {
  emitChange: function() {
    this.emit(CHANGE_EVENT);
  },

  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  removeChangeListener: function(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  },

  getCart: function() {
    return _cartItems;
  },

  getCatalog: function() {
    return _catalog;
  },

  getCartTotals: function() {
    return _cartTotals();
  },

  dispatcherIndex: AppDispatcher.register(function(payload){
    var action = payload.action; //action from handleViewAction
    if ( action.actionType === AppConstants.ADD_ITEM ) {
      _addItem(payload.action.item);
    } else if ( action.actionType === AppConstants.REMOVE_ITEM ) {
      _removeItem(payload.action.index);
    } else if ( action.actionType === AppConstants.INCREASE_ITEM ) {
      _increaseItem(payload.action.index);
    } else if ( action.actionType === AppConstants.DECREASE_ITEM ) {
      _decreaseItem(payload.action.index);
    }
    AppStore.emitChange();
    return true; //everything is promisified so needs to resoolve
  })

});

module.exports = AppStore;


