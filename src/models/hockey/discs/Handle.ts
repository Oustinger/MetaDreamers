import Disc from './Disc';

export default class Handle extends Disc {
    constructor(radius: number, model: GLTFShape, pos: TransformConstructorArgs) {
        super(radius);
        this.addComponent(pos);
        this.addComponent(model);
        engine.addEntity(this);
    }
}
