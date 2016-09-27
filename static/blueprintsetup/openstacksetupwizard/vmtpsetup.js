(function () {
    'use strict';
    angular.module('mercuryInstaller.blueprintSetup.openstackSetupWizard.vmtp', ['mercuryInstaller.utility', 'mercuryInstaller.widgets'])
            .controller('VMTPCtrl', ['$scope', 'validateinputs', '$rootScope', function ($scope, validateinputs, $rootScope) {
                    $scope.checkUserInputsForVMTP = function () {

                    	if($scope.vmtpobj.provNet && !$scope.vmtpobj.extNet){
                    		if ($scope.vmtpobj.providerNetwork.networkName != "" && validateinputs.validateSubnetmask($scope.vmtpobj.providerNetwork.subnet) && validateinputs.validateIP($scope.vmtpobj.providerNetwork.floatingIpstart) && validateinputs.validateIP($scope.vmtpobj.providerNetwork.floatingIpend) && validateinputs.validateIP($scope.vmtpobj.providerNetwork.gateway) && $scope.vmtpobj.providerNetwork.dnsServer != "" && $scope.vmtpobj.providerNetwork.segmentationId >= 2 && $scope.vmtpobj.providerNetwork.segmentationId <=4094){
                    			$scope.vmtpobj.isVMTPValidated = true;
                    		}else{
                    			$scope.vmtpobj.isVMTPValidated = false;
                    		}
                    	}else if(!$scope.vmtpobj.provNet && $scope.vmtpobj.extNet){
                    		if ($scope.vmtpobj.externalNetwork.networkName != "" && validateinputs.validateSubnetmask($scope.vmtpobj.externalNetwork.subnet) && validateinputs.validateIP($scope.vmtpobj.externalNetwork.floatingIpstart) && validateinputs.validateIP($scope.vmtpobj.externalNetwork.floatingIpend) && validateinputs.validateIP($scope.vmtpobj.externalNetwork.gateway) && $scope.vmtpobj.externalNetwork.dnsServer != ""){
                    			$scope.vmtpobj.isVMTPValidated = true;
                    		}else{
                    			$scope.vmtpobj.isVMTPValidated = false;
                    		}
                    	}else{
                    		if ($scope.vmtpobj.providerNetwork.networkName != "" && validateinputs.validateSubnetmask($scope.vmtpobj.providerNetwork.subnet) && validateinputs.validateIP($scope.vmtpobj.providerNetwork.floatingIpstart) && validateinputs.validateIP($scope.vmtpobj.providerNetwork.floatingIpend) && validateinputs.validateIP($scope.vmtpobj.providerNetwork.gateway) && $scope.vmtpobj.providerNetwork.dnsServer != "" && $scope.vmtpobj.providerNetwork.segmentationId >= 2 && $scope.vmtpobj.providerNetwork.segmentationId <=4094 &&
                                $scope.vmtpobj.externalNetwork.networkName != "" && validateinputs.validateSubnetmask($scope.vmtpobj.externalNetwork.subnet) && validateinputs.validateIP($scope.vmtpobj.externalNetwork.floatingIpstart) && validateinputs.validateIP($scope.vmtpobj.externalNetwork.floatingIpend) && validateinputs.validateIP($scope.vmtpobj.externalNetwork.gateway) && $scope.vmtpobj.externalNetwork.dnsServer != ""){
                    			$scope.vmtpobj.isVMTPValidated = true;
                    		}else{
                    			$scope.vmtpobj.isVMTPValidated = false;
                    		}
                    	}
                    }

                    $scope.$on('ValidateAfterUpload', function () {
                        $scope.checkUserInputsForVMTP();
                    });

                    $scope.$watch(function(){
                    	return $scope.vmtpobj.provNet;
                    },function(){
                    	if(!$scope.vmtpobj.provNet)
                    		$scope.vmtpobj.providerNetwork.clear();
                    	
                    });
                    
                    $scope.$watch(function(){
                    	return $scope.vmtpobj.extNet;
                    },function(){
                    	if(!$scope.vmtpobj.extNet)
                    		$scope.vmtpobj.externalNetwork.clear();
                    });
                    
                    $scope.isProvider = function(){
                        if ($scope.vmtpobj.providerNetwork.networkName != "" || $scope.vmtpobj.providerNetwork.subnet != "" || $scope.vmtpobj.providerNetwork.floatingIpstart != "" || $scope.vmtpobj.providerNetwork.floatingIpend != "" || $scope.vmtpobj.providerNetwork.gateway != "" || $scope.vmtpobj.providerNetwork.dnsServer != "" || $scope.vmtpobj.providerNetwork.segmentationId != ""){
                            return true;
                        }else{
                            return false;
                        }
                    };
                    
                    $scope.isExternal = function(){
                        if ($scope.vmtpobj.externalNetwork.networkName != "" || $scope.vmtpobj.externalNetwork.subnet != "" || $scope.vmtpobj.externalNetwork.floatingIpstart != "" || $scope.vmtpobj.externalNetwork.floatingIpend != "" || $scope.vmtpobj.externalNetwork.gateway != "" || $scope.vmtpobj.externalNetwork.dnsServer != ""){
                            return true;
                        }else{
                            return false;
                        }
                    };
                }])
            /*.directive('checkRequiredVmtp', function () {
                return {
                    restrict: 'A',
                    require: 'ngModel',
                    link: function (scope, elm, attr, ctrl) {

                        elm.bind('blur', function () {
                            scope.$apply(dovalidation);
                        });
                        scope.$on('kickOffValidationsForVMTP', dovalidation);

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

            .directive('checkForValidIpVmtp', ['validateinputs', function (validateinputs) {
                    return {
                        restrict: 'A',
                        require: 'ngModel',
                        scope: {
                            isinputvalid: "="
                        },
                        link: function (scope, elm, attr, ctrl) {

                            elm.bind('blur', function () {
                                scope.$apply(dovalidation);
                            });

                            scope.$on('kickOffValidationsForVMTP', dovalidation);

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