(function() {
    'use strict';
    angular.module('mercuryInstaller.blueprintSetup.openstackSetupWizard', ['mercuryInstaller.blueprintSetup.openstackSetupWizard.haProxy', 'mercuryInstaller.blueprintSetup.openstackSetupWizard.ceph', 'mercuryInstaller.blueprintSetup.openstackSetupWizard.neutron', 'mercuryInstaller.blueprintSetup.openstackSetupWizard.cinder', 'mercuryInstaller.blueprintSetup.openstackSetupWizard.glance', 'mercuryInstaller.blueprintSetup.openstackSetupWizard.vmtp', 'mercuryInstaller.blueprintSetup.openstackSetupWizard.keystone','mercuryInstaller.blueprintSetup.openstackSetupWizard.tlsSetup','mercuryInstaller.blueprintSetup.openstackSetupWizard.elk','mercuryInstaller.globals'])
        .controller('OpenstackCtrl',['$scope','Events','$rootScope', function($scope,Events,$rootScope) {
            $scope.isHAProxyVisible = true;
            $scope.isKeystoneVIsible = false;
            $scope.isNeutronVisible = false;
            $scope.isCEPHVisible = false;
            $scope.isGlanceVisible = false;
            $scope.isCinderVisible = false;
            $scope.isVMTPVisible = false;
            $scope.isTLSVisible = false;
            $scope.isELKVisible = false;
            $scope.currentTab = 0;
            $scope.prevTab = -1;
            $scope.viewStackVisibilityArray = [$scope.isHAProxyVisible, $scope.isKeystoneVIsible, $scope.isNeutronVisible, $scope.isCEPHVisible, $scope.isGlanceVisible, $scope.isCinderVisible, $scope.isVMTPVisible,$scope.isTLSVisible,$scope.isELKVisible];

            $scope.isBSeries = function() {
                return $scope.blueprintsetupinput.initialSetupData.type == "B";
            }

            $scope.isVMTPEnable = function() {
                return $scope.blueprintsetupinput.initialSetupData.isVMTP;
            }
            $scope.getStepName = function(prevTab) {
                var stepName = "";
                switch (prevTab) {
                    case 0:
                        stepName = "HAProxy";
                        break;
                    case 1:
                        stepName = "Keystone";
                        break;
                    case 2:
                        stepName = "Neutron";
                        break;
                    case 3:
                        stepName = "CEPH";
                        break;
                    case 4:
                        stepName = "Glance";
                        break;
                    case 5:
                        stepName = "Cinder";
                        break;
                    case 6:
                        stepName = "VMTP";
                        break;
                    case 7:
                        stepName = "TLS";
                        break;
                    case 8:
                        stepName = "ELK";
                        break;
                }
                return stepName;
            }

            $scope.navigateToCurrentTab = function(tabName) {
                switch (tabName) {
                    case 'HAProxy':
                        $scope.showCurrentViewInViewStack(0);
                        $scope.prevTab = $scope.currentTab;
                        $scope.$broadcast("StepChange", {
                            'prevStep': $scope.getStepName($scope.prevTab)
                        });
                        $scope.currentTab = 0;
                        break;
                    case 'Keystone':
                        $scope.showCurrentViewInViewStack(1);
                        $scope.prevTab = $scope.currentTab;
                        $scope.$broadcast("StepChange", {
                            'prevStep': $scope.getStepName($scope.prevTab)
                        });
                        $scope.currentTab = 1;
                        break;
                    case 'Neutron':
                        $scope.showCurrentViewInViewStack(2);
                        $scope.prevTab = $scope.currentTab;
                        $scope.$broadcast("StepChange", {
                            'prevStep': $scope.getStepName($scope.prevTab)
                        });
                        $scope.currentTab = 2;
                        break;
                    case 'CEPH':
                        $scope.showCurrentViewInViewStack(3);
                        $scope.prevTab = $scope.currentTab;
                        $scope.$broadcast("StepChange", {
                            'prevStep': $scope.getStepName($scope.prevTab)
                        });
                        $scope.currentTab = 3;
                        break;
                    case 'Glance':
                        $scope.showCurrentViewInViewStack(4);
                        $scope.prevTab = $scope.currentTab;
                        $scope.$broadcast("StepChange", {
                            'prevStep': $scope.getStepName($scope.prevTab)
                        });
                        $scope.currentTab = 4;
                        break;
                    case 'Cinder':
                        $scope.showCurrentViewInViewStack(5);
                        $scope.prevTab = $scope.currentTab;
                        $scope.$broadcast("StepChange", {
                            'prevStep': $scope.getStepName($scope.prevTab)
                        });
                        $scope.currentTab = 5;
                        break;
                    case 'VMTP':
                        $scope.showCurrentViewInViewStack(6);
                        $scope.prevTab = $scope.currentTab;
                        $scope.$broadcast("StepChange", {
                            'prevStep': $scope.getStepName($scope.prevTab)
                        });
                        $scope.currentTab = 6;
                        break;
                    case 'TLS':
                        $scope.showCurrentViewInViewStack(7);
                        $scope.prevTab = $scope.currentTab;
                        $scope.$broadcast("StepChange", {
                            'prevStep': $scope.getStepName($scope.prevTab)
                        });
                        $scope.currentTab = 7;
                        break;
                    case 'ELK':
                        $scope.showCurrentViewInViewStack(8);
                        $scope.prevTab = $scope.currentTab;
                        $scope.$broadcast("StepChange", {
                            'prevStep': $scope.getStepName($scope.prevTab)
                        });
                        $scope.currentTab = 8;
                        break;

                }
            }

            $scope.showCurrentViewInViewStack = function(index) {
                if (index <= 8 && index >= 0) {
                    for (var ind in $scope.viewStackVisibilityArray) {

                        if (ind == index) {
                            $scope.viewStackVisibilityArray[ind] = true;
                            document.getElementById("Step-" + ind).className = "active";

                        } else {
                            $scope.viewStackVisibilityArray[ind] = false;
                            document.getElementById("Step-" + ind).classList.remove("active");
                        }
                    }
                }

            };

            $scope.$watch(function(){
               return $scope.blueprintsetupinput.initialSetupData.isVMTP;
            },function(){
                if($scope.currentTab == 6 && !$scope.blueprintsetupinput.initialSetupData.isVMTP){
                    $scope.currentTab = $scope.currentTab-1;
                    $scope.showCurrentViewInViewStack($scope.currentTab);
                }
            });

            $scope.$watch(function(){
                return $scope.blueprintsetupinput.openstackSetupData.elkobj.isElkSupported;
            },function(){
                if($scope.currentTab == 8 && !$scope.blueprintsetupinput.openstackSetupData.elkobj.isElkSupported){
                    $scope.currentTab = $scope.currentTab-1;
                    $scope.showCurrentViewInViewStack($scope.currentTab);
                }
            });

            $scope.nextClicked = false;
            $scope.nextClickedServers = false;

            $scope.updateInputObject = function() {

                if ($scope.currentTab != 8) {
                    $scope.currentTab++;
                    
                    if ($scope.currentTab == 6 && !$scope.isVMTPEnable()) {
                        $scope.currentTab++;
                    }
                    if($scope.currentTab == 8 && !$scope.checkIfElkSupported()){
                        $scope.currentTab--;
                    }
                    $scope.showCurrentViewInViewStack($scope.currentTab);
                }
            };

            $scope.goToPreviousView = function() {
                if ($scope.currentTab != 0) {
                    $scope.currentTab--;
                    if ($scope.currentTab == 6 && !$scope.isVMTPEnable()) {
                        $scope.currentTab--;
                    }
                    $scope.showCurrentViewInViewStack($scope.currentTab);
                }
            }
            
            $rootScope.$on(Events.MOVETOPARTICULARSTEP,function(event,args){
            	$scope.navigateToCurrentTab(args.step);
            });

            $scope.checkIfElkSupported = function(){
              if($scope.blueprintsetupinput.openstackSetupData.elkobj.isElkSupported){
                  return true;
              }else{
                  return false;
              }
            };

            $scope.checkIfNotFirst = function(){
              if($scope.currentTab != 0){
                return true;
              }else{
                  return false;
              }
            };

            $scope.checkIfNotLast = function(){
                if($scope.checkIfElkSupported()){
                    if($scope.currentTab != 8) {
                        return true;
                    }else{
                        return false;
                    }
                }else{
                    if($scope.currentTab != 7) {
                        return true;
                    }else{
                        return false;
                    }
                }


            };
            $scope.checkIfNeutronValidated = function(){
              if($scope.blueprintsetupinput.openstackSetupData.neutronData.isNewtronValidated){
                  return true;
              }else{
                  return false;
              }

            };

        }])

    .directive('haProxySetup', function() {
        return {
            restrict: 'E',
            scope: {
                haproxyobj: "=",
                ishaproxyvalid: "=",
                sharedobject: "="
            },
            templateUrl: '../static/blueprintsetup/openstacksetupwizard/haproxy.html'
        }
    })

    .directive('keystoneSetup', function() {
        return {
            restrict: 'E',
            scope: {
                keystoneobj: "=",
                iskeystonevalid: "=",
                sharedobject: "="
            },
            templateUrl: '../static/blueprintsetup/openstacksetupwizard/keystonesetup.html'
        }
    })

    .directive('neutronSetup', function() {
        return {
            restrict: 'E',
            scope: {
                neutronobj: "=",
                isneutronvalid: "=",
                iscseries: "=",
                sharedobject: "="
            },
            templateUrl: '../static/blueprintsetup/openstacksetupwizard/neutronsetup.html'
        }
    })

    .directive('cephSetup', function() {
        return {
            restrict: 'E',
            scope: {
                cephobj: "=",
                iscephvalid: "=",
                sharedobject: "="
            },
            templateUrl: '../static/blueprintsetup/openstacksetupwizard/cephsetup.html'
        }
    })

    .directive('glanceSetup', function() {
        return {
            restrict: 'E',
            scope: {
                glanceobj: "=",
                isglancevalid: "=",
                sharedobject: "="
            },
            templateUrl: '../static/blueprintsetup/openstacksetupwizard/glancesetup.html'
        }
    })

    .directive('cinderSetup', function() {
        return {
            restrict: 'E',
            scope: {
                cinderobj: "=",
                iscindervalid: "=",
                sharedobject: "="
            },
            templateUrl: '../static/blueprintsetup/openstacksetupwizard/cindersetup.html'
        }
    })

    .directive('vmtpSetup', function() {
        return {
            restrict: 'E',
            scope: {
                vmtpobj: "=",
                isvmtpvalid: "=",
                sharedobject: "="
            },
            templateUrl: '../static/blueprintsetup/openstacksetupwizard/vmtpsetup.html'
        }
    })

    .directive('tlsSetup', function() {
        return {
            restrict: 'E',
            scope: {
                tlsobj: "=",
                istlsvalid: "=",
                sharedobject: "="
            },
            templateUrl: '../static/blueprintsetup/openstacksetupwizard/tlssetup.html'
        }
    })

    .directive('elkSetup', function() {
        return {
            restrict: 'E',
            scope: {
                elkobj: "=",
                iselkvalid: "=",
                sharedobject: "="
            },
            templateUrl: '../static/blueprintsetup/openstacksetupwizard/elksetup.html'
        }
    })

}());