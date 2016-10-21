/// <reference path="Tile.ts" />
class Wall {
    tiles: Array < Tile > ;
    lines: number;
    colluns: number;
    context: CanvasRenderingContext2D;
    size: Size;
    tileSpace: number;

    constructor(gameContext: CanvasRenderingContext2D) {
        this.context = gameContext;
        this.tiles = new Array < Tile > ();
        this.tileSpace = 10;
        this.calcSize();
    }

    private calcSize() {
        let sw = this.context.canvas.width;
        let sh = this.context.canvas.height;
        this.size = new Size(sw / this.colluns - this.tileSpace, sh / this.lines - this.tileSpace);
    }

    private makeWall(): void {
        for (let i = 0, size = this.lines * this.colluns; i < size; i++) {
            let coord = new Coord2D(0, 0);
            let size = new Size(0, 0);
            this.tiles.push(new Tile(this.context, coord, size));
        }
    }


}