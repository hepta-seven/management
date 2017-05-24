/**
 * Created by Ramirez on 4/1/2017.
 */
angular.module('myApp.service')
    .factory('declareService', ['$http', '$q', '$sce', function ($http, $q, $sce) {
        return {
            declare: function (mytoken, userInfo) {
                var user = userInfo;
                return $http({
                    method: 'POST',
                    url: 'http://bigbug.tech:8080/wdm-api/api/wdm/event/add.api',
                    params: {
                        token: mytoken,
                        staff: user.staff,
                        staffRelationship: user.staffRelationship,
                        staffPoliticalStatus: user.staffPoliticalStatus,
                        staffJob: user.staffJob,
                        staffSpouse: user.staffSpouse,
                        staffPhone: user.staffPhone,
                        eventType: user.eventType,
                        eventCount: user.eventCount,
                        eventDate: user.eventDate,
                        location: user.location,
                        tableCount: user.tableCount,
                        peopleCount: user.peopleCount,
                        peopleRange: user.peopleRange,
                        carCount: user.carCount,
                        carSource: user.carSource,
                        attachmentFileCode: user.attachmentFileCode.code,
                        selfPromise: user.selfPromise,
                        promisePeople: user.promisePeople,
                        staffOrgId: user.staffOrgId
                    }
                }).then(function successCallback(response) {
                    return response
                    // console.log(response);
                }, function errorCallback(response) {
                    console.log(response)
                });
            },
            getOrgList: function (token) {
                return $http({
                    method: 'POST',
                    url: 'http://bigbug.tech:8080/wdm-api/api/org/show.api',
                    params: {
                        token: token
                    }
                }).then(function successCallback(response) {
                    return response
                    // console.log(response);
                }, function errorCallback(response) {
                    console.log(response)
                });
            },
        }
    }]);