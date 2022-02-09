import { Shape } from "../shape/shape";
import { GeneralObject } from "./object";

/** A round object that extends general object */
export class RoundObject extends GeneralObject {
    /** The radius of the object */
    radius: number;

    /** 
     * Creates a new round object
     * @param {string} name The name of the object
     * @param {RoundObject} config The configuration of the object
     */
    constructor(name: string, config: RoundObject) {
        super(name, config);
        this.radius = config.radius;
        super.setShape(new Shape('circle', super.position, this.radius));
    }
}