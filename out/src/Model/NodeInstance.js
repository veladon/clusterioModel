"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Point_1 = require("./Point");
const typescript_collections_1 = require("typescript-collections");
/**
 * An instance of a Factorio server. Multiple nodes can run on the same server.
 */
class NodeInstance {
    constructor(name, topLeftCoordinate, width, height) {
        this.TeleportZones = new typescript_collections_1.Dictionary();
        this.Name = name;
        this.Width = width;
        this.Height = height;
        this.TopLeftCoordinate = topLeftCoordinate;
    }
    get BottomRightCoordinate() {
        return new Point_1.Point(this.TopLeftCoordinate.X + this.Width, this.TopLeftCoordinate.Y + this.Height);
    }
    // public AddTeleportZone(name: string, topLeftCoordinate: Point, bottomRightCoordinate: Point) {
    //     this.TeleportZones.push(new TeleportZone(this, topLeftCoordinate, bottomRightCoordinate, name));
    // }
    AddTeleportZonePoint() {
    }
    get Key() {
        return this.Name;
    }
    /**
     * This method must be used to convert the node instance array from a plain old json object into class instances
     * @param objectArray node instance object array created from a json file or string
     */
    static CreateFromJson(objectArray) {
        let returnArray = new Array();
        objectArray.forEach(o => {
            returnArray.push(new NodeInstance(o.Name, new Point_1.Point(o.TopLeftCoordinate.X, o.TopLeftCoordinate.Y), o.Width, o.Height));
        });
        return returnArray;
    }
}
exports.NodeInstance = NodeInstance;
//# sourceMappingURL=NodeInstance.js.map