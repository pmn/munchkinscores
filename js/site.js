var app = angular.module('app', ['firebase']);

var munchkinRef = "http://munchkinscores.firebaseio.com";
var authClient = new FirebaseAuthClient(munchkinRef, function(error, user) {
  if (!error) {
    // Success!
  }
});

app.controller('HomeCtrl', ['$scope', 'angularFire',
    function HomeCtrl($scope, angularFire) {
        var url = "http://munchkinscores.firebaseio.com/games";
        $scope.games = angularFire(url, $scope, 'games');

        $scope.login = function() {
            authClient.login('persona');
        };
    }
]);