import { UniformElectricField } from "../field/electric";
import { Field, NonScopedField } from "../field/field";
import { GravityField } from "../field/gravity";
import { Force } from "../force/force";
import { Shape } from "../shape/shape";
import { getFieldList, setObject } from "../utils/utils";

export interface ObjectOptions extends GeneralObject {

}

/** A general object that can be calculated by the core physical simulator */
export class GeneralObject {
    /** The id counter of the object */
    static idCounter: number = 0;
    /** The name of the object */
    readonly name: string;
    /** The description of the object */
    description?: string;
    /** The id of the object */
    readonly id: number;
    /** The shape of the object */
    shape?: Shape;
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
    constructor(name: string, config: ObjectOptions) {
        this.name = name;
        this.id = GeneralObject.idCounter++;
        this.gravityField = new GravityField(this.name, this);
        setObject(this);
        this.setConfig(config);
    }

    /** Set the object by given config */
    setConfig(config: ObjectOptions) {
        if (config.description) this.description = config.description;
        if (config.mass) this.setMass(config.mass);
        if (config.position) this.setPosition(config.position[0], config.position[1]);
        if (config.velocity) this.setVelocity(config.velocity[0], config.velocity[1]);
        if (config.charge) this.setCharge(config.charge);
        if (config.shape) this.setShape(config.shape);
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
        this.position[0] += this.velocity[0] / rate / 60;
        this.position[1] += this.velocity[1] / rate / 60;
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

    /** Calculate the force applied on the object */
    calculateForce(): [number, number] {
        const force: [number, number] = [0, 0];
        const fields = Object.values(getFieldList());
        for (const f of fields) {
            if (f instanceof GravityField) {
                const ff = f.calculateForceGravity(this);
                force[0] += ff[0];
                force[1] += ff[1];
            } else if (f instanceof UniformElectricField) {
                const ff = f.calculateForceElectic(this);
                force[0] += ff[0];
                force[1] += ff[1];
            }
        }
        return force;
    }

    /** Calculate the acceleration applied on the object */
    calculateAcceleration(rate: number = 1): [number, number] {
        if (!this.mass) return;
        const force = this.calculateForce();
        const acceleration: [number, number] = [0, 0];
        acceleration[0] = force[0] / this.mass;
        acceleration[1] = force[1] / this.mass;
        this.acceleration = acceleration;
        this.velocity[0] += acceleration[0] / rate / 60;
        this.velocity[1] += acceleration[1] / rate / 60;
        return acceleration;
    }
}