(function() {
    'use strict';


    angular.module('mercuryInstaller.blueprintSetup.physicalSetupWizard.cimc', ['mercuryInstaller.utility', 'mercuryInstaller.widgets'])

    .controller('CIMCController', ['$scope', '$rootScope', 'InstallerConstants', function($scope, $rootScope, InstallerConstants) {
            $scope.cimcobj.cimc_username = InstallerConstants.CIMC_USR_NAME;
            $scope.checkUserInputsForCIMC = function() {
                if ($scope.cimcobj.cimc_username != "" && $scope.cimcobj.cimc_password != "") {
                    $scope.iscimcvalidated = true;
                    $scope.cimcobj.iscimcvalidated = true;
                } else {
                    $scope.iscimcvalidated = false;
                    $scope.cimcobj.iscimcvalidated = false;
                }
            }

            $scope.$on('ValidateAfterUpload', function() {
                $scope.checkUserInputsForCIMC();
            });
        }])
    /*.directive('checkRequiredCimc', function() {
        return {
            restrict: 'A',
            require: 'ngModel',
            link: function(scope, elm, attr, ctrl) {

                elm.bind('blur', function() {
                    scope.$apply(dovalidation);
                });
                scope.$on('kickOffValidationsForCIMC', dovalidation);

                function dovalidation() {

                    if (elm.val() != "") {
                        ctrl.$setValidity('check-required', true);


                    } else {
                        ctrl.$setValidity('check-required', false);

                    }

                }
            }

        }
    });*/
}());