(function () {
    'use strict';
    angular.module('mercuryInstaller.blueprintManagement', ['ngRoute', 'mercuryInstaller.utility', 'mercuryInstaller.widgets', 'smart-table', 'ngAnimate', 'ngTouch', 'ui.grid', 'ui.grid.selection', 'ui.grid.exporter', 'ui.grid.autoResize', 'ui.grid.resizeColumns', 'ui.grid.moveColumns'])
        .config(['$routeProvider', function ($routeProvider) {
            $routeProvider
                .when('/blueprintmgmt', {
                    templateUrl: '../static/blueprintmanagement/blueprintmanagement.html',
                    controller: 'BlueprintCtrl'
                });
        }])


        .controller('BlueprintCtrl', ['$scope', '$rootScope', 'filterFilter', '$filter', 'editObjService', '$http', 'BlueprintManagementFactory', 'DeploymentMonitoringService','Events','SystemUpdateData','UpdateMonitoring',
            function ($scope, $rootScope, filterFilter, $filter, editObjService, $http, BlueprintManagementFactory, DeploymentMonitoringService,Events,SystemUpdateData,UpdateMonitoring) {
                //  $scope.orderByField = 'creation_dates';
                $rootScope.$broadcast('rolling', {
                    status: 'start'
                });
                $scope.isActiveOperation = false;

                DeploymentMonitoringService.startCheckingForPODOperation();
                UpdateMonitoring.startPollingforStatus();

                $scope.activeOperationObject = {};

                $scope.checkPodOperationStatus = function(){
                    var activePodOperationObj = DeploymentMonitoringService.getOnGoingPodOperationDetails();
                    if(activePodOperationObj.status == "ToAdd" || activePodOperationObj.status == "Adding" || activePodOperationObj.status == "ToDelete" || activePodOperationObj.status == "Deleting" || activePodOperationObj.status == "ToReplace" || activePodOperationObj.status == "Replacing" || activePodOperationObj.status == "Running"){
                        $scope.isActiveOperation = true;
                    }else{
                        $scope.isActiveOperation = false;
                    }
                    $scope.activeOperationObject = {};
                    $scope.activeOperationObject.podObject = activePodOperationObj;
                    if(activePodOperationObj.status == "ToAdd" || activePodOperationObj.status == "Adding" || activePodOperationObj.status == "AddNodeFailed" || activePodOperationObj.status == "AddNodePreFailed" || activePodOperationObj.status == "Active"){

                        $scope.activeOperationObject.operation = "Add Node in progress";
                    }
                    else if(activePodOperationObj.status == "ToDelete" || activePodOperationObj.status == "Deleting" || activePodOperationObj.status == "DeleteNodeFailed" ||activePodOperationObj.status == "Active" ){

                        $scope.activeOperationObject.operation = "Delete Node in progress";
                    }
                    else if(activePodOperationObj.status == "ToReplace" || activePodOperationObj.status == "Replacing" || activePodOperationObj.status == "ReplaceNodeFailed" ||activePodOperationObj.status == "Active" || activePodOperationObj.status == "Running"){

                        $scope.activeOperationObject.operation = "Replace Node in progress";
                    }
                    else if(SystemUpdateData.update_status == "ToUpdate" || SystemUpdateData.update_status == "UpdateRunning" || SystemUpdateData.update_status == "ToCommit" || SystemUpdateData.update_status == "CommitRunning" || SystemUpdateData.update_status == "ToRollback" ||
                        SystemUpdateData.update_status == "RollbackRunning" || SystemUpdateData.update_status == "AutoRollbackRunning" || SystemUpdateData.update_status == "BootstrapAutoRollback"){
                        $scope.activeOperationObject.operation = "System Update Running";
                    }

                };

                $scope.checkPodOperationStatus();
                $scope.$on(Events.PODMGMTACTIVITY,function(){
                    $scope.checkPodOperationStatus();
                });

                UpdateMonitoring.startPollingforStatus();

                $scope.$watch(function(){
                    return SystemUpdateData.update_status;
                },function(){
                    $scope.checkPodOperationStatus();
                });

                $scope.setCSSClassToStatus = function(status){
                    var ispodoperationfailed = ($scope.activeOperationObject.podObject.status ==  "AddNodeFailed" || $scope.activeOperationObject.podObject.status == "AddNodePreFailed" || $scope.activeOperationObject.podObject.status == "DeleteNodeFailed" || $scope.activeOperationObject.podObject.status == "ReplaceNodeFailed")?true:false;
                    var  isUpdateFaled = (SystemUpdateData.update_status == "UpdateFailed" || SystemUpdateData.update_status == "CommitFailed" || SystemUpdateData.update_status == "RollbackFailed" || SystemUpdateData.update_status == "AutoRollbackFailed") ? true:false;
                    var isUpdateRunning = (SystemUpdateData.update_status == "ToUpdate" || SystemUpdateData.update_status == "UpdateRunning" || SystemUpdateData.update_status == "ToCommit" || SystemUpdateData.update_status == "CommitRunning" || SystemUpdateData.update_status == "ToRollback" ||
                        SystemUpdateData.update_status == "RollbackRunning" || SystemUpdateData.update_status == "AutoRollbackRunning" || SystemUpdateData.update_status == "BootstrapAutoRollback")?true:false;
                    if(status == 'ACTIVE' && (ispodoperationfailed || isUpdateFaled)){
                        return "label label-warning";
                    }else if(status == 'ACTIVE' && ($scope.isActiveOperation || isUpdateRunning)){
                        return "label label-info";
                    }else{
                        return "label "+status;
                    }
                };

                $scope.getTooltipText = function(status){
                    var ispodoperationfailed = ($scope.activeOperationObject.podObject.status ==  "AddNodeFailed" || $scope.activeOperationObject.podObject.status == "AddNodePreFailed" || $scope.activeOperationObject.podObject.status == "DeleteNodeFailed" || $scope.activeOperationObject.podObject.status == "ReplaceNodeFailed")?true:false;
                    var  isUpdateFaled = (SystemUpdateData.update_status == "UpdateFailed" || SystemUpdateData.update_status == "CommitFailed" || SystemUpdateData.update_status == "RollbackFailed" || SystemUpdateData.update_status == "AutoRollbackFailed") ? true:false;
                    var isUpdateRunning = (SystemUpdateData.update_status == "ToUpdate" || SystemUpdateData.update_status == "UpdateRunning" || SystemUpdateData.update_status == "ToCommit" || SystemUpdateData.update_status == "CommitRunning" || SystemUpdateData.update_status == "ToRollback" ||
                    SystemUpdateData.update_status == "RollbackRunning" || SystemUpdateData.update_status == "AutoRollbackRunning" || SystemUpdateData.update_status == "BootstrapAutoRollback")?true:false;
                    if(status == 'ACTIVE' && ispodoperationfailed){
                        return $scope.activeOperationObject.podObject.status;

                    }else if(status == 'ACTIVE' && $scope.isActiveOperation){
                        return $scope.activeOperationObject.operation;
                    }else if(status == 'ACTIVE' && isUpdateFaled) {
                        return SystemUpdateData.update_status;
                    }else if(status == 'ACTIVE' && isUpdateRunning){
                        return SystemUpdateData.update_status;
                    }else{
                        return status;
                    }
                };

                $scope.gridOptionsForblueprintmanagement = {
                    columnDefs: [{
                        field: 'BlueprintName',
                        cellTemplate: '<div class="grid-tooltip" title="{{ row.entity.BlueprintName }}" tooltip-placement="right"><div class="ui-grid-cell-contents">{{ row.entity.BlueprintName }}</div></div>',
                        name: 'Blueprint Title',
                        enableColumnResizing: false
                    }, {
                        field: 'modifyDate',
                        cellTemplate: '<div class="grid-tooltip" title="{{ row.entity.modifyDate }}" tooltip-placement="right"><div class="ui-grid-cell-contents">{{ row.entity.modifyDate }}</div></div>',
                        name: 'Modified Date'
                    }, {
                        field: 'status',
                        cellTemplate: '<div class="grid-tooltip" title="{{grid.appScope.getTooltipText(row.entity.status)}}" tooltip-placement="right"><div class="ui-grid-cell-contents"><span ng-class="grid.appScope.setCSSClassToStatus(row.entity.status)">{{ row.entity.status }}</span></div></div>',
                        name: 'Status',
                        width: 150
                    }, {
                        name: 'Action',
                        cellTemplate: '<button type="button" class="btn btn-md customcolorwhite setpaddingright" title= "Edit" value="edit" ng-click="grid.appScope.editblueprintManagementName(grid, row)" ng-disabled="grid.appScope.checkIfActive(grid, row)"><span class="glyphicon glyphicon-pencil"></span></button> <button type="button" class="btn customcolorwhite btn-md " ng-click="grid.appScope.deleteEachManagementData(grid, row)" ng-disabled="grid.appScope.checkIfActiveDelete(grid, row)" title="Delete" value="edit" title="Delete"><span class="glyphicon glyphicon-remove"></span> </button> <button type="button" class="btn customcolorwhite btn-md"  ttitle="Preview & Download YAML" value="edit" ng-click="grid.appScope.showYAMLpopup(row,grid)"  title="Preview & Download YAML"  name = "info" data-content=""><span class="glyphicon glyphicon-download-alt"></span></button> </td>',
                        width: 150,
                        enableSorting: false,
                        enableColumnResizing: false
                    }],
                    enableGridMenu: false,
                    enableSelectAll: true,
                    enableHorizontalScrollbar: 0,
                    onRegisterApi: function (gridApi) {
                        $scope.gridApi = gridApi;
                        gridApi.selection.on.rowSelectionChanged($scope, function (rows) {
                            $scope.SelectionsrowforMANAGEMENT = gridApi.selection.getSelectedRows();

                        });

                        gridApi.selection.on.rowSelectionChangedBatch($scope, function (rows) {
                            $scope.SelectionsrowforMANAGEMENT = gridApi.selection.getSelectedRows();
                        });
                    }
                };

                $scope.reverseSort = true;
                var modification_date;
                var modification_hours;
                var modification_minutes;
                var modification_ampm;
                $scope.isVisible = false;
                var modification_formattedTime;
                var modification_strTime;
                $scope.changeTitleforKillbutton = 'Kill';
                $scope.confirmPopupmodal = false;
                $scope.confirmPopupmodalforyaml = false;
                $scope.successPopupmodal = false;
                $scope.errorPopupmodal = false;
                $scope.changeTitleforKillbuttons = 'Kill';

                $scope.onProceed = function () {
                    $scope.isVisible = false;
                    $scope.performTaskWaitaingForConfirmation();
                };
                $scope.onCancel = function () {
                    $scope.isVisible = false;
                    $scope.actionsTobeTakenToRevert();
                };
                $scope.$on('deploymentStatusChanged', function () {
                    $scope.updateMgmtDataStatus();
                });

                $scope.selectionforDelete = [];
                $scope.managementData = [];
                BlueprintManagementFactory.listBlueprints(function (data) {
                    $scope.managementData = [];
                    $scope.prepareRespose(data.setupdatas);
                    $scope.updateMgmtDataStatus();
                });

                $scope.refreshGrid = function ($scope) {

                };


                $scope.updateMgmtDataStatus = function () {
                    $scope.jobId = DeploymentMonitoringService.getDeploymentJobID();
                    $scope.statusChangeId = DeploymentMonitoringService.getDeployedBlueprint().id;
                    $scope.currentRunningDeployment = DeploymentMonitoringService.getDeployedBlueprint().name;
                    $scope.currentchangeStatus = DeploymentMonitoringService.getDeploymentCurrentStatus();


                    for (var i in $scope.managementData) {
                        if ($scope.managementData[i].uuid === $scope.statusChangeId) {
                            $scope.managementData[i].status = $scope.currentchangeStatus;
                        } else {
                            $scope.managementData[i].status = "INACTIVE";
                        }
                    }
                };

                $scope.prepareRespose = function (data) {
                    if (data.length == 0) {
                        $scope.gridOptionsForblueprintmanagement.data = [];
                    }
                    for (var i in data) {
                        var scopeStatus = "INACTIVE";
                        var managementmetaDataUUID = data[i].uuid;
                        var managementBlueprintName = data[i].name;
                        var createDate = JSON.parse(data[i].meta).CreationDate;
                        var modifyDate = JSON.parse(data[i].meta).ModifiedOn;
                        var gmtDate = modifyDate != "" ? modifyDate : createDate;
                        var changegmt = new Date(gmtDate);
                        var displayDate = changegmt.toLocaleString();
                        $scope.managementData.push({
                            'BlueprintName': managementBlueprintName,
                            'uuid': managementmetaDataUUID,
                            'modifyDate': displayDate,
                            'status': scopeStatus
                        });
                        $scope.gridOptionsForblueprintmanagement.data = $scope.managementData;
                    }
                    $rootScope.$broadcast('rolling', {
                        status: 'end'
                    });
                };

                $scope.refreshData = function () {
                    if ($filter('filter')($scope.managementData, $scope.searchText, undefined).length == 0) {
                        $scope.isDatafound = true;
                        $scope.gridOptionsForblueprintmanagement.data = $filter('filter')($scope.managementData, $scope.searchText, undefined);
                    } else {
                        $scope.isDatafound = false;
                        $scope.gridOptionsForblueprintmanagement.data = $filter('filter')($scope.managementData, $scope.searchText, undefined);
                    }

                };

                $scope.addRecordToTable = function (response) {
                    var responseObj = JSON.parse(response.data);
                    $scope.managementData.push({
                        'BlueprintName': responseObj.metadata.BlueprintName,
                        'CreationDate': responseObj.metadata.CreationDate,
                        'Status': responseObj.metadata.Status,
                        'uuid': $scope.uuid,
                        'type': responseObj.metadata.Platform,
                        'filter': responseObj.metadata.TenantNetwork,
                        'setupData': responseObj.setupdata
                    });
                },
                    $scope.deleteSelectedBlueprintFromTable = function () {
                        var selectedRecords = $scope.SelectionsrowforMANAGEMENT;
                        var deletionCnt = 0;
                        for (var i in selectedRecords) {

                            BlueprintManagementFactory.deleteSelectedBlueprint(selectedRecords[i].uuid, function () {

                                deletionCnt++;

                                var msg = deletionCnt + " out of " + selectedRecords.length + " deleted successfully.";
                                $rootScope.$broadcast("ShowErrorMessage", {
                                    type: 'success',
                                    msg: msg,
                                    disableAutoClose: false
                                });
                                if (deletionCnt == selectedRecords.length) {

                                    BlueprintManagementFactory.listBlueprints(function (data) {
                                        $scope.managementData = [];
                                        $scope.prepareRespose(data.setupdatas);
                                        $scope.updateMgmtDataStatus();
                                    });
                                }
                            }),
                                function () {


                                };
                        }
                    };

                $scope.deleteBlueprintManagement = function () {
                    $scope.popupText = "Are you sure you want to delete selected Blueprints ?";
                    $scope.isVisible = true;
                    $scope.performTaskWaitaingForConfirmation = $scope.deleteSelectedBlueprintFromTable;

                };

                $scope.offlineValidation = function (offlinevalidationObj) {

                    BlueprintManagementFactory.fetchSetupDataForParticularUUID(offlinevalidationObj.uuid, $scope.offlineValSuccessCallback, $scope.offlineValFailureCallback);
                };
                $scope.offlineValSuccessCallback = function (response) {

                    var finalDataforVal = '{"jsondata":' + response.data.jsondata + "}";
                    BlueprintManagementFactory.offlineValidation(finalDataforVal, $scope.validationSuccess, $scope.validationFail);
                };

                $scope.validationSuccess = function (response) {
                    $scope.jsonDataOfflineValidation = JSON.parse(response.data.jsondata);
                    $scope.jsonOBJOfflineValidation = response.data.status;
                    $scope.validationStatus = response.data.validationstatus;
                    if ($scope.validationStatus == '') {
                        $scope.statusofflineval = 'Running ..... ';
                    } else {
                        $scope.statusofflineval = 'Completed'
                    }

                    if ($scope.jsonOBJOfflineValidation == 'NotValidated') {
                        $scope.colorCode = 'label-warning';
                    } else {
                        $scope.colorCode = 'label-success'
                    }
                    $scope.confirmPopupmodalforvalidation = true;
                }

                $scope.validationFail = function (response) {

                }

                $scope.deleteEachManagementData = function (row, blueprintObj) {
                    $scope.singleDeleteDataforManagement = blueprintObj.entity;
                    $scope.confirmPopupmodal = true;
                    $scope.modalTitle = "delete";
                    $scope.nameofBlueprint = blueprintObj.entity.BlueprintName;
                    $scope.modalText = "Do you want to delete Blueprint '" + $scope.nameofBlueprint + "' ?";
                },
                    $scope.showYAMLpopup = function (blueprintObj, row) {
                        $scope.singleObjDataforManagement = blueprintObj.entity;
                        $scope.yamalname = $scope.singleObjDataforManagement.BlueprintName;
                        $scope.yamlUUID = $scope.singleObjDataforManagement.uuid;
                        BlueprintManagementFactory.fetchSetupDataForParticularUUID($scope.yamlUUID, $scope.yamalSuccessCallback, $scope.yamalFailureCallback);
                    },
                    $scope.yamalSuccessCallback = function (response) {
                        $scope.downloadjson = JSON.stringify(response.data.jsondata)
                        $scope.jsonOBJ = jsyaml.dump(JSON.parse(response.data.jsondata), {});

                        $scope.confirmPopupmodalforyaml = true;
                    },
                    $scope.yamalFailureCallback = function (response) {

                    },
                    $scope.checkAll = function () {
                        if ($scope.selectedAll) {
                            $scope.selectedAll = true;
                        } else {
                            $scope.selectedAll = false;
                        }

                        angular.forEach($scope.managementData, function (managementlist) {
                            managementlist.selected = $scope.selectedAll;
                        });
                    }

                $scope.editblueprintManagementName = function (row, blueprintObj) {

                    // $scope.editDataforManagement = $scope.managementData[index];
                    editObjService.set(null, blueprintObj.entity.uuid);
                    $rootScope.$broadcast("EditClicked");
                    window.location = '#/blueprintsetup';

                };


                $scope.getSelected = function () {
                    var selectedElem = [];
                    for (var i in $scope.SelectionsrowforMANAGEMENT) {
                        $scope.blueprintnamefordeploy = $scope.SelectionsrowforMANAGEMENT[i].BlueprintName;
                        $scope.statusInactive = $scope.SelectionsrowforMANAGEMENT[i].status;
                        if ($scope.statusInactive == 'ACTIVE') {
                            $scope.changeTitleforKillbuttons = 'Remove';
                        } else {
                            $scope.changeTitleforKillbuttons = 'Kill';
                        }
                        selectedElem.push($scope.SelectionsrowforMANAGEMENT[i]);
                    }

                    return selectedElem;
                };

                $scope.enabledisableDeploy = function () {

                    var selectedArr = $scope.getSelected();
                    $scope.topologystatusArray = [];

                    if (selectedArr.length > 0) {
                        $scope.topologystatusArray = selectedArr[0].status;
                        if ((selectedArr.length == 0 || selectedArr.length > 1) || ($scope.topologystatusArray == 'INPROGRESS') || ($scope.topologystatusArray == 'ACTIVE') || ($scope.topologystatusArray == 'FAILED')) {
                            return true;
                        }
                    } else {
                        return true;
                    }
                }
                $scope.enabledisableTopology = function () {
                    var selectedArr = $scope.getSelected();
                    if (selectedArr.length == 0 || selectedArr.length > 1) {
                        return true;
                    }
                }
                $scope.enabledisableKill = function () {
                    var selectedArr = $scope.getSelected();
                    var topologystatusArray = [];
                    topologystatusArray = $scope.statusInactive;
                    if ((selectedArr.length == 0 || selectedArr.length > 1) || (topologystatusArray == 'INACTIVE')) {
                        return true;
                    }
                }
                $scope.deployeStages;

                $scope.deployservice = function () {

                    var deployFilterfun = $scope.enabledisableDeploy();

                    if (deployFilterfun != true) {
                        $scope.confirmPopupmodal = true;

                        if ($scope.currentchangeStatus == 'FAILED') {
                            $scope.modalTitle = "redeploy";
                            $scope.DeployTitle = $scope.getSelected()[0].BlueprintName;
                            $scope.modalText = "Do you want to Deploy the '" + $scope.DeployTitle + "' Blueprint?";
                            $scope.uuidfordeploy = $scope.getSelected()[0].uuid;
                            $scope.deployeStages = {
                                'setupdata': $scope.uuidfordeploy,
                                'stages': ["validation", 'bootstrap', 'runtimevalidation', "baremetal", "hostsetup", "ceph", "orchestration", "vmtp"]
                            };
                        } else if (($scope.currentchangeStatus == 'INPROGRESS') || ($scope.currentchangeStatus == 'ACTIVE')) {
                            $scope.modalTitle = "Deploy";
                            $scope.DeployTitle = $scope.getSelected()[0].BlueprintName;
                            $scope.modalText = "Do you want to Kill the previous '" + $scope.currentRunningDeployment + "' Deployment and continue with the current '" + $scope.DeployTitle + "' Deployment?";
                            $scope.uuidfordeploy = $scope.getSelected()[0].uuid;
                            $scope.deployeStages = {
                                'setupdata': $scope.uuidfordeploy,
                                'stages': ["validation", 'bootstrap', 'runtimevalidation', "baremetal", "hostsetup", "ceph", "orchestration", "vmtp"]
                            };

                        } else {
                            $scope.modalTitle = "deploy";
                            $scope.DeployTitle = $scope.getSelected()[0].BlueprintName;
                            $scope.modalText = "Do you want to Deploy the '" + $scope.DeployTitle + "' Blueprint?";
                            $scope.uuidfordeploy = $scope.getSelected()[0].uuid;
                            $scope.deployeStages = {
                                'setupdata': $scope.uuidfordeploy,
                                'stages': ["validation", 'bootstrap', 'runtimevalidation', "baremetal", "hostsetup", "ceph", "orchestration", "vmtp"]
                            };
                        }


                    }
                }

                $scope.killProcess = function () {
                    var deployFilterfun = $scope.enabledisableKill();
                    if (deployFilterfun != true) {
                        $scope.confirmPopupmodal = true;
                        $scope.DeployTitle = $scope.getSelected()[0].BlueprintName;
                        var kill = "kill";
                        $scope.modalTitle = "killprocess";
                        if ($scope.getSelected()[0].status == 'ACTIVE') {
                            $scope.modalText = "Do you want to remove the '" + $scope.DeployTitle + "' ?";
                        } else {
                            $scope.modalText = "Do you want to " + kill + " the '" + $scope.DeployTitle + "' ?";
                        }
                    }
                }

                //                $scope.checkForMessageService = function () {
                //                    var msgConfig = MessageBoxservice.getMessage();
                //                    return msgConfig.isVisible;
                //                }

                $scope.reddirectToTopology = function () {
                    var selectedBlueprint = $scope.getSelected();
                    if (selectedBlueprint.length != 1) {
                        $rootScope.$broadcast("ShowErrorMessage", {
                            type: 'danger',
                            msg: 'Please Select exactly one Blueprint to See the Topology',
                            disableAutoClose: false
                        });
                    } else {
                        editObjService.set(null, selectedBlueprint[0].uuid);
                        window.location = '#/topology/' + selectedBlueprint[0].uuid;
                    }
                }

                $scope.checkIfActive = function (index, mgmntlist) {
                    if (mgmntlist.entity.status != "INACTIVE")
                        return true;
                    else
                        return false;

                }

                $scope.checkIfActiveDelete = function (index, mgmntlist) {
                    if (mgmntlist.entity.status != "INACTIVE")
                        return true;
                    else
                        return false;

                }

                $scope.checkStatus = function () {
                    var selectedArray = $scope.SelectionsrowforMANAGEMENT;
                    if (typeof(selectedArray) == 'undefined') {
                        return true;
                    } else if (selectedArray.length == 0) {
                        return true;
                    } else {
                        for (var i in selectedArray) {
                            if (selectedArray[i].status != "INACTIVE") {
                                return true;
                                break;
                            }
                        }
                        return false;
                    }
                };
            }
        ])
        .directive('confirmPopup', function (BlueprintManagementFactory) {
            return {
                restrict: 'EA',
                replace: true,
                template: '<div>' +
                '  <div class="modal fade" id="confirmPopup" role = "dialog" aria-labelledby = "myModalLabel" aria-hidden = "true" data-keyboard="false" data-backdrop="static"> ' +
                '    <div class = "modal-dialog" > ' +
                '      <form name = "form" ng - submit = "submit()" > ' +
                '        <div class = "modal-content" > ' +
                '          <div class="modal-header">' +
                '            <h4 class="modal-title">Confirm</h4>' +
                '          </div>' +
                '          <div class="modal-body">' +
                '          {{modalText}}  ' +
                '          </div>' +
                '          <div class="modal-footer removetopborder">' +
                ' <button type="button" class="btn btn-primary btn-sm" ng-click="deleteuuid(modalTitle)">Proceed</button>' +
                ' <button type="button" class="btn btn-primary btn-sm" data-dismiss="modal" ng-click="cancel()">Cancel</button>' +
                '          </div>   ' +
                '        </div > ' +
                '      </form>' +
                '    </div > ' +
                '  </div>' +
                '</div > ',
                controller: function ($scope, $rootScope) {

                    $scope.submit = function () {
                        $("#confirmPopup").modal('hide');
                    };

                    $scope.cancel = function () {
                        $scope.confirmPopupmodal = false;
                    }

                    $scope.deleteuuid = function (text) {
                        $scope.confirmPopupmodal = false;
                        if (text == 'delete') {
                            BlueprintManagementFactory.deleteSelectedBlueprint($scope.singleDeleteDataforManagement.uuid, $scope.deleteSuccessCallback, $scope.deleteFailureCallback);
                        } else if (text == 'deploy') {
                            $rootScope.$broadcast('rolling', {
                                status: 'start'
                            });
                            BlueprintManagementFactory.deploySelectedBlueprint($scope.deployeStages, $scope.deploySuccessCallback, $scope.deployFailureCallback);
                        } else if (text == 'killprocess') {
                            $rootScope.$broadcast('rolling', {
                                status: 'start'
                            });
                            BlueprintManagementFactory.killDeployForSelectedBlueprint($scope.jobId, $scope.killSuccessCallback, $scope.killFailureCallback)
                        } else if (text == 'Deploy') {
                            $rootScope.$broadcast('rolling', {
                                status: 'start'
                            });
                            BlueprintManagementFactory.killDeployForSelectedBlueprint($scope.jobId, $scope.redeploySuccessCallback, $scope.redeployFailureCallback)
                        } else if (text == 'redeploy') {
                            $rootScope.$broadcast('rolling', {
                                status: 'start'
                            });
                            BlueprintManagementFactory.killDeployForSelectedBlueprint($scope.jobId, $scope.redeployFailedSuccessCallback, $scope.redeployFailedFailureCallback)
                        }
                        $("#confirmPopup").modal('hide');
                    };
                    $scope.redeploySuccessCallback = function (response) {
                        $rootScope.$broadcast("ShowErrorMessage", {
                            type: 'success',
                            msg: 'Previous Blueprint configuration killed successfully',
                            disableAutoClose: false
                        });

                        $rootScope.$broadcast('newSetupDeployed');
                        BlueprintManagementFactory.deploySelectedBlueprint($scope.deployeStages, $scope.deploySuccessCallback, $scope.deployFailureCallback);

                    }

                    $scope.redeployFailureCallback = function (response) {
                        $rootScope.$broadcast("ShowErrorMessage", {
                            type: 'danger',
                            msg: response.data.faultstring,
                            disableAutoClose: false
                        });

                        BlueprintManagementFactory.listBlueprints(function (data) {
                            $scope.managementData = [];
                            $scope.prepareRespose(data.setupdatas);
                            $scope.updateMgmtDataStatus();
                        });
                    }

                    $scope.redeployFailedSuccessCallback = function (response) {

                        $rootScope.$broadcast('newSetupDeployed');
                        BlueprintManagementFactory.deploySelectedBlueprint($scope.deployeStages, $scope.deploySuccessCallback, $scope.deployFailureCallback);

                    }

                    $scope.redeployFailedFailureCallback = function (response) {
                        $rootScope.$broadcast("ShowErrorMessage", {
                            type: 'danger',
                            msg: response.data.faultstring,
                            disableAutoClose: false
                        });

                        BlueprintManagementFactory.listBlueprints(function (data) {
                            $scope.managementData = [];
                            $scope.prepareRespose(data.setupdatas);
                            $scope.updateMgmtDataStatus();
                        });
                    }


                    $scope.deleteSuccessCallback = function (response) {
                        $rootScope.$broadcast("ShowErrorMessage", {
                            type: 'success',
                            msg: 'Blueprint configuration deleted successfully',
                            disableAutoClose: false
                        });
                        BlueprintManagementFactory.listBlueprints(function (data) {
                            $scope.managementData = [];
                            $scope.prepareRespose(data.setupdatas);
                            $scope.updateMgmtDataStatus();
                        });

                    }

                    $scope.deleteFailureCallback = function (response) {
                        $rootScope.$broadcast("ShowErrorMessage", {
                            type: 'danger',
                            msg: response.data.faultstring,
                            disableAutoClose: false
                        });
                    }

                    $scope.deploySuccessCallback = function (response) {
                        $rootScope.$broadcast("ShowErrorMessage", {
                            type: 'success',
                            msg: 'Blueprint Deployment Started...',
                            disableAutoClose: false
                        });
                        $rootScope.$broadcast('rolling', {
                            status: 'end'
                        });
                        $rootScope.$broadcast('newSetupDeployed');
                    }

                    $scope.deployFailureCallback = function (response) {
                        $rootScope.$broadcast("ShowErrorMessage", {
                            type: 'danger',
                            msg: response.data.faultstring,
                            disableAutoClose: false
                        });
                        $rootScope.$broadcast('rolling', {
                            status: 'end'
                        });
                    }

                    $scope.killSuccessCallback = function (response) {
                        $rootScope.$broadcast("ShowErrorMessage", {
                            type: 'success',
                            msg: 'Blueprint configuration killed successfully',
                            disableAutoClose: false
                        });
                        $rootScope.$broadcast('rolling', {
                            status: 'end'
                        });
                        //  $scope.changeTitleforKillbutton = 'Kill';
                        $scope.topologystatusArray = 'INACTIVE';
                        $rootScope.$broadcast('newSetupDeployed');
                    }

                    $scope.killFailureCallback = function (response) {
                        $rootScope.$broadcast("ShowErrorMessage", {
                            type: 'danger',
                            msg: response.data.faultstring,
                            disableAutoClose: false
                        });
                        $rootScope.$broadcast('rolling', {
                            status: 'end'
                        });
                    }

                    $scope.$watch('confirmPopupmodal', function () {
                        if ($scope.confirmPopupmodal) {
                            $("#confirmPopup").modal('show');
                        }

                    });
                },
                link: function (scope, el, attrs) {
                    scope.titleforConfirm = attrs.popoverHtml;

                }
            };
        })

        .directive('showYaml', function (BlueprintManagementFactory) {
            return {
                restrict: 'EA',
                replace: true,
                template: '<div>' +
                '  <div class="modal fade fixedheight" id="confirmPopupYaml" role = "dialog" aria-labelledby = "myModalLabel" aria-hidden = "true" data-keyboard="false" data-backdrop="static"> ' +
                '    <div class = "modal-dialog modal-lg" > ' +
                '      <form name = "form" ng - submit = "submit()" > ' +
                '        <div class = "modal-content" > ' +
                ' <div class="modal-header">'+
                ' <h4 class="modal-title">{{yamalname}}</h4>'+
                ' </div>'+
                '          <div class="modal-body">' +
                '            <h4><button type="button" class="close" data-dismiss="modal" aria-label="Close" ng-click="cancel2()"></button> <textarea class="form-control" style="height:500px" rows="5" id="textareaheight" readonly>{{jsonOBJ}}  </textarea></h4> ' +
                '          </div>' +
                '          <div class="modal-footer removetopborder">' +
                ' <button type="button" class="btn btn-primary btn-sm" title="Download YAML file"> <a href=data:text/yaml;charset=utf-8,{{encodeJson(jsonOBJ)}} download="{{yamalname}}.yaml" title="Download YAML file" class="downloadyamal">Download</a></button>' +
                ' <button type="button" class="btn btn-primary btn-sm" ng-click="cancel2()">Close</button>' +
                '          </div>   ' +
                '        </div > ' +
                '      </form>' +
                '    </div > ' +
                '  </div>' +
                '</div > ',
                controller: function ($scope, $rootScope) {

                    $scope.submit = function () {

                    };

                    $scope.cancel2 = function () {
                        $("#confirmPopupYaml").modal('hide');
                        $scope.confirmPopupmodalforyaml = false;
                    };



                    $scope.$watch('confirmPopupmodalforyaml', function () {
                        if ($scope.confirmPopupmodalforyaml) {
                            $("#confirmPopupYaml").modal('show');
                        }

                    });

                },
                link: function (scope, el, attrs) {
                    scope.titleforConfirm = attrs.popoverHtml;


                    scope.encodeJson = function(data){
                        return  encodeURIComponent(data);//YAML.stringify(data);
                    };

                }
            };
        })


}());