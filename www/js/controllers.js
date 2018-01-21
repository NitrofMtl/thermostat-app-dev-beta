angular.module('starter.controllers', [])

main.controller("temperatureCtrl", ["$scope", "$rootScope", "$window", "$interval", "ArduinoService", function($scope, $rootScope, $window, $interval, service) {
  $rootScope.arduinoServerUrl = '';/*http://74.59.2.195:8081*/
  $rootScope.arduinoServerUrl = $window.localStorage['serverUrl'];

  var autoRefresh;
  $scope.channels = [];

  function onTabSelected() {
    $rootScope.arduinoServerUrl = $window.localStorage['serverUrl'];
  }

  $scope.options = {
    loop: false,
    //effect: 'fade',
    speed: 500,
  }
  $scope.data = {};
  $scope.$watch('data.slider', function(nv, ov) {
    $scope.slider = $scope.data.slider;
  })

  function startRefresh() {
    autoRefresh = $interval(function() {
      updateAjax();
    }, 5000);
  }


  function updateAjax() {
    service.getChannels(function(err, result) { //get json data
      if (err) {
        return alert(err);
      }
      // puis les mets dans le scope
      $scope.channels = result.channels;
    })
  };

  $scope.init = function() { //on load page first get data
    updateAjax();
    //startRefresh()
  }


  $scope.switchChannel = function($scope, channel) { // change name function
    var switchCh = {
      canal: $scope.canal,
      status: $scope.status
    }
    service.switchChannel(switchCh, function() {});
    updateAjax();
  };

  $scope.channelsClk = function($scope, channel) {
    console.log("trig");
    var chanObj = {
      setPoint: $scope.setPoint,
      name: $scope.name,
      canal: $scope.canal
    };
    service.putChannels(chanObj, function() {});
  }

  $scope.stopRefresh = function() {
    $interval.cancel(autoRefresh);
  };

  $scope.restartRefresh = function() {
    startRefresh();
  };

  $scope.$on('$ionicView.leave', function() {
    // Make sure that the interval is destroyed when leaving tab
    $scope.stopRefresh();
  });

  $scope.$onunload=function(){
      // Make sure that the interval is destroyed when leaving app
    $scope.stopRefresh();
  };

  $scope.$on('$ionicView.enter', function() {
    //star or restart interval scope update

    $scope.restartRefresh();
  });



  $scope.$on('$destroy', function() {
    // Make sure that the interval is destroyed too
    $scope.stopRefresh();
  });

}]);

main.controller('alarmCtrl', ["$scope", "$timeout", "alarmService", function($scope, $timeout, service) {

  $scope.alarms = [];
  $scope.chName =   [];
  $scope.weekTypes = ["sunday", "monday", "tuesday", "wednesday", "thursday", "Friday", "saturday", "Week", "Week end", "All days"];

  function update() {
    service.getAlarms(function(err, result) {
      if (err) {
        return alert(err);
      }
      // puis les mets dans le scope
      $scope.alarms = result.alarms;
      $scope.chName = result.chName;
    })
  };

  function onTabSelected() {
    update();
  }

  $scope.init = function() { //on load page first get data
    update();
  };

  $scope.$on('$ionicView.enter', function() {
    update();
  });

  $scope.switchAlarm = function($scope, alarm) { // change name function
    var switchAlarm = {
      switchAlarm: alarm
    }
    service.switchAlarm(switchAlarm, function() {});
    update();
  };

  $scope.alarmsClk = function($scope, index) {
    var chanObj = {
      index: index,
      data: $scope
    };
    service.putAlarms(chanObj, function() {});
    $timeout(function() {
      update()
    }, 2000);
  }
}]);

main.controller('configCtrl', ["$scope", "$timeout", "configService", function($scope, $timeout, service) {

  $scope.configs = [];
  var autoRefresh;

  function startRefresh() {
      autoRefresh = $interval(function() {
      update();
    }, 1000);
  }

  function update() {
    service.getConfigs(function(err, result) {
      if (err) {
        return alert(err);
      }
      // puis les mets dans le scope
      $scope.configs = result.configs[0];
    })
  };

  $scope.$on('$ionicView.enter', function() {
    update();
  });

  function onTabSelected() {
    update();
    startRefresh()
  }

  $scope.init = function() { //on load page first get data
    update();
    startRefresh()
  };

  $scope.stopRefresh = function() { //ng-mousedown
      $interval.cancel(autoRefresh);
  };

  $scope.restartRefresh = function() {
      startRefresh();
  };

  $scope.$on('$destroy', function() {
       // Make sure that the interval is destroyed too
    $scope.stopRefresh();
  });


  $scope.configClk = function(configs) {
    var chanObj = configs;
    console.log(chanObj)
    service.putConfigs(chanObj, function() {});
    $timeout(function() {
      update()
    }, 2000);
  }
}]);


main.controller('serverCtrl', ["$scope", "$rootScope", "$window", "$timeout", "serverService", function($scope, $rootScope, $window,  $timeout, service) {
    $scope.errorMsg = '';

    $scope.serverClk = function(newUrl) {
    $rootScope.newUrl = newUrl;
    service.headIndex(function(err) {
      if (err) {
        //return alert(err);
        $scope.errorMsg = 'Server not responding! Check your address or server status.';
      }
      else {
        $rootScope.arduinoServerUrl = $rootScope.newUrl;
        $window.localStorage['serverUrl'] = $rootScope.arduinoServerUrl;
        $scope.errorMsg = '';
      }
    })
  }

}]);