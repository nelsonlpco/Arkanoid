/// <reference path="./core/GameObjectBase.ts" />
class Tile extends GameObjectBase {
    life: number;

    constructor(context: CanvasRenderingContext2D, coord: Coord2D, size: Size) {
        super(context);
        this.coord = coord;
        this.size = size;
        this.life = 1;
    }

    draw(): void {
        this.context.save();
        this.context.fillStyle = this.background;
        this.context.fillRect(this.coord.x, this.coord.y, this.size.width, this.size.height);
        this.context.fill();
        this.context.restore();
    }
    update(): void {

    }

    collidedWith(gameObject: GameObjectBase): void {        
        this.collider.removeObject(this);
        this.life -= 1;
        let ball = (<Ball>gameObject);
        if(ball.vy < 0)
            ball.vy *= -1;      
        else
            ball.vx *= -1;  
        ball.update();
    }

    getColliders(): Array < BoxCollider > {
        return [new BoxCollider(this.coord, this.size)];
    }
}