/// <reference path="./Core/GameObjectBase.ts"/>
/// <reference path="./core/Coord2D.ts" />
/// <reference path="./Core/BoxCollider.ts"/>

class Ball extends GameObjectBase {
    radius: number;
    vx: number = 3;
    vy: number = 2;
    constructor(gameContext: CanvasRenderingContext2D, radius: number) {
        super(gameContext);
        this.radius = radius;
    }

    public draw(): void {
        this.context.save();
        this.context.fillStyle = this.background;
        this.context.beginPath();
        this.context.arc(this.coord.x, this.coord.y, this.radius, 0, 2 * Math.PI);
        this.context.fill();
        this.context.restore();
    }

    public update(): void {
        let w = this.context.canvas.width;
        let h = this.context.canvas.height;
        if (this.coord.x < this.radius || this.coord.x + this.radius > w)
            this.vx *= -1;
        if (this.coord.y < this.radius || this.coord.y + this.radius > h)
            this.vy *= -1;
        this.coord.x += this.vx;
        this.coord.y += this.vy;
    }

    public collidedWith(gameObject: GameObjectBase): void {}

    public getColliders(): Array<BoxCollider> {
        let c = new Coord2D(this.coord.x - this.radius, this.coord.y - this.radius);
        return [new BoxCollider(c, new Size(this.radius * 2, this.radius * 2))];
    }
}