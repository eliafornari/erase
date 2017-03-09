angular.module('myApp')
.controller('zineCtrl', ($rootScope, $location, $window, $timeout, $http, anchorSmoothScroll, $scope, $anchorScroll, $interval, check, transformRequestAsFormPost, $routeParams)=>{

$rootScope.Zine={};
$rootScope.firstLoading=false;
$rootScope.thisZine =()=>{
  for(var i in $rootScope.Feed){
    if($rootScope.Feed[i].uid == $routeParams.zine){
      $rootScope.Zine=$rootScope.Feed[i];
      $rootScope.Zine.current={
        url: $rootScope.Feed[i].data['zine.page'].value[0].image.value.main.url,
        index: 0
      }
      console.log($rootScope.Zine.current);
    }
  }
}

if($rootScope.Feed){
  $rootScope.thisZine();
  console.log("data is here", $rootScope.Feed);
}else{
  console.log("wait for the data");
  $rootScope.$on('dataReady', function(){
    console.log("data hereee");
    $rootScope.thisZine();
  })
}



$scope.nextZine=(index)=>{
  var next;
  if(index<$rootScope.Zine.data['zine.page'].value.length-1){
    next = index+1;
  }else{next = 0}
  console.log(next);

  $rootScope.Zine.current.url=$rootScope.Zine.data['zine.page'].value[next].image.value.main.url;
  $rootScope.Zine.current.index=next;


}






});
