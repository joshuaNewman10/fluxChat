/** @jsx React.DOM */
var React = require('react');
var Catalog = require('../components/app-catalog.js');
var APP = 
  React.createClass({
    render: function() {
      return (
              <div>
              <h1>Shopping Time!</h1>
              <Catalog />
              </div>);
    }
  });

module.exports = APP;