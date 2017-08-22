/* global require:false */

var _ = require('underscore');
module.exports = {
  template: require('./messages.html'),
  controller: function ($http, $log) {
    var vm = this;
    var pt = null;
    var h = angular.element('md-virtual-repeat-container')[0].offsetHeight;
    var tl = h/88;

    var DynamicItems = function() {
      this.loadedPages = {};

      this.numItems = Math.floor(tl);

      this.PAGE_SIZE = Math.floor(tl);

      this.numLoaded_ = 0;
    };

    DynamicItems.prototype.getItemAtIndex = function(index) {
      var pageNumber = Math.floor(index / this.PAGE_SIZE);
      var page = this.loadedPages[pageNumber];
      $log.log(page);

      if (page) {
        return page[index % this.PAGE_SIZE];
      } else if (page !== null) {
        this.fetchPage_(pageNumber);
      }
    };

    DynamicItems.prototype.getLength = function() {
      return this.numItems;
    };

    DynamicItems.prototype.fetchPage_ = function(pageNumber) {
      this.loadedPages[pageNumber] = null;
      var that = this;

      $http({
        url: 'http://message-list.appspot.com/messages',
        method: 'GET',
        params: {
          limit: this.PAGE_SIZE,
          pageToken: pt
        }
      }).then(function(res) {
        that.loadedPages[pageNumber] = [];
        _.each(_.sortBy(res.data.messages, 'id'), function(m) {
          $log.log(m);
          that.loadedPages[pageNumber].push(m)
        });
        that.numLoaded_ = that.toLoad_;
        pt = res.data.pageToken;
      });
    };

    vm.dynamicItems = new DynamicItems();
  }
};
