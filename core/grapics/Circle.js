function Circle(context,color, ray, point){
	this.context = context;
	this.color = color;
	this.ray = ray;
	this.point = point;
}

Circle.prototype = {
	draw: function(){
		var ctx = this.context;
		ctx.save();
		ctx.fillStyle = this.color;
		ctx.beginPath();
		ctx.arc(this.point.x, this.point.y, this.ray, 2 * Math.pi, 0);
		ctx.fill();
		ctx.restore();
	}
};