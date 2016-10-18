///<reference path="Bat.ts"/>
///<reference path="Ball.ts"/>
class Game{
    gameCanvas : HTMLCanvasElement;
    gameContext: CanvasRenderingContext2D;
    ball: Ball;
    bat: Bat;

    public constructor(gameCanvas: HTMLCanvasElement){        
        this.gameContext = gameCanvas.getContext("2d");
        this.ball = new Ball(this.gameContext, 10);
        this.ball.coord.x = 100;
        this.ball.coord.y = 100;
        this.ball.draw();

        this.bat = new Bat(this.gameContext);
        this.bat.coord.x = 200;
        this.bat.coord.y = 300;        
        this.bat.draw();
    }
}

new Game(<HTMLCanvasElement> document.getElementById("canvasGame"));