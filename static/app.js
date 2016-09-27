// Declare app level module which depends on views, and components


(function() {
    'use strict';

    angular.module('mercuryInstaller', [
        'mercuryInstaller.globals',                                
        'mercuryInstaller.authentication',
        'mercuryInstaller.utility',
        'mercuryInstaller.dashboard',
        'mercuryInstaller.layout',
        'mercuryInstaller.topology',
        'mercuryInstaller.blueprintManagement',
        'mercuryInstaller.podManagement',
        'mercuryInstaller.cloudpulse',
        'mercuryInstaller.monitoring',
        'mercuryInstaller.widgets',
        'mercuryInstaller.blueprintSetup',
        'mercuryInstaller.vmtp',
        'mercuryInstaller.systemUpdate',
        'ngRoute',
        'ngCookies',
        'pascalprecht.translate',
        'smart-table',
        'ngAnimate', 
        'ngTouch', 
        'ui.grid', 
        'ui.grid.selection', 
        'ui.grid.exporter',
        'ui.grid.autoResize',
        'ui.grid.resizeColumns',
        'ui.grid.moveColumns',
        'chart.js'
    ])

    .config(['$routeProvider', '$translateProvider','$compileProvider', function($routeProvider, $translateProvider, $compileProvider) {
    	$routeProvider
        .otherwise({
            redirectTo: '/login'
        });

        $translateProvider.useStaticFilesLoader({
            prefix: '../static/language/',
            suffix: '.json'
        });
        $translateProvider.useLocalStorage();
        $translateProvider.registerAvailableLanguageKeys(['en'])
        $translateProvider.preferredLanguage('en');
        $translateProvider.fallbackLanguage('en');
        $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|tel|file|blob|data):/);
    }])

    .run(['$rootScope', '$location', '$cookieStore', '$http','User','Events',
            function($rootScope, $location, $cookieStore, $http,User,Events) {
                // keep user logged in after page refresh
                var tempUser = $cookieStore.get('globals.User') || {userName: "",authData: "",isAuthenticated: false};
                User.userName = tempUser.userName;
                User.authData = tempUser.authData;
                User.isAuthenticated = tempUser.isAuthenticated;
                if (User.isAuthenticated) {
                    $http.defaults.headers.common['Authorization'] = 'Basic ' + User.authData; // jshint ignore:line
                   // $rootScope.isUserAuthenticated = true;
                }

                $rootScope.$on('$locationChangeStart', function(event, next, current) {
                    // redirect to login page if not logged in
                    if ($location.path() !== '/login' && !User.isAuthenticated) {
                        $location.path('/login');
                        //$rootScope.isUserAuthenticated = false;
                    }
                });
                
                $rootScope.$on(Events.LOGINSUCCESS,function(event,args){
                	$location.path('/dashboard');
            	});
                
                $rootScope.$on(Events.LOGOUTSUCCESS,function(event,args){
                	$location.path('/login');
            	});
            }
        ])

        .controller("FooterCtrl",['$scope','VersionFactory','VersionData',function($scope,VersionFactory,VersionData){
            VersionFactory.getVersion();
            $scope.versionValue = VersionData.version;
            $scope.$watch(function(){
                return VersionData.version;
            },function(){
                $scope.versionValue = VersionData.version;
            });
        }])
        
        .factory('InstallerConstants', [function() {
            return {
                ROLE_CONTROL: "control",
                ROLE_COMPUTE: "compute",
                ROLE_BLOCK_STORAGE: "block storage",
                SERVER_TYPE_BLADE: "blade",
                SERVER_TYPE_RACK: "rack",
                MAX_NTP_COUNT: 4,
                CEPH_MODE_DEDICATED: "dedicated",
                CEPH_MODEL_CENTRAL: "central",
                CINDER_VOLUME_DRIVER: "ceph",

                STORE_BACK_END: "ceph",

                UCSM_USR_NAME: "admin",
                CIMC_USR_NAME: "admin",
                SERVER_USR_NAME: "root",
                M2_FLAT_NETWORK: "flat,vlan",
                STORE_BACKEND: "CEPH",
                GLANCE_RBD_POOL: "images",
                VOLUME_DRIVE: "CEPH",
                CINDER_RBD_POOL: "volumes"

            }
        }])

    
        

}());