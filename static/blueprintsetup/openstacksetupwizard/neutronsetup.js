(function() {
    'use strict';
    angular.module('mercuryInstaller.blueprintSetup.openstackSetupWizard.neutron', ['mercuryInstaller.utility', 'mercuryInstaller.widgets','mercuryInstaller.globals'])
        .controller('NeutronCtrl', ['$scope', 'validateinputs', '$rootScope','Events', function($scope, validateinputs, $rootScope,Events) {
            $scope.checkIfBSeries = function(){
                if($scope.sharedobject.type == "B"){
                    return true;
                }else{
                    return false;
                }
            };

            $scope.setValuesDependingOntenantNW = function() {
                $scope.neutronobj.tenantNwtype = $scope.sharedobject.tenantNetwork == 'VXLAN/Linux Bridge' ? 'VXLAN' : 'VLAN';
                $scope.neutronobj.mechanismDrives = $scope.sharedobject.tenantNetwork == 'VXLAN/Linux Bridge' ? 'linuxbridge' : 'openvswitch';
                $scope.neutronobj.typeDrives = "flat,vlan";
                /*if ($scope.sharedobject.tenantNetwork == "VXLAN/Linux Bridge") {
                    if ($scope.sharedobject.isExternal && $scope.sharedobject.isProvider) {
                        $scope.neutronobj.bridgephysicalInterface = "physnet1:e,physnet2:p";
                    } else if ($scope.sharedobject.isExternal && !$scope.sharedobject.isProvider) {
                        $scope.neutronobj.bridgephysicalInterface = "physnet1:e";
                    } else if (!$scope.sharedobject.isExternal && $scope.sharedobject.isProvider) {
                        $scope.neutronobj.bridgephysicalInterface = "physnet2:p";
                    }
                } else {
                    if ($scope.sharedobject.isExternal && $scope.sharedobject.isProvider) {
                        $scope.neutronobj.bridgephysicalInterface = "physnet1:e,physnet2:br-prov";
                    } else if ($scope.sharedobject.isExternal && !$scope.sharedobject.isProvider) {
                        $scope.neutronobj.bridgephysicalInterface = "physnet1:e";
                    } else if (!$scope.sharedobject.isExternal && $scope.sharedobject.isProvider) {
                        $scope.neutronobj.bridgephysicalInterface = "physnet2:br-prov";
                    }
                }*/
            };

            $scope.setValuesDependingOntenantNW();

            $scope.$watch(function() {
                return $scope.sharedobject.tenantNetwork;
            }, function() {
                $scope.setValuesDependingOntenantNW();
            });

            $scope.$watch(function() {
                return $scope.sharedobject.isExternal;
            }, function() {
                $scope.setValuesDependingOntenantNW();
            });

            /*$scope.$watch(function(){
                return $scope.sharedobject.tenantNetwork;
            },function(){
                $scope.checkUserInputsForNeutron();
            });*/

            $scope.$on("TenantNWChanged",function(){
                $scope.checkUserInputsForNeutron();
            })
            $scope.$watch(function() {
                return $scope.sharedobject.isProvider;
            }, function() {
                $scope.setValuesDependingOntenantNW();
            });
            $scope.checkUserInputsForNeutron = function() {

            	if($scope.sharedobject.tenantNetwork == "VXLAN/Linux Bridge"){
                    if($scope.neutronobj.tenantNwtype && $scope.neutronobj.mechanismDrives && $scope.neutronobj.mechanismDrives!="")
        			    $scope.neutronobj.isNewtronValidated = true;
                    else
                        $scope.neutronobj.isNewtronValidated = false;
        		}else if($scope.sharedobject.tenantNetwork == "OVS/VLAN"){
        			if ($scope.neutronobj.vlanRanges && $scope.neutronobj.vlanRanges != "" && $scope.neutronobj.tenantNwtype && $scope.neutronobj.mechanismDrives && $scope.neutronobj.mechanismDrives!="") {
                    	$scope.neutronobj.isNewtronValidated = true;

                    } else {
                        $scope.neutronobj.isNewtronValidated = false;
                    }
        		}else{
                    $scope.neutronobj.isNewtronValidated = false;
                }

            };

            $scope.$on('ValidateAfterUpload', function() {
                $scope.checkUserInputsForNeutron();
            });
            $scope.checkUserInputsForNeutron();
            $scope.checkForTenantTypeAndSegmentForVLANRanges = function() {
                return true;
            };

            $scope.checkForTenantNetworkType = function() {
                if ($scope.sharedobject.tenantNetwork == "VXLAN/Linux Bridge") {
                    return true;
                } else {
                    return false;
                }
            };

            $scope.checkForTenantTypeAndSegment = function() {
                if ($scope.neutronobj.tenantNwtype == "VXLAN") {
                    return true;
                } else if ($scope.neutronobj.tenantNwtype == "VLAN") {
                    if ($scope.sharedobject.isProvider == true) {
                        return true;
                    } else {
                        return false;
                    }
                }
            };

            $scope.checkIfProviderNetwork = function() {
                if ($scope.sharedobject.isProvider) {
                    return true;
                } else {
                    return false;
                }
            };

            
            $scope.isOVSVLAN = function(){
            	return $scope.sharedobject.tenantNetwork=='OVS/VLAN';
            };

            $scope.$on(Events.CLEARFIELDSCALLED,function(){
                $scope.setValuesDependingOntenantNW();
                $scope.checkUserInputsForNeutron();
            });
        }]);
}());