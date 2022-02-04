/** The shape of a object or other things */
export class Shape {
    /** The node of the shape */
    node: Array<[number, number]>;
    /** The center of the shape */
    center: [number, number];
    /** The radius of the shape */
    radius: number;
    /** The type of the shape */
    readonly type: string;
    /** The id of the shape */
    readonly id: string;

    /**
     * Creates a new shape
     * @param {string} type The type of the shape
     * @param {string} id The id of the shape
     * @param {[number, number]} center The node of the shape
     */
    constructor(id: string, type: string, center: [number, number]) {
        this.id = id;
        this.type = type;
        this.center = center;
    }

    /** Set the node of the shape. The node is a 2D array that every node
     *  includes the position of x and y. The node must be closed.
     */
    setNode(node: Array<[number, number]>) {
        this.node = node;
    }

    /** Set the radius of the shape */
    setRadius(radius: number) {
        this.radius = radius;
    }
}