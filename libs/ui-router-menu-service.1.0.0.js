/*
 @license UI-router-menu-service v1.0.0
 (c) 2016 Luc Sorel
 License: MIT
 */
// (function() {
    'use strict';

    angular.module('UiRouterMenuService', [])
        .service('menuService', ['$q', function($q) {
            // initializes the service, which holds the name of the page being displayed
            var menuService = {
                page: { name: null }
            };

            // sets the name of the page being displayed
            menuService.setViewName = function(name) {
                this.page.name = name;
                return $q.when(name);
            };

            return menuService;
        }])
// }())
;
