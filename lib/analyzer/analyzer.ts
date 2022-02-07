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

    /** Analyze all the object */
    analyzeAll(rate: number): void {
        const list = Object.values(this.objectList);
        for (const obj of list) {
            obj.calculateAcceleration(rate);
        }
    }
}