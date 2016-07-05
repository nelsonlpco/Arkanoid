function Ball(name, context, ray, x, y, color, stroke) {
    this.name = name;
    this.context = context;
    this.ray = ray;
    this.x = x;
    this.y = y;
    this.color = color;
    this.stroke = stroke;
}
Ball.prototype = {
    draw: function() {
        var ctx = this.context;
        ctx.save();
        ctx.strokeStyle = this.stroke;
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.ray, 0, 2 * Math.PI, false);
        ctx.fill();
        ctx.stroke();
        ctx.restore();
    }
}