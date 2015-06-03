/** @jsx React.DOM */
var APP = require('./components/app');
var React = require('react');

console.log(React);
React.render(
  <APP />,
  document.getElementById('main'));