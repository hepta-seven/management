/**
 * Created by Ramirez on 3/28/2017.
 */
angular.module('myApp.ctrl')
    .controller('groupqueryCtrl', ['$state', '$scope', 'groupqueryService', '$filter', function ($state, $scope, groupqueryService, $filter) {
        var loginfo = JSON.parse(sessionStorage.getItem('logInfo'));
        $scope.demoLists = [
            {
                name: []
            }
        ];
        $scope.searchParams = {
            token: loginfo.token,
            eventCreateTimeFrom: '',
            eventCreateTimeTo: '',
            eventTimeFrom: '',
            eventTimeTo: '',
            eventType: 0,
            peopleCountMin: 0,
            peopleCountMax: 0,
            page: 1,
            start: 0,
            limit: 3000
        };
        $scope.searchTime = {
            eventCreateTimeFrom: '',
            eventCreateTimeTo: '',
            eventTimeFrom: '',
            eventTimeTo: ''
        };
        $scope.currentPage = 0;                       //设置当前页是 0
        $scope.showCurrentPage = $scope.currentPage + 1;
        $scope.listsPerPage = 10;                      //设置每页显示数据个数
        $scope.showPage = 5;                          //设置标签显示个数
        $scope.searchParams.eventType = '0';
        $scope.peopleCount = '0';
        $scope.getResultList = function () {
            $scope.currentPage = 0;
            groupqueryService.groupquery($scope.searchParams, $scope.searchTime).then(function (res) {
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

            });
        };

        $scope.query = function () {
            $scope.searchTime.eventCreateTimeFrom = $filter('date')($scope.searchParams.eventCreateTimeFrom, 'yyyy-MM-dd');
            $scope.searchTime.eventCreateTimeTo = $filter('date')($scope.searchParams.eventCreateTimeTo, 'yyyy-MM-dd');
            $scope.searchTime.eventTimeFrom = $filter('date')($scope.searchParams.eventTimeFrom, 'yyyy-MM-dd');
            $scope.searchTime.eventTimeTo = $filter('date')($scope.searchParams.eventTimeTo, 'yyyy-MM-dd');
            if ($scope.peopleCount == '0') {
                $scope.searchParams.peopleCountMin = 0;
                $scope.searchParams.peopleCountMax = 0;
            } else if ($scope.peopleCount == '1') {
                $scope.searchParams.peopleCountMin = 0;
                $scope.searchParams.peopleCountMax = 50;
            } else if ($scope.peopleCount == '2') {
                $scope.searchParams.peopleCountMin = 50;
                $scope.searchParams.peopleCountMax = 100;
            } else if ($scope.peopleCount == '3') {
                $scope.searchParams.peopleCountMin = 100;
                $scope.searchParams.peopleCountMax = 150;
            } else if ($scope.peopleCount == '4') {
                $scope.searchParams.peopleCountMin = 150;
                $scope.searchParams.peopleCountMax = 200;
            }
            $scope.getResultList();

        };
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
    .filter('auditstatus', function () {      //view 过滤器
        return function (num) {
            // console.log(arguments);
            if (!num) {
                return '待审批';
            } else if (num == 1) {
                return '通过';
            } else if (num == 2) {
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