(function() {
    'use strict';
    angular.module('mercuryInstaller.widgets', ['ngRoute'])
    .directive("miConfirmationPopup", function() {
        return {
            restrict: "E",
            replace: false,
            template: '' +
                '<div id="confirmModal" class="modal fade" role="dialog">' +
                '<div class="modal-dialog">' +
                '<div class="modal-content">' +
                '<div class="modal-header">' +
                '<h4 class="modal-title">Confirm</h4>' +
                '</div>' +
                '<div class="modal-body">' +
                '<p>{{popuptext}}</p>' +
                '</div>' +
                '<div class="modal-footer">' +
                '<button type="button" class="btn btn-primary" ng-click="onproceed()">Proceed</button>' +
                '<button type="button" class="btn btn-primary" ng-click="cancel()">Cancel</button>' +
                '</div>' +
                '</div>' +

                '</div>' +
                '</div>',
            scope: {
                popuptext: "=",
                onproceed: "&",
                showpopup: "=",
                cancelfunction: "&"
            },
            link : function(scope, elem, attr){
                var currentElem = $(elem);
                 scope.$watch('showpopup', function() {
                	 currentElem.find("#confirmModal").modal({
                     	backdrop : 'static',
                     	show:false
                     });
                    if (scope.showpopup) {
                        currentElem.find("#confirmModal").modal("show");
                        
                    }
                    else {
                        currentElem.find("#confirmModal").modal('hide');
                    }

                });
            },
            controller: ['$scope', function($scope) {
            	$scope.defaultCancel = function(){
            		$scope.showpopup = false;
            	};
            	
                $scope.cancel = $scope.cancelfunction ? $scope.cancelfunction : $scope.defaultCancel;

              
            }]
        }
    })

	.directive('miWarningPopup', function() {
	    return {
	        restrict: "E",
	        replace: true,
	        template: '' +
	            '<div id="warningmodal" class="modal fade" role="dialog">' +
	            '<div class="modal-dialog">' +
	            '<div class="modal-content">' +
	            '<div class="modal-header">' +
	            '<h4 class="modal-title">Warning</h4>' +
	            '</div>' +
	            '<div class="modal-body">' +
	            '<p>{{popuptext}}</p>' +
	            '</div>' +
	            '<div class="modal-footer">' +
	            '<button type="button" class="btn btn-default" data-dismiss="modal" ng-click = "hidePopup()">OK</button>' +
	
	            '</div>' +
	            '</div>' +
	
	            '</div>' +
	            '</div>',
	        scope: {
	            popuptext: "=",
	            iswarningvisible: "="
	        },
	        link : function(){
	        	 $("#warningmodal").modal({
	        		 backdrop : 'static',
	        		 show : false
	        	 });
	        },
	        controller: ['$scope', function($scope) {
	            $scope.hidePopup = function() {
	                $scope.iswarningvisible = false;
	            };
	
	            $scope.$watch('iswarningvisible', function() {
	                if ($scope.iswarningvisible) {
	                    $("#warningmodal").modal("show");
	                }
	                else if (!$scope.iswarningvisible) {
	                    $("#warningmodal").modal("hide");
	                }
	            });
	        }]
	
	
	    }
	})
	
	 .directive('helpText', ['helpTextService', function(helpTextService) {
        return {
            restrict: 'EA',
            replace: true,
            scope: {
                textKey: "@"
            },
            template: '<a href="javascript:void(0);" class="pull-right popoverchangeColor" tabindex="-1" data-trigger="focus" data-html="true" data-toggle="popover" data-placement="bottom" data-content="{{helptextmessageSet}}">' +
                '<span class="glyphicon glyphicon-question-sign pull-right"></span>' +
                '</a>',
            link: function(scope, el, attrs) {

                scope.helptextmessage = attrs.textKey;
                scope.helptextmessageSet = (helpTextService[scope.helptextmessage]);
                 $('[data-toggle="popover"]').popover(); 
            }
        }
    }])



    .directive('messageBox', [function() {
        return {
            restrict: 'E',
            replace: true,
            template: '<div ng-show="isVisible">' +
                '  <div class="alert alert-{{typeforlabel}} globalPositionMessageBox" > ' +
                '    <a href="javascript:void(0)" class="close" ng-click="closeMessage()">&times;</a> ' +
                '      {{ textforlabel }} ' +
                '         </div> </div>',
            link: function(scope, elem, attr) {
                scope.closeTimer = null;
                scope.closeMessage = function() {
                    if (scope.closeTimer) {
                        clearTimeout(scope.closeTimer);
                    }
                    scope.isVisible = false;
                }

                scope.isVisible = false;
                scope.$on("ShowErrorMessage", function(event, args) {
                    if (scope.closeTimer) {
                        clearTimeout(scope.closeTimer);
                    }
                    var timeoutValue = 3000;
                    switch (args.type) {
                        case "success":
                            timeoutValue = 3000;
                            break;
                        case "danger":
                            timeoutValue = 5000;
                            break;
                        default:
                            timeoutValue = 3000;
                            break;
                    }
                    if (!args.disableAutoClose) {
                        scope.closeTimer = setTimeout(function() {
                            scope.isVisible = false;
                            scope.$apply();
                        }, timeoutValue);
                    }
                    scope.typeforlabel = args.type;
                    scope.isVisible = true;
                    scope.textforlabel = args.msg;

                });
            }

        };
    }])
    
    .directive('loading', function() {
            var controller = ['$scope', '$rootScope', function($scope, $rootScope) {
                $scope.workingCount = 0;
                $scope.isLoaderVisible = false;
                $scope.loadingDelay = 0; // time in miliseconds after which the loader should be displayed
                $scope.loadingDelayTimer = null;
                $("#fountainTextG").hide();
                        $scope.$on('$routeChangeStart', function (next, current) {
                            $rootScope.$broadcast('rolling', {
                    status: 'end'
                });
                        });
                $rootScope.$on("rolling", function(event, args) {


                    if (args && args.status === 'start') {
                        $scope.workingCount++;

                    }
                    else if (args && args.status === 'end') {
                        if ($scope.workingCount > 0) {
                            $scope.workingCount--;
                        }
                    }
                    if ($scope.workingCount > 0 && $scope.isLoaderVisible === false) {
                        if ($scope.loadingDelayTimer) {
                            clearTimeout($scope.loadingDelayTimer);
                        }
                        $scope.loadingDelayTimer = setTimeout(function() {
                            $scope.showLoader();
                        }, $scope.loadingDelay);
                    }
                    else if ($scope.workingCount == 0) {
                        if ($scope.loadingDelayTimer) {
                            clearTimeout($scope.loadingDelayTimer);
                        }
                        $scope.hideLoader();
                    }
                });

                $scope.showLoader = function() {
                    $("#fountainTextG").show();
                    $scope.isLoaderVisible = true;
                };

                $scope.hideLoader = function() {
                    $("#fountainTextG").hide();
                    $scope.isLoaderVisible = false;
                };

            }];
            return {
                restrict: 'E',
                replace: true,
                template: "<div id='fountainTextG'><div class='uil-default-css' style='transform:scale(0.41);'><div style='top:80px;left:93px;width:14px;height:40px;background:#00b2ff;-webkit-transform:rotate(0deg) translate(0,-60px);transform:rotate(0deg) translate(0,-60px);border-radius:10px;position:absolute;'></div><div style='top:80px;left:93px;width:14px;height:40px;background:#00b2ff;-webkit-transform:rotate(30deg) translate(0,-60px);transform:rotate(30deg) translate(0,-60px);border-radius:10px;position:absolute;'></div><div style='top:80px;left:93px;width:14px;height:40px;background:#00b2ff;-webkit-transform:rotate(60deg) translate(0,-60px);transform:rotate(60deg) translate(0,-60px);border-radius:10px;position:absolute;'></div><div style='top:80px;left:93px;width:14px;height:40px;background:#00b2ff;-webkit-transform:rotate(90deg) translate(0,-60px);transform:rotate(90deg) translate(0,-60px);border-radius:10px;position:absolute;'></div><div style='top:80px;left:93px;width:14px;height:40px;background:#00b2ff;-webkit-transform:rotate(120deg) translate(0,-60px);transform:rotate(120deg) translate(0,-60px);border-radius:10px;position:absolute;'></div><div style='top:80px;left:93px;width:14px;height:40px;background:#00b2ff;-webkit-transform:rotate(150deg) translate(0,-60px);transform:rotate(150deg) translate(0,-60px);border-radius:10px;position:absolute;'></div><div style='top:80px;left:93px;width:14px;height:40px;background:#00b2ff;-webkit-transform:rotate(180deg) translate(0,-60px);transform:rotate(180deg) translate(0,-60px);border-radius:10px;position:absolute;'></div><div style='top:80px;left:93px;width:14px;height:40px;background:#00b2ff;-webkit-transform:rotate(210deg) translate(0,-60px);transform:rotate(210deg) translate(0,-60px);border-radius:10px;position:absolute;'></div><div style='top:80px;left:93px;width:14px;height:40px;background:#00b2ff;-webkit-transform:rotate(240deg) translate(0,-60px);transform:rotate(240deg) translate(0,-60px);border-radius:10px;position:absolute;'></div><div style='top:80px;left:93px;width:14px;height:40px;background:#00b2ff;-webkit-transform:rotate(270deg) translate(0,-60px);transform:rotate(270deg) translate(0,-60px);border-radius:10px;position:absolute;'></div><div style='top:80px;left:93px;width:14px;height:40px;background:#00b2ff;-webkit-transform:rotate(300deg) translate(0,-60px);transform:rotate(300deg) translate(0,-60px);border-radius:10px;position:absolute;'></div><div style='top:80px;left:93px;width:14px;height:40px;background:#00b2ff;-webkit-transform:rotate(330deg) translate(0,-60px);transform:rotate(330deg) translate(0,-60px);border-radius:10px;position:absolute;'></div></div></div>",
                controller: controller
               
            }
        })
}());