/// <reference path="./Coord2D.ts" />
/// <reference path="./Size.ts" />

class BoxCollider {
    coord: Coord2D;
    size: Size;

    constructor(coord: Coord2D, size: Size) {
        this.coord = coord;
        this.size = size;
    }

}