// alert("Help me");

var finalapp = angular.module('myApp', []);
    finalapp.controller('myController', ['$scope', '$http',
        function($scope, $http) {
            $http.get('/students')
            .success(function(data, status, headers, config) {
                $scope.student = data;
                $scope.singleStudent = {}
                $scope.error = "";
            }).
            error(function(data, status, headers, config) {
                $scope.student = {};
                $scope.error = data;
            });

            $scope.Details = function(username){
            
            console.log("I was passed " + username);

            $http.get('/student/byID?username=' + username)
            .success(function(data, status, headers, config) {
                $scope.singleStudent = data;
                $scope.error = "";
                $scope.detailinput = false;                
            }).
            error(function(data, status, headers, config) {
                $scope.singleStudent = {};
                $scope.error = data;
            });


            };

            $scope.ShowDetailsForm = function(){            
                $scope.detailInput = true;
            };


            $scope.AddDetailItem = function(username){            
                console.log("I will add a detail item to " + username);
                console.log("Item Type: " + $scope.detailItemType);
                console.log("Item Name: " + $scope.detailItemName);
                console.log("Item Description: " + $scope.detailItemDescription);

            $http.get('/student/additem?username=' + username + "&itemtype=" + $scope.detailItemType + "&itemname=" + $scope.detailItemName + "&itemdescription=" + $scope.detailItemDescription)
            .success(function(data, status, headers, config) {
                $scope.singleStudent = data;
                $scope.error = "";
                $scope.detailInput = false;
                $scope.detailItemType = "";
                $scope.detailItemName = "";
                $scope.detailItemDescription = "";

            }).
            error(function(data, status, headers, config) {
                $scope.singleStudent = {};
                $scope.error = data;
            });


            }; // end add details function


            $scope.RemoveDetailItem = function(username, index){            
                console.log("I will remove a detail item from " + username);
                console.log("Item Type: " + $scope.detailItemType);
                console.log("Item Name: " + $scope.detailItemName);
                console.log("Item Description: " + $scope.detailItemDescription);

            $http.get('/student/removeItem?username=' + username + "&itemindex=" + index)
            .success(function(data, status, headers, config) {
                $scope.singleStudent = data;
                $scope.error = "";

            }).
            error(function(data, status, headers, config) {
                $scope.singleStudent = {};
                $scope.error = data;
            });


            }; // end add details function

        }
]);
    finalapp.controller('userController', ['$scope', '$http',
        function($scope, $http) {
            $http.get('/user/profile')
            .success(function(data, status, headers, config) {
                $scope.user = data;
                $scope.error = "";
            }).
            error(function(data, status, headers, config) {
                $scope.user = {};
                $scope.error = data;
            });            
        }
]);

