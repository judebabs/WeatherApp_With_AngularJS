var app = angular.module('weatherApp', ['ngRoute']);

app.config(['$routeProvider', function ($routeProvider) {

    $routeProvider.when('/', {
            controller: 'mainController',
            templateUrl: '/views/partials/Default.html'
        }),
        $routeProvider.when('#contact', {
            controller: 'mainController',
            templateUrl: '/views/partials/customers.html',
            message: "This is the Result Page"
})
    .otherwise({ redirectTo: '/' });

}]);

//Controller
angular.module('weatherApp')
    .controller('mainController', ['$scope', 'dataFactory',
        function ($scope, dataFactory) {

            $scope.status;
            $scope.results;
            $scope.orders;

            getCustomers();

            function getAllCities() {
                dataFactory.getCities()
                    .success(function (dataresponse) {
                        $scope.cities = dataresponse;
                        
                    })
                    .error(function (error) {
                        $scope.status = 'Unable to retrieve the list of the cities ' + error.message;
                    });
            }

            //Get Weather for a city
            $scope.getWatherForCity = function (id) {
                dataFactory.getWeatherForCity(id)
                .success(function (forecast) {
                    $scope.status = 'The weather for this city ' + id;
                    $scope.weather = forecast;
                })
                .error(function (error) {
                    $scope.status = 'Error retrieving the weather for the selected city ' + error.message;
                });
            };
        }]);


// Factoriy
angular.module('weatherApp')
    .factory('dataFactory', ['$http', function ($http) {

        var urlBase = '/api/customers';
        var dataFactory = {};

        //Use the web api to get all city to for auto complete
        
        dataFactory.getCities = function () {
            return $http.get(urlBase);
        };

        //use web api to get the weather for that particular city
        dataFactory.getWeatherForCity = function (id) {
            return $http.get(urlBase + '/' + id);
        };

        //dataFactory.insertCustomer = function (cust) {
        //    return $http.post(urlBase, cust);
        //};

        //dataFactory.updateCustomer = function (cust) {
        //    return $http.put(urlBase + '/' + cust.ID, cust)
        //};

        //dataFactory.deleteCustomer = function (id) {
        //    return $http.delete(urlBase + '/' + id);
        //};

        //dataFactory.getOrders = function (id) {
        //    return $http.get(urlBase + '/' + id + '/orders');
        //};

        return dataFactory;
    }]);