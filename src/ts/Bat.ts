/// <reference path="./Core/GameObjectBase.ts" />


class Bat extends GameObjectBase {

    /**
     *
     */
    constructor(gameContext: CanvasRenderingContext2D) {
        super(gameContext);
        this.coord.x = this.calcCenter();
        this.coord.y = this.context.canvas.height - 90;
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
        (<Ball>gameObject).vy *= -1;
        (<Ball>gameObject).update();
    }

    getColliders():Array<BoxCollider>{      
        return [new BoxCollider(this.coord, this.size)];
    }
}