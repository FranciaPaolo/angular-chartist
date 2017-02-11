angular
  .module('chartistAngularDirective', [])
  .directive('ngChartist', ngChartist);

ngChartist.$inject = ['$compile','$timeout'];

function ngChartist($compile, $timeout) {
  return {
    scope: {
      data: '=',
      options: '@',
      responsiveOptions: '@',
      type: '@',
      id: '@',
      animate: '@'
    },
    link: link,
    restrict: 'EA'
  };

  function link(scope) {

    var options=JSON.parse(scope.options);
    var graph = Chartist[scope.type]('#' + scope.id, scope.data, options, scope.responsiveOptions);

    // set watcher for future data updates
    scope.$watch('data', function(newValue, oldValue) {
      if(newValue === oldValue) {
        return;
      }
      graph.update(scope.data, options, true);
      
      graph.on('draw', function (data) {
          if(data.type === 'slice' && scope.animate=='true') {
            // Get the total path length in order to use for dash array animation
            var pathLength = data.element._node.getTotalLength();

            // Set a dasharray that matches the path length as prerequisite to animate dashoffset
            data.element.attr({
              'stroke-dasharray': pathLength + 'px ' + pathLength + 'px'
            });

            // Create animation definition while also assigning an ID to the animation for later sync usage
            var animationDefinition = {
              'stroke-dashoffset': {
                id: 'anim' + data.index,
                dur: 400,
                from: -pathLength + 'px',
                to:  '0px',
                easing: Chartist.Svg.Easing.easeOutElastic,//Chartist.Svg.Easing.easeOutQuint,
                // We need to use `fill: 'freeze'` otherwise our animation will fall back to initial (not visible)
                fill: 'freeze'
              }
            };

            // If this was not the first slice, we need to time the animation so that it uses the end sync event of the previous animation
            if(data.index !== 0) {
              animationDefinition['stroke-dashoffset'].begin = 'anim' + (data.index - 1) + '.end';
            }

            // We need to set an initial value before the animation starts as we are not in guided mode which would do that for us
            data.element.attr({
              'stroke-dashoffset': -pathLength + 'px'
            });

            // We can't use guided mode as the animations need to rely on setting begin manually
            // See http://gionkunz.github.io/chartist-js/api-documentation.html#chartistsvg-function-animate
            data.element.animate(animationDefinition, false);
          }
      });// end chart.on draw
    }, true);// end watch data

    // set watcher for future options update
    scope.$watch('options', function(newValue, oldValue) {
      if(newValue === oldValue) {
        return;
      }
      graph.update(scope.options, true);
    }, true);
  }
}