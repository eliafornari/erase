import jQuery from "jquery";
import angular from 'angular'
import 'angular-route'
import 'angular-animate'
import 'angular-resource'
import Prismic from 'prismic.io'



angular.module('myApp', ["ngRoute", "ngAnimate", "ngResource"])
.run(['$rootScope', '$location','$route', '$templateCache',($rootScope, $location, $route, $templateCache)=>{

    var original = $location.path;
    $location.path = function (path, reload) {
        if (reload === false) {
            var lastRoute = $route.current;
            var un = $rootScope.$on('$locationChangeSuccess', function () {
                $route.current = lastRoute;
                un();
            });
        }
        else if (reload === true){

          var currentPageTemplate = $route.current.templateUrl;
            $templateCache.remove(currentPageTemplate);

        var un = $rootScope.$on('$locationChangeSuccess', function () {
              $route.current = '/';
              un();
              $route.reload();
          });
        }
        return original.apply($location, [path]);
    };

}])

.service('anchorSmoothScroll', function(){

    this.scrollTo = function(eID) {

        // This scrolling function
        // is from http://www.itnewb.com/tutorial/Creating-the-Smooth-Scroll-Effect-with-JavaScript

        var startY = currentYPosition();
        var stopY = elmYPosition(eID);
        var distance = stopY > startY ? stopY - startY : startY - stopY;
        if (distance < 100) {
            scrollTo(0, stopY); return;
        }
        var speed = Math.round(distance / 100);
        if (speed >= 20) speed = 20;
        var step = Math.round(distance / 25);
        var leapY = stopY > startY ? startY + step : startY - step;
        var timer = 0;
        if (stopY > startY) {
            for ( var i=startY; i<stopY; i+=step ) {
                setTimeout("window.scrollTo(0, "+leapY+")", timer * speed);
                leapY += step; if (leapY > stopY) leapY = stopY; timer++;
            } return;
        }
        for ( var i=startY; i>stopY; i-=step ) {
            setTimeout("window.scrollTo(0, "+leapY+")", timer * speed);
            leapY -= step; if (leapY < stopY) leapY = stopY; timer++;
        }

        function currentYPosition() {
            // Firefox, Chrome, Opera, Safari
            if (self.pageYOffset) return self.pageYOffset;
            // Internet Explorer 6 - standards mode
            if (document.documentElement && document.documentElement.scrollTop)
                return document.documentElement.scrollTop;
            // Internet Explorer 6, 7 and 8
            if (document.body.scrollTop) return document.body.scrollTop;
            return 0;
        }

        function elmYPosition(eID) {
            var elm = document.getElementById(eID);
            var y = elm.offsetTop;
            var node = elm;
            while (node.offsetParent && node.offsetParent != document.body) {
                node = node.offsetParent;
                y += node.offsetTop;
            } return y;
        }

    };

})


.config(['$routeProvider', '$locationProvider', ($routeProvider, $locationProvider) => {

  // use the HTML5 History API
  $locationProvider.html5Mode(true);
  $routeProvider



    /*............................. Take-all routing ........................*/




    .when('/feed/zine/:zine', {
      templateUrl: 'views/zine.html',
      controller: 'zineCtrl'
    })

    .when('/feed/project/:project', {
      templateUrl: 'views/about.html',
      controller: 'projectCtrl'
    })

    .when('/feed/media/:media', {
      templateUrl: 'views/media.html',
      controller: 'mediaCtrl'
    })

    .when('/contact', {
      templateUrl: 'views/contact.html',
      controller: 'contactCtrl'
    })

    .when('/about', {
      templateUrl: 'views/about.html',
      controller: 'aboutCtrl'
    })


    .when('/', {
      templateUrl: 'views/home/home.html',
      controller: 'homeCtrl'

    })


    // put your least specific route at the bottom
    .otherwise({redirectTo: '/'})



}]) //config


.filter('trustUrl', ['$sce', function ($sce) {
  return function(url) {
    // if (url){
      var trusted = $sce.trustAsResourceUrl(url);
      return trusted;
    // }
  };
}])




.controller('appCtrl', ['$rootScope', '$location', '$window', '$timeout', '$http', 'anchorSmoothScroll', '$scope', 'check', ($rootScope, $location, $window, $timeout, $http, anchorSmoothScroll, $scope, check)=>{



$rootScope.firstLoading = true;
$rootScope.isChrome = false;
$scope.isWrong = false;

  $rootScope.retrieveElement = function(id){
    var element = angular.element(document.querySelectorAll("#"+id)[0]);
    return element
  }




$rootScope.Feed;

$rootScope.getContentType = function(type, orderField, page){

      Prismic.Api('https://erase.cdn.prismic.io/api', function (err, Api) {
          Api.form('everything')
              .ref(Api.master())
              .query(Prismic.Predicates.at("document.type", type))
              .orderings('['+orderField+']')
              .pageSize(page)
              .submit(function (err, response) {

                  var Data = response;
                  // if (type =='styling'){
                    $rootScope.Feed = response;
                    $rootScope.$broadcast('dataReady');
                    // $rootScope.$apply();
                  // }
                  console.log(Data);


                  // The documents object contains a Response object with all documents of type "product".
                  var page = response.page; // The current page number, the first one being 1
                  var results = response.results; // An array containing the results of the current page;
                  // you may need to retrieve more pages to get all results
                  var prev_page = response.prev_page; // the URL of the previous page (may be null)
                  var next_page = response.next_page; // the URL of the next page (may be null)
                  var results_per_page = response.results_per_page; // max number of results per page
                  var results_size = response.results_size; // the size of the current page
                  var total_pages = response.total_pages; // the number of pages
                  var total_results_size = response.total_results_size; // the total size of results across all pages
                    return results;
                    $rootScope.$apply();
              });
        });


};

$rootScope.getContentType('feed', 'my.feed.date desc', 0);






  //MOBILE


  $rootScope.windowHeight= $window.innerHeight;
  $rootScope.half_windowHeight = $window.innerHeight/2;
    jQuery($window).resize(function(){
      $rootScope.windowHeight = $window.innerHeight;
      $rootScope.half_windowHeight = $window.innerHeight/2;
      $rootScope.checkSize();
      $scope.landscapeFunction();

      // $rootScope.checkSize();
        $rootScope.$apply();
    });


  //remove logo on scroll
  $rootScope.logoCorner=false;
  $rootScope.showDetail=false;


      //....this is the function that checks the header of the browser and sees what device it is
      $rootScope.isMobile, $rootScope.isDevice, $rootScope.isMobileDevice;
      $rootScope.checkSize = function(){
          $rootScope.checkDevice = {
                Android: function() {
                    return navigator.userAgent.match(/Android/i);
                },
                BlackBerry: function() {
                    return navigator.userAgent.match(/BlackBerry/i);
                },
                iOS: function() {
                    return navigator.userAgent.match(/iPhone|iPad|iPod/i);
                },
                Opera: function() {
                    return navigator.userAgent.match(/Opera Mini/i);
                },
                Windows: function() {
                    return navigator.userAgent.match(/IEMobile/i);
                },
                any: function() {
                    return ($rootScope.checkDevice.Android() || $rootScope.checkDevice.BlackBerry() || $rootScope.checkDevice.iOS() || $rootScope.checkDevice.Opera() || $rootScope.checkDevice.Windows());
                }
            };

          //........checks the width
            $scope.mobileQuery=window.matchMedia( "(max-width: 767px)" );
            $rootScope.isMobile=$scope.mobileQuery.matches;

          //.........returning true if device
            if ($scope.checkDevice.any()){
              $rootScope.isDevice= true;
            }else{
                $rootScope.isDevice=false;
            }

            if (($rootScope.isDevice==true)&&($scope.isMobile==true)){
              $rootScope.isMobileDevice= true;
            }else{
                $rootScope.isMobileDevice=false;
            }




              if ($rootScope.isDevice){
                  $rootScope.mobileLocation = function(url){
                    $location.path(url).search();
                  }
                  $rootScope.mobileExternalLocation = function(url){
                    $window.open(url, '_blank');
                  }
              } else if (!$rootScope.isDevice){
                  $rootScope.mobileLocation = function(url){
                    return false;
                  }
                  $rootScope.mobileExternalLocation = function(url){
                    return false;
                  }
              }

        }//checkSize
        $rootScope.checkSize();
        $rootScope.landscapeView = false;

       //function removing website if landscape

        $scope.landscapeFunction = function(){

          if ($rootScope.isMobile==true){
              if(window.innerHeight < window.innerWidth){
                $rootScope.landscapeView = true;
                // $rootScope.pageLoading = true;
              //   $(".landscape-view-wrapper").css({
              //     "width":"100vw",
              //     "height": "100vh",
              //     "display": "block"
              // });
              }else{
                $rootScope.landscapeView = false;
                $rootScope.pageLoading = false;
              }
          }
        }

      $scope.landscapeFunction();







}])// end of appCtrl



.directive('logoDirective', function() {
  return {
    restrict: 'E',
    templateUrl: 'views/components/logo.html',
    replace: true,
    link: function(scope, elem, attrs) {

    }
  };
})

.directive('splashDirective', function() {
  return {
    restrict: 'E',
    templateUrl: 'views/home/splash.html',
    replace: true,
    link: function(scope, elem, attrs) {

    }
  };
});



// var jquerymousewheel = require('./vendor/jquery.mousewheel.js')($);
var jqueryUI = require('./vendor/jquery-ui.min.js');
var service = require("./service.js");
var nav = require("./nav.js");
var home = require("./home.js");
var about = require("./about.js");
var contact = require("./contact.js");
var zine = require("./zine.js");
