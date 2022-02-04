import { Field, FieldList } from "../field/field";
import { GeneralObject } from "../object/object";

/** The object list */
const objectList: { [key: string]: GeneralObject } = {};
/** The field list */
const fieldList: { [key: string]: Field } = {};

/** Get a object from the object list
 * @param {string} name The name of the object
 * @returns {GeneralObject} The object. If the object doesn't exist, a new object will be created.
 */
export function getObject(name: string): GeneralObject {
    if (objectList[name] === void 0) {
        objectList[name] = new GeneralObject(name, "");
    }
    return objectList[name];
}

/** Set a object in the object list
 * @param {string} name The name of the object. 
 * If not filled, it will be regarded as the name of the object
 * @param {GeneralObject} object The object to be set
 */
export function setObject(object: GeneralObject, name: string = object.name): void {
    objectList[name] = object;
}

/** Remove a object from the object list
 * @param {string} name The name of the object
 * @returns {boolean} Whether the object is removed
 */
export function removeObject(name: string): boolean {
    if (objectList[name] === void 0) {
        return false;
    }
    delete objectList[name];
    return true;
}

/** Get the quote of object list */
export function getObjectList(): { [key: string]: GeneralObject } {
    return objectList;
}

/** Get a field from the field list
 * @param {string} name The name of the field
 * @param {string} type The type of the field, if the field is not in the field list,
 * and a new field typed this will be created.
 * @returns {Field} The field
 */
export function getField(name: string, type?: keyof FieldList): Field {
    if (fieldList[name] === void 0) {
        fieldList[name] = new Field(name, type);
    }
    return fieldList[name];
}

/** Set a field in the field list
 * @param {string} name The name of the field.
 * If not filled, it will be regarded as the name of the field
 * @param {Field} field The field to be set
 */
export function setField(field: Field, name: string = field.name): void {
    fieldList[name] = field;
}

/** Remove a field from the field list
 * @param {string} name The name of the field
 * @returns {boolean} Whether the field is removed
 */
export function removeField(name: string): boolean {
    if (fieldList[name] === void 0) {
        return false;
    }
    delete fieldList[name];
    return true;
}

/** Get the quote of field list */
export function getFieldList(): { [key: string]: Field } {
    return fieldList;
}