var app = angular.module('app', ['ngRoute', 'ngAnimate']).filter('unique', function () {

    return function (items, filterOn) {

        if (filterOn === false) {
            return items;
        }

        if ((filterOn || angular.isUndefined(filterOn)) && angular.isArray(items)) {
            var hashCheck = {}, newItems = [];

            var extractValueToCompare = function (item) {
                if (angular.isObject(item) && angular.isString(filterOn)) {
                    return item[filterOn];
                } else {
                    return item;
                }
            };

            angular.forEach(items, function (item) {
                var valueToCheck, isDuplicate = false;

                for (var i = 0; i < newItems.length; i++) {
                    if (angular.equals(extractValueToCompare(newItems[i]), extractValueToCompare(item))) {
                        isDuplicate = true;
                        break;
                    }
                }
                if (!isDuplicate) {
                    newItems.push(item);
                }

            });
            items = newItems;
        }
        return items;
    };
});

var dir = 'pages/teachers/schedule.html';
var user = null;

app.config(function($routeProvider){

    $routeProvider
        .when('/', {templateUrl : 'pages/login.html'})
        .when('/teachers', {templateUrl : 'pages/teachers/teacher-options.html'})
        .when('/managers', {templateUrl : 'pages/managers/options.html'})
        .when('/parents', {templateUrl : 'pages/parents/parents-options.html'})
        .otherwise({redirectTo : 'pages/login.html'});

});

app.controller('login-controller', function($scope, $http, $location){

    $scope.login = function()
    {
        $http.get('http://robociencia.com.br/app-folder/libs/auth.php?u=' + $scope.user + '&p=' + $scope.pass).success(function(data){

            if(Object.keys(data).length  > 0)
            {

                user = data[0].id;

                if($scope.pass == '0000')
                {
                    navigator.notification.prompt(
                        'Este é seu primeiro acesso, por favor, nos informe sua nova senha',
                        function(X){
                            if(X.buttonIndex == 2)
                            {
                                $http.get('http://robociencia.com.br/app-folder/libs/set-pass.php?i=' + user + '&p=' + X.input1).success(function(){
                                    navigator.notification.alert(
                                        'Sua senha foi salva, utilize-a ao logar em sua próxima sessão',
                                        null,
                                        'Primeiros passos',
                                        'tudo bem, entendi'
                                    );
                                });
                            }
                        },
                        'Criação de senha',
                        ['cancelar','tudo bem, entendi'],
                        'digite sua senha aqui'
                    );
                }

                switch(data[0].level)
                {
                    case '1':
                        $location.path('/managers');
                        break;
                    case '2':
                        dir = 'pages/teachers/schedule.html';
                        $location.path('/teachers');
                        break;
                    case '3':
                        $location.path('/parents');
                        user = $scope.pass;
                        break;
                }
            }
            else
            {
                $scope.user = "";
                $scope.pass = "";

                navigator.notification.alert(
                    'Por favor, verifique seus dados e tente novamente',
                    null,
                    'Dados inválidos',
                    'tudo bem, entendi'
                );

            }
        });
    }

});


function setDataFormat(X)
{
    return X.split('-')[2] + '-' + X.split('-')[1] + '-' + X.split('-')[0];
}