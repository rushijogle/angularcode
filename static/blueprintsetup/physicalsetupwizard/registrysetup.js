angular.module('mercuryInstaller.blueprintSetup.physicalSetupWizard.registrySetup',["mercuryInstaller.utility","mercuryInstaller.widgets", "mercuryInstaller.globals"])
    .controller("RegistyCtrl",['$scope',function($scope){
       $scope.checkUserInputsForRegistry = function(){
            if($scope.registryobj.registryUsername != "" && $scope.registryobj.registryPassword!="" && $scope.registryobj.registryEmail!=""){
                $scope.registryobj.isRegistryValidated = true;
            }else{
                $scope.registryobj.isRegistryValidated = false;
            }
       };
    }])
