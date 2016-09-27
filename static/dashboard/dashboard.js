(function () {
    'use strict';

    angular.module('mercuryInstaller.dashboard', ['ngRoute', 'mercuryInstaller.utility', 'ngAnimate', 'ngTouch', 'ui.grid', 'ui.grid.selection', 'ui.grid.exporter','ui.grid.autoResize','ui.grid.resizeColumns', 'ui.grid.moveColumns'])
        .config(['$routeProvider',
            function ($routeProvider) {

                $routeProvider
                    .when('/dashboard', {
                        controller: 'DashboardCtrl',
                        templateUrl: '../static/dashboard/dashboard.html'
                    })
            }
        ])

        .controller('DashboardCtrl', ['$rootScope', '$scope', '$http', '$interval', 'DeploymentMonitoringService', '$filter', 'Events','UpdateMonitoring','SystemUpdateData',
            function ($rootScope, $scope, $http, $interval, DMS, $filter, Events,UpdateMonitoring,SystemUpdateData) {
        		$("#ValidationStatus").on('shown.bs.modal', function () {
        			$(window).trigger('resize');
        			
        		});
        		$(".collapse").on('shown.bs.collapse', function(){
        			$(window).trigger('resize');
        	    });
                $scope.deployedBlueprint = {
                    name: "No Active Deployment"
                };

                $scope.gridOptionsForhardwareval = {
                    columnDefs: [
                        {
                            cellTemplate: '<div class="grid-tooltip" title="{{ row.entity.name }}" tooltip-placement="right"><div class="ui-grid-cell-contents">{{ row.entity.name }}</div></div>',
                            name: 'Name',
                            field: 'name'
                        },
                        {
                            cellTemplate: '<div class="grid-tooltip" title="{{ row.entity.status }}" tooltip-placement="right"><div class="ui-grid-cell-contents"><span class="label {{row.entity.statusColor}}">{{ row.entity.status }}</span></div></div>',
                            name: 'Status',
                            field: 'status',
                            width:100
                        },
                        {
                            cellTemplate: '<div class="grid-tooltip" title="{{ row.entity.reason }}" tooltip-placement="right"><div class="ui-grid-cell-contents">{{ row.entity.reason }}</div></div>',
                            name: 'Reason',
                            field: 'reason',
                            enableColumnResizing: false
                        }
                    ],
                    hideHeader: true,
                        enableGridMenu: true,
                        enableSelectAll: true,
                        exporterMenuPdf: false,
                        exporterMenuCsv:false,
                    onRegisterApi: function (gridApi) {
                        $scope.gridApi = gridApi;
                       
                    }
                };

                $scope.gridOptionsForsoftwareval = {
                    columnDefs: [
                        {
                            cellTemplate: '<div class="grid-tooltip" title="{{ row.entity.name }}" tooltip-placement="right"><div class="ui-grid-cell-contents">{{ row.entity.name }}</div></div>',
                            name: 'Name',
                            field: 'name'
                        },
                        {
                            cellTemplate: '<div class="grid-tooltip" title="{{ row.entity.status }}" tooltip-placement="right"><div class="ui-grid-cell-contents"><span class="label {{row.entity.statusColor}}">{{ row.entity.status }}</span></div></div>',
                            name: 'Status',
                            field: 'status',
                            width:100
                        },
                        {
                            cellTemplate: '<div class="grid-tooltip" title="{{ row.entity.reason }}" tooltip-placement="right"><div class="ui-grid-cell-contents">{{ row.entity.reason }}</div></div>',
                            name: 'Reason',
                            field: 'reason',
                            enableColumnResizing: false
                        }
                    ],
                    hideHeader: true,
                        enableGridMenu: true,
                        enableSelectAll: true,
                        exporterMenuPdf: false,
                        exporterMenuCsv:false,
                    onRegisterApi: function (gridApi) {
                        $scope.gridApi = gridApi;
                       

                    }
                };
                $scope.isLogs = true;
                $scope.reverseSortforStatusHardware = true;
                $scope.reverseSortforStatusSoftware = true;
                $scope.showLink = true;
                $scope.showBr = false;
                $scope.statusObject = {};
                $scope.statusObject.isLogs = true;
                $scope.activeOperationObject = new Object();
                $scope.activeOperationObject.isActive = false;
                $scope.activeOperationObject.status = "N.A.";
                $scope.activeOperationObject.operation = "N.A.";
                $rootScope.$on("deploymentStatusChanged", function () {
                    $scope.getDeploymentStatusData();
                });

                DMS.startCheckingForPODOperation();
                UpdateMonitoring.startPollingforStatus();

                $scope.checkForActiveOperation = function(){
                    var activePodOperationObj = DMS.getOnGoingPodOperationDetails();
                    if(activePodOperationObj.status == "ToAdd" || activePodOperationObj.status == "Adding" || activePodOperationObj.status == "AddNodeFailed" || activePodOperationObj.status == "AddNodePreFailed" || activePodOperationObj.status == "Active"){
                        $scope.activeOperationObject.isActive = true;
                        $scope.activeOperationObject.status = activePodOperationObj.status;

                        $scope.activeOperationObject.operation = "Add Node";
                    }
                    else if(activePodOperationObj.status == "ToDelete" || activePodOperationObj.status == "Deleting" || activePodOperationObj.status == "DeleteNodeFailed" ||activePodOperationObj.status == "Active" ){
                        $scope.activeOperationObject.isActive = true;
                        $scope.activeOperationObject.status = activePodOperationObj.status;
                        $scope.activeOperationObject.operation = "Delete Node";
                    }
                    else if(activePodOperationObj.status == "ToReplace" || activePodOperationObj.status == "Replacing" || activePodOperationObj.status == "ReplaceNodeFailed" ||activePodOperationObj.status == "Active" || activePodOperationObj.status == "Running"){
                        $scope.activeOperationObject.isActive = true;
                        $scope.activeOperationObject.status = activePodOperationObj.status;
                        $scope.activeOperationObject.operation = "Replace Node";
                    }

                    else if(SystemUpdateData.update_status == "ToUpdate" || SystemUpdateData.update_status == "UpdateRunning" || SystemUpdateData.update_status == "ToCommit" || SystemUpdateData.update_status == "CommitRunning" || SystemUpdateData.update_status == "ToRollback" ||
                        SystemUpdateData.update_status == "RollbackRunning" || SystemUpdateData.update_status == "AutoRollbackRunning" || SystemUpdateData.update_status == "BootstrapAutoRollback"){
                        $scope.activeOperationObject.isActive = true;
                        $scope.activeOperationObject.status = SystemUpdateData.update_status;
                        $scope.activeOperationObject.operation = "System Update Running";
                    }
                    else if(SystemUpdateData.update_status == "UpdateFailed" || SystemUpdateData.update_status == "CommitFailed" || SystemUpdateData.update_status == "RollbackFailed" || SystemUpdateData.update_status == "AutoRollbackFailed"){
                        $scope.activeOperationObject.isActive = true;
                        $scope.activeOperationObject.status = SystemUpdateData.update_status;
                        $scope.activeOperationObject.operation = "System Update Failed";
                    }
                    else if(SystemUpdateData.update_status == "AutoRollbackSuccess" || SystemUpdateData.update_status == "UpdateSuccess" || SystemUpdateData.update_status == "CommitSuccess" || SystemUpdateData.update_status == "RollbackSuccess"){
                        $scope.activeOperationObject.isActive = false;
                        $scope.activeOperationObject.status = "NA";
                        $scope.activeOperationObject.operation = "Not Running";
                    }
                };

                $rootScope.$on(Events.PODMGMTACTIVITY,function(){
                    $scope.checkForActiveOperation();
                });

                $scope.$watch(function(){
                    return SystemUpdateData.update_status;
                },function(){
                    $scope.checkForActiveOperation();
                });



                $scope.getDeploymentStatusData = function () {
                    $scope.softwareValArr = [];
                    $scope.hardwareValArr = [];
                    $scope.softwareValFinalArr = [];
                    $scope.hardwareValFinalArr = [];
                    $scope.dataavab = true;
                    $scope.isDataAvailableforSoftware = true;
                    $scope.isDataAvailableforHardware = true;

                    if (DMS.getDeploymentCurrentStatus() !== "INACTIVE") {
                        var deploymentObject = DMS.getDeploymentStatusDetails();
                        if (deploymentObject) {
                            $scope.statusObject.installlogs = deploymentObject.install_logs;
                            $scope.statusObject.createddate = new Date(deploymentObject.created_at).toLocaleString();
                            $scope.statusObject.updateddate = deploymentObject.updated_at;
                            $scope.statusObject.ceph = deploymentObject.ceph;
                            $scope.statusObject.baremetal = deploymentObject.baremetal;
                            $scope.statusObject.orchestration = deploymentObject.orchestration;
                            $scope.statusObject.currentstatus = deploymentObject.currentstatus;
                            $scope.statusObject.validation = deploymentObject.validation;
                            $scope.statusObject.bootstrap = deploymentObject.bootstrap;
                            $scope.statusObject.runtimeValidation = deploymentObject.runtimevalidation;
                            $scope.statusObject.hostsetup = deploymentObject.hostsetup;
                            $scope.statusObject.vmtp = deploymentObject.vmtp;
                            $scope.statusObject.validationstatus = deploymentObject.validationstatus;

                            if (($scope.statusObject.validation == "Failed") || ($scope.statusObject.validation == "Success")) {
                                $scope.softwareValArr = (deploymentObject && deploymentObject.validationstatus != "Exception") ? JSON.parse(deploymentObject.validationstatus).Software_Validation : [];
                                if ($scope.softwareValArr.length == 0) {
                                    $scope.isDataAvailableforSoftware = false;
                                } else {
                                    for (var i in $scope.softwareValArr) {
                                        var name = $scope.softwareValArr[i].name;
                                        var reason = $scope.softwareValArr[i].reason;
                                        var status = $scope.softwareValArr[i].status;
                                        if (status == 'Fail' || status == 'FAIL') {
                                            $scope.validationstatusforSoftware = 'label-danger';
                                            status = 'FAIL';
                                            $scope.statusforCollapseMenu = status;
                                        } else if (status == 'Pass' || status == 'PASS') {
                                            $scope.validationstatusforSoftware = 'label-success';
                                            status = 'PASS';
                                        }
                                        if (name != 'Overall_SW_Result') {
                                            $scope.softwareValFinalArr.push({
                                                'name': name,
                                                'status': status,
                                                'reason': reason,
                                                'statusColor': $scope.validationstatusforSoftware
                                            });
                                            $scope.gridOptionsForsoftwareval.data = $scope.softwareValFinalArr;
                                        } else {

                                        }
                                    }
                                }

                                $scope.hardwareValArr = (deploymentObject && deploymentObject.validationstatus != "Exception") ? JSON.parse(deploymentObject.validationstatus).Hardware_Validation : [];
                                if ($scope.hardwareValArr.length == 0) {
                                    $scope.isDataAvailableforHardware = false;

                                } else {
                                    for (var j in $scope.hardwareValArr) {
                                        var name = $scope.hardwareValArr[j].name;
                                        var reason = $scope.hardwareValArr[j].reason;
                                        var status = $scope.hardwareValArr[j].status;
                                        if (status == 'Fail' || status == 'FAIL') {
                                            $scope.validationstatusforHardware = 'label-danger';
                                            status = 'FAIL';
                                        } else if (status == 'Pass' || status == 'PASS') {
                                            $scope.validationstatusforHardware = 'label-success';
                                            status = 'PASS';
                                        }
                                        if (name != 'Overall_HW_Result') {
                                            $scope.hardwareValFinalArr.push({
                                                'name': name,
                                                'status': status,
                                                'reason': reason,
                                                'statusColor': $scope.validationstatusforHardware
                                            });
                                            $scope.gridOptionsForhardwareval.data = $scope.hardwareValFinalArr;
                                        } else {

                                        }
                                    }
                                }

                                $scope.showLink = false;
                                $scope.statusVal = (deploymentObject && deploymentObject.validationstatus != "Exception") ? JSON.parse(deploymentObject.validationstatus).status : "";
                                if ($scope.statusObject.validation == "Failed") {
                                    $scope.validationstatus = 'label-danger';
                                } else {
                                    $scope.validationstatus = 'label-success';
                                }
                            }

                                if($scope.statusObject.installlogs != ''){
                                    $scope.statusObject.isLogs = false;
                                }else {
                                    $scope.statusObject.isLogs = true;
                                }

                            if($scope.statusObject.updateddate == null){
                                $scope.statusObject.updated_date = "No date Found";
                            }else{
                                $scope.statusObject.updated_date = new Date($scope.statusObject.updateddate).toLocaleString();
                            }



                            $scope.showBr = true;
                        }

                        $scope.deployedBlueprint.name = DMS.getDeployedBlueprint().name;
                        var activeDeploymentObjectSetupData = DMS.getDeployedBlueprint().setupData;
                        $scope.deployedBlueprint.status = activeDeploymentObjectSetupData.status;

                    } else {
                        $scope.deployedBlueprint.name = "No Active Deployment.";
                        $scope.deployedBlueprint.status = "Not Available";
                        $scope.statusObject = {};
                    }
                };
                $scope.getDeploymentStatusData();

                $scope.checkStatusForPodoperation = function(){
                    var status = "NA";
                    switch($scope.activeOperationObject.status){
                        case "ToAdd":
                        case "ToDelete":
                        case "ToReplace":
                        case "Adding":
                        case "Deleting":
                        case "Running":
                            status = "Running";
                            break;
                        case "AddNodePreFailed":
                        case "AddNodeFailed":
                        case "DeleteNodeFailed":
                        case "ReplaceNodeFailed":
                            status = "Failed";
                            break;
                        default:
                            status = "NA";
                            break;

                    }
                    return status;

                };

                $scope.checkforSystemUpdateStaus = function(){
                    var status = "";
                    switch(SystemUpdateData.update_status){
                        case "ToUpdate":
                        case "UpdateRunning":
                        case "ToCommit":
                        case "CommitRunning":
                        case "ToRollback":
                        case "RollbackRunning":
                        case "BootstrapAutoRollback":
                        case "BootstrapUpdate":
                        case "AutoRollbackRunning":
                            status = "Running";
                            break;
                        case "UpdateFailed":
                        case "CommitFailed":
                        case "RollbackFailed":
                            status = "Failed";
                            break;
                        default:
                            status = "NA";
                            break;
                    }
                    return status;
                };

                $scope.setclasasperstatus = function(){
                    var podStatus = $scope.checkStatusForPodoperation();
                    var updateStatus = $scope.checkforSystemUpdateStaus();
                    if($scope.deployedBlueprint.status == "Active" && podStatus == "Running" && updateStatus!="Running")
                        return "label label-info";
                    else if($scope.deployedBlueprint.status == "Active" && podStatus == "Failed" && updateStatus!="Running")
                        return "label label-warning";
                    else if($scope.deployedBlueprint.status == "InstallationFailed" && updateStatus!="Running")
                        return "label label-danger";
                    else if($scope.deployedBlueprint.status == "Active" && podStatus == "NA" && updateStatus!="Running")
                        return "label label-success";
                    else if($scope.deployedBlueprint.status == "Active" && updateStatus=="Running")
                        return "label label-info";
                    else if($scope.deployedBlueprint.status == "Active" && updateStatus=="Failed")
                        return "label label-warning";


                }

            }
        ])
        .directive('miDashboard', function ($interval) {
            return {
                restrict: 'E',
                replace: true,
                scope: {
                    dashboardobj: "=",
                    blueprintname:"="
                },
                template: '' +
                '<div class="row dashbordcontainer">' +
                '<div class="container1 margintopcarsouel">' +
                '<div class="carousel">' +
                '<div class="item a"><div class="progress filldiv" ng-show="checkIfRunning(\'Validation\')"><div class="progress-bar progress-bar-striped active  carousel-progressbar filldiv" role="progressbar" aria-valuemin="0" aria-valuemax="100" style="width:40%"><img class="deploymentStepIcon" alt = "Validation" src="../static/imgs/validation.png"><br/><br/><p>Validation</p>{{dashboardobj.validation}}</div></div><div ng-hide="checkIfRunning(\'Validation\')" class="filldiv"><img class="deploymentStepIcon" alt = "Validation" src="../static/imgs/validation.png"><br><br/><p>Validation</p><p>{{dashboardobj.validation}}</p><p></p><p><a href="javascript:void(0);" ng-show="checkForValidationStatus()" ng-click="showValidationPopup()">See Details</a></p></div></div>' +
                '<div class="item b"><div class="progress filldiv" ng-show="checkIfRunning(\'Bootstrap\')"><div class="progress-bar progress-bar-striped active  carousel-progressbar filldiv" role="progressbar" aria-valuemin="0" aria-valuemax="100" style="width:40%"><img class="deploymentStepIcon" alt = "Bootstrap" src="../static/imgs/orchestration.png"><br><br/><p>Build Node Orchestration</p>{{dashboardobj.bootstrap}}</div></div><div ng-hide="checkIfRunning(\'Bootstrap\')"><img class="deploymentStepIcon" alt = "Bootstrap" src="../static/imgs/orchestration.png"><br><br/><p>Build Node Orchestration</p><p>{{dashboardobj.bootstrap}}</p></div></div>' +
                '<div class="item c"><div class="progress filldiv" ng-show="checkIfRunning(\'RuntimeValidation\')"><div class="progress-bar progress-bar-striped active  carousel-progressbar filldiv" role="progressbar" aria-valuemin="0" aria-valuemax="100" style="width:40%"><img class="deploymentStepIcon" alt = "Validation" src="../static/imgs/validation.png"><br/><br/><p>Runtime Validation</p>{{dashboardobj.runtimeValidation}}</div></div><div ng-hide="checkIfRunning(\'RuntimeValidation\')" class="filldiv"><img class="deploymentStepIcon" alt = "Runtime Validation" src="../static/imgs/validation.png"><br><br/><p>Runtime Validation</p><p>{{dashboardobj.runtimeValidation}}</p></div></div>' +
                '<div class="item d"><div class="progress filldiv" ng-show="checkIfRunning(\'Baremetal\')"><div class="progress-bar progress-bar-striped active  carousel-progressbar filldiv" role="progressbar" aria-valuemin="0" aria-valuemax="100" style="width:40%"><img class="deploymentStepIcon" alt = "Baremetal" src="../static/imgs/baremetal.png"><br><br/><p>Bare Metal</p>{{dashboardobj.baremetal}}</div></div><div ng-hide="checkIfRunning(\'Baremetal\')"><img class="deploymentStepIcon" alt = "Baremetal" src="../static/imgs/baremetal.png"><br><br/><p>Bare Metal</p><p>{{dashboardobj.baremetal}}</p></div></div>' +
                '<div class="item e"><div class="progress filldiv" ng-show="checkIfRunning(\'HostSetup\')"><div class="progress-bar progress-bar-striped active  carousel-progressbar filldiv" role="progressbar" aria-valuemin="0" aria-valuemax="100" style="width:40%"><img class="deploymentStepIcon" alt = "Host Setup" src="../static/imgs/hostsetup.png"><br><br/><p>Host Setup</p>{{dashboardobj.hostsetup}}</div></div><div ng-hide="checkIfRunning(\'HostSetup\')"><img class="deploymentStepIcon" alt = "Host Setup" src="../static/imgs/hostsetup.png"><br><br/><p>Host Setup</p><p>{{dashboardobj.hostsetup}}</p></div></div>' +
                '<div class="item f"><div class="progress filldiv" ng-show="checkIfRunning(\'Ceph\')"><div class="progress-bar progress-bar-striped active  carousel-progressbar filldiv" role="progressbar" aria-valuemin="0" aria-valuemax="100" style="width:40%"><img class="deploymentStepIcon" alt = "Ceph" src="../static/imgs/ceph.png"><br><br/><p>Ceph</p>{{dashboardobj.ceph}}</div></div><div ng-hide="checkIfRunning(\'Ceph\')"><img class="deploymentStepIcon" alt = "Ceph" src="../static/imgs/ceph.png"><br><br/><p>Ceph</p><p>{{dashboardobj.ceph}}</p></div></div>' +
                '<div class="item g"><div class="progress filldiv" ng-show="checkIfRunning(\'Orchestration\')"><div class="progress-bar progress-bar-striped active  carousel-progressbar filldiv" role="progressbar" aria-valuemin="0" aria-valuemax="100" style="width:40%"><img class="deploymentStepIcon" alt = "Orchestration" src="../static/imgs/orchestration.png"><br><br/><p>Orchestration</p>{{dashboardobj.orchestration}}</div></div><div ng-hide="checkIfRunning(\'Orchestration\')"><img class="deploymentStepIcon" alt = "Orchestration" src="../static/imgs/orchestration.png"><br><br/><p>Orchestration</p><p>{{dashboardobj.orchestration}}</p></div></div>' +
                '<div class="item h"><div class="progress filldiv" ng-show="checkIfRunning(\'VMTP\')"><div class="progress-bar progress-bar-striped active  carousel-progressbar filldiv" role="progressbar" aria-valuemin="0" aria-valuemax="100" style="width:40%"><img class="deploymentStepIcon" alt = "VMTP" src="../static/imgs/vmtp.png"><br><br/><p>VMTP</p>{{dashboardobj.vmtp}}</div></div><div ng-hide="checkIfRunning(\'VMTP\')"><img class="deploymentStepIcon" alt = "VMTP" src="../static/imgs/vmtp.png"><br><br/><p>VMTP</p><p>{{dashboardobj.vmtp}}</p></div></div>' +
                '</div>' +
                '</div>' +
                '<br/><br/><br/>' +
                '<div style="margin-top:26px;">' +
                '<div style="float:left; width:30%;text-align:right;" class="prev"><span class="glyphicon glyphicon-chevron-left mousepointer" id="dashboardPrevBtn"></span></div>' +
                '<div style="float:right; width:30%;text-align:left;" align="center" class="next"><span class="glyphicon glyphicon-chevron-right mousepointer" id="dashboardNextBtn"></span></div>' +
                '<div style="float:left;width:40%; text-align:center;">{{dashboardobj.currentstatus}}</div>' +
                '</div>' +
                '<div class="col-md-4 col-md-offset-4" style="margin-top: 23px;" > <div class="alert alert-info logscss" ng-hide="dashboardobj.currentstatus==\'\' || dashboardobj.currentstatus == undefined ?true:false"><span> Deployment Started at {{dashboardobj.createddate}}  </span> <br/> Last updated at {{dashboardobj.updated_date }} <br/> <span ng-hide="dashboardobj.isLogs">Click <a href="{{dashboardobj.installlogs}}" target="_blank"  class="alert-link"> HERE </a>to check the logs</span></div></div>'+
                '</div>',


                link: function (scope, elm, attr, ctrl) {

                    scope.currentActive = 0;
                    var carousel = $(".carousel"),
                        currdeg = 0;

                    $("#dashboardNextBtn").on("click", {
                        d: "n"
                    }, rotate);
                    $("#dashboardPrevBtn").on("click", {
                        d: "p"
                    }, rotate);
                    
                    function rotate(e) {
                        if (e.data.d == "n") {
                            currdeg = currdeg - 45;
                            if (scope.currentActive != 7)
                                scope.currentActive++;
                            else {
                                scope.currentActive = 0;
                            }
                        }
                        if (e.data.d == "p") {
                            currdeg = currdeg + 45;
                            if (scope.currentActive != 0)
                                scope.currentActive--;
                            else {
                                scope.currentActive = 7;
                            }
                        }
                        carousel.css({

                            "-webkit-transform": "rotateY(" + currdeg + "deg)",
                            "-moz-transform": "rotateY(" + currdeg + "deg)",
                            "-o-transform": "rotateY(" + currdeg + "deg)",
                            "transform": "rotateY(" + currdeg + "deg)"
                        });
                    }

                    function checkForStateAndChangeCss(state, stage) {
                        switch (state) {
                            case "ToRun":
                                $("." + stage).removeClass("running");
                                $("." + stage).removeClass("success");
                                $("." + stage).removeClass("failed");
                                $("." + stage).removeClass("skipped");
                                $("." + stage).addClass("torun");
                                break;
                            case "Running":
                                $("." + stage).removeClass("torun");
                                $("." + stage).removeClass("success");
                                $("." + stage).removeClass("failed");
                                $("." + stage).removeClass("skipped");
                                $("." + stage).addClass("running");
                                putTheRunningStageAtTop(stage);
                                break;
                            case "Success":
                                $("." + stage).removeClass("torun");
                                $("." + stage).removeClass("running");
                                $("." + stage).removeClass("failed");
                                $("." + stage).removeClass("skipped");
                                $("." + stage).addClass("success");
                                break;
                            case "Failed":
                                $("." + stage).removeClass("torun");
                                $("." + stage).removeClass("success");
                                $("." + stage).removeClass("running");
                                $("." + stage).removeClass("skipped");
                                $("." + stage).addClass("failed");
                                break;
                            case "Skipped":
                                $("." + stage).removeClass("torun");
                                $("." + stage).removeClass("success");
                                $("." + stage).removeClass("running");
                                $("." + stage).removeClass("failed");
                                $("." + stage).addClass("skipped");
                                break;
                        }
                    }

                    scope.$watch(function () {
                        return scope.dashboardobj.validation;
                    }, function () {
                        checkForStateAndChangeCss(scope.dashboardobj.validation, "a");
                    });
                    scope.$watch(function () {
                        return scope.dashboardobj.bootstrap;
                    }, function () {
                        checkForStateAndChangeCss(scope.dashboardobj.bootstrap, "b");
                    });
                    scope.$watch(function () {
                        return scope.dashboardobj.runtimeValidation;
                    }, function () {
                        checkForStateAndChangeCss(scope.dashboardobj.runtimeValidation, "c");
                    });

                    scope.$watch(function () {
                        return scope.dashboardobj.baremetal;
                    }, function () {
                        checkForStateAndChangeCss(scope.dashboardobj.baremetal, "d");
                    });

                    scope.$watch(function () {
                        return scope.dashboardobj.hostsetup;
                    }, function () {
                        checkForStateAndChangeCss(scope.dashboardobj.hostsetup, "e");
                    });

                    scope.$watch(function () {
                        return scope.dashboardobj.ceph;
                    }, function () {
                        checkForStateAndChangeCss(scope.dashboardobj.ceph, "f");
                    });

                    scope.$watch(function () {
                        return scope.dashboardobj.orchestration;
                    }, function () {
                        checkForStateAndChangeCss(scope.dashboardobj.orchestration, "g");
                    });

                    scope.$watch(function () {
                        return scope.dashboardobj.vmtp;
                    }, function () {
                        checkForStateAndChangeCss(scope.dashboardobj.vmtp, "h");
                    });
                    function putTheRunningStageAtTop(stage) {
                        var e = {
                            data: {
                                d: "n"
                            }
                        };
                        switch (stage) {
                            case "a":
                                while (scope.currentActive != 0) {
                                    rotate(e);
                                }

                                break;
                            case "b":
                                while (scope.currentActive != 1) {
                                    rotate(e);
                                }
                                break;
                            case "c":
                                while (scope.currentActive != 2) {
                                    rotate(e);
                                }

                                break;
                            case "d":
                                while (scope.currentActive != 3) {
                                    rotate(e);
                                }
                                break;
                            case "e":
                                while (scope.currentActive != 4) {
                                    rotate(e);
                                }
                                break;
                            case "f":
                                while (scope.currentActive != 5) {
                                    rotate(e);
                                }
                                break;
                            case "g":
                                while (scope.currentActive != 6) {
                                    rotate(e);
                                }
                                break;
                            case "h":
                                while (scope.currentActive != 7) {
                                    rotate(e);
                                }
                                break;
                        }
                    }

                },
                controller: ['$scope', function ($scope) {
                    $scope.checkIfRunning = function (stage) {
                        var isRunning = false;
                        switch (stage) {
                            case 'Validation':
                                isRunning = $scope.dashboardobj.validation == "Running" ? true : false;
                                break;
                            case 'Bootstrap':
                                isRunning = $scope.dashboardobj.bootstrap == "Running" ? true : false;
                                break;
                            case 'RuntimeValidation':
                                isRunning = $scope.dashboardobj.runtimeValidation == "Running" ? true : false;
                                break;
                            case 'Baremetal':
                                isRunning = $scope.dashboardobj.baremetal == "Running" ? true : false;
                                break;
                            case 'HostSetup':
                                isRunning = $scope.dashboardobj.hostsetup == "Running" ? true : false;
                                break;
                            case 'Ceph':
                                isRunning = $scope.dashboardobj.ceph == "Running" ? true : false;
                                break;
                            case 'Orchestration':
                                isRunning = $scope.dashboardobj.orchestration == "Running" ? true : false;
                                break;
                            case 'VMTP':
                                isRunning = $scope.dashboardobj.vmtp == "Running" ? true : false;
                                break;
                        }
                        return isRunning;
                    };

                    $scope.checkForValidationStatus = function () {
                        if ($scope.dashboardobj.validationstatus) {
                            return true;
                        } else {
                            return false;
                        }
                    };
                    $scope.showValidationPopup = function () {
                    	// $("#ValidationStatus").modal("hide");
                        $("#ValidationStatus").modal("show");
                        
//                        $interval(function () {
//                            $(window).trigger('resize');
//                            // $scope.gridApi.core.handleWindowResize();
//                        }, 1000);
                    };
                }]
            }
        });

}());