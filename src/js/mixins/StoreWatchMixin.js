/** @jsx Reat.DOM */

var React = require('react');
var AppSore = require('../stores/app-store.js');

var StoreWatchMixin = function(cb) {
  return {
    getInitialState:function() {
      return cb();
    },

    componentWillMount: function() {
      AppStore.addChangeListener(this._onChange);
    },

    componentWillUnmount: function() {
      AppStore.removeChangeListener(this._onChange);
    },

    _onChange: function() {
      this.setState(cb(this)); //this will be the component
    }
  };
};

module.exports = StoreWatchMixin;