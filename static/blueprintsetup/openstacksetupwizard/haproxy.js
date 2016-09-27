(function() {
    'use strict';
    angular.module('mercuryInstaller.blueprintSetup.openstackSetupWizard.haProxy', ['mercuryInstaller.utility', 'mercuryInstaller.widgets'])
        .controller('HAProxyCtrl', ['$scope', 'validateinputs', function($scope, validateinputs) {
            $scope.checkUserInputsForHAProxy = function() {
                if (validateinputs.validateIP($scope.haproxyobj.externalvipaddr)  && !isNaN($scope.haproxyobj.virtualrouterId) && Number($scope.haproxyobj.virtualrouterId>=1) && Number($scope.haproxyobj.virtualrouterId<=256) && validateinputs.validateIP($scope.haproxyobj.internalvipaddr)) {
                    $scope.haproxyobj.isHAProxyValidated = true;
                } else {
                    $scope.haproxyobj.isHAProxyValidated = false;
                }
            }

            $scope.$on('ValidateAfterUpload', function() {
                $scope.checkUserInputsForHAProxy();
            });

            $scope.checkUserInputsForHAProxy();
        }])
        /*.directive('checkRequiredHa', function() {
            return {
                restrict: 'A',
                require: 'ngModel',
                link: function(scope, elm, attr, ctrl) {

                    elm.bind('blur', function() {
                        scope.$apply(dovalidation);
                    });
                    scope.$on('kickOffValidationsForHAProxy', dovalidation);

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

    .directive('checkForValidIpHa', ['validateinputs', function(validateinputs) {
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

                scope.$on('kickOffValidationsForHAProxy', dovalidation);

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