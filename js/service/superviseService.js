/**
 * Created by Ramirez on 4/1/2017.
 */
angular.module('myApp.service')
    .factory('superviseService', ['$http', '$q', '$sce', function ($http, $q, $sce) {
        return {
            getSuperviseList: function (info) {
                return $http({
                    method: 'GET',
                    url: 'http://bigbug.tech:8080/wdm-api/api/wdm/event/show_supervise.api',
                    params: {
                        token: info.token,
                        staff: info.staff,
                        superviseStatus: info.superviseStatus,
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
            },
            viewDetails: function (mytoken, id) {
                return $http({
                    method: 'POST',
                    url: 'http://bigbug.tech:8080/wdm-api/api/wdm/event/get.api',
                    params: {
                        token: mytoken,
                        id: id
                    }
                }).then(function successCallback(response) {
                    return response
                    // console.log(response);
                }, function errorCallback(response) {
                    console.log(response)
                });
            },
            supervisereport: function (info) {
                return $http({
                    method: 'POST',
                    url: 'http://bigbug.tech:8080/wdm-api/api/wdm/event_supervise_report/add.api',
                    params: {
                        token: info.token,
                        eventId: info.eventId,
                        title: info.title,
                        content: info.content
                    }
                }).then(function successCallback(response) {
                    return response
                    // console.log(response);
                }, function errorCallback(response) {
                    console.log(response)
                });
            },
            getPrincipleBreaking: function (mytoken, id) {
                return $http({
                    method: 'POST',
                    url: 'http://bigbug.tech:8080/wdm-api/api/wdm/event_supervise_principle_breaking/get_by_event.api',
                    params: {
                        token: mytoken,
                        eventId: id
                    }
                }).then(function successCallback(response) {
                    return response
                    // console.log(response);
                }, function errorCallback(response) {
                    console.log(response)
                });
            },
            addPrincipleBreaking: function (info) {
                return $http({
                    method: 'POST',
                    url: 'http://bigbug.tech:8080/wdm-api/api/wdm/event_supervise_principle_breaking/add.api',
                    params: {
                        token: info.token,
                        eventId: info.eventId,
                        isCashGiftOutOfLimits: info.isCashGiftOutOfLimits,
                        isUsePublicCar: info.isUsePublicCar,
                        isUsePublicGoods: info.isUsePublicGoods,
                        isUsePublicAsserts: info.isUsePublicAsserts,
                        isUsePublicMoney: info.isUsePublicMoney,
                        attachmentFileCode: info.attachmentFileCode,
                        otherQuestion: info.otherQuestion,
                        content: info.content
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