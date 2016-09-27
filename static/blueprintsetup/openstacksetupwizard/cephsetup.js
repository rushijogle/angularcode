(function() {
    'use strict';
    angular.module('mercuryInstaller.blueprintSetup.openstackSetupWizard.ceph', ['mercuryInstaller.utility', 'mercuryInstaller.widgets','mercuryInstaller.globals'])
        .controller('CephCtrl', ['$scope', 'validateinputs', 'InstallerConstants','Events', function($scope, validateinputs, InstallerConstants,Events) {
            $scope.cephModeDedicated = InstallerConstants.CEPH_MODE_DEDICATED;
            $scope.cephModeCentral = InstallerConstants.CEPH_MODEL_CENTRAL;

            if ($scope.sharedobject.cephMode == "Dedicated") {
                $scope.cephobj.isCephValidated = true;
            }

            $scope.checkUserInputsForCeph = function() {
                if ($scope.sharedobject.cephMode == "Central") {
                    if ($scope.cephobj.clusterId != "" && $scope.cephobj.monitorhost != "" && $scope.cephobj.monitormembers != "" && $scope.cephobj.secretUUID != "" && $scope.cephobj.novaRBDPool != "")
                        $scope.cephobj.isCephValidated = true;
                    else {
                        $scope.cephobj.isCephValidated = false;
                    }
                } else
                    $scope.cephobj.isCephValidated = true;
            }

            $scope.$on('ValidateAfterUpload', function() {
                $scope.checkUserInputsForCeph();
            });

            $scope.checkForCephMode = function() {
                if ($scope.sharedobject.cephMode == "Dedicated") {
                    return false;
                } else {
                    return true;
                }
            };
            $scope.$on(Events.CLEARFIELDSCALLED,function(){

                $scope.checkUserInputsForCeph();
            });

           /* $scope.$watch(function() {
                return $scope.sharedobject.cephMode;
            }, function() {
                $scope.checkUserInputsForCeph();
            });*/
        }])
        /*.directive('checkRequiredCeph', function() {
            return {
                restrict: 'A',
                require: 'ngModel',
                link: function(scope, elm, attr, ctrl) {

                    elm.bind('blur', function() {
                        scope.$apply(dovalidation);
                    });
                    scope.$on('kickOffValidationsForCeph', dovalidation);

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

                scope.$on('kickOffValidationsForCeph', dovalidation);

                function dovalidation() {
                    if (validateinputs.validateIPorFQDN(elm.val()))
                        ctrl.$setValidity('check-for-valid-ip', true);
                    else
                        ctrl.$setValidity('check-for-valid-ip', false);
                }

                function validate() {
                    if (attr.name === "gateway" || attr.name === "pool") {
                        dovalidation();
                    }
                }
            }

        }
    }]);*/

}());