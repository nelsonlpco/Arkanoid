///<reference path="Bat.ts"/>
///<reference path="Ball.ts"/>
///<reference path="./core/Animator.ts"/>
///<reference path="./core/Collider.ts"/>

class Game{
    gameCanvas : HTMLCanvasElement;
    gameContext: CanvasRenderingContext2D;
    ball: Ball;
    bat: Bat;
    animator: Animator;
    collider: Collider;

    public constructor(gameCanvas: HTMLCanvasElement){        
        this.gameContext = gameCanvas.getContext("2d");
        this.animator = new Animator(this.gameContext);
        this.ball = new Ball(this.gameContext, 10);
        this.ball.coord.x = 100;
        this.ball.coord.y = 100;
        this.ball.draw();

        var ball2 = new Ball(this.gameContext, 10);
        ball2.coord.x = 150;
        ball2.coord.y = 100;
        

        this.bat = new Bat(this.gameContext);
        this.bat.coord.x = 200;
        this.bat.coord.y = 300;        
        this.bat.draw();

        this.animator.addGameObject(this.ball);
        this.animator.addGameObject(ball2);
        this.animator.addGameObject(this.bat);


        this.collider = new Collider();
        this.collider.addGameObject(this.ball);
        this.collider.addGameObject(ball2);

        this.animator.addtaskes(this.collider);

        this.animator.play();
    }
}

new Game(<HTMLCanvasElement> document.getElementById("canvasGame"));