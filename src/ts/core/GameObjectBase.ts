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

    constructor(context: CanvasRenderingContext2D) {
        this.background = this.randomColor();
        this.size = new Size(20, 20);
        this.coord = new Coord2D(0, 0);
        this.context = context;        
    }

    public randomColor(): string {
        var r = Math.floor(Math.random() * 255);
        var g = Math.floor(Math.random() * 255);
        var b = Math.floor(Math.random() * 255);
        return 'rgb(' + r + ',' + g + ',' + b + ')';
    }

    abstract update(): void;
    abstract draw(): void;
    abstract collidedWith(object: GameObjectBase): void;
    abstract getColliders(): Array<BoxCollider>;
}