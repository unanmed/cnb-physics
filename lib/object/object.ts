import { Field, NonScopedField } from "../field/field";
import { GravityField } from "../field/gravity";
import { Force } from "../force/force";
import { Shape } from "../shape/shape";
import { setObject } from "../utils/utils";
import { getObjectList } from "../utils/utils";

const list = getObjectList();

/** A general object that can be calculated by the core physical simulator */
export class GeneralObject {
    /** The id counter of the object */
    static idCounter: number = 0;
    /** The name of the object */
    readonly name: string;
    /** The description of the object */
    description: string;
    /** The id of the object */
    readonly id: number;
    /** The shape of the object */
    shape: Shape;
    /** The mass of the object */
    mass: number;
    /** The velocity of the object */
    velocity: [number, number];
    /** The acceleration of the object */
    acceleration: [number, number];
    /** The force applied on the object */
    forces: Force[] = [];
    /** The position of the object */
    position: [number, number];
    /** The gravity field that the object generate */
    gravityField: GravityField;

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
        this.gravityField.mass = mass;
    }

    /** Add force on object */
    addForce(force: Force) {
        this.forces.push(force);
    }

    /** Remove force on object */
    removeForce(force: Force) {
        this.forces.splice(this.forces.indexOf(force), 1);
    }
}