/**
 * Created by 陈腾飞 on 2017/4/5.
 */
angular.module('myApp.service')
    .factory('statisticsService', ['$http', '$q', '$sce', function ($http, $q, $sce) {
        return {
            statistics: function (info) {
                var deferred = $q.defer();
                $http({
                    method: 'POST',
                    url: 'http://bigbug.tech:8080/wdm-api/api/wdm/event/org_event_type_count',
                    params: {
                        token: info.token,
                        eventCreateTimeFrom: info.eventCreateTimeFrom,
                        eventCreateTimeTo: info.eventCreateTimeTo,
                        eventTimeFrom: info.eventTimeFrom,
                        eventTimeTo: info.eventTimeTo
                    }
                }).then(function successCallback(response) {
                    deferred.resolve(response);
                    // console.log(response);
                }, function errorCallback(response) {
                    deferred.reject(response)
                });
                return deferred.promise;
            }

        }
    }]);
