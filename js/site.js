var app = angular.module('app', ['firebase']);

var firebaseUrl = "http://munchkinscores.firebaseio.com/";
var munchkinRef = new Firebase(firebaseUrl);

function HomeCtrl($rootScope, $scope, $location, angularFire) {
    var url = firebaseUrl + "games";
    $scope.games = angularFire(url, $scope, 'games');

    $scope.authClient = new FirebaseAuthClient(munchkinRef, function(err, user) {
      if (user) {
        $scope.setName(user.email);
      }
    });

    $scope.login = function() {
        // Authorize the user
        $scope.authClient.login('persona');
    };

    $scope.setName = function(username) {
        // Set the user's name
        $rootScope.username = username;
    };

    $scope.newgame = function() {
        // Generate a new game. 
        var gameName = generateName();
        $location.path("/g/" + gameName);
    };
}


function GameCtrl($rootScope, $scope, $route, $routeParams, angularFire){
    var url = firebaseUrl + $routeParams.name;
    $scope.username = $rootScope.username;
}


app.config(['$routeProvider', function ($routeProvider){
    $routeProvider.
        when('/g/:name', { templateUrl: 'tmpl/game.html', controller: GameCtrl }).
        when('/', { templateUrl: 'tmpl/home.html', controller: HomeCtrl }).
        otherwise({ redirectTo: '/' });
}]);
