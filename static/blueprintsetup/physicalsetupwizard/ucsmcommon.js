/**
 * 
 */
(function() {
    'use strict';
    angular.module('mercuryInstaller.blueprintSetup.physicalSetupWizard.ucsm', ['mercuryInstaller.utility', 'mercuryInstaller.widgets'])
        .controller('UCSMcontroller', ['$scope', 'InstallerConstants','validateinputs', function($scope, InstallerConstants,validateinputs) {
            $scope.ucsmobj.username = InstallerConstants.UCSM_USR_NAME;
            $scope.ckeckUserInputsForUCSM = function() {
                if ($scope.ucsmobj.username != "" && $scope.ucsmobj.password != "" && validateinputs.validateIP($scope.ucsmobj.ucsmIP) && $scope.ucsmobj.resourcePrefix != "")
                    $scope.ucsmobj.isUCSMValidated = true;
                else
                    $scope.ucsmobj.isUCSMValidated = false;
            }

            $scope.$on('ValidateAfterUpload', function() {
                $scope.ckeckUserInputsForUCSM();
            });

            $scope.checkIfDedicated = function(){
              if($scope.sharedobject.cephMode=="Dedicated"){
                  return true;
              }else{
                  return false;
              }
            };

            $scope.checkIfOVSVLAN = function(){
              if($scope.sharedobject.tenantNetwork == "OVS/VLAN"){
                  return false;
              }else{
                  return true;
              }
            };

            $scope.$watch(function(){
               return $scope.sharedobject.tenantNetwork;
            },function(){
                if($scope.sharedobject.tenantNetwork == "OVS/VLAN"){

                }else{
                    $scope.ucsmobj.ucsmPlugin = false;
                }
            });

            $scope.$watch(function(){
                return $scope.ucsmobj.ucsmPlugin;
            },function(){
                $scope.sharedobject.enableUCSMPlugin = $scope.ucsmobj.ucsmPlugin;
            });
        }])
        /*.directive('checkRequiredUcsm', function() {
            return {
                restrict: 'A',
                require: 'ngModel',
                link: function(scope, elm, attr, ctrl) {

                    elm.bind('blur', function() {
                        scope.$apply(dovalidation);
                    });
                    scope.$on('kickOffValidationsForUCSM', dovalidation);

                    function dovalidation() {

                        if (elm.val() != "") {
                            ctrl.$setValidity('check-required-networking', true);


                        } else {
                            ctrl.$setValidity('check-required-networking', false);

                        }

                    }
                }

            }
        })*/

    /*.directive('checkForValidIpUcsm', ['validateinputs', function(validateinputs) {
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

                    scope.$on('kickOffValidationsForUCSM', dovalidation);

                    function dovalidation() {
                        if (validateinputs.validateIPorFQDN(elm.val()))
                            ctrl.$setValidity('check-for-valid-ip', true);
                        else
                            ctrl.$setValidity('check-for-valid-ip', false);
                    }


                }

            }
        }])
        .directive('checkforsubnetUcsm', ['validateinputs', function(validateinputs) {
            return {
                restrict: 'A',
                require: 'ngModel',
                link: function(scope, elm, attr, ctrl) {
                    elm.bind('blur', function() {
                        scope.$apply(dovalidation);
                    });

                    scope.$on('kickOffValidationsForUCSM', dovalidation);

                    function dovalidation() {
                        if (validateinputs.validateSubnetmask(elm.val())) {
                            ctrl.$setValidity('check-for-valid-subnet', true);
                        } else {
                            ctrl.$setValidity('check-for-valid-subnet', false);
                        }

                    }
                }
            }
        }]);*/
}());