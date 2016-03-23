/*
 @license UI-router-menu-service v1.0.0
 (c) 2016 Luc Sorel
 License: MIT
 */
"use strict";angular.module("UiRouterMenuService",[]).service("menuService",["$q",function(e){var n={page:{name:null}};return n.setViewName=function(n){return this.page.name=n,e.when(n)},n}]);