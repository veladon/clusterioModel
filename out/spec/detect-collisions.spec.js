"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const detect_collisions_1 = require("detect-collisions");
describe('test', () => {
    it('test', () => {
        //const {Collisions} = require('detect-collisions');
        // other options:
        // const Collisions = require('detect-collisions').default;
        // Create the collision system
        const system = new detect_collisions_1.Collisions();
        // Create a Result object for collecting information about the collisions
        const result = system.createResult();
        // Create the player (represented by a Circle)
        //const player = system.createCircle(100, 100, 10);
        // Create some walls (represented by Polygons)
        const p = 0.1; //padding
        // const a = system.createPolygon(0, 0, [[0-p, 0-p], [0-p, 1+p], [1+p, 1+p], [1+p, 0-p]], 0, 1, 1, 0);
        // const b = system.createPolygon(1, 0, [[0-p, 0-p], [0-p, 1+p], [1+p, 1+p], [1+p, 0-p]], 0, 1, 1, 0);
        const a = system.createPolygon(0, 0, [[0, 0], [0, 1], [1, 1], [1, 0]], 0, 1.1, 1.1, 0);
        const b = system.createPolygon(0, 0, [[0, 0], [0, 1], [1, 1], [1, 0]], 0, 1.1, 1.1, 0);
        // Update the collision system
        system.update();
        // Get any potential collisions (this quickly rules out walls that have no chance of colliding with the player)
        const potentials = b.potentials();
        // Loop through the potential wall collisions
        for (const potentialCollisionItem of potentials) {
            // Test if the player collides with the wall
            if (b.collides(potentialCollisionItem, result)) {
                if (result.overlap_x != 0 || result.overlap_y != 0 || result.overlap != 0) {
                    // fail("overlap=" + Math.round(10*result.overlap_x)/10 + "," 
                    // + Math.round(10*result.overlap_y)/10 + "," 
                    // + Math.round(1000*result.overlap)/1000);
                    fail("overlap=" + result.overlap_x + ","
                        + result.overlap_y + ","
                        + result.overlap);
                }
                fail("collided");
            }
            fail("potential");
        }
    });
});
//# sourceMappingURL=detect-collisions.spec.js.map