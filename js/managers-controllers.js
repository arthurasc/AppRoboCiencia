var cList = null;
var mList = null;
var uList = null;

// exibiçao de páginas

app.controller('manager-view', function($scope, $rootScope){

    dir = 'pages/managers/schools.html';
    $rootScope.dir = dir;

});

// método do menu

app.controller('manager-options', function($scope, $rootScope){

    $scope.navigation = function(X)
    {
        $rootScope.dir = 'pages/managers/' + X;
    }

});

// inserção e exclusão de escolas

app.controller('schools-controller', function($scope, $http){

    $scope.schools = [];
    $scope.classes = [];

    $http.get('http://robociencia.com.br/app-folder/libs/managers/get-all-schools.php').success(function(data){
        $scope.schools = data;
    });

    $scope.deleteSchool = function(X, Y)
    {
        navigator.notification.confirm(
            'A operação não poderá ser desfeita, deseja continuar?',
            function(index)
            {
                if(index == 2)
                {
                    $http.get('http://robociencia.com.br/app-folder/libs/managers/delete-school.php?i=' + X).success(function(){
                        $scope.schools.splice(Y, 1);
                    });
                }
            },
            'Exclusão de escola',
            ['cancelar', 'tudo bem, entendi']
        );
    }

    $scope.addSchool = function() {

        $http.get('http://robociencia.com.br/app-folder/libs/managers/addSchool.php?s=' + $scope.name + '&r=' + $scope.respons + '&t=' + $scope.tele).success(function(){

            $scope.name = "";
            $scope.respons = "";
            $scope.tele = "";

            navigator.notification.alert(
                'Operação concluída',
                null,
                'Cadastro de escolas',
                'tudo bem, entendi'
            );

            $http.get('http://robociencia.com.br/app-folder/libs/managers/get-all-schools.php').success(function(data){
                $scope.schools = data;
            });

        });

    }

});

// iserção e exclusão de classes

app.controller('classes-manager', function($scope, $http){

    $http.get('http://robociencia.com.br/app-folder/libs/managers/get-all-schools.php').success(function(data){
        $scope.schools = data;
    });

    $scope.changeSelectedItem = function(X)
    {
        $scope.school = X;
        $http.get('http://robociencia.com.br/app-folder/libs/managers/get-class-of-school.php?s=' + $scope.school).success(function(data){
            $scope.classes = data;
        });
    }

    $scope.addClass = function()
    {
        $http.get('http://robociencia.com.br/app-folder/libs/managers/addClass.php?s=' + $scope.school + '&c=' + $scope.class).success(function(data){

            $scope.class = "";
            $scope.classes = data;

            navigator.notification.alert(
                'Operação concluída',
                null,
                'Cadastro de turmas',
                'tudo bem, entendi'
            );

        });
    }

    $scope.removeClass = function(X, Y)
    {
        navigator.notification.confirm(
            'A operação não poderá ser desfeita, deseja continuar?',
            function(index)
            {
                if(index == 2)
                {
                    $http.get('http://robociencia.com.br/app-folder/libs/managers/delete-class.php?i=' + X).success(function(){
                        $scope.classes.splice(Y, 1);
                    });
                }
            },
            'Exclusão de escola',
            ['cancelar', 'tudo bem, entendi']
        );
    }

});

// inserção e exclusão de usuários

app.controller('users-manager', function($scope, $http){
    
    $scope.users = [];

    $http.get('http://robociencia.com.br/app-folder/libs/managers/get-delete-add-users.php?get').success(function(data){
        $scope.users = data;
    });

    $scope.changeSelectedItem = function(X)
    {
        $scope.levelAccess = X;
    }

    $scope.addUser = function()
    {
        $http.get('http://robociencia.com.br/app-folder/libs/managers/get-delete-add-users.php?u=' + $scope.user + '&a=' + $scope.levelAccess).success(function(data){

            $scope.user = "";
            $scope.users = data;

            navigator.notification.alert(
                'Operação realizada com sucesso.',
                null,
                'Cadastro de usuário',
                'tudo bem, entendi'
            );

        });
    }

    $scope.removeUser = function(X, Y)
    {
        navigator.notification.confirm(
            'A operação não poderá ser desfeita, deseja continuar?',
            function(index)
            {
                if(index == 2)
                {
                    $http.get('http://robociencia.com.br/app-folder/libs/managers/get-delete-add-users.php?i=' + X).success(function(){
                        $scope.users.splice(Y, 1);
                    });
                }
            },
            'Exclusão de usuário',
            ['cancelar', 'tudo bem, entendi']
        );
    }

});

// inserção e exclusão de aulas

app.controller('lessons-manager', function($scope, $http){

    $scope.lessons = [];

    $http.get('http://robociencia.com.br/app-folder/libs/managers/get-delete-add-lessons.php?get=true').success(function(data){
        $scope.lessons = data;
    });

    $scope.changeSelectedItem = function(X)
    {
        $scope.levelLessons = X;
    }

    $scope.addLesson = function()
    {
        $http.get('http://robociencia.com.br/app-folder/libs/managers/get-delete-add-lessons.php?l=' + $scope.lesson + '&n=' + $scope.levelLesson).success(function(data){

            navigator.notification.alert(
                'Operação realizada com sucesso.',
                function(){
                    $scope.lesson = "";
                    $scope.lessons = data;
                },
                'Cadastro de aula',
                'tudo bem, entendi'
            );

        });
    }

    $scope.removeLesson = function(X, Y)
    {
        navigator.notification.confirm(
            'A operação não poderá ser desfeita, deseja continuar?',
            function(index)
            {
                if(index == 2)
                {
                    $http.get('http://robociencia.com.br/app-folder/libs/managers/get-delete-add-lessons.php?i=' + X).success(function(){
                        $scope.lessons.splice(Y, 1);
                    });
                }
            },
            'Exclusão de aula',
            ['cancelar', 'tudo bem, entendi']
        );
    }

});

// // inserção e exclusão de cronogramas

app.controller('schedule-manager', function($scope, $http, $rootScope){

    $scope.months = [
                        {'value' : '1', 'month' : 'Janeiro'},
                        {'value' : '2', 'month' : 'Fevereiro'},
                        {'value' : '3', 'month' : 'Março'},
                        {'value' : '4', 'month' : 'Abril'},
                        {'value' : '5', 'month' : 'Maio'},
                        {'value' : '6', 'month' : 'Junho'},
                        {'value' : '7', 'month' : 'Julho'},
                        {'value' : '8', 'month' : 'Agosto'},
                        {'value' : '9', 'month' : 'Setembro'},
                        {'value' : '10', 'month' : 'Outubro'},
                        {'value' : '11', 'month' : 'Novembro'},
                        {'value' : '12', 'month' : 'Dezembro'}
                    ];

    $http.get('http://robociencia.com.br/app-folder/libs/managers/get-delete-add-lessons.php?get').success(function(data){
        $scope.lessons = data;
    });

    $http.get('http://robociencia.com.br/app-folder/libs/managers/get-all-schools.php').success(function(data){
        $scope.schools = data;
    });

    $http.get('http://robociencia.com.br/app-folder/libs/managers/get-delete-add-users.php?get').success(function(data){
        $scope.users = data;
    });

    $scope.changeSelectedItem = function(X, Y)
    {
        if(Y == 'user')
        {
            $scope.usersList = X;
            uList = $scope.usersList;
        }
        else if(Y == 'school')
        {
            $http.get('http://robociencia.com.br/app-folder/libs/managers/get-class-of-school.php?s=' + X).success(function(data){
                $scope.classes = data;
            });
        }
        else if(Y == 'month')
        {
            $scope.monthList = X;
            mList = $scope.monthList;
        }
        else if(Y == 'class')
        {
            $scope.classList = X;
            cList = $scope.classList;
        }
    }

    $scope.addLessonInSchedule = function(X, Y)
    {

        navigator.notification.confirm(
            'Tem certeza de que deseja adicionar a aula ao cronograma do professor na situação a cima?',
            function(index)
            {
                if(index == 2)
                {
                    $http.get('http://robociencia.com.br/app-folder/libs/managers/add-in-schedule.php?c=' + $scope.classList + '&u=' + $scope.usersList + '&l=' + X).success(function(){
                        $scope.lessons.splice(Y, 1);
                    });
                }
            },
            'Montagem do cronograma',
            ['cancelar', 'tudo bem, entendi']
        );

    }

    $scope.readSchedule = function(X)
    {
        $rootScope.dir = 'pages/managers/' + X;
    }

});

app.controller('read-schedule-controller', function($scope, $http){

    $scope.userLessons = [];

    $http.get('http://robociencia.com.br/app-folder/libs/managers/get-delete-schedule.php?u=' + uList + '&c=' + cList + '&m=' + mList).success(function(data){
        $scope.userLessons = data;
    });

    $scope.removeLesson = function(X, Y)
    {
        navigator.notification.confirm(
            'Tem certeza de que deseja excluir a aula do cronograma do professor?',
            function(index)
            {
                if(index == 2)
                {
                    $http.get('http://robociencia.com.br/app-folder/libs/managers/get-delete-schedule.php?u=' + X).success(function(data){
                        $scope.userLessons.splice(Y, 1);
                    });
                }
            },
            'Alteração do cronograma',
            ['cancelar', 'tudo bem, entendi']
        );
    }

});