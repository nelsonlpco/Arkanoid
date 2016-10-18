/// <reference path="GameObjectBase.ts"/>
/// <reference path="IgameObjectRenderer.ts"/>
class Ball extends GameObjectBase implements IGameObjectRenderer {
    raio: number;

    constructor(gameContext: CanvasRenderingContext2D, raio: number) {
        super(gameContext);
        this.raio = raio;
    }

    draw(): void {        
        this.context.save();
        this.context.fillStyle = this.background;
        this.context.beginPath();
        this.context.arc(this.coord.x, this.coord.y, this.raio, 0, 2 * Math.PI);
        this.context.fill();
        this.context.restore();
    }

    animate(): void {

    }
}