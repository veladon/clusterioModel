import { Point } from "./Point";
import { NodeInstance } from ".";
import { TeleportZoneRestriction } from "./TeleportZoneRestriction";
import { TeleportZoneDirection } from "./TeleportZoneDirection";
import * as Config from "./Config";

export class TeleportZone {
    public TopLeftCoordinate: Point;
    public BottomRightCoordinate: Point;
    public ParentNode: NodeInstance;
    //public readonly Restrictions: Array<TeleportZoneRestriction> = new Array<TeleportZoneRestriction>();
    public Direction: TeleportZoneDirection;
    public Index: number;
    public TargetNode: NodeInstance;

    constructor(parentNode: NodeInstance, direction: TeleportZoneDirection, topLeftCoordinate: Point, bottomRightCoordinate: Point,
                index: number, targetNode: NodeInstance) {
        this.TopLeftCoordinate = topLeftCoordinate;
        this.BottomRightCoordinate = bottomRightCoordinate;
        this.ParentNode = parentNode;
        this.Direction = direction;
        this.Index = index;
        this.TargetNode = targetNode;
    }

    public get Name(): string {
        return TeleportZoneDirection[this.Direction] + " to " + this.TargetNode.Name;
    }

    // public AddRestriction(restrictingTeleportZone: TeleportZone) {
    //     this.Restrictions.push(new TeleportZoneRestriction(this, restrictingTeleportZone));
    // }

    /**
     * Converts this teleport zone into Factorio map co-ordinates
     * @returns [name, topleft.x, topleft.y, width, height, zoneIndex]
     */
    public GenerateTeleportZoneInFactorioCoordinates(): [string, number, number, number, number, number] {
        // get where this zone is relative to the node itself
        let topLeftRelativeCoordinate = this.TopLeftCoordinate.Subtract(this.ParentNode.TopLeftCoordinate);
        // a grid coordinate point is equivalent to a 1x1 node, so bottomright = topleft.
        // add (1,1) to translate from area representation to coordinates representing actual points.
        let bottomRightRelativeCoordinate = this.BottomRightCoordinate
            .Subtract(this.ParentNode.TopLeftCoordinate)
            .Add(new Point(1, 1));

        // Factorio map is e.g. (-500,-500) to (500, 500) for a 1000x1000 node.
        // We therefore need to offset our co-ordinates so that (0,0) is the center and not (width/2, height/2)
        let m = Config.GridToFactorioCoordinateSystemMultiplier;
        let factorioTeleportZoneTopLeft = new Point(topLeftRelativeCoordinate.X * m - m / 2, topLeftRelativeCoordinate.Y * m - m / 2);
        let factorioTeleportZoneBottomRight = new Point(bottomRightRelativeCoordinate.X * m - m / 2, bottomRightRelativeCoordinate.Y * m - m / 2);
        

        let zoneWidth = factorioTeleportZoneBottomRight.X - factorioTeleportZoneTopLeft.X;
        let zoneHeight = factorioTeleportZoneBottomRight.Y - factorioTeleportZoneTopLeft.Y;
        let tl = factorioTeleportZoneTopLeft;
        let br = factorioTeleportZoneBottomRight;
        let zw = Config.TeleportZoneWidth;
        switch(this.Direction) {
            case TeleportZoneDirection.North:
                return [this.Name, tl.X, tl.Y, zoneWidth, zw, this.Index + 1];
            case TeleportZoneDirection.West:
                return [this.Name, tl.X, tl.Y, zw, zoneHeight, this.Index + 1];
            case TeleportZoneDirection.South:
                return [this.Name, tl.X, br.Y - zw, zoneWidth, zw, this.Index + 1];
            case TeleportZoneDirection.East:
                return [this.Name, br.X - zw, tl.Y, zw, zoneHeight, this.Index + 1];
        }
    }

    /**
     * Generates a zone restriction from this teleport zone to target zone
     * @returns [zoneIndex, targetNodeName, targetZoneName]
     */
    public GenerateZoneRestriction(): [number, string, string] {
        let targetZone = this.TargetNode.TeleportZones.getValue(this.ParentNode.Key);
        return [this.Index + 1, this.TargetNode.Name, targetZone.Name];
    }
}