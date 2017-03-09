angular.module('myApp')
.controller('stylingCtrl', ($rootScope, $location, $window, $timeout, $http, anchorSmoothScroll, $scope, $anchorScroll, $interval, check, transformRequestAsFormPost, $routeParams)=>{


$rootScope.getContentType('styling', 'my.shoot.date desc');


$rootScope.$on('stylingReady', function(){
  console.log("stylingReady is ready");

    $rootScope.findStyle();
})


$rootScope.Style=[];

console.log("styleCtrl");





$rootScope.findStyle=()=>{

    if($routeParams.style){

      for (var i in $rootScope.Styling){

        console.log($rootScope.Styling[i].slug);
        if($routeParams.style == $rootScope.Styling[i].slug){

          $rootScope.Style=$rootScope.Styling[i];
          console.log($rootScope.Style);

        }
      }

    }

};





  $rootScope.findStyle();

  $rootScope.$on('$routeChangeSuccess', function(){
    $rootScope.findStyle();

  });



});
