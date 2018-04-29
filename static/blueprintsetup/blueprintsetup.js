/**
 * 
 */
'use strict';


var StepProtoType = function () {
    this.stepId = '';
    this.stepName = '';
}

var StepContentProtoType = function () {
    this.template = "";
    this.stepId = "";
}

function CIMCProtoType() {
    this.cimc_username = 'administrope';
    this.cimc_password = '';
    this.iscimcvalidated = false;
    this.clear = function () {
        this.cimc_username = 'admin';
        this.cimc_password = '';
        this.iscimcvalidated = false;
    }
}

function NetworksProtoType() {
    this.vlan_id = '';
    this.subnet = "";
    this.gateway = "";
    this.pool = [];
    this.segments = [];
    this.defroute = false;
    this.buildNode = "";
}

function NetworkingProtoType() {
    this.domain_name = "";
    this.ntp_servers = [];
    this.domain_name_servers = [];
    this.http_proxy_servers = [];
    this.https_proxy_servers = [];
    this.networks = [];
    this.isNetworkValidated = false;
    this.dummyntp_servers = [];
    this.dummydomain_name_servers = [];
    this.dummyhttp_proxy_servers = [];
    this.dummyhttps_proxy_servers = [];
    this.dummynetworks = [];
    this.clear = function () {
        this.domain_name = "";
        this.ntp_servers = [];
        this.domain_name_servers = [];
        this.http_proxy_servers = [];
        this.https_proxy_servers = [];
        this.networks = [];
        this.isNetworkValidated = false;
        this.dummyntp_servers = [];
        this.dummydomain_name_servers = [];
        this.dummyhttp_proxy_servers = [];
        this.dummyhttps_proxy_servers = [];
        this.dummynetworks = [];
    }
}

function RedhatSubscription() {
    this.userName = "";
    this.redhatPassword = "",
            this.proxyHost = "";
    this.proxyPort = "";
    this.subscriptionPool = "";
    this.rh_ceph_subscription_pool = "";
    this.isredhatSubscriptionValidated = false;
    this.clear = function () {
        this.userName = "";
        this.redhatPassword = "",
                this.proxyHost = "";
        this.proxyPort = "";
        this.subscriptionPool = "";
        this.rh_ceph_subscription_pool = "";
        this.isredhatSubscriptionValidated = false;
    }

}

function CIMCInfoProtoType() {
    this.cimc_ip = "";

}

function RackInfoProtoType() {
    this.rack_id = "";
}

function ServerProtoType() {
    this.serverKey = '';
    this.cimc_info = new CIMCInfoProtoType();
    this.rack_info = new RackInfoProtoType();
}

function RolesProtoType() {
    this.control = [];
    this.compute = [];
    this.block_storage = [];
    this.object_storage = [];
    this.networker = [];
}

function blueprintSetupInputProtoType() {
    this.blueprintName = '',
            this.version = '';
    this.type = '';
    this.filter = '';
    this.optionalFeatures = '';
    this.SERVERS = [];
    this.CIMC_COMMON = new CIMCProtoType();
    this.NETWORKING = new NetworkingProtoType();
    this.REDHAT_SUBSCRIPTION = new RedhatSubscription();
    this.ROLES = new RolesProtoType();
}

function haproxyType() {
    this.externalvipaddr = '';
    this.virtualrouterId = '';
    this.internalvipaddr = '';
    this.mgmntvirtualId = '';
    this.isHAProxyValidated = false;
    this.clear = function () {
        this.externalvipaddr = '';
        this.virtualrouterId = '';
        this.internalvipaddr = '';
        this.mgmntvirtualId = '';
        this.isHAProxyValidated = false;
    }
}

function keystoneType() {
    this.userName = '';
    this.password = '';
    this.tenantName = '';
    this.verboseLogging = '';
    this.debugLogging = '';
    this.stdErrors = '';
    this.isKeystoneValidated = false;
    this.clear = function () {
        this.userName = '';
        this.password = '';
        this.tenantName = '';
        this.verboseLogging = '';
        this.debugLogging = '';
        this.stdErrors = '';
        this.isKeystoneValidated = false;
    }
}

function neutronType() {
    this.tenantNwtype = '';
    this.vlanRanges = '';
    this.bridgephysicalInterface = '';
    this.flatNetwork = '';
    this.physicalInterface = '';
    this.mechanismDrives = '';
    this.typeDrives = '';
    this.isNewtronValidated = false;
    this.clear = function () {
        this.tenantNwtype = '';
        this.vlanRanges = '';
        this.bridgephysicalInterface = '';
        this.flatNetwork = '';
        this.physicalInterface = '';
        this.mechanismDrives = '';
        this.typeDrives = '';
        this.isNewtronValidated = false;
    }
}

function cephType() {
    this.clusterId = '';
    this.monitorhost = '';
    this.monitormembers = '';
    this.secretUUID = '';
    this.novaBootFrom = 'ceph';
    this.isCephValidated = false;
    this.novaRBDPool = "vms";
    this.clear = function () {
        this.clusterId = '';
        this.monitorhost = '';
        this.monitormembers = '';
        this.secretUUID = '';
        this.isCephValidated = false;
        this.novaBootFrom = 'ceph';
        this.novaRBDPool = "vms";
    }
}

function glanceType() {
    this.storeBackend = 'ceph';
    this.glancePool = 'images';
    this.glanceKey = '';
    this.isGlanceValidated = false;
    this.clear = function () {
        this.storeBackend = 'ceph';
        this.glancePool = 'images';
        this.glanceKey = '';
        this.isGlanceValidated = false;
    }
}

function cinderType() {
    this.volumeDriver = 'ceph';
    this.cinderPool = 'volumes';
    this.cinderKey = '';
    this.isCinderValidated = false;
    this.clear = function () {
        this.volumeDriver = 'ceph';
        this.cinderPool = 'volumes';
        this.cinderKey = '';
        this.isCinderValidated = false;
    }
}

function ProviderVMTPProtoType() {
    this.networkName = '';
    this.subnet = '';
    this.floatingIpstart = '';
    this.floatingIpend = '';
    this.gateway = '';
    this.dnsServer = '';

    this.segmentationId = "";
    this.isVMTPValidated = false;
    this.clear = function () {
        this.networkName = '';
        this.subnet = '';
        this.floatingIpstart = '';
        this.floatingIpend = '';
        this.gateway = '';
        this.dnsServer = '';
        this.segmentationId = "";

    }
}

function ExternalNetworkPrototype() {
    this.networkName = '';
    this.subnet = '';
    this.floatingIpstart = '';
    this.floatingIpend = '';
    this.gateway = '';
    this.dnsServer = '';


    this.isVMTPValidated = false;
    this.clear = function () {
        this.networkName = '';
        this.subnet = '';
        this.floatingIpstart = '';
        this.floatingIpend = '';
        this.gateway = '';
        this.dnsServer = '';

    }
}

function vmtpType() {
    this.extNet = false;
    this.provNet = false;
    this.providerNetwork = new ProviderVMTPProtoType();
    this.externalNetwork = new ExternalNetworkPrototype();
    this.isVMTPValidated = false;
    this.clear = function () {
        this.extNet = false;
        this.provNet = false;
        this.providerNetwork.clear();
        this.externalNetwork.clear();
        this.isVMTPValidated = false;
    }
}

function setupDataProtoType() {
    this.isPhysicalSetupValidated = false;
    this.isOpenstackSetupValidated = false;
    this.isInitialSetupValidated = false;
    this.initialSetupData = new initialSetupDataProtoType();
    this.physicalSetupData = new physicalSetupDataProtoType();
    this.openstackSetupData = new openstackSetupDataProtoType();
    this.clearSetup = function () {
        this.initialSetupData.clear();
        this.physicalSetupData.clear();
        this.openstackSetupData.clear();
    }
}

function physicalSetupDataProtoType() {
    this.SERVERS = new ServerProtoType();
    this.CIMC_COMMON = new CIMCProtoType();
    this.NETWORKING = new NetworkingProtoType();
    this.REDHAT_SUBSCRIPTION = new RedhatSubscription();
    this.ROLES = new RolesProtoType();
    this.UCSM = new ucsmProtoType();
    this.registryobj = new registrySetupType();
    this.clear = function () {
        this.SERVERS.clear();
        this.CIMC_COMMON.clear();
        this.NETWORKING.clear();
        this.REDHAT_SUBSCRIPTION.clear();
        //this.ROLES.clear();
        this.UCSM.clear();
        this.registryobj.clear();
    }
}

function initialSetupDataProtoType() {
    this.blueprintName = '',
            this.version = '';
    this.type = 'B';
    this.filter = 'VXLAN/Linux Bridge';
    this.optionalFeatures = '';
    this.isInitialSetupValidated = false;
    this.isCloudPulse = false;
    this.isVMTP = true;
    this.isHeat = false;
    this.clear = function () {
        this.blueprintName = '',
                this.version = '';
        this.type = 'B';
        this.filter = 'VxLAN/Linux Bridge';
        this.optionalFeatures = '';
        this.isInitialSetupValidated = false;
        this.isCloudPulse = false;
        this.isVMTP = true;
        this.isHeat = false;
        this.blueprintName = '',
                this.version = '';
        this.type = 'B';
        this.filter = 'VxLAN/Linux Bridge';
        this.optionalFeatures = '';
        this.isInitialSetupValidated = false;
        this.isCloudPulse = false;
        this.isVMTP = false;
        this.isHeat = false;
    }
}

function ucsmProtoType() {
    this.isUCSMValidated = false;
    this.username = "admin";
    this.password = "";
    this.ucsmIP = "";
    this.resourcePrefix = "";
    this.mraidCard = false;
    this.ucsmPlugin = false;
    this.clear = function () {
        this.isUCSMValidated = false;
        this.username = "admin";
        this.password = "";
        this.ucsmIP = "";
        this.resourcePrefix = "";
    }
}

function ServerProtoType() {
    this.serverUserName = "";
    this.serverArray = [];
    this.isServersValidated = false;
    this.CIMC_User_Name = "";
    this.CIMC_Password = "";
    this.serverArrayDummy = [];
    this.clear = function () {
        this.serverArray = [];
        this.isServersValidated = false;
        this.serverArrayDummy = [];
    }
}

function openstackSetupDataProtoType() {
    this.haProxyData = new haproxyType();
    this.keystoneData = new keystoneType();
    this.neutronData = new neutronType();
    this.cephData = new cephType();
    this.glanceData = new glanceType();
    this.cinderData = new cinderType();
    this.vmtpData = new vmtpType();
    this.tlsobj = new tlsType();
    this.elkobj = new elkType();
    this.clear = function () {
        this.haProxyData.clear();
        this.keystoneData.clear();
        this.neutronData.clear();
        this.cephData.clear();
        this.glanceData.clear();
        this.cinderData.clear();
        this.vmtpData.clear();
        this.tlsobj.clear();
        this.elkobj.clear();
    }
}
function tlsType() {

    this.externallbviptls = false;
    this.externallbvipcert = "";
    this.externallbvipcacert = "";
    this.isTLSValidated = true;
    this.clear = function () {
        this.externallbviptls = false;
        this.externallbvipcert = "";
        this.externallbvipcacert = "";
    }
}

function elkType() {
    this.password = "";
    this.frequency = "weely";
    this.size = 2.0;
    this.isELKValidated = true;
    this.isElkSupported = false;
    this.clear = function () {
    	this.password = "";
        this.frequency = "weekly";
        this.size = 2.0;
        this.isELKValidated = true;
        this.isElkSupported = false;
    }
}

function registrySetupType(){
    this.registryUsername = "";
    this.registryPassword = "";
    this.registryEmail = "";
    this.isRegistryValidated = false;
    this.clear = function(){
        this.registryUsername = "";
        this.registryPassword = "";
        this.registryEmail = "";
        this.isRegistryValidated = false;
    }
}

(function () {
    'use strict';
    angular.module('mercuryInstaller.blueprintSetup', ['mercuryInstaller.utility', 'mercuryInstaller.blueprintSetup.physicalSetupWizard', 'mercuryInstaller.blueprintSetup.openstackSetupWizard', 'ngRoute', 'mercuryInstaller.widgets', 'mercuryInstaller.globals', 'ngAnimate', 'ngTouch', 'ui.grid', 'ui.grid.selection', 'ui.grid.exporter','ui.grid.autoResize','ui.grid.resizeColumns', 'ui.grid.moveColumns'])

            .config(['$routeProvider', function ($routeProvider) {
                    $routeProvider
                            .when('/blueprintsetup', {
                                templateUrl: '../static/blueprintsetup/blueprintsetup.html',
                                controller: 'BlueprintSetupCtrl'
                            });
                }])
            .controller('BlueprintSetupCtrl', ['$scope', '$rootScope', '$location', 'BlueprintCreationService', 'editObjService', 'BlueprintManagementFactory', 'PopulateDataFactory', 'ValidationFactory', 'Events','$interval', function ($scope, $rootScope, $location, BlueprintCreationService, editObjService, BlueprintManagementFactory, PopulateDataFactory, ValidationFactory, Events,$interval) {

                    $scope.bluePrintSetupInput = new setupDataProtoType();
                    $scope.isPhysicalSetupValidated = false;
                    $scope.isOpenstackSetupValidated = false;
                    $scope.isInitialSetupValidated = false;
                    $scope.yamlImportObject = {
                        yamlFileContent: "",
                        yamlFileName: ""
                    };
                    $scope.$broadcast("ClearValidation");
                    $scope.isEdit = "0";

                    $scope.activeTab = -1;

                    var editData = editObjService.get();
                    $scope.uuid = editData.uuid;
                    editObjService.set(null, "");

                    $scope.sharedObject = {
                        cephMode: "Dedicated",
                        isProvider: false,
                        isExternal: false,
                        type: $scope.bluePrintSetupInput.initialSetupData.type,
                        tenantNetwork: $scope.bluePrintSetupInput.initialSetupData.filter,
                        enableUCSMPlugin : false

                    };



                    $scope.popupText = "";

                    $scope.isVisible = false;

                    $scope.onProceed = function () {
                        $scope.isVisible = false;
                        $scope.performTaskWaitaingForConfirmation();
                    };
                    $scope.onCancel = function () {
                        $scope.isVisible = false;
                        $scope.actionsTobeTakenToRevert();
                    };
                    $scope.redirectToEdit = function () {
                        //$scope.isVisible = false;
                        $scope.bluePrintSetupInput.clearSetup();
                        setTimeout(function () {
                            window.location = '#/blueprintmgmt';
                        }, 400);

                    };
                    $scope.clearAllFields = function () {
                        $scope.bluePrintSetupInput.clearSetup();
                        $scope.bluePrintSetupInput.initialSetupData.filter = "VXLAN/Linux Bridge";
                        $scope.sharedObject.tenantNetwork = "VXLAN/Linux Bridge";
                        $scope.sharedObject.type = "B";
                        $scope.bluePrintSetupInput.initialSetupData.type = "B";
                        $scope.sharedObject.cephMode = "Dedicated";
                        $scope.yamlImportObject.yamlFileName = "";

                        $scope.$broadcast(Events.CLEARFIELDSCALLED);

                    };
                    $scope.clearFields = function () {
                        if ($scope.isEdit == "1") {
                            $scope.popupText = "This will redirect you back to Blueprint Management Page, without saving any changes. Are you sure you want to proceed?";
                            $scope.isVisible = true;
                            $scope.performTaskWaitaingForConfirmation = $scope.redirectToEdit;
                            $scope.actionsTobeTakenToRevert = function(){};
                        } else {
                            $scope.popupText = "This will clear out all the fields. Are you sure you want to proceed?";
                            $scope.isVisible = true;
                            $scope.performTaskWaitaingForConfirmation = $scope.clearAllFields;
                            $scope.actionsTobeTakenToRevert = function(){};
                        //$scope.bluePrintSetupInput.clearSetup();
                        }
                    };
                    $scope.populateInitialSetup = function (wholeSetup) {
                        if(wholeSetup){
                            $scope.bluePrintSetupInput.initialSetupData.blueprintName = wholeSetup.name;
                            $scope.bluePrintSetupInput.initialSetupData.type = wholeSetup.meta.Platform;
                        }


                    };
                    $scope.populateFields = function (jsonData, wholeSetup) {
                        $scope.bluePrintSetupInput.physicalSetupData.clear();
                        $scope.bluePrintSetupInput.openstackSetupData.clear();
                        $scope.bluePrintSetupInput.initialSetupData.type = 'B';
                        $scope.bluePrintSetupInput.initialSetupData.filter = 'VxLAN/Linux Bridge';
                        $scope.bluePrintSetupInput.initialSetupData.optionalFeatures = '';
                        $scope.bluePrintSetupInput.initialSetupData.isInitialSetupValidated = false;
                        $scope.bluePrintSetupInput.initialSetupData.isCloudPulse = false;

                        $scope.bluePrintSetupInput.initialSetupData.isHeat = false;
                        $scope.bluePrintSetupInput.initialSetupData.version = '';
                        $scope.bluePrintSetupInput.initialSetupData.type = 'B';
                        $scope.bluePrintSetupInput.initialSetupData.filter = 'VxLAN/Linux Bridge';
                        $scope.bluePrintSetupInput.initialSetupData.optionalFeatures = '';
                        $scope.bluePrintSetupInput.initialSetupData.isInitialSetupValidated = false;
                        $scope.bluePrintSetupInput.initialSetupData.isCloudPulse = false;

                        $scope.bluePrintSetupInput.initialSetupData.isHeat = false;

                        if ($scope.uuid != undefined && $scope.isEdit == "1") {
                            $scope.populateInitialSetup(wholeSetup);
                        }
                        var setupData = $scope.bluePrintSetupInput;
                        if (jsonData.hasOwnProperty('UCSM-COMMON')) {
                            setupData.initialSetupData.type = "B";
                            $scope.sharedObject.type = "B";
                            setupData.physicalSetupData.UCSM.username = jsonData['UCSM-COMMON'].ucsm_username;
                            setupData.physicalSetupData.UCSM.password = jsonData['UCSM-COMMON'].ucsm_password;
                            setupData.physicalSetupData.UCSM.ucsmIP = jsonData['UCSM-COMMON'].ucsm_ip;
                            setupData.physicalSetupData.UCSM.resourcePrefix = jsonData['UCSM-COMMON'].ucsm_resource_prefix;

                        }
                        if (jsonData.hasOwnProperty('UCSMCOMMON')) {
                            setupData.initialSetupData.type = "B";
                            $scope.sharedObject.type = "B";
                            setupData.physicalSetupData.UCSM.username = jsonData['UCSMCOMMON'].ucsm_username;
                            setupData.physicalSetupData.UCSM.password = jsonData['UCSMCOMMON'].ucsm_password;
                            setupData.physicalSetupData.UCSM.ucsmIP = jsonData['UCSMCOMMON'].ucsm_ip;
                            setupData.physicalSetupData.UCSM.resourcePrefix = jsonData['UCSMCOMMON'].ucsm_resource_prefix;

                        }
                        if (jsonData.hasOwnProperty('CIMC-COMMON')) {
                            setupData.initialSetupData.type = "C";
                            $scope.sharedObject.type = "C";
                            setupData.physicalSetupData.CIMC_COMMON.cimc_username = jsonData['CIMC-COMMON']['cimc_username'];
                            setupData.physicalSetupData.CIMC_COMMON.cimc_password = jsonData['CIMC-COMMON']['cimc_password'];

                        }
                        if (jsonData.hasOwnProperty('NETWORKING')) {
                            setupData.physicalSetupData.NETWORKING.domain_name = jsonData['NETWORKING']['domain_name'];
                            // setupData.physicalSetupData.NETWORKING.ntp_servers = jsonData['NETWORKING']['ntp_servers'];
                            var ntp_servers_array = jsonData['NETWORKING']['ntp_servers'];
                            var cntid = -1;
                            setupData.physicalSetupData.NETWORKING.ntp_servers = [];
                            for (var i in ntp_servers_array) {
                                cntid++;
                                setupData.physicalSetupData.NETWORKING.ntp_servers.push({
                                    'name': ntp_servers_array[i],
                                    'selected': false,
                                    'id': cntid
                                });
                            }
                            //  setupData.physicalSetupData.NETWORKING.domain_name_servers = jsonData['NETWORKING']['domain_name_servers'];
                            var dnsserver_array = jsonData['NETWORKING']['domain_name_servers'];
                            var cntid = -1;
                            setupData.physicalSetupData.NETWORKING.domain_name_servers = [];
                            for (var i in dnsserver_array) {
                                cntid++;
                                setupData.physicalSetupData.NETWORKING.domain_name_servers.push({
                                    'name': dnsserver_array[i],
                                    'selected': false,
                                    'id': cntid
                                })
                            }

                            // setupData.physicalSetupData.NETWORKING.http_proxy_servers = jsonData['NETWORKING']['http_proxy_servers'];
                            var httpServer_array = jsonData['NETWORKING']['http_proxy_servers'];
                            var cntid = -1;
                            setupData.physicalSetupData.NETWORKING.http_proxy_servers = [];
                            for (i in httpServer_array) {
                                cntid++;
                                setupData.physicalSetupData.NETWORKING.http_proxy_servers.push({
                                    'name': httpServer_array[i],
                                    'selected': false,
                                    'id': cntid
                                })
                            }

                            // setupData.physicalSetupData.NETWORKING.https_proxy_servers = jsonData['NETWORKING']['https_proxy_servers'];
                            var httpsServer_array = jsonData['NETWORKING']['https_proxy_servers'];
                            var cntid = -1;
                            setupData.physicalSetupData.NETWORKING.https_proxy_servers=[];
                            for (i in httpsServer_array) {
                                cntid++;
                                setupData.physicalSetupData.NETWORKING.https_proxy_servers.push({
                                    'name': httpsServer_array[i],
                                    'selected': false,
                                    'id': cntid
                                })
                            }


                            setupData.physicalSetupData.NETWORKING.networks = [];
                            var networksArray = jsonData['NETWORKING']['networks'];
                            var networkId = -1;
                            setupData.physicalSetupData.NETWORKING.networks = [];
                            for (var i in networksArray) {
                                networkId++;
                                setupData.physicalSetupData.NETWORKING.networks.push({
                                    'vlanInput': networksArray[i].vlan_id,
                                    'SubwayInput': networksArray[i].subnet,
                                    'gatwayInput': networksArray[i].gateway,
                                    'pool': networksArray[i].pool ? networksArray[i].pool.join(",") : "",
                                    'segmentInput': networksArray[i].segments ? networksArray[i].segments.join(",") : "",
                                    'defroute': networksArray[i].defroute ? networksArray[i].defroute : false,
                                    'networkId': networkId,
                                    'isVisible': false,
                                    'disabled': false,
                                    'selected': false,
                                    'buildNode':networksArray[i].build_node
                                });


                            }




                        }

                        if (jsonData.hasOwnProperty('SERVERS')) {

                            var cnt = -1;
                            setupData.physicalSetupData.SERVERS.serverArray = [];
                            for (var key in jsonData['SERVERS']) {
                                var rackUnitId = "";
                                cnt++;
                                var obj = jsonData['SERVERS'][key];
                                if(setupData.initialSetupData.type=="B"){
                                    if(obj['ucsm_info']){
                                        rackUnitId = obj['ucsm_info']['rack-unit_id'];
                                    }
                                }
                                var chasisId = "";
                                var bladeId = "";
                                if(obj['ucsm_info'] && !isNaN(obj['ucsm_info']['chassis_id'])){
                                    chasisId = Number(obj['ucsm_info']['chassis_id']);
                                }else{
                                    chasisId = "";
                                }
                                if(obj['ucsm_info'] && !isNaN(obj['ucsm_info']['blade_id'])){
                                    bladeId = Number(obj['ucsm_info']['blade_id']);
                                }else{
                                    bladeId = "";
                                }
                                setupData.physicalSetupData.SERVERS.serverArray.push({
                                    'serverName': key,
                                    'CIMC_IP': obj['cimc_info'] ? obj['cimc_info']['cimc_ip'] :'' ,
                                    'rackId': obj['rack_info']['rack_id'],
                                    'role': '',
                                    'serverIndex': cnt,
                                    'serverType': setupData.initialSetupData.type == "B" ? obj['ucsm_info']['server_type'] : '',
                                    'bootDrive': setupData.initialSetupData.type == "B" ? '' : obj.hasOwnProperty('hardware_info') == true ? (obj.hardware_info.boot_drive) : '',
                                    'chasisId': chasisId,
                                    'bladeId': bladeId,
                                    'VICSlot': obj["hardware_info"] ? obj["hardware_info"]["VIC_slot"] : "",
                                    'CIMC_User_Name': obj['cimc_info'] ? obj['cimc_info']['cimc_username'] : "",
                                    'CIMC_Password': obj['cimc_info'] ? obj['cimc_info']['cimc_password'] : "",
                                    'selected': false,
                                    'rackUnitId':rackUnitId

                                });


                            }

                        }

                        if (jsonData.hasOwnProperty('ROLES')) {
                            var controlArr = jsonData['ROLES']['control'];
                            var computeArr = jsonData['ROLES']['compute'];
                            var objetcStorage = jsonData['ROLES']['block_storage'];
                            for (var i in controlArr) {
                                for (var j in setupData.physicalSetupData.SERVERS.serverArray) {
                                    if (controlArr[i] == setupData.physicalSetupData.SERVERS.serverArray[j].serverName) {
                                        setupData.physicalSetupData.SERVERS.serverArray[j].role = 'control';
                                    }

                                }

                            }
                            for (var i in computeArr) {
                                for (var j in setupData.physicalSetupData.SERVERS.serverArray) {
                                    if (computeArr[i] == setupData.physicalSetupData.SERVERS.serverArray[j].serverName) {
                                        setupData.physicalSetupData.SERVERS.serverArray[j].role = 'compute';
                                    }

                                }

                            }
                            for (var i in objetcStorage) {
                                for (var j in setupData.physicalSetupData.SERVERS.serverArray) {
                                    if (objetcStorage[i] == setupData.physicalSetupData.SERVERS.serverArray[j].serverName) {
                                        setupData.physicalSetupData.SERVERS.serverArray[j].role = 'block_storage';
                                    }

                                }

                            }
                            if (objetcStorage != null && objetcStorage.length > 0) {
                                $scope.sharedObject.cephMode = "Dedicated";
                            } else {
                                $scope.sharedObject.cephMode = "Central";
                            }
                        }

                        if (jsonData.hasOwnProperty('external_lb_vip_address')) {
                            setupData.openstackSetupData.haProxyData.externalvipaddr = jsonData['external_lb_vip_address']
                        }
                        if (jsonData.hasOwnProperty('VIP_INTERFACE')) {

                        }
                        if (jsonData.hasOwnProperty('VIRTUAL_ROUTER_ID')) {
                            setupData.openstackSetupData.haProxyData.virtualrouterId = jsonData['VIRTUAL_ROUTER_ID']?Number(jsonData['VIRTUAL_ROUTER_ID']):"";
                        }
                        if (jsonData.hasOwnProperty('internal_lb_vip_address')) {
                            setupData.openstackSetupData.haProxyData.internalvipaddr = jsonData['internal_lb_vip_address'];
                        }
                        if (jsonData.hasOwnProperty('MGMT_VIP_INTERFACE')) {

                        }
                        if (jsonData.hasOwnProperty('MGMT_VIRTUAL_ROUTER_ID')) {
                            setupData.openstackSetupData.haProxyData.mgmntvirtualId = jsonData['MGMT_VIRTUAL_ROUTER_ID'];
                        }
                        if (jsonData.hasOwnProperty('ADMIN_USER')) {
                            setupData.openstackSetupData.keystoneData.userName = jsonData['ADMIN_USER'];
                        }
                        if (jsonData.hasOwnProperty('ADMIN_USER_PASSWORD')) {
                            setupData.openstackSetupData.keystoneData.password = jsonData['ADMIN_USER_PASSWORD'];
                        }
                        if (jsonData.hasOwnProperty('ADMIN_TENANT_NAME')) {
                            setupData.openstackSetupData.keystoneData.tenantName = jsonData['ADMIN_TENANT_NAME'];
                        }

                        if (jsonData.hasOwnProperty('TENANT_NETWORK_TYPES')) {
                            setupData.openstackSetupData.neutronData.tenantNwtype = jsonData['TENANT_NETWORK_TYPES'];
                            setupData.initialSetupData.filter = jsonData['TENANT_NETWORK_TYPES'].indexOf("VLAN") != "-1" ? "OVS/VLAN" : "VXLAN/Linux Bridge";
                            $scope.sharedObject.tenantNetwork = jsonData['TENANT_NETWORK_TYPES'].indexOf("VLAN") != "-1" ? "OVS/VLAN" : "VXLAN/Linux Bridge";
                        }
                        if (jsonData.hasOwnProperty('TENANT_VLAN_RANGES')) {
                            setupData.openstackSetupData.neutronData.vlanRanges = jsonData["TENANT_VLAN_RANGES"];
                        }
                        if (jsonData.hasOwnProperty('NUMA_SUPPORT')) {
                            setupData.openstackSetupData.neutronData.enableNumaSupport = jsonData["NUMA_SUPPORT"];
                        }
                        if (jsonData.hasOwnProperty('ENABLE_JUMBO_FRAMES')) {
                            setupData.openstackSetupData.neutronData.enableJumboFrame = jsonData["ENABLE_JUMBO_FRAMES"];
                        }
                        if (jsonData.hasOwnProperty('TENANT_VLAN_RANGES')) {
                            setupData.openstackSetupData.neutronData.vlanRanges = jsonData['TENANT_VLAN_RANGES'];
                        }

                        if (jsonData.hasOwnProperty('MECHANISM_DRIVERS')) {
                            setupData.openstackSetupData.neutronData.mechanismDrives = jsonData['MECHANISM_DRIVERS'];
                        }

                        if (jsonData.hasOwnProperty('CLUSTER_ID')) {
                            setupData.openstackSetupData.cephData.clusterId = jsonData['CLUSTER_ID'];
                        }

                        if (jsonData.hasOwnProperty('MON_HOSTS')) {
                            setupData.openstackSetupData.cephData.monitorhost = jsonData['MON_HOSTS'];
                        }

                        if (jsonData.hasOwnProperty('MON_MEMBERS')) {
                            setupData.openstackSetupData.cephData.monitormembers = jsonData['MON_MEMBERS'];
                        }

                        if (jsonData.hasOwnProperty('SECRET_UUID')) {
                            setupData.openstackSetupData.cephData.secretUUID = jsonData['SECRET_UUID'];
                        }

                        if (jsonData.hasOwnProperty('GLANCE_CLIENT_KEY')) {
                            setupData.openstackSetupData.glanceData.glanceKey = jsonData['GLANCE_CLIENT_KEY'];
                        }

                        if (jsonData.hasOwnProperty('CINDER_CLIENT_KEY')) {
                            setupData.openstackSetupData.cinderData.cinderKey = jsonData['CINDER_CLIENT_KEY'];
                        }

                        if (jsonData.hasOwnProperty('STORE_BACKEND')) {
                            setupData.openstackSetupData.glanceData.storeBackend = jsonData['STORE_BACKEND'];
                        }

                        if (jsonData.hasOwnProperty('GLANCE_RBD_POOL')) {
                            setupData.openstackSetupData.glanceData.glancePool = jsonData['GLANCE_RBD_POOL'];
                        }

                        if (jsonData.hasOwnProperty('VOLUME_DRIVER')) {
                            setupData.openstackSetupData.cinderData.volumeDriver = jsonData['VOLUME_DRIVER'];
                        }

                        if (jsonData.hasOwnProperty('CINDER_RBD_POOL')) {
                            setupData.openstackSetupData.cinderData.cinderPool = jsonData['CINDER_RBD_POOL'];
                        }

                        if(jsonData.hasOwnProperty('NOVA_RBD_POOL')){
                            setupData.openstackSetupData.cephData.novaRBDPool = jsonData['NOVA_RBD_POOL'];
                        }

                        if (jsonData.hasOwnProperty('VMTP_VALIDATION')) {
                            setupData.initialSetupData.isVMTP = true;

                            if (jsonData['VMTP_VALIDATION'] && jsonData['VMTP_VALIDATION'].EXT_NET) {
                                setupData.openstackSetupData.vmtpData.extNet = true;
                                setupData.openstackSetupData.vmtpData.externalNetwork.networkName = jsonData['VMTP_VALIDATION'].EXT_NET.NET_NAME;
                                setupData.openstackSetupData.vmtpData.externalNetwork.subnet = jsonData['VMTP_VALIDATION'].EXT_NET.NET_SUBNET;
                                setupData.openstackSetupData.vmtpData.externalNetwork.floatingIpstart = jsonData['VMTP_VALIDATION'].EXT_NET.NET_IP_START;
                                setupData.openstackSetupData.vmtpData.externalNetwork.floatingIpend = jsonData['VMTP_VALIDATION'].EXT_NET.NET_IP_END;
                                setupData.openstackSetupData.vmtpData.externalNetwork.gateway = jsonData['VMTP_VALIDATION'].EXT_NET.NET_GATEWAY;
                                setupData.openstackSetupData.vmtpData.externalNetwork.dnsServer = jsonData['VMTP_VALIDATION'].EXT_NET.DNS_SERVER;
                            }
                            if (jsonData['VMTP_VALIDATION'] && jsonData['VMTP_VALIDATION'].PROV_NET) {
                                setupData.openstackSetupData.vmtpData.provNet=true;
                                setupData.openstackSetupData.vmtpData.providerNetwork.networkName = jsonData['VMTP_VALIDATION'].PROV_NET.NET_NAME;
                                setupData.openstackSetupData.vmtpData.providerNetwork.subnet = jsonData['VMTP_VALIDATION'].PROV_NET.NET_SUBNET;
                                setupData.openstackSetupData.vmtpData.providerNetwork.floatingIpstart = jsonData['VMTP_VALIDATION'].PROV_NET.NET_IP_START;
                                setupData.openstackSetupData.vmtpData.providerNetwork.floatingIpend = jsonData['VMTP_VALIDATION'].PROV_NET.NET_IP_END;
                                setupData.openstackSetupData.vmtpData.providerNetwork.gateway = jsonData['VMTP_VALIDATION'].PROV_NET.NET_GATEWAY;
                                setupData.openstackSetupData.vmtpData.providerNetwork.dnsServer = jsonData['VMTP_VALIDATION'].PROV_NET.DNS_SERVER;
                                setupData.openstackSetupData.vmtpData.providerNetwork.segmentationId = jsonData['VMTP_VALIDATION'].PROV_NET.SEGMENTATION_ID;
                            }

                        }
                        
                        if(jsonData.hasOwnProperty('external_lb_vip_tls')){
                        	setupData.openstackSetupData.tlsobj.externallbviptls = jsonData['external_lb_vip_tls'];
                        }
                        
                        if(jsonData.hasOwnProperty('external_lb_vip_cert')){
                        	setupData.openstackSetupData.tlsobj.externallbvipcert = jsonData['external_lb_vip_cert'];
                        }
                        if(jsonData.hasOwnProperty('external_lb_vip_cacert')){
                        	setupData.openstackSetupData.tlsobj.externallbvipcacert = jsonData['external_lb_vip_cacert'];
                        }
                        
                        if(jsonData.hasOwnProperty('ELK') && jsonData['ELK']){
                            setupData.openstackSetupData.elkobj.isElkSupported = true;
                        	setupData.openstackSetupData.elkobj.password = jsonData['ELK']['elk_password'];
                        	setupData.openstackSetupData.elkobj.frequency = jsonData['ELK']['elk_rotation_frequency'];
                        	setupData.openstackSetupData.elkobj.size = jsonData['ELK']['elk_rotation_size'];
                        }
                        
                        if (jsonData.hasOwnProperty('OPTIONAL_SERVICE_LIST') && jsonData['OPTIONAL_SERVICE_LIST']) {
                            if (jsonData['OPTIONAL_SERVICE_LIST'].indexOf('heat') != -1) {
                                setupData.initialSetupData.isHeat = true;
                            } else {
                                setupData.initialSetupData.isHeat = false;
                            }
                            if (jsonData['OPTIONAL_SERVICE_LIST'].indexOf('cloudpulse') != -1) {
                                setupData.initialSetupData.isCloudPulse = true;
                            } else {
                                setupData.initialSetupData.isCloudPulse = false;
                            }

                        }
                        if(jsonData.hasOwnProperty('MRAID_CARD')){
                            setupData.physicalSetupData.UCSM.mraidCard = jsonData['MRAID_CARD'];
                        }
                        if(jsonData.hasOwnProperty('ENABLE_UCSM_PLUGIN')){
                            setupData.physicalSetupData.UCSM.ucsmPlugin = jsonData['ENABLE_UCSM_PLUGIN'];
                        }
                        if(jsonData.hasOwnProperty("NOVA_BOOT_FROM")){
                            setupData.openstackSetupData.cephData.novaBootFrom = jsonData["NOVA_BOOT_FROM"];
                        }
                        if(jsonData.hasOwnProperty("REGISTRY_USERNAME")){
                            setupData.physicalSetupData.registryobj.registryUsername = jsonData["REGISTRY_USERNAME"];
                        }
                        if(jsonData.hasOwnProperty("REGISTRY_PASSWORD")){
                            setupData.physicalSetupData.registryobj.registryPassword = jsonData["REGISTRY_PASSWORD"];
                        }
                        if(jsonData.hasOwnProperty("REGISTRY_EMAIL")){
                            setupData.physicalSetupData.registryobj.registryEmail = jsonData["REGISTRY_EMAIL"];
                        }
                        /*setTimeout(function(){

                        },250);*/
                        $interval(function(){
                            $scope.$broadcast("ValidateAfterUpload");
                        },250,5);

                    };

                    var setupData = $scope.bluePrintSetupInput;
                    if ($scope.uuid != "") {
                        $scope.isEdit = "1";

                        BlueprintManagementFactory.fetchSetupDataForParticularUUID($scope.uuid, function (response) {
                            var setupData = response.data.jsondata;

                            $scope.populateFields(JSON.parse(setupData), response.data);

                        }, function () {
                            $rootScope.$broadcast("ShowErrorMessage", {
                                type: 'danger',
                                msg: 'Error while fetching data',
                                disableAutoClose: false
                            });
                        });






                    }

                    $scope.getHeading = function () {
                        var headingText = "";
                        if ($scope.isEdit == "1") {
                            headingText = "Update Blueprint configuration";
                        } else
                            headingText = "Create Blueprint configuration";
                        return headingText;
                    };



                    $scope.getClearBtnLabel = function () {
                        var buttonText = "";
                        if ($scope.isEdit == "1") {
                            buttonText = "Cancel";
                        } else
                            buttonText = "Clear";
                        return buttonText;
                    }

                    $scope.postUserInput = function () {

                    };

                    $scope.checkUserInputsForInitSetup = function () {
                        var temp = $scope.bluePrintSetupInput.initialSetupData;
                        if (temp.blueprintName != "" && temp.type != undefined && temp.filter != undefined)
                            temp.isInitialSetupValidated = true;
                        else
                            temp.isInitialSetupValidated = false;
                    };

                    $scope.checkAllUserInputs = function () {
                        var setupData = $scope.bluePrintSetupInput;
                        setupData.isInitialSetupValidated = setupData.initialSetupData.isInitialSetupValidated;
                        $scope.isInitialSetupValidated = setupData.isInitialSetupValidated;
                        $scope.$broadcast("ValidateFields");
                        if (setupData.initialSetupData.type == "B") {
                            if (setupData.physicalSetupData.registryobj.isRegistryValidated && setupData.physicalSetupData.UCSM.isUCSMValidated && setupData.physicalSetupData.NETWORKING.isNetworkValidated && setupData.physicalSetupData.SERVERS.isServersValidated) {
                                $scope.isPhysicalSetupValidated = true;
                            } else {
                                $scope.isPhysicalSetupValidated = false;
                            }

                            if (setupData.openstackSetupData.haProxyData.isHAProxyValidated && setupData.openstackSetupData.neutronData.isNewtronValidated && setupData.openstackSetupData.cephData.isCephValidated && setupData.openstackSetupData.glanceData.isGlanceValidated && setupData.openstackSetupData.cinderData.isCinderValidated) {
                                if((setupData.initialSetupData.isVMTP && !setupData.openstackSetupData.vmtpData.isVMTPValidated)||(setupData.openstackSetupData.tlsobj.externallbviptls && !setupData.openstackSetupData.tlsobj.isTLSValidated)||(setupData.openstackSetupData.elkobj.isElkSupported && !setupData.openstackSetupData.elkobj.isELKValidated)){
                                    $scope.isOpenstackSetupValidated = false;
                                }else{
                                    $scope.isOpenstackSetupValidated = true;
                                }


                            } else {
                                $scope.isOpenstackSetupValidated = false;
                            }

                        } else {
                            if (setupData.physicalSetupData.registryobj.isRegistryValidated && setupData.physicalSetupData.CIMC_COMMON.iscimcvalidated && setupData.physicalSetupData.NETWORKING.isNetworkValidated && setupData.physicalSetupData.SERVERS.isServersValidated) {
                                $scope.isPhysicalSetupValidated = true;
                            } else {
                                $scope.isPhysicalSetupValidated = false;
                            }

                            if (setupData.openstackSetupData.haProxyData.isHAProxyValidated && setupData.openstackSetupData.cephData.isCephValidated && setupData.openstackSetupData.glanceData.isGlanceValidated && setupData.openstackSetupData.cinderData.isCinderValidated && setupData.openstackSetupData.neutronData.isNewtronValidated) {
                                if((setupData.initialSetupData.isVMTP && !setupData.openstackSetupData.vmtpData.isVMTPValidated)||(setupData.openstackSetupData.tlsobj.externallbviptls && !setupData.openstackSetupData.tlsobj.isTLSValidated)||(setupData.openstackSetupData.elkobj.isElkSupported && !setupData.openstackSetupData.elkobj.isELKValidated)){
                                    $scope.isOpenstackSetupValidated = false;
                                }else{
                                    $scope.isOpenstackSetupValidated = true;
                                }
                            } else {
                                $scope.isOpenstackSetupValidated = false;
                            }
                        }
                        if ($scope.isPhysicalSetupValidated && $scope.isOpenstackSetupValidated && $scope.isInitialSetupValidated) {
                            return true;
                        } else {
                            return false;
                        }
                    };

                    $scope.checkAllUserInputsAndValidate = function () {
                        var isValid = $scope.checkAllUserInputs();

                        if (isValid) {

                        	$("#offlineValidationModal").modal({
                                backdrop: false
                            });
                            $scope.validationResponse.softwareValidation = [];
                            $scope.validationResponse.hardwareValidation = [];
                            //$scope.gridOptionsForOfflineVal.data = $scope.validationResponse;
                            $scope.showOfflineValidation = true;
                            $scope.validationtask = "";
                            $scope.overallstatus = "Offline Validation";

                            $scope.createJSONAndValidate();

                        } else {
                            $("#validationstatusmodal").modal("show");
                        }

                    };
                    $scope.loadYAMLContent = function () {
                        if ($scope.yamlImportObject.yamlFileContent !== "" && $scope.yamlImportObject.yamlFileName !== "") {
                            var jsonData = "";
                            try {
                                var YAML = window.YAML;
                                var jsonData = jsyaml.load($scope.yamlImportObject.yamlFileContent);
                            } catch (e) {
                                console.error("Error occured in YAML to JSON parsing. YAML Content:" + $scope.yamlImportObject + "\n Error:" + e);
                                if (e && e.name == "YAMLException") {
                                    $rootScope.$broadcast("ShowErrorMessage", {
                                        type: 'danger',
                                        msg: 'Error while uploading file possibly due to incorrect file format',
                                        disableAutoClose: false
                                    });
                                }

                                return;
                            }

                            $scope.populateFields(jsonData);
                            $scope.$broadcast("ValidateAfterUpload");
                            $rootScope.$broadcast("ShowErrorMessage", {
                                type: 'success',
                                msg: 'YAML Data loaded successfully',
                                disableAutoClose: false
                            });



                        }
                    };

                    $scope.openDialog = function () {
                        $('input[type=file]').trigger('click');
                    }

                    $scope.getNetworks = function (networksArray) {
                        var networks = [];
                        for (var i in networksArray) {
                            networks.push({
                                'vlan_id': networksArray[i].vlanInput,
                                'segments': networksArray[i].segmentInput ? networksArray[i].segmentInput.split(",") : []
                            });
                            if(networks[i].segments.indexOf("management/provision")!=-1 || networks[i].segments.indexOf("management")!=-1 || networks[i].segments.indexOf("provision")!=-1){
                                var ind = networks[i].segments.indexOf("management/provision");
                                if(ind!=-1){
                                    networks[i].segments.splice(ind,1);
                                    networks[i].segments.push("management");
                                    networks[i].segments.push("provision");
                                }

                                networks[i].build_node = networksArray[i].buildNode;
                            }
                            if(networks[i].segments.indexOf("external")==-1&&networks[i].segments.indexOf("provider")==-1){
                                networks[i].subnet = networksArray[i].SubwayInput;
                                networks[i].gateway = networksArray[i].gatwayInput;
                                if(networks[i].segments.indexOf("api")==-1){
                                    networks[i].pool = (networksArray[i].pool && networksArray[i].pool != "") ? networksArray[i].pool.split(",") : [];
                                }
                            }
                        }
                        return networks;
                    };

                    $scope.getNTPServers = function () {
                        var ntpServerObjArray = $scope.bluePrintSetupInput.physicalSetupData.NETWORKING.ntp_servers;
                        var ntpServers = [];
                        for (var i in ntpServerObjArray) {
                            ntpServers.push(ntpServerObjArray[i].name);
                        }
                        return ntpServers;
                    };

                    $scope.getDNSServers = function () {
                        var dnsServersObjArray = $scope.bluePrintSetupInput.physicalSetupData.NETWORKING.domain_name_servers;
                        var dnsServers = [];
                        for (var i in dnsServersObjArray) {
                            dnsServers.push(dnsServersObjArray[i].name);
                        }
                        return dnsServers;
                    };

                    $scope.getHTTPServers = function () {
                        var httpServerObjArray = $scope.bluePrintSetupInput.physicalSetupData.NETWORKING.http_proxy_servers;
                        var httpServers = [];
                        for (var i in httpServerObjArray) {
                            httpServers.push(httpServerObjArray[i].name);
                        }
                        return httpServers;
                    };

                    $scope.getHTTPSServers = function () {
                        var httpsServerObjArray = $scope.bluePrintSetupInput.physicalSetupData.NETWORKING.https_proxy_servers;
                        var httpsServers = [];
                        for (var i in httpsServerObjArray) {
                            httpsServers.push(httpsServerObjArray[i].name);
                        }
                        return httpsServers;
                    };

                    $scope.createJSONAndValidate = function () {

                        var setupData = $scope.bluePrintSetupInput;
                        var inputForRest = "";
                        var serverObjectB = {};
                        var serverObjectC = {};
                        var serverArrayObj = setupData.physicalSetupData.SERVERS.serverArray;
                        for (var i in serverArrayObj) {
                            serverObjectB[serverArrayObj[i].serverName] = {
                                'rack_info': {
                                    'rack_id': serverArrayObj[i].rackId + ""

                                },
                                'ucsm_info': {
                                    "server_type": serverArrayObj[i].serverType + ""

                                }
                            }
                            if(serverArrayObj[i].rackUnitId){
                                serverObjectB[serverArrayObj[i].serverName].ucsm_info['rack-unit_id'] = serverArrayObj[i].rackUnitId;
                            }
                            if(serverArrayObj[i].chasisId && serverArrayObj[i].chasisId!=""){
                                serverObjectB[serverArrayObj[i].serverName].ucsm_info['chassis_id'] = serverArrayObj[i].chasisId;
                            }
                            if(serverArrayObj[i].bladeId && serverArrayObj[i].bladeId!=""){
                                serverObjectB[serverArrayObj[i].serverName].ucsm_info['blade_id'] = serverArrayObj[i].bladeId;
                            }
                        }

                        for (var i in serverArrayObj) {
                            serverObjectC[serverArrayObj[i].serverName] = {};

                            if (serverArrayObj[i].rackId && serverArrayObj[i].rackId != "") {
                                serverObjectC[serverArrayObj[i].serverName].rack_info = {};
                                serverObjectC[serverArrayObj[i].serverName].rack_info['rack_id'] = serverArrayObj[i].rackId;
                            }

                            if (serverArrayObj[i].CIMC_IP && serverArrayObj[i].CIMC_IP != "") {
                                serverObjectC[serverArrayObj[i].serverName].cimc_info = {};
                                serverObjectC[serverArrayObj[i].serverName].cimc_info['cimc_ip'] = serverArrayObj[i].CIMC_IP;
                            }

                            if (serverArrayObj[i].CIMC_User_Name && serverArrayObj[i].CIMC_User_Name != "") {
                                serverObjectC[serverArrayObj[i].serverName].cimc_info['cimc_username'] = serverArrayObj[i].CIMC_User_Name;
                            }

                            if (serverArrayObj[i].CIMC_Password && serverArrayObj[i].CIMC_Password != "") {
                                serverObjectC[serverArrayObj[i].serverName].cimc_info['cimc_password'] = serverArrayObj[i].CIMC_Password;
                            }

                            if ((serverArrayObj[i].VICSlot && serverArrayObj[i].VICSlot != "") || (serverArrayObj[i].bootDrive && serverArrayObj[i].bootDrive != undefined)) {
                                serverObjectC[serverArrayObj[i].serverName].hardware_info = {};
                                if(serverArrayObj[i].VICSlot && serverArrayObj[i].VICSlot != "")
                                    serverObjectC[serverArrayObj[i].serverName].hardware_info['VIC_slot'] = serverArrayObj[i].VICSlot;
                                if(serverArrayObj[i].bootDrive && serverArrayObj[i].bootDrive != undefined)
                                    serverObjectC[serverArrayObj[i].serverName].hardware_info['boot_drive'] = serverArrayObj[i].bootDrive;
                            }

                        }

                        var controlArray = [];
                        var computeArray = [];
                        var blockStorageArray = [];

                        for (var i in serverArrayObj) {
                            switch (serverArrayObj[i].role) {
                                case 'control':
                                    controlArray.push(serverArrayObj[i].serverName);
                                    break;
                                case 'compute':
                                    computeArray.push(serverArrayObj[i].serverName);
                                    break;
                                case 'block_storage':
                                    blockStorageArray.push(serverArrayObj[i].serverName);
                                    break;
                            }
                        }

                        if (setupData.initialSetupData.type == 'B') {
                            inputForRest = {
                                name: setupData.initialSetupData.blueprintName,
                                meta: {
                                    BlueprintName: setupData.initialSetupData.blueprintName,
                                    Platform: setupData.initialSetupData.type,
                                    Version: setupData.initialSetupData.version,
                                    CreationDate: new Date().toGMTString(),
                                    TenantNetwork: setupData.initialSetupData.filter,
                                    ModifiedOn: ""
                                },
                                jsondata: {
                                    "UCSMCOMMON": {
                                        "ucsm_username": setupData.physicalSetupData.UCSM.username + "",
                                        "ucsm_password": setupData.physicalSetupData.UCSM.password + "",
                                        "ucsm_ip": setupData.physicalSetupData.UCSM.ucsmIP,
                                        "ucsm_resource_prefix": setupData.physicalSetupData.UCSM.resourcePrefix
                                    },
                                    "NETWORKING": {
                                        "domain_name": setupData.physicalSetupData.NETWORKING.domain_name,
                                        "ntp_servers": $scope.getNTPServers(),
                                        "domain_name_servers": $scope.getDNSServers(),
                                        "http_proxy_servers": $scope.getHTTPServers(),
                                        "https_proxy_servers": $scope.getHTTPSServers(),
                                        "networks": $scope.getNetworks(setupData.physicalSetupData.NETWORKING.networks)
                                    },
                                    "ROLES": {
                                        "control": controlArray.length == 0 ? null : controlArray,
                                        "compute": computeArray.length == 0 ? null : computeArray,
                                        "block_storage": blockStorageArray.length == 0 ? null : blockStorageArray,
                                        "object_storage": null,
                                        "networker": null
                                    },
                                    "SERVER_COMMON": {
                                        "server_username": setupData.physicalSetupData.SERVERS.serverUserName
                                    },
                                    "SERVERS": serverObjectB,
                                    "external_lb_vip_address": setupData.openstackSetupData.haProxyData.externalvipaddr,
                                    "VIRTUAL_ROUTER_ID": Number(setupData.openstackSetupData.haProxyData.virtualrouterId),
                                    "internal_lb_vip_address": setupData.openstackSetupData.haProxyData.internalvipaddr,
                                    "ADMIN_USER": setupData.openstackSetupData.keystoneData.userName,
                                    "ADMIN_USER_PASSWORD": setupData.openstackSetupData.keystoneData.password,
                                    "ADMIN_TENANT_NAME": setupData.openstackSetupData.keystoneData.tenantName,
                                    "L3_PHYSICAL_INTERFACE": setupData.openstackSetupData.neutronData.physicalInterface,
                                    "TENANT_NETWORK_TYPES": setupData.openstackSetupData.neutronData.tenantNwtype + "",
                                    "TENANT_VLAN_RANGES": setupData.openstackSetupData.neutronData.vlanRanges + "",
                                    "NOVA_BOOT_FROM":setupData.openstackSetupData.cephData.novaBootFrom+"",
                                    "VNI_RANGE": setupData.openstackSetupData.neutronData.vniRanges,
                                    "NUMA_SUPPORT": setupData.openstackSetupData.neutronData.enableNumaSupport,
                                    "ENABLE_JUMBO_FRAMES": setupData.openstackSetupData.neutronData.enableJumboFrame,

                                    "STORE_BACKEND": setupData.openstackSetupData.glanceData.storeBackend,

                                    "VOLUME_DRIVER": setupData.openstackSetupData.cinderData.volumeDriver,

                                    "MECHANISM_DRIVERS": setupData.openstackSetupData.neutronData.mechanismDrives,
                                    "TYPE_DRIVERS": setupData.openstackSetupData.neutronData.typeDrives,
                                    "REGISTRY_USERNAME":setupData.physicalSetupData.registryobj.registryUsername,
                                    "REGISTRY_PASSWORD":setupData.physicalSetupData.registryobj.registryPassword,
                                    "REGISTRY_EMAIL":setupData.physicalSetupData.registryobj.registryEmail
                                }
                            }
                            if($scope.sharedObject.tenantNetwork == "OVS/VLAN"){
                                inputForRest.jsondata.UCSMCOMMON.ENABLE_UCSM_PLUGIN = setupData.physicalSetupData.UCSM.ucsmPlugin;
                            }
                        } else {
                            inputForRest = {
                                name: setupData.initialSetupData.blueprintName,
                                meta: {
                                    BlueprintName: setupData.initialSetupData.blueprintName,
                                    Platform: setupData.initialSetupData.type,
                                    Version: setupData.initialSetupData.version,
                                    CreationDate: new Date().toGMTString(),
                                    Status: 'In-Active',
                                    TenantNetwork: setupData.initialSetupData.filter,
                                    ModifiedOn: ""
                                },
                                jsondata: {
                                    "CIMC-COMMON": {
                                        "cimc_username": setupData.physicalSetupData.CIMC_COMMON.cimc_username + "",
                                        "cimc_password": setupData.physicalSetupData.CIMC_COMMON.cimc_password + ""
                                    },
                                    "NETWORKING": {
                                        "domain_name": setupData.physicalSetupData.NETWORKING.domain_name,
                                        "ntp_servers": $scope.getNTPServers(),
                                        "domain_name_servers": $scope.getDNSServers(),
                                        "http_proxy_servers": $scope.getHTTPServers(),
                                        "https_proxy_servers": $scope.getHTTPSServers(),
                                        "networks": $scope.getNetworks(setupData.physicalSetupData.NETWORKING.networks)
                                    },
                                    "ROLES": {
                                        "control": controlArray.length == 0 ? null : controlArray,
                                        "compute": computeArray.length == 0 ? null : computeArray,
                                        "block_storage": blockStorageArray.length == 0 ? null : blockStorageArray,
                                        "object_storage": null,
                                        "networker": null
                                    },
                                    "SERVER_COMMON": {
                                        "server_username": setupData.physicalSetupData.SERVERS.serverUserName
                                    },
                                    "SERVERS": serverObjectC,
                                    "external_lb_vip_address": setupData.openstackSetupData.haProxyData.externalvipaddr,
                                    "VIRTUAL_ROUTER_ID": Number(setupData.openstackSetupData.haProxyData.virtualrouterId),
                                    "internal_lb_vip_address": setupData.openstackSetupData.haProxyData.internalvipaddr,
                                    "ADMIN_USER": setupData.openstackSetupData.keystoneData.userName,
                                    "ADMIN_USER_PASSWORD": setupData.openstackSetupData.keystoneData.password,
                                    "ADMIN_TENANT_NAME": setupData.openstackSetupData.keystoneData.tenantName,
                                    "L3_PHYSICAL_INTERFACE": setupData.openstackSetupData.neutronData.physicalInterface,
                                    "TENANT_NETWORK_TYPES": setupData.openstackSetupData.neutronData.tenantNwtype + "",
                                    "TENANT_VLAN_RANGES": setupData.openstackSetupData.neutronData.vlanRanges + "",
                                    "VNI_RANGE": setupData.openstackSetupData.neutronData.vniRanges,
                                    "NUMA_SUPPORT": setupData.openstackSetupData.neutronData.enableNumaSupport,

                                    "NOVA_BOOT_FROM":setupData.openstackSetupData.cephData.novaBootFrom+"",

                                    "STORE_BACKEND": setupData.openstackSetupData.glanceData.storeBackend,

                                    "VOLUME_DRIVER": setupData.openstackSetupData.cinderData.volumeDriver,

                                    "MECHANISM_DRIVERS": setupData.openstackSetupData.neutronData.mechanismDrives,
                                    "TYPE_DRIVERS": setupData.openstackSetupData.neutronData.typeDrives,
                                    "REGISTRY_USERNAME":setupData.physicalSetupData.registryobj.registryUsername,
                                    "REGISTRY_PASSWORD":setupData.physicalSetupData.registryobj.registryPassword,
                                    "REGISTRY_EMAIL":setupData.physicalSetupData.registryobj.registryEmail
                                }
                            }
                        }
                        editObjService.set(null, "");
                        if($scope.sharedObject.cephMode=="Dedicated" && $scope.sharedObject.type=="B"){
                            inputForRest.jsondata['UCSMCOMMON'].MRAID_CARD = setupData.physicalSetupData.UCSM.mraidCard;
                        }
                        if (setupData.initialSetupData.isVMTP) {
                            inputForRest.jsondata.VMTP_VALIDATION = {};
                            if (setupData.openstackSetupData.vmtpData.extNet) {
                                inputForRest.jsondata.VMTP_VALIDATION.EXT_NET = {};
                                if (setupData.openstackSetupData.vmtpData.externalNetwork) {
                                    inputForRest.jsondata.VMTP_VALIDATION.EXT_NET.NET_NAME = setupData.openstackSetupData.vmtpData.externalNetwork.networkName;
                                    inputForRest.jsondata.VMTP_VALIDATION.EXT_NET.NET_SUBNET = setupData.openstackSetupData.vmtpData.externalNetwork.subnet;
                                    inputForRest.jsondata.VMTP_VALIDATION.EXT_NET.NET_IP_START = setupData.openstackSetupData.vmtpData.externalNetwork.floatingIpstart;
                                    inputForRest.jsondata.VMTP_VALIDATION.EXT_NET.NET_IP_END = setupData.openstackSetupData.vmtpData.externalNetwork.floatingIpend;
                                    inputForRest.jsondata.VMTP_VALIDATION.EXT_NET.NET_GATEWAY = setupData.openstackSetupData.vmtpData.externalNetwork.gateway;
                                    inputForRest.jsondata.VMTP_VALIDATION.EXT_NET.DNS_SERVER = setupData.openstackSetupData.vmtpData.externalNetwork.dnsServer;
                                    //inputForRest.jsondata.VMTP_VALIDATION.EXT_NET.PROV_NET = setupData.openstackSetupData.vmtpData.externalNetwork.provNet;
                                   // inputForRest.jsondata.VMTP_VALIDATION.EXT_NET.SEGMENTATION_ID = setupData.openstackSetupData.vmtpData.externalNetwork.segmentationId;
                                }
                            }
                            if (setupData.openstackSetupData.vmtpData.provNet) {
                                inputForRest.jsondata.VMTP_VALIDATION.PROV_NET = {};
                                if (setupData.openstackSetupData.vmtpData.providerNetwork) {
                                    inputForRest.jsondata.VMTP_VALIDATION.PROV_NET.NET_NAME = setupData.openstackSetupData.vmtpData.providerNetwork.networkName;
                                    inputForRest.jsondata.VMTP_VALIDATION.PROV_NET.NET_SUBNET = setupData.openstackSetupData.vmtpData.providerNetwork.subnet;
                                    inputForRest.jsondata.VMTP_VALIDATION.PROV_NET.NET_IP_START = setupData.openstackSetupData.vmtpData.providerNetwork.floatingIpstart;
                                    inputForRest.jsondata.VMTP_VALIDATION.PROV_NET.NET_IP_END = setupData.openstackSetupData.vmtpData.providerNetwork.floatingIpend;
                                    inputForRest.jsondata.VMTP_VALIDATION.PROV_NET.NET_GATEWAY = setupData.openstackSetupData.vmtpData.providerNetwork.gateway;
                                    inputForRest.jsondata.VMTP_VALIDATION.PROV_NET.DNS_SERVER = setupData.openstackSetupData.vmtpData.providerNetwork.dnsServer;
                                    inputForRest.jsondata.VMTP_VALIDATION.PROV_NET.PROV_NET = setupData.openstackSetupData.vmtpData.providerNetwork.provNet;
                                    inputForRest.jsondata.VMTP_VALIDATION.PROV_NET.SEGMENTATION_ID = setupData.openstackSetupData.vmtpData.providerNetwork.segmentationId;
                                }
                            }

                        }

                        inputForRest.jsondata.OPTIONAL_SERVICE_LIST = [];
                        if (setupData.initialSetupData.isCloudPulse) {
                            inputForRest.jsondata.OPTIONAL_SERVICE_LIST.push('cloudpulse');
                        }


                        if(setupData.openstackSetupData.tlsobj.externallbviptls){
                        	inputForRest.jsondata.external_lb_vip_tls = setupData.openstackSetupData.tlsobj.externallbviptls;
                        	inputForRest.jsondata.external_lb_vip_cert = setupData.openstackSetupData.tlsobj.externallbvipcert;
                        	inputForRest.jsondata.external_lb_vip_cacert = setupData.openstackSetupData.tlsobj.externallbvipcacert;
                        }
                        
                        if(setupData.openstackSetupData.elkobj && setupData.openstackSetupData.elkobj.isElkSupported){
                        	inputForRest.jsondata.ELK = {};
                        	inputForRest.jsondata.ELK.elk_password = setupData.openstackSetupData.elkobj.password;
                        	inputForRest.jsondata.ELK.elk_rotation_frequency = setupData.openstackSetupData.elkobj.frequency;
                        	inputForRest.jsondata.ELK.elk_rotation_size = setupData.openstackSetupData.elkobj.size;
                        }
                        if($scope.sharedObject.cephMode == "Central"){
                            inputForRest.jsondata.CLUSTER_ID = setupData.openstackSetupData.cephData.clusterId;
                            inputForRest.jsondata.MON_HOSTS = setupData.openstackSetupData.cephData.monitorhost
                            inputForRest.jsondata.MON_MEMBERS = setupData.openstackSetupData.cephData.monitormembers;
                            inputForRest.jsondata.SECRET_UUID = setupData.openstackSetupData.cephData.secretUUID;
                            inputForRest.jsondata.GLANCE_CLIENT_KEY =setupData.openstackSetupData.glanceData.glanceKey;
                            inputForRest.jsondata.CINDER_CLIENT_KEY =setupData.openstackSetupData.cinderData.cinderKey;
                            inputForRest.jsondata.NOVA_RBD_POOL = setupData.openstackSetupData.cephData.novaRBDPool;
                            inputForRest.jsondata.GLANCE_RBD_POOL = setupData.openstackSetupData.glanceData.glancePool;
                            inputForRest.jsondata.CINDER_RBD_POOL = setupData.openstackSetupData.cinderData.cinderPool
                        }
                        
                        ValidationFactory.validateFields({jsondata: inputForRest.jsondata});
                        $scope.inputJSON = inputForRest;

                    };




                    $scope.setObjectOnEdit = function () {



                    }

                    $scope.checkForMessageService = function () {
                        var msgConfig = messageBoxservice.getMessage();
                        return msgConfig.isVisible;
                    }

                    $scope.setActiveTab = function (tabIndex) {
                        var prevTab = $scope.activeTab;
                        $scope.activeTab = Number(tabIndex);
                        switch (prevTab) {
                            case 0:
                                $scope.$broadcast("TabChange", {
                                    'prevTab': 'InitialSetup'
                                });
                                break;
                            case 1:
                                $scope.$broadcast("TabChange", {
                                    'prevTab': 'PhysicalSetup'
                                });
                                break;
                            case 2:
                                $scope.$broadcast("TabChange", {
                                    'prevTab': 'OpenstackSetup'
                                });
                                break;
                            default:
                                break;
                        }

                    };

                    $scope.clearPrevFilledData = function () {
                        $scope.sharedObject.type = $scope.bluePrintSetupInput.initialSetupData.type;
                        $scope.bluePrintSetupInput.physicalSetupData.clear();
                        $scope.bluePrintSetupInput.openstackSetupData.clear();

                        $scope.bluePrintSetupInput.initialSetupData.isCloudPulse = false;
                        $scope.bluePrintSetupInput.initialSetupData.isHeat = false;
                        $scope.yamlImportObject.yamlFileName = "";

                        $scope.$broadcast(Events.CLEARFIELDSCALLED);
                    };
                $scope.revertChangeOnPlatformType = function () {
                    if ($scope.bluePrintSetupInput.initialSetupData.type == 'B')
                        $scope.bluePrintSetupInput.initialSetupData.type = 'C';
                    else
                        $scope.bluePrintSetupInput.initialSetupData.type = 'B';
                };

                $scope.onChangePlatformType = function () {
                        $scope.popupText = "Previously filled setup data will get cleared. Are you sure you want to proceed?";
                        $scope.isVisible = true;
                        $scope.performTaskWaitaingForConfirmation = $scope.clearPrevFilledData;
                        $scope.actionsTobeTakenToRevert = $scope.revertChangeOnPlatformType;
                    };


                    $rootScope.$on('$locationChangeStart', function (event, next, current) {

                    });

                    $scope.$on('ValidateAfterUpload', function () {
                        $scope.checkUserInputsForInitSetup();
                    });

                    $scope.setServerTypeForType = function () {

                    };

                    $scope.setUpdateValueInObject = function () {
                        $scope.clearPrevFilledData();
                        $scope.$broadcast("CephModeChange");
                    };

                    $scope.onChangeCephMode = function () {
                        $scope.popupText = "Previously filled setup data will get cleared. Are you sure you want to proceed?";
                        $scope.isVisible = true;
                        $scope.performTaskWaitaingForConfirmation = $scope.setUpdateValueInObject;
                        $scope.actionsTobeTakenToRevert = $scope.revertCephMode;
                    };
                    $scope.revertCephMode = function () {
                        if ($scope.sharedObject.cephMode == "Dedicated") {
                            $scope.sharedObject.cephMode = "Central";
                        } else {
                            $scope.sharedObject.cephMode = "Dedicated";
                        }
                    };

                    $scope.changeNWType = function(){
                        $scope.sharedObject.tenantNetwork = $scope.bluePrintSetupInput.initialSetupData.filter;
                        $scope.bluePrintSetupInput.physicalSetupData.clear();
                        $scope.bluePrintSetupInput.openstackSetupData.clear();
                        $scope.$broadcast("TenantNWChanged");
                        $scope.$broadcast(Events.CLEARFIELDSCALLED);
                    };

                    $scope.revertTenantNW = function(){
                      if($scope.bluePrintSetupInput.initialSetupData.filter == "VXLAN/Linux Bridge"){
                          $scope.bluePrintSetupInput.initialSetupData.filter == "OVS/VLAN";
                          $scope.sharedObject.tenantNetwork = "OVS/VLAN";
                      }else{
                          $scope.bluePrintSetupInput.initialSetupData.filter == "VXLAN/Linux Bridge";
                          $scope.sharedObject.tenantNetwork = "VXLAN/Linux Bridge";
                      }
                    };

                    $scope.setValueInSharedObject = function () {
                        $scope.popupText = "Previously filled setup data will get cleared. Are you sure you want to proceed?";
                        $scope.isVisible = true;
                        $scope.performTaskWaitaingForConfirmation = $scope.changeNWType;
                        $scope.actionsTobeTakenToRevert = $scope.revertTenantNW;

                    };

                    $scope.checkForPlatformType = function () {
                        if ($scope.bluePrintSetupInput.initialSetupData.type == "B") {
                            $scope.bluePrintSetupInput.initialSetupData.filter = "VXLAN/Linux Bridge";
                            return true;
                        } else
                            return false;
                    };
                    $scope.validationResponse = {};
                    $scope.$on("ValidationStatusChanged", function (event, args) {
                        $scope.validationResponse.softwareValidation = args.softwareValidation;
                        $scope.validationResponse.hardwareValidation = args.hardwareValidation;
                        //$scope.gridOptionsForOfflineVal.data = $scope.validationResponse;
                        $scope.showOfflineValidation = true;
                        $scope.validationtask = args.taskId;
                        $scope.overallstatus = args.status;
                        
                    });
                }])

            .directive('physicalSetup', function () {
                return {
                    restrict: 'E',
                    scope: {
                        blueprintsetupinput: "=",
                        isphysicalsetupvalidated: "=",
                        sharedobject: "="
                    },
                    templateUrl: '../static/blueprintsetup/physicalsetupwizard/physicalsetupwizard.html'
                }
            })

            .directive('openstackSetup', function () {

                return {
                    restrict: 'E',
                    scope: {
                        blueprintsetupinput: "=",
                        isopenstacksetupvalidated: "=",
                        sharedobject: "="
                    },
                    templateUrl: '../static/blueprintsetup/openstacksetupwizard/openstacksetupwizard.html'
                }
            })


            .directive('importYaml', function () {

                return {
                    restrict: 'E',
                    scope: {
                        yamlimportobject: "="
                    },
                    replace: false,
                    template: '<a class="btn btn-primary" href="javascript:void(0);"" ng-click="openFileBrowsePopup()">Browse</a><input id="uploadYamlFile" type="file" name="file_source"  style ="display:none;">',
                    link: function (scope, elm, attr, ctrl) {
                        scope.openFileBrowsePopup = function () {
                            $('#uploadYamlFile').trigger('click');
                        };
                        scope.readSingleFile = function (evt) {
                            //Retrieve the first (and only!) File from the FileList object
                            var yamlFile = evt.target.files[0];
                            if (yamlFile) {
                                //if (!f.type.match('example.*')) {
                                //		alert(f.name + " is not a valid text file.");
                                //}else{
                                scope.yamlimportobject.yamlFileName = yamlFile.name;
                                var fileReader = new FileReader();
                                fileReader.readAsText(yamlFile, "UTF-8");
                                fileReader.onload = function (e) {
                                    var contents = e.target.result;
                                    scope.yamlimportobject.yamlFileContent = contents;
                                    //Apply to reflect the model values in UI elements (if any)
                                    scope.$apply();
                                }
                                fileReader.readAsText(yamlFile);

                                //}
                            } else {
                                console.error("Failed to load yaml file");
                            }
                        };
                        document.getElementById('uploadYamlFile').addEventListener('change', scope.readSingleFile, false);
                    }
                }
            })

            .directive('errorMessage', function () {

                return {
                    restrict: 'E',
                    scope: {
                        errormsg: '='
                    },
                    template: '<a  data-toggle="popover"  data-content={{errormsg}}><img src="../static/imgs/error-icon.png"/></a>',
                    link: function (scope, elm, attr, ctrl) {

                        $('[data-toggle="popover"]').popover();


                    }

                }
            })
            .factory('PopulateDataFactory', [function () {
                    var populateFields = function (setupData, jsonData) {


                    };

                    var populateInitialSetup = function () {

                    };

                    return {
                        populatePhysicalAndOpenstackSetup: populateFields,
                        populateInitialSetup: populateInitialSetup

                    }
                }])
            .directive('miOfflineValidation', ['$rootScope', function ($rootScope) {
                    return {
                        restrict: 'E',
                        replace: true,
                        template:
                                '<div id="offlineValidationModal" class="modal overflowHidden" role="dialog">' +
                                '	<div class="modal-dialog">' +
                                '		<div class="modal-content">' +
                                '			<div class="modal-header">' +
                                '				<h4><span ng-class="checkForStatusAndChangeColor()">{{overallstatus}} <img src="../static/imgs/loading_small.gif" ng-show="overallstatus==\'Offline Validation\' ? true : false"></span></h4>' +
                                '			</div>' +
                                '			<div class="modal-body" id="dialogg">' +
                                '				<div class="panel-group" id="accordion">'+
                                '					<div class="panel panel-default">'+
                                '						<div class="panel-heading">'+
                                '							<h4 class="panel-title">'+
                                '								<a href="javascript:;" data-toggle="collapse" data-parent="#collapse" data-target="#collapse1" class="accordianAnchor">Software Validation</a>'+
                                '							</h4>'+
                                '						</div>'+
                                '						<div id="collapse1" class="panel-collapse collapse in overFlowClass">'+
                                '							<div class="panelPadding panel-body overFlowClass">' +
                                '								<div ui-grid="gridOptionsForsoftwareval" ui-grid-exporter class="grid offlinevalidationtable" style="height: 240px; " ui-grid-auto-resize ui-grid-resize-columns ui-grid-move-columns></div>' +
                                '							</div>'+
                                '						</div>'+
                                '					</div>'+
                                '					<div class="panel panel-default">'+
                                '							<div class="panel-heading">'+
                                '								<h4 class="panel-title">'+
                                '									<a href="javascript:;" data-toggle="collapse" data-parent="#collapse" data-target="#collapse2" class="accordianAnchor collapsed" ng-click="callResizeExplicitely()">Hardware Validation</a>'+
                                '								</h4>'+
                                '							</div>'+
                                '							<div id="collapse2" class="panel-collapse collapse overFlowClass">'+
                                '								<div class="panelPadding panel-body overFlowClass">' +
                                '									<div ui-grid="gridOptionsForhardwareval" ui-grid-exporter class="grid offlinevalidationtable" style="height: 240px; " ui-grid-auto-resize ui-grid-resize-columns ui-grid-move-columns></div>' +
                                '								</div>'+
                               
                                '							</div>'+
                                '						</div>'+
                                '					</div>'+
                                
                                
                                '			</div>' +
                                '			<div class="modal-footer">' +
                                '				<button  class="btn btn-primary pull-right setmarginBlueprint " ng-click="hidePopupandDeleteTaskId()">Cancel</button>' +
                                '				<button  class="btn btn-primary pull-right setmarginBlueprint " ng-click="saveBlueprint()" ng-disabled="!isInputValidated()">{{isedit=="1"?"Update Blueprint":"Save Blueprint"}}</button>' +
                                '			</div>' +
                                '		</div>' +
                                '</div>',
                        scope: {
                            showofflinevalidation: "=",
                            setupinput: "=",
                            validationresponse: "=",
                            overallstatus: "=",
                            isedit: "=",
                            uuid: "=",
                            taskid: "="
                        },
                        link: function (scope, elm, attr, ctrl) {
                            scope.reasonArray;
                            $("#offlineValidationModal").draggable({
                                handle: ".modal-header"
                            });
                            
                            
                            scope.gridOptionsForsoftwareval = {
                                    columnDefs: [
                                        {cellTemplate:'<div class="grid-tooltip" title="{{ row.entity.name }}" tooltip-placement="right"><div class="ui-grid-cell-contents">{{ row.entity.name }}</div></div>', name: 'Name', field: 'name',flex:1},
                                        {cellTemplate:'<div class="grid-tooltip" title="{{ row.entity.status }}" tooltip-placement="right"><div class="ui-grid-cell-contents"><span class="label {{row.entity.status}}">{{ row.entity.status }}</span></div></div>', name: 'Status', field: 'status',flex:0.5},
                                        {cellTemplate:'<div class="grid-tooltip"  tooltip-placement="right"><div class="ui-grid-cell-contents "><div ng-repeat="reason in row.entity.reasonArray">-<a href="javascript:void(0)" ng-click="grid.appScope.openRespectiveTab(row.entity,$index)">{{reason}}</a></div></div></div>', name: 'Reason', field:'reason',flex:1}
                                    ],
                                hideHeader: true,
                                enableGridMenu: true,
                                enableSelectAll: true,
                                exporterMenuPdf: false,
                                exporterMenuCsv: false,
                                    onRegisterApi: function (gridApi) {
                                        scope.gridApi = gridApi;

                                    }
                                };
                            
                            scope.gridOptionsForhardwareval = {
                                    columnDefs: [
                                        {cellTemplate:'<div class="grid-tooltip" title="{{ row.entity.name }}" tooltip-placement="right"><div class="ui-grid-cell-contents">{{ row.entity.name }}</div></div>', name: 'Name', field: 'name',flex:1},
                                    {cellTemplate: '<div class="grid-tooltip" title="{{ row.entity.status }}" tooltip-placement="right"><div class="ui-grid-cell-contents"><span class="label {{row.entity.status==\'PASS\'?\'Pass\':\'Fail\'}}">{{ row.entity.status }}</span></div></div>', name: 'Status', field: 'status', flex: 0.5},
                                        {cellTemplate:'<div class="grid-tooltip" title="{{ row.entity.reason }}" tooltip-placement="right"><div class="ui-grid-cell-contents"><div ng-repeat="reason in row.entity.reasonArray">-<a href="javascript:void(0)" ng-click="grid.appScope.openRespectiveTab(row.entity,$index)">{{reason}}</a></div></div></div>', name: 'Reason', field:'reasonArray',flex:1}
                                    ],
                                hideHeader: true,
                                enableGridMenu: true,
                                enableSelectAll: true,
                                exporterMenuPdf: false,
                                exporterMenuCsv: false,
                                    onRegisterApi: function (gridApi) {
                                        scope.gridApi = gridApi;

                                    }
                                };


                        },
                        controller: ['$scope', 'Events', '$rootScope', 'BlueprintCreationService', '$location','ValidationFactory', function ($scope, Events, $rootScope, BlueprintCreationService, $location,ValidationFactory) {
                        		$scope.overallstatus = "Offline Validation";
                        		$scope.$watch(function(){
                        			return $scope.validationresponse.softwareValidation;
                        		},function(){
                        			 $scope.gridOptionsForsoftwareval.data = $scope.validationresponse.softwareValidation?$scope.validationresponse.softwareValidation:[];
                        			 if($scope.validationresponse.softwareValidation && $scope.validationresponse.softwareValidation.length!=0){
                        				 $scope.isDataAvailableforSoftware = true;
                        			 }else{
                        				 $scope.isDataAvailableforSoftware = false;
                        			 }
                        			 
                        		});
                        		$scope.callResizeExplicitely = function(){
                                	//$(window).trigger('resize');
                                };
                        		$scope.checkifSoftwareTableEmpty = function(){
                        			if($scope.validationresponse.softwareValidation && $scope.validationresponse.softwareValidation.length!=0){
                        				return true;
                        			}else{
                        				return false;
                        			}
                        		};
                        		
                        		$scope.$watch(function(){
                        			return $scope.validationresponse.hardwareValidation;
                        		},function(){
                        			$scope.gridOptionsForhardwareval.data = $scope.validationresponse.hardwareValidation?$scope.validationresponse.hardwareValidation:[];
                        			if($scope.validationresponse.hardwareValidation && $scope.validationresponse.hardwareValidation.length!=0){
                        				$scope.isDataAvailableforHardware = true;
                        			}else{
                        				$scope.isDataAvailableforHardware = false;
                        			}
                        			 
                        		});
                        		
                        		
                                $scope.openRespectiveTab = function (validationObj, reasonIndex) {
                                    var tabName = "";
                                    var stepName = "";
                                    var errorcode = validationObj.ve_error_code[reasonIndex] ? validationObj.ve_error_code[reasonIndex].split(":")[0] : "";
                                    switch (errorcode) {

                                        case "VE5000":

                                        case "VE5001":

                                        case "VE5002":
                                            $('#tabpanel a[data-target="#physicalSetup"]').tab('show');
                                            tabName = "Physical Setup";
                                            stepName = "CIMC";
                                            break;
                                        case "VE5022":

                                        case "VE5023":

                                        case "VE5024":
                                        case "VE5026":
                                        case "VE8077":

                                        case "VE5025":
                                            $('#tabpanel a[data-target="#physicalSetup"]').tab('show');
                                            tabName = "Physical Setup";
                                            stepName = "UCSM";
                                            break;
                                        case "VE6000":

                                        case "VE6001":

                                        case "VE6002":

                                        case "VE6003":

                                        case "VE6004":

                                        case "VE6005":

                                        case "VE6006":
                                            $('#tabpanel a[data-target="#physicalSetup"]').tab('show');
                                            tabName = "Physical Setup";
                                            stepName = "Networking";
                                            break;
                                        case "VE7000":

                                        case "VE7001":

                                        case "VE7002":

                                        case "VE8000":

                                        case "VE8001":

                                        case "VE8002":

                                        case "VE8003":

                                        case "VE8004":

                                        case "VE8005":

                                        case "VE8006":

                                        case "VE8007":

                                        case "VE8008":

                                        case "VE8009":

                                        case "VE8010":

                                        case "VE8011":

                                        case "VE8012":

                                        case "VE8013":
                                            $('#tabpanel a[data-target="#physicalSetup"]').tab('show');
                                            tabName = "Physical Setup";
                                            stepName = "ServerAndTheirRoles";
                                            break;
                                        case "VE8050":

                                        case "VE8051":

                                        case "VE8052":
                                            $('#tabpanel a[data-target="#openstackSetup"]').tab('show');
                                            tabName = "Openstack Setup";
                                            stepName = "HAProxy";
                                            break;
                                        case "VE8053":

                                        case "VE8054":

                                        case "VE8055":
                                            $('#tabpanel a[data-target="#openstackSetup"]').tab('show');
                                            tabName = "Openstack Setup";
                                            stepName = "Keystone";
                                            break;
                                        case "VE8056":

                                        case "VE8057":

                                        case "VE8071":

                                        case "VE8072":
                                        case "VE8073":

                                        case "VE8058":
                                            $('#tabpanel a[data-target="#openstackSetup"]').tab('show');
                                            tabName = "Openstack Setup";
                                            stepName = "Neutron";
                                            break;
                                        case "VE8059":

                                        case "VE8060":

                                        case "VE8066":



                                        case "VE8061":
                                            $('#tabpanel a[data-target="#openstackSetup"]').tab('show');
                                            tabName = "Openstack Setup";
                                            stepName = "Glance";
                                            break;
                                        case "VE8062":

                                        case "VE8063":

                                        case "VE8064":

                                        case "VE8065":
                                            $('#tabpanel a[data-target="#openstackSetup"]').tab('show');
                                            tabName = "Openstack Setup";
                                            stepName = "Cinder";
                                            break;
                                        case "VE8067":

                                        case "VE8068":

                                        case "VE8069":

                                        case "VE8070":
                                            $('#tabpanel a[data-target="#openstackSetup"]').tab('show');
                                            tabName = "Openstack Setup";
                                            stepName = "CEPH";
                                            break;
                                        case "VE9000":

                                        case "VE9001":

                                        case "VE9002":

                                        case "VE9003":

                                        case "VE9004":

                                        case "VE9005":

                                        case "VE9006":

                                        case "VE9007":

                                        case "VE9008":
                                            $('#tabpanel a[data-target="#openstackSetup"]').tab('show');
                                            tabName = "Openstack Setup";
                                            stepName = "VMTP";
                                            break;
                                        case "VE9009":
                                            $('#tabpanel a[data-target="#BlueprintInitSetup"]').tab('show');
                                            tabName = "Initial Setup";
                                            stepName = "NA";
                                            break;
                                        case "VE8074":
                                        case "VE8075":
                                        case "VE8076":
                                            $('#tabpanel a[data-target="#openstackSetup"]').tab('show');
                                            tabName = "Openstack Setup";
                                            stepName = "TLS";
                                            break;
                                        case "VE9010":
                                        case "VE9011":
                                        case "VE9012":
                                        case "VE9013":
                                            $('#tabpanel a[data-target="#openstackSetup"]').tab('show');
                                            tabName = "Openstack Setup";
                                            stepName = "ELK";


                                    }

                                    $rootScope.$emit(Events.MOVETOPARTICULARSTEP, {
                                        tab: tabName,
                                        step: stepName
                                    });


                                };

                                $scope.checkForStatusAndChangeColor = function(){
                                  if($scope.overallstatus == 'ValidationSuccess'){
                                      return 'label label-success labelFontSize';
                                  }else if($scope.overallstatus == 'ValidationFailed'){
                                      return 'label label-danger labelFontSize';
                                  }
                                };

                                $scope.isInputValidated = function () {
                                    if ($scope.overallstatus == "ValidationSuccess") {
                                        return true;
                                    } else {
                                        return false;
                                    }
                                };

                                $scope.saveBlueprint = function () {
                                    if ($scope.isedit != "1")
                                        BlueprintCreationService.createBlueprintAPI($scope.setupinput, $scope.onSuccess, $scope.onFailure);
                                    else {
                                        $scope.setupinput.uuid = $scope.uuid;
                                        $scope.setupinput.meta.ModifiedOn = new Date().toGMTString(),
                                                BlueprintCreationService.updateBlueprint($scope.uuid, $scope.setupinput, $scope.onSuccess, $scope.onFailure);
                                        $scope.isEdit != "0"
                                    }
                                };

                                $scope.onSuccess = function (data) {

                                    $rootScope.$broadcast("ShowErrorMessage", {
                                        type: 'success',
                                        msg: 'Blueprint configuration saved successfully',
                                        disableAutoClose: false
                                    });
                                    $scope.uuid = "";
                                    $location.path('/blueprintmgmt');
                                };

                                $scope.onFailure = function (response) {
                                    var msg = ($scope.isEdit != "1") ? "Failed to create blueprint configuration" : response.faultstring;
                                    if (response && response.data && response.data.faultstring) {
                                        $rootScope.$broadcast("ShowErrorMessage", {
                                            type: 'danger',
                                            msg: response.data.faultstring,
                                            disableAutoClose: false
                                        });
                                    } else {
                                        $rootScope.$broadcast("ShowErrorMessage", {
                                            type: 'danger',
                                            msg: msg,
                                            disableAutoClose: false
                                        });
                                    }

                                    $scope.uuid = "";
                                };
                               
                                $scope.hidePopupandDeleteTaskId = function(){
                                	$("#offlineValidationModal").modal("hide");
                                    ValidationFactory.stopPollingForValidation();
                                	ValidationFactory.deleteValidationTask();
                                };
                                $scope.checkIfRunning = function(){
                                	if($scope.overallstatus=="Offline Validation" || $scope.overallstatus == ""){
                                		return true;
                                	}else{
                                		return false;
                                	}
                                };
                            }]
                    }


                }])

            .factory('ValidationFactory', ['$http', 'Configuration', '$rootScope', function ($http, Configuration, $rootScope) {

                    var backendServerUrl = Configuration.isDebug ? Configuration.backendServerUrl : "";
                    var pollinginterval = 1000; // 2 second;
                    var pollingTimer = null;
                    var taskId = "";
                    var startValidation = function (setupJSON) {
                        var request = $http({
                            method: "POST",
                            url: backendServerUrl + "/v1/offlinevalidation",
                            data: setupJSON
                        });
                        request.then(startValidationSuccess, startValidationFailure);
                    };

                    var startValidationSuccess = function (response) {
                        if (pollingTimer) {
                            clearInterval(pollingTimer);
                        }
                        pollingTimer = setInterval(function () {
                        	taskId = response.data.uuid;
                            $http.get(backendServerUrl + "/v1/offlinevalidation/" + response.data.uuid).success(function (res) {
                                if (res.status == "ValidationSuccess" || res.status == "ValidationFailed") {
                                    notifyChanges(res);
                                    clearInterval(pollingTimer);
                                }

                            });
                        }, pollinginterval);
                    };

                    var notifyChanges = function (res) {
                        var softwarevalidationArray = [];
                        var hardwareValidationArray = [];
                        var softwareValidationRespArray = res.validationstatus != "" ? JSON.parse(res.validationstatus).Software_Validation : [];
                        var hardwareValidationRespArray = res.validationstatus != "" ? JSON.parse(res.validationstatus).Hardware_Validation:[];
                        for (var i in softwareValidationRespArray) {
                            if (softwareValidationRespArray[i].name != "Overall_SW_Result") {
                            	softwarevalidationArray.push({
                                    'name': softwareValidationRespArray[i].name,
                                    'status': softwareValidationRespArray[i].status,
                                    'reasonArray': softwareValidationRespArray[i].reason ? softwareValidationRespArray[i].reason.split("::") : [],
                                    've_error_code': softwareValidationRespArray[i].ve_error_code
                                });
                            }
                        }
                        
                        for (var i in hardwareValidationRespArray) {
                            if (hardwareValidationRespArray[i].name != "Overall_HW_Result") {
                            	hardwareValidationArray.push({
                                    'name': hardwareValidationRespArray[i].name,
                                    'status': hardwareValidationRespArray[i].status,
                                    'reasonArray': hardwareValidationRespArray[i].reason ? hardwareValidationRespArray[i].reason.split("::") : [],
                                    've_error_code': hardwareValidationRespArray[i].ve_error_code
                                });
                            }
                        }
                        
                        
                        //if (softwarevalidationArray && softwarevalidationArray.length != 0 && hardwareValidationArray && hardwareValidationArray.length!=0) {
                            $rootScope.$broadcast("ValidationStatusChanged", {
                                'softwareValidation': softwarevalidationArray,
                                'hardwareValidation':hardwareValidationArray,
                                'status': res.status,
                                'taskId':res.uuid
                            });
                        //}


                    };

                    var startValidationFailure = function (response) {
//                        $rootScope.$broadcast('rolling', {
//                            status: 'end'
//                        });
                        $rootScope.$broadcast("ShowErrorMessage", {
                            type: 'danger',
                            msg: 'Failed to Run Offline Validation',
                            disableAutoClose: false
                        });
                    };

                    var getValidationStatus = function () {

                    };
                    
                    var deleteValidationTask = function(){
                    	if(taskId){
                            var req = $http({
                                method: "DELETE",
                                url: backendServerUrl + "/v1/offlinevalidation/"+taskId
                            });
                        }

                    	
                    };

                    var stopPolling = function(){
                        clearInterval(pollingTimer);
                    };

                    return {
                        validateFields: startValidation,
                        getValidationStaus: getValidationStatus,
                        deleteValidationTask : deleteValidationTask,
                        stopPollingForValidation : stopPolling
                    };

                }]);

}());