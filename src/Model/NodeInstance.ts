import { Server } from "./Server";
import { TeleportZone } from "./TeleportZone";
import { Point } from "./Point";
import { Dictionary } from "typescript-collections";

/**
 * An instance of a Factorio server. Multiple nodes can run on the same server.
 */
export class NodeInstance {
    public Name: string;
    public Server: Server;
    public readonly TeleportZones: Dictionary<string, TeleportZone> = new Dictionary<string, TeleportZone>();
    public Width: number;
    public Height: number;
    public TopLeftCoordinate: Point;
    /** The Clusterio Unique ID for this node */
    public ClusterioWorldId: string;

    public constructor(name: string, topLeftCoordinate: Point, width: number, height: number) {
        this.Name = name;
        this.Width = width;
        this.Height = height;
        this.TopLeftCoordinate = topLeftCoordinate;
    }

    public get BottomRightCoordinate(): Point {
        return new Point(
            this.TopLeftCoordinate.X + this.Width,
            this.TopLeftCoordinate.Y + this.Height);
    }

    // public AddTeleportZone(name: string, topLeftCoordinate: Point, bottomRightCoordinate: Point) {
    //     this.TeleportZones.push(new TeleportZone(this, topLeftCoordinate, bottomRightCoordinate, name));
    // }

    public AddTeleportZonePoint() {

    }

    public get Key() {
        return this.Name;
    }

}