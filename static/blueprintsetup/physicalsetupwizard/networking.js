(function () {
    'use strict';
    angular.module('mercuryInstaller.blueprintSetup.physicalSetupWizard.networking', ['mercuryInstaller.utility', 'mercuryInstaller.widgets', 'ngAnimate', 'ngTouch', 'ui.grid', 'ui.grid.selection', 'ui.grid.exporter','mercuryInstaller.globals','ui.grid.autoResize','ui.grid.resizeColumns', 'ui.grid.moveColumns'])
            .controller('NetworkingCtrl', ['$scope', 'filterFilter', 'validateinputs', '$rootScope', '$interval','Events', function ($scope, filterFilter, validateinputs,
                        $rootScope, $interval,Events) {
                    $scope.gridOptionsForNTP = {
                        columnDefs: [
                            {field: 'name', displayName:'NTP server' ,name: 'NTP server',enableColumnResizing: false, cellTooltip:
                                        function (row, col) {
                                            return '' + row.entity.name + '';
                                        }},
                            {name: 'Action',
                                cellTemplate: '<button type="button" class="btn btn-md customcolorwhite setpaddingright" value="edit" ng-click="grid.appScope.editNTPserverName(grid, row)"><span class="glyphicon glyphicon-pencil"></span></button> <button type="button" class="btn customcolorwhite btn-md " ng-click="grid.appScope.deleteNTP(grid, row)" value="edit" title="Delete" ><span class="glyphicon glyphicon-remove"></span> </button> ', width: 100, enableSorting: false,enableColumnResizing: false }
                        ],
                        enableRowSelection: true,
                        enableGridMenu: false,
                        enableSelectAll: true,
                        onRegisterApi: function (gridApi) {
                            $scope.gridApiNTP = gridApi;
                            gridApi.selection.on.rowSelectionChanged($scope, function (rows) {
                                $scope.SelectionsrowforNTP = gridApi.selection.getSelectedRows();

                            });

                            gridApi.selection.on.rowSelectionChangedBatch($scope, function (rows) {
                                $scope.SelectionsrowforNTP = gridApi.selection.getSelectedRows();
                            });


                        }
                    };
                    $scope.gridOptionsForNTP.multiSelect = true;
                    $scope.gridOptionsForDNS = {
                        columnDefs: [
                            {field: 'name', displayName:'DNS server',name: 'DNS server',enableColumnResizing: false, cellTooltip:
                                        function (row, col) {
                                            return '' + row.entity.name + '';
                                        }},
                            {name: 'Action',
                                cellTemplate: '<button type="button" class="btn btn-md customcolorwhite setpaddingright" value="edit" ng-click="grid.appScope.editDNSserverName(grid, row)"><span class="glyphicon glyphicon-pencil"></span></button> <button type="button" class="btn customcolorwhite btn-md " ng-click="grid.appScope.deleteDNS(grid, row)" value="edit" title="Delete"><span class="glyphicon glyphicon-remove"></span> </button>', width: 100, enableSorting: false,enableColumnResizing: false}
                        ],
                        enableGridMenu: false,
                        enableSelectAll: true,
                        onRegisterApi: function (gridApi) {
                            $scope.gridApiDNS = gridApi;
                            gridApi.selection.on.rowSelectionChanged($scope, function (rows) {
                                $scope.SelectionsrowforDNS = gridApi.selection.getSelectedRows();

                            });

                            gridApi.selection.on.rowSelectionChangedBatch($scope, function (rows) {
                                $scope.SelectionsrowforDNS = gridApi.selection.getSelectedRows();
                            });

                        }
                    };

                    $scope.gridOptionsForHTTP = {
                        columnDefs: [
                            {field: 'name', displayName:'HTTP server', name: 'HTTP server',enableColumnResizing: false, cellTooltip:
                                        function (row, col) {
                                            return '' + row.entity.name + '';
                                        }},
                            {name: 'Action',
                                cellTemplate: '<button type="button" class="btn btn-md customcolorwhite setpaddingright" value="edit" ng-click="grid.appScope.editHTTPserverName(grid, row)"><span class="glyphicon glyphicon-pencil"></span></button> <button type="button" class="btn customcolorwhite btn-md " ng-click="grid.appScope.deleteHTTP(grid, row)" value="edit" title="Delete"><span class="glyphicon glyphicon-remove"></span> </button> ', width: 100,enableSorting: false,enableColumnResizing: false}
                        ],
                        enableGridMenu: false,
                        enableSelectAll: true,
                        onRegisterApi: function (gridApi) {
                            $scope.gridApiHTTP = gridApi;
                            gridApi.selection.on.rowSelectionChanged($scope, function (rows) {
                                $scope.SelectionsrowforHTTP = gridApi.selection.getSelectedRows();

                            });

                            gridApi.selection.on.rowSelectionChangedBatch($scope, function (rows) {
                                $scope.SelectionsrowforHTTP = gridApi.selection.getSelectedRows();
                            });

                        }
                    };

                    $scope.gridOptionsForHTTPS = {
                        columnDefs: [
                            {field: 'name', displayName:'HTTPS server', name: 'HTTPS server',enableColumnResizing: false, cellTooltip:
                                        function (row, col) {
                                            return '' + row.entity.name + '';
                                        }},
                            {name: 'Action',
                                cellTemplate: '<button type="button" class="btn btn-md customcolorwhite setpaddingright" value="edit" ng-click="grid.appScope.editHTTPSserverName(grid, row)"><span class="glyphicon glyphicon-pencil"></span></button> <button type="button" class="btn customcolorwhite btn-md " ng-click="grid.appScope.deleteHTTPS(grid, row)" value="edit" title="Delete"><span class="glyphicon glyphicon-remove"></span> </button> ', width: 100,enableSorting: false,enableColumnResizing: false}
                        ],
                        enableGridMenu: false,
                        enableSelectAll: true,
                        onRegisterApi: function (gridApi) {
                            $scope.gridApiHTTPS = gridApi;
                            gridApi.selection.on.rowSelectionChanged($scope, function (rows) {
                                $scope.SelectionsrowforHTTPS = gridApi.selection.getSelectedRows();

                            });

                            gridApi.selection.on.rowSelectionChangedBatch($scope, function (rows) {
                                $scope.SelectionsrowforHTTPS = gridApi.selection.getSelectedRows();
                            });
                            /*$interval( function() {
                                $scope.gridApi.core.handleWindowResize();
                            }, 300, 10);*/
                        }
                    };

                    $scope.gridOptionsForNETWORKING = {

                        hideHeader: true,
                        enableGridMenu: true,
                        enableSelectAll: true,
                        exporterMenuPdf: false,
                        exporterMenuCsv:false,
                        onRegisterApi: function (gridApi) {
                            $scope.gridApiNETWORKS = gridApi;
                            gridApi.selection.on.rowSelectionChanged($scope, function (rows) {
                                $scope.SelectionsrowforNETWORKING = gridApi.selection.getSelectedRows();

                            });

                            gridApi.selection.on.rowSelectionChangedBatch($scope, function (rows) {
                                $scope.SelectionsrowforNETWORKING = gridApi.selection.getSelectedRows();
                            });
                            /*$interval( function() {
                                $scope.gridApi.core.handleWindowResize();
                            }, 300, 10);*/
                        }
                    };

                    $scope.$watch(function(){
                        return $scope.sharedobject.type;
                    },function(){
                        if($scope.sharedobject.type == 'B'){
                            $scope.gridOptionsForNETWORKING.columnDefs  = [
                                {field: 'vlanInput', name: 'VLAN', cellTooltip:
                                    function (row, col) {
                                        return '' + row.entity.vlanInput + '';
                                    }},
                                {field: 'segmentInput', name: 'Segment', cellTooltip:
                                    function (row, col) {
                                        return '' + row.entity.segmentInput + '';
                                    }},
                                {field: 'SubwayInput', name: 'Subnet', cellTooltip:
                                    function (row, col) {
                                        return '' + row.entity.SubwayInput + '';
                                    }},
                                {field: 'gatwayInput', name: 'Gateway', cellTooltip:
                                    function (row, col) {
                                        return '' + row.entity.gatwayInput + '';
                                    }},
                                {field: 'buildNode', name: 'Build Node', cellTooltip:
                                    function (row, col) {
                                        return '' + row.entity.buildNode + '';
                                    }},
                                {field: 'pool', name: 'Pool', cellTooltip:
                                    function (row, col) {
                                        return '' + row.entity.pool + '';
                                    }},
                                {name: 'Action',
                                    cellTemplate: '<button type="button" class="btn btn-md customcolorwhite setpaddingright" value="edit" ng-click="grid.appScope.editNETWORKINGserverName(grid, row)"><span class="glyphicon glyphicon-pencil"></span></button> <button type="button" class="btn customcolorwhite btn-md " ng-click="grid.appScope.deleteNETWORKING(grid, row)" value="edit" title="Delete"><span class="glyphicon glyphicon-remove"></span> </button> ', width: 100,enableSorting: false,enableColumnResizing: false}
                            ];
                        }else{
                            $scope.gridOptionsForNETWORKING.columnDefs  = [
                                {field: 'vlanInput', name: 'VLAN', cellTooltip:
                                    function (row, col) {
                                        return '' + row.entity.vlanInput + '';
                                    }},
                                {field: 'segmentInput', name: 'Segment', cellTooltip:
                                    function (row, col) {
                                        return '' + row.entity.segmentInput + '';
                                    }},
                                {field: 'SubwayInput', name: 'Subnet', cellTooltip:
                                    function (row, col) {
                                        return '' + row.entity.SubwayInput + '';
                                    }},
                                {field: 'gatwayInput', name: 'Gateway', cellTooltip:
                                    function (row, col) {
                                        return '' + row.entity.gatwayInput + '';
                                    }},
                                {field: 'buildNode', name: 'Build Node', cellTooltip:
                                    function (row, col) {
                                        return '' + row.entity.buildNode + '';
                                    }},
                                {field: 'pool', name: 'Pool', cellTooltip:
                                    function (row, col) {
                                        return '' + row.entity.pool + '';
                                    }},
                                {field: 'defroute', name: 'Default Route', cellTooltip:
                                    function (row, col) {
                                        return '' + row.entity.defroute + '';
                                    }},
                                {name: 'Action',
                                    cellTemplate: '<button type="button" class="btn btn-md customcolorwhite setpaddingright" value="edit" ng-click="grid.appScope.editNETWORKINGserverName(grid, row)"><span class="glyphicon glyphicon-pencil"></span></button> <button type="button" class="btn customcolorwhite btn-md " ng-click="grid.appScope.deleteNETWORKING(grid, row)" value="edit" title="Delete"><span class="glyphicon glyphicon-remove"></span> </button> ', width: 100,enableSorting: false,enableColumnResizing: false}
                            ];
                        }
                    });


                    $scope.pools = [''];
                    $scope.pools.push({});
                    $scope.currentAction = "Add";
                    $scope.currentAction1 = "Add";
                    $scope.currentAction2 = "Add";
                    $scope.currentAction3 = "Add";
                    $scope.currentAction4 = "Add"
                    $scope.isInputValid = true;
                    $scope.validateFields = true;
                    $scope.currentNetworkId = -1;
                    $scope.isVisible = false;
                    $scope.countIdforNTP = 0;
                    $scope.countIdforDNS = 0;
                    $scope.countIdforHTTP = 0;
                    $scope.countIdforHTTPS = 0;

                    $scope.onProceed = function () {
                        $scope.isVisible = false;
                        $scope.performTaskWaitaingForConfirmation();
                    };
                    $scope.onCancel = function () {
                        $scope.isVisible = false;
                        $scope.actionsTobeTakenToRevert();
                    };
                    $scope.multiSelect = {
                        selected: [],
                        optionArray: $scope.platformtype == 'B' ? ['CIMC', 'API', 'Management', 'Provision', 'Tenant', 'Storage', 'External', 'Provider'] : [
                            'API', 'Management/Provision', 'Tenant', 'Storage', 'External', 'Provider'
                        ]
                    };

                    $scope.isCSeries = function () {
                        return $scope.platformtype == 'C';
                    };
                    $("#ntpServer").modal({
                        backdrop: 'static',
                        show: false
                    });

                    $('#DNSServer').modal({
                        backdrop: 'static',
                        show: false
                    });

                    $('#HTTPServer').modal({
                        backdrop: 'static',
                        show: false
                    });

                    $('#HTTPsServer').modal({
                        backdrop: 'static',
                        show: false
                    });

                    $("#addEditNetworks").modal({
                        backdrop: 'static',
                        show: false
                    });

                $scope.NetworkingDetail = {
                    vlanInput : "",
                    segmentInput : ""

                };
                    $scope.checkAllntp = function () {
                        if ($scope.selectedAllntp) {
                            $scope.selectedAllntp = true;
                        } else {
                            $scope.selectedAllntp = false;
                        }

                        angular.forEach($scope.networkconf.ntp_servers, function (serverName) {
                            serverName.selected = $scope.selectedAllntp;
                        });
                    },
                            $scope.checkAlldns = function () {
                                if ($scope.selectedAlldns) {
                                    $scope.selectedAlldns = true;
                                } else {
                                    $scope.selectedAlldns = false;
                                }

                                angular.forEach($scope.networkconf.domain_name_servers, function (domainname) {
                                    domainname.selected = $scope.selectedAlldns;
                                });
                            },
                            $scope.checkAllhttp = function () {
                                if ($scope.selectedAllhttp) {
                                    $scope.selectedAllhttp = true;
                                } else {
                                    $scope.selectedAllhttp = false;
                                }

                                angular.forEach($scope.networkconf.http_proxy_servers, function (httpProxy) {
                                    httpProxy.selected = $scope.selectedAllhttp;
                                });
                            },
                            $scope.checkAllhttps = function () {
                                if ($scope.selectedAllhttps) {
                                    $scope.selectedAllhttps = true;
                                } else {
                                    $scope.selectedAllhttps = false;
                                }

                                angular.forEach($scope.networkconf.https_proxy_servers, function (httpsProxy) {
                                    httpsProxy.selected = $scope.selectedAllhttps;
                                });
                            },
                            $scope.prepopulateFields = function () {
                                $scope.populatedfiledID = -1;
                                var optionArray = $scope.sharedobject.type == 'B' ? ['cimc', 'api', 'management/provision', 'tenant', 'storage', 'external', 'provider'] : ['api', 'management/provision', 'tenant', 'storage', 'external', 'provider'];
                                for (var i = 0; i < optionArray.length; i++) {
                                    var vlan = "";
                                    if($scope.sharedobject.tenantNetwork=="OVS/VLAN" && optionArray[i]=="tenant"){
                                        vlan = "None";
                                    }
                                    if($scope.sharedobject.type=="C" && optionArray[i] == "provider"){
                                        vlan = "None";
                                    }
                                    if($scope.sharedobject.type=="B" && $scope.sharedobject.enableUCSMPlugin &&optionArray[i] == "provider"){
                                        vlan = "None";
                                    }
                                    $scope.populatedfiledID++;
                                    $scope.networkconf.networks.push({
                                        selected: false,
                                        vlanInput: vlan,
                                        segmentInput: optionArray[i],
                                        SubwayInput: '',
                                        gatwayInput: '',
                                        pool: '',
                                        networkId: $scope.populatedfiledID,
                                        defroute: false
                                    });
                                }

                            };
                    $scope.checkForSegmentType = function(NetworkingDetail){
                        if(NetworkingDetail.segmentInput.indexOf('tenant')!=-1 && $scope.sharedobject.tenantNetwork=="OVS/VLAN"){

                            return true;
                        }else if(NetworkingDetail.segmentInput.indexOf('provider')!==-1 && $scope.sharedobject.type=="C"){

                            return true;
                        }else if($scope.NetworkingDetail.segmentInput.indexOf('provider')!==-1 && $scope.sharedobject.type=="B" && $scope.sharedobject.enableUCSMPlugin){
                           return true;
                        }else{
                            return false;
                        }
                    };

                    $scope.$watch(function () {
                        return $scope.sharedobject.type;
                    }, function () {
                        if($scope.networkconf.networks && $scope.networkconf.networks.length==0){
                            $scope.prepopulateFields();
                        }

                    });

                    $scope.$watch(function(){
                        return $scope.NetworkingDetail.segmentInput;
                    },function(oldVal,newVal){
                        if($scope.NetworkingDetail.segmentInput.indexOf('tenant')!==-1 && $scope.sharedobject.tenantNetwork=="OVS/VLAN"){
                            $scope.NetworkingDetail.vlanInput = "None";
                        }else if($scope.NetworkingDetail.segmentInput.indexOf('provider')!==-1 && $scope.sharedobject.type=="C"){
                            $scope.NetworkingDetail.vlanInput = "None";
                        }else if($scope.NetworkingDetail.segmentInput.indexOf('provider')!==-1 && $scope.sharedobject.type=="B" && $scope.sharedobject.enableUCSMPlugin){
                            $scope.NetworkingDetail.vlanInput = "None";
                        }
                    });

                    $scope.$watch(function(){
                        return $scope.sharedobject.tenantNetwork;
                    },function(){
                        if($scope.NetworkingDetail.segmentInput.indexOf('tenant')!==-1 && $scope.sharedobject.tenantNetwork=="OVS/VLAN"){
                            $scope.NetworkingDetail.vlanInput = "None";
                        }else if($scope.NetworkingDetail.segmentInput.indexOf('provider')!==-1 && $scope.sharedobject.type=="C"){
                            $scope.NetworkingDetail.vlanInput = "None";
                        }else if($scope.NetworkingDetail.segmentInput.indexOf('provider')!==-1 && $scope.sharedobject.type=="B" && $scope.sharedobject.enableUCSMPlugin){
                            $scope.NetworkingDetail.vlanInput = "None";
                        }
                    });

                    $scope.$watch(function(){
                        return $scope.sharedobject.enableUCSMPlugin;
                    },function(){
                        if($scope.NetworkingDetail.segmentInput.indexOf('tenant')!==-1 && $scope.sharedobject.tenantNetwork=="OVS/VLAN"){
                            $scope.NetworkingDetail.vlanInput = "None";
                        }else if($scope.NetworkingDetail.segmentInput.indexOf('provider')!==-1 && $scope.sharedobject.type=="C"){
                            $scope.NetworkingDetail.vlanInput = "None";
                        }else if($scope.NetworkingDetail.segmentInput.indexOf('provider')!==-1 && $scope.sharedobject.type=="B" && $scope.sharedobject.enableUCSMPlugin){
                            $scope.NetworkingDetail.vlanInput = "None";
                        }
                    });


                    $scope.$on("CephModeChange", function () {
                        if($scope.networkconf.networks && $scope.networkconf.networks.length==0) {
                            $scope.prepopulateFields();
                        }
                    });

                    $scope.$on("TenantNWChanged",function(){
                        if($scope.networkconf.networks && $scope.networkconf.networks.length==0) {
                            $scope.prepopulateFields();
                        }
                    });

                    $scope.addPool = function () {

                    };

                    $scope.checkUserInputsForNetworking = function () {
                        if ($scope.networkconf.domain_name != "" && $scope.networkconf.ntp_servers.length >= 1 && $scope.networkconf.ntp_servers.length <= 4 && $scope.networkconf.domain_name_servers
                                .length >= 1 && $scope.networkconf.domain_name_servers.length <= 3 && $scope.networkconf.networks.length != 0) {
                            $scope.networkconf.isNetworkValidated = true;
                        }
                        else
                            $scope.networkconf.isNetworkValidated = false;
                    };

                    $scope.$on('ValidateAfterUpload', function () {
                        $scope.checkUserInputsForNetworking();
                    });

                    $scope.deleteMultipleSelectedNTPFromTable = function () {
                        var selectedRecords = $scope.SelectionsrowforNTP;
                        for (var i in selectedRecords) {
                            for (var j in $scope.networkconf.ntp_servers) {
                                if ($scope.networkconf.ntp_servers[j].id == selectedRecords[i].id) {
                                    $scope.networkconf.ntp_servers.splice(j, 1);
                                    $scope.ntpFlag = $scope.ntpFlag - 1;
                                    $scope.checkUserInputsForNetworking();
                                }
                            }
                        }
                         $scope.gridApiNTP.selection.clearSelectedRows();
                    };

                    $scope.deleteMultipleSelectedDNSFromTable = function () {
                        var selectedRecords = $scope.SelectionsrowforDNS;
                        for (var i in selectedRecords) {
                            for (var j in $scope.networkconf.domain_name_servers) {
                                if ($scope.networkconf.domain_name_servers[j].id == selectedRecords[i].id)
                                    $scope.networkconf.domain_name_servers.splice(j, 1);
                                $scope.dnsFlag = $scope.dnsFlag -1;
                                $scope.checkUserInputsForNetworking();
                            }
                        }
                        $scope.gridApiDNS.selection.clearSelectedRows();
                    };

                    $scope.deleteMultipleSelectedHTTPFromTable = function () {
                        var selectedRecords = $scope.SelectionsrowforHTTP;
                        for (var i in selectedRecords) {
                            for (var j in $scope.networkconf.http_proxy_servers) {
                                if ($scope.networkconf.http_proxy_servers[j].id == selectedRecords[i].id){
                                    $scope.networkconf.http_proxy_servers.splice(j, 1);
                                    $scope.checkUserInputsForNetworking();
                                }

                            }
                        }
                        $scope.gridApiHTTP.selection.clearSelectedRows();
                    };

                    $scope.deleteMultipleSelectedHTTPSFromTable = function () {
                        var selectedRecords = $scope.SelectionsrowforHTTPS;
                        for (var i in selectedRecords) {
                            for (var j in $scope.networkconf.https_proxy_servers) {
                                if ($scope.networkconf.https_proxy_servers[j].id == selectedRecords[i].id) {
                                    $scope.networkconf.https_proxy_servers.splice(j, 1);
                                    $scope.checkUserInputsForNetworking();
                                }
                            }
                        }
                        $scope.gridApiHTTPS.selection.clearSelectedRows();
                    };

                    $scope.deleteMultipleSelectedNETWORKINGFromTable = function () {
                        var selectedRecords = $scope.SelectionsrowforNETWORKING;
                        for (var i in selectedRecords) {
                            for (var j in $scope.networkconf.networks) {
                                if ($scope.networkconf.networks[j].networkId == selectedRecords[i].networkId) {
                                    $scope.networkconf.networks.splice(j, 1);
                                    $scope.checkUserInputsForNetworking();
                                }
                            }
                        }
                        $scope.gridApiNETWORKS.selection.clearSelectedRows();
                        $scope.checkForExternalAndProvider();
                    };

                    $scope.checkStatusforNTP = function () {

                        if (typeof ($scope.SelectionsrowforNTP) == 'undefined') {
                            return true;
                        } else if (typeof ($scope.SelectionsrowforNTP) == 'object') {

                            if ($scope.SelectionsrowforNTP.length == 0) {
                                return true;
                            } else {
                                return false;
                            }
                        } else {
                            return true;
                        }

                    };

                    $scope.checkStatusforDNS = function () {
                        if (typeof ($scope.SelectionsrowforDNS) == 'undefined') {
                            return true;
                        } else if (typeof ($scope.SelectionsrowforDNS) == 'object') {

                            if ($scope.SelectionsrowforDNS.length == 0) {
                                return true;
                            } else {
                                return false;
                            }
                        } else {
                            return true;
                        }
                    };

                    $scope.checkStatusforHTTP = function () {
                        if (typeof ($scope.SelectionsrowforHTTP) == 'undefined') {
                            return true;
                        } else if (typeof ($scope.SelectionsrowforHTTP) == 'object') {

                            if ($scope.SelectionsrowforHTTP.length == 0) {
                                return true;
                            } else {
                                return false;
                            }
                        } else {
                            return true;
                        }
                    };

                    $scope.checkStatusforHTTPS = function () {
                        if (typeof ($scope.SelectionsrowforHTTPS) == 'undefined') {
                            return true;
                        } else if (typeof ($scope.SelectionsrowforHTTPS) == 'object') {

                            if ($scope.SelectionsrowforHTTPS.length == 0) {
                                return true;
                            } else {
                                return false;
                            }
                        } else {
                            return true;
                        }
                    };

                    $scope.checkStatusforNETWORKING = function () {
                        if (typeof ($scope.SelectionsrowforNETWORKING) == 'undefined') {
                            return true;
                        } else if (typeof ($scope.SelectionsrowforNETWORKING) == 'object') {

                            if ($scope.SelectionsrowforNETWORKING.length == 0) {
                                return true;
                            } else {
                                return false;
                            }
                        } else {
                            return true;
                        }
                    };

                    $scope.deleteserverNameNTP = function () {
                        $scope.popupText = "Are you sure you want to delete selected NTP Servers?";
                        $scope.isVisible = true;
                        $scope.performTaskWaitaingForConfirmation = $scope.deleteMultipleSelectedNTPFromTable;
                        $scope.actionsTobeTakenToRevert = function(){};
                    };

                    $scope.deleteserverNameDNS = function () {
                        $scope.popupText = "Are you sure you want to delete selected DNS Servers?";
                        $scope.isVisible = true;
                        $scope.performTaskWaitaingForConfirmation = $scope.deleteMultipleSelectedDNSFromTable;
                        $scope.actionsTobeTakenToRevert = function(){};
                    };

                    $scope.deleteserverNameHTTP = function () {
                        $scope.popupText = "Are you sure you want to delete selected HTTP Servers?";
                        $scope.isVisible = true;
                        $scope.performTaskWaitaingForConfirmation = $scope.deleteMultipleSelectedHTTPFromTable;
                        $scope.actionsTobeTakenToRevert = function(){};
                    };

                    $scope.deleteserverNameHTTPS = function () {
                        $scope.popupText = "Are you sure you want to delete selected HTTPS Servers?";
                        $scope.isVisible = true;
                        $scope.performTaskWaitaingForConfirmation = $scope.deleteMultipleSelectedHTTPSFromTable;
                        $scope.actionsTobeTakenToRevert = function(){};
                    };

                    $scope.deleteserverNameNETWORKING = function () {
                        $scope.popupText = "Are you sure you want to delete selected Networks?";
                        $scope.isVisible = true;
                        $scope.performTaskWaitaingForConfirmation = $scope.deleteMultipleSelectedNETWORKINGFromTable;
                        $scope.actionsTobeTakenToRevert = function(){};
                    };



                    $scope.editNTPserverName = function (name, serverObj) {
                        $("#ntpServer").modal("show");
                        $scope.$broadcast("ClearValidation");
                        $scope.serverName.name = serverObj.entity.name;
                        $scope.currentAction = "Edit";
                        $scope.currentActionID = serverObj.entity.id;
                        $scope.addEditNTPServer = "Edit NTP Server";
                        $scope.addEditNTPError = "";
                    };

                    $scope.editDNSserverName = function (name, serverObj) {
                        $('#DNSServer').modal("show");
                        $scope.$broadcast("ClearValidation");
                        $scope.domainname.name = serverObj.entity.name;
                        $scope.currentAction = "Edit";
                        $scope.currentActionID = serverObj.entity.id;
                        $scope.addEditDNSServer = "Edit Domain Name Server";
                        $scope.addEditDNSError = "";
                    };

                    $scope.editHTTPserverName = function (name, serverObj) {
                        $('#HTTPServer').modal("show");
                        $scope.$broadcast("ClearValidation");
                        $scope.httpProxy.name = serverObj.entity.name;
                        $scope.currentAction = "Edit";
                        $scope.currentActionID = serverObj.entity.id;
                        $scope.addEditHTTPProxy = "Edit HTTP Proxy";
                        $scope.addEditHTTPError = "";
                    };

                    $scope.editHTTPSserverName = function (name, serverObj) {
                        $('#HTTPsServer').modal("show");
                        $scope.$broadcast("ClearValidation");
                        $scope.httpsProxy.name = serverObj.entity.name;
                        $scope.currentAction = "Edit";
                        $scope.currentActionID = serverObj.entity.id;
                        $scope.addEditHTTPSServer = "Edit HTTPS Proxy";
                        $scope.addEditHTTPSError = "";
                    };

                    $scope.editNETWORKINGserverName = function (name, serverObj) {
                        //  $('#addEditNetworks').modal();
                        $scope.httpsProxy.name = serverObj.entity.name;
                        $scope.currentActionName = "Edit Network";
                        $scope.addEditErrorMsg = "";
                        $scope.NetworkingDetail = {
                            vlanInput: serverObj.entity.vlanInput,
                            SubwayInput: serverObj.entity.SubwayInput,
                            gatwayInput: serverObj.entity.gatwayInput,
                            pool: serverObj.entity.pool,
                            segmentInput: serverObj.entity.segmentInput,
                            networkId:serverObj.entity.networkId,
                            defroute : serverObj.entity.defroute
                        };
                        $scope.CurrentNetworkId = serverObj.entity.networkId;
                        $scope.currentAction4 = "Edit";
                        $("#addEditNetworks").modal("show");
                        $scope.$broadcast("ClearValidation");
                        $scope.addEditErrorMsg = "";
                    };

                    $scope.addntpdetails = function () {
                        $scope.currentAction = 'Add';
                        $("#ntpServer").modal("show");
                        $scope.$broadcast("ClearValidation");
                        $scope.serverName.name = '';
                        $scope.addEditNTPServer = "Add NTP Server";
                        $scope.addEditNTPError = "";
                    };

                    $scope.adddnsdetails = function () {
                        $scope.currentAction = 'Add';
                        $('#DNSServer').modal("show");
                        $scope.$broadcast("ClearValidation");
                        $scope.domainname.name = '';
                        $scope.addEditDNSServer = "Add Domain Name Server";
                        $scope.addEditDNSError = "";
                    };

                    $scope.addhttpdetails = function () {
                        $scope.currentAction = 'Add';
                        $('#HTTPServer').modal("show");
                        $scope.$broadcast("ClearValidation");
                        $scope.httpProxy.name = '';
                        $scope.addEditHTTPProxy = "Add HTTP Proxy";
                        $scope.addEditHTTPError = "";
                    };

                    $scope.addhttpsproxydetails = function () {
                        $scope.currentAction = 'Add';
                        $('#HTTPsServer').modal("show");
                        $scope.$broadcast("ClearValidation");
                        $scope.httpsProxy.name = '';
                        $scope.addEditHTTPSServer = "Add HTTPS Proxy";
                        $scope.addEditHTTPSError = "";
                    };

                    $scope.addnwdetails = function () {
                        $('#addEditNetworks').modal("show");
                        $scope.$broadcast("ClearValidation");
                        $scope.addEditErrorMsg = "";
                        $scope.currentActionName = "Add Network";
                        $scope.addEditErrorMsg = "";
                        $scope.currentAction4 = "Add";
                        $scope.NetworkingDetail = {
                            segmentInput : "",
                            vlanInput : "",
                            SubwayInput :"",
                            gatwayInput :"",
                            pool : ""

                        };
                    };
                    $scope.ntpFlag = 1;
                $scope.dnsFlag = 1;



                    $scope.$watch(function () {
                        return  $scope.networkconf.ntp_servers;
                    }, function () {
                        $scope.gridOptionsForNTP.data = $scope.networkconf.ntp_servers;
                        //$scope.gridApi.core.handleWindowResize();


                    });
                   /* $scope.$on("reloadgrid",function(){
                        $interval( function() {
                            $(window).trigger('resize')
                        }, 500, 10);
                    }); */
                    $scope.$watch(function () {
                        return  $scope.networkconf.domain_name_servers;
                    }, function () {
                        $scope.gridOptionsForDNS.data = $scope.networkconf.domain_name_servers;
                    });

                    $scope.$watch(function () {
                        return  $scope.networkconf.http_proxy_servers;
                    }, function () {
                        $scope.gridOptionsForHTTP.data = $scope.networkconf.http_proxy_servers;
                    });

                    $scope.$watch(function () {
                        return  $scope.networkconf.https_proxy_servers;
                    }, function () {
                        $scope.gridOptionsForHTTPS.data = $scope.networkconf.https_proxy_servers;
                    });

                    $scope.$watch(function () {
                        return  $scope.networkconf.networks;
                    }, function () {
                        $scope.gridOptionsForNETWORKING.data = $scope.networkconf.networks;
                    });
                    $scope.populatedfiledID = $scope.networkconf.networks.length-1;

                    $scope.$watch(function(){
                        return $scope.networkconf.networks;
                    },function(){
                        $scope.populatedfiledID = $scope.networkconf.networks.length-1;
                    });

                    $scope.Saventpdetails = function (serverName) {
                        $scope.$broadcast("KickOffValidationForPopup");
                        if ($scope.currentAction == 'Add') {

                                if ($scope.serverName && validateinputs.validateIPorFQDN($scope.serverName.name)) {
                                    if ($scope.networkconf.ntp_servers.length != 0) {
                                        $scope.countIdforNTP = $scope.networkconf.ntp_servers.length;
                                        $scope.ntpFlag = $scope.networkconf.ntp_servers.length + 1;
                                        $scope.networkconf.ntp_servers.push({
                                            'name': $scope.serverName.name,
                                            'id': $scope.countIdforNTP++
                                        });
                                    } else {
                                        $scope.networkconf.ntp_servers.push({
                                            'name': $scope.serverName.name,
                                            'id': $scope.countIdforNTP++
                                        });
                                    }

                                    //  $scope.gridOptionsForNTP.data = $scope.networkconf.ntp_servers;
                                    $scope.ntpFlag++;
                                    $scope.addEditNTPError = "";
                                    $("#ntpServer").modal("hide");
                                    $scope.checkUserInputsForNetworking();

                                } else {
                                    $scope.addEditNTPError = "Please fill the required field";
                                }


                        }
                        else {
                            if ($scope.serverName && validateinputs.validateIPorFQDN($scope.serverName.name)) {
                                $scope.networkconf.ntp_servers[$scope.currentActionID].name = $scope.serverName.name;
                                $scope.currentAction = 'Add';
                                $scope.addEditNTPError = "";
                                $("#ntpServer").modal("hide");
                                $scope.checkUserInputsForNetworking();

                            } else {
                                $scope.addEditNTPError = "Please fill the required field";
                            }


                        }
                    };

                    $scope.Savednsdetails = function (domainname) {
                        $scope.$broadcast("KickOffValidationForPopup");
                        if ($scope.currentAction == 'Add') {

                            if ($scope.domainname && validateinputs.validateIPorFQDN($scope.domainname.name)) {
                                if ($scope.networkconf.domain_name_servers.length != 0) {
                                    $scope.countIdforDNS = $scope.networkconf.domain_name_servers.length;
                                        $scope.dnsFlag = $scope.networkconf.domain_name_servers.length + 1;
                                    $scope.networkconf.domain_name_servers.push({
                                        'name': $scope.domainname.name,
                                        'id': $scope.countIdforDNS++
                                    });
                                } else {
                                    $scope.networkconf.domain_name_servers.push({
                                        'name': $scope.domainname.name,
                                        'id': $scope.countIdforDNS++
                                    });
                                }
                                // $scope.gridOptionsForDNS.data = $scope.networkconf.domain_name_servers;
                                    $scope.dnsFlag++;
                                $scope.addEditDNSError = "";
                                $("#DNSServer").modal("hide");
                                $scope.checkUserInputsForNetworking();

                            } else {
                                $scope.addEditDNSError = "Please fill the required fields";
                            }

                        }
                        else {
                            if ($scope.domainname && validateinputs.validateIPorFQDN($scope.domainname.name)) {
                                $scope.networkconf.domain_name_servers[$scope.currentActionID].name = $scope.domainname.name;
                                $scope.currentAction = 'Add';
                                $("#DNSServer").modal("hide");
                                $scope.checkUserInputsForNetworking();
                                $scope.addEditDNSError = "";

                            } else {
                                $scope.addEditDNSError = "Please fill the required fields";
                            }

                        }
                    };

                    $scope.Savehttpdetails = function (httpProxy) {
                        $scope.$broadcast("KickOffValidationForPopup");
                        if ($scope.currentAction == 'Add') {
                            if ($scope.httpProxy && validateinputs.validateProxy($scope.httpProxy.name)) {
                                if ($scope.networkconf.http_proxy_servers.length != 0) {
                                    $scope.countIdforHTTP = $scope.networkconf.http_proxy_servers.length;
                                    $scope.networkconf.http_proxy_servers.push({
                                        'name': $scope.httpProxy.name,
                                        'id': $scope.countIdforHTTP++
                                    });
                                } else {
                                    $scope.networkconf.http_proxy_servers.push({
                                        'name': $scope.httpProxy.name,
                                        'id': $scope.countIdforHTTP++
                                    });
                                }
                                $("#HTTPServer").modal("hide");
                                $scope.addEditHTTPError = "";
                                $scope.checkUserInputsForNetworking();
                            } else {
                                $scope.addEditHTTPError = "Please fill the required fields";
                            }

                        }
                        else {
                            if ($scope.httpProxy && validateinputs.validateProxy($scope.httpProxy.name)) {
                                $scope.networkconf.http_proxy_servers[$scope.currentActionID].name = $scope.httpProxy.name;
                                $scope.currentAction = 'Add';
                                $("#HTTPServer").modal("hide");
                                $scope.checkUserInputsForNetworking();
                                $scope.addEditHTTPError = "";
                            } else {
                                $scope.addEditHTTPError = "Please fill the required fields";
                            }

                        }
                    };

                    $scope.Savehttpsproxydetails = function (httpsProxy) {
                        $scope.$broadcast("KickOffValidationForPopup");
                        if ($scope.currentAction == 'Add') {
                            if ($scope.httpsProxy && validateinputs.validateProxy($scope.httpsProxy.name)) {
                                if ($scope.networkconf.https_proxy_servers != 0) {
                                    $scope.countIdforHTTPS = $scope.networkconf.https_proxy_servers.length;
                                    $scope.networkconf.https_proxy_servers.push({
                                        'name': $scope.httpsProxy.name,
                                        'id': $scope.countIdforHTTPS++
                                    });
                                } else {
                                    $scope.networkconf.https_proxy_servers.push({
                                        'name': $scope.httpsProxy.name,
                                        'id': $scope.countIdforHTTPS++
                                    });
                                }
                                $scope.addEditHTTPSError = "";
                                $("#HTTPsServer").modal("hide");
                                $scope.checkUserInputsForNetworking();
                            } else {
                                $scope.addEditHTTPSError = "Please fill the required fields";
                            }

                        }
                        else {
                            if ($scope.httpsProxy && validateinputs.validateProxy($scope.httpsProxy.name)) {
                                $scope.networkconf.https_proxy_servers[$scope.currentActionID].name = $scope.httpsProxy.name;
                                $scope.currentAction = 'Add';
                                $scope.addEditHTTPSError = "";
                                $("#HTTPsServer").modal("hide");
                                $scope.checkUserInputsForNetworking();
                            } else {
                                $scope.addEditHTTPSError = "Please fill the required fields";
                            }

                        }
                    };

                    $scope.setProviderValueInSharedObject = function () {
                        for (var i in $scope.networkconf.networks) {
                            if ($scope.networkconf.networks[i].segmentInput.indexOf("provider") != -1) {
                                $scope.sharedobject.isProvider = true;
                                break;
                            }
                            else {
                                $scope.sharedobject.isProvider = false;
                            }
                        }
                    };

                    $scope.setExternalValueInSharedObject = function () {
                        for (var i in $scope.networkconf.networks) {
                            if ($scope.networkconf.networks[i].segmentInput.indexOf("external") != -1) {
                                $scope.sharedobject.isExternal = true;
                                break;
                            }
                            else {
                                $scope.sharedobject.isExternal = false;
                            }
                            //break;
                        }
                    };

                    $scope.checkForExternalAndProvider = function () {
                        $scope.setExternalValueInSharedObject();
                        $scope.setProviderValueInSharedObject();
                    };

                $scope.checkIfSegmentAlreadyExists = function (networkObj) {

                    var selectedSegArray = networkObj.segmentInput ? networkObj.segmentInput.split(","):[];
                    for(var j in selectedSegArray){
                        for (var i in $scope.networkconf.networks) {
                            var segments = $scope.networkconf.networks[i].segmentInput.split(",");
                            if(segments.indexOf(selectedSegArray[j])!=-1){
                                if($scope.currentAction4 == "Add"){
                                    return true;
                                }else{
                                    if(networkObj.networkId != $scope.networkconf.networks[i].networkId){
                                        return true;
                                    }
                                }

                            }
                        }
                    }

                    return false;
                };

                $scope.checkNetworksInput = function(NetworkingDetail){
                    var isValid = true;
                    if (NetworkingDetail.vlanInput && NetworkingDetail.segmentInput && NetworkingDetail.vlanInput != "" && NetworkingDetail.segmentInput != "") {
                        if (NetworkingDetail.segmentInput.indexOf("api") == -1 && NetworkingDetail.segmentInput.indexOf("external") == -1 && NetworkingDetail.segmentInput.indexOf("provider") == -1) {
                            if (NetworkingDetail.pool == "" || !validateinputs.validateSubnetmask(NetworkingDetail.SubwayInput) || !validateinputs.validateIP(NetworkingDetail.gatwayInput)) {
                                isValid = false
                            }
                        } else {
                            if (NetworkingDetail.segmentInput.indexOf("api") != -1) {
                                if (!validateinputs.validateSubnetmask(NetworkingDetail.SubwayInput) || !validateinputs.validateIP(NetworkingDetail.gatwayInput)) {
                                    isValid = false
                                }
                            }
                        }
                    } else {
                        isValid = false;
                    }
                    return isValid;
                };
                $scope.savenetworkingproxydetails = function (NetworkingDetail) {
                    $scope.$broadcast("KickOffValidationForPopup");
                    if ($scope.currentAction4 == "Edit") {
                        var isValid = $scope.checkNetworksInput(NetworkingDetail);
                        if(isValid){
                            if (!$scope.checkIfSegmentAlreadyExists(NetworkingDetail)) {
                                for (var i in $scope.networkconf.networks) {
                                    if ($scope.networkconf.networks[i].networkId == $scope.CurrentNetworkId) {
                                        $scope.networkconf.networks[i] = {
                                            'vlanInput': NetworkingDetail.vlanInput,
                                            'SubwayInput': NetworkingDetail.SubwayInput,
                                            'gatwayInput': NetworkingDetail.gatwayInput,
                                            'pool': NetworkingDetail.pool,
                                            'segmentInput': NetworkingDetail.segmentInput,
                                            'networkId': $scope.CurrentNetworkId,
                                            'defroute': NetworkingDetail.defroute,
                                            'buildNode':NetworkingDetail.buildNode
                                        };
                                    }
                                }
                                $scope.currentAction4 == "";
                                $scope.checkForExternalAndProvider();
                                $scope.checkUserInputsForNetworking();
                                $scope.addEditErrorMsg = "";
                                $("#addEditNetworks").modal("hide");
                            }else{
                                $scope.addEditErrorMsg = "Selected segment already exists, Please select some other.";
                            }
                        }else{
                            //$scope.addEditErrorMsg = "Please fill the required fields";
                        }
                    }else{
                        var isValid = $scope.checkNetworksInput(NetworkingDetail);

                        if (isValid) {
                            if (!$scope.checkIfSegmentAlreadyExists(NetworkingDetail)) {
                                $scope.networkconf.networks.push({
                                    'vlanInput': NetworkingDetail.vlanInput,
                                    'SubwayInput': NetworkingDetail.SubwayInput,
                                    'gatwayInput': NetworkingDetail.gatwayInput,
                                    'pool': NetworkingDetail.pool,
                                    'segmentInput': NetworkingDetail.segmentInput,
                                    'networkId': ++$scope.populatedfiledID,
                                    'defroute': NetworkingDetail.defroute,
                                    'buildNode':NetworkingDetail.buildNode
                                });
                                $scope.currentAction4 == "";
                                $scope.checkForExternalAndProvider();
                                $scope.addEditErrorMsg = "";
                                $scope.checkUserInputsForNetworking();
                                $("#addEditNetworks").modal("hide");
                            }else{
                                $scope.addEditErrorMsg = "Selected segment already exists, Please select some other.";
                            }
                        }else{
                            //$scope.addEditErrorMsg = "Please fill the required fields";
                        }
                    }

                };

                    $scope.deleteNTP = function (index, delObj) {
                        $scope.deleteNTPId = delObj.entity.id;
                        $scope.popupText = "Are you sure you want to delete the NTP Server?";
                        $scope.isVisible = true;
                        $scope.performTaskWaitaingForConfirmation = $scope.deleteSelectedNTPFromTable;
                        $scope.actionsTobeTakenToRevert = function(){};
                    };

                    $scope.deleteDNS = function (index, delObj) {
                        $scope.deleteDNSId = delObj.entity.id;
                        $scope.popupText = "Are you sure you want to delete the DNS Server?";
                        $scope.isVisible = true;
                        $scope.performTaskWaitaingForConfirmation = $scope.deleteSelectedDNSFromTable;
                        $scope.actionsTobeTakenToRevert = function(){};
                    };

                    $scope.deleteHTTP = function (index, delObj) {
                        $scope.deleteHTTPId = delObj.entity.id;
                        $scope.popupText = "Are you sure you want to delete the HTTP Server?";
                        $scope.isVisible = true;
                        $scope.performTaskWaitaingForConfirmation = $scope.deleteSelectedHTTPFromTable;
                        $scope.actionsTobeTakenToRevert = function(){};
                    };

                    $scope.deleteHTTPS = function (index, delObj) {
                        $scope.deleteHTTPsId = delObj.entity.id;
                        $scope.popupText = "Are you sure you want to delete the HTTPS Server?";
                        $scope.isVisible = true;
                        $scope.performTaskWaitaingForConfirmation = $scope.deleteSelectedHTTPsFromTable;
                        $scope.actionsTobeTakenToRevert = function(){};
                    };

                    $scope.deleteNETWORKING = function (index, delObj) {
                        $scope.deleteNETWORKId = delObj.entity.networkId;
                        $scope.popupText = "Are you sure you want to delete the Network?";
                        $scope.isVisible = true;
                        $scope.performTaskWaitaingForConfirmation = $scope.deleteSelectedNETWORKINGFromTable;
                        $scope.actionsTobeTakenToRevert = function(){};
                    };

                    $scope.deleteSelectedNTPFromTable = function () {
                        for (var i in $scope.networkconf.ntp_servers) {
                            if ($scope.networkconf.ntp_servers[i].id == $scope.deleteNTPId) {
                                $scope.networkconf.ntp_servers.splice(i, 1);
                                $scope.checkUserInputsForNetworking();
                            }
                        }

                        $scope.ntpFlag = $scope.ntpFlag - 1;
                    };
                    $scope.deleteSelectedDNSFromTable = function () {
                        for (var i in $scope.networkconf.domain_name_servers) {
                            if ($scope.networkconf.domain_name_servers[i].id == $scope.deleteDNSId) {
                                $scope.networkconf.domain_name_servers.splice(i, 1);
                                $scope.checkUserInputsForNetworking();
                            }
                        }
                        $scope.dnsFlag =  $scope.dnsFlag -1;
                    };


                    $scope.deleteSelectedHTTPFromTable = function () {
                        for (var i in $scope.networkconf.http_proxy_servers) {
                            if ($scope.networkconf.http_proxy_servers[i].id == $scope.deleteHTTPId) {
                                $scope.networkconf.http_proxy_servers.splice(i, 1);
                                $scope.checkUserInputsForNetworking();
                            }
                        }

                    };
                    $scope.deleteSelectedHTTPsFromTable = function () {
                        for (var i in $scope.networkconf.https_proxy_servers) {
                            if ($scope.networkconf.https_proxy_servers[i].id == $scope.deleteHTTPsId) {
                                $scope.networkconf.https_proxy_servers.splice(i, 1);
                                $scope.checkUserInputsForNetworking();
                            }
                        }
                    },
                            $scope.deleteSelectedNETWORKINGFromTable = function () {
                                for (var i in $scope.networkconf.networks) {
                                    if ($scope.networkconf.networks[i].networkId == $scope.deleteNETWORKId) {
                                        $scope.networkconf.networks.splice(i, 1);
                                        $scope.checkUserInputsForNetworking();
                                    }
                                }
                            },
                            $scope.undoNetworksAddEdit = function (index) {
                                if ($scope.currentAction4 === "Edit") {
                                    $scope.networkconf.dummynetworks[index].SubwayInput = $scope.networkconf.networks[index].SubwayInput;
                                    $scope.networkconf.dummynetworks[index].gatwayInput = $scope.networkconf.networks[index].gatwayInput;
                                    $scope.networkconf.dummynetworks[index].pool = $scope.networkconf.networks[index].pool;
                                    $scope.networkconf.dummynetworks[index].segmentInput = $scope.networkconf.networks[index].segmentInput;
                                    $scope.networkconf.dummynetworks[index].isVisible = false;
                                    $scope.networkconf.dummynetworks[index].disabled = false;
                                }
                                else {
                                    $scope.networkconf.dummynetworks.splice(index, 1);
                                }
                            };

                    $scope.undoChnages = function (index, tabName) {
                        switch (tabName) {
                            case 'ntp':
                                $scope.undoNTPAddEdit(index);
                                break;
                            case 'httpproxy':
                                $scope.undoHTTPAddEdit(index);
                                break;
                            case 'https':
                                $scope.undoHTTPsAddEdit(index);
                                break;
                            case 'DNSserver':
                                $scope.undoDNSAddEdit(index);
                                break;
                            case 'networks':
                                $scope.undoNetworksAddEdit(index);
                                break;
                        }
                    };

                    $scope.checkForSegmentValue = function (networkObj, fieldName) {
                        var isDisabled = false;
                        switch (fieldName) {
                            case 'subnet':
                                if (networkObj.segmentInput && (networkObj.segmentInput.indexOf("external") != -1 || networkObj.segmentInput.indexOf(
                                        "provider") != -1)) {
                                    isDisabled = true;
                                }
                                break;
                            case 'gateway':
                                if (networkObj.segmentInput && (networkObj.segmentInput.indexOf("external") != -1 || networkObj.segmentInput.indexOf(
                                        "provider") != -1)) {
                                    isDisabled = true;
                                }
                                break;
                            case 'pool':
                                if (networkObj.segmentInput && (networkObj.segmentInput.indexOf("external") != -1 || networkObj.segmentInput.indexOf(
                                        "provider") != -1 || networkObj.segmentInput.indexOf("api") != -1)) {
                                    isDisabled = true;
                                }
                                break;
                            default:
                                isDisabled = false;
                                break;
                        }
                        return isDisabled;
                    };

                    $scope.deleteNetwork = function (serverObj) {
                        $scope.CurrentNetworkId = serverObj.networkId;
                        $scope.popupText = "Are you sure you want to delete the Network?";
                        $scope.isVisible = true;
                        $scope.performTaskWaitaingForConfirmation = $scope.deleteSelectedNetworkFromTable;
                        $scope.actionsTobeTakenToRevert = function(){};
                    };

                    $scope.deleteSelectedNetworkFromTable = function () {
                        for (var ind in $scope.networkconf.networks) {
                            if ($scope.networkconf.networks[ind].networkId == $scope.CurrentNetworkId) {
                                $scope.networkconf.networks.splice(ind, 1);
                            }
                        }
                        $scope.checkForExternalAndProvider();
                    };
                    $scope.$on(Events.CLEARFIELDSCALLED,function(){
                        if($scope.networkconf.networks && $scope.networkconf.networks.length==0) {
                            $scope.prepopulateFields();
                        }
                        $scope.checkUserInputsForNetworking();
                    });

                    //    $scope.prepopulateFields();
                }])

            .directive('multiselect', function () {
                return {
                    restrict: 'E',
                    scope: {
                        platformtype: "=",
                        selectedsegments: "=",
                        currentnetworkobject: "="
                    },
                    template: '<div class="dropdown">' +
                            '<button class="btn btn-default dropdown-toggle" type="button" id="menu1" data-toggle="dropdown">{{(selectedsegments=="" || selectedsegments==undefined)?"None Selected":selectedsegments}}' +
                            '<span class="caret"></span></button>' +
                            '<ul class="dropdown-menu dropdown-menu-with-larger-minwidth" role="menu" aria-labelledby="menu1">' +
                            '<li role="presentation" ng-repeat="segment in optionArray track by $index"><span><input type="checkbox" ng-model="segment.selected" ng-click="checkUncheckSegment(NetworkingDetail,segment)" ng-disabled="enableDisableField(segment);"><a role="menuitem" href="javascript:void(0)" ng-disabled="enableDisableField(segment)" ng-click="enableDisableField(segment) || callCheckUncheckSegment(NetworkingDetail,segment,$event)">{{segment.name}}</a></span></li>' +
                            '</ul>' +
                            '</div>',
                    link: function (scope, elm, attr, ctrl) {

                    },
                    controller: ['$scope', function ($scope) {

                            $scope.optionArray = $scope.platformtype == 'C' ? [{
                                    selected: false,
                                    name: 'API',
                                    value: 'api'
                                }, {
                                    selected: false,
                                    name: 'Management/Provision',
                                    value: 'management/provision'
                                }, {
                                    selected: false,
                                    name: 'Tenant',
                                    value: 'tenant'
                                }, {
                                    selected: false,
                                    name: 'Storage',
                                    value: 'storage'
                                }, {
                                    selected: false,
                                    name: 'External',
                                    value: 'external'
                                }, {
                                    selected: false,
                                    name: 'Provider',
                                    value: 'provider'
                                }] : [{
                                    selected: false,
                                    name: 'CIMC',
                                    value: 'cimc'
                                }, {
                                    selected: false,
                                    name: 'API',
                                    value: 'api'
                                }, {
                                    selected: false,
                                    name: 'Management/Provision',
                                    value: 'management/provision'
                                }, {
                                    selected: false,
                                    name: 'Tenant',
                                    value: 'tenant'
                                }, {
                                    selected: false,
                                    name: 'Storage',
                                    value: 'storage'
                                }, {
                                    selected: false,
                                    name: 'External',
                                    value: 'external'
                                }, {
                                    selected: false,
                                    name: 'Provider',
                                    value: 'provider'
                                }];
                            $scope.accessibilityArray = [false, false, false, false, false, false, false];
                            $scope.selectedarray = [];
                            $scope.disableOptionsExcept = function (optionArr) {
                                for (var i in $scope.accessibilityArray) {
                                    if (optionArr.indexOf(i) == -1) {
                                        $scope.accessibilityArray[i] = true;
                                    }
                                    else {
                                        $scope.accessibilityArray[i] = false;
                                    }
                                }
                            };
                            $scope.enableDisableField = function (segmentObj) {
                                switch (segmentObj.name) {
                                    case "CIMC":
                                        return $scope.accessibilityArray[0];
                                        break;
                                    case "API":
                                        return $scope.accessibilityArray[1];
                                        break;
                                    case "Management/Provision":
                                        return $scope.accessibilityArray[2];
                                        break;
                                    case "Tenant":
                                        return $scope.accessibilityArray[3];
                                        break;
                                    case "Storage":
                                        return $scope.accessibilityArray[4];
                                        break;
                                    case "External":
                                        return $scope.accessibilityArray[5];
                                        break;
                                    case "Provider":
                                        return $scope.accessibilityArray[6];
                                        break;
                                }
                            };
                            $scope.checkIfAnyOptionStillChecked = function () {
                                var isSelected = false;
                                for (var index in $scope.optionArray) {
                                    if ($scope.optionArray[index].selected) {
                                        isSelected = true;
                                        break;
                                    }
                                    isSelected = false;
                                }
                                return isSelected;
                            };

                            $scope.checkSegment = function (segmentObj) {
                                switch (segmentObj.name) {
                                    case "CIMC":
                                        $scope.disableOptionsExcept(["0"]);
                                        break;
                                    case "API":
                                        $scope.disableOptionsExcept(["1"]);
                                        $scope.currentnetworkobject.pool = "";
                                        $scope.currentnetworkobject.isPoolDisabled = true;
                                        break;
                                    case "Management/Provision":
                                        $scope.disableOptionsExcept(["2"]);
                                        break;
                                    case "Tenant":
                                        $scope.disableOptionsExcept(["3", "4"]);
                                        break;
                                    case "Storage":
                                        $scope.disableOptionsExcept(["3", "4"]);
                                        break;
                                    case "External":
                                        $scope.currentnetworkobject.SubwayInput = ""
                                        $scope.currentnetworkobject.gatwayInput = "";
                                        $scope.currentnetworkobject.pool = "";
                                        $scope.currentnetworkobject.disabled = true;
                                        $scope.disableOptionsExcept(["5", "6"]);
                                        break;
                                    case "Provider":
                                        $scope.disableOptionsExcept(["5", "6"]);
                                        $scope.currentnetworkobject.SubwayInput = ""
                                        $scope.currentnetworkobject.gatwayInput = "";
                                        $scope.currentnetworkobject.pool = "";
                                        $scope.currentnetworkobject.disabled = true;
                                        break;
                                }
                            };

                            $scope.checkUncheckSegment = function (networkObject, segmentObj) {
                                if (segmentObj.selected) {
                                    $scope.checkSegment(segmentObj);
                                    if ($scope.selectedarray.indexOf(segmentObj.value) == -1) {
                                        $scope.selectedarray.push(segmentObj.value);
                                        $scope.selectedsegments = $scope.selectedarray.join(",");
                                    }
                                }
                                else {
                                    var anyOptionStillChecked = $scope.checkIfAnyOptionStillChecked();
                                    if (!anyOptionStillChecked) {
                                        $scope.currentnetworkobject.disabled = false;
                                        $scope.currentnetworkobject.isPoolDisabled = false;
                                        $scope.disableOptionsExcept(["0", "1", "2", "3", "4", "5", "6"]);
                                    }
                                    if ($scope.selectedarray.indexOf(segmentObj.value) != -1) {
                                        $scope.selectedarray.splice($scope.selectedarray.indexOf(segmentObj.value), 1);
                                        $scope.selectedsegments = $scope.selectedarray.join(",");
                                    }
                                    if(segmentObj.value == "management/provision"){
                                        var managementIndex = $scope.selectedarray.indexOf("management");

                                        if(managementIndex!=-1){
                                            $scope.selectedarray.splice(managementIndex, 1);
                                        }
                                        var providerIndex = $scope.selectedarray.indexOf("provision");
                                        if(providerIndex!=-1){
                                            $scope.selectedarray.splice(providerIndex, 1);
                                        }

                                        $scope.selectedsegments = $scope.selectedarray.join(",");
                                    }
                                }
                            };
                            $scope.callCheckUncheckSegment = function (networkObject, segmentObj, event) {
                                event.stopPropagation();
                                segmentObj.selected = !segmentObj.selected;
                                $scope.checkUncheckSegment(networkObject, segmentObj);
                            };
                            $scope.uncheckAllOptions = function () {
                                for (var j in $scope.optionArray) {
                                    $scope.optionArray[j].selected = false;

                                }
                                $scope.disableOptionsExcept(['0','1','2','3','4','5','6'])
                            };

                            $scope.$watch(function () {
                                return $scope.selectedsegments;
                            }, function () {

                                    $scope.selectedarray = ($scope.selectedsegments) ? $scope.selectedsegments.split(",") : [];
                                    $scope.uncheckAllOptions();
                                    for (var i in $scope.selectedarray) {
                                        for (var j in $scope.optionArray) {
                                            if ($scope.optionArray[j].value == $scope.selectedarray[i] || ($scope.optionArray[j].value).indexOf($scope.selectedarray[i])!=-1) {
                                                $scope.optionArray[j].selected = true;
                                                $scope.checkSegment($scope.optionArray[j]);
                                            }
                                        }
                                    }

                            });
                        }]
                }
            })

}());