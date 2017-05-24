/**
 * Created by 陈腾飞 on 2017/4/5.
 */
//数据统计数据调取
angular.module('myApp.ctrl')
    .controller('statisticsCtrl', ['$state', '$scope', 'statisticsService', '$filter', function ($state, $scope, statisticsService, $filter) {
        var loginfo = JSON.parse(sessionStorage.getItem('logInfo'));
        var myChart = echarts.init(document.getElementById('main'));
        // 指定图表的配置项和数据
        var option = {
            color: ['red', '#3398DB'],
            // title: {
            //     text: '临汾经济技术开发区',
            //     subtext: '婚丧事宜申报'
            // },
            tooltip: {
                trigger: 'axis',
                axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                    type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                }
            },
            legend: {
                data: ['婚嫁', '丧葬']
            },
            calculable: true,
            xAxis: [
                {
                    type: 'category',
                    data: []
                }
            ],
            yAxis: [
                {
                    type: 'value'
                }
            ],
            series: [
                {
                    name: '婚嫁',
                    type: 'bar',
                    data: []
                },
                {
                    name: '丧葬',
                    type: 'bar',
                    data: []
                }
            ]
        };
        $scope.searchParams = {
            eventCreateTimeFrom: '',
            eventCreateTimeTo: '',
            eventTimeFrom: '',
            eventTimeTo: ''
        };
        $scope.searchTime = {
            token: loginfo.token,
            eventCreateTimeFrom: '',
            eventCreateTimeTo: '',
            eventTimeFrom: '',
            eventTimeTo: ''
        };
        $scope.getData = function () {
            $scope.searchTime.eventCreateTimeFrom = $filter('date')($scope.searchParams.eventCreateTimeFrom, 'yyyy-MM-dd');
            $scope.searchTime.eventCreateTimeTo = $filter('date')($scope.searchParams.eventCreateTimeTo, 'yyyy-MM-dd');
            $scope.searchTime.eventTimeFrom = $filter('date')($scope.searchParams.eventTimeFrom, 'yyyy-MM-dd');
            $scope.searchTime.eventTimeTo = $filter('date')($scope.searchParams.eventTimeTo, 'yyyy-MM-dd');
            statisticsService.statistics($scope.searchTime).then(function (res) {
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
                    $scope.gain = res.data.result;
                    option.xAxis[0].data = [];
                    option.series[0].data = [];
                    option.series[1].data = [];
                    for (var i = 0; i < $scope.gain.length; i++) {
                        option.xAxis[0].data.push($scope.gain[i].orgName);
                        option.series[0].data.push($scope.gain[i].type1Count);
                        option.series[1].data.push($scope.gain[i].type2Count);
                    }
                    // 使用刚指定的配置项和数据显示图表。
                    myChart.setOption(option);
                }
            });
        };
        $scope.getData();
        $(window).resize(function () {
            console.log(123);
            myChart.resize();
        });
    }]);






















