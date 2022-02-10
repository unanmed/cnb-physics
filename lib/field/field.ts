import type { UniformElectricField } from "./electric";
import type { GravityField } from "./gravity";
import { MagneticField } from "./magnetic";
import { removeFieldById, setField } from "../utils/utils";
import { Shape } from "../shape/shape";
import { GeneralObject } from "../object/object";

/** The interface of all types of feild */
export interface FieldList {
    electric: UniformElectricField;
    gravity: GravityField;
    magnetic: MagneticField;
}

/** A feild, which is untouchable but really exists */
export class Field<T extends keyof FieldList> {
    /** The id counter of all the field */
    static idCounter: number = 0;
    /** The type of the field */
    readonly type: T;
    /** The magnitude of the field. Not available for magnetic field */
    magnitude: [number, number, number?];
    /** The name of the field */
    readonly name: string;
    /** The id of the field */
    readonly id: number;
    /** The magniyude of the field if the field is a magnetic field.
     * If the value is positive, the direction of the field is vertical screen outward.
     * If the value is negative, the direction of the field is vertical screen inward.
     */
    magneticMagnitude: number;

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
        if (type === 'magnetic') this.magneticMagnitude = magnitude[2];
        setField(this);
    }

    /** Destory this field */
    destroy() {
        removeFieldById(this.id);
    }
}

/** A scoped field */
export class ScopedField<T extends keyof FieldList> extends Field<T> {
    /** The shape of the field */
    shape: Shape;
    /** The left top position of the field */
    position: [number, number];

    /** Create a scoped field */
    constructor(name: string, type: T, magnitude?: [number, number, number?], position: [number, number] = [0, 0]) {
        super(name, type, magnitude);
        this.position = position;
    }
}

/** A non-scoped field */
export class NonScopedField<T extends keyof FieldList> extends Field<T> {

    /** Create a non-scoped field */
    constructor(name: string, type: T, magnitude?: [number, number, number?]) {
        super(name, type, magnitude);
    }
}