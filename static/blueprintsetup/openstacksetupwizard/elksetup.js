/**
 * Created by bonkar on 2/21/2016.
 */
(function () {
    'use strict';
    angular.module('mercuryInstaller.blueprintSetup.openstackSetupWizard.elk', ['mercuryInstaller.utility', 'mercuryInstaller.widgets'])
            .controller('ELKCtrl', ['$scope', function ($scope) {

                   // $scope.elkobj.frequency = 'Daily';
                    $scope.elkobj.size = 2.0;
                    

                    $scope.elkobj.frequency = 'weekly';
                    $scope.checkUserInputsForELK = function () {
                        if($scope.elkobj.isElkSupported){
                            if ($scope.elkobj.password != "" && $scope.elkobj.frequency != undefined && $scope.elkobj.size != "") {
                                $scope.elkobj.isELKValidated = true;
                            } else {
                                $scope.elkobj.isELKValidated = false;
                            }
                        }else{
                            $scope.elkobj.isELKValidated = false;
                        }

                    };


                    $scope.checkUserInputsForELK();
                    $scope.$on("ValidateAfterUpload",function(){
                    	$scope.checkUserInputsForELK();
                    });

                }]);
})();
