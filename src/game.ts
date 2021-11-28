import Scene from './Scene';
import Field from './models/hockey/Field';
import Handle from './models/hockey/Handle';
import Puck from './models/hockey/Puck';
import ScoreScreen from './models/hockey/ScoreScreen';

const scene = new Scene(new GLTFShape('models/final.glb'), new Transform({ position: new Vector3(22, 0, 22) }));

const field = new Field(new GLTFShape('models/hockey/field.glb'), new Transform({ position: new Vector3(3, 0.3, 3) }));

const handleBlue = new Handle(
    new GLTFShape('models/hockey/handle_blue.glb'),
    new Transform({ position: new Vector3(3, 0.3, 3) })
);

const handlePink = new Handle(
    new GLTFShape('models/hockey/handle_pink.glb'),
    new Transform({ position: new Vector3(3, 0.3, 3) })
);

const puck = new Puck(new GLTFShape('models/hockey/puck.glb'), new Transform({ position: new Vector3(3, 0.3, 3) }));

const scoreScreen = new ScoreScreen(
    new GLTFShape('models/hockey/screen.glb'),
    new Transform({ position: new Vector3(3, 0.7, 3) })
);
