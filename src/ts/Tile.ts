/// <reference path="./core/GameObjectBase.ts" />
class Tile extends GameObjectBase {
    life: number;

    constructor(context: CanvasRenderingContext2D, coord: Coord2D, size: Size) {
        super(context);
        this.coord = coord;
        this.size = size;
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

        collidedWith(object: GameObjectBase): void {

    }

        getColliders(): Array < BoxCollider > {
        return [new BoxCollider(this.coord, this.size)];
    }
}