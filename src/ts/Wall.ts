/// <reference path="Tile.ts" />
/// <reference path="core/GameObjectBase.ts"/>

class Wall extends GameObjectBase {
    tiles: Array <Tile>;
    tilesToRemove: Array <Tile>;
    lines: number;
    colluns: number;
    tileSpace: number;

    constructor(gameContext: CanvasRenderingContext2D, lines: number, colluns: number, collider: Collider) {
        super(gameContext);
        this.context = gameContext;
        this.collider = collider;
        this.tiles = new Array <Tile> ();
        this.tilesToRemove = new Array <Tile> ();
        this.tileSpace = 20;
        this.lines = lines;
        this.colluns = colluns;
        this.size = new Size(40, 20);
        this.coord = new Coord2D(this.calcCenterWall(), 100);
        this.makeWall();
    }

    setCollider(collider: Collider) {
        for (let i = 0, size = this.lines * this.colluns; i < size; i++) {
            collider.addGameObject(this.tiles[i]);
        }
    }

    public calcCenterWall() {
        let sw = this.context.canvas.width;
        return sw / 2 - (this.colluns * (this.size.width + this.tileSpace * 2) / 2);
    }

    private makeWall(): void {
        for (let y = 0; y < this.lines; y++) {
            let posX = this.coord.x;
            for (let x = 0; x < this.colluns; x++) {
                posX += this.size.width + this.tileSpace;
                let posY = (y * (this.size.height + this.tileSpace)) + this.coord.y;;
                let tile = new Tile(this.context, new Coord2D(posX, posY), this.size);
                tile.collider = this.collider;
                this.tiles.push(tile);
            }
        }
    }

    draw(): void {
        for (let i = 0, size = this.tiles.length; i < size; i++) {
            this.tiles[i].draw();
        }
    }
    update(): void {
        let tmp = new Array <Tile> ();
        for (let i = 0, size = this.tiles.length; i < size; i++) {
            if (this.tiles[i].life > 0)
                tmp.push(this.tiles[i]);

        }
        this.tiles = tmp;
    }
    collidedWith(object: GameObjectBase): void {}
    getColliders(): Array <BoxCollider> {
        return [];
    }
}