"use strict";

module.exports = function(app) {
  let productsCtrl = require('../controllers/CrawlController');

  app.route('/products/:id')
    .get(productsCtrl.get)
};