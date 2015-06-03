/** @jsx React.DOM */
var React = require('react');
var Catalog = require('./catalog/app-catalog.js');
var CatalogDetail = require('./products/app-catalogdetail.js');
var Cart = require('./cart/app-cart.js');
var Router = require('react-router-component');
var Template = require('./app-template.js');

var Locations = Router.Locations;
var Location = Router.Location;
var NotFound = Router.NotFound;


var APP = 
  React.createClass({
    render: function() {
      return (
            <Template>
              <Locations>
                <Location path="/" handler={Catalog}/>
                <Location path="/cart" handler={Cart}/>
                <Location path="/item/:item" handler={CatalogDetail}/>
              </Locations>
            </Template>
      );
    }
  });

module.exports = APP;