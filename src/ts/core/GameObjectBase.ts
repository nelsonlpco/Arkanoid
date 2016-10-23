/// <reference path="./Size.ts" />
/// <reference path="./Coord2D.ts" />
/// <reference path="./Animator.ts" />
/// <reference path="./Collider.ts" />
/// <reference path="./BoxCollider.ts" />

abstract class GameObjectBase {
    size: Size;
    coord: Coord2D;
    background: string;
    context: CanvasRenderingContext2D;
    animator: Animator;
    collider: Collider;   
    id: number;

    constructor(context: CanvasRenderingContext2D) {
        this.background = this.randomColor();
        this.size = new Size(20, 20);
        this.coord = new Coord2D(0, 0);
        this.context = context;        
    }

    public randomColor(): string {
        var r = Math.floor(Math.random() * 255) + 5;
        var g = Math.floor(Math.random() * 255) + 5 ;
        var b = Math.floor(Math.random() * 255) + 5;
        return 'rgb(' + r + ',' + g + ',' + b + ')';
    }

    public calcCenter():number{
        return (this.context.canvas.width / 2 - this.size.width / 2) - this.size.width / 2;
    }


    abstract update(): void;
    abstract draw(): void;
    abstract collidedWith(gameObject: GameObjectBase): void;
    abstract getColliders(): Array<BoxCollider>;
}