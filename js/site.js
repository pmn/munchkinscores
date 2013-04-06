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

    $scope.setDisplayName = function() {
        var user = munchkinRef.child('users/'+ $scope.userid);
        user.child('displayname').set($scope.txtDisplayname);
    };
}

function GameCtrl($rootScope, $scope, $route, $routeParams, angularFire){
    var url = firebaseUrl + $routeParams.name;
    
    $scope.joinGame = function() {
        // Join the game
        $scope.joined = true;
    };
}

app.config(['$routeProvider', function ($routeProvider){
    $routeProvider.
        when('/g/:name', { templateUrl: 'tmpl/game.html', controller: GameCtrl }).
        when('/', { templateUrl: 'tmpl/home.html', controller: HomeCtrl }).
        otherwise({ redirectTo: '/' });
}]);

app.run(['$rootScope', '$location', 'angularFire', function (scope, $location, angularFire){
    scope.authClient = new FirebaseAuthClient(munchkinRef, function(err, result) {
      if (result) {
        // Get the user's username from firebase. If it doesn't exist, allow the user to choose one
        scope.userid = result.id;
        var user = munchkinRef.child('users/'+result.id);

        if (user.child('displayname')) {
            var displayname = munchkinRef.child('users/'+result.id + "/displayname");
            displayname.once('value', function(snapshot) {
                scope.displayname = snapshot.val();
            });
        }

        scope.setName(result.email);
      }
    });

    scope.setName = function(username) {
        // Set the user's name
        scope.username = username;
    };

    if (scope.userid) {
        var user = munchkinRef.child('users/' + scope.userid);
        if (user.child('displayname')) {
            var displayname = user.child('displayname');
            displayname.once('value', function(snapshot){
                scope.displayname = snapshot.val();
                console.log('displayname stet')
            });
        };
    }
}]);