var app = angular.module('EECommerceS', []);

app.factory('apiService', function($http, $q) {
    return{
        finn:{
            getAmountGroupedData: function(category){

                var deferred = $q.defer();
                $http({
                    method: 'POST',
                    url: '/groupedData/finn/'+category
                }).success(function (response) {
                    deferred.resolve(response);
                }).error(function (response) {
                    deferred.reject(response);
                });

                return deferred.promise;

            },
            getCategories: function(){

                var deferred = $q.defer();
                $http({
                    method: 'GET',
                    url: '/categories/finn',
                }).success(function (response) {
                    deferred.resolve(response);
                }).error(function (response) {
                    deferred.reject(response);
                });

                return deferred.promise;

            }
        },
        makeChart(labels, dataSet, category){
            var ctx = document.getElementById(category).getContext('2d');
            var myChart = new Chart(ctx, {
                type: 'line',
                data: {
                    labels:labels,
                    datasets: [{
                        label: category,
                        data: dataSet,
                        borderWidth: 1
                    }]
                },
                options: {
                    scales: {
                        yAxes: [{
                            ticks: {
                                beginAtZero:true
                            }
                        }]
                    }
                }
            });
        }

    }

});

app.controller('chartController', function($scope, apiService) {

    apiService.finn.getCategories()
        .then(function (data) {
            $scope.categories = data.categories;
            data.categories.forEach((category) => {
                return apiService.finn.getAmountGroupedData(category)
                .then(function(data){
                    var labels = [];
                    var dataSet = [];
                    data.eccs.forEach((table) => {
                        labels.push(table.timeStamp.substring(0, table.timeStamp.indexOf('T')));
                        dataSet.push(table.amount);
                    })
                    apiService.makeChart(labels, dataSet, data.eccs[0].category);
                }, function(error){
                    console.log(error)
                });
            });
        }, function (error) {
            // promise rejected ... display generic no data found on table
            console.log('error', error);
        });

});

app.controller('mainController', function($scope, $http, apiService) {

    // var ctx = document.getElementById("myChart").getContext('2d');
    // var myChart = new Chart(ctx, {
    //     type: 'line',
    //     data: {
    //         labels: ["02/07/17", "03/07/17"],
    //         datasets: [{
    //             label: 'Dyr og utstyr',
    //             data: [21284, 21362],
    //             borderWidth: 1
    //         }]
    //     },
    //     options: {
    //         scales: {
    //             yAxes: [{
    //                 ticks: {
    //                     beginAtZero:true
    //                 }
    //             }]
    //         }
    //     }
    // });



});