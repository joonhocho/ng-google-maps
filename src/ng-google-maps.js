/* global angular */
angular.module('jun.google.maps', [])

.provider('$maps', function () {
  'use strict';

  var svc = this,
    $q, $window, $timeout;

  /*
   * Initialization
   */

  svc.$get = [
    '$window', '$timeout', '$q',
    function ($$window, $$timeout, $$q) {
      $q = $$q;
      $window = $$window;
      $timeout = $$timeout;
      return svc;
    }
  ];

  svc.loading = false;
  svc.loaded = false;
  svc.options = {};

  var mapsProm;

  svc.load = function () {
    if (!mapsProm) {
      var win = $window,
        deferred = $q.defer();

      var cbName = 'googleMapsAsyncInit';

      win[cbName] = function () {
        win[cbName] = null;

        svc.loading = false;
        svc.loaded = true;
        svc.maps = win.google.maps;

        $timeout(function () {
          deferred.resolve(svc.maps);
        });
      };

      (function loadScript(doc) {
        var script = doc.createElement('script');
        script.type = 'text/javascript';
        script.src = 'https://maps.googleapis.com/maps/api/js' +
          '?key=' + svc.options.key +
          '&callback=' + cbName +
          (svc.options.lib ? '&libraries=' + svc.options.lib : '');
        script.onerror = script.onabort = function (e) {
          deferred.reject(e);
        };
        doc.body.appendChild(script);
      })(win.document);

      svc.loading = true;

      mapsProm = deferred.promise;
    }
    return mapsProm;
  };

});
