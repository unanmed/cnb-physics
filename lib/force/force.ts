import { GeneralObject } from "../object/object";
import { ConstantForce } from "./constant";

/** The interface of every type of force */
export interface ForceList {
    constant: ConstantForce;
}

/** The force that can be added to the object */
export class Force {
    /** The name of the force */
    readonly name: string;
    /** The magnitude of the force in the x y direction */
    magnitude: [number, number];
    /** The time of the force */
    time: number;
    /** The type of the force */
    readonly type: keyof ForceList;

    /** Create a new Force
     * @param {string} name The name of the force
     * @param {string} type The type of the force
     */
    constructor(name: string, type: keyof ForceList) {
        this.name = name;
        this.type = type;
    }

    /** Set the magnitude of the force */
    setMagnitude(magnitude: [number, number]) {
        this.magnitude = magnitude;
    }

    /** Set the time of the force */
    setTime(time: number) {
        this.time = time;
    }

    /** Apply force on object */
    apply(object: GeneralObject) {
        object.addForce(this);
    }

    /** Remove force on object */
    remove(object: GeneralObject) {
        object.removeForce(this);
    }
}