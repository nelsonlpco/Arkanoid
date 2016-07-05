(function(window, document) {
    var canvas = document.querySelector('#mainCanvas');
    var context = canvas.getContext('2d');

    var wall = new Wall(context, 'wall', 4, 4);
    wall.draw();
}(window, document));