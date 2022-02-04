import { ElectricField } from "./electric";
import { GravityField } from "./gravity";
import { MagneticField } from "./magnetic";
import { removeField, setField } from "../utils/utils";
import { Shape } from "../shape/shape";
import { GeneralObject } from "../object/object";

/** The interface of all types of feild */
export interface FieldList {
    electric: ElectricField;
    gravity: GravityField;
    magnetic: MagneticField;
}

/** A feild, which is untouchable but really exists */
export class Field<T extends keyof FieldList> {
    /** The id counter of all the field */
    static idCounter: number = 0;
    /** The type of the field */
    readonly type: T;
    /** The magnitude of the field */
    magnitude: [number, number, number?];
    /** The name of the field */
    readonly name: string;
    /** The id of the field */
    readonly id: number;

    /** Create a new field
     * @param {string} name The name of the field
     * @param {string} type The type of the field
     * @param {[number, number]} magnitude The magnitude of the field
     */
    constructor(name: string, type: T, magnitude?: [number, number, number?]) {
        this.name = name;
        this.type = type;
        this.magnitude = magnitude;
        this.id = Field.idCounter++;
        setField(this);
    }

    /** Destory this field */
    destroy() {
        removeField(this.name);
    }

    /** Calculate the force of the field */
    calculateForce(object: GeneralObject): [number, number] {
        if (this instanceof GravityField) return this.calculateForceGravity(object);
    }
}

/** A scoped field */
export class ScopedField<T extends keyof FieldList> extends Field<T> {
    /** The shape of the field */
    shape: Shape;

    /** Create a scoped field */
    constructor(name: string, type: T, magnitude?: [number, number, number?]) {
        super(name, type, magnitude);
    }
}

/** A non-scoped field */
export class NonScopedField<T extends keyof FieldList> extends Field<T> {

    /** Create a non-scoped field */
    constructor(name: string, type: T, magnitude?: [number, number, number?]) {
        super(name, type, magnitude);
    }
}