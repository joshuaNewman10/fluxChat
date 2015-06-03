/** @jsx React.DOM */
var React = require('react');
var AppActions = require('../actions/app-actions.js');
console.log(AppActions);
var APP = 
  React.createClass({
    handleClick: function() {
      AppActions.addItem('this is the item');
    },
    render: function() {
      return <h1 onClick={this.handleClick}>Hello World Im the APP component</h1>
    }
  });

module.exports = APP;