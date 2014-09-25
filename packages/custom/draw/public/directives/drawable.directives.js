'use strict';
angular.module('mean.draw').directive('drawable', ['$compile', 'drawit','coder', function ($compile, drawit, coder) {
    return {
        restrict: 'E',
        template: '<canvas style="border: 1px solid">'+
                    'Your browser doesn\'t support canvas :c, please update that shit to start receiving dicks!'+
                   '</canvas>'+
                   '<sender></sender>'+
                   '<cleaner></cleaner>',
        controller: function ($scope) {
            this.getDraw = function () {
                this.clean();
                coder.setData($scope.history);
                $scope.readonlymode();
                drawit.redraw(10);
                console.log(coder.getData());
            },
            this.clean = function () {
                $scope.target.width = $scope.target.width;
                $scope.readonlymode();
            },
            this.deepClean = function () {
                $scope.history = [];
                coder.clearData();
                $scope.target.width = $scope.target.width;
                $scope.readonlymode();
            }
        },
        link: function (scope, element) {
            var buffer = [];
            scope.target = element.contents()[0];
            drawit.init(scope.target);
            scope.history = [];
            element.bind('mousedown', onmousedown);
            scope.readonlymode = function () {
                scope.target.removeEventListener('mouseup', onmouseup);
                scope.target.removeEventListener('mousemove', onmousemove);
            }
            scope.writemode = function () {
                scope.target.addEventListener('mouseup', onmouseup);
                scope.target.addEventListener('mousemove', onmousemove);
            }
            function onmousedown (evt) {
                scope.writemode();
                drawit.targetCtx().moveTo(evt.clientX, evt.clientY);
            }
            function onmousemove (evt) {
                var x = evt.clientX,
                    y = evt.clientY;
                buffer.push({ "x": x, "y": y });
                drawit.draw(x, y);
            }
            function onmouseup (evt) {
                scope.readonlymode();
                if(buffer.length > 0) {
                    scope.history.push(buffer);
                    buffer = []; 
                } 
            }
        }
    }
}]);

angular.module('mean.draw').directive('sender', function () {
    return {
        restrict: 'E',
        require: '^drawable',
        template: '<button>Send</button>',
        link: function (scope, element, attrs, drawableCtrl) {
            element.bind('click', function () {
                drawableCtrl.getDraw();
            });
        }
    }
});

angular.module('mean.draw').directive('cleaner', function () {
    return {
        restrict: 'E',
        require: '^drawable',
        template: '<button>Clean</button>',
        link: function (scope, element, attrs, drawableCtrl) {
            element.bind('click', function () {
                drawableCtrl.deepClean();
            });
        }
    }
});