angular.module('starter.services', [])

main.service('ArduinoService', ['$http', '$rootScope', function($http, $rootScope) {
  return {
    getChannels: function(cb) {
      $http.get($rootScope.arduinoServerUrl + '/ajax_inputs')
        .success(function(result) {
          cb(null, result);
        });
    },
    switchChannel: function(switchCh, cb) {
      $http.put($rootScope.arduinoServerUrl + '/switch', {
          switchCh
        })
        .success(function(result) {
          cb(null, true);
        });
    },

    putChannels: function(channels, cb) {
      $http.put($rootScope.arduinoServerUrl + '/channels', {
          channels
        })
        .success(function(result) {
          cb(null, true);
        });
    }
  };
}])


main.service('alarmService', ['$http', '$rootScope', function($http, $rootScope) {
  return {
    getAlarms: function(cb) {
      $http.get($rootScope.arduinoServerUrl + '/ajax_alarms')
        .success(function(result) {
          cb(null, result);
        });
    },
    switchAlarm: function(switchAlarm, cb) {
      $http.put($rootScope.arduinoServerUrl + '/switchAlarms', {
          switchAlarm
        })
        .success(function(result) {
          cb(null, true);
        });
    },

    putAlarms: function(alarms, cb) {
      $http.put($rootScope.arduinoServerUrl + '/alarms', {
          alarms
        })
        .success(function(result) {
          cb(null, true);
        });
    }
  }
}]);

main.service('configService', ['$http', '$rootScope', function($http, $rootScope) {
  return {
    getConfigs: function(cb) {
      $http.get($rootScope.arduinoServerUrl + '/configs')
        .success(function(result) {
          cb(null, result);
        });
    },

    putConfigs: function(config, cb) {
      $http.put($rootScope.arduinoServerUrl + '/configs', {
          config
        })
        .success(function(result) {
          cb(null, true);
        });
    }
  }
}]);

main.service('serverService', ['$http', '$rootScope', function($http, $rootScope) {
  return {  
    headIndex: function(err) {
      $http.head($rootScope.newUrl + '/')
        .success(function(result) {
          err(false);
        })
        .error(function(result){
          err(true);
        })
    }

  }
}]);