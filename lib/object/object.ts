import { Shape } from "../shape/shape";
import { setObject } from "../utils/utils";
/** A general objcet that can be calculated by the core physical simulator */
export class GeneralObject {
    /** The name of the object */
    name: string;
    /** The description of the object */
    description: string;
    /** The id of the object */
    id: number;
    /** The id counter of the object */
    static idCounter: number = 0;
    /** The shape of the object */
    shape: Shape;
    /** The mass of the object */
    mass: number;
    /** The velocity of the object */
    velocity: [number, number];
    /** The acceleration of the object */
    acceleration: [number, number];

    /**
     * Creates a new general object
     * @param {string} name The name of the object
     * @param {string} description The description of the object
     */
    constructor(name: string, description: string) {
        this.name = name;
        this.description = description;
        this.id = GeneralObject.idCounter++;
        setObject(this, this.name);
    }

    /** Set the shape of the object */
    setShape(shape: Shape) {
        this.shape = shape;
    }

    /** Set the mass of the object */
    setMass(mass: number) {
        this.mass = mass;
    }
}