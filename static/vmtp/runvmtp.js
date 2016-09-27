(function () {
    'use strict';

    angular.module('mercuryInstaller.vmtp', ['ngRoute', 'mercuryInstaller.utility', 'chart.js'])
        .config(['$routeProvider',
            function ($routeProvider) {

                $routeProvider
                    .when('/runvmtp', {
                        controller: 'RunvmtpCtrl',
                        templateUrl: '../static/vmtp/runvmtp.html'
                    });
            }
        ])

        .factory('VmtpService', ['$rootScope', '$http', 'Configuration', function ($rootScope, $http, Configuration) {
            var latestVMTPArray = [];
            var pollinginterval = 3000; // 2 second;
            var pollingTimer = null;
            var backendServerUrl = Configuration.isDebug ? Configuration.backendServerUrl : "";

            var notifyChanges = function () {



            };

            var showvmtp = function (successCallback, failureCallback) {
                var request3 = $http({
                    method: "GET",
                    url: backendServerUrl + "/vmtp/" + localStorage.currentuuid
                });
                request3.then(successCallback, failureCallback);
            };


            var runvmtp = function (vmtpFlag, successCallback, failureCallback) {
                var request = $http({
                    method: "POST",
                    url: backendServerUrl + "/vmtp/",
                    data: vmtpFlag
                });
                request.then(successCallback, failureCallback);
            };

            var startPolling = function (uuid) {

                if (pollingTimer) {
                    clearInterval(pollingTimer);
                }
                pollingTimer = setInterval(function () {
                    $http.get(backendServerUrl + "/vmtp/" + uuid).success(function (response) {
                        $rootScope.$emit("latestVMTPStatus",{
                            status : response.status
                        });
                        if (response.status == 'vmtpsuccess' || response.status == 'vmtpfailed') {
                            clearInterval(pollingTimer);
                            localStorage.vmtpCompletedID = response.uuid;
                            localStorage.vmtpRunningId = '';
                            $rootScope.$broadcast("latestdatafetchedVMTP", {
                                'vmtpstatus': response.status
                            });

                            $rootScope.isVMTPLoader = true;
                        }
                    });
                }, pollinginterval);

            };

            var stopPolling = function () {
                clearInterval(pollingTimer);
            };

            var getVMTPData = function(uuid, success,error){
                $http.get(backendServerUrl + "/vmtp/" + uuid).success(success).error(error);
            };

            var getInstallVMTP = function(success,error){
                $http.get(backendServerUrl + "/install").success(success).error(error);
            };
            return {
                runvmtp: runvmtp,
                startPolling: startPolling,
                stopPolling: stopPolling,
                showvmtp: showvmtp,
                getVMTPDataWithUUID : getVMTPData,
                getInstallVMTPData : getInstallVMTP
            };
        }])

        .controller('RunvmtpCtrl', ['$rootScope', '$scope', '$http', 'VmtpService', 'DeploymentMonitoringService','Events','SystemUpdateData','UpdateMonitoring',
            function ($rootScope, $scope, $http, vmtp, DMS,Events,SystemUpdateData,UpdateMonitoring) {
                $scope.labels = [];
                $scope.isVMTPContainer = true;
                $scope.data = [];
                $scope.finalData = [];
                $scope.vmtpSummaryarr = [];
                $scope.vmlabel = [];
                $scope.installdata = [];
                $scope.installvmlabel = [];
                $scope.installvmtpSummaryarr = [];
                $scope.installlabels = [];
                $scope.series = ['UDP 128', 'UDP 1024', 'UDP 8192', 'TCP 65536'];
                $scope.installseries = ['UDP 128', 'UDP 1024', 'UDP 8192', 'TCP 65536'];
                $scope.isVMTPRunning = false;
                $scope.flowsLength = 0;
                Chart.defaults.global.colours = [
                    {// blue
                        fillColor: "rgba(20, 90, 229, 1)",
                        strokeColor: "rgba(20, 90, 229, 1)",
                        pointColor: "rgba(20, 90, 229, 1)",
                        pointStrokeColor: "#fff",
                        pointHighlightFill: "#fff",
                        pointHighlightStroke: "rgba(20, 90, 229, 1)"
                    },
                    {// light grey
                        fillColor: "rgba(242, 48, 48, 1)",
                        strokeColor: "rgba(242, 48, 48, 1)",
                        pointColor: "rgba(242, 48, 48, 1)",
                        pointStrokeColor: "#fff",
                        pointHighlightFill: "#fff",
                        pointHighlightStroke: "rgba(242, 48, 48, 1)"
                    },
                    {// red
                        fillColor: "rgba(232, 209, 9, 1)",
                        strokeColor: "rgba(232, 209, 9, 1)",
                        pointColor: "rgba(232, 209, 9, 1)",
                        pointStrokeColor: "#fff",
                        pointHighlightFill: "#fff",
                        pointHighlightStroke: "rgba(232, 209, 9, 1)"
                    },
                    {// green
                        fillColor: "rgba(15, 157, 88,1)",
                        strokeColor: "rgba(15, 157, 88,1)",
                        pointColor: "rgba(15, 157, 88,1)",
                        pointStrokeColor: "#fff",
                        pointHighlightFill: "#fff",
                        pointHighlightStroke: "rgba(15, 157, 88,1)"
                    }
                ];

                DMS.startCheckingForPODOperation();
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

                $rootScope.$on(Events.PODMGMTACTIVITY,function(){
                    $scope.activePodOperationObj = DMS.getOnGoingPodOperationDetails();
                    $scope.checkIfAnyOperationRunning();
                });

               UpdateMonitoring.startPollingforStatus();

                $scope.$on("$destroy", function() {
                    UpdateMonitoring.stopPolling();
                });

                $scope.$on("SetupDataChanged", function () {
                    $scope.fetchData();
                });

                $scope.getTitleForRunVMTP = function(){
                    if($scope.checkIfAnyOperationRunning() && !( SystemUpdateData.update_status == "ToUpdate" || SystemUpdateData.update_status == "UpdateRunning" || SystemUpdateData.update_status == "ToCommit" || SystemUpdateData.update_status == "CommitRunning" || SystemUpdateData.update_status == "ToRollback" ||
                        SystemUpdateData.update_status == "RollbackRunning" || SystemUpdateData.update_status == "BootstrapAutoRollback" || SystemUpdateData.update_status == "AutoRollbackRunning")){
                        return "Pod Operation Running";
                    }else if( SystemUpdateData.update_status == "ToUpdate" || SystemUpdateData.update_status == "UpdateRunning" || SystemUpdateData.update_status == "ToCommit" || SystemUpdateData.update_status == "CommitRunning" || SystemUpdateData.update_status == "ToRollback" ||
                        SystemUpdateData.update_status == "RollbackRunning" || SystemUpdateData.update_status == "BootstrapAutoRollback" || SystemUpdateData.update_status == "AutoRollbackRunning") {
                        return "System Update Running";
                    }else{
                        return "Run VMTP";
                    }
                };

                $scope.fetchData = function () {
                    if (DMS.getDeployedBlueprint().name == '') {
                        $scope.VMTPname = "No Active Blueprint";
                    } else {
                        $scope.VMTPname = DMS.getDeployedBlueprint().name;
                    }
                }

                $scope.fetchData();


                $scope.myChartOptions = {
                    animation: true,
                    scaleFontSize: 12,
                    barValueSpacing: 25,
                    legendTemplate: "<ul class=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<datasets.length; i++){%><li><span style=\"background-color:<%=datasets[i].strokeColor%>\"></span><%if(datasets[i].label){%><%=datasets[i].label%><%}%></li><%}%></ul>"
                };

                $scope.deployservice = function () {
                    //localStorage.currentuuid = localStorage.vmtpRunningId;

                    $scope.vmtpObject = {'vmtp': 'true'};
                    vmtp.runvmtp($scope.vmtpObject, function (resp) {
                        $scope.isVMTPRunning = true;
                        localStorage.vmtpRunningId = resp.data.uuid;
                        vmtp.startPolling(localStorage.vmtpRunningId);
                    }, function (resp) {
                        // failure call run vmtp flag
                    });


                };

                $scope.startInitialPolling = function(){
                    if(localStorage.vmtpRunningId ){
                        $scope.isVMTPRunning = true;
                        vmtp.startPolling(localStorage.vmtpRunningId);
                    }
                };



                $scope.loadVMTPData = function(){
                    if (localStorage.vmtpCompletedID) {

                        vmtp.getVMTPDataWithUUID(localStorage.vmtpCompletedID,function(response){
                            $scope.populateFieldsAndCreateGraph(response);
                        }, function(response){
                            //Clean the Graph and show no data available message
                        });
                    }
                    else{
                        //Clean the Graph and show no data available message
                    }
                };
                $scope.startInitialPolling();
                $scope.loadVMTPData();



                $scope.populateFieldsAndCreateGraph = function (response) {
                    //$scope.isVMTPRunning = false;
                    $scope.data = [];
                    $scope.vmlabel = [];
                    $scope.vmtpSummaryarr = [];
                    $scope.labels = [];



                    if(response.status != "vmtpfailed" && JSON.parse(response.vmtpresult).EXT_NET != undefined){
                        var resp = JSON.parse(response.vmtpresult).EXT_NET;
                    }
                    else if(response.status != "vmtpfailed" && JSON.parse(response.vmtpresult).PROV_NET != undefined){
                        var resp = JSON.parse(response.vmtpresult).PROV_NET;
                    }

                    $scope.flowsLength = resp && resp['flows'] ? resp['flows'].length:0;
                    if ($scope.flowsLength == 0) {
                        $scope.isVMTPContainer = true;
                        $scope.isResultFound = false;
                    } else {
                        $scope.isResultFound = true;
                        $scope.isVMTPContainer = false;
                        for (var i in resp['flows']) {
                            var totalThroughput = 0;
                            var cnt = 0;
                            var description = resp['flows'][i].desc;
                            $scope.labels.push(Number(i) + 1);
                            $scope.vmlabel.push({
                                'id': Number(i) + 1,
                                'name': resp['flows'][i].desc
                            });
                            for (var j in resp['flows'][i].results) {

                                if (resp['flows'][i].results[j]['protocol'] === 'TCP') {
                                    totalThroughput += resp['flows'][i].results[j]['throughput_kbps'];

                                } else {
                                    if (resp['flows'][i].results[j]['protocol'] && resp['flows'][i].results[j]['throughput_kbps']) {

                                        if ($scope.data[cnt] == undefined)
                                            $scope.data[cnt] = [];
                                        var UDPthroughput = resp['flows'][i].results[j]['throughput_kbps'];
                                        $scope.data[cnt].push(UDPthroughput / 1000000);
                                        cnt++;

                                    }
                                }
                            }
                            if ($scope.data[cnt] == undefined)
                                $scope.data[cnt] = [];
                            var avgValue = totalThroughput / 3;
                            var kbtogb = avgValue / 1000000;
                            $scope.data[cnt].push(kbtogb.toFixed(3));
                            cnt++;

                        }

                    }
                    if(resp){
                        $scope.vmtpSummaryarr.push({
                            'version': resp.version,
                            'auth_url': resp.auth_url,
                            'date': resp.date,
                            'encapsulation': resp.encapsulation,
                            'l2agent_type': resp.l2agent_type
                        });
                    }

                };

                $scope.populateFieldsAndCreateGraphForVMTP = function(response){
                    $scope.installdata = [];
                    $scope.installvmlabel = [];
                    $scope.installvmtpSummaryarr = [];
                    $scope.installlabels = [];



                    if(JSON.parse(response.vmtpresult).EXT_NET != undefined){
                        var resp = JSON.parse(response.vmtpresult).EXT_NET;
                    } else {
                        var resp = JSON.parse(response.vmtpresult).PROV_NET;
                    }

                        for (var i in resp['flows']) {
                            var totalThroughput = 0;
                            var cnt = 0;
                            var description = resp['flows'][i].desc;
                            $scope.installlabels.push(Number(i) + 1);
                            $scope.installvmlabel.push({
                                'id': Number(i) + 1,
                                'name': resp['flows'][i].desc
                            });
                            for (var j in resp['flows'][i].results) {

                                if (resp['flows'][i].results[j]['protocol'] === 'TCP') {
                                    totalThroughput += resp['flows'][i].results[j]['throughput_kbps'];

                                } else {
                                    if (resp['flows'][i].results[j]['protocol'] && resp['flows'][i].results[j]['throughput_kbps']) {

                                        if ($scope.installdata[cnt] == undefined)
                                            $scope.installdata[cnt] = [];
                                        var UDPthroughput = resp['flows'][i].results[j]['throughput_kbps'];
                                        $scope.installdata[cnt].push(UDPthroughput / 1000000);
                                        cnt++;

                                    }
                                }
                            }

                            var avgValue = totalThroughput / 3;
                            var kbtogb = avgValue / 1000000;
                            if ($scope.installdata[cnt] == undefined)
                                $scope.installdata[cnt] = [];
                            $scope.installdata[cnt].push(kbtogb.toFixed(3));
                            cnt++;

                        }


                    $scope.installvmtpSummaryarr.push({
                        'version': resp.version,
                        'auth_url': resp.auth_url,
                        'date': resp.date,
                        'encapsulation': resp.encapsulation,
                        'l2agent_type': resp.l2agent_type
                    });
                };
                $scope.loadInstallVMTP = function(){
                    vmtp.getInstallVMTPData(function(response){
                        $scope.populateFieldsAndCreateGraphForVMTP(response.installs[0])
                    },function(response){

                    })
                };
                $scope.loadInstallVMTP();

                $scope.checkforstatusandapplyclass = function(){
                  if($scope.runningvmtpstatus == "vmtpsuccess")
                    return "label label-success";
                  else if($scope.runningvmtpstatus == "vmtpsuccess")
                    return "label label-failure";
                };

                $scope.$on("$destroy", function () {
                    vmtp.stopPolling();
                });


                $rootScope.$on('latestdatafetchedVMTP', function (event, args) {

                    $scope.loadVMTPData();
                    $scope.isVMTPRunning = false;
                });

                $scope.runningvmtpstatus = "Not Available";
                $rootScope.$on("latestVMTPStatus",function(event,args){
                    $scope.runningvmtpstatus = args.status;
                });

                $scope.checkIfVMTPDataPresent = function(){
                    if($scope.flowsLength == 0)
                        return false;
                    else
                        return true;
                };


            }]);


}());
