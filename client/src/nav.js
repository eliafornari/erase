angular.module('myApp')


.controller('navCtrl', function($scope, $location, $rootScope, $routeParams, $timeout,	$http){

  $rootScope.isNavOpen = false;
  $rootScope.showNav = false;

  $rootScope.openNav = function(){
    $rootScope.showNav = !$rootScope.showNav;
  }

  $rootScope.closeNav = function(){
    $rootScope.showNav = false;
  }

  $rootScope.isLocation= (location)=>{
    if ($location.path()==location){
      return true;
    }else{return false;}
  }


  $rootScope.isFeed=true;



  $scope.$on('$routeChangeSuccess', function(){
    console.log($location.path());
    if($location.path() != '/'){
      console.log('not home');
        $rootScope.pageLoading = false;
    }
    if($scope.getFirstPath()=='' || $scope.getFirstPath()=='zine' || $scope.getFirstPath()=='project' || $scope.getFirstPath()=='media'){
      $rootScope.isFeed=true;
    }else {$rootScope.isFeed=false;}
    setTimeout(function(){
      $rootScope.pageLoading = false;
      $rootScope.$apply();
    }, 1000);
  })


  $scope.getFirstPath=()=>{
    var first = $location.path();
    first.indexOf(1);
    first.toLowerCase();
    first = first.split("/")[1];
    return first;
  }

  $scope.getSecondPath=()=>{
    var first = $location.path();
    first.indexOf(1);
    first.toLowerCase();

    first = first.split("/")[2];
    return first;
  }

  $scope.getThirdPath=()=>{
    var first = $location.path();
    first.indexOf(1);
    first.toLowerCase();

    first = first.split("/")[3];
    return first;
  }


})



.directive('navDirective', function($rootScope, $location, $window, $routeParams, $timeout) {
  return {
    restrict: 'E',
    templateUrl: 'views/components/nav.html',
    replace: true,
    link: function(scope, elem, attrs) {

    }
  };
});
