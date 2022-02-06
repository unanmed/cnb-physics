/** A general object that can be calculated by the core physical simulator */
class GeneralObject {
    /**
     * Creates a new general object
     * @param {string} name The name of the object
     * @param {string} description The description of the object
     */
    constructor(name, description) {
        /** The mass of the object */
        this.mass = 0;
        /** The velocity of the object */
        this.velocity = [0, 0];
        /** The acceleration of the object */
        this.acceleration = [0, 0];
        /** The force applied on the object */
        this.forces = [];
        /** The position of the object */
        this.position = [0, 0];
        this.name = name;
        this.description = description;
        this.id = GeneralObject.idCounter++;
        this.gravityField = new GravityField(this.name, this);
        setObject(this, this.name);
    }
    /** Set the position of the object */
    setPosition(x = this.position[0], y = this.position[1]) {
        this.position[0] = x;
        this.position[1] = y;
    }
    /** Set the shape of the object */
    setShape(shape) {
        this.shape = shape;
    }
    /** Set the mass of the object */
    setMass(mass) {
        this.mass = mass;
        this.gravityField.mass = mass;
    }
    /** Add force on object */
    addForce(force) {
        this.forces.push(force);
    }
    /** Remove force on object */
    removeForce(force) {
        this.forces.splice(this.forces.indexOf(force), 1);
    }
    /** Add acceleration on the object */
    addAcceleration(x, y) {
        this.acceleration[0] += x;
        this.acceleration[1] += y;
    }
    /** Judge whether the object is in the given field */
    isInField(field) {
        if (field instanceof NonScopedField)
            return true;
    }
    /** Move this object */
    move() {
        this.position[0] += this.velocity[0];
        this.position[1] += this.velocity[1];
    }
}
/** The id counter of the object */
GeneralObject.idCounter = 0;

/** The object list */
const objectList = {};
/** The field list */
const fieldList = {};
/** All the constants will be used in the simulator */
const constants = {
    /** The gravity constant */
    G: 6.67259e-11,
    /** The speed of light */
    c: 299792458,
    /** The electrostatic force constant */
    k: 8.9875517873681764e9,
    /** The meta-charge */
    e: 1.602176634e-19,
};
/** Get a object from the object list
 * @param {string} name The name of the object
 * @returns {GeneralObject} The object. If the object doesn't exist, a new object will be created.
 */
function getObject(name) {
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
function setObject(object, name = object.name) {
    objectList[name] = object;
}
/** Remove a object from the object list
 * @param {string} name The name of the object
 * @returns {boolean} Whether the object is removed
 */
function removeObject(name) {
    if (objectList[name] === void 0) {
        return false;
    }
    delete objectList[name];
    return true;
}
/** Get the quote of object list */
function getObjectList() {
    return objectList;
}
/** Get a field from the field list
 * @param {string} name The name of the field
 * @param {string} type The type of the field, if the field is not in the field list,
 * and a new field typed this will be created.
 * @returns {Field} The field
 */
function getField(name, type) {
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
function setField(field, name = field.name) {
    fieldList[name] = field;
}
/** Remove a field from the field list
 * @param {string} name The name of the field
 * @returns {boolean} Whether the field is removed
 */
function removeField(name) {
    if (fieldList[name] === void 0) {
        return false;
    }
    delete fieldList[name];
    return true;
}
/** Get the quote of field list */
function getFieldList() {
    return fieldList;
}

/** A feild, which is untouchable but really exists */
class Field {
    /** Create a new field
     * @param {string} name The name of the field
     * @param {string} type The type of the field
     * @param {[number, number]} magnitude The magnitude of the field
     */
    constructor(name, type, magnitude) {
        this.name = name;
        this.type = type;
        this.magnitude = magnitude;
        this.id = Field.idCounter++;
        setField(this);
    }
    /** Destory this field */
    destroy() {
        removeField(this.name);
    }
    /** Calculate the force of the field */
    calculateForce(object) {
        if (this instanceof GravityField)
            return this.calculateForceGravity(object);
    }
}
/** The id counter of all the field */
Field.idCounter = 0;
/** A scoped field */
class ScopedField extends Field {
    /** Create a scoped field */
    constructor(name, type, magnitude) {
        super(name, type, magnitude);
    }
}
/** A non-scoped field */
class NonScopedField extends Field {
    /** Create a non-scoped field */
    constructor(name, type, magnitude) {
        super(name, type, magnitude);
    }
}

/** A gravity field, which has no scope */
class GravityField extends NonScopedField {
    /** Create a gravity field
     * @param {string} name The name of the field
     * @param {GeneralObject} centralObject The central object
     */
    constructor(name, centralObject) {
        super(name, "gravity");
        this.centralObject = centralObject;
        this.mass = centralObject.mass;
        this.center = centralObject.position;
    }
    /** Calculate the force of the field
     * @param {GeneralObject} object The object to calculate the force
     * @returns {[number, number]} The force of the field
     */
    calculateForceGravity(object) {
        if (object === this.centralObject)
            return [0, 0];
        const force = [0, 0];
        const distance = Math.sqrt(Math.pow(object.position[0] - this.center[0], 2) + Math.pow(object.position[1] - this.center[1], 2));
        force[0] = (this.mass * object.mass * constants.G) / Math.pow(distance, 2);
        force[1] = (this.mass * object.mass * constants.G) / Math.pow(distance, 2);
        return force;
    }
}

/** The core tool of the simulator, which take the task of force analysis */
class Analyzer {
    constructor() {
        /** The object list */
        this.objectList = {};
        /** The field list */
        this.fieldList = {};
        this.objectList = getObjectList();
        this.fieldList = getFieldList();
    }
    /** Analyze All the field */
    analyzeAllField() {
        const fields = Object.values(this.fieldList);
        for (const field of fields) {
            this.analyzeField(field);
        }
    }
    /** Analyze the field of the object */
    analyzeField(field) {
        const objects = Object.values(this.objectList);
        for (const object of objects) {
            const force = field.calculateForce(object);
            const acceleration = [force[0] / object.mass, force[1] / object.mass];
            object.acceleration[0] += acceleration[0];
            object.acceleration[1] += acceleration[1];
        }
    }
}

/** The main application of the simulator */
class App {
    constructor(config) {
        /** The loop functions list */
        this.loopFuncs = [];
        /** The running status of the app */
        this.status = 'running';
        this.config = config;
        this.run();
        this.analyzer = new Analyzer();
    }
    /** Run the app */
    run() {
        this.createLoop();
        this.status = 'running';
    }
    /** Stop the app */
    stop() {
        this.status = 'stopped';
    }
    /** Pause the app */
    pause() {
        this.status = 'paused';
    }
    /** Resume the app */
    resume() {
        this.status = 'running';
    }
    /** Create the raf loop */
    createLoop() {
        let loopTimes = 0;
        let lastTime = 0;
        let self = this;
        this.loop = (time) => {
            if (self.status === 'paused') {
                return requestAnimationFrame(this.loop);
            }
            else if (self.status === 'running') {
                let deltaTime = time - lastTime;
                lastTime = time;
                loopTimes++;
                self.update();
                for (let func of self.loopFuncs) {
                    func(loopTimes, deltaTime);
                }
                requestAnimationFrame(this.loop);
            }
            else if (self.status === 'stopped') {
                this.loop = void 0;
                return;
            }
        };
        requestAnimationFrame(this.loop);
    }
    /** Update the app */
    update() {
        this.analyzer.analyzeAllField();
        this.moveAllObjects();
    }
    /** Add loop function */
    addLoop(func) {
        this.loopFuncs.push(func);
    }
    /** Remove loop function */
    removeLoop(func) {
        this.loopFuncs.splice(this.loopFuncs.indexOf(func), 1);
    }
    /** Move all the objects */
    moveAllObjects() {
        const list = Object.values(getObjectList());
        for (const object of list) {
            object.move();
        }
    }
}

/** An electric field which can apply force on the charged object */
class ElectricField extends ScopedField {
}

/** A magnetic field */
class MagneticField extends ScopedField {
    /** Create a magnetic field */
    constructor(name, magnitude) {
        super(name, "magnetic", magnitude);
    }
}

/** The force that can be added to the object */
class Force {
    /** Create a new Force
     * @param {string} name The name of the force
     * @param {string} type The type of the force
     */
    constructor(name, type) {
        this.name = name;
        this.type = type;
    }
    /** Set the magnitude of the force */
    setMagnitude(magnitude) {
        this.magnitude = magnitude;
    }
    /** Set the time of the force */
    setTime(time) {
        this.time = time;
    }
    /** Apply force on object */
    apply(object) {
        object.addForce(this);
    }
    /** Remove force on object */
    remove(object) {
        object.removeForce(this);
    }
}

/** The constant force */
class ConstantForce extends Force {
    /** Create a constant force */
    constructor(name) {
        super(name, "constant");
    }
}

/** A round object that extends general object */
class RoundObject extends GeneralObject {
    /**
     * Creates a new round object
     * @param {string} name The name of the object
     * @param {string} description The description of the object
     * @param {number} radius The radius of the object
     */
    constructor(name, description, radius) {
        super(name, description);
        this.radius = radius;
    }
}

/** The shape of a object or other things */
class Shape {
    /**
     * Creates a new shape
     * @param {string} type The type of the shape
     * @param {string} id The id of the shape
     * @param {[number, number]} center The node of the shape
     */
    constructor(id, type, center) {
        this.id = id;
        this.type = type;
        this.center = center;
    }
    /** Set the node of the shape. The node is a 2D array that every node
     *  includes the position of x and y. The node must be closed.
     */
    setNode(node) {
        this.node = node;
    }
    /** Set the radius of the shape */
    setRadius(radius) {
        this.radius = radius;
    }
}

export { Analyzer, App, ConstantForce, ElectricField, Field, Force, GeneralObject, GravityField, MagneticField, NonScopedField, RoundObject, ScopedField, Shape, constants, getField, getFieldList, getObject, getObjectList, removeField, removeObject, setField, setObject };
