/**
 * Created by Ramirez on 4/1/2017.
 */
angular.module('myApp.service')
    .factory('groupqueryService', ['$http', '$q', '$sce', function ($http, $q, $sce) {
        return {
            groupquery: function (info, time) {
                return $http({
                    method: 'GET',
                    url: 'http://bigbug.tech:8080/wdm-api/api/wdm/event/search.api',
                    params: {
                        token: info.token,
                        eventType: info.eventType,
                        peopleCountMin: info.peopleCountMin,
                        peopleCountMax: info.peopleCountMax,
                        eventCreateTimeFrom: time.eventCreateTimeFrom,
                        eventCreateTimeTo: time.eventCreateTimeTo,
                        eventTimeFrom: time.eventTimeFrom,
                        eventTimeTo: time.eventTimeTo,
                        page: info.page,
                        start: info.start,
                        limit: info.limit
                    }
                }).then(function successCallback(response) {
                    return response
                    // console.log(response);
                }, function errorCallback(response) {
                    console.log(response)
                });
            }
        }
    }]);