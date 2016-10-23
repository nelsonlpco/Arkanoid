///<reference path="Bat.ts"/>
///<reference path="Ball.ts"/>
///<reference path="./core/Animator.ts"/>
///<reference path="./core/Collider.ts"/>
///<reference path="./Wall.ts" />
///<reference path="./Life.ts" />

class Game {
    gameCanvas: HTMLCanvasElement;
    gameContext: CanvasRenderingContext2D;
    ball: Ball;
    bat: Bat;
    wall: Wall;
    animator: Animator;
    collider: Collider;
    lifes: number;

    public constructor(gameCanvas: HTMLCanvasElement) {
        this.gameCanvas = gameCanvas;
        this.gameCanvas.width = document.querySelector(".game").clientWidth;
        this.gameCanvas.height = document.querySelector(".game").clientHeight;        
        this.gameContext = gameCanvas.getContext("2d");
        this.lifes = 3;
        this.init();     
        this.eventRegister();       
    }

    public gameTask(vm:any):any{
        return {
            execute: function(){
                if(vm.ball.coord.y > (vm.bat.coord.y + vm.bat.size.height)){
                    vm.lifes--;
                    vm.animator.removeById(vm.lifes-1);
                    //vm.init();
                }
            }
        };
    }

    private eventRegister(): void {
        var vm = this;
        this.gameCanvas.addEventListener("mousemove", function (e) {
            vm.bat.coord.x = e.offsetX;
        });
        let touchobj: any = null;
        this.gameCanvas.addEventListener('touchmove', function (e) {
            touchobj = e.changedTouches[0];            
            vm.bat.coord.x = touchobj.clientX / 2 + 1;
        }, false);
    }

    private setLifes(){
        let life:any = null;
        for(let i = 0; i < this.lifes; i++){
            life = new Life(this.gameContext);            
            life.radius = 8;
            life.coord = new Coord2D((life.radius + 20) * (i+1), 30);
            life.id = i+1;            
            this.animator.addGameObject(life);
        }
    }
    
    private init(): void {                   
        this.animator = new Animator(this.gameContext);
        this.collider = new Collider();
        this.wall = new Wall(this.gameContext, 4, 4, this.collider);
        this.ball = new Ball(this.gameContext, 10);
        this.ball.coord = new Coord2D(20,20);       
        
        this.bat = new Bat(this.gameContext);
        this.bat.size = new Size(100, 20);

        this.collider.addGameObject(this.bat);
        this.collider.addGameObject(this.ball);
        this.wall.setCollider(this.collider);

        this.animator.addGameObject(this.ball);
        this.animator.addGameObject(this.wall);
        this.animator.addGameObject(this.bat);

        this.setLifes();
        this.animator.addtaskes(this.gameTask(this));    
        this.animator.addtaskes(this.collider);        
    }

    public startGame():void{
        this.animator.play();
    }

    public pauseGame():void{
        this.animator.stop();
    }

    
}

let game = new Game( <HTMLCanvasElement> document.getElementById("canvasGame"));
game.startGame();