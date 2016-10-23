/// <reference path="GameObjectBase.ts"/>

class Animator {
    context: CanvasRenderingContext2D;
    onOff: boolean;
    gameObjects: Array < GameObjectBase > ;
    gameObjectsToExclude: Array < GameObjectBase > ;
    taskes: Array < any > ;
    taskesToExclude: Array < any > ;
    lastCicle: number;
    cicle: number;

    constructor(gameContext: CanvasRenderingContext2D) {
        this.context = gameContext;
        this.onOff = false;
        this.lastCicle = 0;
        this.cicle = 0;
        this.gameObjects = new Array < GameObjectBase > ();
        this.gameObjectsToExclude = new Array < GameObjectBase > ();
        this.taskes = new Array < GameObjectBase > ();
        this.taskesToExclude = new Array < GameObjectBase > ();
    }

    addGameObject(gameObject: GameObjectBase) {
        this.gameObjects.push(gameObject);
        gameObject.animator = this;
    }
    addtaskes(taskes: any) {
        this.taskes.push(taskes);
    }
    play() {
        this.onOff = true;
        this.lastCicle = 0;
        this.nextFrame();
    }

    stop() {
        this.onOff = false;
    }

    private nextFrame() {
        var vm = this;
        if (!vm.onOff) return;
        let timeNow = new Date().getTime();
        if (vm.lastCicle === 0)
            vm.lastCicle = timeNow;
        vm.cicle = timeNow - vm.lastCicle;
        vm.clearScreen();
        for (let i = 0, size = vm.gameObjects.length; i < size; i++) {
            vm.gameObjects[i].update();
        }
        for (let i = 0, size = vm.gameObjects.length; i < size; i++) {
            vm.gameObjects[i].draw();
        }
        for (let i = 0, size = vm.taskes.length; i < size; i++) {
            vm.taskes[i].execute();
        }

        this.exclusionProcess();

        vm.lastCicle = timeNow;
        window.requestAnimationFrame(function () {
            vm.nextFrame();
        });
    }

    private exclusionProcess() {
        let tmpTaskes = new Array < any > ();
        let tmpGameObject = new Array < GameObjectBase > ();

        for (let i = 0, size = this.gameObjects.length; i < size; i++) {
            if (this.gameObjectsToExclude.indexOf(this.gameObjects[i]) == -1) {
                tmpGameObject.push(this.gameObjects[i]);
            }
        }

        for (let i = 0, size = this.taskes.length; i < size; i++) {
            if (this.taskesToExclude.indexOf(this.taskes[i]) == -1) {
                tmpTaskes.push(this.taskes[i]);
            }
        }
        this.taskesToExclude = [];
        this.gameObjectsToExclude = [];
        this.taskes = tmpTaskes;
        this.gameObjects = tmpGameObject;
    }

    removeById(id: number) {
        for (let i = 0, size = this.gameObjects.length; i < size; i++) {
            if (this.gameObjects[i].id === id) {
                this.removeGameObject(this.gameObjects[i]);
            }
        }
    }

    public removeGameObject(object: GameObjectBase) {
        this.gameObjectsToExclude.push(object);
    }

    public removeTask(task: any) {
        this.taskesToExclude.push(task);
    }

    private clearScreen() {
        this.context.clearRect(0, 0, this.context.canvas.width, this.context.canvas.height);
    }

}