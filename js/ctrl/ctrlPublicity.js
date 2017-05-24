/**
 * Created by Ramirez on 3/28/2017.
 */
angular.module('myApp.ctrl')
    .controller('publicityCtrl', ['$state', '$http', '$scope', 'publicityService', '$filter', 'Upload', '$timeout', function ($state, $http, $scope, publicityService, $filter, Upload, $timeout) {
        var loginfo = JSON.parse(sessionStorage.getItem('logInfo'));
        $scope.selectstatus = '-1';
        $scope.applicant = '';
        $scope.getpublicityPaging = {
            token: loginfo.token,
            staff: '',
            bulletinStatus: -1,
            page: 1,
            start: 0,
            limit: 10
        };
        $scope.contentInfo = {
            token: loginfo.token,
            eventId: '',
            content: '',
            attachmentFileCode: '',
            attachmentPath: ''
        };
        $scope.resultInfo = {
            token: loginfo.token,
            eventId: '',
            content: '',
            status: '1',
            attachmentFileCode: '',
            attachmentPath: ''
        };
        $scope.showItemNum = 1;
        $scope.totalItemNum = 0;
        $scope.totalPageNum = 0;
        //调取数据方法
        $scope.getpublicityPagingfunction = function (x) {
            publicityService.bulletin(x).then(function (res) {
                // console.log(res);
                if (res.data.error && res.data.error.code == 4999) {
                    swal({
                            title: "登录授权已过期,请点击确认重新登录",
                            type: "warning",
                            showCancelButton: true,
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
                    $scope.showbulletinstatus = $filter('bulletinstatus')($scope.selectstatus);
                    $scope.getApprovalList = res.data.result;
                    $scope.totalPageNum = Math.ceil(res.data.total / 10);
                    $scope.totalItemNum = res.data.total;
                }
            }, function (res) {
                console.log('获取失败');
            });
        };
        $scope.getpublicityPagingfunction($scope.getpublicityPaging);

        $scope.startContent = function (eventid) {
            $scope.contentInfo = {
                token: loginfo.token,
                eventId: '',
                content: '',
                attachmentFileCode: '',
                attachmentPath: ''
            };
            console.log(eventid);
            $scope.contentInfo.eventId = eventid;
            publicityService.getPublicityData(loginfo.token, eventid).then(function (res) {
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
                    if (res.data.result) {
                        console.log(res);
                        $scope.contentInfo.content = res.data.result.content;
                        $scope.contentInfo.attachmentPath = res.data.result.attachmentPath;
                    }
                }
            }, function (res) {
                console.log('获取失败');
            });
        };

        $scope.startResult = function (eventid) {
            $scope.resultInfo = {
                token: loginfo.token,
                eventId: '',
                content: '',
                status: '1',
                attachmentFileCode: '',
                attachmentPath: ''
            };
            console.log(eventid);
            $scope.resultInfo.eventId = eventid;
            publicityService.getPublicityData(loginfo.token, eventid).then(function (res) {
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
                    if (res.data.result) {
                        console.log(res.data.result.status);
                        $scope.resultInfo.content = res.data.result.content;
                        $scope.resultInfo.status = res.data.result.status + '';
                        $scope.resultInfo.attachmentPath = res.data.result.attachmentPath;
                    }
                }
            }, function (res) {
                console.log('获取失败');
            });
        };
        //公示内容
        $scope.contentIt = function (file) {
            console.log(file);
            if (!file) {
                $scope.doContent();
            } else {
                file.upload = Upload.upload({
                    url: 'http://bigbug.tech:8080/wdm-api/api/upload.api',
                    data: {file: file}
                });
                file.upload.then(function (response) {
                    $timeout(function () {
                        console.log(response);
                        file.result = response.data;
                        $scope.selectFile = '';
                        $scope.contentInfo.attachmentFileCode = response.data.result.code;
                        $scope.doContent();
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
        //公示结果
        $scope.resultIt = function (file) {
            if (!file) {
                console.log($scope.resultInfo);
                $scope.doResult();
            } else {
                file.upload = Upload.upload({
                    url: 'http://bigbug.tech:8080/wdm-api/api/upload.api',
                    data: {file: file}
                });
                file.upload.then(function (response) {
                    $timeout(function () {
                        console.log(response);
                        file.result = response.data;
                        $scope.selectFile = '';
                        $scope.resultInfo.attachmentFileCode = response.data.result.code;
                        console.log($scope.resultInfo);
                        $scope.doResult();
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

        //搜索
        $scope.searchApproval = function () {
            $scope.getpublicityPaging.staff = $scope.applicant;
            $scope.getpublicityPaging.page = 1;
            $scope.getpublicityPaging.bulletinStatus = $scope.selectstatus;
            $scope.showItemNum = $scope.getpublicityPaging.page;
            if ($scope.getpublicityPaging.page == 1) {
                $scope.getpublicityPaging.start = 0
            } else {
                $scope.getpublicityPaging.start = ( $scope.getpublicityPaging.page - 1 ) * $scope.getpublicityPaging.limit;
            }
            $scope.getpublicityPagingfunction($scope.getpublicityPaging);
        };

        //双击查询条目信息
        $scope.viewData = function (id) {
            console.log(id);
            $('#exampleModal1').modal('toggle');
            publicityService.viewData(loginfo.token, id).then(function (res) {
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
                    console.log(res);
                    $scope.viewDataDetails = res.data.result;
                }
            }, function (res) {
                console.log('获取失败');
            });
        };


        $scope.doContent = function (action) {
            publicityService.publicityContent($scope.contentInfo).then(function (res) {
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
                    // $scope.viewDataDetails = res.data.result;
                    $scope.getpublicityPagingfunction($scope.getpublicityPaging);
                }
            }, function (res) {
                console.log('获取失败');
            });
        };

        $scope.doResult = function () {
            publicityService.publicityResult($scope.resultInfo).then(function (res) {
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
                    // $scope.viewDataDetails = res.data.result;
                    $scope.getpublicityPagingfunction($scope.getpublicityPaging);
                }
            }, function (res) {
                console.log('获取失败');
            });
        };
        //**************
        //公示上一页
        $scope.previousPage = function () {
            $scope.getpublicityPaging.page--;
            $scope.showItemNum = $scope.getpublicityPaging.page;
            if ($scope.getpublicityPaging.page == 1) {
                $scope.getpublicityPaging.start = 0
            } else {
                $scope.getpublicityPaging.start = ( $scope.getpublicityPaging.page - 1 ) * $scope.getpublicityPaging.limit;
            }
            $scope.getpublicityPagingfunction($scope.getpublicityPaging);
        };
        //公示上一页
        // *********************
        //输入页
        $scope.selectPage = function () {
            if ($scope.getpublicityPaging.page <= 0) {
                $scope.getpublicityPaging.page = 2;
            }
            $scope.showItemNum = $scope.getpublicityPaging.page;
            if ($scope.getpublicityPaging.page == 1) {
                $scope.getpublicityPaging.start = 0
            } else {
                $scope.getpublicityPaging.start = ( $scope.getpublicityPaging.page - 1 ) * $scope.getpublicityPaging.limit;
            }
            $scope.getpublicityPagingfunction($scope.getpublicityPaging);
        };
        // 输入页
        // *********************
        //公示下一页
        $scope.nextPage = function () {
            $scope.getpublicityPaging.page++;
            $scope.showItemNum = $scope.getpublicityPaging.page;
            if ($scope.getpublicityPaging.page == 1) {
                $scope.getpublicityPaging.start = 0
            } else {
                $scope.getpublicityPaging.start = ( $scope.getpublicityPaging.page - 1 ) * $scope.getpublicityPaging.limit;
            }
            $scope.getpublicityPagingfunction($scope.getpublicityPaging);
        };
        //公示下一页
    }])
    .filter('bulletinstatus', function () {      //view 过滤器
        return function (num) {
            // console.log(arguments);
            if (num == -1) {
                return '未公示';
            } else if (num == 1) {
                return '已公示';
            }

        };
    });