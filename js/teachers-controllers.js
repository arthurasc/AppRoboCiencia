var lastId = 0;
var alunoAtual = 0;

app.controller('teacher-menu', function($scope, $http, $rootScope){

    $scope.dir = dir;
    $scope.students = [];
    $scope.classesLessons = [];
    $scope.lessons = [];
    $scope.data = [];
    $scope.schoolSchedule;
    $scope.lesson;
    $scope.class;

    if(dir == 'pages/teachers/schedule.html')
    {
        $http.get('http://robociencia.com.br/app-folder/libs/teachers/get-schools.php?u=' + user).success(function(data){
            $scope.data = data;
        });
    }

    $scope.startLesson = function()
    {
        $scope.students = [];
        $http.get('http://robociencia.com.br/app-folder/libs/teachers/get-students.php?c=' + $scope.class + '&l=' + $scope.lesson).success(function(data){
            $scope.students = data;
            $scope.dir = 'pages/teachers/attendance-list.html';
        });
    }

    $scope.readAttendances = function(X)
    {
        $scope.students = [];
        $http.get('http://robociencia.com.br/app-folder/libs/teachers/get-attendances.php?c=' + X).success(function(data){

            for(var i=0; i<Object.keys(data).length; i++)
            {
                data[i].data = setDataFormat(data[i].data);
            }

            $scope.students = data;
            $scope.dir = 'pages/teachers/presence-list.html';
        });
    }

    $scope.confirmPresence = function(X, Y)
    {

        var obj = document.getElementById('stu' + Y);

        alunoAtual = Y;

        if(obj.getElementsByTagName('button')[0].className == 'button button-balanced')
        {
            navigator.notification.confirm(
                'Tem certeza de que deseja confirmar a presença deste aluno?',
                function(X)
                {
                    if(X == 2)
                    {
                        $http.get('http://robociencia.com.br/app-folder/libs/teachers/insert-presence.php?u=' + user + '&s=' + Y + '&l=' + $scope.lesson).success(function(data){
                            lastId = data;
                            obj.style.background = '#2ecc71';
                            obj.getElementsByTagName('button')[0].className = 'button button-assertive';
                            obj.getElementsByTagName('i')[0].className = 'icon ion-ios-close-outline';
                            document.getElementsByClassName('addStarsAndObs')[0].style.display = 'block';
                        });
                    }
                },
                'Confirmar presença?',
                ['cancelar', 'tudo bem, entendi']
            );
        }
        else
        {
            navigator.notification.confirm(
                'Tem certeza de que deseja remover a presença deste aluno?',
                function(X)
                {
                    if(X == 2)
                    {
                        $http.get('http://robociencia.com.br/app-folder/libs/teachers/remove-attendance.php?i=' + lastId).success(function() {
                            obj.style.background = '#fff';
                            obj.getElementsByTagName('button')[0].className = 'button button-balanced';
                            obj.getElementsByTagName('i')[0].className = 'icon ion-ios-checkmark-outline';
                        });
                    }
                },
                'Confirmar presença?',
                ['cancelar', 'tudo bem, entendi']
            );
        }

    }

    $scope.changeSelectedItem = function(X, Y){

        if(Y == 'class')
        {
            $scope.class = X;
        }
        else if(Y == 'lesson')
        {
            $scope.lesson = X;
        }
        else if(Y == 'school')
        {
            $scope.classesLessons = [];
            $http.get('http://robociencia.com.br/app-folder/libs/teachers/get-class-lesson.php?u=' + user + '&s=' + X).success(function(data){
                $scope.classesLessons = data;
            });
        }
        else if(Y == 'schoolSchedule')
        {
            $scope.classesLessons = [];
            $scope.schoolSchedule = X;
            $http.get('http://robociencia.com.br/app-folder/libs/teachers/get-class-lesson.php?u=' + user + '&s=' + X + '&m=' + $scope.month).success(function(data){
                $scope.classesLessons = data;
            });
        }
        else if(Y == 'addStudent')
        {
            $scope.classesLessons = [];
            $http.get('http://robociencia.com.br/app-folder/libs/teachers/get-class-lesson.php?u=' + user + '&s=' + X).success(function(data){
                $scope.classesLessons = data;
            });
        }
        else if(Y == 'month')
        {
            $scope.month = X;
        }
        else if(Y == 'addStudentClass')
        {
            $scope.addStudentClass = X;
        }
    }

    $scope.teacherPages = function(X)
    {
        if(X == 'Vistos')
        {
            $scope.dir = 'pages/teachers/lessons-done.html';
        }
        else if(X == 'Chamada')
        {
            $scope.dir = 'pages/teachers/schedule.html';
            $scope.classesLessons = [];
        }
        else if(X == 'Cronograma')
        {
            $scope.dir = 'pages/teachers/class-schedule.html';
        }
        else if(X == 'Novo')
        {
            $scope.dir = 'pages/teachers/add-student.html';
        }
    }

});

app.controller('add-student', function($scope, $http){
    $scope.AddStudent = function()
    {
        var req = "http://robociencia.com.br/app-folder/libs/teachers/addStudent.php?n=" + $scope.sName +
            "&ph=" + $scope.sTelefone +
            "&c=" + $scope.addStudentClass +
            "&y=1" +
            "&np=" + $scope.sResponsi +
            "&pp=" + $scope.sResTel;

        $http.post(req).success(function(data){

            $scope.sName = "";
            $scope.sTelefone = "";
            $scope.sResponsi = "";
            $scope.sResTel = "";

            navigator.notification.alert(
                'Operação concluída',
                null,
                'Cadastro de alunos',
                'tudo bem, entendi'
            );

        });
    }
});

app.controller('lessons-done-controller', function($scope, $http){

    $scope.schools = [];
    $scope.classes = [];

    $http.get('http://robociencia.com.br/app-folder/libs/teachers/get-schools.php?u=' + user).success(function(data) {
        $scope.schools = data;
    });

    $scope.changeItem = function(X, Y)
    {

        $scope.lessons = [];

        switch(Y)
        {
            case 's':
                    $http.get('http://robociencia.com.br/app-folder/libs/teachers/get-class-lesson.php?u=' + user + '&s=' + X).success(function(data) {
                        $scope.classes = data;
                    });
                break;
            case 'c':
                    $http.get('http://robociencia.com.br/app-folder/libs/teachers/get-lessons-day.php?u=' + user + '&c=' + X).success(function(data) {

                        for(var i = 0; i < Object.keys(data).length; i++)
                        {
                            data[i].data = setDataFormat(data[i].data);
                        }

                        $scope.lessons = data;
                    });
                break;
        }
    }

});

app.controller('parents-controller', function($scope, $http){

    $scope.dir = 'pages/parents/attendance-list-parent.html';
    $scope.presences = [];

    $http.get('http://robociencia.com.br/app-folder/libs/parents/get-students-presence.php?u=' + user).success(function(data){
        $scope.presences = data;
    });

});

app.controller('stars-controller', function($scope, $http, $rootScope){

    $scope.stars = 0;

    $scope.starSelect = function(X)
    {
        $scope.stars = parseInt(X);
    }

    $scope.sendStars = function()
    {
        $http.get('http://robociencia.com.br/app-folder/libs/teachers/add-stars.php?i=' + $rootScope.selectStudent + '&o=' + $scope.obs + '&s=' + $scope.stars).success(function(){
            document.getElementsByClassName('addStarsAndObs')[0].style.display = 'none';
            $scope.stars = 0;
            $scope.obs = "";

            navigator.notification.alert(
                'Operação concluída',
                null,
                'Confirmação de presenças',
                'tudo bem, entendi'
            );

        });
    }

});