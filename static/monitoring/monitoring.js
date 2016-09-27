(function() {
    'use strict';
    angular.module('mercuryInstaller.monitoring', ['ngRoute'])
        .config(['$routeProvider', function($routeProvider) {
            $routeProvider
            .when('/logs', {
                templateUrl: '../static/monitoring/monitoring.html'
            });
        }])
        .controller('MonitoringCtrl',['$scope','KibanaURL','$sce',function($scope,KibanaURL,$sce){

            $scope.setsrcforiframe = function(resp){
                $scope.kibanaURL = $sce.trustAsResourceUrl("http://"+resp.data.host_ip+":5601");
            };

            $scope.onfailure = function(){

            };

            KibanaURL.getURLWithParams($scope.setsrcforiframe,$scope.onfailure);
        }])
        .factory('KibanaURL',['$http','Configuration',function($http,Configuration){
            var backendServerUrl = Configuration.isDebug?Configuration.backendServerUrl:"";
            var getKibanaUrl = function(successCallback,failureCallback){
                var request = $http({
                    method: "GET",
                    url: backendServerUrl + '/kibana'
                });
                request.then(successCallback, failureCallback);
            };
            return {
                getURLWithParams : getKibanaUrl
            }
        }]);
}());