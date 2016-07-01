function Ball(context, name, ray, point, color, stroke) {
    this.name = name;
    this.context = context;
    this.circle = new Circle(ray, point);
    this.color = color;
    this.stroke = stroke;
    this.vx = 1;
    this.vy = 1;
}
Ball.prototype = {
    draw: function() {
        var ctx = this.context;
        ctx.save();
        ctx.strokeStyle = this.stroke;
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.circle.point.x, this.circle.point.y, this.circle.ray, 0, 2 * Math.PI, false);
        ctx.fill();
        ctx.stroke();
        ctx.restore();
    },
    process: function() {
        if (this.circle.point.x < this.circle.ray || this.circle.point.x > (this.context.canvas.width - this.circle.ray))
            this.vx *= -1;
        if (this.circle.point.y < this.circle.ray || this.circle.point.y > (this.context.canvas.height - this.circle.ray))
            this.vy *= -1;
        this.circle.point.x += this.vx;
        this.circle.point.y += this.vy;
    }
}