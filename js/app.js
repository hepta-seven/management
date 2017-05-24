/**
 * Created by Ramirez on 3/28/2017.
 */
angular.module('myApp', ['myApp.ctrl', 'ui.router', 'myApp.service'])
    .config(['$stateProvider', '$urlRouterProvider', '$locationProvider', function ($stateProvider, $urlRouterProvider, $locationProvider) {
        $stateProvider
            .state('login', {
                url: '/login',
                templateUrl: 'templates/login.html',
                controller: 'loginCtrl'
            })
            .state('dashboard', {
                url: "/dashboard",
                templateUrl: 'blank.html',
                controller: 'dashboardCtrl'
            })
            .state('dashboard.index', {
                url: "/index",
                templateUrl: 'blank.html',
                views: {
                    'mainContent': {
                        templateUrl: 'templates/index.html',
                        controller: function ($scope) {
                            $scope.loginfo = JSON.parse(sessionStorage.getItem('logInfo'));
                        }
                    }
                }
            })
            //申报
            .state('dashboard.declare', {
                url: "/declare",
                templateUrl: "blank.html",
                views: {
                    'mainContent': {
                        templateUrl: 'templates/declare.html',
                        controller: 'declareCtrl'
                    }
                }
            })
            //现场监督
            .state('dashboard.supervise', {
                url: "/supervise",
                templateUrl: "blank.html",
                views: {
                    'mainContent': {
                        templateUrl: 'templates/supervise.html',
                        controller: 'superviseCtrl'
                    }
                }
            })
            //精确查询
            .state('dashboard.precisequery', {
                url: "/precisequery",
                templateUrl: "blank.html",
                views: {
                    'mainContent': {
                        templateUrl: 'templates/precisequery.html',
                        controller: 'precisequeryCtrl'
                    }
                }
            })
            //组合查询
            .state('dashboard.groupquery', {
                url: "/groupquery",
                templateUrl: "blank.html",
                views: {
                    'mainContent': {
                        templateUrl: 'templates/groupquery.html',
                        controller: 'groupqueryCtrl'
                    }
                }
            })
            //审批
            .state('dashboard.approval', {
                url: "/approval",
                templateUrl: "blank.html",
                views: {
                    'mainContent': {
                        templateUrl: 'templates/approval.html',
                        controller: 'approvalCtrl'
                    }
                }
            })
            //公示
            .state('dashboard.publicity', {
                url: "/publicity",
                templateUrl: "blank.html",
                views: {
                    'mainContent': {
                        templateUrl: 'templates/publicity.html',
                        controller: 'publicityCtrl'
                    }
                }
            })
            //统计
            .state('dashboard.statistics', {
                url: "/statistics",
                templateUrl: "blank.html",
                views: {
                    'mainContent': {
                        templateUrl: 'templates/statistics.html',
                        controller: 'statisticsCtrl'
                    }
                }
            })
            //公开通报
            .state('dashboard.publicnotification', {
                url: "/publicnotification",
                templateUrl: "blank.html",
                views: {
                    'mainContent': {
                        templateUrl: 'templates/publicnotification.html',
                        controller: 'publicnotificationCtrl'
                    }
                }
            })
            //纪律处分
            .state('dashboard.disciplinepunish', {
                url: "/disciplinepunish",
                templateUrl: "blank.html",
                views: {
                    'mainContent': {
                        templateUrl: 'templates/disciplinepunish.html',
                        controller: 'disciplinepunishCtrl'
                    }
                }
            })
            //角色管理
            .state('dashboard.rolemanage', {
                url: "/rolemanage",
                templateUrl: "blank.html",
                views: {
                    'mainContent': {
                        templateUrl: 'templates/rolemanage.html',
                        controller: 'rolemanageCtrl'
                    }
                }
            })
            //用户管理
            .state('dashboard.usermanage', {
                url: "/usermanage",
                templateUrl: "blank.html",
                views: {
                    'mainContent': {
                        templateUrl: 'templates/usermanage.html',
                        controller: 'usermanageCtrl'
                    }
                }
            })
            //组织管理
            .state('dashboard.organizationmanage', {
                url: "/organizationmanage",
                templateUrl: "blank.html",
                views: {
                    'mainContent': {
                        templateUrl: 'templates/organizationmanage.html'
                    }
                }
            });
        $locationProvider.hashPrefix("");
        $urlRouterProvider.otherwise("/login");
    }]);