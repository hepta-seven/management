/**
 * Created by Ramirez on 4/1/2017.
 */
angular.module('myApp.service')
    .factory('approvalService', ['$http', '$q', '$sce', function ($http, $q, $sce) {
        return {
            getApprovalList: function (info) {
                var deferred = $q.defer();
                $http({
                    method: 'GET',
                    url: 'http://bigbug.tech:8080/wdm-api/api/wdm/event/show_audit.api',
                    params: {
                        token: info.token,
                        staff: info.staff,
                        auditStatus: info.auditStatus,
                        page: info.page,
                        start: info.start,
                        limit: info.limit
                    }
                }).then(function successCallback(response) {
                    deferred.resolve(response);
                }, function errorCallback(response) {
                    deferred.reject(response)
                });

                return deferred.promise;
            },
            approvalAction: function (mytoken, eventId, action, content) {
                $http({
                    method: 'POST',
                    url: 'http://bigbug.tech:8080/wdm-api/api/wdm/event/audit.api',
                    params: {
                        token: mytoken,
                        eventId: eventId,
                        status: action,
                        content: content
                    }
                }).then(function successCallback(response) {
                    Messenger().post("你的操作已成功提交!");
                    console.log(response);
                }, function errorCallback(response) {
                    console.log(response)
                });
            },
            viewData: function (mytoken, id) {
                return $http({
                    method: 'POST',
                    url: 'http://bigbug.tech:8080/wdm-api/api/wdm/event/get.api',
                    params: {
                        token: mytoken,
                        id: id
                    }
                }).then(function successCallback(response) {
                    return response;
                }, function errorCallback(response) {
                    console.log(response)
                });
            }
        }
    }]);