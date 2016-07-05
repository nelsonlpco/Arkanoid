function Racket(context, name, x, y, width, height, color, stroke) {
    this.context = context;
    this.name = name;
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.color = color;
    this.stroke = stroke;
}

Racket.prototype = {
    draw: function() {
        var ctx = this.context;
        ctx.save();
        ctx.strokeStyle = this.stroke;
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x,
            this.y,
            this.width,
            this.height);
        ctx.strokeRect(this.x,
            this.y,
            this.width,
            this.height);
        ctx.restore();
    }
};