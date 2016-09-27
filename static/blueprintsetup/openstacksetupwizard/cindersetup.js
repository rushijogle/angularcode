(function() {
    'use strict';
    angular.module('mercuryInstaller.blueprintSetup.openstackSetupWizard.cinder', ['mercuryInstaller.utility', 'mercuryInstaller.widgets','mercuryInstaller.globals'])
        .controller('CinderCtrl', ['$scope', 'validateinputs', 'InstallerConstants','Events', function($scope, validateinputs, InstallerConstants,Events) {
            $scope.cinderobj.volumeDriver = InstallerConstants.CINDER_VOLUME_DRIVER;
            $scope.cinderobj.cinderPool = InstallerConstants.CINDER_RBD_POOL;
            if ($scope.sharedobject.cephMode == "Dedicated") {
                $scope.cinderobj.isCinderValidated = true;
            }
            $scope.checkUserInputsForCinder = function() {
                if ($scope.cinderobj.volumeDriver != "") {
                    if ($scope.sharedobject.cephMode == "Central") {
                        if ($scope.cinderobj.cinderKey != ""  && $scope.cinderobj.cinderPool != "")
                            $scope.cinderobj.isCinderValidated = true;
                        else {
                            $scope.cinderobj.isCinderValidated = false;
                        }
                    } else
                        $scope.cinderobj.isCinderValidated = true;
                } else {
                    $scope.cinderobj.isCinderValidated = false;
                }
            };

           /* $scope.$watch(function() {
                return $scope.sharedobject.cephMode;
            }, function() {
                $scope.checkUserInputsForCinder();
            });*/
            $scope.$on('ValidateAfterUpload', function() {
                $scope.checkUserInputsForCinder();
            });

            $scope.checkForCephModeAndShowHide = function() {
                if ($scope.sharedobject.cephMode == "Dedicated")
                    return false;
                else
                    return true;
            };
            $scope.$on(Events.CLEARFIELDSCALLED,function(){

                $scope.checkUserInputsForCinder();
            });
        }])
        /*.directive('checkRequiredCinder', function() {
            return {
                restrict: 'A',
                require: 'ngModel',
                link: function(scope, elm, attr, ctrl) {

                    elm.bind('blur', function() {
                        scope.$apply(dovalidation);
                    });
                    scope.$on('kickOffValidationsForCinder', dovalidation);

                    function dovalidation() {
                        if (elm.val() != "") {
                            ctrl.$setValidity('check-required', true);
                        } else {
                            ctrl.$setValidity('check-required', false);
                        }
                    }
                }
            }
        })

    .directive('checkForValidIpCeph', ['validateinputs', function(validateinputs) {
        return {
            restrict: 'A',
            require: 'ngModel',
            scope: {
                isinputvalid: "="
            },
            link: function(scope, elm, attr, ctrl) {

                elm.bind('blur', function() {
                    scope.$apply(dovalidation);
                });

                scope.$on('kickvalidationforceph', dovalidation);

                function dovalidation() {
                    if (validateinputs.validateIPorFQDN(elm.val()))
                        ctrl.$setValidity('check-for-valid-ip', true);
                    else
                        ctrl.$setValidity('check-for-valid-ip', false);
                }
            }

        }
    }])*/
}());