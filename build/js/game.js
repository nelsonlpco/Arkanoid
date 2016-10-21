var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Size = (function () {
    function Size(width, height) {
        this.width = width;
        this.height = height;
    }
    return Size;
}());
var Coord2D = (function () {
    function Coord2D(x, y) {
        this.x = x;
        this.y = y;
    }
    return Coord2D;
}());
/// <reference path="GameObjectBase.ts"/>
var Animator = (function () {
    function Animator(gameContext) {
        this.context = gameContext;
        this.onOff = false;
        this.lastCicle = 0;
        this.cicle = 0;
        this.gameObjects = new Array();
        this.gameObjectsToExclude = new Array();
        this.taskes = new Array();
        this.taskesToExclude = new Array();
    }
    Animator.prototype.addGameObject = function (object) {
        object.animator = this;
        this.gameObjects.push(object);
    };
    Animator.prototype.addtaskes = function (taskes) {
        this.taskes.push(taskes);
    };
    Animator.prototype.play = function () {
        this.onOff = true;
        this.lastCicle = 0;
        this.nextFrame();
    };
    Animator.prototype.stop = function () {
        this.onOff = false;
    };
    Animator.prototype.nextFrame = function () {
        var vm = this;
        if (!vm.onOff)
            return;
        var timeNow = new Date().getTime();
        if (vm.lastCicle === 0)
            vm.lastCicle = timeNow;
        vm.cicle = timeNow - vm.lastCicle;
        vm.clearScreen();
        for (var i = 0, size = vm.gameObjects.length; i < size; i++) {
            vm.gameObjects[i].update();
        }
        for (var i = 0, size = vm.gameObjects.length; i < size; i++) {
            vm.gameObjects[i].draw();
        }
        for (var i = 0, size = vm.taskes.length; i < size; i++) {
            vm.taskes[i].execute();
        }
        this.exclusionProcess();
        vm.lastCicle = timeNow;
        window.requestAnimationFrame(function () {
            vm.nextFrame();
        });
    };
    Animator.prototype.removeGameObject = function (object) {
        this.gameObjectsToExclude.push(object);
    };
    Animator.prototype.removeTask = function (task) {
        this.taskesToExclude.push(task);
    };
    Animator.prototype.clearScreen = function () {
        this.context.clearRect(0, 0, this.context.canvas.width, this.context.canvas.height);
    };
    Animator.prototype.exclusionProcess = function () {
        var tmpTaskes = new Array();
        var tmpGameObject = new Array();
        for (var i = 0, size = this.gameObjects.length; i < size; i++) {
            if (this.gameObjectsToExclude.indexOf(this.gameObjects[i]) == -1) {
                tmpGameObject.push(this.gameObjects[i]);
            }
        }
        for (var i = 0, size = this.taskes.length; i < size; i++) {
            if (this.taskesToExclude.indexOf(this.taskes[i]) == -1) {
                tmpTaskes.push(this.taskes[i]);
            }
        }
        this.taskesToExclude = [];
        this.gameObjectsToExclude = [];
        this.taskes = tmpTaskes;
        this.gameObjects = tmpGameObject;
    };
    return Animator;
}());
/// <reference path="./GameObjectBase.ts"/>
var Collider = (function () {
    function Collider() {
        this.gameObjects = new Array();
        this.gameObjectToExclude = new Array();
    }
    Collider.prototype.addGameObject = function (gameObject) {
        gameObject.collider = this;
        this.gameObjects.push(gameObject);
    };
    Collider.prototype.removeObject = function (object) {
        this.gameObjectToExclude.push(object);
    };
    Collider.prototype.execute = function () {
        var tested = {};
        for (var a = 0, size = this.gameObjects.length; a < size; a++) {
            for (var b = 0; b < size; b++) {
                if (a === b)
                    continue;
                var id1 = this.IdGenerator();
                var id2 = this.IdGenerator();
                if (!tested[id1])
                    tested[id1] = [];
                if (!tested[id2])
                    tested[id2] = [];
                if (!(tested[id1].indexOf(id2) > 0 ||
                    tested[id2].indexOf(id1) > 0)) {
                    this.colisionCheck(this.gameObjects[a], this.gameObjects[b]);
                    tested[id1].push(id2);
                    tested[id2].push(id1);
                }
            }
        }
        this.exclusionProcess();
    };
    Collider.prototype.IdGenerator = function () {
        return "Object" + (Math.random() * 10000);
    };
    Collider.prototype.colisionCheck = function (object1, object2) {
        var colliders = object1.getColliders();
        var colliders2 = object2.getColliders();
        collisions: for (var i in colliders) {
            for (var y in colliders2) {
                if (this.collided(colliders[i], colliders2[y])) {
                    object1.collidedWith(object2);
                    object2.collidedWith(object1);
                    break collisions;
                }
            }
        }
    };
    Collider.prototype.collided = function (b1, b2) {
        return b1.coord.x + b1.size.width > b2.coord.x
            && b1.coord.x < b2.coord.x + b2.size.width
            && b1.coord.y + b1.size.height > b2.coord.y
            && b1.coord.y < b2.coord.y + b2.size.height;
    };
    Collider.prototype.exclusionProcess = function () {
        var objectsTmp = new Array();
        for (var i in this.gameObjects) {
            if (this.gameObjectToExclude.indexOf(this.gameObjects[i]) == -1)
                objectsTmp.push(this.gameObjects[i]);
        }
        this.gameObjectToExclude = [];
        this.gameObjects = objectsTmp;
    };
    return Collider;
}());
/// <reference path="./Coord2D.ts" />
/// <reference path="./Size.ts" />
var BoxCollider = (function () {
    function BoxCollider(coord, size) {
        this.coord = coord;
        this.size = size;
    }
    return BoxCollider;
}());
/// <reference path="./Size.ts" />
/// <reference path="./Coord2D.ts" />
/// <reference path="./Animator.ts" />
/// <reference path="./Collider.ts" />
/// <reference path="./BoxCollider.ts" />
var GameObjectBase = (function () {
    function GameObjectBase(context) {
        this.background = this.randomColor();
        this.size = new Size(20, 20);
        this.coord = new Coord2D(0, 0);
        this.context = context;
    }
    GameObjectBase.prototype.randomColor = function () {
        var r = Math.floor(Math.random() * 255);
        var g = Math.floor(Math.random() * 255);
        var b = Math.floor(Math.random() * 255);
        return 'rgb(' + r + ',' + g + ',' + b + ')';
    };
    return GameObjectBase;
}());
/// <reference path="./Core/GameObjectBase.ts" />
var Bat = (function (_super) {
    __extends(Bat, _super);
    function Bat() {
        _super.apply(this, arguments);
    }
    Bat.prototype.draw = function () {
        this.context.save();
        this.context.fillStyle = this.background;
        this.context.fillRect(this.coord.x, this.coord.y, this.size.width, this.size.height);
        this.context.fill();
        this.context.restore();
    };
    Bat.prototype.update = function () {
    };
    Bat.prototype.CollidedWith = function () {
    };
    ;
    Bat.prototype.collidedWith = function (object) {
        console.log(object);
    };
    Bat.prototype.getColliders = function () {
        return [new BoxCollider(this.coord, this.size)];
    };
    return Bat;
}(GameObjectBase));
/// <reference path="./Core/GameObjectBase.ts"/>
/// <reference path="./core/Coord2D.ts" />
/// <reference path="./Core/BoxCollider.ts"/>
var Ball = (function (_super) {
    __extends(Ball, _super);
    function Ball(gameContext, raio) {
        _super.call(this, gameContext);
        this.vx = 1;
        this.vy = 1;
        this.raio = raio;
    }
    Ball.prototype.draw = function () {
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
    };
    Ball.prototype.update = function () {
        var w = this.context.canvas.width;
        var h = this.context.canvas.height;
        if (this.coord.x < this.raio || this.coord.x + this.raio > w)
            this.vx *= -1;
        if (this.coord.y < this.raio || this.coord.y + this.raio > h)
            this.vy *= -1;
        this.coord.x += this.vx;
        this.coord.y += this.vy;
    };
    Ball.prototype.collidedWith = function (object) {
    };
    Ball.prototype.getColliders = function () {
        var c = new Coord2D(this.coord.x - this.raio, this.coord.y - this.raio);
        return [new BoxCollider(c, new Size(this.raio * 2, this.raio * 2))];
    };
    return Ball;
}(GameObjectBase));
///<reference path="Bat.ts"/>
///<reference path="Ball.ts"/>
///<reference path="./core/Animator.ts"/>
///<reference path="./core/Collider.ts"/>
var Game = (function () {
    function Game(gameCanvas) {
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
    return Game;
}());
new Game(document.getElementById("canvasGame"));
