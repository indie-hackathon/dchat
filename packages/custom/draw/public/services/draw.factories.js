'use strict';
draw.factory('drawit', ['coder', function (coder) {
    var sketches = [],
        ctx,
        element,
        sketchIndex = 0,
        drawIndex = 1,
        draweable;
    function move () {
        ctx.moveTo(arguments[0], arguments[1]);
    }

    function sketchRoutine (drawer, speed) {
        if(sketches.length > sketchIndex) {
            draweable = sketches[sketchIndex];
            move(draweable[0].x, draweable[0].y)
            drawer.draw(draweable.x, draweable.y);
            drawIndex++;
            drawRoutine(drawer, draweable, speed);
        } else {
            sketchIndex = 0;
            drawIndex = 1;
        }
    }
    function drawRoutine (drawer, draweable, speed) {
        if(drawIndex < draweable.length) {
            setTimeout(function () {
                var nextSketch = draweable[drawIndex];
                drawer.draw(nextSketch.x, nextSketch.y);
                drawIndex++;
                drawRoutine(drawer, draweable, speed);
            }, speed);
        } else {
            drawIndex = 1;
            sketchIndex++;
            sketchRoutine(drawer, speed);
        }
    }
    return {
        hasSketches: function () {
            return sketches.length > 0;
        },
        draw: function () {
            var x = arguments[0],
                y = arguments[1];
            ctx.lineTo(x, y);
            ctx.stroke();
        },
        redraw: function () {
            var isSketching = false,
                speed = arguments[0] || 100;
            sketches = coder.getData();
            if(this.hasSketches && !isSketching) {
                isSketching = true;
                ctx.beginPath();
                sketchRoutine(this, speed);
            }
        },
        inject: function () {
            sketches = Array.prototype.slice.call(arguments[0], 0);
        },
        init: function (el) {
            if(el.tagName === 'CANVAS' || el.tagName === 'canvas') {
                element = el;
                element.width = arguments[1] || 300;
                element.height = arguments[2] || 150;
                ctx = el.getContext('2d');
            } else {
                throw 'Not a canvas element';
            }
        },
        clear: function () {
            sketches = [];
        },
        targetCtx: function () { 
            return ctx; 
        }
    }
}]);

draw.factory('coder', function () {
    var encoder = function () {
            return btoa(JSON.stringify(arguments[0]));
        },
        decoder = function () {
            return JSON.parse(atob(data));
        },
        data;
        function dataCleaner () {
            data = [];
        }
    return {
        setData: function () {
            data = encoder(arguments[0]);
        },
        getData: function () {
            return decoder(arguments[0]);
        },
        clearData: function () {
            dataCleaner();
        }
    }
});