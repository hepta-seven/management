/**
 * Created by Ramirez on 3/28/2017.
 */
angular.module('myApp.ctrl')
    .controller('usermanageCtrl', ['$state', '$scope', 'usermanageService', '$uibModal', function ($state, $scope, usermanageService, $uibModal) {
        var loginfo = JSON.parse(sessionStorage.getItem('logInfo'));
        $scope.openAddModal = function () {
            console.log(125);
            var modalInstance = $uibModal.open({
                // animation: $ctrl.animationsEnabled,
                templateUrl: 'templates/modal/usermanage-addnew.html',
                controller: 'usermanageAddCtrl',
                backdrop: true,
                size: 'lg',
                resolve: {
                    items: function () {
                        return $scope.getApprovalList;
                    }
                }
            });
            modalInstance.result.then(function () {
            }, function () {
                $scope.getUsermanagePagingfunction($scope.getUsermanagePaging);
            });
        };
        //调取数据参数
        $scope.getUsermanagePaging = {
            token: loginfo.token,
            page: 1,
            start: 0,
            limit: 10
        };
        $scope.showItemNum = 1;
        $scope.totalItemNum = 0;
        $scope.totalPageNum = 0;
        //调取数据参数
        $scope.newUserInfo = {
            token: loginfo.token,
            username: '',
            name: '',
            password: '',
            orgId: '',
            roleId: ''
        };
        //调取数据方法
        $scope.getUsermanagePagingfunction = function (x) {
            usermanageService.userList(x).then(function (res) {
                // console.log(res);
                $scope.getApprovalList = res.data.result;
                $scope.totalPageNum = Math.ceil(res.data.total / 10);
                $scope.totalItemNum = res.data.total;
            }, function (res) {
                console.log('获取失败');
            });
        };
        $scope.getUsermanagePagingfunction($scope.getUsermanagePaging);
        //调取数据方法

        //用户管理上一页
        $scope.previousPage = function () {
            $scope.getUsermanagePaging.page--;
            $scope.showItemNum = $scope.getUsermanagePaging.page;
            if ($scope.getUsermanagePaging.page == 1) {
                $scope.getUsermanagePaging.start = 0
            } else {
                $scope.getUsermanagePaging.start = ( $scope.getUsermanagePaging.page - 1 ) * $scope.getUsermanagePaging.limit;
            }
            $scope.getUsermanagePagingfunction($scope.getUsermanagePaging);
        };
        //用户管理输入页
        $scope.selectPage = function (value) {
            if ($scope.getUsermanagePaging.page <= 0) {
                $scope.getUsermanagePaging.page = 2;
            }
            $scope.showItemNum = $scope.getUsermanagePaging.page;
            if ($scope.getUsermanagePaging.page == 1) {
                $scope.getUsermanagePaging.start = 0
            } else {
                $scope.getUsermanagePaging.start = ( $scope.getUsermanagePaging.page - 1 ) * $scope.getUsermanagePaging.limit;
            }
            $scope.getUsermanagePagingfunction($scope.getUsermanagePaging);
        };
        //用户管理下一页
        $scope.nextPage = function () {
            $scope.getUsermanagePaging.page++;
            $scope.showItemNum = $scope.getUsermanagePaging.page;
            if ($scope.getUsermanagePaging.page == 1) {
                $scope.getUsermanagePaging.start = 0
            } else {
                $scope.getUsermanagePaging.start = ( $scope.getUsermanagePaging.page - 1 ) * $scope.getUsermanagePaging.limit;
            }
            $scope.getUsermanagePagingfunction($scope.getUsermanagePaging);
        };


        $scope.searchApproval = function () {
            console.log($scope.selectstatus);
            $scope.getUsermanagePagingfunction($scope.getUsermanagePaging);
        };

        $scope.saveId = function (eventid, status) {
            console.log(eventid);
            sessionStorage.setItem('eventid', eventid);
            sessionStorage.setItem('status', status);
        };

        $scope.doIt = function (action) {
            console.log(sessionStorage.getItem('eventid'));
            $scope.doContent = '';
            usermanageService.approvalAction(loginfo.token, sessionStorage.getItem('eventid'), sessionStorage.getItem('status'), $scope.doContent);
            usermanageService.getApprovalList(loginfo.token, '', '-1').then(function (res) {
                console.log(res);
                $scope.getApprovalList = res.data.result;
            }, function (res) {
                console.log('获取失败');
            });
        };

        $scope.startCreatNewUser = function () {
            usermanageService.getOrgList(loginfo.token).then(function (res) {
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
                $scope.newUserInfo.orgId = orgList.children[0].id;
                console.log(orgList);
            }, function (res) {
                console.log('获取失败');
            });
            usermanageService.getRoleList(loginfo.token).then(function (res) {
                console.log(res);
                $scope.roleList = res.data.result;
                $scope.newUserInfo.roleId = res.data.result[1].id;
            }, function (res) {
                console.log('获取失败');
            });
        };

        $scope.creatNewUser = function () {
            console.log($scope.newUserInfo);
            usermanageService.creatNewUser($scope.newUserInfo).then(function (res) {
                console.log(res);
                $scope.getUsermanagePagingfunction($scope.getUsermanagePaging);
            }, function (res) {
                console.log('获取失败');
            });
        };
        $scope.startEditUser = function (id) {
            $scope.password = '';
            $scope.nowUserId = id;
            $scope.nowUserInfo = {
                token: loginfo.token,
                username: '',
                name: '',
                userId: $scope.nowUserId,
                orgId: '',
                roleId: '',
                password: ''
            };
            console.log(id);
            usermanageService.getUserInfo(loginfo.token, id).then(function (res) {
                console.log(res);
                $scope.nowUserInfo.username = res.data.result.username;
                $scope.nowUserInfo.name = res.data.result.name;
                $scope.nowUserInfo.roleId = res.data.result.role.id;
                $scope.nowUserInfo.orgId = res.data.result.organization.id;
                console.log($scope.nowUserInfo);
            }, function (res) {
                console.log('获取失败');
            });
            usermanageService.getOrgList(loginfo.token).then(function (res) {
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
                $scope.newUserInfo.orgId = orgList.children[0].id;
            }, function (res) {
                console.log('获取失败');
            });
            usermanageService.getRoleList(loginfo.token).then(function (res) {
                console.log(res);
                $scope.roleList = res.data.result;
                $scope.newUserInfo.roleId = res.data.result[1].id;
            }, function (res) {
                console.log('获取失败');
            });
        };
        $scope.deleteUser = function (id) {
            swal({
                    title: "确认删除吗?",
                    text: "你将无法恢复这个用户!",
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
                        usermanageService.deleteUser(loginfo.token, id).then(function (res) {
                            console.log(res);
                            $scope.getUsermanagePagingfunction($scope.getUsermanagePaging);
                        }, function (res) {
                            console.log('获取失败');
                        });
                    }
                });
        };
        $scope.updateUserInfo = function () {
            usermanageService.updateUserInfo($scope.nowUserInfo).then(function (res) {
                console.log(res);
                $scope.password = '';
                $scope.getUsermanagePagingfunction($scope.getUsermanagePaging);
            }, function (res) {
                console.log('获取失败');
            });
        };
    }]);