import { Field } from "../field/field";
import { GeneralObject } from "../object/object";
import { getFieldList, getObjectList } from "../utils/utils";

/** The core tool of the simulator, which take the task of force analysis */
export class Analyzer {
    /** The object list */
    objectList: { [key: string]: GeneralObject } = {};
    /** The field list */
    fieldList: { [key: string]: Field<any> } = {};

    constructor() {
        this.objectList = getObjectList();
        this.fieldList = getFieldList();
    }

    /** Analyze All the field */
    analyzeAllField(): void {
        const fields = Object.values(this.fieldList);
        for (const field of fields) {
            this.analyzeField(field);
        }
    }

    /** Analyze the field of the object */
    analyzeField(field: Field<any>): void {
        const objects = Object.values(this.objectList);
        for (const object of objects) {
            field.calculateForce(object);
        }
    }
}