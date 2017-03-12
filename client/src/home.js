angular.module('myApp')
.controller('homeCtrl',['$rootScope', '$location', '$window', '$scope','anchorSmoothScroll', ($rootScope, $location, $window, $scope, anchorSmoothScroll)=>{


$scope.isSplash = true;


$rootScope.enter=function(){
  $rootScope.firstLoading = false;
  $scope.$apply();
}


  $rootScope.splashScroll=0;
  $rootScope.windowHeight = $window.innerHeight;
  // if ($rootScope.isMobile && $rootScope.isDevice){
  //   $rootScope.firstLoading = false;
  //   $rootScope.windowHeight = $window.innerHeight + 60;
  // }else{


    angular.element($window).bind("scroll", function() {


        var scroll = this.pageYOffset;
        $rootScope.splashScroll = scroll;


        if(scroll>=$rootScope.windowHeight){
          $rootScope.firstLoading = false;
          angular.element($window).unbind("scroll");
        }


        $scope.$apply();
    });


  // }


  $rootScope.removeSplashMobile = false;

  $rootScope.scrollToHome = function(){
    anchorSmoothScroll.scrollOneViewport();
    $rootScope.removeSplashMobile = true;

  }






}]);
