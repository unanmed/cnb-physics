import { ScopedField } from "./field";
import { Shape } from "../shape/shape";
import { GeneralObject } from "../object/object";

/** A uniform electric field which can apply force on the charged object */
export class UniformElectricField extends ScopedField<'electric'> {
    /** The magnitude of the field */
    magnitude: [number, number];

    /** Create a uniform electric field */
    constructor(name: string, magnitude: [number, number], shape: Shape, position: [number, number] = [0, 0]) {
        super(name, 'electric', magnitude);
        this.setShape(shape);
        this.position = position;
    }

    /** Judge whether a object is in this field */
    isInField(object: GeneralObject, position: [number, number] = [0, 0]): boolean {
        return this.shape.isInShape(object.position, position);
    }

    /** Calculate the force of the field */
    calculateForceElectic(object: GeneralObject): [number, number] {
        if (!this.isInField(object, this.position)) return [0, 0];
        const force: [number, number] = [0, 0];
        const x = this.magnitude[0] * object.charge;
        const y = this.magnitude[1] * object.charge;
        force[0] = x;
        force[1] = y;
        return force;
    }

    /** Set the shape of the field */
    setShape(shape: Shape) {
        this.shape = shape;
    }
}