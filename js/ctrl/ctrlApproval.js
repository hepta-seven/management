/**
 * Created by Ramirez on 3/28/2017.
 */
angular.module('myApp.ctrl')
    .controller('approvalCtrl', ['$state', '$scope', 'approvalService', function ($state, $scope, approvalService) {
        var loginfo = JSON.parse(sessionStorage.getItem('logInfo'));
        $scope.selectstatus = '-1';
        $scope.applicant = '';
        $scope.getApprovalListPaging = {
            token: loginfo.token,
            staff: '',
            auditStatus: -1,
            page: 1,
            start: 0,
            limit: 10
        };
        $scope.showItemNum = 1;
        $scope.totalItemNum = 0;
        $scope.totalPageNum = 0;
        //调取数据方法
        $scope.getApprovalPagingfunction = function (x) {
            approvalService.getApprovalList(x).then(function (res) {
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
                    $scope.getApprovalList = res.data.result;
                    $scope.totalPageNum = Math.ceil((res.data.total - 14) / 10);
                    $scope.totalItemNum = res.data.total;
                }
            }, function (res) {
                console.log('获取失败');
            });
        };
        $scope.getApprovalPagingfunction($scope.getApprovalListPaging);
        //调取数据方法

        // 双击详情
        $scope.viewData = function (id) {
            console.log(id);
            $('#exampleModal1').modal('toggle');
            approvalService.viewData(loginfo.token, id).then(function (res) {
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
        // 双击详情

        //查询
        $scope.searchApproval = function () {
            $scope.getApprovalListPaging.staff = $scope.applicant;
            $scope.getApprovalListPaging.page = 1;
            $scope.getApprovalListPaging.auditStatus = $scope.selectstatus;
            $scope.showItemNum = $scope.getApprovalListPaging.page;
            if ($scope.getApprovalListPaging.page == 1) {
                $scope.getApprovalListPaging.start = 0
            } else {
                $scope.getApprovalListPaging.start = ( $scope.getApprovalListPaging.page - 1 ) * $scope.getApprovalListPaging.limit;
            }
            $scope.getApprovalPagingfunction($scope.getApprovalListPaging);
        };
        //查询

        $scope.saveId = function (eventid, status) {
            console.log(eventid);
            sessionStorage.setItem('eventid', eventid);
            sessionStorage.setItem('status', status);
        };

        $scope.doIt = function (action) {
            console.log(sessionStorage.getItem('eventid'));
            $scope.doContent = '';
            approvalService.approvalAction(loginfo.token, sessionStorage.getItem('eventid'), sessionStorage.getItem('status'), $scope.doContent);
            approvalService.getApprovalList($scope.getApprovalListPaging).then(function (res) {
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
                    $scope.getApprovalList = res.data.result;
                }
            }, function (res) {
                console.log('获取失败');
            });
        };

        //审批上一页
        $scope.previousPage = function () {
            $scope.getApprovalListPaging.page--;
            $scope.showItemNum = $scope.getApprovalListPaging.page;
            if ($scope.getApprovalListPaging.page == 1) {
                $scope.getApprovalListPaging.start = 0
            } else {
                $scope.getApprovalListPaging.start = ( $scope.getApprovalListPaging.page - 1 ) * $scope.getApprovalListPaging.limit;
            }
            $scope.getApprovalPagingfunction($scope.getApprovalListPaging);
        };
        //输入页
        $scope.selectPage = function (value) {
            if ($scope.getApprovalListPaging.page <= 0) {
                $scope.getApprovalListPaging.page = 2;
            }
            $scope.showItemNum = $scope.getApprovalListPaging.page;
            if ($scope.getApprovalListPaging.page == 1) {
                $scope.getApprovalListPaging.start = 0
            } else {
                $scope.getApprovalListPaging.start = ( $scope.getApprovalListPaging.page - 1 ) * $scope.getApprovalListPaging.limit;
            }
            $scope.getApprovalPagingfunction($scope.getApprovalListPaging);
        };
        //审批下一页
        $scope.nextPage = function () {
            $scope.getApprovalListPaging.page++;
            $scope.showItemNum = $scope.getApprovalListPaging.page;
            if ($scope.getApprovalListPaging.page == 1) {
                $scope.getApprovalListPaging.start = 0
            } else {
                $scope.getApprovalListPaging.start = ( $scope.getApprovalListPaging.page - 1 ) * $scope.getApprovalListPaging.limit;
            }
            $scope.getApprovalPagingfunction($scope.getApprovalListPaging);
        };
    }
    ]);