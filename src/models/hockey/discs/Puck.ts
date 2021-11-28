import Disc from './Disc';

export default class Puck extends Disc {
    constructor(radius: number, model: GLTFShape, pos: TransformConstructorArgs) {
        super(radius);
        this.addComponent(pos);
        this.addComponent(model);
        engine.addEntity(this);
        this.vx = 0.5;
        this.vz = 0.5;
    }
}
