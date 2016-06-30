function Ball(name, context, ray, point, color, stroke) {    
    this.name = name;
    this.context = context;
    this.circle = new Circle(ray, point, color, stroke);    
}
Ball.prototype = {
    draw: function() {
        var ctx = this.context;    
        ctx.save();
        ctx.strokeStyle = this.circle.stroke;
        ctx.fillStyle = this.circlr.color;
        ctx.beginPath();
        ctx.arc(this.circle.point.x, this.circle.point.y, this.circle.ray, 0, 2 * Math.PI, false);
        ctx.fill();
        ctx.stroke();
        ctx.restore();
    }
}