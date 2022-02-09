import { ScopedField } from "./field";

/** A magnetic field */
export class MagneticField extends ScopedField<'magnetic'> {
    /** Create a magnetic field */
    constructor(name: string, magnitude: number) {
        super(name, "magnetic", [0, 0, magnitude]);
    }
}