import { NonScopedField } from "./field";

/** A gravity field, which has no scope */
export class GravityField extends NonScopedField {
    /** Create a gravity field */
    constructor(name: string, magnitude: [number, number, number?]) {
        super(name, "gravity", magnitude);
    }
}
