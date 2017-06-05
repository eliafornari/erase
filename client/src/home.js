angular.module('myApp')
.controller('homeCtrl',['$rootScope', '$location', '$window', '$scope','anchorSmoothScroll', ($rootScope, $location, $window, $scope, anchorSmoothScroll)=>{


$scope.isSplash = true;


$rootScope.enter=function(){
  $rootScope.firstLoading = false;
  $scope.$apply();
}


$scope.thisFlip=(index, max)=>{
  if(index>=(max-1)){
    return 0
  }else{
    return index+1
  }
}


  $rootScope.splashScroll=0;
  $rootScope.windowHeight = $window.innerHeight;

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
