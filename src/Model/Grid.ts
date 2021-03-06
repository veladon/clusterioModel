import { Dictionary } from "typescript-collections";
import { Point } from "./Point";
import { NodeInstance } from "./NodeInstance";
import { TeleportZone } from "./TeleportZone";
import { TeleportZoneDirection } from "./TeleportZoneDirection";

export class Grid {
    private _nodeCoordinates: Dictionary<Point, NodeInstance> = new Dictionary<Point, NodeInstance>();
    private _nodes: Dictionary<string, NodeInstance> = new Dictionary<string, NodeInstance>();
    private _minX: number = 0;
    private _minY: number = 0;
    private _maxX: number = 0;
    private _maxY: number = 0;

    public GetNodes(): NodeInstance[] {
        return this._nodes.values();
    }

    /**
     * Adds a node to the grid
     * @param topLeftCoordinate The top left x,y coordinate of the node
     * @param nodeInstance 
     */
    public AddNodeToGrid(nodeInstance: NodeInstance) {
        this._nodes.setValue(nodeInstance.Name, nodeInstance);
        let topLeftCoordinate = nodeInstance.TopLeftCoordinate;
        let pointsToSave = new Array<Point>();
        // check all points that make up nodeInstance for existing nodes
        for(let x = topLeftCoordinate.X; x < topLeftCoordinate.X + nodeInstance.Width; x++) {
            for(let y = topLeftCoordinate.Y; y < topLeftCoordinate.Y + nodeInstance.Height; y++) {
                let currentPoint = new Point(x,y);
                let existingNode = this._nodeCoordinates.getValue(currentPoint);
                if(existingNode != null) {
                    throw new Error("Cannot add node to grid - collision detected with node '" + existingNode.Name + "'");
                }
                pointsToSave.push(currentPoint);
            }
        }
        // no existing nodes found to assign node to these points
        for(let i = 0; i < pointsToSave.length; i++) {
            this._nodeCoordinates.setValue(pointsToSave[i], nodeInstance);
        }

        //TODO: Refactor
        //#region Set up teleport zones
        // check surrounding points for nodes
        // check north points
        let y = topLeftCoordinate.Y - 1;
        for(let x = topLeftCoordinate.X; x < topLeftCoordinate.X + nodeInstance.Width; x++) {
            let currentPoint = new Point(x,y);
            let existingNode = this._nodeCoordinates.getValue(currentPoint);
            // found a node - set up teleport zone
            if(existingNode != null) {
                // Create/Update teleport node in existing node to new node
                let teleportZoneFromExistingToNew = existingNode.TeleportZones.getValue(nodeInstance.Key);
                if(teleportZoneFromExistingToNew == null) {
                    teleportZoneFromExistingToNew = new TeleportZone(
                        existingNode, 
                        TeleportZoneDirection.South,
                        currentPoint, 
                        currentPoint,
                        existingNode.TeleportZones.size(),
                        nodeInstance);
                    existingNode.TeleportZones.setValue(nodeInstance.Key, teleportZoneFromExistingToNew);
                }
                else {
                    teleportZoneFromExistingToNew.BottomRightCoordinate = currentPoint;
                }
                // Create/Update teleport node in new node to existing node
                let teleportZoneFromNewToExisting = nodeInstance.TeleportZones.getValue(existingNode.Key);
                let pointInNewNode = new Point(currentPoint.X, currentPoint.Y + 1);
                if(teleportZoneFromNewToExisting == null) {
                    teleportZoneFromNewToExisting = new TeleportZone(
                        nodeInstance, 
                        TeleportZoneDirection.North,
                        pointInNewNode, 
                        pointInNewNode,
                        nodeInstance.TeleportZones.size(),
                        existingNode);
                    nodeInstance.TeleportZones.setValue(existingNode.Key, teleportZoneFromNewToExisting);
                }
                else {
                    teleportZoneFromNewToExisting.BottomRightCoordinate = currentPoint;
                }
                
            }
        }
        // check south points
        y = topLeftCoordinate.Y + nodeInstance.Height + 1;
        for(let x = topLeftCoordinate.X; x < topLeftCoordinate.X + nodeInstance.Width; x++) {
            let currentPoint = new Point(x,y);
            let existingNode = this._nodeCoordinates.getValue(currentPoint);
            // found a node - set up teleport zone
            if(existingNode != null) {
                // Create/Update teleport node in existing node to new node
                let teleportZoneFromExistingToNew = existingNode.TeleportZones.getValue(nodeInstance.Key);
                if(teleportZoneFromExistingToNew == null) {
                    teleportZoneFromExistingToNew = new TeleportZone(
                        existingNode, 
                        TeleportZoneDirection.North,
                        currentPoint, 
                        currentPoint,
                        existingNode.TeleportZones.size(),
                        nodeInstance);
                    existingNode.TeleportZones.setValue(nodeInstance.Key, teleportZoneFromExistingToNew);
                }
                else {
                    teleportZoneFromExistingToNew.BottomRightCoordinate = currentPoint;
                }
                // Create/Update teleport node in new node to existing node
                let teleportZoneFromNewToExisting = nodeInstance.TeleportZones.getValue(existingNode.Key);
                let pointInNewNode = new Point(currentPoint.X, currentPoint.Y - 1);
                if(teleportZoneFromNewToExisting == null) {
                    teleportZoneFromNewToExisting = new TeleportZone(
                        nodeInstance, 
                        TeleportZoneDirection.South,
                        pointInNewNode, 
                        pointInNewNode,
                        nodeInstance.TeleportZones.size(),
                        existingNode);
                    nodeInstance.TeleportZones.setValue(existingNode.Key, teleportZoneFromNewToExisting);
                }
                else {
                    teleportZoneFromNewToExisting.BottomRightCoordinate = currentPoint;
                }
            }
        }
        // check west points
        let x = topLeftCoordinate.X - 1;
        for(let y = topLeftCoordinate.Y; y < topLeftCoordinate.Y + nodeInstance.Height; y++) {
            let currentPoint = new Point(x,y);
            let existingNode = this._nodeCoordinates.getValue(currentPoint);
            // found a node - set up teleport zone
            if(existingNode != null) {
                // Create/Update teleport node in existing node to new node
                let teleportZoneFromExistingToNew = existingNode.TeleportZones.getValue(nodeInstance.Key);
                if(teleportZoneFromExistingToNew == null) {
                    teleportZoneFromExistingToNew = new TeleportZone(
                        existingNode, 
                        TeleportZoneDirection.East,
                        currentPoint, 
                        currentPoint,
                        existingNode.TeleportZones.size(),
                        nodeInstance);
                    existingNode.TeleportZones.setValue(nodeInstance.Key, teleportZoneFromExistingToNew);
                }
                else {
                    teleportZoneFromExistingToNew.BottomRightCoordinate = currentPoint;
                }
                // Create/Update teleport node in new node to existing node
                let teleportZoneFromNewToExisting = nodeInstance.TeleportZones.getValue(existingNode.Key);
                let pointInNewNode = new Point(currentPoint.X + 1, currentPoint.Y);
                if(teleportZoneFromNewToExisting == null) {
                    teleportZoneFromNewToExisting = new TeleportZone(
                        nodeInstance, 
                        TeleportZoneDirection.West,
                        pointInNewNode, 
                        pointInNewNode,
                        nodeInstance.TeleportZones.size(),
                        existingNode);
                    nodeInstance.TeleportZones.setValue(existingNode.Key, teleportZoneFromNewToExisting);
                }
                else {
                    teleportZoneFromNewToExisting.BottomRightCoordinate = currentPoint;
                }
            }
        }
        // check east points        
        x = topLeftCoordinate.X + nodeInstance.Width + 1;
        for(let y = topLeftCoordinate.Y; y < topLeftCoordinate.Y + nodeInstance.Height; y++) {
            let currentPoint = new Point(x,y);
            let existingNode = this._nodeCoordinates.getValue(currentPoint);
            // found a node - set up teleport zone
            if(existingNode != null) {
                // Create/Update teleport node in existing node to new node
                let teleportZoneFromExistingToNew = existingNode.TeleportZones.getValue(nodeInstance.Key);
                if(teleportZoneFromExistingToNew == null) {
                    teleportZoneFromExistingToNew = new TeleportZone(
                        existingNode, 
                        TeleportZoneDirection.West,
                        currentPoint, 
                        currentPoint,
                        existingNode.TeleportZones.size(),
                        nodeInstance);
                    existingNode.TeleportZones.setValue(nodeInstance.Key, teleportZoneFromExistingToNew);
                }
                else {
                    teleportZoneFromExistingToNew.BottomRightCoordinate = currentPoint;
                }
                // Create/Update teleport node in new node to existing node
                let teleportZoneFromNewToExisting = nodeInstance.TeleportZones.getValue(existingNode.Key);
                let pointInNewNode = new Point(currentPoint.X - 1, currentPoint.Y);
                if(teleportZoneFromNewToExisting == null) {
                    teleportZoneFromNewToExisting = new TeleportZone(
                        nodeInstance, 
                        TeleportZoneDirection.East,
                        pointInNewNode, 
                        pointInNewNode,
                        nodeInstance.TeleportZones.size(),
                        existingNode);
                    nodeInstance.TeleportZones.setValue(existingNode.Key, teleportZoneFromNewToExisting);
                }
                else {
                    teleportZoneFromNewToExisting.BottomRightCoordinate = currentPoint;
                }
            }
        }
        //#endregion


        this._nodeCoordinates.setValue(topLeftCoordinate, nodeInstance);
        this._minX = Math.min(this._minX, topLeftCoordinate.X);
        this._minY = Math.min(this._minY, topLeftCoordinate.Y);
        this._maxX = Math.max(this._maxX, topLeftCoordinate.X + nodeInstance.Width);
        this._maxY = Math.max(this._maxY, topLeftCoordinate.Y + nodeInstance.Height);
    }

    public get Width(): number {
        return this._maxX - this._minX;
    }

    public get Height(): number {
        return this._maxY - this._minY;
    }

    public get TopLeftCoordinate(): Point {
        return new Point(this._minX, this._minY);
    }

    public get BottomRightCoordinate(): Point {
        return new Point(this._maxX, this._maxY);
    }
}