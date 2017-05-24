/**
 * Created by Ramirez on 3/28/2017.
 */
angular.module('myApp.ctrl')
    .controller('dashboardCtrl', ['$state', '$scope', function ($state, $scope) {
        if (!sessionStorage.getItem('logInfo')) {
            $state.go('login');
        } else {
            //设置路由默认加载页面
            // $state.go('dashboard.supervise');
            $scope.loginfomation = JSON.parse(sessionStorage.getItem('logInfo'));
        }
        $scope.logout = function () {
            sessionStorage.removeItem('logInfo');
            $state.go('login');
        };
        <!-- Simplify -->
        $.getScript("js/jquery.slimscroll.min.js");
        $.getScript("js/simplify/simplify.js");
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
        var loginfo = JSON.parse(sessionStorage.getItem('logInfo'));
        // console.log(loginfo.user.role.functions);
        for (var i = 0; i < loginfo.user.role.functions.length; i++) {
            for (var j = 0; j < $scope.rolePermissionInfo.length; j++) {
                if (loginfo.user.role.functions[i].code == $scope.rolePermissionInfo[j].code) {
                    $scope.rolePermissionInfo[j].isHavePermission = true;
                }
            }
        }
        // console.log($scope.rolePermissionInfo);
    }]);