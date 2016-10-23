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
    Animator.prototype.addGameObject = function (gameObject) {
        this.gameObjects.push(gameObject);
        gameObject.animator = this;
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
    Animator.prototype.removeById = function (id) {
        for (var i = 0, size = this.gameObjects.length; i < size; i++) {
            if (this.gameObjects[i].id === id) {
                this.removeGameObject(this.gameObjects[i]);
            }
        }
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
        return (b1.coord.x + b1.size.width) > b2.coord.x
            && b1.coord.x < (b2.coord.x + b2.size.width)
            && (b1.coord.y + b1.size.height) > b2.coord.y
            && b1.coord.y < (b2.coord.y + b2.size.height);
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
        var r = Math.floor(Math.random() * 255) + 5;
        var g = Math.floor(Math.random() * 255) + 5;
        var b = Math.floor(Math.random() * 255) + 5;
        return 'rgb(' + r + ',' + g + ',' + b + ')';
    };
    GameObjectBase.prototype.calcCenter = function () {
        return (this.context.canvas.width / 2 - this.size.width / 2) - this.size.width / 2;
    };
    return GameObjectBase;
}());
/// <reference path="./Core/GameObjectBase.ts" />
var Bat = (function (_super) {
    __extends(Bat, _super);
    /**
     *
     */
    function Bat(gameContext) {
        _super.call(this, gameContext);
        this.coord.x = this.calcCenter();
        this.coord.y = this.context.canvas.height - 90;
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
    Bat.prototype.collidedWith = function (gameObject) {
        gameObject.vy *= -1;
        gameObject.update();
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
    function Ball(gameContext, radius) {
        _super.call(this, gameContext);
        this.vx = 3;
        this.vy = 2;
        this.radius = radius;
    }
    Ball.prototype.draw = function () {
        this.context.save();
        this.context.fillStyle = this.background;
        this.context.beginPath();
        this.context.arc(this.coord.x, this.coord.y, this.radius, 0, 2 * Math.PI);
        this.context.fill();
        this.context.restore();
    };
    Ball.prototype.update = function () {
        var w = this.context.canvas.width;
        var h = this.context.canvas.height;
        if (this.coord.x < this.radius || this.coord.x + this.radius > w)
            this.vx *= -1;
        if (this.coord.y < this.radius || this.coord.y + this.radius > h)
            this.vy *= -1;
        this.coord.x += this.vx;
        this.coord.y += this.vy;
    };
    Ball.prototype.collidedWith = function (gameObject) { };
    Ball.prototype.getColliders = function () {
        var c = new Coord2D(this.coord.x - this.radius, this.coord.y - this.radius);
        return [new BoxCollider(c, new Size(this.radius * 2, this.radius * 2))];
    };
    return Ball;
}(GameObjectBase));
/// <reference path="./core/GameObjectBase.ts" />
var Tile = (function (_super) {
    __extends(Tile, _super);
    function Tile(context, coord, size) {
        _super.call(this, context);
        this.coord = coord;
        this.size = size;
        this.life = 1;
    }
    Tile.prototype.draw = function () {
        this.context.save();
        this.context.fillStyle = this.background;
        this.context.fillRect(this.coord.x, this.coord.y, this.size.width, this.size.height);
        this.context.fill();
        this.context.restore();
    };
    Tile.prototype.update = function () {
    };
    Tile.prototype.collidedWith = function (gameObject) {
        this.collider.removeObject(this);
        this.life -= 1;
        var ball = gameObject;
        if (ball.vy < 0)
            ball.vy *= -1;
        else
            ball.vx *= -1;
        ball.update();
    };
    Tile.prototype.getColliders = function () {
        return [new BoxCollider(this.coord, this.size)];
    };
    return Tile;
}(GameObjectBase));
/// <reference path="Tile.ts" />
/// <reference path="core/GameObjectBase.ts"/>
var Wall = (function (_super) {
    __extends(Wall, _super);
    function Wall(gameContext, lines, colluns, collider) {
        _super.call(this, gameContext);
        this.context = gameContext;
        this.collider = collider;
        this.tiles = new Array();
        this.tilesToRemove = new Array();
        this.tileSpace = 20;
        this.lines = lines;
        this.colluns = colluns;
        this.size = new Size(40, 20);
        this.coord = new Coord2D(this.calcCenterWall(), 100);
        this.makeWall();
    }
    Wall.prototype.setCollider = function (collider) {
        for (var i = 0, size = this.lines * this.colluns; i < size; i++) {
            collider.addGameObject(this.tiles[i]);
        }
    };
    Wall.prototype.calcCenterWall = function () {
        var sw = this.context.canvas.width;
        return sw / 2 - (this.colluns * (this.size.width + this.tileSpace * 2) / 2);
    };
    Wall.prototype.makeWall = function () {
        for (var y = 0; y < this.lines; y++) {
            var posX = this.coord.x;
            for (var x = 0; x < this.colluns; x++) {
                posX += this.size.width + this.tileSpace;
                var posY = (y * (this.size.height + this.tileSpace)) + this.coord.y;
                ;
                var tile = new Tile(this.context, new Coord2D(posX, posY), this.size);
                tile.collider = this.collider;
                this.tiles.push(tile);
            }
        }
    };
    Wall.prototype.draw = function () {
        for (var i = 0, size = this.tiles.length; i < size; i++) {
            this.tiles[i].draw();
        }
    };
    Wall.prototype.update = function () {
        var tmp = new Array();
        for (var i = 0, size = this.tiles.length; i < size; i++) {
            if (this.tiles[i].life > 0)
                tmp.push(this.tiles[i]);
        }
        this.tiles = tmp;
    };
    Wall.prototype.collidedWith = function (object) { };
    Wall.prototype.getColliders = function () {
        return [];
    };
    return Wall;
}(GameObjectBase));
/// <reference path="core/GameOBjectBase.ts" />
var Life = (function (_super) {
    __extends(Life, _super);
    function Life(gameContext) {
        _super.call(this, gameContext);
        this.radius = 8;
    }
    Life.prototype.draw = function () {
        this.context.save();
        this.context.fillStyle = this.background;
        this.context.beginPath();
        this.context.arc(this.coord.x, this.coord.y, this.radius, 0, 2 * Math.PI);
        this.context.fill();
        this.context.restore();
    };
    Life.prototype.update = function () { };
    Life.prototype.collidedWith = function (gamObject) { };
    Life.prototype.getColliders = function () {
        return [];
    };
    return Life;
}(GameObjectBase));
///<reference path="Bat.ts"/>
///<reference path="Ball.ts"/>
///<reference path="./core/Animator.ts"/>
///<reference path="./core/Collider.ts"/>
///<reference path="./Wall.ts" />
///<reference path="./Life.ts" />
var Game = (function () {
    function Game(gameCanvas) {
        this.gameCanvas = gameCanvas;
        this.gameCanvas.width = document.querySelector(".game").clientWidth;
        this.gameCanvas.height = document.querySelector(".game").clientHeight;
        this.gameContext = gameCanvas.getContext("2d");
        this.lifes = 3;
        this.init();
        this.eventRegister();
    }
    Game.prototype.gameTask = function (vm) {
        return {
            execute: function () {
                if (vm.ball.coord.y > (vm.bat.coord.y + vm.bat.size.height)) {
                    vm.lifes--;
                    vm.animator.removeById(vm.lifes - 1);
                }
            }
        };
    };
    Game.prototype.eventRegister = function () {
        var vm = this;
        this.gameCanvas.addEventListener("mousemove", function (e) {
            vm.bat.coord.x = e.offsetX;
        });
        var touchobj = null;
        this.gameCanvas.addEventListener('touchmove', function (e) {
            touchobj = e.changedTouches[0];
            vm.bat.coord.x = touchobj.clientX / 2 + 1;
        }, false);
    };
    Game.prototype.setLifes = function () {
        var life = null;
        for (var i = 0; i < this.lifes; i++) {
            life = new Life(this.gameContext);
            life.radius = 8;
            life.coord = new Coord2D((life.radius + 20) * (i + 1), 30);
            life.id = i + 1;
            this.animator.addGameObject(life);
        }
    };
    Game.prototype.init = function () {
        this.animator = new Animator(this.gameContext);
        this.collider = new Collider();
        this.wall = new Wall(this.gameContext, 4, 4, this.collider);
        this.ball = new Ball(this.gameContext, 10);
        this.ball.coord = new Coord2D(20, 20);
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
    };
    Game.prototype.startGame = function () {
        this.animator.play();
    };
    Game.prototype.pauseGame = function () {
        this.animator.stop();
    };
    return Game;
}());
var game = new Game(document.getElementById("canvasGame"));
game.startGame();
