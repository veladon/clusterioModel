"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Model_1 = require("../../src/Model");
describe('GetTeleportZoneInFactorioCoordinates', () => {
    it('should create zones for two 1x1 nodes next to each other side-by-side left/right', () => {
        let grid = new Model_1.Grid();
        let node1 = new Model_1.NodeInstance('test1', new Model_1.Point(0, 0), 1, 1);
        let node2 = new Model_1.NodeInstance('test2', new Model_1.Point(1, 0), 1, 1);
        grid.AddNodeToGrid(node1);
        grid.AddNodeToGrid(node2);
        expect(grid.Width).toBe(2);
        expect(grid.Height).toBe(1);
        expect(grid.TopLeftCoordinate.equals(new Model_1.Point(0, 0))).toBe(true);
        expect(grid.BottomRightCoordinate.equals(new Model_1.Point(2, 1))).toBe(true);
        expect(node1.TeleportZones.values().length).toBe(1);
        expect(node1.TeleportZones.keys()[0]).toBe("test2");
        expect(node1.TeleportZones.values()[0].TopLeftCoordinate.toString()).toBe(new Model_1.Point(0, 0).toString());
        expect(node1.TeleportZones.values()[0].GenerateTeleportZoneInFactorioCoordinates())
            .toEqual(['East to test2', 450, -500, 50, 1000, 1]);
        expect(node2.TeleportZones.values().length).toBe(1);
        expect(node2.TeleportZones.keys()[0]).toBe("test1");
        expect(node2.TeleportZones.values()[0].TopLeftCoordinate.toString()).toBe(new Model_1.Point(1, 0).toString());
        expect(node2.TeleportZones.values()[0].GenerateTeleportZoneInFactorioCoordinates())
            .toEqual(['West to test1', -500, -500, 50, 1000, 1]);
    });
    it('should create zones for two 1x1 nodes next to each other side-by-side top/bottom', () => {
        let grid = new Model_1.Grid();
        let node1 = new Model_1.NodeInstance('test1', new Model_1.Point(0, 0), 1, 1);
        let node2 = new Model_1.NodeInstance('test2', new Model_1.Point(0, 1), 1, 1);
        grid.AddNodeToGrid(node1);
        grid.AddNodeToGrid(node2);
        expect(grid.Width).toBe(1);
        expect(grid.Height).toBe(2);
        expect(grid.TopLeftCoordinate.equals(new Model_1.Point(0, 0))).toBe(true);
        expect(grid.BottomRightCoordinate.equals(new Model_1.Point(1, 2))).toBe(true);
        expect(node1.TeleportZones.values().length).toBe(1);
        expect(node1.TeleportZones.keys()[0]).toBe("test2");
        expect(node1.TeleportZones.values()[0].TopLeftCoordinate.toString()).toBe(new Model_1.Point(0, 0).toString());
        expect(node1.TeleportZones.values()[0].GenerateTeleportZoneInFactorioCoordinates())
            .toEqual(['South to test2', -500, 450, 1000, 50, 1]);
        expect(node2.TeleportZones.values().length).toBe(1);
        expect(node2.TeleportZones.keys()[0]).toBe("test1");
        expect(node2.TeleportZones.values()[0].TopLeftCoordinate.toString()).toBe(new Model_1.Point(0, 1).toString());
        expect(node2.TeleportZones.values()[0].GenerateTeleportZoneInFactorioCoordinates())
            .toEqual(['North to test1', -500, -500, 1000, 50, 1]);
    });
});
describe('GenerateZoneRestriction', () => {
    it('should create zone restrictions for two 1x1 nodes next to each other side-by-side left/right', () => {
        let grid = new Model_1.Grid();
        let node1 = new Model_1.NodeInstance('test1', new Model_1.Point(0, 0), 1, 1);
        let node2 = new Model_1.NodeInstance('test2', new Model_1.Point(1, 0), 1, 1);
        grid.AddNodeToGrid(node1);
        grid.AddNodeToGrid(node2);
        expect(grid.Width).toBe(2);
        expect(grid.Height).toBe(1);
        expect(grid.TopLeftCoordinate.equals(new Model_1.Point(0, 0))).toBe(true);
        expect(grid.BottomRightCoordinate.equals(new Model_1.Point(2, 1))).toBe(true);
        expect(node1.TeleportZones.values()[0].GenerateZoneRestriction())
            .toEqual([1, 'test2', 'West to test1']);
        expect(node2.TeleportZones.values()[0].GenerateZoneRestriction())
            .toEqual([1, 'test1', 'East to test2']);
    });
});
//# sourceMappingURL=TeleportZone.spec.js.map