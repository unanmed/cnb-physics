import { ElectricField } from "./electric";
import { GravityField } from "./gravity";
import { MagneticField } from "./magnetic";

/** The interface of all types of feild */
export interface FieldList {
    electric: ElectricField;
    gravity: GravityField;
    magnetic: MagneticField;
}

/** A feild, which is untouchable but is really exists */
export class Field {
    /** The id counter of all the field */
    static idCounter: number = 0;
    /** The type of the field */
    readonly type: keyof FieldList;
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
    constructor(name: string, type: keyof FieldList, magnitude?: [number, number, number?]) {
        this.name = name;
        this.type = type;
        this.magnitude = magnitude;
        this.id = Field.idCounter++;
    }
}

/** A scoped field */
export class ScopedField extends Field {

    /** Create a scoped field */
    constructor(name: string, type: keyof FieldList, magnitude: [number, number, number?]) {
        super(name, type, magnitude);
    }
}

/** A non-scope field */
export class NonScopedField extends Field {

    /** Create a non-scoped field */
    constructor(name: string, type: keyof FieldList, magnitude: [number, number, number?]) {
        super(name, type, magnitude);
    }
}