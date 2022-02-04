import { Force } from "./force";

/** The constant force */
export class ConstantForce extends Force {

    /** Create a constant force */
    constructor(name: string) {
        super(name, "constant");
    }
}