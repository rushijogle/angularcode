(function() {
    'use strict';
    angular.module('mercuryInstaller.blueprintSetup.openstackSetupWizard.glance', ['mercuryInstaller.utility', 'mercuryInstaller.widgets','mercuryInstaller.globals'])
        .controller('GlanceCtrl', ['$scope', 'validateinputs', 'InstallerConstants','Events', function($scope, validateinputs, InstallerConstants,Events) {
            $scope.glanceobj.storeBackend = InstallerConstants.STORE_BACK_END;
            $scope.glanceobj.glancePool = InstallerConstants.GLANCE_RBD_POOL;
            if ($scope.sharedobject.cephMode == "Dedicated") {
                $scope.glanceobj.isGlanceValidated = true;
            }
            $scope.checkUserInputsForGlance = function() {
                if ($scope.glanceobj.storeBackend != undefined) {
                    if ($scope.sharedobject.cephMode == "Central") {
                        if ($scope.glanceobj.glanceKey != "" && $scope.glanceobj.glancePool != "") {
                            $scope.glanceobj.isGlanceValidated = true;
                        } else {
                            $scope.glanceobj.isGlanceValidated = false;
                        }
                    } else
                        $scope.glanceobj.isGlanceValidated = true;
                } else {
                    $scope.glanceobj.isGlanceValidated = false;
                }
            }

           /* $scope.$watch(function() {
                return $scope.sharedobject.cephMode;
            }, function() {
                $scope.checkUserInputsForGlance();
            });*/

            $scope.$on('ValidateAfterUpload', function() {
                $scope.checkUserInputsForGlance();
            });
            $scope.$on(Events.CLEARFIELDSCALLED,function(){

                $scope.checkUserInputsForGlance();
            });
            $scope.checkForCephModeAndShowHide = function() {
                if ($scope.sharedobject.cephMode == "Dedicated")
                    return false;
                else {
                    return true;
                }
            };
        }]);
}());