module.exports = routesConfig;

/** @ngInject */
function routesConfig($stateProvider, $urlRouterProvider, $locationProvider, $mdThemingProvider) {
  $locationProvider.html5Mode(true).hashPrefix('!');
  $urlRouterProvider.otherwise('/');
  $mdThemingProvider.theme('default').primaryPalette('teal').accentPalette('amber');

  $stateProvider
    .state('app', {
      url: '/',
      component: 'app'
    });
}
