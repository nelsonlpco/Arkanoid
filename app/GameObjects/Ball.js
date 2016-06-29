function Ball(name, context, ray, point, color, stroke) {
    this.name = name;
    this.context = context;
    this.ray = ray;
    this.point = point;
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
        ctx.arc(this.point.x, this.point.y, this.ray, 0, 2 * Math.PI, false);
        ctx.fill();
        ctx.stroke();
        ctx.restore();
    }
}