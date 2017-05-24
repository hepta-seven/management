/**
 * Created by Ramirez on 3/28/2017.
 */
angular.module('myApp.ctrl')
    .controller('precisequeryCtrl', ['$state', '$scope', '$rootScope', 'precisequeryService', '$filter', function ($state, $scope, $rootScope, precisequeryService, $filter) {
        var loginfo = JSON.parse(sessionStorage.getItem('logInfo'));
        $scope.demoLists = [
            {
                name: []
            }
        ];
        $scope.precisequeryInfo = {
            token: loginfo.token,
            staff: '',
            staffOrgId: '',
            page: 1,
            start: 0,
            limit: 30000
        };
        $scope.currentPage = 0;                       //设置当前页是 0
        $scope.showCurrentPage = $scope.currentPage + 1;
        $scope.listsPerPage = 10;                      //设置每页显示数据个数
        $scope.showPage = 5;                          //设置标签显示个数
        precisequeryService.getOrgList(loginfo.token).then(function (res) {
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
                $scope.precisequeryInfo.staffOrgId = orgList.children[0].id;
                // console.log(orgList);
            }
        }, function (res) {
            console.log('获取失败');
        });
        $scope.getprecisequeryList = function () {
            precisequeryService.precisequery($scope.precisequeryInfo).then(function (res) {
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
                    $scope.demoLists.name = res.data.result;
                    console.log($scope.demoLists.name);
                    $scope.dataNum = $scope.demoLists.name.length;  //获得数据总个数
                    $scope.pages = Math.ceil($scope.dataNum / $scope.listsPerPage);         //按照每页显示个数，得到总页数
                }
            }, function (res) {
                console.log('获取失败');
            });
        };

        // $scope.getprecisequeryList();

        $scope.precisequery = function () {
            $scope.currentPage = 0;
            $scope.getprecisequeryList();
            $scope.showCurrentPage = $scope.currentPage + 1;
        };
        $scope.goToPage = function () {
            $scope.currentPage = $scope.showCurrentPage - 1;
            $scope.showCurrentPage = $scope.currentPage + 1;
        };
        $scope.prevPage = function () {               //点击上一页执行的函数
            $scope.currentPage--;
            $scope.showCurrentPage = $scope.currentPage + 1;
        };
        $scope.nextPage = function () {              //点击下一页执行的函数
            $scope.currentPage++;
            $scope.showCurrentPage = $scope.currentPage + 1;
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
    })
    .filter('paging', function () {      //paging 过滤器
        return function (lists, start) {
            //  lists 是在 html 里你ng-repeat的原始数据：
            //  start 也就是 paging 后面传的参数，即 currentPage*listsPerPage
            if (lists) {
                return lists.slice(start);     //将原始数据按照 start 分割
            }

        };
    })
    .filter('view', function () {      //view 过滤器
        return function (lists, start, showPage) {
            if (start - Math.floor(showPage / 2) >= 0) {
                if (start + Math.floor(showPage / 2) >= lists.length) {
                    return lists.slice(lists.length - showPage, lists.length + 1);
                }
                return lists.slice(start - Math.floor(showPage / 2), start + Math.ceil(showPage / 2));
            } else if (start - Math.floor(showPage / 2) <= 0) {
                return lists.slice(0, showPage + 1);
            }
        };
    });