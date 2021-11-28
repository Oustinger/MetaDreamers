// ----------------------------------------------------------
//
// This code takes from: http://jsfiddle.net/g9wgdthj/1/
//
// Modifications:
// - Remove unnecessary code
// - Add typings
// - Adapt to DCL mechanics
//
// ----------------------------------------------------------

import * as utils from '@dcl/ecs-scene-utils';
import { FPS_MS } from './../constants';

const roundNumber = (num) => Math.round((num + Number.EPSILON) * 100) / 100;

export default function initPhysics(discs, { fieldXMin, fieldXMax, fieldZMin, fieldZMax }) {
    const bounce = -1.0;

    function rotate(x, z, sin, cos, reverse) {
        return {
            x: reverse ? x * cos + z * sin : x * cos - z * sin,
            z: reverse ? z * cos - x * sin : z * cos + x * sin,
        };
    }

    function checkCollision(disc0, disc1) {
        const { position: position0 } = disc0.getComponent(Transform);
        const { x: x0, z: z0 } = position0;
        const { position: position1 } = disc1.getComponent(Transform);
        const { x: x1, z: z1 } = position1;

        var dx = x1 - x0,
            dz = z1 - z0,
            dist = Math.sqrt(dx * dx + dz * dz);
        //collision handling code here
        if (dist < disc0.radius + disc1.radius) {
            //calculate angle, sine, and cosine
            var angle = Math.atan2(dz, dx),
                sin = Math.sin(angle),
                cos = Math.cos(angle),
                //rotate ball0's position
                pos0 = { x: 0, z: 0 }, //point
                //rotate ball1's position
                pos1 = rotate(dx, dz, sin, cos, true),
                //rotate ball0's velocity
                vel0 = rotate(disc0.vx, disc0.vz, sin, cos, true),
                //rotate ball1's velocity
                vel1 = rotate(disc1.vx, disc1.vz, sin, cos, true),
                //collision reaction
                vxTotal = vel0.x - vel1.x;
            vel0.x = ((disc0.mass - disc1.mass) * vel0.x + 2 * disc1.mass * vel1.x) / (disc0.mass + disc1.mass);
            vel1.x = vxTotal + vel0.x;
            //update position - to avoid objects becoming stuck together
            var absV = Math.abs(vel0.x) + Math.abs(vel1.x),
                overlap = disc0.radius + disc1.radius - Math.abs(pos0.x - pos1.x);
            pos0.x += (vel0.x / absV) * overlap;
            pos1.x += (vel1.x / absV) * overlap;
            //rotate positions back
            var pos0F = rotate(pos0.x, pos0.z, sin, cos, false),
                pos1F = rotate(pos1.x, pos1.z, sin, cos, false);
            //rotate velocities back
            var vel0F = rotate(vel0.x, vel0.z, sin, cos, false),
                vel1F = rotate(vel1.x, vel1.z, sin, cos, false);
            disc0.vx = vel0F.x;
            disc0.vz = vel0F.z;
            disc1.vx = vel1F.x;
            disc1.vz = vel1F.z;
            //adjust positions to actual screen positions
            return {
                disc0: { x: x0 + pos0F.x, z: z0 + pos0F.z },
                disc1: { x: x0 + pos1F.x, z: z0 + pos1F.z },
            };
        }
    }

    function checkNewCoords(disc, newCoords) {
        const { position } = disc.getComponent(Transform);
        let newX = newCoords ? newCoords.x : roundNumber(position.x + disc.vx);
        let newZ = newCoords ? newCoords.z : roundNumber(position.z + disc.vz);

        if (newX + disc.radius > fieldXMax) {
            newX = fieldXMax - disc.radius;
            disc.vx *= bounce;
        } else if (newX - disc.radius < fieldXMin) {
            newX = fieldXMin + disc.radius;
            disc.vx *= bounce;
        }
        if (newZ + disc.radius > fieldZMax) {
            newZ = fieldZMax - disc.radius;
            disc.vz *= bounce;
        } else if (newZ - disc.radius < fieldZMin) {
            newZ = fieldZMin + disc.radius;
            disc.vz *= bounce;
        }

        return { x: newX, z: newZ };
    }

    function move(disc, newCoords) {
        // checkWalls(disc);

        const { position } = disc.getComponent(Transform);

        //Define start and end positions
        let StartPos = position;

        const { x, z } = checkNewCoords(disc, newCoords);
        let EndPos = new Vector3(x, position.y, z);

        if (disc.vx !== 0) {
            // debugger;
        }

        // Move entity
        disc.addComponent(new utils.MoveTransformComponent(StartPos, EndPos, 0.2));
    }

    discs.forEach((disc, index) => {
        // add a repeated function
        disc.addComponent(
            new utils.Interval(FPS_MS, () => {
                move(disc);

                const otherDiscs = discs.filter((d, i) => index !== i);
                otherDiscs.forEach((disc2) => {
                    const { disc0: newCoords } = checkCollision(disc, disc2);
                    move(disc, newCoords);
                });
            })
        );
    });
}
