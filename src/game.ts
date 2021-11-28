import Scene from './Scene';
import Field from './models/hockey/Field';
import Handle from './models/hockey/discs/Handle';
import Puck from './models/hockey/discs/Puck';
import ScoreScreen from './models/hockey/ScoreScreen';
import initPhysics from './hockeyLogic/physics';
import { DISC_RADIUS, FIELD_LENGTH, FIELD_WIDTH, HOCKEY_HEIGHT } from './constants';

const scene = new Scene(new GLTFShape('models/final.glb'), new Transform({ position: new Vector3(22, 0, 22) }));

const field = new Field(
    new GLTFShape('models/hockey/field.glb'),
    new Transform({ position: new Vector3(3, HOCKEY_HEIGHT + 0.1, 3) })
);

const handleBlue = new Handle(
    DISC_RADIUS,
    new GLTFShape('models/hockey/handle_blue.glb'),
    new Transform({ position: new Vector3(3.8, HOCKEY_HEIGHT, 3) })
);

const handlePink = new Handle(
    DISC_RADIUS,
    new GLTFShape('models/hockey/handle_pink.glb'),
    new Transform({ position: new Vector3(2.2, HOCKEY_HEIGHT, 3) })
);

const puck = new Puck(
    DISC_RADIUS,
    new GLTFShape('models/hockey/puck.glb'),
    new Transform({ position: new Vector3(3, HOCKEY_HEIGHT, 3.4) })
);

const scoreScreen = new ScoreScreen(
    new GLTFShape('models/hockey/screen.glb'),
    new Transform({ position: new Vector3(3, 2, 1) })
);

initPhysics([handleBlue, handlePink, puck], {
    fieldXMin: 3 - FIELD_LENGTH / 2,
    fieldXMax: 3 + FIELD_LENGTH / 2,
    fieldZMin: 3 - FIELD_WIDTH / 2,
    fieldZMax: 3 + FIELD_WIDTH / 2,
});
