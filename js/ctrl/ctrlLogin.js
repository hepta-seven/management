/**
 * Created by Ramirez on 3/28/2017.
 */
angular.module('myApp.ctrl')
    .controller('loginCtrl', ['$state', '$scope', 'loginService', function ($state, $scope, loginService) {
        $scope.login = function () {
            loginService.userLogin($scope.user.name, $scope.user.password).then(function (res) {
                if (!res.data.result) {
                    $scope.wrongInfo = '用户名或密码错误';
                } else {
                    console.log(res);
                    // $rootScope.loginfo = res.data.result.user;
                    sessionStorage.setItem('logInfo', JSON.stringify(res.data.result));
                    $state.go('dashboard');
                }
            }, function (res) {
                console.log('获取失败');
            });
        };
    }]);