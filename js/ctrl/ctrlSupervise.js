/**
 * Created by Ramirez on 3/28/2017.
 */
angular.module('myApp.ctrl')
    .controller('superviseCtrl', ['$state', '$scope', 'superviseService', '$filter', 'Upload', '$timeout', function ($state, $scope, superviseService, $filter, Upload, $timeout) {
        var loginfo = JSON.parse(sessionStorage.getItem('logInfo'));
        $scope.params = {
            token: loginfo.token,
            staff: '',
            superviseStatus: '-1',
            page: 1,
            start: 0,
            limit: 10
        };
        $scope.showItemNum = 1;
        $scope.totalItemNum = 0;
        $scope.totalPageNum = 0;
        $scope.searchStaff = '';
        $scope.showSuperviseList = function () {
            superviseService.getSuperviseList($scope.params).then(function (res) {
                // console.log(res);
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
                    $scope.superviseList = res.data.result;
                    $scope.showStatus = $scope.params.superviseStatus;
                    $scope.totalItemNum = res.data.total;
                    $scope.totalPageNum = Math.ceil($scope.totalItemNum / $scope.params.limit);
                }
            }, function (res) {
                console.log('获取失败');
            });
        };
        $scope.showSuperviseList();

        $scope.searchSupervise = function () {
            $scope.params.staff = $scope.searchStaff;
            $scope.params.page = 1;
            $scope.showItemNum = $scope.params.page;
            if ($scope.params.page == 1) {
                $scope.params.start = 0
            } else {
                $scope.params.start = ( $scope.params.page - 1 ) * $scope.params.limit;
            }
            $scope.showSuperviseList();
        };
        $scope.viewData = function (id) {
            $('#viewdetail').modal('toggle');
            superviseService.viewDetails(loginfo.token, id).then(function (res) {
                console.log(res);
                if (res.data.error && res.data.error.code == 4999) {
                    var comfirmAction = confirm('登录授权已过期,请点击确认重新登录');
                    if (comfirmAction) {
                        $state.go('login');
                    }
                } else {
                    $scope.viewDataDetails = res.data.result;
                }
            }, function (res) {
                console.log('获取失败');
            });
        };

        $scope.reportInfo = {
            token: loginfo.token,
            eventId: '',
            title: '',
            content: ''
        };
        $scope.disciplinaryInfo = {
            token: loginfo.token,
            eventId: '',
            isCashGiftOutOfLimits: '0',
            isUsePublicCar: '0',
            isUsePublicGoods: '0',
            isUsePublicAsserts: '0',
            isUsePublicMoney: '0',
            attachmentFileCode: '',
            otherQuestion: '',
            content: '',
            attachmentPath: ''
        };
        $scope.saveRePortId = function (eventid) {
            console.log(eventid);
            $('#supervisereport').modal('toggle');
            $scope.reportInfo.eventId = eventid;
        };
        $scope.getDisciplinaryInfo = function (eventid) {
            console.log(eventid);
            $('#isciplinary').modal('toggle');
            $scope.disciplinaryInfo = {
                token: loginfo.token,
                eventId: '',
                isCashGiftOutOfLimits: '0',
                isUsePublicCar: '0',
                isUsePublicGoods: '0',
                isUsePublicAsserts: '0',
                isUsePublicMoney: '0',
                attachmentFileCode: '',
                otherQuestion: '',
                content: '',
                attachmentPath: ''
            };
            $scope.disciplinaryInfo.eventId = eventid;
            superviseService.getPrincipleBreaking(loginfo.token, eventid).then(function (res) {
                console.log(res);
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
                    console.log(res.data);
                    if (res.data.result) {
                        $scope.disciplinaryInfo.isCashGiftOutOfLimits = $filter('switchBooletoNum')(res.data.result.isCashGiftOutOfLimits);
                        $scope.disciplinaryInfo.isUsePublicAssets = $filter('switchBooletoNum')(res.data.result.isUsePublicAssets);
                        $scope.disciplinaryInfo.isUsePublicCar = $filter('switchBooletoNum')(res.data.result.isUsePublicCar);
                        $scope.disciplinaryInfo.isUsePublicGoods = $filter('switchBooletoNum')(res.data.result.isUsePublicGoods);
                        $scope.disciplinaryInfo.isUsePublicMoney = $filter('switchBooletoNum')(res.data.result.isUsePublicMoney);
                        $scope.disciplinaryInfo.content = res.data.result.content;
                        $scope.disciplinaryInfo.otherQuestion = res.data.result.otherQuestion;
                        $scope.disciplinaryInfo.attachmentPath = res.data.result.attachmentPath;
                    } else {
                        $scope.disciplinaryInfo.isCashGiftOutOfLimits = '0';
                        $scope.disciplinaryInfo.isUsePublicAssets = '0';
                        $scope.disciplinaryInfo.isUsePublicCar = '0';
                        $scope.disciplinaryInfo.isUsePublicGoods = '0';
                        $scope.disciplinaryInfo.isUsePublicMoney = '0';
                        $scope.disciplinaryInfo.content = '';
                        $scope.disciplinaryInfo.otherQuestion = '';
                    }
                }
            }, function (res) {
                console.log('获取失败');
            });
        };
        $scope.addPrincipleBreaking = function () {
            superviseService.addPrincipleBreaking($scope.disciplinaryInfo).then(function (res) {
                console.log(res);
                if (res.data.error && res.data.error.code == 4999) {
                    var comfirmAction = confirm('登录授权已过期,请点击确认重新登录');
                    if (comfirmAction) {
                        $state.go('login');
                    }
                } else {
                    $scope.reportInfo.title = '';
                    $scope.reportInfo.content = '';

                    swal({
                        title: "登记成功!",
                        timer: 2000,
                        type: "success",
                        showConfirmButton: false
                    });
                }
            }, function (res) {
                console.log('获取失败');
            });
        };
        $scope.reportIt = function () {
            superviseService.supervisereport($scope.reportInfo).then(function (res) {
                console.log(res);
                if (res.data.error && res.data.error.code == 4999) {
                    var comfirmAction = confirm('登录授权已过期,请点击确认重新登录');
                    if (comfirmAction) {
                        $state.go('login');
                    }
                } else {
                    $scope.reportInfo.title = '';
                    $scope.reportInfo.content = '';
                    $scope.showSuperviseList();
                    swal({
                        title: "报告成功!",
                        timer: 2000,
                        type: "success",
                        showConfirmButton: false
                    });
                }
            }, function (res) {
                console.log('获取失败');
            });
        };
        $scope.uploadFiles = function (file) {
            console.log(file);
            if (!file) {
                $scope.addPrincipleBreaking();
            } else {
                file.upload = Upload.upload({
                    url: 'http://bigbug.tech:8080/wdm-api/api/upload.api',
                    data: {file: file}
                });
                file.upload.then(function (response) {
                    $timeout(function () {
                        console.log(response);
                        file.result = response.data;
                        $scope.disciplinaryInfo.attachmentFileCode = response.data.result.code;
                        $scope.addPrincipleBreaking();
                    });
                }, function (response) {
                    if (response.status > 0)
                        $scope.errorMsg = response.status + ': ' + response.data;
                }, function (evt) {
                    // Math.min is to fix IE which reports 200% sometimes
                    file.progress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
                });
            }
        };


        //上一页
        $scope.previousPage = function () {
            $scope.params.page--;
            $scope.showItemNum = $scope.params.page;
            if ($scope.params.page == 1) {
                $scope.params.start = 0
            } else {
                $scope.params.start = ( $scope.params.page - 1 ) * $scope.params.limit;
            }
            $scope.showSuperviseList();
        };
        //跳转至指定页
        $scope.selectPage = function () {
            if ($scope.params.page <= 0) {
                $scope.params.page = 2;
            }
            $scope.showItemNum = $scope.params.page;
            if ($scope.params.page == 1) {
                $scope.params.start = 0
            } else {
                $scope.params.start = ( $scope.params.page - 1 ) * $scope.params.limit;
            }
            $scope.showSuperviseList();
        };
        // 下一页
        $scope.nextPage = function () {
            $scope.params.page++;
            $scope.showItemNum = $scope.params.page;
            if ($scope.params.page == 1) {
                $scope.params.start = 0
            } else {
                $scope.params.start = ( $scope.params.page - 1 ) * $scope.params.limit;
            }
            $scope.showSuperviseList();
        };

    }])
    .filter('supervisestatus', function () {      //view 过滤器
        return function (num) {
            if (num == -1) {
                return '未监督';
            } else if (num == 1) {
                return '已监督';
            }

        };
    })
    .filter('switchBooletoNum', function () {      //view 过滤器
        return function (boole) {
            if (boole) {
                return '1';
            } else {
                return '0';
            }

        };
    });