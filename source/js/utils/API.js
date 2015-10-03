var CartActions = require('../actions/CartActions');
var request = require('superagent');

var API = {
  // Load product data from json into Store via Action
  getData: function() {
    // Fake data object
    // It contains items with id, title and price
    var data = 'data/data.json';
    request.get(data).end(function(error, response) {
      if (!error) {
        var data = JSON.parse(response.text);
        CartActions.receiveData(data);
      }
    });
  }
};

module.exports = API;
