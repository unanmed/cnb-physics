import { GeneralObject } from "../object/object";
/** The object list */
const objectList: { [key: string]: GeneralObject } = {};

/** Get a object from the object pool
 * @param {string} name The name of the object
 */
export function getObject(name: string): GeneralObject {
    if (objectList[name] === void 0) {
        objectList[name] = new GeneralObject(name, "");
    }
    return objectList[name];
}

/** Set a object in the object pool
 * @param {string} name The name of the object. 
 * If not filled, it will be regarded as the name of the object
 * @param {GeneralObject} object The object to be set
 */
export function setObject(object: GeneralObject, name?: string): void {
    objectList[name] = object;
}