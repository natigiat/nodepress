'use strict';

var nodepress = angular.module('nodepress', [
   'ui.router' ,
   'ui.bootstrap' ,
   'datatables' ,
   'datatables.columnfilter'
 ]);


 nodepress.config(function ($stateProvider , $urlRouterProvider) {

  $stateProvider
    .state('/' , {
      url: '/',
      templateUrl: 'views/pages/dashboard.html'
    })



    .state('/dashboard' , {
      url: '/dashboard',
      templateUrl: 'views/pages/dashboard.html',
      controller: 'DashboardCtrl'
    })

    .state('/posts' , {
      url: '/posts',
      templateUrl: 'views/pages/posts.html',
      controller: 'PostsCtrl'
    })

    .state('/pages' , {
      url: '/pages',
      templateUrl: 'views/pages/pages.html',
      controller: 'PagesCtrl'
    })

    .state('/media' , {
      url: '/media',
      templateUrl: 'views/pages/media.html'
    })


    .state('/comments' , {
      url: '/comments',
      templateUrl: 'views/pages/comments.html',
      controller: 'CommentsCtrl'
    })

    .state('/contacts' , {
      url: '/contacts',
      templateUrl: 'views/pages/contacts.html',
      controller: 'ContactCtrl'
    })

    .state('/design' , {
      url: '/design',
      templateUrl: 'views/pages/design.html'
    })

    .state('/settings' , {
      url: '/settings',
      templateUrl: 'views/pages/settings.html'
    })




     $urlRouterProvider.otherwise('/');

})
