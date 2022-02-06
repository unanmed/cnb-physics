import { Field, NonScopedField } from "../field/field";
import { GravityField } from "../field/gravity";
import { Force } from "../force/force";
import { Shape } from "../shape/shape";
import { setObject } from "../utils/utils";

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
    mass: number = 0;
    /** The velocity of the object */
    velocity: [number, number] = [0, 0];
    /** The acceleration of the object */
    acceleration: [number, number] = [0, 0];
    /** The force applied on the object */
    forces: Force[] = [];
    /** The position of the object */
    position: [number, number] = [0, 0];
    /** The gravity field that the object generate */
    gravityField: GravityField;
    /** The charge of the object */
    charge: number = 0;

    /**
     * Creates a new general object
     * @param {string} name The name of the object
     * @param {string} description The description of the object
     */
    constructor(name: string, description: string, mass: number) {
        this.name = name;
        this.description = description;
        this.id = GeneralObject.idCounter++;
        this.gravityField = new GravityField(this.name, this);
        setObject(this);
        this.setMass(mass);
    }

    /** Set the position of the object */
    setPosition(x: number = this.position[0], y: number = this.position[1]) {
        this.position[0] = x;
        this.position[1] = y;
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

    /** Add acceleration on the object */
    addAcceleration(x: number, y: number) {
        this.acceleration[0] += x;
        this.acceleration[1] += y;
    }

    /** Judge whether the object is in the given field */
    isInField(field: Field<any>) {
        if (field instanceof NonScopedField) return true;
    }

    /** Move this object */
    move(rate: number = 1) {
        this.position[0] += this.velocity[0] / rate;
        this.position[1] += this.velocity[1] / rate;
    }

    /** Set the velocity of the object */
    setVelocity(x: number, y: number) {
        this.velocity[0] = x;
        this.velocity[1] = y;
    }

    /** Set the charge of the object */
    setCharge(charge: number) {
        this.charge = charge;
    }
}