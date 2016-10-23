/// <reference path="core/GameOBjectBase.ts" />

class Life extends GameObjectBase{
    radius:number;
    constructor(gameContext: CanvasRenderingContext2D) {
        super(gameContext);         
        this.radius = 8;   
    }

    public draw():void{
        this.context.save();
        this.context.fillStyle = this.background;
        this.context.beginPath();        
        this.context.arc(this.coord.x, this.coord.y, this.radius, 0, 2*Math.PI);
        this.context.fill();
        this.context.restore();
    }

    public update():void{}
    public collidedWith(gamObject: GameObjectBase):void{}
    public getColliders():Array<GameObjectBase>{
        return [];
    }
}