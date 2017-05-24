/**
 * Created by Ramirez on 3/28/2017.
 */
angular.module('myApp.ctrl')
    .controller('usermanageAddCtrl', ['$uibModalInstance', '$scope', 'usermanageService', function ($uibModalInstance, $scope, usermanageService) {
        var loginfo = JSON.parse(sessionStorage.getItem('logInfo'));
        $scope.newUserInfo = {
            token: loginfo.token,
            username: '',
            name: '',
            password: '',
            orgId: '',
            roleId: ''
        };
        //确认按钮方法
        $scope.ok = function () {
            console.log($scope.newUserInfo);
            usermanageService.creatNewUser($scope.newUserInfo).then(function (res) {
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
                    $uibModalInstance.dismiss('cancel');
                }
            }, function (res) {
                console.log('获取失败');
            });

        };
        //取消按钮方法
        $scope.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };
        //获取部门列表数据
        usermanageService.getOrgList(loginfo.token).then(function (res) {
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
                $scope.newUserInfo.orgId = orgList.children[0].id;
                console.log(orgList);
            }
        }, function (res) {
            console.log('获取失败');
        });
        //获取角色列表数据
        usermanageService.getRoleList(loginfo.token).then(function (res) {
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
                $scope.roleList = res.data.result;
                $scope.newUserInfo.roleId = res.data.result[0].id;
            }
        }, function (res) {
            console.log('获取失败');
        });
    }]);