type Type = 'circle' | 'polygon' | string;

/** The shape of a object or other things */
export class Shape {
    /** The node of the shape */
    node: Array<[number, number]>;
    /** The center of the shape */
    center: [number, number];
    /** The radius of the shape */
    radius: number;
    /** The type of the shape */
    readonly type: 'circle' | 'polygon' | string;
    /** The id of the shape */
    readonly id: string;

    /**
     * Creates a new shape
     * @param {string} type The type of the shape
     * @param {[number, number]} center The node of the shape. 
     * If the type isn't circle, the parameter has no effect.
     * @param {Array<[number, number]>|number} node The node of the shape. 
     * The node is a 2D array that every node
     * includes the position of x and y.
     * if the type is circle, the node is the radius of the circle.
     */
    constructor(type: Type, center: [number, number], radius: number);
    constructor(type: Type, center: [number, number], node: Array<[number, number]>);
    constructor(type: Type, center: [number, number], node: Array<[number, number]> | number) {
        this.type = type;
        this.center = center;
        if (node instanceof Array) this.setNode(node);
        else this.radius = node;
    }

    /** Set the node of the shape. The node is a 2D array that every node
     *  includes the position of x and y. The first and the end of the node should be different.
     */
    setNode(node: Array<[number, number]>) {
        this.node = node;
        if (JSON.stringify(node[0]) !== JSON.stringify(node[node.length - 1]))
            this.node.push(node[0]);
    }

    /** Set the radius of the shape */
    setRadius(radius: number) {
        this.radius = radius;
    }

    /** Judge whether a point is in the shape */
    isInShape(point: [number, number], position: [number, number] = [0, 0]): boolean {
        point = [point[0] - position[0], point[1] - position[1]];
        if (this.type === 'circle') {
            return Math.pow(point[0] - this.center[0], 2) + Math.pow(point[1] - this.center[1], 2) <= Math.pow(this.radius, 2);
        } else if (this.type === 'polygon') {
            // Judge the intersection number of the point and the shape
            let points = 0;
            for (let i = 0; i < this.node.length - 1; i++) {
                const y1 = this.node[i][1];
                const y2 = this.node[i + 1][1];
                if (point[1] >= Math.min(y1, y2) && point[1] <= Math.max(y1, y2) && point[0] <= Math.max(this.node[i][0], this.node[i + 1][0])) {
                    points++;
                }
            }
            if (points % 2 === 1) return true;
            else return false;
        }
    }
}