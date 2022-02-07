import { GeneralObject } from "./object";
import { ObjectOptions } from "./object";

interface RoundOptions extends ObjectOptions {
    radius: number;
}

/** A round object that extends general object */
export class RoundObject extends GeneralObject {
    /** The radius of the object */
    radius: number;
    /** 
     * Creates a new round object
     * @param {string} name The name of the object
     * @param {string} description The description of the object
     * @param {number} radius The radius of the object
     */
    constructor(name: string, config: RoundOptions) {
        super(name, config);
        this.radius = config.radius;
    }
}