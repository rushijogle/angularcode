(function () {
    'use strict';
    angular.module('mercuryInstaller.topology', ['ngRoute', 'mercuryInstaller.utility'])
            .config(['$routeProvider', function ($routeProvider) {
                    $routeProvider
                            .when('/topology', {
                                templateUrl: '../static/topology/topology.html'
                            })
                            .when('/topology/:bluprintId', {
                                templateUrl: '../static/topology/topology.html'
                            });
                }])

            .constant('segmentbarColors', {
                cimc: 'stroke:rgb(156,159,132);stroke-width:3',
                api: 'stroke:rgb(255,0,0);stroke-width:3',
                management: 'stroke:rgb(51,102,153);stroke-width:3',
                tenant: 'stroke:rgb(255,204,0);stroke-width:3',
                external: 'stroke:rgb(102,51,153);stroke-width:3',
                provider: 'stroke:rgb(51,153,255);stroke-width:3',
                storage: 'stroke:rgb(95,2,31);stroke-width:3',
                controller: 'fill:rgb(204,255,255);stroke-width:1;stroke:rgb(2,132,130)',
                compute: 'fill:rgb(238,238,238);stroke-width:1;stroke:rgb(153,153,153)',
                storages: 'fill:rgb(245,241,222);stroke-width:1;stroke:rgb(102,51,0)',
                buildnode: 'fill:rgb(0,51,51);stroke-width:1;stroke:rgb(255,255,255)',
                defaultcolor: 'stroke:rgb(0,0,0);stroke-width:3',
                defaultrectanglecolor: 'fill:rgb(255,255,255);stroke-width:1;stroke:rgb(0,0,0)'
            })

            .constant('Connections', {
                compute: ["tenant", "management/provision", "provider"],
                control: ["external", "api", "storage", "management/provision"],
                storage: ["storage", "management/provision"]
            })


            .controller('TopologyCtrl', ['$scope', '$rootScope', 'BlueprintManagementFactory', 'segmentbarColors', '$http', 'Connections', '$compile', 'editObjService', 'DeploymentMonitoringService', function ($scope, $rootScope, BMF, segmentbarColors, $http, Connections, $compile, editObjService, DeploymentMonitoringService) {
                    $scope.uuid = editObjService.get().uuid;
                    editObjService.set(null, "");
                    var svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
                    svg.setAttribute('xlink', 'http://www.w3.org/1999/xlink');
                    var availableWidth = window.innerWidth * 0.75;
                    var availableHeight = window.innerHeight * 0.85;
                    svg.setAttribute('width', availableWidth * 0.90);
                    svg.setAttribute('height', availableWidth * 0.80);
                    svg.setAttribute('id', 'topologysvg');
                    var parentDivWidth = svg.getAttribute('width');
                    var parentDivHeight = svg.getAttribute('height');
                    var Lineoffset = parentDivHeight / 20;
                    var Lines = parentDivHeight / 20;
                    var segmentLinesX1 = 10;
                    var segmentLinesY1 = parentDivHeight / 20;
                    var segmentLinesX2 = parentDivWidth * 0.85;
                    var segmentLinesY2 = parentDivHeight / 20;
                    var segmentColors;
                    var rectangleX = 10;
                    var rectangleOffset = parentDivWidth * 0.30;
                    var rectanglerx = 10;
                    var rectanglery = 10;
                    var rectangleheight = 75;
                    var rectanglewidth = 125;
                    var childrectanglewidth = 150;
                    var rectangleY = 460;
                    $scope.segmentarray = [];
                    $scope.networkSegments = [];
                    $scope.serverArray = [];
                    $scope.computeArray = [];
                    $scope.controlArray = [];
                    $scope.storageArray = [];
                    $scope.checkIfAlreadyExists = function (segment) {
                        for (var i in $scope.networkSegments) {
                            if ($scope.networkSegments[i].segment == segment) {
                                return true;
                            }
                        }
                        return false;
                    };

                    $scope.createDataArraysForNetworkingAndRoles = function (response) {
                        var data = JSON.parse(response.data.jsondata);
                        console.log(data)
                        if (data.NETWORKING && data.NETWORKING.networks) {
                            for (var i in data.NETWORKING.networks) {
                                var segmentArray = data.NETWORKING.networks[i].segments;

                                for (var j in segmentArray) {
                                    if (segmentArray[j] == "management" || segmentArray[j] == "provision") {
                                        if (!$scope.checkIfAlreadyExists('management/provision')) {
                                            $scope.networkSegments.push({
                                                segment: 'management/provision',
                                                subnet: data.NETWORKING.networks[i].subnet,
                                                vlanId: data.NETWORKING.networks[i].vlan_id
                                            });
                                        }

                                    } else {
                                        if (!$scope.checkIfAlreadyExists(segmentArray[j])) {
                                            $scope.networkSegments.push({
                                                segment: segmentArray[j],
                                                subnet: data.NETWORKING.networks[i].subnet,
                                                vlanId: data.NETWORKING.networks[i].vlan_id
                                            });
                                        }

                                    }

                                }
                            }
                        }

                        var networkresponse = response.data;
                        if ($scope.networkSegments) {
                            for (var k in $scope.networkSegments) {
                                Lines = Lines + Lineoffset;
                                segmentLinesY1 = segmentLinesY1 + Lineoffset;
                                segmentLinesY2 = segmentLinesY2 + Lineoffset;
                                if ($scope.networkSegments[k].segment == 'api') {
                                    segmentColors = segmentbarColors.api;
                                } else if ($scope.networkSegments[k].segment == 'management/provision') {
                                    segmentColors = segmentbarColors.management;
                                } else if ($scope.networkSegments[k].segment == 'tenant') {
                                    segmentColors = segmentbarColors.tenant;
                                } else if ($scope.networkSegments[k].segment == 'external') {
                                    segmentColors = segmentbarColors.external;
                                } else if ($scope.networkSegments[k].segment == 'provider') {
                                    segmentColors = segmentbarColors.provider;
                                } else if ($scope.networkSegments[k].segment == 'storage') {
                                    segmentColors = segmentbarColors.storage;
                                } else if ($scope.networkSegments[k].segment == 'cimc') {
                                    segmentColors = segmentbarColors.cimc;
                                }

                                $scope.addLine($scope.networkSegments[k].segment, segmentLinesX1, segmentLinesY1, segmentLinesX2, segmentLinesY2, segmentColors);
                                $scope.addText(segmentLinesX2 + 10, segmentLinesY2, $scope.networkSegments[k].segment, 'black');
                            }
                        }

                        $scope.controlArray = [];
                        $scope.storageArray = [];
                        $scope.computeArray = [];

                        if (data.ROLES && data.ROLES.control) {
                            for (var i in data.ROLES.control) {
                                if (data.SERVERS && data.SERVERS[data.ROLES.control[i]]) {
                                    var serverobj = data.SERVERS[data.ROLES.control[i]];
                                    var length = $scope.controlArray.push({
                                        name: data.ROLES.control[i],
                                        flag: "controlflag"

                                    });
                                    if (serverobj.rack_info) {
                                        $scope.controlArray[length - 1].rack_id = serverobj.rack_info.rack_id;
                                    }
                                    if (serverobj.cimc_info) {
                                        $scope.controlArray[length - 1].cimc_ip = serverobj.cimc_info.cimc_ip;
                                    }
                                }

                                if (data.SERVERS[data.ROLES.control[i]].ucsm_info) {
                                    if (data.SERVERS[data.ROLES.control[i]].ucsm_info.chassis_id) {
                                        $scope.controlArray[length - 1].chassis_id = data.SERVERS[data.ROLES.control[i]].ucsm_info.chassis_id;
                                    }
                                    if (data.SERVERS[data.ROLES.control[i]].ucsm_info.blade_id) {
                                        $scope.controlArray[length - 1].blade_id = data.SERVERS[data.ROLES.control[i]].ucsm_info.blade_id;
                                    }
                                    if (data.SERVERS[data.ROLES.control[i]].ucsm_info.server_type) {
                                        $scope.controlArray[length - 1].server_type = data.SERVERS[data.ROLES.control[i]].ucsm_info.server_type;
                                    }
                                }
                                if (data.SERVERS[data.ROLES.control[i]].cimc_info) {
                                    $scope.controlArray[length - 1].cimc_ip = data.SERVERS[data.ROLES.control[i]].cimc_info.cimc_ip;
                                }

                            }

                        }

                        if (data.ROLES && data.ROLES.compute) {

                            for (var i in data.ROLES.compute) {
                                if (data.SERVERS && data.SERVERS[data.ROLES.compute[i]]) {
                                    var serverobj = data.SERVERS[data.ROLES.compute[i]];
                                    var length = $scope.computeArray.push({
                                        name: data.ROLES.compute[i],
                                        flag: "computeflag"
                                    });
                                    if (serverobj.rack_info) {
                                        $scope.computeArray[length - 1].rack_id = serverobj.rack_info.rack_id;
                                    }
                                    if (serverobj.cimc_info) {
                                        $scope.computeArray[length - 1].cimc_ip = serverobj.cimc_info.cimc_ip;
                                    }


                                    if (data.SERVERS[data.ROLES.compute[i]].ucsm_info) {
                                        if (data.SERVERS[data.ROLES.compute[i]].ucsm_info.blade_id) {
                                            $scope.computeArray[length - 1].blade_id = data.SERVERS[data.ROLES.compute[i]].ucsm_info.blade_id;
                                        }
                                        if (data.SERVERS[data.ROLES.compute[i]].ucsm_info.chassis_id) {
                                            $scope.computeArray[length - 1].chassis_id = data.SERVERS[data.ROLES.compute[i]].ucsm_info.chassis_id;
                                        }
                                        if (data.SERVERS[data.ROLES.compute[i]].ucsm_info.server_type) {
                                            $scope.computeArray[length - 1].server_type = data.SERVERS[data.ROLES.compute[i]].ucsm_info.server_type;
                                        }
                                    }

                                    if (data.SERVERS[data.ROLES.compute[i]].cimc_info) {
                                        $scope.computeArray[length - 1].cimc_ip = data.SERVERS[data.ROLES.compute[i]].cimc_info.cimc_ip;
                                    }
                                }
                            }
                        }

                        if (data.ROLES && data.ROLES.block_storage) {
                            for (var i in data.ROLES.block_storage) {
                                if (data.SERVERS && data.SERVERS[data.ROLES.block_storage[i]]) {
                                    var serverobj = data.SERVERS[data.ROLES.block_storage[i]];
                                    var length = $scope.storageArray.push({
                                        name: data.ROLES.block_storage[i],
                                        flag: "storageflag"
                                    });
                                    if (serverobj.rack_info) {
                                        $scope.storageArray[length - 1].rack_id = serverobj.rack_info.rack_id;
                                    }
                                    if (serverobj.cimc_info) {
                                        $scope.storageArray[length - 1].cimc_ip = serverobj.cimc_info.cimc_ip;
                                    }


                                    if (data.SERVERS[data.ROLES.block_storage[i]].ucsm_info) {
                                        if (data.SERVERS[data.ROLES.block_storage[i]].ucsm_info['rack-unit_id']) {
                                            $scope.storageArray[length - 1].rack_unit_id = data.SERVERS[data.ROLES.block_storage[i]].ucsm_info['rack-unit_id'];
                                        }

                                        if (data.SERVERS[data.ROLES.block_storage[i]].ucsm_info['server_type']) {
                                            $scope.storageArray[length - 1].server_type = data.SERVERS[data.ROLES.block_storage[i]].ucsm_info['server_type'];
                                        }
                                    }

                                    if (data.SERVERS[data.ROLES.block_storage[i]].cimc_info) {
                                        $scope.storageArray[length - 1].cimc_ip = data.SERVERS[data.ROLES.block_storage[i]].cimc_info.cimc_ip;
                                    }

                                }

                            }
                        }
                    };


                    $scope.addRectForRoles = function () {
                        if ($scope.computeArray && $scope.computeArray.length != 0) {
                            var com = 0;
                            if ($scope.computeArray.length == 1) {
                                com = 0;
                                rectangleX = rectangleX + 10;
                                rectangleY = segmentLinesY2 + 70;
                                $scope.addRect(rectangleX, rectangleY, rectanglerx, rectanglery, rectanglewidth, rectangleheight, segmentbarColors.compute, 'role_compute_' + com, 'computetoggle')
                            } else {
                                for (com = 0; com <= 2; com++) {
                                    rectangleX = rectangleX + 10;
                                    rectangleY = segmentLinesY2 + 70;
                                    $scope.addRect(rectangleX, rectangleY, rectanglerx, rectanglery, rectanglewidth, rectangleheight, segmentbarColors.compute, 'role_compute_' + com, 'computetoggle')
                                }
                            }
                            $scope.serverArray.push("compute");
                            $scope.drawVerticalLineForChildren(rectangleX, rectangleY, $scope.computeArray);

                            $scope.addText(rectangleX + 30, rectangleY + 30, 'Compute', 'black', 'compute_' + com);
                            $scope.addText(rectangleX + 50, rectangleY + 50, '(' + $scope.computeArray.length + ")", 'black', 'compute_' + com);

                        }
                        if ($scope.controlArray && $scope.controlArray.length != 0) {
                            if($scope.computeArray.length != 0){
                            rectangleX = rectangleX + rectangleOffset;
                        }
                            var con = 0;
                            if ($scope.controlArray && $scope.controlArray.length == 1) {
                                con = 0;
                                rectangleX = rectangleX + 10;

                                $scope.addRect(rectangleX, rectangleY, rectanglerx, rectanglery, rectanglewidth, rectangleheight, segmentbarColors.controller, 'role_control_' + con, 'controltoggle')
                            } else {
                                for (con = 0; con <= 2; con++) {
                                    rectangleX = rectangleX + 10;

                                    $scope.addRect(rectangleX, rectangleY, rectanglerx, rectanglery, rectanglewidth, rectangleheight, segmentbarColors.controller, 'role_control_' + con, 'controltoggle')
                                }
                            }
                            $scope.serverArray.push("control");
                            $scope.drawVerticalLineForChildren(rectangleX, rectangleY, $scope.controlArray);
                            $scope.addText(rectangleX + 30, rectangleY + 30, 'Control', 'black', 'control' + con);
                            $scope.addText(rectangleX + 50, rectangleY + 50, '(' + $scope.controlArray.length + ")", 'black', 'control' + con);

                        }
                        if ($scope.storageArray && $scope.storageArray.length != 0) {
                              if($scope.computeArray.length != 0 && $scope.controlArray.length != 0){
                            rectangleX = rectangleX + rectangleOffset;
                            
                              }
                            for (var stor = 0; stor <= 2; stor++) {
                                rectangleX = rectangleX + 10;

                                $scope.addRect(rectangleX, rectangleY, rectanglerx, rectanglery, rectanglewidth, rectangleheight, segmentbarColors.storages, 'role_storage_' + stor, 'storagetoggle');
                            }
                            $scope.addText(rectangleX + 30, rectangleY + 30, 'Storage', 'black', 'storage_' + stor);
                            $scope.addText(rectangleX + 50, rectangleY + 50, '(' + $scope.storageArray.length + ")", 'black', 'storage_' + stor);
                            $scope.serverArray.push("storage");
                            $scope.drawVerticalLineForChildren(rectangleX, rectangleY, $scope.storageArray);
                        }

                    };

                    $scope.connectNodesToSegment = function () {
                        var firstPointCoordinatesX = 30;

                        var secondPontCoordinateX = 30;
                        var secondPontCoordinateY = rectangleY;



                        for (var i in $scope.serverArray) {
                            for (var j in Connections[$scope.serverArray[i]]) {
                                var firstPointCoordinatesY = parentDivHeight / 20;
                                for (var k in $scope.networkSegments) {
                                    firstPointCoordinatesY = firstPointCoordinatesY + Lineoffset;
                                    if ($scope.networkSegments[k].segment == Connections[$scope.serverArray[i]][j]) {
                                        var style = "";
                                        if (Connections[$scope.serverArray[i]][j] == "management/provision") {
                                            style = segmentbarColors['management'];
                                        } else {

                                            style = segmentbarColors[Connections[$scope.serverArray[i]][j]];

                                        }
                                        $scope.addLine('connectioncontrol' + j, firstPointCoordinatesX, firstPointCoordinatesY, secondPontCoordinateX, secondPontCoordinateY, style);
                                        secondPontCoordinateX = secondPontCoordinateX + 10;
                                        firstPointCoordinatesX = firstPointCoordinatesX + 10;
                                    }
                                }
                            }
                            secondPontCoordinateX = secondPontCoordinateX + rectangleOffset;
                            firstPointCoordinatesX = firstPointCoordinatesX + rectangleOffset;
                        }
                    };
                    $scope.toggleRectangle = [];
                    $scope.verticleLinetoggle = [];
                    $scope.horizontalLinetoggle = [];
                    $scope.textidtoggle = [];
                    $scope.texttoggle = [];
                    $scope.drawVerticalLineForChildren = function (rectangleX, rectangleY, roleArray) {

                        var childrenverticalRectangle = rectangleX;
                        var childrenverticalRectangleDistaceOff = 90;
                        var childrenhorizontalRectangle = rectangleY + rectangleheight;
                        childrenverticalRectangle = childrenverticalRectangle + (rectanglewidth / 2);
                        for (var v = 0; v < roleArray.length; v++) {
                            $scope.addLine(roleArray[v].flag + 'VerticalLineForChildren_' + v, childrenverticalRectangle, childrenhorizontalRectangle, childrenverticalRectangle, childrenhorizontalRectangle + childrenverticalRectangleDistaceOff, segmentbarColors.defaultcolor, roleArray[v].flag + '_line');
                            childrenhorizontalRectangle = childrenhorizontalRectangle + childrenverticalRectangleDistaceOff;
                            $scope.addLine(roleArray[v].flag + 'HorizontalLineForChildren_' + v, childrenverticalRectangle, childrenhorizontalRectangle, childrenverticalRectangle + 10, childrenhorizontalRectangle, segmentbarColors.defaultcolor, roleArray[v].flag + '_line');
                            $scope.addRect(childrenverticalRectangle + 10, childrenhorizontalRectangle - 38, rectanglerx, rectanglery, childrectanglewidth, rectangleheight, segmentbarColors.defaultrectanglecolor, roleArray[v].flag + 'role_storage_' + v, roleArray[v].flag + '_hide');
                            $scope.toggleRectangle.push([roleArray[v].flag, roleArray[v].flag + 'role_storage_' + v]);
                            $scope.verticleLinetoggle.push([roleArray[v].flag, roleArray[v].flag + 'VerticalLineForChildren_' + v]);
                            $scope.horizontalLinetoggle.push([roleArray[v].flag, roleArray[v].flag + 'HorizontalLineForChildren_' + v]);
                            var rectText = roleArray[v].name;
                            var rectTextid = roleArray[v].rack_id;
                            $scope.addText(childrenverticalRectangle + 30, childrenhorizontalRectangle, rectText, 'black', roleArray[v].flag + 'rackname_' + v, roleArray[v].flag + '_racktoggle');
                            $scope.addText(childrenverticalRectangle + 30, childrenhorizontalRectangle + 20, rectTextid, 'black', roleArray[v].flag + 'rackid_' + v, roleArray[v].flag + '_racktoggle');
                            $scope.texttoggle.push([roleArray[v].flag, roleArray[v].flag + 'rackname_' + v]);
                            $scope.textidtoggle.push([roleArray[v].flag, roleArray[v].flag + 'rackid_' + v]);
                            var tooltiptext;
                            if (roleArray[v].flag == 'computeflag') {
                                if (roleArray[v].cimc_ip) {
                                    var tooltiptext = "CIMC IP : " + roleArray[v].cimc_ip;
                                    $scope.addtooltip(roleArray[v].flag + 'role_storage_' + v, tooltiptext);
                                    $scope.addtooltip(roleArray[v].flag + 'rackid_' + v, tooltiptext);
                                    $scope.addtooltip(roleArray[v].flag + 'rackname_' + v, tooltiptext);
                                } else {
                                    var tooltiptext = "CHASSIS ID : " + roleArray[v].chassis_id + "\n" + "BLADE ID :" + roleArray[v].blade_id + "\n" + "SERVER TYPE :" + roleArray[v].server_type.toUpperCase();
                                    $scope.addtooltip(roleArray[v].flag + 'role_storage_' + v, tooltiptext);
                                    $scope.addtooltip(roleArray[v].flag + 'rackid_' + v, tooltiptext);
                                    $scope.addtooltip(roleArray[v].flag + 'rackname_' + v, tooltiptext);
                                }
                            }

                            if (roleArray[v].flag == 'controlflag') {
                                if (roleArray[v].cimc_ip) {
                                    var tooltiptext = "CIMC IP : " + roleArray[v].cimc_ip;
                                    $scope.addtooltip(roleArray[v].flag + 'role_storage_' + v, tooltiptext);
                                    $scope.addtooltip(roleArray[v].flag + 'rackid_' + v, tooltiptext);
                                    $scope.addtooltip(roleArray[v].flag + 'rackname_' + v, tooltiptext);
                                } else {
                                    var tooltiptext = "CHASSIS ID : " + roleArray[v].chassis_id + "\n" + "BLADE ID :" + roleArray[v].blade_id + "\n" + "SERVER TYPE :" + roleArray[v].server_type.toUpperCase();
                                    $scope.addtooltip(roleArray[v].flag + 'role_storage_' + v, tooltiptext);
                                    $scope.addtooltip(roleArray[v].flag + 'rackid_' + v, tooltiptext);
                                    $scope.addtooltip(roleArray[v].flag + 'rackname_' + v, tooltiptext);
                                }

                            }

                            if (roleArray[v].flag == 'storageflag') {
                                if (roleArray[v].cimc_ip) {
                                    var tooltiptext = "CIMC IP : " + roleArray[v].cimc_ip;
                                    $scope.addtooltip(roleArray[v].flag + 'role_storage_' + v, tooltiptext);
                                    $scope.addtooltip(roleArray[v].flag + 'rackid_' + v, tooltiptext);
                                    $scope.addtooltip(roleArray[v].flag + 'rackname_' + v, tooltiptext);
                                } else {
                                    var tooltiptext = "RACK UNIT ID : " + roleArray[v].rack_unit_id + "\n" + "SERVER TYPE : " + roleArray[v].server_type.toUpperCase();
                                    $scope.addtooltip(roleArray[v].flag + 'role_storage_' + v, tooltiptext);
                                    $scope.addtooltip(roleArray[v].flag + 'rackid_' + v, tooltiptext);
                                    $scope.addtooltip(roleArray[v].flag + 'rackname_' + v, tooltiptext);
                                }

                            }

                        }


                    };



                    $scope.fetchDataAndCreateTree = function (uuid) {

                        BMF.fetchSetupDataForParticularUUID(uuid, function (response) {
                            $('#topologysvg').empty();
                            $scope.createDataArraysForNetworkingAndRoles(response);
                            $scope.addRectForRoles();
                            $scope.connectNodesToSegment();

                        });

                    };


                    $scope.showTopology = function () {
                        $scope.toggleRectangle = [];
                        $scope.horizontalLinetoggle = [];
                        $scope.verticleLinetoggle = [];
                        $scope.textidtoggle = [];
                        $scope.texttoggle = [];
                        Lineoffset = parentDivHeight / 20;
                        Lines = parentDivHeight / 20;
                        segmentLinesX1 = 10;
                        segmentLinesY1 = parentDivHeight / 20;
                        segmentLinesX2 = parentDivWidth * 0.85;
                        segmentLinesY2 = parentDivHeight / 20;
                        rectangleX = 10;
                        rectangleOffset = parentDivWidth * 0.30;
                        rectangleheight = 75;
                        rectanglewidth = 125;
                        $scope.networkSegments = [];
                        $scope.serverArray = [];
                        $scope.computeArray = [];
                        $scope.controlArray = [];
                        $scope.storageArray = [];
                        childrectanglewidth = 150;
                        rectangleY = 460;
                        $scope.fetchDataAndCreateTree($scope.selectedBlueprintuuid);
                    };

                    $scope.populateBlueprintList = function (data) {
                        $scope.blueprintList = [];
                        for (var i in data) {
                            var managementmetaDataUUID = data[i].uuid;
                            var managementBlueprintName = data[i].name;
                            $scope.blueprintList.push({
                                'uuid': managementmetaDataUUID,
                                'blueprintName': managementBlueprintName
                            });
                        }
                        if ($scope.activeBlueprintId) {
                            $scope.selectedBlueprintuuid = $scope.activeBlueprintId;
                            if ($scope.selectedBlueprintuuid != null || $scope.selectedBlueprintuuid != undefined || $scope.selectedBlueprintuuid != "") {
                                //  $scope.showTopology();
                            }

                        } else {
                            $scope.selectedBlueprintuuid = $scope.uuid;
                        }
                    };


                    $scope.fetchAvailableBlueprints = function () {
                        BMF.listBlueprints(function (response) {
                            $scope.populateBlueprintList(response.setupdatas);
                        });
                    };

                    setTimeout(function () {
                        var wp = document.getElementById('topology');
                        wp.appendChild(svg);

                    }, 500);

                    if ($scope.uuid != '') {
                        $scope.selectedBlueprintuuid = $scope.uuid;
                        setTimeout(function () {
                            var wp = document.getElementById('topology');
                            wp.appendChild(svg);
                            $scope.showTopology();
                        }, 1000);
                    } else {
                        $scope.activeBlueprintId = DeploymentMonitoringService.getDeployedBlueprint().id;
                        var uuid = $scope.activeBlueprintId;
                        if (uuid != null) {
                            $scope.fetchDataAndCreateTree(uuid);
                        }
                        $scope.fetchAvailableBlueprints();
                    }

                    $scope.fetchAvailableBlueprints();

                    $scope.addText = function (x, y, text, textcolor, id, attr) {
                        var segmentText = document.createElementNS('http://www.w3.org/2000/svg', 'text');
                        segmentText.setAttribute('x', x);
                        segmentText.setAttribute('y', y);
                        segmentText.textContent = text;
                        segmentText.setAttribute('fill', textcolor);
                        segmentText.setAttribute('font-weight', 'bold');
                        segmentText.setAttribute('id', id);
                        if (attr) {
                            segmentText.setAttribute('attr', attr);
                            if (segmentText.getAttribute('attr') == 'computeflag_racktoggle') {
                                segmentText.setAttribute('class', 'computeflag_hide');
                            }

                            if (segmentText.getAttribute('attr') == 'controlflag_racktoggle') {
                                segmentText.setAttribute('class', 'controlflag_hide');
                            }

                            if (segmentText.getAttribute('attr') == 'storageflag_racktoggle') {
                                segmentText.setAttribute('class', 'storageflag_hide');
                            }

                        }
                        svg.appendChild(segmentText);
                    };


                    $scope.addLine = function (id, x1, y1, x2, y2, color, attr) {
                        var newLine = document.createElementNS('http://www.w3.org/2000/svg', 'line');
                        newLine.setAttribute('id', id);
                        newLine.setAttribute('x1', x1);
                        newLine.setAttribute('y1', y1);
                        newLine.setAttribute('x2', x2);
                        newLine.setAttribute('y2', y2);
                        newLine.setAttribute('style', color);
                        if (attr) {
                            newLine.setAttribute('attr', attr);
                            if (newLine.getAttribute('attr') == 'controlflag_line') {
                                newLine.setAttribute('class', 'controlflag_hide');
                            }

                            if (newLine.getAttribute('attr') == 'computeflag_line') {
                                newLine.setAttribute('class', 'computeflag_hide');
                            }

                            if (newLine.getAttribute('attr') == 'storageflag_line') {
                                newLine.setAttribute('class', 'storageflag_hide');
                            }
                        }
                        svg.appendChild(newLine);
                    };

                    $scope.addRect = function (x, y, rx, ry, width, height, rectcolors, id, attr) {
                        $scope.hidechild = false;
                        var rectangle = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
                        rectangle.setAttribute('x', x);
                        rectangle.setAttribute('y', y);
                        rectangle.setAttribute('rx', rx);
                        rectangle.setAttribute('ry', ry);
                        rectangle.setAttribute('id', id);
                        rectangle.setAttribute('width', width);
                        rectangle.setAttribute('height', height);
                        rectangle.setAttribute('style', rectcolors);
                        rectangle.setAttribute('attr', attr);
                        if (rectangle.getAttribute('attr') == 'computeflag_hide') {
                            rectangle.setAttribute('class', 'computeflag_hide');
                        }

                        if (rectangle.getAttribute('attr') == 'controlflag_hide') {
                            rectangle.setAttribute('class', 'controlflag_hide');
                        }

                        if (rectangle.getAttribute('attr') == 'storageflag_hide') {
                            rectangle.setAttribute('class', 'storageflag_hide');
                        }



                        setTimeout(function () {
                            if (rectangle.getAttribute('attr') == 'computetoggle') {
                                var el = document.getElementById(id);

                                el.setAttribute('ng-click', 'computetogglefun()');
                                el.setAttribute('class', 'handcursor');
                                compile(el);
                            }

                            if (rectangle.getAttribute('attr') == 'controltoggle') {
                                var e2 = document.getElementById(id);

                                e2.setAttribute('ng-click', 'controltogglefun()');
                                e2.setAttribute('class', 'handcursor');
                                compile(e2);
                            }

                            if (rectangle.getAttribute('attr') == 'storagetoggle') {
                                var e3 = document.getElementById(id);

                                e3.setAttribute('ng-click', 'storagetogglefun()');
                                e3.setAttribute('class', 'handcursor');
                                compile(e3);
                            }
                        }, 1000);
                        svg.appendChild(rectangle);
                    };

                    $scope.addtooltip = function (id, text) {
                        setTimeout(function () {
                            var title = document.createElementNS("http://www.w3.org/2000/svg", "title");
                            title.textContent = text;
                            title.setAttribute('class', 'tooltipclass');
                            document.getElementById(id).appendChild(title);
                        }, 1000);
                    };

                    function compile(element) {
                        var el = angular.element(element);
                        $scope = el.scope();
                        $compile(el)($scope)

                    }
                    ;

                    $scope.computetogglefun = function () {
                        var rectangle;
                        var verticlline;
                        var horizonatalline;
                        var textid;
                        var textname;

                        for (var i = 0; i < $scope.toggleRectangle.length; i++) {
                            if ($scope.toggleRectangle[i][0] == 'computeflag') {
                                rectangle = document.getElementById($scope.toggleRectangle[i][1]);
                                if (rectangle.getAttribute('class') == 'computeflag_hide') {
                                    $('#' + $scope.toggleRectangle[i][1]).attr('class', 'computeflag_show');
                                } else {
                                    $('#' + $scope.toggleRectangle[i][1]).attr('class', 'computeflag_hide');
                                }
                            }
                        }

                        for (var j = 0; j < $scope.verticleLinetoggle.length; j++) {
                            if ($scope.verticleLinetoggle[j][0] == 'computeflag') {
                                verticlline = document.getElementById($scope.verticleLinetoggle[j][1]);
                                if (verticlline.getAttribute('class') == 'computeflag_hide') {
                                    $('#' + $scope.verticleLinetoggle[j][1]).attr('class', 'computeflag_show');
                                } else {
                                    $('#' + $scope.verticleLinetoggle[j][1]).attr('class', 'computeflag_hide');
                                }
                            }
                        }

                        for (var k = 0; k < $scope.horizontalLinetoggle.length; k++) {
                            if ($scope.horizontalLinetoggle[k][0] == 'computeflag') {
                                horizonatalline = document.getElementById($scope.horizontalLinetoggle[k][1]);
                                if (horizonatalline.getAttribute('class') == 'computeflag_hide') {
                                    $('#' + $scope.horizontalLinetoggle[k][1]).attr('class', 'computeflag_show');
                                } else {
                                    $('#' + $scope.horizontalLinetoggle[k][1]).attr('class', 'computeflag_hide');
                                }
                            }
                        }

                        for (var l = 0; l < $scope.textidtoggle.length; l++) {
                            if ($scope.textidtoggle[l][0] == 'computeflag') {
                                textid = document.getElementById($scope.textidtoggle[l][1]);
                                if (textid.getAttribute('class') == 'computeflag_hide') {
                                    $('#' + $scope.textidtoggle[l][1]).attr('class', 'computeflag_show');
                                } else {
                                    $('#' + $scope.textidtoggle[l][1]).attr('class', 'computeflag_hide');
                                }
                            }
                        }

                        for (var m = 0; m < $scope.texttoggle.length; m++) {
                            if ($scope.texttoggle[m][0] == 'computeflag') {
                                textname = document.getElementById($scope.texttoggle[m][1]);
                                if (textname.getAttribute('class') == 'computeflag_hide') {
                                    $('#' + $scope.texttoggle[m][1]).attr('class', 'computeflag_show');
                                } else {
                                    $('#' + $scope.texttoggle[m][1]).attr('class', 'computeflag_hide');
                                }
                            }
                        }
                    };

                    $scope.controltogglefun = function () {
                         var rectangle;
                        var verticlline;
                        var horizonatalline;
                        var textid;
                        var textname;

                        for (var i = 0; i < $scope.toggleRectangle.length; i++) {
                            if ($scope.toggleRectangle[i][0] == 'controlflag') {
                                rectangle = document.getElementById($scope.toggleRectangle[i][1]);
                                if (rectangle.getAttribute('class') == 'controlflag_hide') {
                                    $('#' + $scope.toggleRectangle[i][1]).attr('class', 'controlflag_show');
                                } else {
                                    $('#' + $scope.toggleRectangle[i][1]).attr('class', 'controlflag_hide');
                                }
                            }
                        }

                        for (var j = 0; j < $scope.verticleLinetoggle.length; j++) {
                            if ($scope.toggleRectangle[j][0] == 'controlflag') {
                                verticlline = document.getElementById($scope.verticleLinetoggle[j][1]);
                                if (verticlline.getAttribute('class') == 'controlflag_hide') {
                                    $('#' + $scope.verticleLinetoggle[j][1]).attr('class', 'controlflag_show');
                                } else {
                                    $('#' + $scope.verticleLinetoggle[j][1]).attr('class', 'controlflag_hide');
                                }
                            }
                        }

                        for (var k = 0; k < $scope.horizontalLinetoggle.length; k++) {
                            if ($scope.horizontalLinetoggle[k][0] == 'controlflag') {
                                horizonatalline = document.getElementById($scope.horizontalLinetoggle[k][1]);
                                if (horizonatalline.getAttribute('class') == 'controlflag_hide') {
                                    $('#' + $scope.horizontalLinetoggle[k][1]).attr('class', 'controlflag_show');
                                } else {
                                    $('#' + $scope.horizontalLinetoggle[k][1]).attr('class', 'controlflag_hide');
                                }
                            }
                        }

                        for (var l = 0; l < $scope.textidtoggle.length; l++) {
                            if ($scope.textidtoggle[l][0] == 'controlflag') {
                                textid = document.getElementById($scope.textidtoggle[l][1]);
                                if (textid.getAttribute('class') == 'controlflag_hide') {
                                    $('#' + $scope.textidtoggle[l][1]).attr('class', 'controlflag_show');
                                } else {
                                    $('#' + $scope.textidtoggle[l][1]).attr('class', 'controlflag_hide');
                                }
                            }
                        }

                        for (var m = 0; m < $scope.texttoggle.length; m++) {
                            if ($scope.texttoggle[m][0] == 'controlflag') {
                                textname = document.getElementById($scope.texttoggle[m][1]);
                                if (textname.getAttribute('class') == 'controlflag_hide') {
                                    $('#' + $scope.texttoggle[m][1]).attr('class', 'controlflag_show');
                                } else {
                                    $('#' + $scope.texttoggle[m][1]).attr('class', 'controlflag_hide');
                                }
                            }
                        }
                    };

                    $scope.storagetogglefun = function () {
                      var rectangle;
                        var verticlline;
                        var horizonatalline;
                        var textid;
                        var textname;
                          for (var i = 0; i < $scope.toggleRectangle.length; i++) {
                            if ($scope.toggleRectangle[i][0] == 'storageflag') {
                                rectangle = document.getElementById($scope.toggleRectangle[i][1]);
                                if (rectangle.getAttribute('class') == 'storageflag_hide') {
                                    $('#' + $scope.toggleRectangle[i][1]).attr('class', 'storageflag_show');
                                } else {
                                    $('#' + $scope.toggleRectangle[i][1]).attr('class', 'storageflag_hide');
                                }
                            }
                        }

                        for (var j = 0; j < $scope.verticleLinetoggle.length; j++) {
                            if ($scope.toggleRectangle[j][0] == 'storageflag') {
                                verticlline = document.getElementById($scope.verticleLinetoggle[j][1]);
                                if (verticlline.getAttribute('class') == 'storageflag_hide') {
                                    $('#' + $scope.verticleLinetoggle[j][1]).attr('class', 'storageflag_show');
                                } else {
                                    $('#' + $scope.verticleLinetoggle[j][1]).attr('class', 'storageflag_hide');
                                }
                            }
                        }

                        for (var k = 0; k < $scope.horizontalLinetoggle.length; k++) {
                            if ($scope.horizontalLinetoggle[k][0] == 'storageflag') {
                                horizonatalline = document.getElementById($scope.horizontalLinetoggle[k][1]);
                                if (horizonatalline.getAttribute('class') == 'storageflag_hide') {
                                    $('#' + $scope.horizontalLinetoggle[k][1]).attr('class', 'storageflag_show');
                                } else {
                                    $('#' + $scope.horizontalLinetoggle[k][1]).attr('class', 'storageflag_hide');
                                }
                            }
                        }

                        for (var l = 0; l < $scope.textidtoggle.length; l++) {
                            if ($scope.textidtoggle[l][0] == 'storageflag') {
                                textid = document.getElementById($scope.textidtoggle[l][1]);
                                if (textid.getAttribute('class') == 'storageflag_hide') {
                                    $('#' + $scope.textidtoggle[l][1]).attr('class', 'storageflag_show');
                                } else {
                                    $('#' + $scope.textidtoggle[l][1]).attr('class', 'storageflag_hide');
                                }
                            }
                        }

                        for (var m = 0; m < $scope.texttoggle.length; m++) {
                            if ($scope.texttoggle[m][0] == 'storageflag') {
                                textname = document.getElementById($scope.texttoggle[m][1]);
                                if (textname.getAttribute('class') == 'storageflag_hide') {
                                    $('#' + $scope.texttoggle[m][1]).attr('class', 'storageflag_show');
                                } else {
                                    $('#' + $scope.texttoggle[m][1]).attr('class', 'storageflag_hide');
                                }
                            }
                        }
                        
                    };



                }]);
})();



