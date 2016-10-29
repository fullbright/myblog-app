(function(){
  var app = angular.module('blogapp', ['ionic', 'ui.gravatar']);

  app.run(function($ionicPlatform) {
    $ionicPlatform.ready(function() {
      if(window.cordova && window.cordova.plugins.Keyboard) {
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

        cordova.plugins.Keyboard.disableScroll(true);
      }
      if(window.StatusBar) {
        StatusBar.styleDefault();
      }
    });
  })

  app.controller('mycontroller', function($scope, $http, $ionicModal){
    // $scope.articles = [
    //   {
    //     title: "Happy new year 2016",
    //     date: "1-1-2016",
    //     extract : "Yeh ! A new year !!!",
    //     likes: 3,
    //     comments: 6,
    //     thumbnails: "http://lorempixel.com/400/200/sports/1/",
    //     author: "afanousergio@yahoo.fr",
    //   },
    //   {
    //     title: "My first great article",
    //     date: "7-5-2016",
    //     extract : "Yes ! My first article on the blog",
    //     likes: 1,
    //     comments: 0,
    //     thumbnails: "http://lorempixel.com/400/200/sports/2/",
    //     author: "afanousergio@yahoo.fr",
    //   }
    // ];

    // Create a modal to display the settings
    $ionicModal.fromTemplateUrl('template/settings.html', function(modal){
      $scope.settings = modal;
    }, {
      scope: $scope,
      animation: 'slide-in-up',
    });

    // This function will show the settings page
    $scope.settingsClick = function(){
      $scope.settings.show();
    };

    // This function will hide the settings page
    $scope.settingsClose = function(){
      $scope.settings.hide();
    };

    $scope.wordpress = {
      show: true,
    };

    var blogUrl = "http://sergio.afanou.com/wp-json/posts?filter[category_name]=mobile";

    $scope.wordpress.useWordpress = function(){        
      $scope.articles = [];

      $http
        .get(blogUrl)
        .success(function(response){
          console.log("Receiving response from wordpress api : ", response, status);
          angular.forEach(response, function(child){
            console.log(child);
            $scope.articles.push(child);
          });
        })
        .error(function(response, status){
          console.log("Error while receiving the response. " + status + response);
        });

    };

    $scope.wordpress.useWordpress();

  });

  angular.module('ui.gravatar').config([
    'gravatarServiceProvider', function(gravatarServiceProvider) {
      gravatarServiceProvider.defaults = {
        size     : 100,
        "default": 'mm'  // Mystery man as default for missing avatars
      };

      // Use https endpoint
      gravatarServiceProvider.secure = true;

      // Force protocol
      gravatarServiceProvider.protocol = 'http';

      // Override URL generating function
      // gravatarServiceProvider.urlFunc = function(options) {
      //   // Code to generate custom URL
      // };
    }
  ]);

}());


