import { Grid } from "../../src/Model/Grid";
import { Point, NodeInstance } from "../../src/Model";

describe('constructor', () => {
    it('should construct', () => {
        let grid = new Grid();
        expect(grid).not.toBeNull();
    });
});

describe('AddNodeToGrid', () => {
    it('should add a 1x1 node to 0,0', () => {
        let grid = new Grid();
        grid.AddNodeToGrid(new NodeInstance('test', new Point(0,0), 1, 1));
        expect(grid.Width).toBe(1);
        expect(grid.Height).toBe(1);
        expect(grid.TopLeftCoordinate.equals(new Point(0,0))).toBe(true);
        expect(grid.BottomRightCoordinate.equals(new Point(1,1))).toBe(true);
    });

    it('should add a 3x2 node to 0,0', () => {
        let grid = new Grid();
        grid.AddNodeToGrid(new NodeInstance('test', new Point(0,0), 3, 2));
        expect(grid.Width).toBe(3);
        expect(grid.Height).toBe(2);
        expect(grid.TopLeftCoordinate.equals(new Point(0,0))).toBe(true);
        expect(grid.BottomRightCoordinate.equals(new Point(3,2))).toBe(true);
    });

    it('should allow two 1x1 nodes next to each other: side-by-side', () => {
        let grid = new Grid();
        let node1 = new NodeInstance('test1', new Point(0,0), 1, 1);
        let node2 = new NodeInstance('test2', new Point(1,0), 1, 1);
        grid.AddNodeToGrid(node1);
        grid.AddNodeToGrid(node2);
        expect(grid.Width).toBe(2);
        expect(grid.Height).toBe(1);
        expect(grid.TopLeftCoordinate.equals(new Point(0,0))).toBe(true);
        expect(grid.BottomRightCoordinate.equals(new Point(2,1))).toBe(true);  
    });

    it('should allow two different nodes next to each other1: side-by-side', () => {
        let grid = new Grid();
        grid.AddNodeToGrid(new NodeInstance('test1', new Point(0,0), 1, 1));
        grid.AddNodeToGrid(new NodeInstance('test2', new Point(1,0), 1, 2));
        expect(grid.Width).toBe(2);
        expect(grid.Height).toBe(2);
        expect(grid.TopLeftCoordinate.equals(new Point(0,0))).toBe(true);
        expect(grid.BottomRightCoordinate.equals(new Point(2,2))).toBe(true);
    });

    it('should allow two different nodes next to each other2: side-by-side', () => {
        let grid = new Grid();
        grid.AddNodeToGrid(new NodeInstance('test1', new Point(0,0), 1, 1));
        grid.AddNodeToGrid(new NodeInstance('test2', new Point(1,0), 2, 1));
        expect(grid.Width).toBe(3);
        expect(grid.Height).toBe(1);
        expect(grid.TopLeftCoordinate.equals(new Point(0,0))).toBe(true);
        expect(grid.BottomRightCoordinate.equals(new Point(3,1))).toBe(true);
    });

    it('should allow two different nodes next to each other3: side-by-side', () => {
        let grid = new Grid();
        grid.AddNodeToGrid(new NodeInstance('test1', new Point(0,0), 1, 1));
        grid.AddNodeToGrid(new NodeInstance('test2', new Point(1,0), 2, 2));
        expect(grid.Width).toBe(3);
        expect(grid.Height).toBe(2);
        expect(grid.TopLeftCoordinate.equals(new Point(0,0))).toBe(true);
        expect(grid.BottomRightCoordinate.equals(new Point(3,2))).toBe(true);
    });

    it('should allow two nodes next to each other: touching corners', () => {
        let grid = new Grid();
        grid.AddNodeToGrid(new NodeInstance('test1', new Point(0,0), 1, 1));
        grid.AddNodeToGrid(new NodeInstance('test2', new Point(1,1), 1, 1));
        expect(grid.Width).toBe(2);
        expect(grid.Height).toBe(2);
        expect(grid.TopLeftCoordinate.equals(new Point(0,0))).toBe(true);
        expect(grid.BottomRightCoordinate.equals(new Point(2,2))).toBe(true);
    });

    it('should not allow overlapping nodes: 2 1x1 on top', () => {
        let grid = new Grid();
        grid.AddNodeToGrid(new NodeInstance('test1', new Point(0,0), 2, 1));
        expect(() => { 
            grid.AddNodeToGrid(new NodeInstance('test2', new Point(0,0), 1, 1)); 
        }).toThrowError("Cannot add node to grid - collision detected with node 'test1'");
    }); 
});