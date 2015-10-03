window.React = require('react');
var API = require('./utils/API');
var CartApp = require('./components/CartApp.react');

// Load product data
API.getData();

React.render(
  <CartApp localStorageKey='Cart' />,
  document.getElementById('main')
);
