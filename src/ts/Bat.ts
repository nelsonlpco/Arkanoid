/// <reference path="GameObjectBase.ts" />
/// <reference path="IGameObjectRenderer.ts" />

class Bat extends GameObjectBase implements IGameObjectRenderer{    
        draw():void{
            this.context.save();
            this.context.fillStyle = this.background;
            this.context.fillRect(this.coord.x, this.coord.y, this.size.width, this.size.height);
            this.context.fill();
            this.context.restore();
        }
        animate():void{

        }
}