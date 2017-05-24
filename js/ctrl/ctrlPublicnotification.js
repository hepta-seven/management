/**
 * Created by Ramirez on 3/28/2017.
 */
angular.module('myApp.ctrl')
    .controller('publicnotificationCtrl', ['$state', '$scope', '$rootScope', 'publicnotificationService', '$filter', 'Upload', '$timeout', function ($state, $scope, $rootScope, publicnotificationService, $filter, Upload, $timeout) {
        // console.log($scope.rolePermissionInfo);
        var loginfo = JSON.parse(sessionStorage.getItem('logInfo'));
        $scope.col = 'time';//默认按name列排序
        $scope.desc = 0;//默认排序条件升序
        $scope.addInfo = {
            token: loginfo.token,
            title: '',
            content: '',
            staff: '',
            staffOrgId: ''
        };

        $scope.getPublicNotification = {
            token: loginfo.token,
            staff: '',
            page: 1,
            start: 0,
            limit: 10
        };
        $scope.showItemNum = 1;
        $scope.totalItemNum = 0;
        $scope.totalPageNum = 0;
        $scope.getPublicNotificationList = function (x) {
            publicnotificationService.getPublicNotificationList(x).then(function (res) {
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
                    // console.log(res.data);
                    $scope.publicNotificationList = res.data;
                    //每次调用接口后获得总条目数量,设置总页数
                    $scope.totalItemNum = $scope.publicNotificationList.total;
                    $scope.totalPageNum = Math.ceil($scope.totalItemNum / $scope.getPublicNotification.limit);
                    // console.log($scope.publicNotificationList);

                }
            }, function (res) {
                console.log('获取失败');
            });
        };
        $scope.getOrgListInfo = function () {
            publicnotificationService.getOrgList(loginfo.token).then(function (res) {
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
                    $scope.addInfo.staffOrgId = orgList.children[0].id;
                    console.log(orgList);
                }
            }, function (res) {
                console.log('获取失败');
            });
        };
        $scope.getPublicNotificationList($scope.getPublicNotification);
        $scope.startAdd = function () {
            $scope.getOrgListInfo();
        };
        $scope.searchInfo = function () {
            $scope.getPublicNotification.staff = $scope.searhName;
            $scope.getPublicNotification.page = 1;
            $scope.showItemNum = $scope.getPublicNotification.page;
            if ($scope.getPublicNotification.page == 1) {
                $scope.getPublicNotification.start = 0
            } else {
                $scope.getPublicNotification.start = ( $scope.getPublicNotification.page - 1 ) * $scope.getPublicNotification.limit;
            }
            $scope.getPublicNotificationList($scope.getPublicNotification);
        };
        $scope.addPubInfo = function () {
            publicnotificationService.addInfo($scope.addInfo).then(function (res) {
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
                    swal({
                        title: "添加成功!",
                        timer: 2000,
                        type: "success",
                        showConfirmButton: false
                    });
                }
            }, function (res) {
                console.log('获取失败');
            });
            $scope.addInfo = {
                token: loginfo.token,
                title: '',
                content: '',
                staff: '',
                staffOrgId: ''
            };
            $scope.getPublicNotificationList($scope.getPublicNotification);
        };

        $scope.getOneInfo = function (id) {
            publicnotificationService.getOnePublicNotificationInfo(loginfo.token, id).then(function (res) {
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
                    $scope.publicNotificationDetails = res.data.result;
                }
            }, function (res) {
                console.log('获取失败');
            });
        };
        $scope.updateUserInfo = function () {
            console.log($scope.publicNotificationDetails);
            publicnotificationService.updateInfo(loginfo.token, $scope.publicNotificationDetails).then(function (res) {
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
                        title: "你的修改已成功提交!",
                        timer: 2000,
                        showConfirmButton: true
                    });
                    console.log(res);
                    $scope.getPublicNotificationList($scope.getPublicNotification);
                }
            }, function (res) {
                console.log('获取失败');
            });

        };

        $scope.viewData = function (x) {
            $('.viewInfo').modal('toggle');
            console.log(x);
            $scope.getOneInfo(x);
        };
        $scope.startEdit = function (x) {
            $scope.getOrgListInfo();
            console.log(x);
            $scope.getOneInfo(x);
        };
        $scope.startDelete = function (id) {
            swal({
                    title: "确认删除吗?",
                    text: "你将无法恢复此数据!",
                    type: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#DD6B55",
                    confirmButtonText: "确认",
                    cancelButtonText: "取消",
                    closeOnConfirm: true,
                    closeOnCancel: true
                },
                function (isConfirm) {
                    if (isConfirm) {
                        publicnotificationService.deleteInfo(loginfo.token, id).then(function (res) {
                            swal({
                                title: "数据已删除!",
                                timer: 2000,
                                showConfirmButton: true
                            });
                            console.log(res);
                            $scope.getPublicNotificationList($scope.getPublicNotification);
                        }, function (res) {
                            console.log('获取失败');
                        });
                    }
                });
        };
        //上一页
        $scope.previousPage = function () {
            $scope.getPublicNotification.page--;
            $scope.showItemNum = $scope.getPublicNotification.page;
            if ($scope.getPublicNotification.page == 1) {
                $scope.getPublicNotification.start = 0
            } else {
                $scope.getPublicNotification.start = ( $scope.getPublicNotification.page - 1 ) * $scope.getPublicNotification.limit;
            }
            $scope.getPublicNotificationList($scope.getPublicNotification);
            console.log($scope.publicNotificationList);
        };
        //跳转至指定页
        $scope.selectPage = function () {
            if ($scope.getPublicNotification.page <= 0) {
                $scope.getPublicNotification.page = 2;
            }
            $scope.showItemNum = $scope.getPublicNotification.page;
            if ($scope.getPublicNotification.page == 1) {
                $scope.getPublicNotification.start = 0
            } else {
                $scope.getPublicNotification.start = ( $scope.getPublicNotification.page - 1 ) * $scope.getPublicNotification.limit;
            }

            $scope.getPublicNotificationList($scope.getPublicNotification);
        };
        // 下一页
        $scope.nextPage = function () {
            $scope.getPublicNotification.page++;
            $scope.showItemNum = $scope.getPublicNotification.page;
            if ($scope.getPublicNotification.page == 1) {
                $scope.getPublicNotification.start = 0
            } else {
                $scope.getPublicNotification.start = ( $scope.getPublicNotification.page - 1 ) * $scope.getPublicNotification.limit;
            }
            $scope.getPublicNotificationList($scope.getPublicNotification);
            console.log($scope.publicNotificationList);
        };

    }])

    .filter('auditStatusFilter', function () {
        return function (status) {
            if (!status) {
                return '待审批';
            } else if (status == 1) {
                return '通过';
            } else if (status == 2) {
                return '拒绝';
            }
        };
    });