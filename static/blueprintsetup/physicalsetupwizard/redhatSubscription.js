'use strict';
angular.module('MercuryInstaller.BlueprintSetup.PhysicalSetupWizard.Redhat', ['mercuryInstaller.utility','mercuryInstaller.widgets'])


.controller('redhatsubController', ['$scope',function($scope) {

	$scope.checkUserInputsForRedhatSub = function(){
		if($scope.redhatsubscriptionobj.userName!="" || $scope.redhatsubscriptionobj.redhatPassword!="" || $scope.redhatsubscriptionobj.subscriptionPool!="" || $scope.redhatsubscriptionobj.proxyTool!="" ){
			$scope.redhatsubscriptionobj.isredhatSubscriptionValidated = true;
		}else
			$scope.redhatsubscriptionobj.isredhatSubscriptionValidated = false;
	}
	
	 $scope.$on('ValidateAfterUpload',function(){
			$scope.checkUserInputsForRedhatSub();
	});
}])

/*
.directive('checkRequiredRedhat',function(){
	return{
		restrict : 'A',
		require: 'ngModel',
		link: function(scope, elm, attr, ctrl) {
				
				elm.bind('blur', function () {
		            scope.$apply(dovalidation);
		         });
				scope.$on('kickOffValidationsForRedhat', dovalidation);
      
				function dovalidation() {
					
					if (elm.val()!="") {
						ctrl.$setValidity('check-required', true);
						
						
					} else {
						ctrl.$setValidity('check-required', false);
						
					}
					
				}
		}
		
	}
});*/
