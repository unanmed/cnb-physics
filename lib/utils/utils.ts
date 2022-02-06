import { Field, FieldList } from "../field/field";
import { GeneralObject } from "../object/object";

/** The object list */
const objectList: { [key: number]: GeneralObject } = {};
/** The field list */
const fieldList: { [key: number]: Field<any> } = {};

/** All the constants will be used in the simulator */
export const constants = {
    /** The gravity constant */
    G: 6.67259e-11,
    /** The speed of light */
    c: 299792458,
    /** The electrostatic force constant */
    k: 8.9875517873681764e9,
    /** The meta-charge */
    e: 1.602176634e-19,
}

/** Get a object by name from the object list
 * @param {string} name The name of the object
 * @returns {GeneralObject} The first object named the given parameter. 
 * If the object doesn't exist, returns undefined.
 */
export function getObjectByName(name: string): GeneralObject {
    return Object.values(objectList).find(object => object.name === name);
}

/** Set a object in the object list
 * @param {string} name The name of the object. 
 * If not filled, it will be regarded as the name of the object
 * @param {GeneralObject} object The object to be set
 */
export function setObject(object: GeneralObject): void {
    objectList[object.id] = object;
}

/** Remove a object from the object list
 * @param {string} name The name of the object
 * @returns {boolean} Whether the object is removed
 */
export function removeObjectByName(name: string): boolean {
    if (getObjectByName(name) === void 0) {
        return false;
    }
    delete objectList[getObjectByName(name).id];
    return true;
}

/** Remove a object by its id
 * @param {number} id The id of the object
 * @returns {boolean} Whether the object is removed
 */
export function removeObjectById(id: number): boolean {
    if (objectList[id] === void 0) {
        return false;
    }
    delete objectList[id];
    return true;
}

/** Get the quote of object list */
export function getObjectList(): { [key: string]: GeneralObject } {
    return objectList;
}

/** Get a field by name from the field list
 * @param {string} name The name of the field
 * @param {string} type The type of the field, if the field is not in the field list, returns undefined
 * @returns {Field} The field
 */
export function getFieldByName(name: string): Field<any> {
    return Object.values(fieldList).find(field => field.name === name);
}

/** Set a field in the field list
 * @param {string} name The name of the field.
 * If not filled, it will be regarded as the name of the field
 * @param {Field} field The field to be set
 */
export function setField(field: Field<any>): void {
    fieldList[field.id] = field;
}

/** Remove a field from the field list
 * @param {string} name The name of the field
 * @returns {boolean} Whether the field is removed
 */
export function removeFieldByName(name: string): boolean {
    const obj = getFieldByName(name);
    if (obj === void 0) {
        return false;
    }
    delete fieldList[getFieldByName(name).id];
    return true;
}

/** Remove a field by its id
 * @param {number} id The id of the field
 * @returns {boolean} Whether the field is removed
 */
export function removeFieldById(id: number): boolean {
    if (fieldList[id] === void 0) {
        return false;
    }
    delete fieldList[id];
    return true;
}

/** Get the quote of field list */
export function getFieldList(): { [key: string]: Field<any> } {
    return fieldList;
}