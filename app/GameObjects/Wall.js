var Wall = function(context, name, rows, columns) {
    this.context = context;
    this.name = name;
    this.columns = columns;
    this.rows = rows;
    this.bricks = this.createWall();
};

Wall.prototype = {
    createWall: function() {
        var tileWidth = this.context.canvas.width / this.columns - 50;
        var tileHeight = this.context.canvas.height / this.columns - 80;
        var row = 0;
        var column = 0;
        var bricks = [];
        for (; row < this.rows; row++) {
            for (; column < this.columns; column++) {
                var brick = new Brick(this.context, 'brick' + row, (column * tileWidth) + column * 50, (row * tileHeight) + row * 30, tileWidth, tileHeight);
                bricks.push(brick);
            }
            column = 0;
        }
        return bricks;
    },
    draw: function() {
        for (var i = 0, size = this.bricks.length; i < size; i++) {
            this.bricks[i].draw();
        }
    }
};