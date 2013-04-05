var app = angular.module('app', ['firebase']);

var firebaseUrl = "http://munchkinscores.firebaseio.com/";
var munchkinRef = new Firebase(firebaseUrl);

function HomeCtrl($scope, $location, angularFire) {
    var url = firebaseUrl + "games";
    $scope.games = angularFire(url, $scope, 'games', []);

    $scope.login = function() {
        // Authorize the user
        $scope.authClient.login('persona');
    };

    $scope.newgame = function() {
        // Generate a new game. 
        var gameName = generateName();
        $scope.games.push({name: gameName, created: new Date() });
        $location.path("/g/" + gameName);
    };
}

function GameCtrl($rootScope, $scope, $route, $routeParams, angularFire){
    var url = firebaseUrl + $routeParams.name;
}

app.config(['$routeProvider', function ($routeProvider){
    $routeProvider.
        when('/g/:name', { templateUrl: 'tmpl/game.html', controller: GameCtrl }).
        when('/', { templateUrl: 'tmpl/home.html', controller: HomeCtrl }).
        otherwise({ redirectTo: '/' });
}]);

app.run(['$rootScope', '$location', function (scope, $location){
    scope.authClient = new FirebaseAuthClient(munchkinRef, function(err, user) {
      if (user) {
        // Get the user's username from firebase. If it doesn't exist, allow the user to choose one
        scope.setName(user.email);
      }
    });

    scope.setName = function(username) {
        // Set the user's name
        scope.username = username;
    };
}]);