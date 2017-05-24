/**
 * Created by Ramirez on 3/28/2017.
 */
angular.module('myApp.ctrl')
    .controller('declareCtrl', ['$state', '$scope', 'Upload', '$timeout', 'declareService', function ($state, $scope, Upload, $timeout, declareService) {
        var loginfo = JSON.parse(sessionStorage.getItem('logInfo'));
        $scope.declareInfo = {
            staff: '',
            staffRelationship: '1',
            staffPoliticalStatus: '',
            staffJob: '1',
            staffSpouse: '',
            staffPhone: '',
            eventType: '1',
            eventCount: 1,
            eventDate: new Date(),
            location: '',
            tableCount: 50,
            peopleCount: 50,
            peopleRange: '',
            carCount: 10,
            carSource: '',
            attachmentFileCode: '',
            selfPromise: '',
            promisePeople: '',
            staffOrgId: ''
        };

        $scope.postDeclare = function () {
            // console.log($scope.declareInfo);
            declareService.declare(loginfo.token, $scope.declareInfo).then(function (res) {
                if (res.data.error && res.data.error.code == 4999) {
                    swal({
                            title: "登录授权已过期,请点击确认重新登录",
                            type: "warning",
                            showCancelButton: false,
                            confirmButtonColor: "#DD6B55",
                            confirmButtonText: "确认",
                            cancelButtonText: "取消",
                            closeOnConfirm: false,
                            closeOnCancel: false
                        },
                        function (isConfirm) {
                            if (isConfirm) {
                                $state.go('login');
                            }
                        });
                } else {
                    swal({
                        title: "你的申报已成功提交!",
                        timer: 2000,
                        showConfirmButton: true
                    });
                    console.log(res);
                }
            }, function (res) {
                console.log('获取失败');
            });
        };
        $scope.getOrgListInfo = function () {
            declareService.getOrgList(loginfo.token).then(function (res) {
                if (res.data.error && res.data.error.code == 4999) {
                    swal({
                            title: "登录授权已过期,请点击确认重新登录",
                            type: "warning",
                            showCancelButton: false,
                            confirmButtonColor: "#DD6B55",
                            confirmButtonText: "确认",
                            cancelButtonText: "取消",
                            closeOnConfirm: false,
                            closeOnCancel: false
                        },
                        function (isConfirm) {
                            if (isConfirm) {
                                $state.go('login');
                            }
                        });
                } else {
                    // console.log(res);
                    var orgList = res.data.result;
                    for (var i = 0; i < orgList.children.length; i++) {
                        orgList.children[i].name = '--' + orgList.children[i].name;
                    }
                    var tempObj = {
                        id: orgList.id,
                        name: orgList.name
                    };
                    orgList.children.unshift(tempObj);
                    $scope.orgList = orgList;
                    $scope.declareInfo.staffOrgId = orgList.children[0].id;
                    // console.log(orgList);

                }
            }, function (res) {
                console.log('获取失败');
            });
        };
        $scope.getOrgListInfo();
        $scope.uploadFiles = function (file) {
            console.log(file);
            if (!file) {
                $scope.postDeclare();
            } else {
                file.upload = Upload.upload({
                    url: 'http://bigbug.tech:8080/wdm-api/api/upload.api',
                    data: {file: file}
                });
                file.upload.then(function (response) {
                    $timeout(function () {
                        console.log(response);
                        file.result = response.data;
                        $scope.declareInfo.attachmentFileCode = response.data.result.code;
                        $scope.postDeclare();
                    });
                }, function (response) {
                    if (response.status > 0)
                        $scope.errorMsg = response.status + ': ' + response.data;
                }, function (evt) {
                    // Math.min is to fix IE which reports 200% sometimes
                    file.progress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
                });
            }
        }
    }]);