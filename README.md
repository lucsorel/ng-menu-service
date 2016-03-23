# Installation
Either:
* download the minified version from the `libs` folder manually
* or install it via `npm` using:
```bash
npm i -S github:lucsorel/ui-router-menu-service
```

Then, in the HTML file hosting your application:
* include the `ui-router-menu-service` between AngularJS and the script of your application
```html
<body>
    ...
    <!-- AngularJS -->
    <script src="//ajax.googleapis.com/ajax/libs/angularjs/1.5.2/angular.min.js"></script>

    <!-- include your copy of ui-router-menu-service AFTER AngularJS inclusion, BEFORE your application  -->
    <script src="/ui-router-menu-service.1.0.0-min.js"></script>

    <!-- include your copy of ui-router-menu-service AFTER AngularJS inclusion -->
    <script src="/my-app.js"></script>
</body>
```

# Use
In the javascript files of your application:
* inject `UiRouterMenuService` in the dependencies of your module
```javascript
angular.module('MyApp', ['UiRouterMenuService', 'ui.router']) // you probably want to include ui.router as well
```

* use the `menuService` in the controller handling your menu
```javascript
angular.module('MyApp')
    .controller('MenuController', ['menuService', function(menuService) {
        // binds the menuService's page to the menu controller
        this.page = menuService.page;
    }])
```

* in the routing configuration, use the dependency resolution to define the page being displayed with `menuService.setViewName('...')`:
```javascript
angular.module('MyApp')
    .config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
        $stateProvider
            // define a root state with the MenuController which will handle the menu
            .state('root', {
                abstract: true,
                url: '/',
                templateUrl: 'templates/root.html',
                controller: 'MenuController as menuCtrl'
            })
            .state('root.home', {
                url: 'home',
                resolve: {
                    page: ['menuService', function(menuService) {
                        return menuService.setViewName('home');
                    }]
                },
                views: {
                    'home': {
                        templateUrl: 'templates/home.html',
                        controller: 'HomeController as homeCtrl'
                    }
                }
            })
            .state('root.contact', {
                url: 'contact',
                resolve: {
                    page: ['menuService', function(menuService) {
                        return menuService.setViewName('contact');
                    }]
                },
                views: { ... }
            })
            // other states...
            ;

        $urlRouterProvider.otherwise('/home');
}])
```

In the HTML template handling the menu (here: `templates/root.html`):
```html
<div ui.view="">
    <!-- a menu example with BootstrapCSS -->
    <nav class="navbar navbar-default navbar-fixed-top">
        <div class="container-fluid">
            <div class="navbar-header">
                <button type="button" class="navbar-toggle collapsed" data-toggle="collapse"
                        data-target="#myapp-navbar-collapse" aria-expanded="false">
                    <span class="sr-only">Toggle navigation</span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                </button>
                <a class="navbar-brand" href="#/"><i>My App</i></a>
            </div>

            <div class="collapse navbar-collapse" id="myapp-navbar-collapse">
                <ul class="nav navbar-nav">
                    <li ng-class="menuCtrl.page.name == 'home' ? 'active' : ''"><a href="#/home">Home</a></li>
                    <li ng-class="menuCtrl.page.name == 'contact' ? 'active' : ''"><a href="#/contact">Contact us</a></li>
                    <li ng-class="menuCtrl.page.name == 'pricing' ? 'active' : ''"><a href="#/pricing">Pricing</a></li>
                </ul>
            </div>
        </div>
    </nav>

    <!-- UI views for each menu entry -->
    <div ui-view="home"></div>
    <div ui-view="contact"></div>
    <div ui-view="pricing"></div>
</div>
```
