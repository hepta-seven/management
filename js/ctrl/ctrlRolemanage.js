/**
 * Created by Ramirez on 3/28/2017.
 */
angular.module('myApp.ctrl')
    .controller('rolemanageCtrl', ['$state', '$scope', 'rolemanageService', function ($state, $scope, rolemanageService) {
        var loginfo = JSON.parse(sessionStorage.getItem('logInfo'));
        $scope.addRoleInfo = {
            token: loginfo.token,
            roleName: ''
        };

        $scope.getPublicNotification = {
            token: loginfo.token,
            staff: '',
            page: 1,
            start: 0,
            limit: 10
        };
        $scope.rolePermissionInfo = [
            {
                "code": "1",
                "name": "婚丧事宜申",
                "isHavePermission": false
            },
            {
                "code": "2",
                "name": "四风问题举报",
                "isHavePermission": false
            },
            {
                "code": "3",
                "name": "廉政教育",
                "isHavePermission": false
            },
            {
                "code": "4",
                "name": "系统设置",
                "isHavePermission": false
            },
            {
                "code": "1.1",
                "name": "婚丧申报",
                "isHavePermission": false
            },
            {
                "code": "1.2",
                "name": "婚丧审批",
                "isHavePermission": false
            },
            {
                "code": "1.3",
                "name": "婚丧公示",
                "isHavePermission": false
            },
            {
                "code": "1.4",
                "name": "婚丧现场监督",
                "isHavePermission": false
            },
            {
                "code": "1.5",
                "name": "婚丧查询统计",
                "isHavePermission": false
            },
            {
                "code": "1.6",
                "name": "婚丧举报登记",
                "isHavePermission": false
            },
            {
                "code": "1.7",
                "name": "婚丧举报处理",
                "isHavePermission": false
            },
            {
                "code": "1.8",
                "name": "婚丧查处处理",
                "isHavePermission": false
            },
            {
                "code": "1.9",
                "name": "婚丧公开通报查看",
                "isHavePermission": false
            },
            {
                "code": "1.10",
                "name": "婚丧公开通报管理",
                "isHavePermission": false
            },
            {
                "code": "1.11",
                "name": "婚丧纪律处分查看",
                "isHavePermission": false
            },
            {
                "code": "1.12",
                "name": "婚丧纪律处分管理",
                "isHavePermission": false
            },
            {
                "code": "1.13",
                "name": "婚丧承诺书查看",
                "isHavePermission": false
            },
            {
                "code": "1.14",
                "name": "婚丧承诺书管理",
                "isHavePermission": false
            },
            {
                "code": "1.15",
                "name": "婚丧专题教育查看",
                "isHavePermission": false
            },
            {
                "code": "1.16",
                "name": "婚丧专题教育管理",
                "isHavePermission": false
            },
            {
                "code": "1.17",
                "name": "婚丧集中整改查看",
                "isHavePermission": false
            },
            {
                "code": "1.18",
                "name": "婚丧集中整改管理",
                "isHavePermission": false
            },
            {
                "code": "2.1",
                "name": "四风问题投诉查看",
                "isHavePermission": false
            },
            {
                "code": "2.2",
                "name": "纪委书记信箱查看",
                "isHavePermission": false
            },
            {
                "code": "2.3",
                "name": "大操大办查看",
                "isHavePermission": false
            },
            {
                "code": "2.4",
                "name": "吃拿卡要查看",
                "isHavePermission": false
            },
            {
                "code": "2.5",
                "name": "投诉举报查看",
                "isHavePermission": false
            },
            {
                "code": "3.1",
                "name": "必修课管理",
                "isHavePermission": false
            },
            {
                "code": "3.2",
                "name": "选修课管理",
                "isHavePermission": false
            },
            {
                "code": "3.3",
                "name": "廉政视频管理",
                "isHavePermission": false
            },
            {
                "code": "3.4",
                "name": "廉政体检管理",
                "isHavePermission": false
            },
            {
                "code": "4.1",
                "name": "用户管理",
                "isHavePermission": false
            },
            {
                "code": "4.2",
                "name": "组织管理",
                "isHavePermission": false
            },
            {
                "code": "4.3",
                "name": "角色管理",
                "isHavePermission": false
            }
        ];
        $scope.resetInfo = function () {
            $scope.oneRolePermissionInfo = [
                {
                    "code": "1",
                    "name": "婚丧事宜申",
                    "isHavePermission": false
                },
                {
                    "code": "2",
                    "name": "四风问题举报",
                    "isHavePermission": false
                },
                {
                    "code": "3",
                    "name": "廉政教育",
                    "isHavePermission": false
                },
                {
                    "code": "4",
                    "name": "系统设置",
                    "isHavePermission": false
                },
                {
                    "code": "1.1",
                    "name": "婚丧申报",
                    "isHavePermission": false
                },
                {
                    "code": "1.2",
                    "name": "婚丧审批",
                    "isHavePermission": false
                },
                {
                    "code": "1.3",
                    "name": "婚丧公示",
                    "isHavePermission": false
                },
                {
                    "code": "1.4",
                    "name": "婚丧现场监督",
                    "isHavePermission": false
                },
                {
                    "code": "1.5",
                    "name": "婚丧查询统计",
                    "isHavePermission": false
                },
                {
                    "code": "1.6",
                    "name": "婚丧举报登记",
                    "isHavePermission": false
                },
                {
                    "code": "1.7",
                    "name": "婚丧举报处理",
                    "isHavePermission": false
                },
                {
                    "code": "1.8",
                    "name": "婚丧查处处理",
                    "isHavePermission": false
                },
                {
                    "code": "1.9",
                    "name": "婚丧公开通报查看",
                    "isHavePermission": false
                },
                {
                    "code": "1.10",
                    "name": "婚丧公开通报管理",
                    "isHavePermission": false
                },
                {
                    "code": "1.11",
                    "name": "婚丧纪律处分查看",
                    "isHavePermission": false
                },
                {
                    "code": "1.12",
                    "name": "婚丧纪律处分管理",
                    "isHavePermission": false
                },
                {
                    "code": "1.13",
                    "name": "婚丧承诺书查看",
                    "isHavePermission": false
                },
                {
                    "code": "1.14",
                    "name": "婚丧承诺书管理",
                    "isHavePermission": false
                },
                {
                    "code": "1.15",
                    "name": "婚丧专题教育查看",
                    "isHavePermission": false
                },
                {
                    "code": "1.16",
                    "name": "婚丧专题教育管理",
                    "isHavePermission": false
                },
                {
                    "code": "1.17",
                    "name": "婚丧集中整改查看",
                    "isHavePermission": false
                },
                {
                    "code": "1.18",
                    "name": "婚丧集中整改管理",
                    "isHavePermission": false
                },
                {
                    "code": "2.1",
                    "name": "四风问题投诉查看",
                    "isHavePermission": false
                },
                {
                    "code": 2.2,
                    "name": "纪委书记信箱查看",
                    "isHavePermission": false
                },
                {
                    "code": "2.3",
                    "name": "大操大办查看",
                    "isHavePermission": false
                },
                {
                    "code": "2.4",
                    "name": "吃拿卡要查看",
                    "isHavePermission": false
                },
                {
                    "code": "2.5",
                    "name": "投诉举报查看",
                    "isHavePermission": false
                },
                {
                    "code": "3.1",
                    "name": "必修课管理",
                    "isHavePermission": false
                },
                {
                    "code": "3.2",
                    "name": "选修课管理",
                    "isHavePermission": false
                },
                {
                    "code": "3.3",
                    "name": "廉政视频管理",
                    "isHavePermission": false
                },
                {
                    "code": "3.4",
                    "name": "廉政体检管理",
                    "isHavePermission": false
                },
                {
                    "code": "4.1",
                    "name": "用户管理",
                    "isHavePermission": false
                },
                {
                    "code": "4.2",
                    "name": "组织管理",
                    "isHavePermission": false
                },
                {
                    "code": "4.3",
                    "name": "角色管理",
                    "isHavePermission": false
                }
            ];
        };
        $scope.oneRolePermissionInfo = [
            {
                "code": "1",
                "name": "婚丧事宜申",
                "isHavePermission": false
            },
            {
                "code": "2",
                "name": "四风问题举报",
                "isHavePermission": false
            },
            {
                "code": "3",
                "name": "廉政教育",
                "isHavePermission": false
            },
            {
                "code": "4",
                "name": "系统设置",
                "isHavePermission": false
            },
            {
                "code": "1.1",
                "name": "婚丧申报",
                "isHavePermission": false
            },
            {
                "code": "1.2",
                "name": "婚丧审批",
                "isHavePermission": false
            },
            {
                "code": "1.3",
                "name": "婚丧公示",
                "isHavePermission": false
            },
            {
                "code": "1.4",
                "name": "婚丧现场监督",
                "isHavePermission": false
            },
            {
                "code": "1.5",
                "name": "婚丧查询统计",
                "isHavePermission": false
            },
            {
                "code": "1.6",
                "name": "婚丧举报登记",
                "isHavePermission": false
            },
            {
                "code": "1.7",
                "name": "婚丧举报处理",
                "isHavePermission": false
            },
            {
                "code": "1.8",
                "name": "婚丧查处处理",
                "isHavePermission": false
            },
            {
                "code": "1.9",
                "name": "婚丧公开通报查看",
                "isHavePermission": false
            },
            {
                "code": "1.10",
                "name": "婚丧公开通报管理",
                "isHavePermission": false
            },
            {
                "code": "1.11",
                "name": "婚丧纪律处分查看",
                "isHavePermission": false
            },
            {
                "code": "1.12",
                "name": "婚丧纪律处分管理",
                "isHavePermission": false
            },
            {
                "code": "1.13",
                "name": "婚丧承诺书查看",
                "isHavePermission": false
            },
            {
                "code": "1.14",
                "name": "婚丧承诺书管理",
                "isHavePermission": false
            },
            {
                "code": "1.15",
                "name": "婚丧专题教育查看",
                "isHavePermission": false
            },
            {
                "code": "1.16",
                "name": "婚丧专题教育管理",
                "isHavePermission": false
            },
            {
                "code": "1.17",
                "name": "婚丧集中整改查看",
                "isHavePermission": false
            },
            {
                "code": "1.18",
                "name": "婚丧集中整改管理",
                "isHavePermission": false
            },
            {
                "code": "2.1",
                "name": "四风问题投诉查看",
                "isHavePermission": false
            },
            {
                "code": 2.2,
                "name": "纪委书记信箱查看",
                "isHavePermission": false
            },
            {
                "code": "2.3",
                "name": "大操大办查看",
                "isHavePermission": false
            },
            {
                "code": "2.4",
                "name": "吃拿卡要查看",
                "isHavePermission": false
            },
            {
                "code": "2.5",
                "name": "投诉举报查看",
                "isHavePermission": false
            },
            {
                "code": "3.1",
                "name": "必修课管理",
                "isHavePermission": false
            },
            {
                "code": "3.2",
                "name": "选修课管理",
                "isHavePermission": false
            },
            {
                "code": "3.3",
                "name": "廉政视频管理",
                "isHavePermission": false
            },
            {
                "code": "3.4",
                "name": "廉政体检管理",
                "isHavePermission": false
            },
            {
                "code": "4.1",
                "name": "用户管理",
                "isHavePermission": false
            },
            {
                "code": "4.2",
                "name": "组织管理",
                "isHavePermission": false
            },
            {
                "code": "4.3",
                "name": "角色管理",
                "isHavePermission": false
            }
        ];
        $scope.showItemNum = 1;
        $scope.totalItemNum = 0;
        $scope.totalPageNum = 0;
        $scope.getRoleList = function (x) {
            rolemanageService.getRoleList(x).then(function (res) {
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
                    $scope.roleList = res.data;
                    //每次调用接口后获得总条目数量,设置总页数
                    $scope.totalItemNum = $scope.roleList.total;
                    $scope.totalPageNum = Math.ceil($scope.totalItemNum / $scope.getPublicNotification.limit);
                    // console.log($scope.roleList);

                }
            }, function (res) {
                console.log('获取失败');
            });
        };

        $scope.getRoleList($scope.getPublicNotification);

        $scope.addRole = function () {
            var permissionInfo = [];
            for (var i = 0; i < $scope.rolePermissionInfo.length; i++) {
                if ($scope.rolePermissionInfo[i].isHavePermission) {
                    permissionInfo.push($scope.rolePermissionInfo[i].code)
                }
            }
            console.log(permissionInfo);
            rolemanageService.addRole($scope.addRoleInfo, permissionInfo).then(function (res) {
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
                        title: "添加成功!",
                        timer: 2000,
                        type: "success",
                        showConfirmButton: false
                    });
                    console.log(res);
                }
            }, function (res) {
                console.log('获取失败');
            });
            $scope.addRoleInfo.roleName = '';
            $scope.getPublicNotification.page = 1;
            $scope.getPublicNotification.start = 0;
            $scope.getRoleList($scope.getPublicNotification);
        };


        $scope.updateUserInfo = function () {
            var permissionInfo = [];
            for (var i = 0; i < $scope.oneRolePermissionInfo.length; i++) {
                if ($scope.oneRolePermissionInfo[i].isHavePermission) {
                    permissionInfo.push($scope.oneRolePermissionInfo[i].code)
                }
            }
            console.log(permissionInfo);
            rolemanageService.updateInfo(loginfo.token, $scope.roleInfo, permissionInfo).then(function (res) {
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
                }
            }, function (res) {
                console.log('获取失败');
            });
            $scope.getRoleList($scope.getPublicNotification);
        };

        $scope.startEdit = function (x) {
            $scope.resetInfo();
            console.log(x);
            rolemanageService.getOneRoleInfo(loginfo.token, x).then(function (res) {
                if (!res.data) {
                    swal({
                        title: "角色已被使用,无法修改!",
                        type: "warning",
                        timer: 2000,
                        showConfirmButton: true
                    });
                    $('.editInfo').modal('hide');
                } else {
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
                        $scope.roleInfo = res.data.result;
                        console.log($scope.roleInfo);
                        for (var i = 0; i < $scope.roleInfo.functions.length; i++) {
                            for (var j = 0; j < $scope.oneRolePermissionInfo.length; j++) {
                                if ($scope.roleInfo.functions[i].code == $scope.oneRolePermissionInfo[j].code) {
                                    $scope.oneRolePermissionInfo[j].isHavePermission = true;
                                }
                            }
                        }
                    }
                }
            }, function (res) {
                console.log('获取失败');
            });
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
                        rolemanageService.deleteRole(loginfo.token, id).then(function (res) {
                            console.log(res);
                            if (res.data.error) {
                                if (res.data.error.code == 4002) {
                                    swal({
                                        title: "角色已被使用,无法删除",
                                        type: "warning",
                                        timer: 2000,
                                        showConfirmButton: true
                                    });
                                }
                            } else {
                                swal({
                                    title: "数据已删除!",
                                    type: "success",
                                    timer: 2000,
                                    showConfirmButton: true
                                });
                                $scope.getRoleList($scope.getPublicNotification);
                            }
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
            $scope.getPublicNotification.start = ( $scope.getPublicNotification.page - 1 ) * $scope.getPublicNotification.limit;
            $scope.getRoleList($scope.getPublicNotification);
        };
        //跳转至指定页
        $scope.selectPage = function () {
            if ($scope.getPublicNotification.page <= 0) {
                $scope.getPublicNotification.page = 2;
            }
            $scope.showItemNum = $scope.getPublicNotification.page;
            $scope.getPublicNotification.start = ( $scope.getPublicNotification.page - 1 ) * $scope.getPublicNotification.limit;
            $scope.getRoleList($scope.getPublicNotification);
        };
        // 下一页
        $scope.nextPage = function () {
            $scope.getPublicNotification.page++;
            $scope.showItemNum = $scope.getPublicNotification.page;
            $scope.getPublicNotification.start = ( $scope.getPublicNotification.page - 1 ) * $scope.getPublicNotification.limit;
            $scope.getRoleList($scope.getPublicNotification);
        };
    }]);