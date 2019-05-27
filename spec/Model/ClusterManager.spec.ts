import { ClusterManager } from "../../src/Model";

describe('GenerateBasicGridOfNodes', () => {
    it('should generate 2x2 grid', () => {
        let cm = new ClusterManager();
        cm.GenerateBasicGridOfNodes(2,2,"test");
        let nodes = cm.Grid.GetNodes();
        expect(nodes[0].Name).toBe("test_0_0");
        expect(nodes[1].Name).toBe("test_0_1");
        expect(nodes[2].Name).toBe("test_1_0");
        expect(nodes[3].Name).toBe("test_1_1");
        expect(nodes[0].TeleportZones.size()).toBe(2);
        expect(nodes[1].TeleportZones.size()).toBe(2);
        expect(nodes[2].TeleportZones.size()).toBe(2);
        expect(nodes[3].TeleportZones.size()).toBe(2);
    });
});