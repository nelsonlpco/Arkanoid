(function(window, document) {
    var canvas = document.querySelector('#mainCanvas');
    var context = canvas.getContext('2d');

    var ball = new Ball("ball", context, 10, new Point(20,20), 'blue', 'black');
    ball.draw();
}(window, document));