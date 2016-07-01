function Racket(context, name, point, dimension, color, stroke) {
    this.context = context;
    this.name = name;
    this.rectangle = new Rectangle(point, dimension);
    this.color = color;
    this.stroke = stroke;
}
Racket.prototype = {
    draw: function() {
        var ctx = this.context;
        ctx.save();
        ctx.strokeStyle = this.stroke;
        ctx.fillStyle = this.color;
        ctx.fillRect(this.rectangle.point.x,
            this.rectangle.point.y,
            this.rectangle.dimension.width,
            this.rectangle.dimension.height);
        ctx.strokeRect(this.rectangle.point.x,
            this.rectangle.point.y,
            this.rectangle.dimension.width,
            this.rectangle.dimension.height);
        ctx.restore();
    },
    process: function() {}
};