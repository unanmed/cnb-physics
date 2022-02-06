import { NonScopedField } from "./field";
import { constants } from "../utils/utils";
import { GeneralObject } from "../object/object";

/** A gravity field, which has no scope */
export class GravityField extends NonScopedField<'gravity'> {
    /** The center of the gravity */
    center: [number, number];
    /** The mass of the central planet */
    mass: number;
    /** The central object */
    centralObject: GeneralObject;

    /** Create a gravity field
     * @param {string} name The name of the field
     * @param {GeneralObject} centralObject The central object
     */
    constructor(name: string, centralObject: GeneralObject) {
        super(name, "gravity");
        this.centralObject = centralObject;
        this.mass = centralObject.mass;
        this.center = centralObject.position;
    }

    /** Calculate the force of the field
     * @param {GeneralObject} object The object to calculate the force
     * @returns {[number, number]} The force of the field
     */
    calculateForceGravity(object: GeneralObject): [number, number] {
        if (object === this.centralObject) return [0, 0];
        const force: [number, number] = [0, 0];
        const dx = object.position[0] - this.center[0];
        const dy = object.position[1] - this.center[1];
        const distance = Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2));
        force[0] = -(this.mass * object.mass * constants.G) / Math.pow(distance, 2) * dx / distance;
        force[1] = -(this.mass * object.mass * constants.G) / Math.pow(distance, 2) * dy / distance;
        return force;
    }
}
