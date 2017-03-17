(function() {
    "use strict";

    angular
        .module("templateGenerator", ["ui.router", "dndLists", "ui.tinymce", "ngSanitize"])
        .config(ConfigureApp);

    ConfigureApp.$inject = ["$httpProvider", "$stateProvider", "$urlRouterProvider", "$locationProvider"];

    function ConfigureApp($httpProvider, $stateProvider, $urlRouterProvider, $locationProvider){
        $httpProvider.defaults.useXDomain = true;
        delete $httpProvider.defaults.headers.common["X-Requested-With"];

        $locationProvider.html5Mode(true);

        var editState = {
            url: '/',
            templateUrl: '/views/edit.html',
            views: {
                'edit.toolbar': {
                    templateUrl: '/views/edit/toolbar.html',
                    controller:'ToolbarController as toolbar'
                },
                'edit.preview': {
                    templateUrl: '/views/edit/preview.html',
                    controller:'PreviewController as preview'
                }
            }
          };

        $stateProvider.state('edit', editState);
        $urlRouterProvider.otherwise(function($injector, $location){
          $injector.invoke(['$state', function($state) {
            $state.go('edit');
          }]);
        });
    }
}());