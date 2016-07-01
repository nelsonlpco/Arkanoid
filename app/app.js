(function(window, document) {
    var canvas = document.querySelector('#mainCanvas');
    var context = canvas.getContext('2d');

    var ball = new Ball(context, "ball", 10, new Point(20, 20), 'blue', 'black');


    var racket = new Racket(context, "play1", new Point(50, 50), new Dimension(50, 10), 'green', 'yellow');

    var game = new GameLoop(context);
    game.addGameObject(ball);
    game.addGameObject(racket);
    game.play();


}(window, document));