function GameLoop(context) {
    this.context = context;
    this.gameObjects = [];
    this.isPlaing = false;
}
GameLoop.prototype = {
    addGameObject: function(gameObject) {
        this.gameObjects.push(gameObject)
    },
    play: function() {
        this.isPlaing = !this.isPlaing;
        this.mainLoop();
    },
    mainLoop: function() {
        var vm = this;
        if (vm.isPlaing) {
            vm.clearScreen();
            vm.render();
            vm.update();
            window.requestAnimationFrame(function() {
                vm.mainLoop();
            });
        }
    },
    clearScreen: function() {
        var ctx = this.context;
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    },
    render: function() {
        for (var i = 0, size = this.gameObjects.length; i < size; i++) {
            this.gameObjects[i].draw();
        }
    },
    update: function() {
        for (var i = 0, size = this.gameObjects.length; i < size; i++) {
            this.gameObjects[i].process();
        }
    }
};