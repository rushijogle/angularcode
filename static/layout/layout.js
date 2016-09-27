(function () {
    'use strict';
    angular.module('mercuryInstaller.layout', ['mercuryInstaller.utility', 'mercuryInstaller.globals', 'mercuryInstaller.authentication'])
            .directive('miLeftSideNavbar', function () {
                var controller = ['$scope', '$rootScope', '$location', 'DeploymentMonitoringService', 'User', 'Events',
                    function ($scope, $rootScope, $location, DeploymentMonitoringService, User, Events) {
                        $scope.isUserAuthenticated = User.isAuthenticated;
                        angular.forEach([Events.LOGINSUCCESS, Events.LOGOUTSUCCESS], function (value) {
                            $rootScope.$on(value, function (event, args) {
                                $scope.isUserAuthenticated = User.isAuthenticated;
                            });
                        });
                        $scope.currentPath = "";

                        $scope.updateCurrentPath = function () {
                            switch ($location.path()) {
                                case '/dashboard':
                                    $scope.currentPath = "dashboard";
                                    break;
                                case '/blueprintmgmt':
                                    $scope.currentPath = "blueprintmgmt";
                                    break;
                                case '/blueprintsetup':
                                    $scope.currentPath = "blueprintsetup";
                                    break;
                                case '/topology':
                                    $scope.currentPath = "topology";
                                    break;
                                case '/logs':
                                    $scope.currentPath = "logs";
                                    break;
                                case '/runcloudpulse':
                                    $scope.currentPath = "runcloudpulse";
                                    break;
                                case '/runvmtp':
                                    $scope.currentPath = "runvmtp";
                                    break;
                                case '/podanagement':
                                    $scope.currentPath = "podanagement";
                                    break;
                                case '/systemupdate':
                                    $scope.currentPath = "systemupdate";
                                    break;
                                default:
                                    $scope.currentPath = "";
                                    break;
                            }
                        };
                        $rootScope.$on("$routeChangeStart", function (args) {
                            $scope.updateCurrentPath();

                        });

                        $scope.updateCurrentPath();

                        $scope.Defaultclass = 'linkDisable';
                        $scope.VMTPclass = 'linkDisable';
                        $scope.Cpulseclass = 'linkDisable';

                        $scope.$on("EventInactive", function () {
                            $scope.Defaultclass = 'linkDisable';
                            $scope.VMTPclass = 'linkDisable';
                            $scope.Cpulseclass = 'linkDisable';

                        });


                        $scope.checkForStatusAndManipulateTheNavBar = function () {

                            var deployedBlueprint = DeploymentMonitoringService.getDeployedBlueprint().setupData;

                            if (deployedBlueprint != "" && deployedBlueprint != null && deployedBlueprint != undefined &&
                                    DeploymentMonitoringService.getDeploymentCurrentStatus() == "ACTIVE") {
                                $scope.Defaultclass = 'linkEnable';
                                if (JSON.parse(deployedBlueprint.jsondata).OPTIONAL_SERVICE_LIST && JSON.parse(deployedBlueprint.jsondata).OPTIONAL_SERVICE_LIST.indexOf('cloudpulse') != -1) {
                                    $scope.Cpulseclass = 'linkEnable';
                                } else {
                                    $scope.Cpulseclass = 'linkDisable';
                                }

                                if (JSON.parse(deployedBlueprint.jsondata).VMTP_VALIDATION) {
                                    $scope.VMTPclass = 'linkEnable';
                                } else {
                                    $scope.VMTPclass = 'linkDisable';
                                }
                            }
                            else {
                                $scope.Defaultclass = 'linkDisable';
                                $scope.Cpulseclass = 'linkDisable';
                                $scope.Cpulseclass = 'linkDisable';
                            }
                        };
                        //$scope.checkForStausAndManipulateTheNavBar();
                        $scope.$on('SetupDataChanged', function () {
                            $scope.checkForStatusAndManipulateTheNavBar();


                        });
                    }];
                return {
                    restrict: 'E',
                    scope: {},
                    controller: controller,
                    templateUrl: '../static/layout/navbar.html'
                }

            })
            .directive('miHeader', function () {
                return {
                    restrict: 'E',
                    scope: {
                    },
                    templateUrl: '../static/layout/header.html'
                }
            })
            .directive('miTopLinkbar', function () {
                return {
                    restrict: 'E',
                    scope: {
                    },
                    templateUrl: '../static/layout/linkbar.html',
                    controller: ['$translate', '$scope', '$rootScope', 'DeploymentMonitoringService', 'Events', 'User', 'AuthenticationService',
                        function ($translate, $scope, $rootScope, DeploymentMonitoringService, Events, User, AuthenticationService) {

                            $scope.isUserAuthenticated = User.isAuthenticated;
                            $scope.isNotificationVisible = true;
                            $scope.setFlag = 0;
                            $scope.NotificationBlueprintName = "Currently no Deployment Available";
                            $scope.NotificationValidationName = "Not Available";
                            $scope.NotificationBaremetalName = "Not Available";
                            $scope.NotificationHostSetupName = "Not Available";
                            $scope.NotificationCephName = "Not Available";
                            $scope.NotificationOrchestrationName = "Not Available";
                            $scope.NotificationVMTPName = "Not Available";
                            $scope.NotificationCurrentStatusName = "Not Available";

                            angular.forEach([Events.LOGINSUCCESS, Events.LOGOUTSUCCESS], function (value) {
                                $rootScope.$on(value, function (event, args) {
                                    $scope.isUserAuthenticated = User.isAuthenticated;
                                });
                            });
                            var checkcurrentstatus;
                            $scope.$on('deploymentStatusChanged', function () {
                                $scope.NotificationBlueprintName = DeploymentMonitoringService.getDeployedBlueprint().name
                                if (DeploymentMonitoringService.getDeploymentStatusDetails() != null) {
                                    if (DeploymentMonitoringService.getDeploymentStatusDetails().currentstatus != checkcurrentstatus) {
                                        $scope.isNotificationVisible = false;
                                        checkcurrentstatus = DeploymentMonitoringService.getDeploymentStatusDetails().currentstatus;
                                        // $scope.NotificationBlueprintName = DeploymentMonitoringService.getDeployedBlueprint().name;

                                        $scope.NotificationValidationName = DeploymentMonitoringService.getDeploymentStatusDetails().validation;
                                        $scope.NotificationBaremetalName = DeploymentMonitoringService.getDeploymentStatusDetails().baremetal;
                                        $scope.NotificationHostSetupName = DeploymentMonitoringService.getDeploymentStatusDetails().hostsetup;
                                        $scope.NotificationCephName = DeploymentMonitoringService.getDeploymentStatusDetails().baremetal;
                                        $scope.NotificationOrchestrationName = DeploymentMonitoringService.getDeploymentStatusDetails().orchestration;
                                        $scope.NotificationVMTPName = DeploymentMonitoringService.getDeploymentStatusDetails().vmtp;
                                        $scope.NotificationCurrentStatusName = DeploymentMonitoringService.getDeploymentStatusDetails().currentstatus;
                                    }
                                }
                                else if (DeploymentMonitoringService.getDeploymentStatusDetails() == null) {
                                    $scope.setFlag++;
                                    if ($scope.setFlag >= 0) {
                                        $scope.isNotificationVisible = true;
                                        $scope.NotificationBlueprintName = "Currently no Deployment Available";
                                        $scope.NotificationValidationName = "Not Available";
                                        $scope.NotificationBaremetalName = "Not Available";
                                        $scope.NotificationHostSetupName = "Not Available";
                                        $scope.NotificationCephName = "Not Available";
                                        $scope.NotificationOrchestrationName = "Not Available";
                                        $scope.NotificationVMTPName = "Not Available";
                                        $scope.NotificationCurrentStatusName = "Not Available";
                                    }
                                    $scope.isNotificationVisible = true;
                                }
                            });

                            $scope.Notification = function () {
                                $scope.isNotificationVisible = true;
                            };

                            $scope.changeLanguage = function () {
                                $scope.changeLanguage = function (langKey) {
                                    $translate.use(langKey);
                                };
                            };

                            $scope.logout = function () {
                                AuthenticationService.logout();
                            };
                        }]
                }

            })



}());    