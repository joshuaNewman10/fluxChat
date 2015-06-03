var AppDispatcher = require('../dispatchers/app-dispatcher');
var AppConstants = require('../constants/app-constants');
var assign = require('object-assign');
var EventEmitter = require('events').EventEmitter; //Node

var CHANGE_EVENT = 'change'; //will broadcast this anytime something changes

var _catalog = [
  {id:1, title:'Widget #1', cost:1},
  {id:2, title:'Widget #2', cost:2},
  {id:3, title:'Widget #3', cost:3}
];

/*****************
Database Stuff
*****************/
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


