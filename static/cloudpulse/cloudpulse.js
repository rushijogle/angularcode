(function () {
    'use strict';
    angular.module('mercuryInstaller.cloudpulse', ['ngRoute', 'mercuryInstaller.utility', 'mercuryInstaller.globals', 'ngAnimate', 'ngTouch', 'ui.grid', 'ui.grid.selection', 'ui.grid.exporter', 'ui.grid.autoResize', 'ui.grid.resizeColumns', 'ui.grid.moveColumns'])
            .config(['$routeProvider', function ($routeProvider) {

                    $routeProvider
                            .when('/runcloudpulse', {
                                controller: 'CloudpulseCtrl',
                                templateUrl: '../static/cloudpulse/cloudpulse.html'
                            });
                }])

            .value('CloudPulseTokenService', {
                auth_token: "",
                generated_on: ""
            })

            .factory('CloudPulseService', ['$http', 'Configuration', 'CloudPulseTokenService', 'DeploymentMonitoringService', function ($http, Configuration, CloudPulseTokenService, DMS) {
                    var external_lb_vip_address = "";
                    var fetchCpulsedata = function (ipaddress, authid, tls,successCallback, failureCallback) {
                        var backendUrl = Configuration.isDebug ? Configuration.backendServerUrl : "";
                        var request = $http({
                            method: "GET",
                            url: backendUrl + '/cpulse?external_lb_vip_address=' + ipaddress +'&tls=' + tls,
                            headers: {
                                'X-Auth-Token': authid
                            },
                        });

                        request.then(successCallback, failureCallback);
                    };

                    var fetchEachcpulsedetail = function (ipaddress, authid, uuid, tls, successCallback, failureCallback) {
                        var backendUrl = Configuration.isDebug ? Configuration.backendServerUrl : "";
                        var request = $http({
                            method: "GET",
                            url: backendUrl + '/cpulse/' + uuid + '?external_lb_vip_address=' + ipaddress +'&tls=' + tls,
                            headers: {
                                'X-Auth-Token': authid
                            }
                        });

                        request.then(successCallback, failureCallback);
                    };

                    var runCloudpulseTest = function (ipaddress, authid, runtestname, tls, successCallback, failureCallback) {
                        var backendUrl = Configuration.isDebug ? Configuration.backendServerUrl : "";
                        var request = $http({
                            method: "POST",
                            url: backendUrl + '/cpulse?external_lb_vip_address=' + ipaddress +'&tls=' + tls,
                            headers: {
                                'X-Auth-Token': authid
                            },
                            data: runtestname
                        });

                        request.then(successCallback, failureCallback);
                    };

                    var getCloudPulseToken = function (tokenRequestObject, successCallback, failCallback) {
                        var backendUrl = Configuration.isDebug ? Configuration.backendServerUrl : "";
                        var request = $http({
                            method: "POST",
                            url: backendUrl + '/tokens',
                            data: tokenRequestObject
                        });

                        request.then(function (resp) {
                            CloudPulseTokenService.auth_token = resp.data.access.token.id;
                            successCallback(resp);
                        }, function (resp) {

                        });

                    };

                    return{
                        getCloudPulseToken: getCloudPulseToken,
                        fetchCpulsedata: fetchCpulsedata,
                        runCloudpulseTest: runCloudpulseTest,
                        fetchEachcpulsedetail: fetchEachcpulsedetail
                    };
                }])
            .controller('CloudpulseCtrl', ['$rootScope', '$scope', '$http', 'DeploymentMonitoringService', 'CloudPulseService', 'Configuration', 'CloudPulseTokenService', '$filter','SystemUpdateData','UpdateMonitoring','Events', function ($rootScope, $scope, $http, DMS, CloudPulseService, Configuration, CloudPulseTokenService, $filter,SystemUpdateData,UpdateMonitoring,Events) {
                    var backendServerUrl = Configuration.isDebug ? Configuration.backendServerUrl : "";
                    $scope.CpulseArr = [];
                    $scope.isVisibleData = true;
                    $scope.list_categories = {
                        data: [{
                                id: 'cinder_endpoint',
                                name: 'cinder_endpoint',
                                group: 'Endpoint Tests'
                            }, {
                                id: 'glance_endpoint',
                                name: 'glance_endpoint',
                                group: 'Endpoint Tests'
                            }, {
                                id: 'keystone_endpoint',
                                name: 'keystone_endpoint',
                                group: 'Endpoint Tests'
                            }, {
                                id: 'nova_endpoint',
                                name: 'nova_endpoint',
                                group: 'Endpoint Tests'
                            }, {
                                id: 'neutron_endpoint',
                                name: 'neutron_endpoint',
                                group: 'Endpoint Tests'
                            }, {
                                id: 'rabbitmq_check',
                                name: 'rabbitmq_check',
                                group: 'Operator Tests'
                            }, {
                                id: 'galera_check',
                                name: 'galera_check',
                                group: 'Operator Tests'
                            }, {
                                id: 'ceph_check',
                                name: 'ceph_check',
                                group: 'Operator Tests'
                            }]
                    };
                    $scope.list_category = 'cinder_endpoint';

                    DMS.startCheckingForPODOperation();
                    UpdateMonitoring.startPollingforStatus();
                    $scope.activePodOperationObj = DMS.getOnGoingPodOperationDetails();
                    $scope.checkIfAnyOperationRunning = function(){
                        var isRunning = false;
                        if($scope.activePodOperationObj.status=="ToAdd" || $scope.activePodOperationObj.status == "Adding" || $scope.activePodOperationObj.status == "ToDelete" || $scope.activePodOperationObj.status == "Deleting" || $scope.activePodOperationObj.status == "ToReplace" || $scope.activePodOperationObj.status == "Running" ||
                            SystemUpdateData.update_status == "ToUpdate" || SystemUpdateData.update_status == "UpdateRunning" || SystemUpdateData.update_status == "ToCommit" || SystemUpdateData.update_status == "CommitRunning" || SystemUpdateData.update_status == "ToRollback" ||
                            SystemUpdateData.update_status == "RollbackRunning" || SystemUpdateData.update_status == "BootstrapAutoRollback" || SystemUpdateData.update_status == "AutoRollbackRunning"){
                            isRunning = true;
                        }
                        return isRunning;
                    };
                    $scope.getTitle = function(){
                      if(($scope.activePodOperationObj.status=="ToAdd" || $scope.activePodOperationObj.status == "Adding" || $scope.activePodOperationObj.status == "ToDelete" || $scope.activePodOperationObj.status == "Deleting" || $scope.activePodOperationObj.status == "ToReplace" || $scope.activePodOperationObj.status == "Running") &&
                          !(SystemUpdateData.update_status == "ToUpdate" || SystemUpdateData.update_status == "UpdateRunning" || SystemUpdateData.update_status == "ToCommit" || SystemUpdateData.update_status == "CommitRunning" || SystemUpdateData.update_status == "ToRollback" ||
                          SystemUpdateData.update_status == "RollbackRunning" || SystemUpdateData.update_status == "BootstrapAutoRollback" || SystemUpdateData.update_status == "AutoRollbackRunning")){
                          return "Pod Operation Running";
                      }
                      else if(SystemUpdateData.update_status == "ToUpdate" || SystemUpdateData.update_status == "UpdateRunning" || SystemUpdateData.update_status == "ToCommit" || SystemUpdateData.update_status == "CommitRunning" || SystemUpdateData.update_status == "ToRollback" ||
                          SystemUpdateData.update_status == "RollbackRunning" || SystemUpdateData.update_status == "BootstrapAutoRollback" || SystemUpdateData.update_status == "AutoRollbackRunning"){
                          return "System Update Running";
                      }else{
                          return "Run Test";
                      }

                    };
                    $scope.$on("$destroy", function() {
                        UpdateMonitoring.stopPolling();
                    });

                    $rootScope.$on(Events.PODMGMTACTIVITY,function(){
                        $scope.activePodOperationObj = DMS.getOnGoingPodOperationDetails();
                        $scope.checkIfAnyOperationRunning();
                    });

                $scope.gridOptionsForcloudPulse = {
                        columnDefs: [{
                                field: 'name',
                                name: 'Name', enableColumnResizing: false, cellTooltip:
                                        function (row, col) {
                                            return '' + row.entity.name + '';
                                        }
                            }, {
                                field: 'result',
                                name: 'Result', cellTooltip:
                                        function (row, col) {
                                            return '' + row.entity.result + '';
                                        }
                            }, {
                                field: 'state',
                                name: 'State', cellTooltip:
                                        function (row, col) {
                                            return '' + row.entity.state + '';
                                        }
                            }, {
                                field: 'testtype',
                                name: 'Test Type', enableColumnResizing: false, cellTooltip:
                                        function (row, col) {
                                            return '' + row.entity.testtype + '';
                                        }
                            }, {
                                field: 'created_at',
                                name: 'Created Date', enableColumnResizing: false, cellTooltip:
                                        function (row, col) {
                                            return '' + row.entity.created_at + '';
                                        }
                            }, {
                                field: 'updated_at',
                                name: 'Updated Date', enableColumnResizing: false, cellTooltip:
                                        function (row, col) {
                                            return '' + row.entity.updated_at + '';
                                        }
                            }],
                        hideHeader: true,
                        enableGridMenu: true,
                        enableSelectAll: true,
                        exporterMenuPdf: false,
                        exporterMenuCsv: false,
                        enableHorizontalScrollbar: 0,
                        onRegisterApi: function (gridApi) {
                            $scope.gridApi = gridApi;

                        }
                    };



                    $scope.fetchCloudPulseData = function () {
                        $scope.CpulseArr = [];
                        $scope.deployedblueprintname = DMS.getDeployedBlueprint();
                        if ($scope.deployedblueprintname.name !== "") {
                            var getDetails = JSON.parse(DMS.getDeployedBlueprint().setupData.jsondata);
							if(getDetails.external_lb_vip_tls){
                           // $scope.istlsEnebled = getDetails.external_lb_vip_tls;
							if(getDetails.external_lb_vip_tls == true){
								$scope.istlsEnebled = 'true';
							} else{
								$scope.istlsEnebled = 'false';
							}
							} else {
								$scope.istlsEnebled = 'false';
							}
                            $scope.external_lb_vip_address = getDetails.external_lb_vip_address;
                            var tokenRequestObject = {
                                "external_lb_vip_address": $scope.external_lb_vip_address,
                                "tls":$scope.istlsEnebled,
                                "payload": {
                                    "auth": {
                                        "tenantName": getDetails.ADMIN_TENANT_NAME,
                                        "passwordCredentials": {
                                            "username": getDetails.ADMIN_USER,
                                            "password": getDetails.ADMIN_USER_PASSWORD
                                        }
                                    }
                                }
                            };
                            
                            //if TMS.token_id ==""
                            if (CloudPulseTokenService.auth_token == "") {
                                CloudPulseService.getCloudPulseToken(tokenRequestObject, function (resp) {
                                    //ToDO TMS.token_id = resp.data.access.token.id;
                                    var token_id = resp.data.access.token.id;
                                    CloudPulseService.fetchCpulsedata($scope.external_lb_vip_address, token_id, $scope.istlsEnebled,function (resp) {
                                        //success
                                        $scope.cpulseData = resp.data.cpulses;
                                        for (var j = 0; j <= $scope.cpulseData.length; j++) {
                                            if (typeof ($scope.cpulseData[j]) == 'object') {
                                                CloudPulseService.fetchEachcpulsedetail($scope.external_lb_vip_address, token_id, $scope.cpulseData[j].uuid, $scope.istlsEnebled,function (resp) {
                                                    var createDate = new Date(resp.data.created_at).toLocaleString();
                                                    var updateDate = new Date(resp.data.updated_at).toLocaleString();
                                                    $scope.CpulseArr.push({
                                                        'name': resp.data.name,
                                                        'result': resp.data.result,
                                                        'state': resp.data.state,
                                                        'testtype': resp.data.testtype,
                                                        'created_at': createDate,
                                                        'updated_at': updateDate
                                                    });
                                                    $scope.gridOptionsForcloudPulse.data = $scope.CpulseArr;
                                                }, function (resp) {
                                                    //each cpulse detail fail function
                                                })
                                            }
                                        }
                                        // $scope.gridOptionsForcloudPulse.data = $scope.cpulseData;

                                    }, function (resp) {
                                        $scope.fetchCloudPulseData();
                                    });
                                }, function (resp) {
                                    $scope.fetchCloudPulseData(tokenRequestObject);
                                });
                            } else {
                                var token_id = CloudPulseTokenService.auth_token;
                                CloudPulseService.fetchCpulsedata($scope.external_lb_vip_address, token_id, $scope.istlsEnebled, function (resp) {
                                    //success
                                    $scope.cpulseData = resp.data.cpulses;
                                    var m = $scope.cpulseData.length;
                                    for (var j = 0; j <= $scope.cpulseData.length; j++) {
                                        if (typeof ($scope.cpulseData[j]) == 'object') {
                                            CloudPulseService.fetchEachcpulsedetail($scope.external_lb_vip_address, token_id, $scope.cpulseData[j].uuid, $scope.istlsEnebled,function (resp) {
                                                var createDate = new Date(resp.data.created_at).toLocaleString();
                                                var updateDate = new Date(resp.data.updated_at).toLocaleString();
                                                $scope.CpulseArr.push({
                                                    'name': resp.data.name,
                                                    'result': resp.data.result,
                                                    'state': resp.data.state,
                                                    'testtype': resp.data.testtype,
                                                    'created_at': createDate,
                                                    'updated_at': updateDate
                                                });
                                                $scope.gridOptionsForcloudPulse.data = $scope.CpulseArr;
                                            }, function (resp) {
                                                //each cpulse detail fail function
                                            })
                                        }
                                    }
                                    
                                    if(m == 0){
                                        $scope.isava = false;
                                    }
                                    // $scope.gridOptionsForcloudPulse.data = $scope.cpulseData;
                                }, function (resp) {
                                    $scope.fetchCloudPulseData();
                                });
                            }
                        }
                    };

                    $scope.$on("SetupDataChanged", function () {
                        $scope.fetchCloudPulseData();
                    });




                    $scope.runTest = function () {

                        $scope.cloudPulsetest = {"name": $scope.list_category};
                        CloudPulseService.runCloudpulseTest($scope.external_lb_vip_address, CloudPulseTokenService.auth_token, $scope.cloudPulsetest, $scope.istlsEnebled,function (resp) {
                            $scope.createdate = new Date(resp.data.created_at).toLocaleString();
                            $scope.updatedate = new Date(resp.data.updated_at).toLocaleString();
                            if ($scope.createdate == null) {
                                $scope.isVisibleData = false;
                                $scope.created_date = "No date Found";
                            } else {
                                $scope.isVisibleData = false;
                                $scope.created_date = $scope.createdate;
                            }


                            if ($scope.updatedate == null) {
                                $scope.isVisibleData = false;
                                $scope.update_date = "No date Found";
                            } else {
                                $scope.isVisibleData = false;
                                $scope.update_date = $scope.updatedate;
                            }

                            $scope.fetchCloudPulseData();
                        }, function (resp) {
                            $rootScope.$broadcast("ShowErrorMessage", {
                                type: 'danger',
                                msg: resp.statusText,
                                disableAutoClose: false
                            });
                        });
                    };

                    $scope.searchData = function () {

                        if ($filter('filter')($scope.cpulseData, $scope.searchText, undefined).length == 0) {
                            $scope.isDatafound = true;
                            $scope.gridOptionsForcloudPulse.data = $filter('filter')($scope.CpulseArr, $scope.searchText, undefined);
                        } else {
                            $scope.isDatafound = false;
                            $scope.gridOptionsForcloudPulse.data = $filter('filter')($scope.CpulseArr, $scope.searchText, undefined);
                        }
                    };

                    $scope.refreshCpluse = function () {
                        $scope.fetchCloudPulseData();

                    };
                    $scope.fetchCloudPulseData();

                }]);




}());
