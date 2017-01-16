(function(angular) {
  'use strict';
  var crownModule = angular.module('crown', []);

  crownModule.directive('draggable', function($document) {
    return function(scope, element, attr) {
      var startX = 0, startY = 0, x = 0, y = 0;
      element.on('mousedown', function(e) {
        e.preventDefault();
        startX = e.screenX - x;
        startY = e.screenY - y;
        $document.on('mousemove', mousemove);
        $document.on('mouseup', mouseup);
      });

      function mousemove(e) {
        y = e.screenY - startY;
        x = e.screenX - startX;
        element.css({
          top: y + 'px',
          left:  x + 'px'
        });
      }

      function mouseup() {
        $document.off('mousemove', mousemove);
        $document.off('mouseup', mouseup);
      }
    };
  });
})(window.angular);
