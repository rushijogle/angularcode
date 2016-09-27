(function() {
    'use strict';
    angular.module('mercuryInstaller.utility', ['mercuryInstaller.globals'])
        .factory('DeploymentMonitoringService', ['$http', '$cookieStore', '$rootScope', '$timeout','Configuration','Events','User',
            function($http, $cookieStore, $rootScope, $timeout,Configuration,Events,User) {
                var pollinginterval = 2000; // 2 second;
                var pollingTimer = null;
                var podPollingTimer = null;
                var activeDeploymentDetails = new Object();
                activeDeploymentDetails.deploymentStatus = new Object();
                activeDeploymentDetails.blueprintId = null;
                activeDeploymentDetails.deploymentJobId = null;
                activeDeploymentDetails.isProgressChanged = false;
                activeDeploymentDetails.currentStatus = "inactive";
                activeDeploymentDetails.blueprintDetail = "";
                var backendServerUrl = Configuration.isDebug?Configuration.backendServerUrl:"";
                var activePodOperationDetails = new Object();
                $rootScope.$on("newSetupDeployed", function() {
                    getDeploymentJob();
                });
                var getDeploymentStatus = function() {
                    if (activeDeploymentDetails.deploymentJobId === null) {
                        return null
                    }
                    else {
                        return activeDeploymentDetails.deploymentStatus;
                    }
                };
                var Optionalservice = function() {
                    return activeDeploymentDetails.blueprintDetail;
                }
                var getBlueprintDetails = function() {
                    if (activeDeploymentDetails.blueprintId !== null)
                        var request = $http.get(backendServerUrl + '/v1/setupdata/' + activeDeploymentDetails.blueprintId).success(function(resp) {
                                activeDeploymentDetails.blueprintDetail = resp;
                                activeDeploymentDetails.isProgressChanged = true;
                                $rootScope.$broadcast("SetupDataChanged");
                                notifyChanges();
                            })
                            .error(function(resp) {
                                activeDeploymentDetails.blueprintDetail = null;
                                activeDeploymentDetails.isProgressChanged = true;
                                notifyChanges();
                            });
                }
                var getCurrentStatus = function() {
                    return activeDeploymentDetails.currentStatus;
                };
                var getDeploymentJobDetail = function(jobId) {
                    var request = $http.get(backendServerUrl + '/v1/install/' + jobId).success(function(resp) {
                            if (activeDeploymentDetails.blueprintId !== resp["setupdata"]) {
                                activeDeploymentDetails.blueprintId = resp["setupdata"];
                                activeDeploymentDetails.isProgressChanged = true;
                            }
                            getBlueprintDetails();
                            /*&& resp.stages['orchestration'] == "Success"*/
                            if(resp.currentstatus == "Completed"){
                                startCheckingForPODOperation();
                            }
                            if (activeDeploymentDetails.deploymentStatus.ceph !== resp.stages["ceph"]) {
                                activeDeploymentDetails.deploymentStatus.ceph = resp.stages["ceph"]
                                activeDeploymentDetails.isProgressChanged = true;
                            }
                            if (activeDeploymentDetails.deploymentStatus.baremetal !== resp.stages["baremetal"]) {
                                activeDeploymentDetails.deploymentStatus.baremetal = resp.stages["baremetal"];
                                activeDeploymentDetails.isProgressChanged = true;
                            }
                            if (activeDeploymentDetails.deploymentStatus.orchestration !== resp.stages["orchestration"]) {
                                activeDeploymentDetails.deploymentStatus.orchestration = resp.stages["orchestration"];
                                activeDeploymentDetails.isProgressChanged = true;
                            }
                            if (activeDeploymentDetails.deploymentStatus.validationstatus !== resp["validationstatus"]) {
                                activeDeploymentDetails.deploymentStatus.validationstatus = resp["validationstatus"];
                                activeDeploymentDetails.isProgressChanged = true;
                            }
                            if (activeDeploymentDetails.deploymentStatus.currentstatus !== resp["currentstatus"]) {
                                activeDeploymentDetails.deploymentStatus.currentstatus = resp["currentstatus"];
                                activeDeploymentDetails.isProgressChanged = true;
                                //                                if (resp["currentstatus"] === "Completed") {
                                //                                    activeDeploymentDetails.currentStatus = "ACTIVE";
                                //                                } else {
                                //                                    activeDeploymentDetails.currentStatus = "FAILED";
                                //                                }
                            }
                            if (activeDeploymentDetails.deploymentStatus.validation !== resp.stages["validation"]) {
                                activeDeploymentDetails.deploymentStatus.validation = resp.stages["validation"];
                                activeDeploymentDetails.isProgressChanged = true;
                            }
                            if (activeDeploymentDetails.deploymentStatus.runtimevalidation !== resp.stages["runtimevalidation"]) {
                                activeDeploymentDetails.deploymentStatus.runtimevalidation = resp.stages["runtimevalidation"];
                                activeDeploymentDetails.isProgressChanged = true;
                            }
                            if (activeDeploymentDetails.deploymentStatus.bootstrap !== resp.stages["bootstrap"]) {
                                activeDeploymentDetails.deploymentStatus.bootstrap = resp.stages["bootstrap"];
                                activeDeploymentDetails.isProgressChanged = true;
                            }
                            if (activeDeploymentDetails.deploymentStatus.hostsetup !== resp.stages["hostsetup"]) {
                                activeDeploymentDetails.deploymentStatus.hostsetup = resp.stages["hostsetup"];
                                activeDeploymentDetails.isProgressChanged = true;
                            }
                            if (activeDeploymentDetails.deploymentStatus.vmtp !== resp.stages["vmtp"]) {
                                activeDeploymentDetails.deploymentStatus.vmtp = resp.stages["vmtp"];
                                activeDeploymentDetails.isProgressChanged = true;
                            }
                            activeDeploymentDetails.deploymentStatus.install_logs = resp.install_logs;
                            activeDeploymentDetails.deploymentStatus.created_at = resp.created_at;
                            activeDeploymentDetails.deploymentStatus.updated_at = resp.updated_at;

                            if ((activeDeploymentDetails.deploymentStatus.baremetal == 'Skipped' || activeDeploymentDetails.deploymentStatus.baremetal ==
                                    'Success') && (activeDeploymentDetails.deploymentStatus.ceph == 'Skipped' || activeDeploymentDetails.deploymentStatus
                                    .ceph == 'Success') && (activeDeploymentDetails.deploymentStatus.hostsetup == 'Skipped' ||
                                    activeDeploymentDetails.deploymentStatus.hostsetup == 'Success') && (activeDeploymentDetails.deploymentStatus
                                    .orchestration == 'Skipped' || activeDeploymentDetails.deploymentStatus.orchestration == 'Success') && (
                                    activeDeploymentDetails.deploymentStatus.validation == 'Skipped' || activeDeploymentDetails.deploymentStatus
                                    .validation == 'Success') && (activeDeploymentDetails.deploymentStatus.vmtp == 'Skipped' ||
                                    activeDeploymentDetails.deploymentStatus.vmtp == 'Success')) {
                                activeDeploymentDetails.currentStatus = "ACTIVE";
                            }
                            else if ((activeDeploymentDetails.deploymentStatus.ceph == 'Failed') || (activeDeploymentDetails.deploymentStatus.hostsetup ==
                                    'Failed') || (activeDeploymentDetails.deploymentStatus.orchestration == 'Failed') || (
                                    activeDeploymentDetails.deploymentStatus.validation == 'Failed') || (activeDeploymentDetails.deploymentStatus
                                    .vmtp == 'Failed')) {
                                activeDeploymentDetails.currentStatus = "FAILED";
                            }
                            notifyChanges();
                        })
                        .error(function(resp) {
                            //TODO: Show message 
                            activeDeploymentDetails.deploymentStatus = new Object();
                            activeDeploymentDetails.isProgressChanged = true;
                            notifyChanges();
                        });
                }
                var notifyChanges = function() {
                    if (activeDeploymentDetails.isProgressChanged) {
                        $rootScope.$broadcast("deploymentStatusChanged");
                        activeDeploymentDetails.isProgressChanged = false;
                    }
                }
                var startJobDetailPolling = function() {
                    if (pollingTimer) {
                        clearInterval(pollingTimer);
                    }
                    if (activeDeploymentDetails.deploymentJobId !== null) {
                        getDeploymentJobDetail(activeDeploymentDetails.deploymentJobId);
                        pollingTimer = setInterval(function() {
                            if (activeDeploymentDetails.deploymentStatus["currentstatus"] == "Completed") {
                                clearInterval(pollingTimer);
                            }
                            else {
                                getDeploymentJobDetail(activeDeploymentDetails.deploymentJobId);
                            }
                        }, pollinginterval);
                    }
                }
                var getDeploymentJob = function() {
                    var request = $http.get(backendServerUrl + '/v1/install').success(function(response) {
                            var resp = [];
                            if (response) {
                                resp = response.installs
                            }
                            if (resp && resp.length > 0) {
                                activeDeploymentDetails.deploymentJobId = resp[0].uuid;
                                activeDeploymentDetails.blueprintId = null;
                                activeDeploymentDetails.currentStatus = "INPROGRESS";
                                //activeDeploymentDetails.deploymentStatus = {};
                                startJobDetailPolling();
                            }
                            else {
                                clearInterval(pollingTimer);
                                activeDeploymentDetails.currentStatus = "INACTIVE";
                                activeDeploymentDetails.deploymentJobId = null;
                                activeDeploymentDetails.blueprintId = null;
                                activeDeploymentDetails.isProgressChanged = true;
                                activeDeploymentDetails.deploymentStatus = {};
                                notifyChanges();
                                                                $rootScope.$broadcast("EventInactive");
                            }
                        })
                        .error(function(resp) {
                            //TODO: Show message 
                            if (resp && resp.status == 404) {
                                clearInterval(pollingTimer);
                            }
                            activeDeploymentDetails.deploymentJobId = null;
                        });
                }
                var getDeployedBlueprint = function() {
                    var blueprint = {};
                    blueprint.id = activeDeploymentDetails.blueprintId;
                    blueprint.name = activeDeploymentDetails.blueprintDetail ? activeDeploymentDetails.blueprintDetail.name : "";
                    blueprint.setupData = activeDeploymentDetails.blueprintDetail;
                    return blueprint;
                };
                var deploymentJobID = function() {
                    return activeDeploymentDetails.deploymentJobId;
                };

                var notifyChangeInPodOperation = function(){
                  $rootScope.$broadcast(Events.PODMGMTACTIVITY);
                };

                var startCheckingForPODOperation = function(){
                    if (podPollingTimer) {
                        clearInterval(podPollingTimer);
                    }
                    podPollingTimer = setInterval(function(){
                        $http.get(backendServerUrl + '/v1/nodes').success(function(response){
                            var latestNodeArray = response.nodes;
                            var cnt = 0;
                            if(latestNodeArray && latestNodeArray.length>0){
                                for(var i in latestNodeArray){
                                    if(latestNodeArray[i].status!="Active" && latestNodeArray[i].status!="DeleteNodeFailed" && latestNodeArray[i].status!="AddNodeFailed" && latestNodeArray[i].status!="AddNodePreFailed" && latestNodeArray[i].status!="ReplaceNodeFailed"){
                                        cnt++;
                                        if(latestNodeArray[i].status=="DeleteNodeFailed" || latestNodeArray[i].status=="AddNodeFailed" || latestNodeArray[i].status=="AddNodePreFailed" || latestNodeArray[i].status=="ReplaceNodeFailed"){
                                            //clearInterval(podPollingTimer);
                                            cnt--;
                                        }
                                        if(activePodOperationDetails.uuid != latestNodeArray[i].uuid){
                                            activePodOperationDetails = latestNodeArray[i];
                                            notifyChangeInPodOperation();

                                        }else if(activePodOperationDetails.status!=latestNodeArray[i].status){
                                            activePodOperationDetails = latestNodeArray[i];
                                            notifyChangeInPodOperation();

                                        }
                                        break;




                                    }else if(latestNodeArray[i].status=="Active"){
                                        if(latestNodeArray[i].uuid == activePodOperationDetails.uuid){
                                            activePodOperationDetails = latestNodeArray[i];
                                            notifyChangeInPodOperation();
                                        }
                                    }else if(latestNodeArray[i].status=="DeleteNodeFailed" || latestNodeArray[i].status=="AddNodeFailed" || latestNodeArray[i].status=="AddNodePreFailed" || latestNodeArray[i].status=="ReplaceNodeFailed"){
                                        //if(latestNodeArray[i].uuid == activePodOperationDetails.uuid){
                                            activePodOperationDetails = latestNodeArray[i];
                                            notifyChangeInPodOperation();
                                        //}
                                    }
                                }
                                if(cnt == 0){
                                    clearInterval(podPollingTimer);
                                    activePodOperationDetails = {};
                                }
                            }else{
                                clearInterval(podPollingTimer);
                            }
                        });
                    },pollinginterval);
                };

                var getOnGoingPodOperationDetails = function(){
                    return activePodOperationDetails;
                };

                //Get the job detail on service creation
                $rootScope.$on(Events.LOGINSUCCESS,function(){
                    getDeploymentJob();
                });

                $rootScope.$on(Events.PODOPERATIONSTARTED,function(){
                    startCheckingForPODOperation();
                });
                if(User.isAuthenticated){
                    getDeploymentJob();
                }
                return {
                    getDeploymentStatusDetails: getDeploymentStatus,
                    getDeploymentCurrentStatus: getCurrentStatus,
                    getDeployedBlueprint: getDeployedBlueprint,
                    getDeploymentJobID: deploymentJobID,
                    startCheckingForPODOperation:startCheckingForPODOperation,
                    getOnGoingPodOperationDetails : getOnGoingPodOperationDetails
                };
            }
        ])
    .value("SystemUpdateData",{
        update_logs : "",
        update_status : "",
        update_filename : "Not running",
        created_at :"",
        updated_at : ""
    })
    .factory('UpdateMonitoring',['$http','Configuration','SystemUpdateData',function($http,Configuration,SystemUpdateData){
        var backendServerUrl = Configuration.isDebug?Configuration.backendServerUrl:"";
        var pollingTimer = null;
        var pollingIntserval = 2000;
        var lastStatus = "";
        var pollingTimerForCommit = null;

        var setSystemUpdateData = function(resp){
            SystemUpdateData.update_filename = resp.update_filename;
            SystemUpdateData.created_at = resp.created_at;
            SystemUpdateData.updated_at = resp.updated_at;
            SystemUpdateData.update_logs = resp.update_logs;
            SystemUpdateData.update_status = resp.update_status;
        };

        var startPollingForStatus = function(){
            if(pollingTimer){
                clearInterval(pollingTimer);
            }
            pollingTimer = setInterval(function(){
                var request = $http({
                    method: "GET",
                    url: backendServerUrl + "/v1/update"
                });
                request.then(function(resp){
                    if(resp){
                        if(lastStatus!=resp.data.update_status) {
                            lastStatus = resp.data.update_status;
                            setSystemUpdateData(resp.data);
                            if (resp.data.update_status == "UpdateSuccess" || resp.data.update_status == "UpdateFailed" || resp.data.update_status == "CommitSuccess" || resp.data.update_status == "RollbackSuccess") {
                                clearInterval(pollingTimer);

                            }
                        }
                    }else{
                        clearInterval(pollingTimer);
                    }
                },function(){
                    startPollingForStatus();
                });
            },pollingIntserval);
        };

        var startPollingForCommitRollback = function(){
            if(pollingTimerForCommit){
                clearInterval(pollingTimerForCommit);
            }
            pollingTimerForCommit = setInterval(function(){
                var request = $http({
                    method: "GET",
                    url: backendServerUrl + "/v1/update"
                });
                request.then(function(resp){
                    if(resp){
                        if(lastStatus!=resp.data.update_status) {
                            lastStatus = resp.data.update_status;
                            setSystemUpdateData(resp.data);
                            if (resp.data.update_status == "CommitSuccess" || resp.data.update_status == "CommitFailed" || resp.data.update_status == "RollbackSuccess" ||resp.data.update_status == "RollbackFailed") {
                                clearInterval(pollingTimer);
                            }
                        }
                    }else{
                        clearInterval(pollingTimerForCommit);
                    }
                },function(){

                });
            },pollingIntserval);
        };

        var stopActivePolling = function(){
            if(pollingTimerForCommit)
                clearInterval(pollingTimerForCommit);
            if(pollingTimer)
                clearInterval(pollingTimer);
        };

        return{
            startPollingforStatus : startPollingForStatus,
            startPollingForCommitRollbackStatus : startPollingForCommitRollback,
            stopPolling : stopActivePolling
        }
    }])
    .factory('BlueprintManagementFactory', ['$http','Configuration', function($http,Configuration) {
    	 var backendServerUrl = Configuration.isDebug?Configuration.backendServerUrl:"";
            var listBlueprints = function(callback) {
                $http.get(backendServerUrl + '/v1/setupdata').success(callback);
            };
            var fetchDataForUUID = function(uuid, successCallback, failureCallback) {
                var request = $http({
                    method: "GET",
                    url: backendServerUrl + '/v1/setupdata/' + uuid
                });
                request.then(successCallback, failureCallback);
            };
            var deleteBlueprint = function(deleteuid, successCallback, failureCallback) {
                var request = $http({
                    method: "DELETE",
                    url: backendServerUrl + "/v1/setupdata/" + deleteuid
                });
                request.then(successCallback, failureCallback);
            };
            var deployBlueprint = function(stages, successCallback, failureCallback) {
                var request = $http({
                    method: "POST",
                    url: backendServerUrl + "/v1/install/",
                    data: stages
                });
                request.then(successCallback, failureCallback);
            };
            var KillDeployment = function(id, successCallback, failureCallback) {
                var request = $http({
                    method: "DELETE",
                    url: backendServerUrl + "/v1/install/" + id
                });
                request.then(successCallback, failureCallback);
            };
             var offlineValidation = function(jsonData, successCallback, failureCallback) {
                var request = $http({
                    method: "POST",
                    //headers: {'Content-Type': 'application/json'},
                    url: backendServerUrl + "/v1/offlinevalidation",
                    data: jsonData
                });
                request.then(successCallback, failureCallback);
            };
            return {
                listBlueprints: listBlueprints,
                fetchSetupDataForParticularUUID: fetchDataForUUID,
                deleteSelectedBlueprint: deleteBlueprint,
                deploySelectedBlueprint: deployBlueprint,
                killDeployForSelectedBlueprint: KillDeployment,
                offlineValidation:offlineValidation
            }
        }])
        .factory('editObjService', function() {
            var savedData = {};
            var uuid = "";

            function set(data, id) {
                savedData = data;
                uuid = id;
            }

            function get() {
                return {
                    'setupData': savedData,
                    'uuid': uuid
                };
            }
            return {
                set: set,
                get: get
            }
        })
        .service('BlueprintCreationService', ['$http','Configuration', function($http,Configuration) {
        	var backendUrl = Configuration.isDebug?Configuration.backendServerUrl:"";
            this.createBlueprintAPI = function(inputObj, successCallback, failureCallback) {
                createBlueprint(inputObj, successCallback, failureCallback);
            }

            function createBlueprint(inputObj, successCallback, failureCallback) {
                var inputJson = JSON.stringify(inputObj);
                var request = $http({
                    method: "post",
                    url: backendUrl + '/v1/setupdata',
                    data: inputJson
                });
                request.then(successCallback, failureCallback);
            }
            this.updateBlueprint = function(uuid, inputObj, successCallback, failureCallback) {
                var inputJson = JSON.stringify(inputObj);
                var request = $http({
                    method: "PUT",
                    url: backendUrl + '/v1/setupdata/' + uuid,
                    data: inputJson
                });
                request.then(successCallback, failureCallback);
            }
        }])
    .service('validateinputs', function() {
        this.validateIPorFQDN = function(input) {
            if(input == undefined)
                input = "";
            var isValid = true;
            var reFqdn = new RegExp(/^((?:(?:(?:\w[\.\-\+]?)*)\w)+)((?:(?:(?:\w[\.\-\+]?){0,62})\w)+)\.(\w{2,6})$/);
            var reIP = new RegExp(/^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/);
            if(input){
                if(input.match(reFqdn) != null || input.match(reIP) != null){
                    isValid = true;
                }else{
                    isValid = false;
                }
            }else{
                isValid = false;
            }
            return isValid;
        };
        this.validateIP = function(input) {
            if(input == undefined)
                input = "";
            var isValid = true;
            var re = new RegExp(
                /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/
            );
            if (input.match(re) != null) {
                isValid = true;
            }
            else {
                isValid = false;
            }
            return isValid;
        };
        this.validateSubnetmask = function(input) {
            if(input == undefined)
                input = "";
            var re = new RegExp(
                /((\b|\.)(1|2(?!5(?=6|7|8|9)|6|7|8|9))?\d{1,2}){4}(-((\b|\.)(1|2(?!5(?=6|7|8|9)|6|7|8|9))?\d{1,2}){4}|\/((1|2|3(?=1|2))\d|\d))\b/
            );
            var isValid = true;
            if (input.match(re) != null) {
                isValid = true;
            }
            else {
                isValid = false;
            }
            return isValid;
        };
        this.validateProxy = function(input) {
            if(input == undefined)
                input = "";
            var isValid = true;
            var reIP = new RegExp(/^((?:(?:(?:\w[\.\-\+]?)*)\w)+)((?:(?:(?:\w[\.\-\+]?){0,62})\w)+)\.(\w{2,6})\:[0-9]{2,}$/);
            var reFQDN = new RegExp(
                /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?):[0-9]{2,}$/
            );
            if (input.match(reIP) != null || input.match(reFQDN)) {
                isValid = true;
            }
            else {
                isValid = false;
            }
            return isValid;
        };
        this.validateIfNumerical = function(input) {
            if(input == undefined)
                input = "";
            var re = new RegExp(/^[0-9]*$/);
            var isValid = true;
            if (input.match(re) != null) {
                isValid = true;
            }
            else {
                isValid = false;
            }
            return isValid;
        }
    })
    .factory('VersionFactory',['$http','VersionData','Configuration',function($http,VersionData,Configuration){
        var backendUrl = Configuration.isDebug?Configuration.backendServerUrl:"";
        var getVersion = function(){
            var request = $http({
                method : "GET",
                url: backendUrl + '/version'
            });
            request.then(function(resp){
                VersionData.version = resp.data.version;
            },function(){

            });
        }
       return{
           getVersion : getVersion
       }
    }])
    .value("VersionData",{
       version :""
    })
    .directive('requiredFieldValidator', function() {
        return {
            restrict: 'A',
            require: 'ngModel',
            scope: {
                errormessage: '='
            },
            link: function(scope, elm, attr, ctrl) {
                elm.bind('blur', function() {
                    if(!(elm[0].disabled||elm[0].readOnly))
                        scope.$apply(dovalidation);
                   /* if(!(elm[0].disabled||elm[0].readOnly))
                        dovalidation();*/
                });
               scope.$watch(function(){
                   return elm[0].disabled;
               },function(){
                   if(elm[0].disabled){
                       ctrl.$setValidity('check-required', true);
                       scope.errormessage = "";
                   }
               });

                scope.$watch(function(){
                    return elm[0].readOnly;
                },function(){
                    if(elm[0].readOnly){
                        ctrl.$setValidity('check-required', true);
                        scope.errormessage = "";
                    }
                });
                scope.$on("ValidateFields",function(){
                    if((!(elm[0].disabled||elm[0].readOnly)) && attr.addeditpopup != 'true')
                        dovalidation();
                });
                scope.$on("KickOffValidationForPopup",function(){
                    if((!(elm[0].disabled || elm[0].readOnly)) && attr.addeditpopup == 'true'){
                        dovalidation();
                    }
                });

                scope.$on("ClearValidation",function(){
                    ctrl.$setValidity('check-required', true);
                    scope.errormessage = "";
                });
                /*scope.$on('TabChange', tabChangeValidation);
                scope.$on('StepChange', stepChangeValidation);*/



                function dovalidation(prevTab, prevStep) {
                    //if(attr['tabname']==prevTab || attr['stepname']==prevStep){
                    if (elm.val() != "" ) {
                        ctrl.$setValidity('check-required', true);
                        scope.errormessage = "";
                    }
                    else {
                        ctrl.$setValidity('check-required', false);
                        scope.errormessage = "field can not be left blank";
                    }
                    //}
                }
            }
        }
    })
    .directive('ipValidator', ['validateinputs', function(validateinputs) {
        return {
            restrict: 'A',
            require: 'ngModel',
            scope: {
                errormessage: '='
            },
            link: function(scope, elm, attr, ctrl) {
                elm.bind('blur', function() {
                    if(!(elm[0].disabled||elm[0].readOnly))
                        scope.$apply(dovalidation());
                    /*if(!(elm[0].disabled||elm[0].readOnly))
                        dovalidation();*/
                });
                scope.$on("ValidateFields",function(){
                    if((!(elm[0].disabled||elm[0].readOnly)) && attr.addeditpopup != 'true')
                        dovalidation();
                });
                scope.$on("KickOffValidationForPopup",function(){
                    if((!(elm[0].disabled || elm[0].readOnly)) && attr.addeditpopup == 'true'){
                        dovalidation();
                    }
                });

                scope.$on("ClearValidation",function(){
                    ctrl.$setValidity('check-for-valid-ip', true);
                    scope.errormessage = "";
                });
               /* scope.$on('TabChange', tabChangeValidation);
                scope.$on('StepChange', stepChangeValidation);*/

                scope.$watch(function(){
                    return elm[0].disabled;
                },function(){
                    if(elm[0].disabled){
                        ctrl.$setValidity('check-for-valid-ip', true);
                        scope.errormessage = "";
                    }
                });

                scope.$watch(function(){
                    return elm[0].readOnly;
                },function(){
                    if(elm[0].readOnly){
                        ctrl.$setValidity('check-for-valid-ip', true);
                        scope.errormessage = "";
                    }
                });

                function dovalidation(prevTab, prevStep) {
                    if (validateinputs.validateIP(elm.val())) {
                        ctrl.$setValidity('check-for-valid-ip', true);
                        scope.errormessage = "";
                    }
                    else {
                        ctrl.$setValidity('check-for-valid-ip', false);
                        scope.errormessage = "In-Valid IP";
                    }
                }
            }
        }
    }])
    .directive('proxyValidator', ['validateinputs', function(validateinputs) {
        return {
            restrict: 'A',
            require: 'ngModel',
            scope: {
                errormessage: '='
            },
            link: function(scope, elm, attr, ctrl) {
                elm.bind('blur', function() {
                    if(!(elm[0].disabled||elm[0].readOnly))
                        scope.$apply(dovalidation());
                   /* if(!(elm[0].disabled||elm[0].readOnly))
                        dovalidation();*/
                });
                scope.$on("ValidateFields",function(){
                    if((!(elm[0].disabled||elm[0].readOnly)) && attr.addeditpopup != 'true')
                        dovalidation();
                });
                scope.$on("KickOffValidationForPopup",function(){
                    if((!(elm[0].disabled || elm[0].readOnly)) && attr.addeditpopup == 'true'){
                        dovalidation();
                    }
                });
                scope.$watch(function(){
                    return elm[0].disabled;
                },function(){
                    if(elm[0].disabled){
                        ctrl.$setValidity('check-for-valid-proxy', true);
                        scope.errormessage = "";
                    }
                });

                scope.$watch(function(){
                    return elm[0].readOnly;
                },function(){
                    if(elm[0].readOnly){
                        ctrl.$setValidity('check-for-valid-proxy', true);
                        scope.errormessage = "";
                    }
                });
                scope.$on("ClearValidation",function(){
                    ctrl.$setValidity('check-for-valid-proxy', true);
                    scope.errormessage = "";
                });

                function dovalidation(prevTab, prevStep) {
                    if (validateinputs.validateProxy(elm.val())) {
                        ctrl.$setValidity('check-for-valid-proxy', true);
                        scope.errormessage = "";
                    }
                    else {
                        ctrl.$setValidity('check-for-valid-proxy', false);
                        scope.errormessage = "In-Valid proxy host";
                    }
                }
            }
        }
    }])
    .directive('subnetValidator', ['validateinputs', function(validateinputs) {
        return {
            restrict: 'A',
            require: 'ngModel',
            scope: {
                errormessage: '='
            },
            link: function(scope, elm, attr, ctrl) {
                elm.bind('blur', function() {
                    if(!(elm[0].disabled||elm[0].readOnly))
                        scope.$apply(dovalidation);
                    /*if(!(elm[0].disabled||elm[0].readOnly))
                        dovalidation();*/
                });
                scope.$on("ValidateFields",function(){
                    if((!(elm[0].disabled||elm[0].readOnly)) && attr.addeditpopup != 'true')
                        dovalidation();
                });
                scope.$on("KickOffValidationForPopup",function(){
                    if((!(elm[0].disabled || elm[0].readOnly)) && attr.addeditpopup == 'true'){
                        dovalidation();
                    }
                });
                scope.$watch(function(){
                    return elm[0].disabled;
                },function(){
                    if(elm[0].disabled){
                        ctrl.$setValidity('check-for-valid-proxy', true);
                        scope.errormessage = "";
                    }
                });

                scope.$watch(function(){
                    return elm[0].readOnly;
                },function(){
                    if(elm[0].readOnly){
                        ctrl.$setValidity('check-for-valid-proxy', true);
                        scope.errormessage = "";
                    }
                });
                scope.$on("ClearValidation",function(){
                    ctrl.$setValidity('check-for-valid-subnet', true);
                    scope.errormessage = "";
                });


                /*scope.$on('TabChange', tabChangeValidation);
                scope.$on('StepChange', stepChangeValidation);*/



                function dovalidation(prevTab, prevStep) {
                    //if(attr['tabname']==prevTab || attr['stepname']==prevStep){
                    if (validateinputs.validateSubnetmask(elm.val())) {
                        ctrl.$setValidity('check-for-valid-subnet', true);
                        scope.errormessage = "";
                    }
                    else {
                        ctrl.$setValidity('check-for-valid-subnet', false);
                        scope.errormessage = "In-Valid value for subnet";
                    }
                    //}
                }

                function validate() {
                    if (attr.name === 'subnet')
                        dovalidation();
                }
            }
        }
    }])
    .directive('numericalValidator', ['validateinputs', function(validateinputs) {
        return {
            restrict: 'A',
            require: 'ngModel',
            scope: {
                errormessage: '='
            },
            link: function(scope, elm, attr, ctrl) {
                elm.bind('blur', function() {
                    if(!(elm[0].disabled||elm[0].readOnly))
                        scope.$apply(dovalidation);
                    /*if(!(elm[0].disabled||elm[0].readOnly))
                        dovalidation();*/
                });
                scope.$on("ValidateFields",function(){
                    if((!(elm[0].disabled||elm[0].readOnly)) && attr.addeditpopup != 'true')
                        dovalidation();
                });
                scope.$on("KickOffValidationForPopup",function(){
                    if((!(elm[0].disabled || elm[0].readOnly)) && attr.addeditpopup == 'true'){
                        dovalidation();
                    }
                });
                scope.$on("ClearValidation",function(){
                    ctrl.$setValidity('check-for-valid-subnet', true);
                    scope.errormessage = "";
                });
                scope.$watch(function(){
                    return elm[0].disabled;
                },function(){
                    if(elm[0].disabled){
                        ctrl.$setValidity('check-for-valid-subnet', true);
                        scope.errormessage = "";
                    }
                });

                scope.$watch(function(){
                    return elm[0].readOnly;
                },function(){
                    if(elm[0].readOnly){
                        ctrl.$setValidity('check-for-valid-subnet', true);
                        scope.errormessage = "";
                    }
                });



                function dovalidation(prevTab, prevStep) {
                    //if(attr['tabname']==prevTab || attr['stepname']==prevStep){
                    if (validateinputs.validateIfNumerical(elm.val())) {
                        ctrl.$setValidity('check-for-valid-subnet', true);
                        scope.errormessage = "";
                    }
                    else {
                        ctrl.$setValidity('check-for-valid-subnet', false);
                        scope.errormessage = "Should be a Numeric value";
                    }
                    //}
                }
            }
        }
    }])
    .directive("vlanvalidator", function () {
        return {
            restrict: "A",
            require: "ngModel",
            scope: {
                platformtype: "=",
                tenanttype: "=",
                segment: "=",
                cephmode: "="
            },
            link: function (scope, elm, attr, ctrl) {
                elm.bind('blur', function () {
                    if(!(elm[0].disabled||elm[0].readOnly))
                        scope.$apply(dovalidation);
                    /*if(!(elm[0].disabled||elm[0].readOnly))
                        dovalidation();*/
                });
                scope.$on("ValidateFields",function(){
                    if((!(elm[0].disabled||elm[0].readOnly)) && attr.addeditpopup != 'true')
                        dovalidation();
                });
                scope.$on("KickOffValidationForPopup",function(){
                    if((!(elm[0].disabled || elm[0].readOnly)) && attr.addeditpopup == 'true'){
                        dovalidation();
                    }
                });
                scope.$on("ClearValidation",function(){
                    ctrl.$setValidity('check-for-valid-vlanid', true);
                    scope.errormessage = "";
                });

                scope.$watch(function(){
                    return elm[0].disabled;
                },function(){
                    if(elm[0].disabled){
                        ctrl.$setValidity('check-for-valid-vlanid', true);
                        scope.errormessage = "";
                    }
                });

                scope.$watch(function(){
                    return elm[0].readOnly;
                },function(){
                    if(elm[0].readOnly){
                        ctrl.$setValidity('check-for-valid-vlanid', true);
                        scope.errormessage = "";
                    }
                });

                function dovalidation() {
                    var isValid = true;
                    if (scope.segment == "API") {
                        if (!isNaN(elm.val())) {
                            if (Number(elm.val()) < 1 || Number(elm.val()) > 4096) {
                                isValid = false;
                            }
                        }
                        else {
                            isValid = false;
                        }
                    }
                    else if (scope.segment == "CIMC") {
                    }
                    else if (scope.segment == "Management/Provision") {
                        if (!isNaN(elm.val())) {
                            if (Number(elm.val()) < 2 || Number(elm.val()) > 4094) {
                                isValid = false;
                            }
                        }
                        else {
                            isValid = false;
                        }
                    }
                    else if (scope.segment && scope.segment.indexOf("Tenant") != -1) {
                        if (scope.platformtype == "B") {
                            if (!isNaN(elm.val())) {
                                if (Number(elm.val()) < 2 || Number(elm.val()) > 4094) {
                                    isValid = false;
                                }
                            }
                            else {
                                isValid = false;
                            }
                        }
                        else {
                            if (scope.tenanttype == "VXLAN/Linux Bridge") {
                                if (isNaN(elm.val())) {
                                    isValid = false;
                                }
                            }
                            else {
                                if (elm.val() != "" && elm.val() != "None" && elm.val() != "none") {
                                    isValid = false;
                                }
                            }
                        }
                    }
                    else if (scope.segment && scope.segment.indexOf("Storage") != -1) {
                        if (!isNaN(elm.val())) {
                            if (Number(elm.val()) < 2 || Number(elm.val()) > 4094) {
                                isValid = false;
                            }
                        }
                        else {
                            isValid = false;
                        }
                    }
                    else if (scope.segment && scope.segment.indexOf("External") != -1) {
                        if (Number(elm.val()) < 2 || Number(elm.val()) > 4094) {
                            isValid = false;
                        }
                    }
                    else if (scope.segment && scope.segment.indexOf("Provider") != -1) {
                        if (elm.val() != "" && elm.val() != "None" && elm.val() != "none") {
                            isValid = false;
                        }
                    }
                    if (isValid) {
                        ctrl.$setValidity('check-for-valid-vlanid', true);
                    }
                    else {
                        ctrl.$setValidity('check-for-valid-vlanid', false);
                    }
                }
            }
        }
    })

        .directive('ipFqdnValidator',['validateinputs',function(validateinputs){
            return {
                restrict: 'A',
                require: 'ngModel',
                scope: {
                    errormessage: '='
                },
                link: function (scope, elm, attr, ctrl) {
                    elm.bind('blur', function () {
                        if (!(elm[0].disabled || elm[0].readOnly))
                            scope.$apply(dovalidation());
                        /*if(!(elm[0].disabled||elm[0].readOnly))
                            dovalidation();*/
                    });
                    scope.$on("ValidateFields", function () {
                        if ((!(elm[0].disabled || elm[0].readOnly)) && attr.addeditpopup != 'true')
                            dovalidation();
                    });
                    scope.$on("KickOffValidationForPopup", function () {
                        if ((!(elm[0].disabled || elm[0].readOnly)) && attr.addeditpopup == 'true') {
                            dovalidation();
                        }
                    });

                    scope.$on("ClearValidation", function () {
                        ctrl.$setValidity('check-for-valid-ip-fqdn', true);
                        scope.errormessage = "";
                    });
                    scope.$watch(function(){
                        return elm[0].disabled;
                    },function(){
                        if(elm[0].disabled){
                            ctrl.$setValidity('check-for-valid-ip-fqdn', true);
                            scope.errormessage = "";
                        }
                    });

                    scope.$watch(function(){
                        return elm[0].readOnly;
                    },function(){
                        if(elm[0].readOnly){
                            ctrl.$setValidity('check-for-valid-ip-fqdn', true);
                            scope.errormessage = "";
                        }
                    });
                    function dovalidation(prevTab, prevStep) {
                        if (validateinputs.validateIPorFQDN(elm.val())) {
                            ctrl.$setValidity('check-for-valid-ip-fqdn', true);
                            scope.errormessage = "";
                        }
                        else {
                            ctrl.$setValidity('check-for-valid-ip-fqdn', false);
                            scope.errormessage = "In-Valid IP or FQDN";
                        }
                    }
                }
            };
        }])
    .factory('helpTextService', ['$http', function($http) {
        return {
            UCMC_COMMON_UCSMIP: "Routable and Valid IPv4 address",
            A_NETWORKS_VLAN_ID_BC_SERIES: "Minimum 1 to Maximum 4096",
            UCSM_COMMON_RESOURCE_PREFIX: "Maximum 6 characters",
            A_NETWORKS_POOL_BC_SERIES: "No Pool Needed",
            HA_PROXY_EXTERNAL_VIP_ADDRESS_BC_SERIES: "Part of \'API\' Subnet defined in Networking Section",
            HA_PROXY_INTERNAL_VIP_ADDRESS_BC_SERIES: "Part of \'management/provision\' subnet and Out of \'management/provision\' Pool defined in Networking Section",
            HA_PROXY_VIRTUAL_ROUTER_ID_BC_SERIES: "Minimum 1 to Maximum 256",
            NEUTRONS_MECHANISMDRIVERS_BC_SERIES: "auto-filled to linuxbridge or openvswitch based on the choice of VXLAN/Linuxbridge or OVS/VLAN",
            NEUTRONS_TENANT_NETWORK_TYPES_BC_SERIES: "auto-filled to VLAN or VXLAN based on the choice of OVS/VLAN or VXLAN/Linuxbridge",
            VMTP_NET_SUBNET: "Subnet same as external network",
            VMTP_PROV_NET: "boolean",
            SERVER_AND_ROLES_SERVER_NAME: "Maximum 32 charecters",
            SERVER_AND_ROLES_CHASSIS_ID: "Minimum 1 and Maximum 8",
            SERVER_AND_ROLES_BLADE_ID: "Minimun 1 and Maximum 24",
            SERVER_AND_ROLES_RACKUNIT_ID: "Minimum 1 and Maximum 96",
            SERVER_AND_ROLES_RACK_ID: "Alpha-numeric value <br/>(Unique for every server)",
            NETWORKING_NTP_SERVERS: "Minimum 1 and Maximum 4",
            NETWORKING_DOMAIN_NAME_SERVERS: "Minimum 1 and Maximum 3",
            OPENSTACK_NEUTRON_VNI_RANGES: "For e.g VNI_RANGE: '60000:65000'",
            OPENSTACK_VMTP_SEGMENTATION_ID: "Minimum 2 and Maximum 4094",
            OPENSTACK_NEUTRON_NETWORK_VLAN_RANGES: "<ul style='list-style-type:disc'> <li> For Tenant network type VXLAN/LB this refers to physnet2:109:109 </li> <li> For Tenant network type OVS/VLAN with provider network this refers to physnet1:2002:2105 </li>  <li> For Tenant network type OVS/VLAN without provider network this refers to physnet1:2002:2105 </li>  </ul>",
            NETWORKING_VLAN_ID: "<ul style='list-style-type:disc'> <li>For Tenant N/W type OVS/VLAN, it should be None.</li>  <li>For Tenant N/W type Linux Bridge/VXLAN value depends on Segments.</br>  <ul style='list-style-type:disc'> <li>API :- 1 to 4096</li> <li>otherwise:-  2 to 4094</li> </ul> </li> </ul>",
            NETWORKING_POOL: "<ul class='wrapClass'><li>Pool can be defined with single IP or Range of IP</br> <ul><li>Single IP : &lt;10.30.118.101&gt;</li><li>Range of IP: &lt;10.30.118.98 to 10.30.118.105&gt;</li><li>Discontinous Pool: &lt;10.30.118.101,10.30.118.98 to 10.30.118.105&gt;</li> </ul> </li> </ul>",
            ELK_PASSWORD:"Default value  : 'CG'",
            ELK_ROTATION_FREQUENCY:"Default Rotatation Frequency :'Weekly'",
            ELK_ROTATION_SIZE:"Range : Minimum '1 GB', Maximum '50 GB' & Default '2 GB'"
        }
    }])

}());