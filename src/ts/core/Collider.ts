/// <reference path="./GameObjectBase.ts"/>
class Collider {
    gameObjects: Array < GameObjectBase > ;
    gameObjectToExclude: Array < GameObjectBase > ;

    constructor() {
        this.gameObjects = new Array < GameObjectBase > ();
        this.gameObjectToExclude = new Array < GameObjectBase > ();
    }

    addGameObject(gameObject: GameObjectBase): void {
        gameObject.collider = this;
        this.gameObjects.push(gameObject);
    }

    removeObject(object: GameObjectBase){
        this.gameObjectToExclude.push(object);
    }

    execute(): void {        
        var tested:any = {};
        for (let a = 0, size = this.gameObjects.length; a < size; a++) {
            for (let b = 0; b < size; b++) {
                if (a === b) continue;

                let id1 = this.IdGenerator();
                let id2 = this.IdGenerator();

                if (!tested[id1]) tested[id1] = [];
                if (!tested[id2]) tested[id2] = [];

                if (!(tested[id1].indexOf(id2) > 0 ||
                        tested[id2].indexOf(id1) > 0)) {
                            this.colisionCheck(this.gameObjects[a], this.gameObjects[b]);
                            tested[id1].push(id2);
                            tested[id2].push(id1);
                }
            }
        }
        this.exclusionProcess();
    }

    private IdGenerator() {
        return "Object" + (Math.random() * 10000);
    }

    private colisionCheck(object1: GameObjectBase, object2: GameObjectBase){
        var colliders = object1.getColliders();
        var colliders2 = object2.getColliders();        

        collisions: for(let i in colliders){
            for(let y in colliders2){
                if(this.collided(colliders[i], colliders2[y])){
                    object1.collidedWith(object2);
                    object2.collidedWith(object1);
                    break collisions;
                }
            }
        }

    }

    private collided(b1: BoxCollider, b2: BoxCollider){                
        return (b1.coord.x + b1.size.width) > b2.coord.x 
            && b1.coord.x < (b2.coord.x + b2.size.width)
            && (b1.coord.y + b1.size.height) > b2.coord.y
            && b1.coord.y < (b2.coord.y + b2.size.height);
    }

    private exclusionProcess(){
        var objectsTmp = new Array<any>();
        for(var i in this.gameObjects){
            if(this.gameObjectToExclude.indexOf(this.gameObjects[i]) == -1)
            objectsTmp.push(this.gameObjects[i]);
        }

        this.gameObjectToExclude = [];
        this.gameObjects = objectsTmp;
    }
}