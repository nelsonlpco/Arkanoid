/// <reference path="GameObjectBase.ts" />
/// <reference path="IGameObjectRenderer.ts" />
class Tile extends GameObjectBase implements IGameObjectRenderer {
    life: number;

    draw(): void {
        this.context.save();
        this.context.fillStyle = this.background;
        this.context.fillRect(this.coord.x, this.coord.y, this.size.width, this.size.height);
        this.context.fill();
        this.context.restore();
    }
    animate(): void {

    }
}