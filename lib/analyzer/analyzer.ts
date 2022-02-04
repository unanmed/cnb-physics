import { GeneralObject } from "../object/object";
import { getObjectList } from "../utils/utils";

/** The core tool of the simulator, which take the task of force analysis */
export class Analyzer {
    /** The object list */
    objectList: { [key: string]: GeneralObject } = {};

    constructor() {
        this.objectList = getObjectList();
    }

    /** Analyze all objects */
    analyzeAll(): void {
        for (const key in this.objectList) {
            if (this.objectList.hasOwnProperty(key)) {
                this.analyze(this.objectList[key]);
            }
        }
    }

    /** Analyze one object */
    analyze(object: GeneralObject): void {

    }

    /** Analyze the force of one object */
    analyzeForce(object: GeneralObject): void {

    }

    /** Analyze the acceleration of one object */
    analyzeAcceleration(object: GeneralObject): void {

    }

    /** Analyze the velocity of one object */
    analyzeVelocity(object: GeneralObject): void {

    }

    /** Analyze the position of one object */
    analyzePosition(object: GeneralObject): void {

    }
}