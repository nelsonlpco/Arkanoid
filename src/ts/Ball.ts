/// <reference path="./Core/GameObjectBase.ts"/>
/// <reference path="./core/Coord2D.ts" />
/// <reference path="./Core/BoxCollider.ts"/>

class Ball extends GameObjectBase {
    raio: number;
    vx:number = 1;
    vy:number = 1;
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

        var cp = this.getColliders()[0];

        this.context.save();
        this.context.strokeStyle = 'yellow';        
        this.context.strokeRect(cp.coord.x, cp.coord.y, cp.size.height, cp.size.width);
        this.context.stroke();
        this.context.restore();
    }

    update(): void {        
        let w = this.context.canvas.width;
        let h = this.context.canvas.height;

        if(this.coord.x < this.raio || this.coord.x + this.raio > w)
            this.vx *= -1;
        if(this.coord.y < this.raio || this.coord.y + this.raio > h)
            this.vy *= -1;
        this.coord.x += this.vx;
        this.coord.y += this.vy;  
    }

    collidedWith(object: GameObjectBase):void{
                
    }

    getColliders():Array<BoxCollider>{
        let c = new Coord2D(this.coord.x - this.raio, this.coord.y - this.raio);        
        return [new BoxCollider(c, new Size(this.raio*2, this.raio*2))];
    }
}