/* global require:false */

var angular = require('angular');

var messages = require('./app/messages');
require('angular-ui-router');
require('angular-material');
var routesConfig = require('./routes');

require('./index.scss');

var app = 'app';
module.exports = app;

angular
  .module(app, ['ui.router', 'ngMaterial'])
  .config(routesConfig)
  .component('app', messages);
