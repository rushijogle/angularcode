(function() {
    'use strict';
    angular.module('mercuryInstaller.systemUpdate', ['mercuryInstaller.widgets', 'mercuryInstaller.utility', 'mercuryInstaller.globals'])
        .config(['$routeProvider', function($routeProvider) {
            $routeProvider
                .when('/systemupdate', {
                    templateUrl: '../static/systemupdate/systemupdate.html'
                })
        }])
        .directive('uploadFile',function(){
            return{
                restrict : "E",
                scope : {
                    uploadfileobj : "="
                },
                template : '<a class="btn btn-primary" href="javascript:void(0);"" ng-click="openFileBrowsePopup()">Browse</a><input id="uploadSetupFile" type="file" name="file_source"  style ="display:none;">',
                link:function(scope, elm, attr, ctrl){
                    scope.uploadfileobj = {};
                    scope.openFileBrowsePopup = function () {
                        $('#uploadSetupFile').trigger('click');
                    };
                    scope.readSingleFile = function (evt) {
                        //Retrieve the first (and only!) File from the FileList object
                        var file = evt.target.files[0];
                        scope.uploadfileobj.file = file;
                        if (file) {

                            scope.uploadfileobj.fileName = file.name;
                            var fileReader = new FileReader();
                            fileReader.readAsText(file, "UTF-8");
                            fileReader.onload = function (e) {
                                var contents = e.target.result;
                                scope.uploadfileobj.filecontent = contents;
                                //Apply to reflect the model values in UI elements (if any)
                                scope.$apply();
                            }
                            fileReader.readAsText(file);

                        } else {
                            console.error("Failed to load file");
                        }
                        scope.$apply();
                    };
                    document.getElementById('uploadSetupFile').addEventListener('change', scope.readSingleFile, false);
                }
            }
        })
        .controller('SystemUpdatrCtrl',['$scope','SystemUpdate','SystemUpdateData','$rootScope','UpdateMonitoring',function($scope,SystemUpdate,SystemUpdateData,$rootScope,UpdateMonitoring){
            $scope.isVisible = false;
            $scope.openDialog = function () {
                $('input[type=file]').trigger('click');
            };
            $scope.onProceed = function(){
                $scope.isVisible = false;
                $scope.performActionsWaiting();
            };

            $scope.onCancel = function(){
                $scope.isVisible = false;
            };

            $scope.commitChanges = function(){
                SystemUpdate.commitSystemUpdate(function(){
                    $rootScope.$broadcast("ShowErrorMessage", {
                        type: 'success',
                        msg: 'Commit Initiated',
                        disableAutoClose: false
                    });
                    UpdateMonitoring.startPollingForCommitRollbackStatus();
                },function(){

                });
            };

            $scope.commitHandler = function(){
                $scope.isVisible = true;
                $scope.popupText = "Are you sure you want to Commit the System Update?";
                $scope.performActionsWaiting = $scope.commitChanges;
            };

            $scope.rollbackChanges = function(){
                SystemUpdate.rollbackSystemUpdates(function(){
                    $rootScope.$broadcast("ShowErrorMessage", {
                        type: 'success',
                        msg: 'Rollback Initiated',
                        disableAutoClose: false
                    });
                    UpdateMonitoring.startPollingForCommitRollbackStatus();
                },function(){

                });
            };

            $scope.rollbackHandler = function(){
                $scope.isVisible = true;
                $scope.popupText = "Are you sure you want to Rollback the System Update?";
                $scope.performActionsWaiting = $scope.rollbackChanges;
            };

            $scope.onUpdateSuccess = function(resp){
                $rootScope.$broadcast("ShowErrorMessage", {
                    type: 'success',
                    msg: 'System Update Initiated',
                    disableAutoClose: false
                });
                $scope.uploadfileobj.fileName = "";
                $scope.uploadfileobj.file = "";
                UpdateMonitoring.startPollingforStatus();
            };

            $scope.onUpdateFailure = function(resp){
                $rootScope.$broadcast("ShowErrorMessage",{
                    type: 'danger',
                    msg: resp.faultstring,
                    disableAutoClose: false
                });
            };

            $scope.uploadfileandstartupdate = function(){
                var fileName = $scope.uploadfileobj.fileName;
                var file = $scope.uploadfileobj.file;
                SystemUpdate.startupdate(file,fileName,$scope.onUpdateSuccess,$scope.onUpdateFailure);
            };

            $scope.checkIfAlreadyRunningUpdate = function(){
                if(SystemUpdateData.update_status === "UpdateRunning" || SystemUpdateData.update_status === "ToUpdate" || SystemUpdateData.update_status === "ToRollBack" || SystemUpdateData.update_status === "RollbackRunning" || SystemUpdateData.update_status === "ToCommit" || SystemUpdateData.update_status === "CommitRunning" || SystemUpdateData.update_status === "BootstrapAutoRollback" || SystemUpdateData.update_status === "AutoRollbackRunning"){
                    return true;
                }
                else{
                    return false;
                }
            };

            $scope.checkIfStatusActive = function(){
                if(SystemUpdateData.update_status === "UpdateSuccess"){
                    return true;
                }
                else{
                    return false;
                }
            };

            SystemUpdate.getSystemUpdateStatus(function(resp){
                if(resp.data.update_status == "UpdateRunning" || resp.data.update_status == "ToUpdate"){
                    UpdateMonitoring.startPollingforStatus();
                }
                SystemUpdateData.update_filename = resp.data.update_filename;
                SystemUpdateData.update_logs = resp.data.update_logs;
                SystemUpdateData.update_status = resp.data.update_status;
                SystemUpdateData.created_at = resp.data.created_at;
                SystemUpdateData.updated_at = resp.data.updated_at;
            },function(resp){

            });

            $scope.$watch(function(){
                return SystemUpdateData.update_status;
            },function(){
                $scope.systemUpdateDataObject = new Object();
                $scope.systemUpdateDataObject.update_filename = SystemUpdateData.update_filename;
                $scope.systemUpdateDataObject.update_logs = SystemUpdateData.update_logs;
                $scope.systemUpdateDataObject.update_status = SystemUpdateData.update_status;
                $scope.systemUpdateDataObject.created_at = SystemUpdateData.created_at?new Date(SystemUpdateData.created_at).toLocaleString():"";
                $scope.systemUpdateDataObject.updated_at = SystemUpdateData.updated_at?new Date(SystemUpdateData.updated_at).toLocaleString():"";
            });

            $scope.$on("$destroy", function() {
                UpdateMonitoring.stopPolling();
            });


        }])
        .factory("SystemUpdate",['$http','Configuration','SystemUpdateData',function($http,Configuration,SystemUpdateData){
                var backendServerUrl = Configuration.isDebug?Configuration.backendServerUrl:"";
                var pollingTimer = null;
                var pollingIntserval = 2000;
                var lastStatus = "";
                var pollingTimerForCommit = null;
                var uploadFileAndStartUpdate = function(file,fileName,onSuccess,onFailure){
                    var formData = new FormData();
                    formData.append('fileupload',file);
                    formData.append('filename',fileName);

                    $http.post(backendServerUrl+"/v1/update",formData,{
                            transformRequest: angular.identity,
                            headers: {'Content-Type': undefined}
                        })
                        .success(onSuccess)
                        .error(onFailure);

                };

                var getSystemUpdateStatus = function(onSuccess,onFailure){

                    var request = $http({
                        method: "GET",
                        url: backendServerUrl + "/v1/update"
                    });
                    request.then(onSuccess,onFailure);
                };

                var commitSystemUpdate = function(onSuccess,onFailure){
                    var request = $http({
                        method: "PUT",
                        url: backendServerUrl + "/v1/update",
                        data : {
                            action : "commit"
                        }
                    });

                    request.then(onSuccess,onFailure);
                };

                var rollbackSystemUpdates = function(onSuccess,onFailure){
                    var request = $http({
                        method: "PUT",
                        url: backendServerUrl + "/v1/update",
                        data : {
                            action : "rollback"
                        }
                    });

                    request.then(onSuccess,onFailure);
                };

                var setSystemUpdateData = function(resp){
                    SystemUpdateData.update_filename = resp.update_filename;
                    SystemUpdateData.created_at = resp.created_at;
                    SystemUpdateData.updated_at = resp.updated_at;
                    SystemUpdateData.update_logs = resp.update_logs;
                    SystemUpdateData.update_status = resp.update_status;
                };



               return{
                   startupdate : uploadFileAndStartUpdate,
                   getSystemUpdateStatus : getSystemUpdateStatus,
                   commitSystemUpdate : commitSystemUpdate,
                   rollbackSystemUpdates : rollbackSystemUpdates

               }
        }])


})();
