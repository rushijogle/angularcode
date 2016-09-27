/**
 *
 */
var ServerProto = function () {
    this.serverName = "";
    this.CIMC_IP = "";
    this.rackId = "";
    this.checked = "";
    this.role = "";
}
(function () {
    'use strict';
    angular.module('mercuryInstaller.blueprintSetup.physicalSetupWizard.serverAndRoles', ['mercuryInstaller.utility', 'ngAnimate', 'ngTouch', 'ui.grid', 'ui.grid.selection', 'ui.grid.exporter','mercuryInstaller.globals','ui.grid.autoResize','ui.grid.resizeColumns', 'ui.grid.moveColumns'])
        .controller('ServerAndRolesCtrl', ['$scope', 'validateinputs','$interval','Events', function ($scope, validateinputs,$interval,Events) {
            $scope.reverseSort = true;
            $scope.controlCnt = 0;
            $scope.computeCnt = 0;
            $scope.storageCnt = 0;
            $scope.isVisible = false;

            $scope.onProceed = function () {
                $scope.isVisible = false;
                $scope.performTaskWaitaingForConfirmation();
            };
            $scope.onCancel = function () {
                $scope.isVisible = false;
                $scope.actionsTobeTakenToRevert = function(){

                };
            };
            $scope.serverObject = {};
            $scope.serverObj = {};
            $scope.serverIndex = $scope.serversobject.serverArray.length == 0 ? -1 : ($scope.serversobject.serverArray.length - 1);
            $("#serverPopup").modal({
                backdrop : 'static',
                show : false
            });
            $scope.gridOptionsForSERVER = {
                enableRowSelection: true,
                enableGridMenu: false,
                enableSelectAll: true,
                onRegisterApi: function (gridApi) {
                    $scope.gridApi = gridApi;
                    gridApi.selection.on.rowSelectionChanged($scope, function (rows) {
                        $scope.SelectionsrowforSERVER = gridApi.selection.getSelectedRows();

                    });

                    gridApi.selection.on.rowSelectionChangedBatch($scope, function (rows) {
                        $scope.SelectionsrowforSERVER = gridApi.selection.getSelectedRows();
                    });
                    /*$interval( function() {
                        $scope.gridApi.core.handleWindowResize();
                    }, 500, 10);*/
                },
                enableHorizontalScrollbar: 1,
                data : $scope.serversobject.serverArray
            };

            $scope.prepopulateFields = function () {
                $scope.serverIndex = $scope.serversobject.serverArray.length == 0 ? -1 : ($scope.serversobject.serverArray.length - 1);
                for (var i = 0; i < 3; i++) {
                    if ($scope.sharedobject.cephMode == "Dedicated") {
                        $scope.serversobject.serverArray.push({
                            serverName: '',
                            serverType: $scope.sharedobject.type == "B" ? 'rack' : '',
                            VICSlot: '',
                            CIMC_IP: '',
                            CIMC_User_Name: '',
                            CIMC_Password: '',
                            rackId: '',
                            chasisId: '',
                            bladeId: '',
                            rackUnitId: '',
                            serverIndex: ++$scope.serverIndex,
                            role: 'block_storage'
                        });
                    }

                }
                for (var i = 0; i < 3; i++) {
                    $scope.serversobject.serverArray.push({
                        serverName: '',
                        serverType: $scope.sharedobject.type == "B" ? 'blade' : '',
                        VICSlot: '',
                        CIMC_IP: '',
                        CIMC_User_Name: '',
                        CIMC_Password: '',
                        rackId: '',
                        chasisId: '',
                        bladeId: '',
                        rackUnitId: '',
                        serverIndex: ++$scope.serverIndex,
                        role: 'control'
                    });
                }
                $scope.serversobject.serverArray.push({
                    serverName: '',
                    serverType: $scope.sharedobject.type == "B" ? 'blade' : '',
                    VICSlot: '',
                    CIMC_IP: '',
                    CIMC_User_Name: '',
                    CIMC_Password: '',
                    rackId: '',
                    chasisId: '',
                    bladeId: '',
                    rackUnitId: '',
                    serverIndex: ++$scope.serverIndex,
                    role: 'compute'
                });
            };
            $scope.$watch(function () {

                return $scope.serversobject.serverArray;
            }, function () {
                $scope.serverIndex = $scope.serversobject.serverArray.length == 0 ? -1 : ($scope.serversobject.serverArray.length - 1);

                if ($scope.gridOptionsForSERVER) {

                    $scope.gridOptionsForSERVER.enableGridMenu = true;
                    $scope.gridOptionsForSERVER.exporterMenuPdf = false;
                    $scope.gridOptionsForSERVER.exporterMenuCsv = false;
                    $scope.gridOptionsForSERVER.columnDefs = $scope.sharedobject.type == 'B' ? [{field: 'serverName', name: 'Server Name', cellTooltip:
                        function (row, col) {
                            return '' + row.entity.serverName + '';
                        }}, {field: 'serverType', name: 'Server Type', cellTooltip:
                        function (row, col) {
                            return '' + row.entity.serverType + '';
                        }}, {field: 'rackId', displayName: 'Rack ID',name: 'Rack ID', cellTooltip:
                        function (row, col) {
                            return '' + row.entity.rackId + '';
                        }}, {field: 'chasisId',displayName:'Chassis ID', name: 'Chassis ID', cellTooltip:
                        function (row, col) {
                            return '' + row.entity.chasisId + '';
                        }}, {field: 'bladeId', displayName:'Blade ID',name: 'Blade ID', cellTooltip:
                        function (row, col) {
                            return '' + row.entity.bladeId + '';
                        }}, {field: 'rackUnitId', displayName:'Rack unit ID',name: 'Rack unit ID', cellTooltip:
                        function (row, col) {
                            return '' + row.entity.rackUnitId + '';
                        }}, {field: 'role', displayName:'Role',name: 'Role', cellTooltip:
                        function (row, col) {
                            return '' + row.entity.role + '';
                        }}, {name: 'Action',
                        cellTemplate: '<button type="button" class="btn btn-md customcolorwhite setpaddingright" value="edit" ng-click="grid.appScope.changeActionToEdit(grid, row)"><span class="glyphicon glyphicon-pencil"></span></button> <button type="button" class="btn customcolorwhite btn-md " ng-click="grid.appScope.deleteServer(grid, row)" value="edit" title="Delete" ><span class="glyphicon glyphicon-remove"></span> </button>', enableColumnResizing: false, width: 100}] : [{field: 'serverName', name: 'Server Name', cellTooltip:
                        function (row, col) {
                            return '' + row.entity.serverName + '';
                        }}, {field: 'bootDrive', displayName:'Boot Drive', name: 'Boot Drive', cellTooltip:
                        function (row, col) {
                            return '' + row.entity.bootDrive + '';
                        }}, {field: 'VICSlot', displayName:'VIC', name: 'VIC', cellTooltip:
                        function (row, col) {
                            return '' + row.entity.VICSlot + '';
                        }}, {field: 'CIMC_IP', displayName:'CIMC IP', name: 'CIMC IP', cellTooltip:
                        function (row, col) {
                            return '' + row.entity.CIMC_IP + '';
                        }}, {field: 'CIMC_User_Name', displayName:'CIMC User name', name: 'CIMC User name', cellTooltip:
                        function (row, col) {
                            return '' + row.entity.CIMC_User_Name + '';
                        }}, {field: 'CIMC_Password', displayName:'CIMC Password', name: 'CIMC Password', cellTooltip:
                        function (row, col) {
                            return '' + row.entity.CIMC_Password + '';
                        }}, {field: 'rackId', displayName:'Rack ID', name: 'Rack ID', cellTooltip:
                        function (row, col) {
                            return '' + row.entity.rackId + '';
                        }}, {field: 'role', displayName:'Role',name: 'Role', cellTooltip:
                        function (row, col) {
                            return '' + row.entity.role + '';
                        }}, {name: 'Action',
                        cellTemplate: '<button type="button" class="btn btn-md customcolorwhite setpaddingright" value="edit" ng-click="grid.appScope.changeActionToEdit(grid, row)"><span class="glyphicon glyphicon-pencil"></span></button> <button type="button" class="btn customcolorwhite btn-md " ng-click="grid.appScope.deleteServer(grid, row)" value="edit" title="Delete" ><span class="glyphicon glyphicon-remove"></span> </button>', enableColumnResizing: false, width: 100}];
                    $scope.gridOptionsForSERVER.data = $scope.serversobject.serverArray;
                }

            });

            $scope.$watch(function () {
                return $scope.sharedobject.type;
            }, function () {
                $scope.gridOptionsForSERVER.enableGridMenu = true;
                $scope.gridOptionsForSERVER.exporterMenuPdf = false;
                $scope.gridOptionsForSERVER.exporterMenuCsv = false;

                $scope.gridOptionsForSERVER.columnDefs = $scope.sharedobject.type == 'B' ? [{field: 'serverName', name: 'Server Name', cellTooltip:
                    function (row, col) {
                        return '' + row.entity.serverName + '';
                    }}, {field: 'serverType',displayName:'Server Type', name: 'Server Type', cellTooltip:
                    function (row, col) {
                        return '' + row.entity.serverType + '';
                    }}, {field: 'rackId', name: 'Rack ID', displayName: 'Rack ID', cellTooltip:
                    function (row, col) {
                        return '' + row.entity.rackId + '';
                    }}, {field: 'chasisId',displayName:'Chassis ID', name: 'Chassis ID', cellTooltip:
                    function (row, col) {
                        return '' + row.entity.chasisId + '';
                    }}, {field: 'bladeId',displayName:'Blade ID', name: 'Blade ID', cellTooltip:
                    function (row, col) {
                        return '' + row.entity.bladeId + '';
                    }}, {field: 'rackUnitId',displayName:'Rack unit ID', name: 'Rack unit ID', cellTooltip:
                    function (row, col) {
                        return '' + row.entity.rackUnitId + '';
                    }}, {field: 'role', displayName:'Role', name: 'Role', cellTooltip:
                    function (row, col) {
                        return '' + row.entity.role + '';
                    }}, {name: 'Action',
                    cellTemplate: '<button type="button" class="btn btn-md customcolorwhite setpaddingright" value="edit" ng-click="grid.appScope.changeActionToEdit(grid, row)"><span class="glyphicon glyphicon-pencil"></span></button> <button type="button" class="btn customcolorwhite btn-md " ng-click="grid.appScope.deleteServer(grid, row)" value="edit" title="Delete" ><span class="glyphicon glyphicon-remove"></span> </button>',  enableColumnResizing: false, width: 100}] : [{field: 'serverName', name: 'Server Name', cellTooltip:
                    function (row, col) {
                        return '' + row.entity.serverName + '';
                    }}, {field: 'bootDrive', displayName:'Boot Drive',name: 'Boot Drive', cellTooltip:
                    function (row, col) {
                        return '' + row.entity.bootDrive + '';
                    }}, {field: 'VICSlot', displayName:'VIC',name: 'VIC', cellTooltip:
                    function (row, col) {
                        return '' + row.entity.VICSlot + '';
                    }}, {field: 'CIMC_IP', displayName:'CIMC IP', name: 'CIMC IP', cellTooltip:
                    function (row, col) {
                        return '' + row.entity.CIMC_IP + '';
                    }}, {field: 'CIMC_User_Name', displayName:'CIMC User name', name: 'CIMC User name', cellTooltip:
                    function (row, col) {
                        return '' + row.entity.CIMC_User_Name + '';
                    }}, {field: 'CIMC_Password',displayName:'CIMC Password', name: 'CIMC Password', cellTooltip:
                    function (row, col) {
                        return '' + row.entity.CIMC_Password + '';
                    }}, {field: 'rackId',displayName:'Rack ID', name: 'Rack ID', cellTooltip:
                    function (row, col) {
                        return '' + row.entity.rackId + '';
                    }}, {field: 'role', displayName:'Role',name: 'Role', cellTooltip:
                    function (row, col) {
                        return '' + row.entity.role + '';
                    }}, {name: 'Action',
                    cellTemplate: '<button type="button" class="btn btn-md customcolorwhite setpaddingright" value="edit" ng-click="grid.appScope.changeActionToEdit(grid, row)"><span class="glyphicon glyphicon-pencil"></span></button> <button type="button" class="btn customcolorwhite btn-md " ng-click="grid.appScope.deleteServer(grid, row)" value="edit" title="Delete" ><span class="glyphicon glyphicon-remove"></span> </button>',  enableColumnResizing: false, width: 100}];
                if($scope.serversobject.serverArray && $scope.serversobject.serverArray.length==0)
                    $scope.prepopulateFields();
            });



            $scope.$on("CephModeChange", function () {
                if($scope.serversobject.serverArray && $scope.serversobject.serverArray.length==0)
                    $scope.prepopulateFields();
            });

            $scope.checkAllservers = function () {
                if ($scope.selectedAllserver) {
                    $scope.selectedAllserver = true;
                } else {
                    $scope.selectedAllserver = false;
                }

                angular.forEach($scope.serversobject.serverArray, function (serverObj) {
                    serverObj.selected = $scope.selectedAllserver;
                });
            },
                $scope.checkStatusforSERVER = function () {

                    var selectedRecords = $scope.SelectionsrowforSERVER;
                    if (typeof (selectedRecords) == 'undefined') {
                        return true;
                    } else if (typeof (selectedRecords) == 'object') {

                        if (selectedRecords == 0) {
                            return true;
                        } else {
                            return false;
                        }
                    } else {
                        return true;
                    }

                },
                $scope.rolesArrayBRack = [{
                    name: 'BLOCK STORAGE',
                    value: 'block_storage'
                }];
            $scope.rolesArrayBBlade = [{
                name: 'CONTROL',
                value: 'control'
            }, {
                name: 'COMPUTE',
                value: 'compute'
            }];
            $scope.rolesArrayC = [{
                name: 'CONTROL',
                value: 'control'
            }, {
                name: 'COMPUTE',
                value: 'compute'
            }, {
                name: 'BLOCK STORAGE',
                value: 'block_storage'
            }];
            $scope.serverTypeArray = [{
                name: 'BLADE',
                value: 'blade'
            }, {
                name: 'RACK',
                value: 'rack'
            }];
            $scope.$watch(function () {
                return $scope.sharedobject.cephMode;
            }, function () {
                if ($scope.sharedobject.cephMode == "Dedicated") {
                    $scope.serverTypeArray = [{
                        name: 'BLADE',
                        value: 'blade'
                    }, {
                        name: 'RACK',
                        value: 'rack'
                    }];
                }
                else {
                    $scope.serverTypeArray = [{
                        name: 'BLADE',
                        value: 'blade'
                    }];
                }
            });
            if ($scope.sharedobject.type == "B") {
                if ($scope.sharedobject.cephMode == "Dedicated") {
                    $scope.rolesArray = $scope.rolesArrayC;
                }
                else {
                    $scope.rolesArray = $scope.rolesArrayBBlade;
                }
            }
            else {
                $scope.rolesArray = $scope.rolesArrayC;
            }
            $scope.$watch(function(){
                return $scope.sharedobject.cephMode;
            },function(){
                if($scope.sharedobject.cephMode=="Central")
                    $scope.rolesArray = $scope.rolesArrayBBlade;
                else
                    $scope.rolesArray = $scope.rolesArrayC;
            });

            $scope.$watch(function(){
                return $scope.serverObj.role;
            },function(){
                if($scope.serverObj.role == "block_storage"){
                    if($scope.sharedobject.type == 'B'){
                        $scope.serverObj.serverType = "rack";
                    }
                }else if($scope.serverObj.role == "control" || $scope.serverObj.role == "compute"){
                    if($scope.sharedobject.type == 'B'){
                        $scope.serverObj.serverType = "blade";
                    }
                }
            });
            $scope.$watch(function(){
               return $scope.serverObj.serverType;
            },function(){
                if($scope.serverObj.serverType == 'rack'){
                    $scope.rolesArray = $scope.rolesArrayBRack;
                }else if($scope.serverObj.serverType == 'blade'){
                    $scope.rolesArray = $scope.rolesArrayBBlade;
                }else{
                    if($scope.sharedobject.cephMode=="Central")
                        $scope.rolesArray = $scope.rolesArrayBBlade;
                    else
                        $scope.rolesArray = $scope.rolesArrayC;
                }
            });
            $scope.serversobject.serverUserName = "root";
            $scope.getServerType = function () {
                if ($scope.sharedobject.cephMode == 'Dedicated') {
                    return "rack";
                }
                else {
                    return "blade";
                }
            };


            $scope.isBSeries = function () {
                return $scope.platformtype == "B";
            }
            $scope.isCSeries = function () {
                return $scope.platformtype == "C";
            }
            //$scope.serversobject.serverArrayDummy = [];

            $scope.checkRolesCount = function () {
                $scope.controlCnt = 0;
                $scope.computeCnt = 0;
                $scope.storageCnt = 0;
                var isValid = true;
                for (var i in $scope.serversobject.serverArray) {
                    if ($scope.serversobject.serverArray[i].role == 'control' && $scope.serversobject.serverArray[i].serverName != "") {
                        $scope.controlCnt++;
                    }
                    else if ($scope.serversobject.serverArray[i].role == 'compute' && $scope.serversobject.serverArray[i].serverName != "") {
                        $scope.computeCnt++;
                    }
                    else if ($scope.serversobject.serverArray[i].role == 'block_storage' && $scope.serversobject.serverArray[i].serverName != "") {
                        $scope.storageCnt++;
                    }
                }
                $scope.errorMsg = "";
                if ($scope.sharedobject.cephMode == 'Central') {
                    if ($scope.controlCnt < 1 || $scope.controlCnt > 3) {
                        $scope.errorMsg += "\n Atleast 1 and at max 3 Control nodes can be there";
                        isValid = false;
                    }
                    else {
                        $scope.errorMsg += "";
                    }
                    if ($scope.computeCnt <= 0) {
                        $scope.errorMsg += "\n Atleast 1 Compute nodes can be there";
                        isValid = false;
                    }
                    else {
                        $scope.errorMsg += "";
                    }
                }
                else if ($scope.sharedobject.cephMode == 'Dedicated') {
                    if ($scope.storageCnt < 1 || $scope.storageCnt > 3) {
                        $scope.errorMsg += "Atleast 1 and at max 3 Block Storages should be there";
                        isValid = false;
                    }
                    else {
                        $scope.errorMsg = "";
                    }
                    if ($scope.controlCnt < 1 || $scope.controlCnt > 3) {
                        $scope.errorMsg += "\n Atleast 1 and at max 3 Control nodes should be there";
                        isValid = false;
                    }
                    else {
                        $scope.errorMsg += "";
                    }
                    if ($scope.computeCnt <= 0) {
                        $scope.errorMsg += "\n Atleast 1 Compute nodes should be there";
                        isValid = false;
                    }
                    else {
                        $scope.errorMsg += "";
                    }
                }
                return isValid;
            };

            $scope.checkUserInputsForServers = function () {
                var isValid = $scope.checkRolesCount();
                $scope.serversobject.isServersValidated = isValid;

            };
            $scope.$on('ValidateAfterUpload', function () {
                $scope.checkUserInputsForServers();
            });
            $scope.isServerTypeBlade = function (serverObj) {
                if (serverObj) {
                    if (serverObj.serverType == 'blade') {
                        return true;
                    }
                    else {
                        serverObj.chasisId = "";
                        serverObj.bladeId = "";
                        return false;
                    }
                }
            };

            $scope.isServerTypeRack = function (serverObj) {
                if (serverObj) {
                    if (serverObj.serverType == 'rack') {
                        return true;
                    }
                    else {
                        serverObj.rackUnitId = "";
                        return false;
                    }
                }

            };

            $scope.findIndexInServerArray = function (serverObject) {
                for (var i in $scope.serversobject.serverArray) {
                    if ($scope.serversobject.serverArray[i].serverIndex == serverObject.serverIndex) {
                        return i;
                    }
                }
                return -1;
            };

            $scope.SaveServerDetails = function (serverObject) {
                $scope.$broadcast("KickOffValidationForPopup");
                if ($scope.currentAction == "Add") {
                    if ($scope.platformtype == "B") {
                        if (serverObject.serverType == "blade") {
                            if (serverObject.serverName && serverObject.rackId && serverObject.chasisId && serverObject.bladeId && serverObject.serverName != "" && serverObject.rackId != "" && serverObject.role != undefined && !isNaN(serverObject.chasisId) && Number(serverObject.chasisId)>=1 && Number(serverObject.chasisId)<=8 &&
                                (!isNaN(serverObject.bladeId))&&Number(serverObject.bladeId)>=1 && Number(serverObject.bladeId)<=24) {
                                $scope.serversobject.serverArray.push({
                                    serverName: serverObject.serverName,
                                    rackId: serverObject.rackId,
                                    role: serverObject.role,
                                    serverIndex: ++$scope.serverIndex,
                                    serverType: serverObject.serverType,
                                    chasisId: serverObject.chasisId,
                                    bladeId: serverObject.bladeId
                                });
                                $("#serverPopup").modal("hide");
                                $scope.checkUserInputsForServers();
                            } else {
                                $scope.errMsg = "Please fill Required fields";
                            }
                        } else {
                            if (serverObject.serverName && serverObject.rackId && serverObject.rackUnitId && serverObject.serverName != "" && serverObject.rackId != "" && serverObject.role != undefined && !isNaN(serverObject.rackUnitId) && Number(serverObject.rackUnitId)>=1 && Number(serverObject.rackUnitId)<=96) {
                                $scope.serversobject.serverArray.push({
                                    serverName: serverObject.serverName,
                                    rackId: serverObject.rackId,
                                    role: serverObject.role,
                                    serverIndex: ++$scope.serverIndex,
                                    serverType: serverObject.serverType,
                                    rackUnitId:serverObject.rackUnitId
                                });
                                $("#serverPopup").modal("hide");
                                $scope.checkUserInputsForServers();
                            } else {
                                $scope.errMsg = "Please fill Required fields";
                            }
                        }
                    } else {
                        if (serverObject.serverName && serverObject.rackId && serverObject.serverName != "" && serverObject.rackId != "" && serverObject.role != undefined && validateinputs.validateIP(serverObject.CIMC_IP)) {
                            $scope.serversobject.serverArray.push({
                                serverName: serverObject.serverName,
                                CIMC_IP: serverObject.CIMC_IP,
                                rackId: serverObject.rackId,
                                role: serverObject.role,
                                serverIndex: ++$scope.serverIndex,
                                bootDrive: serverObject.bootDrive,
                                VICSlot: serverObject.VICSlot,
                                CIMC_User_Name: serverObject.CIMC_User_Name,
                                CIMC_Password: serverObject.CIMC_Password
                            });
                            $("#serverPopup").modal("hide");
                            $scope.checkUserInputsForServers();
                        } else {
                            $scope.errMsg = "Please fill Required fields";
                        }
                    }
                } else {
                    if ($scope.platformtype == "B") {
                        if (serverObject.serverType == "blade") {
                            if (serverObject.serverName && serverObject.rackId && serverObject.chasisId && serverObject.bladeId && serverObject.serverName != "" && serverObject.rackId != "" && serverObject.role != undefined && !isNaN(serverObject.chasisId) && Number(serverObject.chasisId)>=1 && Number(serverObject.chasisId)<=8 &&
                                (!isNaN(serverObject.bladeId))&&Number(serverObject.bladeId)>=1 && Number(serverObject.bladeId)<=24) {
                                var arrayIndex = $scope.findIndexInServerArray(serverObject);
                                if (arrayIndex != -1) {
                                    $scope.serversobject.serverArray[arrayIndex].serverName = serverObject.serverName;
                                    $scope.serversobject.serverArray[arrayIndex].rackId = serverObject.rackId;
                                    $scope.serversobject.serverArray[arrayIndex].role = serverObject.role;
                                    $scope.serversobject.serverArray[arrayIndex].serverIndex = serverObject.serverIndex;
                                    $scope.serversobject.serverArray[arrayIndex].serverType = serverObject.serverType;
                                    $scope.serversobject.serverArray[arrayIndex].chasisId = serverObject.chasisId;
                                    $scope.serversobject.serverArray[arrayIndex].bladeId = serverObject.bladeId;
                                    $("#serverPopup").modal("hide");
                                    $scope.checkUserInputsForServers();
                                }


                            } else {
                                $scope.errMsg = "Please fill Required fields";
                            }
                        } else {
                            if (serverObject.serverName && serverObject.rackId && serverObject.rackUnitId && serverObject.serverName != "" && serverObject.rackId != "" && serverObject.role != undefined && !isNaN(serverObject.rackUnitId) && Number(serverObject.rackUnitId)>=1 && Number(serverObject.rackUnitId)<=96) {
                                var arrayIndex = $scope.findIndexInServerArray(serverObject);
                                if (arrayIndex != -1) {
                                    $scope.serversobject.serverArray[arrayIndex].serverName = serverObject.serverName;
                                    $scope.serversobject.serverArray[arrayIndex].rackId = serverObject.rackId;
                                    $scope.serversobject.serverArray[arrayIndex].role = serverObject.role;
                                    $scope.serversobject.serverArray[arrayIndex].serverIndex = serverObject.serverIndex;
                                    $scope.serversobject.serverArray[arrayIndex].serverType = serverObject.serverType;
                                    $scope.serversobject.serverArray[arrayIndex].rackUnitId = serverObject.rackUnitId;
                                    $("#serverPopup").modal("hide");
                                    $scope.checkUserInputsForServers();
                                }
                            } else {
                                $scope.errMsg = "Please fill Required fields";
                            }
                        }
                    } else {
                        if (serverObject.serverName && serverObject.rackId && serverObject.serverName != "" && serverObject.rackId != "" && serverObject.role != undefined && validateinputs.validateIP(serverObject.CIMC_IP)) {
                            var arrayIndex = $scope.findIndexInServerArray(serverObject);
                            if (arrayIndex != -1) {
                                $scope.serversobject.serverArray[arrayIndex].serverName = serverObject.serverName;
                                $scope.serversobject.serverArray[arrayIndex].CIMC_IP = serverObject.CIMC_IP;
                                $scope.serversobject.serverArray[arrayIndex].rackId = serverObject.rackId;
                                $scope.serversobject.serverArray[arrayIndex].role = serverObject.role;
                                $scope.serversobject.serverArray[arrayIndex].serverIndex = serverObject.serverIndex;
                                $scope.serversobject.serverArray[arrayIndex].bootDrive = serverObject.bootDrive;
                                $scope.serversobject.serverArray[arrayIndex].VICSlot = serverObject.VICSlot;
                                $scope.serversobject.serverArray[arrayIndex].CIMC_User_Name = serverObject.CIMC_User_Name;
                                $scope.serversobject.serverArray[arrayIndex].CIMC_Password = serverObject.CIMC_Password;
                                $("#serverPopup").modal("hide");
                                $scope.checkUserInputsForServers();
                            }
                        } else {
                            $scope.errMsg = "Please fill Required fields";
                        }
                    }
                }
            };

            $scope.addEmptyRowToTable = function () {
                $("#serverPopup").modal("show");
                $scope.currentAction = "Add";
                $scope.serverObj = {};

                $scope.$broadcast("ClearValidation");
                $scope.errMsg = "";
            };
            $scope.deleteSelectedRecords = function () {
                        $scope.popupText = "Are you sure you want to delete selected Servers?";
                $scope.isVisible = true;
                $scope.performTaskWaitaingForConfirmation = $scope.deleteSelectedMultipleNetworkFromTable;
            };
            $scope.deleteSelectedMultipleNetworkFromTable = function () {
                var selectedRecords = $scope.SelectionsrowforSERVER;
                for (var i in selectedRecords) {
                    for (var j in $scope.serversobject.serverArray) {
                        if ($scope.serversobject.serverArray[j].serverIndex == selectedRecords[i].serverIndex){
                            $scope.serversobject.serverArray.splice(j, 1);
                            $scope.checkUserInputsForServers();
                        }



                    }
                }
                  $scope.gridApi.selection.clearSelectedRows();
            };
            $scope.getSelectedforSERVER = function () {
                var selectedElem = [];
                for (var i = 0; i < $scope.serversobject.serverArray.length; i++) {
                    if ($scope.serversobject.serverArray[i].selected == true) {
                        selectedElem.push($scope.serversobject.serverArray[i]);
                    }
                }
                return selectedElem;
            };
            $scope.deleteServer = function (index, deleteObject) {
                $scope.CurrentNetworkId = deleteObject.entity.serverIndex;
                $scope.popupText = "Are you sure you want to delete the Server?";
                $scope.isVisible = true;
                $scope.performTaskWaitaingForConfirmation = $scope.deleteSelectedNetworkFromTable;
            };
            $scope.deleteSelectedNetworkFromTable = function () {
                for (var ind in $scope.serversobject.serverArray) {
                    if ($scope.serversobject.serverArray[ind].serverIndex == $scope.CurrentNetworkId) {
                        $scope.serversobject.serverArray.splice(ind, 1);
                        $scope.checkUserInputsForServers();
                    }
                }
            };
            $scope.changeActionToEdit = function (index, servObject) {

                var serverObject = servObject.entity;
                $scope.serverindex = serverObject.serverIndex;
                $scope.currentAction = "Edit";
                var bootDrive = "";


                $scope.serverObj = {
                    serverName: serverObject.serverName,
                    rackId: serverObject.rackId,
                    role: serverObject.role,
                    serverIndex: serverObject.serverIndex,
                    serverType: serverObject.serverType,
                    chasisId: serverObject.chasisId,
                    bladeId: serverObject.bladeId,
                    CIMC_IP: serverObject.CIMC_IP,
                    CIMC_User_Name: serverObject.CIMC_User_Name,
                    CIMC_Password: serverObject.CIMC_Password,
                    VICSlot: serverObject.VICSlot,
                    rackUnitId: serverObject.rackUnitId,
                    bootDrive :bootDrive
                };
                $("#serverPopup").modal("show");
                $scope.$broadcast("ClearValidation");
            };
            $scope.undoAddEdit = function (index) {
                if ($scope.currentAction === "Edit") {
                    for (var i in $scope.serversobject.serverArray) {
                        if ($scope.serversobject.serverArray[i].serverIndex == $scope.serversobject.serverArrayDummy[index].serverIndex) {
                            $scope.serversobject.serverArrayDummy[index].serverName = $scope.serversobject.serverArray[i].serverName;
                            $scope.serversobject.serverArrayDummy[index].rackId = $scope.serversobject.serverArray[i].rackId;
                            $scope.serversobject.serverArrayDummy[index].role = $scope.serversobject.serverArray[i].role;
                            $scope.serversobject.serverArrayDummy[index].serverIndex = $scope.serversobject.serverArrayDummy[i].serverIndex;
                            $scope.serversobject.serverArrayDummy[index].serverType = $scope.serversobject.serverArray[i].serverType;
                            $scope.serversobject.serverArrayDummy[index].chasisId = $scope.serversobject.serverArray[i].chasisId;
                            $scope.serversobject.serverArrayDummy[index].bladeId = $scope.serversobject.serverArray[i].bladeId;
                            $scope.serversobject.serverArrayDummy[index].rackUnitId = $scope.serversobject.serverArray[i].rackUnitId;
                            $scope.serversobject.serverArrayDummy[index].isVisible = false;
                        }
                    }
                }
                else {
                    $scope.serversobject.serverArrayDummy.splice(index, 1);
                }
            };
            $scope.$on('CephModeChange', function () {
                if ($scope.sharedobject.type == "B") {
                    if ($scope.sharedobject.cephMode == "Dedicated") {
                        $scope.rolesArray = $scope.rolesArrayBRack;
                    }
                    else {
                        $scope.rolesArray = $scope.rolesArrayBBlade;
                    }
                }
                else {
                    $scope.rolesArray = $scope.rolesArrayC;
                }
            });
            $scope.updateRolesArray = function (currentObject) {
                if ($scope.sharedobject.type == "B") {
                    if (currentObject.serverType == "blade") {
                        $scope.rolesArray = $scope.rolesArrayBBlade;
                    }
                    else {
                        $scope.rolesArray = $scope.rolesArrayBRack;
                    }
                }
                else {
                    $scope.rolesArray = $scope.rolesArrayC;
                }
            };

          /*  $scope.$on("reloadgrid",function(){
                $interval( function() {
                    $scope.gridApi.core.handleWindowResize();
                }, 500, 10);
            });*/
            $scope.$on(Events.CLEARFIELDSCALLED,function(){
                if($scope.serversobject.serverArray && $scope.serversobject.serverArray.length==0)
                    $scope.prepopulateFields();
                $scope.checkUserInputsForServers();
            });

        }])


}());