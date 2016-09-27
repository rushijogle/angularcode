/**
 * Created by bonkar on 2/21/2016.
 */
(function () {
    'use strict';
    angular.module('mercuryInstaller.blueprintSetup.openstackSetupWizard.tlsSetup', ['mercuryInstaller.utility', 'mercuryInstaller.widgets'])
            .controller('TLSCtrl', ['$scope', function ($scope) {

                    $scope.checkUserInputsForTLS = function () {
                        if ($scope.tlsobj.externallbviptls) {
                            if ($scope.tlsobj.externallbvipcert != "" && $scope.tlsobj.externallbvipcacert != "") {
                                $scope.tlsobj.isTLSValidated = true;
                            } else {
                                $scope.tlsobj.isTLSValidated = false;
                            }
                        } else {
                            $scope.tlsobj.isTLSValidated = true;
                        }
                    };
                    
                    $scope.checkUserInputsForTLS();

                    $scope.$on("ValidateAfterUpload",function(){
                        $scope.checkUserInputsForTLS();
                    });

                    $scope.checkstatus = function () {
                        if ($scope.tlsobj.externallbviptls) {
                            $scope.vipCert = false;
                            $scope.vipcaCert = false;
                            $scope.checkUserInputsForTLS();
                        } else {
                            $scope.tlsobj.externallbvipcert = '';
                            $scope.tlsobj.externallbvipcacert = '';
                            $scope.vipCert = true;
                            $scope.vipcaCert = true;
                            
                            $scope.checkUserInputsForTLS();
                        }
                    };
                }]);
})();