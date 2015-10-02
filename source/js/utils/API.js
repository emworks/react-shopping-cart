var CartActions = require('../actions/CartActions');
var request = require('superagent');

var API = {
  // Load product data from json into Store via Action
  getData: function() {
    request.get('data/data.json').end(function(error, response) {
      if (!error) {
        var data = JSON.parse(response.text);
        CartActions.receiveData(data);
      }
    });
  }
};

module.exports = API;
