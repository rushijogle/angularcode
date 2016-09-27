(function() {
    'use strict';
    angular.module('mercuryInstaller.blueprintSetup.openstackSetupWizard.keystone', ['mercuryInstaller.utility', 'mercuryInstaller.widgets'])
        .controller('KeystoneCtrl', ['$scope', 'validateinputs', function($scope, validateinputs) {
            $scope.checkUserInputsForKeystone = function() {
                if ($scope.keystoneobj.userName != "" && $scope.keystoneobj.password != "" && $scope.keystoneobj.tenantName != "" ) {
                    $scope.keystoneobj.isKeystoneValidated = true;
                } else {
                    $scope.keystoneobj.isKeystoneValidated = false;
                }
            }

            $scope.$on('ValidateAfterUpload', function() {
                $scope.checkUserInputsForKeystone();
            });
        }])
        /*.directive('checkRequiredKeystone', function() {
            return {
                restrict: 'A',
                require: 'ngModel',
                link: function(scope, elm, attr, ctrl) {

                    elm.bind('blur', function() {
                        scope.$apply(dovalidation);
                    });
                    scope.$on('kickOffValidationsForKeystone', dovalidation);

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

    .directive('checkForValidIpKeystone', ['validateinputs', function(validateinputs) {
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

                scope.$on('kickOffValidationsForKeystone', dovalidation);

                function dovalidation() {
                    if (validateinputs.validateIPorFQDN(elm.val()))
                        ctrl.$setValidity('check-for-valid-ip', true);
                    else
                        ctrl.$setValidity('check-for-valid-ip', false);
                }
            }

        }
    }]);*/

}());