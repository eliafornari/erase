angular.module('myApp')
.controller('zineCtrl', ['$rootScope', '$location', '$routeParams','$scope', ($rootScope, $location, $routeParams, $scope)=>{

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
    }
  }
}

if($rootScope.Feed){
  $rootScope.thisZine();
}else{
  $rootScope.$on('dataReady', function(){
    $rootScope.thisZine();
  })
}



$scope.nextZine=(index)=>{
  var next;
  if(index<$rootScope.Zine.data['zine.page'].value.length-1){
    next = index+1;
  }else{next = 0}
  $rootScope.Zine.current.url=$rootScope.Zine.data['zine.page'].value[next].image.value.main.url;
  $rootScope.Zine.current.index=next;


}

$scope.prevZine=(index)=>{
  var prev;
  if(index>0){
    prev = index-1;
  }else{prev = $rootScope.Zine.data['zine.page'].value.length-1}
  $rootScope.Zine.current.url=$rootScope.Zine.data['zine.page'].value[prev].image.value.main.url;
  $rootScope.Zine.current.index=prev;
}






}]);
