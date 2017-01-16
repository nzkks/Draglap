(function(angular) {
  'use strict';
  var crownModule = angular.module('crown', []);

  crownModule.directive('draglap', function($document) {
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

        var box1 = $('.box1'), box2 = $('.box2');

        var side = overlapUs(box1, box2);

        if(side == 'top'){box1.addClass('bbc');box2.addClass('btc');}
        else{box1.removeClass('bbc');box2.removeClass('btc');}

        if(side == 'right'){box1.addClass('blc');box2.addClass('brc');}
        else{box1.removeClass('blc');box2.removeClass('brc');}

        if(side == 'bottom'){box1.addClass('btc');box2.addClass('bbc');}
        else{box1.removeClass('btc');box2.removeClass('bbc');}

        if(side == 'left'){box1.addClass('brc');box2.addClass('blc');}
        else{box1.removeClass('brc');box2.removeClass('blc');}

      }

      function mouseup() {
        $document.off('mousemove', mousemove);
        $document.off('mouseup', mouseup);
      }

      function overlapUs(b1, b2){
        var b1Offset = b1.offset(),
            b2Offset = b2.offset();

        var dx = (b1Offset.left + b1.innerWidth() / 2) - (b2Offset.left + b2.innerWidth() / 2),
            dy = (b1Offset.top + b1.innerHeight() / 2) - (b2Offset.top + b2.innerHeight() / 2);

        var width = (b1.innerWidth() + b2.innerWidth()) / 2,
            height = (b1.innerHeight() + b2.innerHeight()) / 2;

        var crossWidth = width * dy,
            crossHeight = height * dx;

        var overlapSide = 'none';

        if(Math.abs(dx) <= width && Math.abs(dy) <= height){
          if(crossWidth > crossHeight){
            overlapSide = (crossWidth > (-crossHeight)) ? 'bottom' : 'left';
          }else{
            overlapSide = (crossWidth >- (crossHeight)) ? 'right' : 'top';
          }
        }
        return(overlapSide);
      }

    };
  });
})(window.angular);
