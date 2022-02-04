import { ScopedField } from "./field";

/** A magnetic field */
export class MagneticField extends ScopedField {
    /** Create a magnetic field */
    constructor(name: string, magnitude: [number, number, number?]) {
        super(name, "magnetic", magnitude);
    }
}