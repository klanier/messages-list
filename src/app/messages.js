/* global require:false */

var _ = require('underscore');
module.exports = {
  template: require('./messages.html'),
  controller: function ($http) {
    var vm = this;
    var pt = null;
    var items = [];

    vm.infiniteItems = {
      numLoaded_: 0,
      toLoad_: 0,

      getItemAtIndex: function(index) {
        if (index > this.numLoaded_) {
          this.fetchMoreItems_(index);
          return null;
        }

        return items[index];
      },

      getLength: function() {
        return this.numLoaded_ + 5;
      },

      fetchMoreItems_: function(index) {
        if (this.toLoad_ < index) {
          var that = this;
          this.toLoad_ += 20;
          $http({
            url: 'http://message-list.appspot.com/messages',
            method: 'GET',
            params: {
              limit: 20,
              pageToken: pt
            }
          }).then(function(res) {
            _.each(_.sortBy(res.data.messages, 'id'), function(m) {
              items.push(m)
            });
            that.numLoaded_ = that.toLoad_;
            pt = res.data.pageToken;
          });
        }
      }
    };

    vm.removeMessage = function(message) {
      var i = _.findIndex(items, function(t) {
        return t.id === message.id;
      });
      items.splice(i, 1);
    };
  }
};
