/**
 * 
 */
(function() {
    'use strict';
    angular.module('mercuryInstaller.podManagement', ['mercuryInstaller.widgets', 'mercuryInstaller.utility','mercuryInstaller.globals'])
        .config(['$routeProvider', function($routeProvider) {
            $routeProvider
                .when('/podanagement', {
                    templateUrl: '../static/podmanagement/podmanagement.html'
                })
        }])
        .controller('PodManagementCtrl', ['$scope', 'DeploymentMonitoringService', 'BlueprintManagementFactory', 'PodManagementService', 'BlueprintCreationService', '$rootScope', 'PodsPolling','validateinputs','DeploymentMonitoringService','Events','UpdateMonitoring','SystemUpdateData', function($scope, DeploymentMonitoringService, BlueprintManagementFactory, PodManagementService, BlueprintCreationService, $rootScope, PodsPolling,validateinputs,DMS,Events,UpdateMonitoring,SystemUpdateData) {
            $scope.allNodesArray = [];
            $scope.controlServerArray = [];
            $scope.computeServerArray = [];
            $scope.storageServerArray = [];

            $scope.isVisible = false;
            $scope.isAnyPodOperationFailed = false;
            $scope.removeStorageFailed = false;
            $scope.removeComputeFailed = false;

            $scope.onProceed = function() {
                $scope.isVisible = false;
                $scope.performTaskWaitaingForConfirmation();
            };
            $scope.onCancel = function () {
                $scope.isVisible = false;
                $scope.actionsTobeTakenToRevert = function(){

                };
            };
            $scope.$watch(function() {
                $scope.storageServerArray;
            }, function() {
                if ($scope.storageServerArray.length == 0) {
                    $scope.cephMode = "Central";
                } else {
                    $scope.cephMode = "Dedicated";
                }
            });

            $scope.isActiveOperation = false;

            $scope.checkNodeStatus = function(){
                var activePodOperationObj = DMS.getOnGoingPodOperationDetails();
                if(activePodOperationObj.status == "ToAdd" || activePodOperationObj.status == "Adding" || activePodOperationObj.status == "ToDelete" || activePodOperationObj.status == "Deleting" || activePodOperationObj.status == "ToReplace" || activePodOperationObj.status == "Replacing" || activePodOperationObj.status == "Running"){
                    $scope.isActiveOperation = true;
                }else{
                    $scope.isActiveOperation = false;
                }
                if(activePodOperationObj.status == "AddNodeFailed" || activePodOperationObj.status == "AddNodePreFailed" || activePodOperationObj.status == "DeleteNodeFailed" || activePodOperationObj.status == "ReplaceNodeFailed"){

                    $scope.isAnyPodOperationFailed = true;
                    if(activePodOperationObj.mtype == "compute" &&  activePodOperationObj.status == "DeleteNodeFailed"){
                        $scope.removeComputeFailed = true;
                        $scope.removeStorageFailed = false;
                    }else if(activePodOperationObj.mtype == "block_storage" &&  activePodOperationObj.status == "DeleteNodeFailed"){
                        $scope.removeStorageFailed = true;
                        $scope.removeComputeFailed = false;
                    }else{
                        $scope.removeStorageFailed = false;
                        $scope.removeComputeFailed = false;
                    }
                    switch(activePodOperationObj.status){
                        case "AddNodeFailed":
                        case "AddNodePreFailed":
                            $scope.warningText = "Last Add Node Operation failed, so all other Pod operations are disabled. To proceed with other operations first delete failed node.";
                            break;
                        case "DeleteNodeFailed":
                            $scope.removeNodeObject = activePodOperationObj;
                            $scope.warningText = "Last Delete Node Operation failed, so all other Pod operations are disabled. To proceed with other operations first forcefully delete failed node.";
                            break;
                        case "ReplaceNodeFailed":
                            $scope.warningText = "Last Replace Node Operation failed, so all other Pod operations are disabled. To proceed with other operations retry Replace node again.";
                            break;
                    }
                    $("#warningModal").modal("show");

                }
            };

            DMS.startCheckingForPODOperation();
            $scope.checkNodeStatus();
            $rootScope.$on(Events.PODMGMTACTIVITY,function(){
                $scope.checkNodeStatus();
            });

            UpdateMonitoring.startPollingforStatus();
            $scope.$watch(function(){
                return SystemUpdateData.update_status;
            },function(){
                if( SystemUpdateData.update_status == "ToUpdate" || SystemUpdateData.update_status == "UpdateRunning" || SystemUpdateData.update_status == "ToCommit" || SystemUpdateData.update_status == "CommitRunning" || SystemUpdateData.update_status == "ToRollback" ||
                    SystemUpdateData.update_status == "RollbackRunning" || SystemUpdateData.update_status == "BootstrapAutoRollback" || SystemUpdateData.update_status == "AutoRollbackRunning"){
                    $scope.isActiveOperation = true;
                }
            });

            $scope.$on("$destroy", function() {
                UpdateMonitoring.stopPolling();
            });

            $scope.gridOptionsForControl = {

                enableGridMenu: true,
                enableSelectAll: true,
                enableHorizontalScrollbar: 0,
                onRegisterApi: function(gridApi) {
                    $scope.gridApi = gridApi;

                }
            };

            $scope.gridOptionsForCompute = {

                enableGridMenu: true,
                enableSelectAll: true,
                enableHorizontalScrollbar: 0,
                onRegisterApi: function(gridApi) {
                    $scope.gridApi = gridApi;

                }
            };

            $scope.gridOptionsForBlockStorage = {

                enableGridMenu: true,
                enableSelectAll: true,
                enableHorizontalScrollbar: 0,
                onRegisterApi: function(gridApi) {
                    $scope.gridApi = gridApi;

                }
            };

            $scope.isBSeries = function() {
                if ($scope.deployedBlueprintSetup && $scope.deployedBlueprintSetup.jsondata && $scope.deployedBlueprintSetup.jsondata != "" && JSON.parse($scope.deployedBlueprintSetup.jsondata)['UCSMCOMMON']) {
                    return true;
                } else {
                    return false;
                }

            };

            $scope.isCSeries = function() {
                if ($scope.deployedBlueprintSetup && $scope.deployedBlueprintSetup.jsondata && $scope.deployedBlueprintSetup.jsondata != "" && JSON.parse($scope.deployedBlueprintSetup.jsondata)['CIMC-COMMON']) {
                    return true;
                } else {
                    return false;
                }

            };

            $scope.isCephModeDedicated = function() {
                if ($scope.storageServerArray.length == 0) {
                    $scope.cephMode = "Central";
                    return false;
                } else {
                    $scope.cephMode = "Dedicated";
                    return true;
                }
            };

            $scope.onSuccessOfFetch = function(response) {

            };

            $scope.onFailureOfFetch = function(response) {
                $rootScope.$broadcast("ShowErrorMessage", {
                    type: 'danger',
                    msg: 'Error while fetching data',
                    disableAutoClose: false
                });
            };

            $scope.populateDataInTables = function(data) {
                switch (data.mtype) {
                    case 'control':
                        var node_data = JSON.parse(data.node_data);
                        $scope.controlServerArray.push({
                            name : data.name,
                            rack_id : node_data.rack_info?node_data.rack_info.rack_id:'',
                            cimc_ip : node_data.cimc_info?node_data.cimc_info.cimc_ip:'',
                            cimc_username : node_data.cimc_info?node_data.cimc_info.cimc_username:'',
                            cimc_password:node_data.cimc_info?node_data.cimc_info.cimc_password:'',
                            status:data.status,
                            uuid : data.uuid,
                            boot_drive : node_data.hardware_info?node_data.hardware_info.boot_drive:'',
                            VICSlot : node_data.hardware_info?node_data.hardware_info.VICSlot:'',
                            chassisId : node_data.ucsm_info?node_data.ucsm_info.chassis_id:'',
                            bladeId:node_data.ucsm_info?node_data.ucsm_info.blade_id:'',
                            rackUnitId:node_data.ucsm_info?node_data.ucsm_info['rack-unit_id']:'',
                            install_logs:data.install_logs
                        });
                        break;
                    case 'compute':
                        var node_data = JSON.parse(data.node_data);
                        $scope.computeServerArray.push({
                            name : data.name,
                            rack_id : node_data.rack_info?node_data.rack_info.rack_id:'',
                            cimc_ip : node_data.cimc_info?node_data.cimc_info.cimc_ip:'',
                            cimc_username : node_data.cimc_info?node_data.cimc_info.cimc_username:'',
                            cimc_password:node_data.cimc_info?node_data.cimc_info.cimc_password:'',
                            status:data.status,
                            uuid : data.uuid,
                            boot_drive : node_data.hardware_info?node_data.hardware_info.boot_drive:'',
                            VICSlot : node_data.hardware_info?node_data.hardware_info.VICSlot:'',
                            chassisId : node_data.ucsm_info?node_data.ucsm_info.chassis_id:'',
                            bladeId:node_data.ucsm_info?node_data.ucsm_info.blade_id:'',
                            rackUnitId:node_data.ucsm_info?node_data.ucsm_info['rack-unit_id']:'',
                            install_logs:data.install_logs
                        });
                        break;
                    case 'block_storage':
                        var node_data = JSON.parse(data.node_data);
                        $scope.storageServerArray.push({
                            name : data.name,
                            rack_id : node_data.rack_info?node_data.rack_info.rack_id:'',
                            cimc_ip : node_data.cimc_info?node_data.cimc_info.cimc_ip:'',
                            cimc_username : node_data.cimc_info?node_data.cimc_info.cimc_username:'',
                            cimc_password:node_data.cimc_info?node_data.cimc_info.cimc_password:'',
                            status:data.status,
                            uuid : data.uuid,
                            boot_drive : node_data.hardware_info?node_data.hardware_info.boot_drive:'',
                            VICSlot : node_data.hardware_info?node_data.hardware_info.VICSlot:'',
                            chassisId : node_data.ucsm_info?node_data.ucsm_info.chassis_id:'',
                            bladeId:node_data.ucsm_info?node_data.ucsm_info.blade_id:'',
                            rackUnitId:node_data.ucsm_info?node_data.ucsm_info['rack-unit_id']:'',
                            install_logs:data.install_logs
                        });
                        break;
                }
                if(data.status=="Running" || data.status == "ToReplace" || data.status=="ToAdd" || data.status=="Adding" || data.status=="ToDelete" || data.status =="Deleting"){
                    PodsPolling.startPolling();
                }
                $scope.allNodesArray.push(data);
            };

            $scope.onFailureOfNodeDetails = function(response) {
                $rootScope.$broadcast("ShowErrorMessage", {
                    type: 'danger',
                    msg: 'Error while fetching Node Details',
                    disableAutoClose: false
                });
            };

            $scope.iterateResponseToFetchDetails = function(response) {
                $scope.controlServerArray = [];
                $scope.computeServerArray = [];
                $scope.storageServerArray = [];
                var nodesArray = response.nodes;
                for (var i in nodesArray) {
                    $scope.populateDataInTables(nodesArray[i])
                }
                $scope.gridOptionsForControl.data = $scope.controlServerArray;
                $scope.gridOptionsForBlockStorage.data = $scope.storageServerArray;
                $scope.gridOptionsForCompute.data = $scope.computeServerArray;
            };

            $scope.onSuccessOfGetNodes = function(response) {
                $scope.iterateResponseToFetchDetails(response.data);
            };

            $scope.onFailureOfGetNodes = function() {
                $rootScope.$broadcast("ShowErrorMessage", {
                    type: 'danger',
                    msg: 'Error while getting Node list',
                    disableAutoClose: false
                });
            };

            $scope.onAddNodeSuccess = function() {
                $rootScope.$broadcast("ShowErrorMessage", {
                    type: 'success',
                    msg: 'Node Add is initiated successfully',
                    disableAutoClose: false
                });
                $rootScope.$emit(Events.PODOPERATIONSTARTED);
                PodsPolling.startPolling();
                $("#AddComputePopup").modal("hide");
                $("#AddStoragePopup").modal("hide");
            };

            $scope.onAddNodeFailure = function() {
                $rootScope.$broadcast("ShowErrorMessage", {
                    type: 'danger',
                    msg: 'Error while adding Node',
                    disableAutoClose: false
                });
                $("#AddComputePopup").modal("hide");
                $("#AddStoragePopup").modal("hide");
            };

            $scope.onRemoveNodeSuccess = function() {
                $rootScope.$broadcast("ShowErrorMessage", {
                    type: 'success',
                    msg: 'Node removal is initiated successfully',
                    disableAutoClose: false
                });
                $rootScope.$emit(Events.PODOPERATIONSTARTED);
                PodsPolling.startPolling();
            };

            $scope.onRemoveNodeFailure = function() {
                $rootScope.$broadcast("ShowErrorMessage", {
                    type: 'danger',
                    msg: 'Error while removing Node',
                    disableAutoClose: false
                });
            };

            $scope.onReplaceNodeSuccess = function(response) {
                $rootScope.$broadcast("ShowErrorMessage", {
                    type: 'success',
                    msg: 'Node Replace is initiated',
                    disableAutoClose: false
                });
                $rootScope.$emit(Events.PODOPERATIONSTARTED);
                PodsPolling.startPolling();
            };

            $scope.onReplaceNodeFailure = function(response) {
                $rootScope.$broadcast("ShowErrorMessage", {
                    type: 'danger',
                    msg: 'Error while replacing Node',
                    disableAutoClose: false
                });
            };

            $scope.addCompute = function() {
                PodManagementService.addNode({
                    name: $scope.newComputeObj.name
                }, $scope.onAddNodeSuccess, $scope.onAddNodeFailure);
            };

            $scope.onRemoveComputeFailure = function(){
                $rootScope.$broadcast("ShowErrorMessage", {
                    type: 'danger',
                    msg: 'Error while removing Node',
                    disableAutoClose: false
                });
            };

            $scope.removeCompute = function() {
                PodManagementService.removeNode($scope.currentuuid, $scope.onRemoveNodeSuccess, $scope.onRemoveComputeFailure);
                $scope.currentuuid = null;
                $scope.currentNodeName = "";
            };

            $scope.addStorage = function() {
                PodManagementService.addNode({
                    name: $scope.newStorageObj.name
                }, $scope.onAddNodeSuccess, $scope.onAddNodeFailure);

            };

            $scope.removeStorage = function() {
                PodManagementService.removeNode($scope.currentuuid, $scope.onRemoveNodeSuccess, $scope.onRemoveNodeFailure);
                $scope.currentuuid = null;
                $scope.currentNodeName = "";
            };

            $scope.replaceController = function(controlServer) {
                PodManagementService.replaceController(controlServer.uuid, {
                    name: controlServer.name,
                    status: 'ToReplace'
                }, $scope.onReplaceNodeSuccess, $scope.onReplaceNodeFailure);

            };

            $scope.blueprintUpdateSuccess = function(response) {
                $scope.updateSetupData();
                switch ($scope.currentAction) {
                    case 'Add Compute':
                        $scope.addCompute();
                        break;
                    case 'Remove Compute':
                        $scope.removeCompute();
                        break;
                    case 'Add Storage':
                        $scope.addStorage();
                        break;
                    case 'Remove Storage':
                        $scope.removeStorage();
                        break;
                    case 'Replace Control':
                        $scope.replaceController();
                        break;



                }
            };

            $scope.blueprintUpdateFailure = function(response) {
                $rootScope.$broadcast("ShowErrorMessage", {
                    type: 'danger',
                    msg: 'Error while updating setup data',
                    disableAutoClose: false
                });
            };

            $scope.updateSetupData = function() {
                BlueprintManagementFactory.fetchSetupDataForParticularUUID($scope.blueprintId, function (response) {
                    $scope.deployedBlueprintSetup = response.data;

                }, function () {
                    $rootScope.$broadcast("ShowErrorMessage", {
                        type: 'danger',
                        msg: 'Error while fetching data',
                        disableAutoClose: false
                    });
                });

            };

            $scope.addComputeHandler = function() {
                $scope.$broadcast("KickOffValidationForPopup");
                if($scope.isBSeries()){
                    if($scope.newComputeObj.name == "" || $scope.newComputeObj.rack_id=="" || $scope.newComputeObj.chassis_id == ""|| Number($scope.newComputeObj.chassis_id) < 1|| Number($scope.newComputeObj.chassis_id) > 8 || Number($scope.newComputeObj.blade_id) != "" || Number($scope.newComputeObj.blade_id) < 1 || Number($scope.newComputeObj.blade_id) > 8){
                        return;
                    }
                }else{
                    if($scope.newComputeObj.rack_id=="" || !validateinputs.validateIP($scope.newComputeObj.cimc_ip) || $scope.newComputeObj.name == ""){
                        return;
                    }
                }
                $scope.currentAction = "Add Compute";
                var setupData = JSON.parse($scope.deployedBlueprintSetup.jsondata);
                setupData.SERVERS[$scope.newComputeObj.name] = {};
                if ($scope.isBSeries()) {

                    setupData.SERVERS[$scope.newComputeObj.name].rack_info = {};
                    setupData.SERVERS[$scope.newComputeObj.name].rack_info.rack_id = $scope.newComputeObj.rack_id;
                    setupData.SERVERS[$scope.newComputeObj.name].ucsm_info = {};
                    setupData.SERVERS[$scope.newComputeObj.name].ucsm_info.server_type = 'blade';
                    setupData.SERVERS[$scope.newComputeObj.name].ucsm_info.chassis_id = $scope.newComputeObj.chassis_id;
                    setupData.SERVERS[$scope.newComputeObj.name].ucsm_info.blade_id = $scope.newComputeObj.blade_id;
                } else {
                    setupData.SERVERS[$scope.newComputeObj.name].rack_info = {};
                    setupData.SERVERS[$scope.newComputeObj.name].rack_info.rack_id = $scope.newComputeObj.rack_id;
                    setupData.SERVERS[$scope.newComputeObj.name].cimc_info = {};
                    setupData.SERVERS[$scope.newComputeObj.name].cimc_info.cimc_ip = $scope.newComputeObj.cimc_ip;
                    if ($scope.newComputeObj.cimc_username && $scope.newComputeObj.cimc_username != "") {
                        setupData.SERVERS[$scope.newComputeObj.name].cimc_info.cimc_username = $scope.newComputeObj.cimc_username;
                    }
                    if ($scope.newComputeObj.cimc_password && $scope.newComputeObj.cimc_password != "") {
                        setupData.SERVERS[$scope.newComputeObj.name].cimc_info.cimc_password = $scope.newComputeObj.cimc_password;
                    }

                    if (($scope.newComputeObj.boot_drive != "" && $scope.newComputeObj.boot_drive != undefined) || ($scope.newComputeObj.VICSlot != "" && $scope.newComputeObj.VICSlot != undefined)) {
                        setupData.SERVERS[$scope.newComputeObj.name].hardware_info = {};
                        if ($scope.newComputeObj.VICSlot != "")
                            setupData.SERVERS[$scope.newComputeObj.name].hardware_info.VIC_slot = $scope.newComputeObj.VICSlot;
                        if ($scope.newComputeObj.boot_drive != "")
                            setupData.SERVERS[$scope.newComputeObj.name].hardware_info.boot_drive = $scope.newComputeObj.boot_drive;
                    }
                }


                setupData.ROLES.compute.push($scope.newComputeObj.name);
                //$scope.deployedBlueprintSetup.jsondata = (setupData);
                var inputForRest = {};
                inputForRest.name = $scope.deployedBlueprintSetup.name;
                inputForRest.meta = {
                    BlueprintName: $scope.deployedBlueprintSetupblueprintName,
                    Platform: JSON.parse($scope.deployedBlueprintSetup.meta).Platform,
                    Version: JSON.parse($scope.deployedBlueprintSetup.meta).Version,
                    CreationDate: JSON.parse($scope.deployedBlueprintSetup.meta).CreationDate,

                    TenantNetwork: JSON.parse($scope.deployedBlueprintSetup.meta).TenantNetwork,
                    ModifiedOn: new Date().toGMTString()
                };
                inputForRest.jsondata = setupData;
                inputForRest.uuid = $scope.blueprintId;

                BlueprintCreationService.updateBlueprint($scope.blueprintId, inputForRest, $scope.blueprintUpdateSuccess, $scope.blueprintUpdateFailure);
            };

            $scope.addStorageHandler = function() {
                $scope.$broadcast("KickOffValidationForPopup");
                if($scope.isBSeries()){
                    if($scope.newStorageObj.rack_id=="" || $scope.newStorageObj.rack_unit_id == "" || Number($scope.newStorageObj.rack_unit_id)>96 || Number($scope.newStorageObj.rack_unit_id) <1){
                        return;
                    }
                }else{
                    if($scope.newStorageObj.rack_id=="" || !validateinputs.validateIP($scope.newStorageObj.cimc_ip)){
                        return;
                    }
                }
                $scope.currentAction = "Add Storage";
                var setupData = JSON.parse($scope.deployedBlueprintSetup.jsondata);
                setupData.SERVERS[$scope.newStorageObj.name] = {};
                if ($scope.isBSeries()) {
                    setupData.SERVERS[$scope.newStorageObj.name].rack_info = {};
                    setupData.SERVERS[$scope.newStorageObj.name].rack_info.rack_id = $scope.newStorageObj.rack_id;
                    setupData.SERVERS[$scope.newStorageObj.name].ucsm_info = {};
                    setupData.SERVERS[$scope.newStorageObj.name].ucsm_info.server_type = 'rack';
                    setupData.SERVERS[$scope.newStorageObj.name].ucsm_info['rack-unit_id'] = $scope.newStorageObj.rack_unit_id;
                   /* setupData.SERVERS[$scope.newStorageObj.name].ucsm_info.chassis_id = $scope.newStorageObj.chassis_id;
                    setupData.SERVERS[$scope.newStorageObj.name].ucsm_info.blade_id = $scope.newStorageObj.blade_id;*/
                } else {
                    setupData.SERVERS[$scope.newStorageObj.name].rack_info = {};
                    setupData.SERVERS[$scope.newStorageObj.name].rack_info.rack_id = $scope.newStorageObj.rack_id;
                    setupData.SERVERS[$scope.newStorageObj.name].cimc_info = {};
                    setupData.SERVERS[$scope.newStorageObj.name].cimc_info.cimc_ip = $scope.newStorageObj.cimc_ip;
                    if ($scope.newComputeObj.cimc_username && $scope.newStorageObj.cimc_username != "") {
                        setupData.SERVERS[$scope.newStorageObj.name].cimc_info.cimc_username = $scope.newStorageObj.cimc_username;
                    }
                    if ($scope.newStorageObj.cimc_password && $scope.newStorageObj.cimc_password != "") {
                        setupData.SERVERS[$scope.newStorageObj.name].cimc_info.cimc_password = $scope.newStorageObj.cimc_password;
                    }

                    if (($scope.newStorageObj.boot_drive != "" && $scope.newStorageObj.boot_drive != undefined) || ($scope.newStorageObj.VICSlot != "" && $scope.newStorageObj.VICSlot != undefined)) {
                        setupData.SERVERS[$scope.newStorageObj.name].hardware_info = {};
                        if ($scope.newStorageObj.VICSlot != "")
                            setupData.SERVERS[$scope.newStorageObj.name].hardware_info.VIC_slot = $scope.newStorageObj.VICSlot;
                        if ($scope.newStorageObj.boot_drive != "")
                            setupData.SERVERS[$scope.newStorageObj.name].hardware_info.boot_drive = $scope.newStorageObj.boot_drive;
                    }
                }
                setupData.ROLES.block_storage.push($scope.newStorageObj.name);
                //		$scope.deployedBlueprintSetup.jsondata = {};
                //		$scope.deployedBlueprintSetup.jsondata = JSON.stringify(setupData);
                var inputForRest = {};
                inputForRest.name = $scope.deployedBlueprintSetup.name;
                inputForRest.meta = {
                    BlueprintName: $scope.deployedBlueprintSetupblueprintName,
                    Platform: JSON.parse($scope.deployedBlueprintSetup.meta).Platform,
                    Version: JSON.parse($scope.deployedBlueprintSetup.meta).Version,
                    CreationDate: JSON.parse($scope.deployedBlueprintSetup.meta).CreationDate,

                    TenantNetwork: JSON.parse($scope.deployedBlueprintSetup.meta).TenantNetwork,
                    ModifiedOn: new Date().toGMTString()
                };
                inputForRest.jsondata = setupData;
                inputForRest.uuid = $scope.blueprintId;
                //inputForRest.meta.ModifiedOn = new Date().toGMTString();
                BlueprintCreationService.updateBlueprint($scope.blueprintId, inputForRest, $scope.blueprintUpdateSuccess, $scope.blueprintUpdateFailure);
            };

            $scope.getCountOfActiveBlockStorages = function() {
                var cnt = 0;
                for (var i in $scope.storageServerArray) {
                    if ($scope.storageServerArray[i].status == "Active") {
                        cnt++;
                    }
                }
                return cnt;
            };

            $scope.removeBlockStorage = function(storageObject) {
               /* if ($scope.getCountOfActiveBlockStorages() == 1) {
                    $scope.popupText = "This is the only active Block Storage, and hence It can't be removed.";
                    $scope.isWarningVisible = true;
                } else {*/
                    $scope.currentAction = "Remove Storage";
                    $scope.currentuuid = storageObject.uuid;
                    $scope.currentNodeName = storageObject.name;
                    $scope.isVisible = true;
                    $scope.popupText = "Are you sure you want to Remove the Block Storage Node " + storageObject.name + " ?";
                    $scope.performTaskWaitaingForConfirmation = $scope.proceedForRemovalOfBlockStorage;
                /*}*/

            };

            $scope.proceedForRemovalOfBlockStorage = function() {
                var setupData = JSON.parse($scope.deployedBlueprintSetup.jsondata);
                delete setupData.SERVERS[$scope.currentNodeName];
                setupData.ROLES.block_storage.splice(setupData.ROLES.block_storage.indexOf($scope.currentNodeName), 1);
                var inputForRest = {};
                inputForRest.name = $scope.deployedBlueprintSetup.name;
                inputForRest.meta = {
                    BlueprintName: $scope.deployedBlueprintSetupblueprintName,
                    Platform: JSON.parse($scope.deployedBlueprintSetup.meta).Platform,
                    Version: JSON.parse($scope.deployedBlueprintSetup.meta).Version,
                    CreationDate: JSON.parse($scope.deployedBlueprintSetup.meta).CreationDate,

                    TenantNetwork: JSON.parse($scope.deployedBlueprintSetup.meta).TenantNetwork,
                    ModifiedOn: new Date().toGMTString()
                };
                inputForRest.jsondata = setupData;
                inputForRest.uuid = $scope.blueprintId;
                //inputForRest.meta.ModifiedOn = new Date().toGMTString();
                BlueprintCreationService.updateBlueprint($scope.blueprintId, inputForRest, $scope.blueprintUpdateSuccess, $scope.blueprintUpdateFailure);
            };

            $scope.getCountOfActiveComputes = function() {
                var cnt = 0;
                for (var i in $scope.computeServerArray) {
                    if ($scope.computeServerArray[i].status == "Active") {
                        cnt++;
                    }
                }

                return cnt;
            };

            $scope.removeComputeServer = function(computeObject) {
                /*if ($scope.getCountOfActiveComputes() == 1) {
                    $scope.popupText = "This is the only active Compute Server, and hence It can't be removed.";
                    $scope.isWarningVisible = true;
                } else {*/
                    $scope.currentAction = "Remove Compute";
                    $scope.currentuuid = computeObject.uuid;
                    $scope.currentNodeName = computeObject.name;
                    $scope.isVisible = true;
                    $scope.popupText = "Are you sure you want to Remove the Compute Node " + computeObject.name + " ?";
                    $scope.backupForDeletedCompute = computeObject;
                    $scope.performTaskWaitaingForConfirmation = $scope.proceedForRemovalOfCompute;
               /* }*/

            };

            $scope.proceedForRemovalOfCompute = function() {
                var setupData = JSON.parse($scope.deployedBlueprintSetup.jsondata);
                delete setupData.SERVERS[$scope.currentNodeName];
                //$scope.deployedBlueprintSetup.jsondata = JSON.stringify(setupData);
                setupData.ROLES.compute.splice(setupData.ROLES.compute.indexOf($scope.currentNodeName), 1);
                var inputForRest = {};
                inputForRest.name = $scope.deployedBlueprintSetup.name;
                inputForRest.meta = {
                    BlueprintName: $scope.deployedBlueprintSetupblueprintName,
                    Platform: JSON.parse($scope.deployedBlueprintSetup.meta).Platform,
                    Version: JSON.parse($scope.deployedBlueprintSetup.meta).Version,
                    CreationDate: JSON.parse($scope.deployedBlueprintSetup.meta).CreationDate,

                    TenantNetwork: JSON.parse($scope.deployedBlueprintSetup.meta).TenantNetwork,
                    ModifiedOn: new Date().toGMTString()
                };
                inputForRest.jsondata = setupData;
                inputForRest.uuid = $scope.blueprintId;
                $scope.currentNodeName = "";
                BlueprintCreationService.updateBlueprint($scope.blueprintId, inputForRest, $scope.blueprintUpdateSuccess, $scope.blueprintUpdateFailure);

            };

            $scope.setReplaceNodeObject = function(controlServer) {

                $scope.replaceController(controlServer);
            };

            $scope.replaceHandler = function() {
                $scope.currentAction = "Replace Control";

            };
            $scope.showHideLink = function(obj){
                if(obj.install_logs){
                    return true;
                }else{
                    return false;
                }
            };

            $scope.checkForReplaceNodeCnt = function(){
                if($scope.controlServerArray.length==1){
                    return true;
                }else{
                    var cnt = 0;
                    for(var i in $scope.controlServerArray){
                        if($scope.controlServerArray[i].status == "Active"){
                            cnt++;
                        }

                    }
                    if(cnt==1){
                        return true;
                    }
                }
                return false;

            };





            $scope.checkIfStatusFailed = function(currentObject){
                var status = currentObject.status;
                if(status == "AddNodeFailed" || status == "AddNodePreFailed" || status == "DeleteNodeFailed" || status == "ReplaceNodeFailed"){
                    return true;
                }else{
                    return false;
                }
            };

            $scope.clearFailedNodeData = function(){
                PodManagementService.removeNodeForcefully($scope.removeNodeObject.uuid,$scope.onRemoveNodeSuccess,$scope.onRemoveNodeFailure);
            };
            $scope.$watch(function(){
                return $scope.deployedBlueprintSetup;
            },function(){
                $scope.createUIGrids();
            });


            $scope.createUIGrids = function(){
                if($scope.isBSeries()){
                    $scope.gridOptionsForControl.columnDefs = [{
                        field: 'name',
                        cellTemplate:'<div class="grid-tooltip" title="{{ row.entity.name }}" tooltip-placement="right"><div class="ui-grid-cell-contents">{{ row.entity.name }}</div></div>',
                        displayName: 'Server Name',
                        enableColumnResizing: true
                    }, {
                        field: 'rack_id',
                        cellTemplate:'<div class="grid-tooltip" title="{{ row.entity.rack_id }}" tooltip-placement="right"><div class="ui-grid-cell-contents">{{ row.entity.rack_id }}</div></div>',
                        displayName: 'Rack Id'
                    }, {
                        field:'chassisId',
                        cellTemplate:'<div class="grid-tooltip" title="{{ row.entity.chassisId }}" tooltip-placement="right"><div class="ui-grid-cell-contents">{{row.entity.chassisId}}</div></div>',
                        displayName: 'Chasis Id'
                    },{
                        field: 'bladeId',
                        cellTemplate:'<div class="grid-tooltip" title="{{ row.entity.bladeId }}" tooltip-placement="right"><div class="ui-grid-cell-contents">{{ row.entity.bladeId }}</div></div>',
                        displayName: 'Blade Id'
                    }, {
                        field:'rackUnitId',
                        cellTemplate:'<div class="grid-tooltip" title="{{ row.entity.rackUnitId }}" tooltip-placement="right"><div class="ui-grid-cell-contents">{{ row.entity.rackUnitId }}</div></div>',
                        displayName: 'Rack Unit Id'
                    },{
                        field:'status',
                        cellTemplate:'<div class="grid-tooltip" title="{{ row.entity.status }}" tooltip-placement="right"><div class="ui-grid-cell-contents">{{ row.entity.status }}<img src="../static/imgs/loading_small.gif" ng-show="(row.entity.status==\'ToReplace\' || row.entity.status==\'Running\')?true:false"></div></div>',
                        displayName: 'status'
                    },{
                        field:' ',
                        cellTemplate:'<button class="btn customcolorwhite btn-md" title="Replace"  name = "replace" ng-click="grid.appScope.setReplaceNodeObject(row.entity)"  ng-disabled = "(grid.appScope.isActiveOperation || (grid.appScope.isAnyPodOperationFailed && !grid.appScope.checkIfStatusFailed(row.entity)))?true:false"><span class="glyphicon glyphicon glyphicon-refresh" ></span></button>',
                        displayName: 'Actions'
                    },{
                        field:'install_logs',
                        cellTemplate:'<a href="{{row.entity.install_logs}}" target="_blank" ng-show="grid.appScope.showHideLink(row.entity)">Click here to see the logs</a>',
                        displayName: 'Logs'
                    }];

                    $scope.gridOptionsForCompute.columnDefs = [{
                        field: 'name',
                        cellTemplate:'<div class="grid-tooltip" title="{{ row.entity.name }}" tooltip-placement="right"><div class="ui-grid-cell-contents">{{ row.entity.name }}</div></div>',
                        displayName: 'Server Name',
                        enableColumnResizing: true
                    }, {
                        field: 'rack_id',
                        cellTemplate:'<div class="grid-tooltip" title="{{ row.entity.rack_id }}" tooltip-placement="right"><div class="ui-grid-cell-contents">{{ row.entity.rack_id }}</div></div>',
                        displayName: 'Rack Id'
                    }, {
                        field:'chassisId',
                        cellTemplate:'<div class="grid-tooltip" title="{{ row.entity.chassisId }}" tooltip-placement="right"><div class="ui-grid-cell-contents">{{row.entity.chassisId}}</div></div>',
                        name: 'Chasis Id'
                    },{
                        field: 'bladeId',
                        cellTemplate:'<div class="grid-tooltip" title="{{ row.entity.bladeId }}" tooltip-placement="right"><div class="ui-grid-cell-contents">{{ row.entity.bladeId }}</div></div>',
                        displayName: 'Blade Id'
                    }, {
                        field:'rackUnitId',
                        cellTemplate:'<div class="grid-tooltip" title="{{ row.entity.rackUnitId }}" tooltip-placement="right"><div class="ui-grid-cell-contents">{{ row.entity.rackUnitId }}</div></div>',
                        displayName: 'Rack Unit Id'
                    },{
                        field:'status',
                        cellTemplate:'<div class="grid-tooltip" title="{{ row.entity.status }}" tooltip-placement="right"><div class="ui-grid-cell-contents">{{ row.entity.status }} <img src="../static/imgs/loading_small.gif" ng-show="(row.entity.status==\'ToAdd\' || row.entity.status==\'Adding\' || row.entity.status== \'ToDelete\' || row.entity.status==\'Deleting\')?true:false"/></div></div>',
                        displayName: 'status'
                    },{
                        field:' ',
                        cellTemplate:'<button  type="button" class="btn customcolorwhite btn-md" title="Remove"  name = "remove"  ng-click="grid.appScope.removeComputeServer(row.entity)" ng-disabled = "(grid.appScope.isActiveOperation ||(grid.appScope.isAnyPodOperationFailed && !grid.appScope.checkIfStatusFailed(row.entity)))?true:false"><span class="glyphicon glyphicon-remove" ></span> </button>',
                        displayName: 'Actions'
                    },{
                        field:'install_logs',
                        cellTemplate:'<a href="{{row.entity.install_logs}}" target="_blank" ng-show="grid.appScope.showHideLink(row.entity)">Click here to see the logs</a>',
                        displayName: 'Logs'
                    }];

                    $scope.gridOptionsForBlockStorage.columnDefs =  [{
                        field: 'name',
                        cellTemplate:'<div class="grid-tooltip" title="{{ row.entity.name }}" tooltip-placement="right"><div class="ui-grid-cell-contents">{{ row.entity.name }}</div></div>',
                        displayName: 'Server Name',
                        enableColumnResizing: true
                    }, {
                        field: 'rack_id',
                        cellTemplate:'<div class="grid-tooltip" title="{{ row.entity.rack_id }}" tooltip-placement="right"><div class="ui-grid-cell-contents">{{ row.entity.rack_id }}</div></div>',
                        displayName: 'Rack Id'
                    }, {
                        field:'chassisId',
                        cellTemplate:'<div class="grid-tooltip" title="{{ row.entity.chassisId }}" tooltip-placement="right"><div class="ui-grid-cell-contents">{{row.entity.chassisId}}</div></div>',
                        name: 'Chasis Id'
                    },{
                        field: 'bladeId',
                        cellTemplate:'<div class="grid-tooltip" title="{{ row.entity.bladeId }}" tooltip-placement="right"><div class="ui-grid-cell-contents">{{ row.entity.bladeId }}</div></div>',
                        displayName: 'Blade Id'
                    }, {
                        field:'rackUnitId',
                        cellTemplate:'<div class="grid-tooltip" title="{{ row.entity.rackUnitId }}" tooltip-placement="right"><div class="ui-grid-cell-contents">{{ row.entity.rackUnitId }}</div></div>',
                        name: 'Rack Unit Id'
                    },{
                        field:'status',
                        cellTemplate:'<div class="grid-tooltip" title="{{ row.entity.status }}" tooltip-placement="right"><div class="ui-grid-cell-contents">{{ row.entity.status }} <img src="../static/imgs/loading_small.gif" ng-show="(row.entity.status==\'ToAdd\' || row.entity.status==\'Adding\' || row.entity.status== \'ToDelete\' || row.entity.status==\'Deleting\')?true:false"/></div></div>',
                        displayName: 'Status'
                    },{
                        field:' ',
                    cellTemplate:'<button  type="button" class="btn customcolorwhite btn-md" title="Remove"  name = "remove"  ng-click="grid.appScope.removeBlockStorage(row.entity)" ng-disabled = "(grid.appScope.isActiveOperation || (grid.appScope.isAnyPodOperationFailed && !grid.appScope.checkIfStatusFailed(row.entity)))?true:false"><span class="glyphicon glyphicon-remove" ></span> </button>',

                        displayName: 'Action'
                    },{
                        field:'install_logs',
                        cellTemplate:'<a href="{{row.entity.install_logs}}" target="_blank" ng-show="grid.appScope.showHideLink(row.entity)">Click here to see the logs</a>',
                        displayName: 'Logs'
                    }];



                }else{
                    $scope.gridOptionsForControl.columnDefs = [{
                        field: 'name',
                        cellTemplate:'<div class="grid-tooltip" title="{{ row.entity.name }}" tooltip-placement="right"><div class="ui-grid-cell-contents">{{ row.entity.name }}</div></div>',
                        displayName: 'Server Name',
                        enableColumnResizing: true
                    }, {
                        field: 'rack_id',
                        cellTemplate:'<div class="grid-tooltip" title="{{ row.entity.rack_id }}" tooltip-placement="right"><div class="ui-grid-cell-contents">{{ row.entity.rack_id }}</div></div>',
                        displayName: 'Rack Id'
                    }, {
                        field:'cimc_ip',
                        cellTemplate:'<div class="grid-tooltip" title="{{ row.entity.cimc_ip }}" tooltip-placement="right"><div class="ui-grid-cell-contents">{{row.entity.cimc_ip}}</div></div>',
                        displayName: 'CIMC IP'
                    },{
                        field: 'cimc_username',
                        cellTemplate:'<div class="grid-tooltip" title="{{ row.entity.cimc_username }}" tooltip-placement="right"><div class="ui-grid-cell-contents">{{ row.entity.cimc_username }}</div></div>',
                        displayName: 'CIMC User Name'
                    }, {
                        field:'cimc_password',
                        cellTemplate:'<div class="grid-tooltip" title="{{ row.entity.cimc_password }}" tooltip-placement="right"><div class="ui-grid-cell-contents">{{ row.entity.cimc_password }}</div></div>',
                        displayName: 'CIMC Password'
                    },{
                        field:'bootDrive',
                        cellTemplate:'<div class="grid-tooltip" title="{{ row.entity.bootDrive }}" tooltip-placement="right"><div class="ui-grid-cell-contents">{{ row.entity.bootDrive }}</div></div>',
                        displayName: 'Boot Drive'
                    },{
                        field:'VICSlot',
                        cellTemplate:'<div class="grid-tooltip" title="{{ row.entity.VICSlot }}" tooltip-placement="right"><div class="ui-grid-cell-contents">{{ row.entity.VICSlot }}</div></div>',
                        displayName: 'VIC Slot'
                    },{
                        field:'status',
                        cellTemplate:'<div class="grid-tooltip" title="{{ row.entity.status }}" tooltip-placement="right"><div class="ui-grid-cell-contents">{{ row.entity.status }} <img src="../static/imgs/loading_small.gif" ng-show="(row.entity.status==\'ToReplace\' || row.entity.status==\'Running\')?true:false"/></div></div>',
                        displayName: 'Status'
                    },{
                        field:' ',
                        cellTemplate:'<button class="btn customcolorwhite btn-md" title="Replace"  name = "replace"  ng-click="grid.appScope.setReplaceNodeObject(row.entity)" ng-disabled = "(grid.appScope.isActiveOperation  || (grid.appScope.isAnyPodOperationFailed && !grid.appScope.checkIfStatusFailed(row.entity)))?true:false" ><span class="glyphicon glyphicon glyphicon-refresh" ></span></button>',
                        displayName: 'Actions'
                    },{
                        field:'install_logs',
                        cellTemplate:'<a href="{{row.entity.install_logs}}" target="_blank" ng-show="grid.appScope.showHideLink(row.entity)">Click here to see the logs</a>',
                        displayName: 'Logs'
                    }];

                    $scope.gridOptionsForCompute.columnDefs = [{
                        field: 'name',
                        cellTemplate:'<div class="grid-tooltip" title="{{ row.entity.name }}" tooltip-placement="right"><div class="ui-grid-cell-contents">{{ row.entity.name }}</div></div>',
                        displayName: 'Server Name',
                        enableColumnResizing: true
                    }, {
                        field: 'rack_id',
                        cellTemplate:'<div class="grid-tooltip" title="{{ row.entity.rack_id }}" tooltip-placement="right"><div class="ui-grid-cell-contents">{{ row.entity.rack_id }}</div></div>',
                        displayName: 'Rack Id'
                    }, {
                        field:'cimc_ip',
                        cellTemplate:'<div class="grid-tooltip" title="{{ row.entity.cimc_ip }}" tooltip-placement="right"><div class="ui-grid-cell-contents">{{row.entity.cimc_ip}}</div></div>',
                        displayName: 'CIMC IP'
                    },{
                        field: 'cimc_username',
                        cellTemplate:'<div class="grid-tooltip" title="{{ row.entity.cimc_username }}" tooltip-placement="right"><div class="ui-grid-cell-contents">{{ row.entity.cimc_username }}</div></div>',
                        displayName: 'CIMC User Name'
                    }, {
                        field:'cimc_password',
                        cellTemplate:'<div class="grid-tooltip" title="{{ row.entity.cimc_password }}" tooltip-placement="right"><div class="ui-grid-cell-contents">{{ row.entity.cimc_password }}</div></div>',
                        displayName: 'CIMC Password'
                    },{
                        field:'bootDrive',
                        cellTemplate:'<div class="grid-tooltip" title="{{ row.entity.bootDrive }}" tooltip-placement="right"><div class="ui-grid-cell-contents">{{ row.entity.bootDrive }}</div></div>',
                        displayName: 'Boot Drive'
                    },{
                        field:'VICSlot',
                        cellTemplate:'<div class="grid-tooltip" title="{{ row.entity.VICSlot }}" tooltip-placement="right"><div class="ui-grid-cell-contents">{{ row.entity.VICSlot }}</div></div>',
                        displayName: 'VIC Slot'
                    },{
                        field:'status',
                        cellTemplate:'<div class="grid-tooltip" title="{{ row.entity.status }}" tooltip-placement="right"><div class="ui-grid-cell-contents">{{ row.entity.status }} <img src="../static/imgs/loading_small.gif" ng-show="(row.entity.status==\'ToAdd\' || row.entity.status==\'Adding\' || row.entity.status== \'ToDelete\' || row.entity.status==\'Deleting\')?true:false"/></div></div>',
                        displayName: 'Status'
                    },{
                        field:' ',
                        cellTemplate:'<button  type="button" class="btn customcolorwhite btn-md" title="Remove"  name = "remove"  ng-click="grid.appScope.removeComputeServer(row.entity)" ng-disabled = "(grid.appScope.isActiveOperation  || (grid.appScope.isAnyPodOperationFailed && !grid.appScope.checkIfStatusFailed(row.entity)))?true:false"><span class="glyphicon glyphicon-remove" ></span> </button>',
                        displayName: 'Actions'
                    },{
                        field:'install_logs',
                        cellTemplate:'<a href="{{row.entity.install_logs}}" target="_blank" ng-show="grid.appScope.showHideLink(row.entity)">Click here to see the logs</a>',
                        displayName: 'Logs'
                    }];

                    $scope.gridOptionsForBlockStorage.columnDefs =  [{
                        field: 'name',
                        cellTemplate:'<div class="grid-tooltip" title="{{ row.entity.name }}" tooltip-placement="right"><div class="ui-grid-cell-contents">{{ row.entity.name }}</div></div>',
                        displayName: 'Server Name',
                        enableColumnResizing: true
                    }, {
                        field: 'rack_id',
                        cellTemplate:'<div class="grid-tooltip" title="{{ row.entity.rack_id }}" tooltip-placement="right"><div class="ui-grid-cell-contents">{{ row.entity.rack_id }}</div></div>',
                        displayName: 'Rack Id'
                    }, {
                        field:'cimc_ip',
                        cellTemplate:'<div class="grid-tooltip" title="{{ row.entity.cimc_ip }}" tooltip-placement="right"><div class="ui-grid-cell-contents">{{row.entity.cimc_ip}}</div></div>',
                        displayName: 'CIMC IP'
                    },{
                        field: 'cimc_username',
                        cellTemplate:'<div class="grid-tooltip" title="{{ row.entity.cimc_username }}" tooltip-placement="right"><div class="ui-grid-cell-contents">{{ row.entity.cimc_username }}</div></div>',
                        displayName: 'CIMC User Name'
                    }, {
                        field:'cimc_password',
                        cellTemplate:'<div class="grid-tooltip" title="{{ row.entity.cimc_password }}" tooltip-placement="right"><div class="ui-grid-cell-contents">{{ row.entity.cimc_password }}</div></div>',
                        displayName: 'CIMC Password'
                    },{
                        field:'bootDrive',
                        cellTemplate:'<div class="grid-tooltip" title="{{ row.entity.bootDrive }}" tooltip-placement="right"><div class="ui-grid-cell-contents">{{ row.entity.bootDrive }}</div></div>',
                        displayName: 'Boot Drive'
                    },{
                        field:'VICSlot',
                        cellTemplate:'<div class="grid-tooltip" title="{{ row.entity.VICSlot }}" tooltip-placement="right"><div class="ui-grid-cell-contents">{{ row.entity.VICSlot }}</div></div>',
                        displayName: 'VIC Slot'
                    },{
                        field:'status',
                        cellTemplate:'<div class="grid-tooltip" title="{{ row.entity.status }}" tooltip-placement="right"><div class="ui-grid-cell-contents">{{ row.entity.status }} <img src="../static/imgs/loading_small.gif" ng-show="(row.entity.status==\'ToAdd\' || row.entity.status==\'Adding\' || row.entity.status== \'ToDelete\' || row.entity.status==\'Deleting\')?true:false"/></div></div>',
                        displayName: 'Status'
                    },{
                        field:' ',
                        cellTemplate:'<button class="btn customcolorwhite btn-md" title="Replace"  name = "replace"  ng-click="grid.appScope.removeBlockStorage(row.entity)" ng-disabled = "(grid.appScope.isActiveOperation  || (grid.appScope.isAnyPodOperationFailed && !grid.appScope.checkIfStatusFailed(row.entity)))?true:false"><span class="glyphicon glyphicon glyphicon-remove" ></span></button>',
                        displayName: 'Actions'
                    },{
                        field:'install_logs',
                        cellTemplate:'<a href="{{row.entity.install_logs}}" target="_blank" ng-show="grid.appScope.showHideLink(row.entity)">Click here to see the logs</a>',
                        displayName: 'Logs'
                    }];
                }
            };

            $scope.initPodMgmt = function() {
                $scope.blueprintId = DeploymentMonitoringService.getDeployedBlueprint().id;

                if($scope.blueprintId){
                    $rootScope.$broadcast('rolling', {
                        status: 'start'
                    });
                    BlueprintManagementFactory.fetchSetupDataForParticularUUID($scope.blueprintId, function (response) {
                        $scope.deployedBlueprintSetup = response.data;
                        $rootScope.$broadcast('rolling', {
                            status: 'end'
                        });

                    }, function () {
                        $rootScope.$broadcast("ShowErrorMessage", {
                            type: 'danger',
                            msg: 'Error while fetching data',
                            disableAutoClose: false
                        });
                        $rootScope.$broadcast('rolling', {
                            status: 'end'
                        });
                    });
                }



                if ($scope.blueprintId != null || $scope.blueprintId != undefined) {
                    $scope.blueprintName = DeploymentMonitoringService.getDeployedBlueprint().name;
                    $scope.createUIGrids();

                    PodManagementService.getNodes($scope.onSuccessOfGetNodes, $scope.onFailureOfGetNodes);
                } else {

                }
            };

            $scope.$on("SetupDataChanged", function() {
                $scope.initPodMgmt();
            });

            $scope.checkIfControlChanged = function(latestControlArray) {
                if (latestControlArray.length != $scope.controlServerArray.length) {
                    return true;
                } else {
                    for (var i in latestControlArray) {
                        var j = 0;
                        for (j = 0; j < $scope.controlServerArray.length; j++) {
                            if (($scope.controlServerArray[j].name == latestControlArray[i].name) && ($scope.controlServerArray[j].status != latestControlArray[i].status)) {
                                return true;
                            }
                        }

                    }
                    return false;
                }
            };

            $scope.checkIfComputeChanged = function(latestComputeArray) {
                if (latestComputeArray.length != $scope.computeServerArray.length) {
                    return true;
                } else {
                    var i = 0;
                    for (i = 0; i < latestComputeArray.length; i++) {
                        var j = 0;
                        for (j = 0; j < $scope.computeServerArray.length; j++) {
                            if ($scope.computeServerArray[j].name == latestComputeArray[i].name && $scope.computeServerArray[j].status != latestComputeArray[i].status) {
                                return true;
                            }
                        }

                    }
                    return false;

                }
            };

            $scope.checkIfStorageChanged = function(latestStorageArray) {
                if (latestStorageArray.length != $scope.storageServerArray.length) {
                    return true;
                } else {
                    for (var i in latestStorageArray) {
                        var j = 0;
                        for (j = 0; j < $scope.storageServerArray.length; j++) {
                            if ($scope.storageServerArray[j].name == latestStorageArray[i].name && $scope.storageServerArray[j].status != latestStorageArray[i].status) {
                                return true;
                            }
                        }

                    }
                    return false;
                }
            };

            $scope.$on('latestdatafetched', function(event, args) {
                var servers = args['LatestServers'];
                if (servers.control) {
                    if ($scope.checkIfControlChanged(servers.control)) {
                        $scope.controlServerArray = servers.control;
                        $scope.gridOptionsForControl.data = servers.control;
                    }
                }
                if (servers.compute) {
                    if ($scope.checkIfComputeChanged(servers.compute)) {
                        $scope.computeServerArray = servers.compute;
                        $scope.gridOptionsForCompute.data = servers.compute;
                    }
                }
                if (servers.storage) {
                    if ($scope.checkIfStorageChanged(servers.storage)) {
                        $scope.storageServerArray = servers.storage;
                        $scope.gridOptionsForBlockStorage.data = servers.storage;
                    }
                }
            });

            $scope.$on("$destroy", function() {
                PodsPolling.stopPolling();
            });

            $scope.newStorageObj = {

            };

            $scope.clearPreviouslyFilledStorageData = function() {

                        $scope.newStorageObj.name = "";
                        $scope.newStorageObj.rack_id = "";
                        $scope.newStorageObj.rack_unit_id = "";
                        $scope.newStorageObj.cimc_ip = "";
                        $scope.newStorageObj.cimc_username = "";
                        $scope.newStorageObj.cimc_password = "";
                        $scope.newStorageObj.boot_drive = "";
                        $scope.newStorageObj.VICSlot = "";

                    $("#AddStoragePopup").modal("show");
                    $scope.$broadcast("ClearValidation");

            };
            $scope.newComputeObj = {};
            $scope.clearPreviouslyFilledComputeData = function() {

                    $scope.newComputeObj.name = "";
                    $scope.newComputeObj.rack_id = "";
                    $scope.newComputeObj.chassis_id = "";
                    $scope.newComputeObj.blade_id = "";
                    $scope.newComputeObj.rack_unit_id = "";
                    $scope.newComputeObj.cimc_ip = "";
                    $scope.newComputeObj.cimc_username = "";
                    $scope.newComputeObj.cimc_password = "";
                    $scope.newComputeObj.boot_drive = "";
                    $scope.newComputeObj.VICSlot = "";
                    $("#AddComputePopup").modal("show");
                    $scope.$broadcast("ClearValidation");
            };

            $scope.initPodMgmt();
        }])
        .factory('PodsPolling', ['$http', '$rootScope','Configuration',function($http, $rootScope,Configuration) {
        	var backendServerUrl = Configuration.isDebug?Configuration.backendServerUrl:"";
            var pollinginterval = 3000; // 2 second;
            var pollingTimer = null;
            var latestNodeArray = [];
            var notifyChanges = function() {
                var eventParam = {
                    control: [],
                    compute: [],
                    storage: []
                }
                for (var i in latestNodeArray) {
                    switch (latestNodeArray[i].mtype) {
                        case 'control':
                            var data = latestNodeArray[i];
                            var node_data = JSON.parse(latestNodeArray[i].node_data);
                            eventParam.control.push({
                                name : data.name,
                                rack_id : node_data.rack_info?node_data.rack_info.rack_id:'',
                                cimc_ip : node_data.cimc_info?node_data.cimc_info.cimc_ip:'',
                                cimc_username : node_data.cimc_info?node_data.cimc_info.cimc_username:'',
                                cimc_password:node_data.cimc_info?node_data.cimc_info.cimc_password:'',
                                status:data.status,
                                uuid : data.uuid,
                                boot_drive : node_data.hardware_info?node_data.hardware_info.boot_drive:'',
                                VICSlot : node_data.hardware_info?node_data.hardware_info.VICSlot:'',
                                chassisId : node_data.ucsm_info?node_data.ucsm_info.chassis_id:'',
                                bladeId:node_data.ucsm_info?node_data.ucsm_info.blade_id:'',
                                rackUnitId:node_data.ucsm_info?node_data.ucsm_info['rack-unit_id']:'',
                                install_logs:data.install_logs
                            });
                            break;
                        case 'compute':
                            var data = latestNodeArray[i];
                            var node_data = JSON.parse(latestNodeArray[i].node_data);
                            eventParam.compute.push({
                                name : data.name,
                                rack_id : node_data.rack_info?node_data.rack_info.rack_id:'',
                                cimc_ip : node_data.cimc_info?node_data.cimc_info.cimc_ip:'',
                                cimc_username : node_data.cimc_info?node_data.cimc_info.cimc_username:'',
                                cimc_password:node_data.cimc_info?node_data.cimc_info.cimc_password:'',
                                status:data.status,
                                uuid : data.uuid,
                                boot_drive : node_data.hardware_info?node_data.hardware_info.boot_drive:'',
                                VICSlot : node_data.hardware_info?node_data.hardware_info.VICSlot:'',
                                chassisId : node_data.ucsm_info?node_data.ucsm_info.chassis_id:'',
                                bladeId:node_data.ucsm_info?node_data.ucsm_info.blade_id:'',
                                rackUnitId:node_data.ucsm_info?node_data.ucsm_info['rack-unit_id']:'',
                                install_logs:data.install_logs
                            });
                            break;
                        case 'block_storage':
                            var data = latestNodeArray[i];
                            var node_data = JSON.parse(latestNodeArray[i].node_data);
                            eventParam.storage.push({
                                name : data.name,
                                rack_id : node_data.rack_info?node_data.rack_info.rack_id:'',
                                cimc_ip : node_data.cimc_info?node_data.cimc_info.cimc_ip:'',
                                cimc_username : node_data.cimc_info?node_data.cimc_info.cimc_username:'',
                                cimc_password:node_data.cimc_info?node_data.cimc_info.cimc_password:'',
                                status:data.status,
                                uuid : data.uuid,
                                boot_drive : node_data.hardware_info?node_data.hardware_info.boot_drive:'',
                                VICSlot : node_data.hardware_info?node_data.hardware_info.VICSlot:'',
                                chassisId : node_data.ucsm_info?node_data.ucsm_info.chassis_id:'',
                                bladeId:node_data.ucsm_info?node_data.ucsm_info.blade_id:'',
                                rackUnitId:node_data.ucsm_info?node_data.ucsm_info['rack-unit_id']:'',
                                install_logs:data.install_logs
                            });
                            break;
                    }
                }
                $rootScope.$broadcast("latestdatafetched", {
                    'LatestServers': eventParam
                });
            };

            var checkIfNonActiveOrFailed = function() {
                var i = 0;
                for (i = 0; i < latestNodeArray.length; i++) {
                    if (latestNodeArray[i].status == "Active" || latestNodeArray[i].status == "AddNodeFailed" || latestNodeArray[i].status == "AddNodePreFailed" || latestNodeArray[i].status == "DeleteNodeFailed" || latestNodeArray[i].status == "ReplaceNodeFailed") {
                        //clearInterval(pollingTimer);
                        //break;
                    } else {
                        //notifyChanges();
                        break;
                    }

                }

                if (i == latestNodeArray.length) {
                    clearInterval(pollingTimer);
                }
            };

            var startPolling = function() {
                if (pollingTimer) {
                    clearInterval(pollingTimer);
                }
                pollingTimer = setInterval(function() {
                    $http.get(backendServerUrl + "/v1/nodes").success(function(response) {
                        latestNodeArray = [];
                        latestNodeArray = response.nodes;
                        checkIfNonActiveOrFailed();
                        notifyChanges();
                    });
                }, pollinginterval);

            };

            var stopPolling = function() {
                clearInterval(pollingTimer);
            };

            return {
                startPolling: startPolling,
                stopPolling: stopPolling
            };
        }])
        .factory('PodManagementService', ['$http','Configuration', function($http,Configuration) {
        	var backendServerUrl = Configuration.isDebug?Configuration.backendServerUrl:"";
            var getNodeList = function(successCallback, failureCallback) {
                var request = $http({
                    method: "GET",
                    url: backendServerUrl + "/v1/nodes"
                });
                request.then(successCallback, failureCallback);
            };

            var getNodeDetails = function(uuid, successCallback, failureCallback) {
                var request1 = $http({
                    method: "GET",
                    url: backendServerUrl + "/v1/nodes/" + uuid
                });
                request1.then(successCallback, failureCallback);
            };

            var addNode = function(addNodePayload, successCallback, failureCallback) {

                var request2 = $http({
                    method: "POST",
                    url: backendServerUrl + "/v1/nodes",
                    data: addNodePayload
                });
                request2.then(successCallback, failureCallback);
            };

            var removeNode = function(uuid, successCallback, failureCallback) {
                var request3 = $http({
                    method: "DELETE",
                    url: backendServerUrl + "/v1/nodes/" + uuid
                });
                request3.then(successCallback, failureCallback);
            };

            var removeNodeForcefully = function(uuid, successCallback, failureCallback) {
                var request3 = $http({
                    method: "DELETE",
                    url: backendServerUrl + "/v1/nodes/" + uuid,
                    data : {clear_db_entry:"True"}
                });
                request3.then(successCallback, failureCallback);
            };

            var replaceNode = function(uuid, payload, successCallback, failureCallback) {
                var request3 = $http({
                    method: "PUT",
                    url: backendServerUrl + "/v1/nodes/" + uuid,
                    data: payload
                });
                request3.then(successCallback, failureCallback);
            };

            return {
                getNodes: getNodeList,
                getNodeDetails: getNodeDetails,
                addNode: addNode,
                removeNode: removeNode,
                removeNodeForcefully : removeNodeForcefully,
                replaceController: replaceNode
            };
        }]);
}());