export default class Disc extends Entity {
    radius: number;
    vx: number;
    vz: number;
    mass: number;

    constructor(radius: number) {
        super();
        this.radius = radius;
        this.vx = 0;
        this.vz = 0;
        this.mass = radius * 2;
    }
}
