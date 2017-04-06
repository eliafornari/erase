angular.module('myApp')
.controller('zineCtrl', ['$rootScope', '$location', '$routeParams','$scope', '$http', ($rootScope, $location, $routeParams, $scope, $http)=>{

$rootScope.Zine={};
$rootScope.firstLoading=false;

$scope.getSingle=()=>{

  $http({
  method: 'GET',
  url: '/api/prismic/get/single?type=zine&uid='+$routeParams.zine
    }).then(function (response) {
      $rootScope.Zine=response.data;
      $rootScope.Zine.current={
        url: $rootScope.Zine.data['zine.page'].value[0].image.value.main.url,
        index: 0
      }
      // called asynchronously if an error occurs
      // or server returns response with an error status.
    }, function (error) {
      console.log(error);
      console.log("second");


    });



}

$scope.getSingle();







// $rootScope.thisZine =()=>{
//   for(var i in $rootScope.Feed){
//     if($rootScope.Feed[i].uid == $routeParams.zine){
//       $rootScope.Zine=$rootScope.Feed[i];
//
//       $rootScope.Zine.current={
//         url: $rootScope.Feed[i].data['zine.page'].value[0].image.value.main.url,
//         index: 0
//       }
//     }
//   }
// }

// if($rootScope.Feed){
//   $rootScope.thisZine();
// }else{
//   $rootScope.$on('dataReady', function(){
//     $rootScope.thisZine();
//   })
// }



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
