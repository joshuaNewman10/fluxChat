var AppConstants = require('../constants/app-constants.js');
var AppDispatcher = require('../dispatchers/app-dispatcher.js');

var AppActions = {
  addItem: function(item) {
    AppDispatcher.handleViewAction({
      actionType: AppConstants.ADD_ITEM,
      item: item
    });
  },
  removeItem: function(itemIndex) {
    AppDispatcher.handleViewAction({
      actionType: AppConstants.REMOVE_ITEM,
      itemIndex: itemIndex
    });
  },
  increaseItem: function(itemIndex) {
    AppDispatcher.handleViewAction({
      actionType: AppConstants.INCREASE_ITEM,
      itemIndex: itemIndex
    });
  },
  decreaseItem: function(itemIndex) {
    AppDispatcher.handleViewAction({
      actionType: AppConstants.DECREASE_ITEM,
      itemIndex: itemIndex
    });
  }
};

module.exports = AppActions;