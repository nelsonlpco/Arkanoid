var Brick = function(context, name, x, y, width, height) {
    this.context = context;
    this.name = name;
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.color = this.createColor();
};
Brick.prototype = {
    createColor: function() {
        var r = Math.floor((Math.random() * 254));
        var g = Math.floor((Math.random() * 254));
        var b = Math.floor((Math.random() * 254));
        return 'rgb(' + r + ',' + g + ',' + b + ')';
    },
    draw: function() {
        var ctx = this.context;
        ctx.save();
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
        ctx.restore();
    },
    onCollisionEnter: function(gameObject) {

    }
};