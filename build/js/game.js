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
/// <reference path="./core/Size.ts" />
/// <reference path="./core/Coord2D.ts" />
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
/// <reference path="GameObjectBase.ts" />
/// <reference path="IGameObjectRenderer.ts" />
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
    Bat.prototype.animate = function () {
    };
    return Bat;
}(GameObjectBase));
/// <reference path="GameObjectBase.ts"/>
/// <reference path="IgameObjectRenderer.ts"/>
var Ball = (function (_super) {
    __extends(Ball, _super);
    function Ball(gameContext, raio) {
        _super.call(this, gameContext);
        this.raio = raio;
    }
    Ball.prototype.draw = function () {
        this.context.save();
        this.context.fillStyle = this.background;
        this.context.beginPath();
        this.context.arc(this.coord.x, this.coord.y, this.raio, 0, 2 * Math.PI);
        this.context.fill();
        this.context.restore();
    };
    Ball.prototype.animate = function () {
    };
    return Ball;
}(GameObjectBase));
///<reference path="Bat.ts"/>
///<reference path="Ball.ts"/>
var Game = (function () {
    function Game(gameCanvas) {
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
    return Game;
}());
new Game(document.getElementById("canvasGame"));
