/**
 * 
 */
(function() {
    'use strict';
    angular.module('mercuryInstaller.blueprintSetup.physicalSetupWizard', ['mercuryInstaller.utility', 'mercuryInstaller.blueprintSetup.physicalSetupWizard.cimc', 'mercuryInstaller.blueprintSetup.physicalSetupWizard.networking', 'mercuryInstaller.blueprintSetup.physicalSetupWizard.serverAndRoles', 'mercuryInstaller.blueprintSetup.physicalSetupWizard.ucsm', 'mercuryInstaller.widgets','mercuryInstaller.globals','mercuryInstaller.blueprintSetup.physicalSetupWizard.registrySetup'])
        .controller('PhysicalSetupCtrl', ['$scope','Events','$rootScope', function($scope,Events,$rootScope) {
            $scope.isCSeries = true;
            $scope.isRegistryVisible = true;
            $scope.isCIMCVisible = false;
            $scope.isNetworkingVIsible = false;
            $scope.isServersAndRolesVisible = false;
            $scope.isRedhatSubscriptionVisible = false;
            $scope.currentTab = 0;
            $scope.prevStep = 0;
            $scope.viewStackVisibilityArray = [$scope.isRegistryVisible,$scope.isCIMCVisible, $scope.isNetworkingVIsible, $scope.isServersAndRolesVisible];

            $scope.cimcObj = new CIMCProtoType();
            $scope.redhatSubscriptionObj = new RedhatSubscription();
            $scope.networkConfObj = new NetworkingProtoType();
            $scope.serversArray = [];
            $scope.nextClicked = false;
            $scope.nextClickedServers = false;

            $scope.isCSeries = function() {
                return $scope.blueprintsetupinput.initialSetupData.type == "C" ? true : false;
            }

            $scope.getStepName = function(stepIndex) {
                var stepName = "";
                switch (stepIndex) {
                    case 0:
                        stepName = $scope.isCSeries() ? "CIMC" : "UCSM";
                        break;
                    case 1:
                        stepName = "Networking";
                        break;
                    case 2:
                        stepName = "Servers";
                        break;
                    case 3:
                        stepName = "RedhatSubscription";
                        break;
                }
                return stepName;
            }

            $scope.navigateToCurrentTab = function(tabName) {

                switch (tabName) {
                    case 'Registry':
                        $scope.showCurrentViewInViewStack(0);
                        $scope.prevStep = $scope.currentTab;
                        $scope.currentTab = 0;

                        $scope.prevTabName = "Registry";
                        break;
                    case 'CIMC':
                        $scope.showCurrentViewInViewStack(1);
                        $scope.prevStep = $scope.currentTab;
                        $scope.currentTab = 1;
                        $scope.$broadcast("StepChange", {
                            'prevStep': $scope.getStepName($scope.prevStep)
                        });
                        $scope.prevTabName = "CIMC";
                        break;
                    case 'UCSM':
                        $scope.showCurrentViewInViewStack(1);
                        $scope.prevStep = $scope.currentTab;
                        $scope.currentTab = 1;
                        $scope.$broadcast("StepChange", {
                            'prevStep': $scope.getStepName($scope.prevStep)
                        });
                        $scope.prevTabName = "UCSM";
                        break;
                    case 'Networking':
                        $scope.showCurrentViewInViewStack(2);
                        $scope.prevStep = $scope.currentTab;
                        $scope.currentTab = 1;
                        $scope.$broadcast("StepChange", {
                            'prevStep': $scope.getStepName($scope.prevStep)
                        });
                        $scope.prevTabName = "Networking";
                        $scope.$broadcast("reloadgrid");
                        break;
                    case 'ServerAndTheirRoles':
                        $scope.showCurrentViewInViewStack(3);
                        $scope.prevStep = $scope.currentTab;
                        $scope.currentTab = 2;
                        $scope.$broadcast("StepChange", {
                            'prevStep': $scope.getStepName($scope.prevStep)
                        });
                        $scope.prevTabName = "Servers";
                        $scope.$broadcast("reloadgrid");
                        break;


                }
               $rootScope.$broadcast("windowResize");
            }

            $scope.showCurrentViewInViewStack = function(index) {
                if (index <= 3 && index >= 0) {
                    for (var ind in $scope.viewStackVisibilityArray) {

                        var suffix = "";
                        if (ind == 1) {
                            if ($scope.isCSeries())
                                suffix = ind + "-c";
                            else
                                suffix = ind + "-b";
                        } else {
                            suffix = ind;
                        }

                        if (ind == index) {
                            $scope.viewStackVisibilityArray[ind] = true;
                            document.getElementById("step-" + suffix).className = document.getElementById("step-" + suffix).className + " active";
                        } else {
                            $scope.viewStackVisibilityArray[ind] = false;
                            document.getElementById("step-" + suffix).classList.remove("active");
                        }
                    }
                }

            };

            $scope.goToNextView = function() {

                if ($scope.currentTab != 3) {
                    $scope.currentTab++;
                    $scope.showCurrentViewInViewStack($scope.currentTab);
                }
            };

            $scope.goToPreviousView = function() {
                if ($scope.currentTab != 0) {
                    $scope.currentTab--;
                    $scope.showCurrentViewInViewStack($scope.currentTab);
                }
            };

            $scope.validateUserInputsForCIMCCommon = function() {
                $scope.$broadcast("kickOffValidationsForCIMC");
                if ($scope.cimcObj.cimc_username == "" || $scope.cimcObj.cimc_password == "") {
                    return false
                } else
                    return true;
            };

            $scope.validateNetworkingInputs = function() {
                $scope.nextClicked = true;
                $scope.$broadcast("kickOffValidationsForNetworking");
                if ($scope.networkConfObj.domain_name == "" || $scope.networkConfObj.ntp_servers.length == 0 || $scope.networkConfObj.domain_name_servers.length == 0 || $scope.networkConfObj.http_proxy_servers.length == 0 || $scope.networkConfObj.https_proxy_servers.length == 0 || $scope.networkConfObj.networks.length == 0) {
                    return false;
                } else
                    return true;
            };

            $scope.validateServersAndRolesInput = function() {
                //$scope.nextClickedOnServersView = true;
                $scope.$broadcast("kickOffValidationsForServersAndRoles");
                if ($scope.blueprintsetupinput.ROLES == null || $scope.blueprintsetupinput.ROLES == undefined) {
                    return false;
                } else if ($scope.serversArray.length == 0) {
                    return false;
                } else {
                    return true;
                }
            };

            $scope.validateRedhatSubscription = function() {

                $scope.$broadcast("kickOffValidationsForRedhatSubscription");
                if ($scope.redhatSubscriptionObj.userName == "" || $scope.redhatSubscriptionObj.redhatPassword == "" || $scope.redhatSubscriptionObj.proxyHost == "" || $scope.redhatSubscriptionObj.subscriptionPool == "") {
                    return false;
                } else
                    return true;
            };
            
            $rootScope.$on(Events.MOVETOPARTICULARSTEP,function(event,args){
            	$scope.navigateToCurrentTab(args.step);
            });

            $scope.checkIfNotFirst = function(){
                if($scope.currentTab != 0){
                    return true;
                }else{
                    return false;
                }
            };

            $scope.checkIfNotLast = function(){
                if($scope.currentTab != 3){
                    return true;
                }else{
                    return false;
                }
            };

        }])
        .directive('registrySetup',function(){
            return {
                restrict : 'E',
                scope : {
                    registryobj : "="
                },
                templateUrl : '../static/blueprintsetup/physicalsetupwizard/registrysetup.html'
            }
        })
        .directive('cimcCommonSetup', function() {
            return {
                restrict: 'E',
                scope: {
                    cimcobj: "=",
                    iscimcvalidated: "=",
                    sharedobject: "="
                },
                templateUrl: '../static/blueprintsetup/physicalsetupwizard/cimccommon.html'
            }
        })
        .directive('networkingSetup', function() {
            return {
                restrict: 'E',
                scope: {
                    networkconf: "=",
                    nextclicked: "=",
                    platformtype: "=",
                    isnetworkingsetupvalidated: "=",
                    sharedobject: "="
                },
                templateUrl: '../static/blueprintsetup/physicalsetupwizard/networking.html'
            }
        })
        .directive('serverAndRolesSetup', function() {
            return {
                restrict: 'E',
                scope: {
                    serversobject: "=",
                    nextclickedservers: "=",
                    platformtype: "=",
                    isserversvalidated: "=",
                    sharedobject: "="
                },
                templateUrl: '../static/blueprintsetup/physicalsetupwizard/serverandroles.html'
            }
        })

    .directive('ucsmCommonSetup', function() {
        return {
            restrict: 'E',
            scope: {
                ucsmobj: "=",
                isucsmvalidated: "=",
                sharedobject: "="
            },
            templateUrl: '../static/blueprintsetup/physicalsetupwizard/ucsmcommon.html'
        }
    })

}());