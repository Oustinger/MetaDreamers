export default class Puck extends Entity {
    constructor(model: GLTFShape, pos: TransformConstructorArgs) {
        super();
        this.addComponent(pos);
        this.addComponent(model);
        engine.addEntity(this);
    }
}
