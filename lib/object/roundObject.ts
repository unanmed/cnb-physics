import { GeneralObject } from "./object";
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
    constructor(name: string, description: string, radius: number) {
        super(name, description);
        this.radius = radius;
    }
}