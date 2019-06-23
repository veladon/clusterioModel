import { ClusterManager, NodeInstance } from "../../src/Model";
import { debuglog } from "util";
import { stringify } from "querystring";

describe('GenerateBasicGridOfNodes', () => {
    it('should generate 2x2 grid', () => {
        let cm = new ClusterManager();
        cm.GenerateBasicGridOfNodes(2, 2, "test");
        let nodes = cm.Grid.GetNodes();
        expect(nodes[0].Name).toBe("test-1-1");
        expect(nodes[1].Name).toBe("test-1-2");
        expect(nodes[2].Name).toBe("test-2-1");
        expect(nodes[3].Name).toBe("test-2-2");
        expect(nodes[0].TeleportZones.size()).toBe(2);
        expect(nodes[1].TeleportZones.size()).toBe(2);
        expect(nodes[2].TeleportZones.size()).toBe(2);
        expect(nodes[3].TeleportZones.size()).toBe(2);
        expect(nodes[0].TeleportZones.values()[0].GenerateTeleportZoneInFactorioCoordinates()).toEqual(['South to test-1-2',-500,450,1000,50,1]);
        expect(nodes[0].TeleportZones.values()[1].GenerateTeleportZoneInFactorioCoordinates()).toEqual(['East to test-2-1',450,-500,50,1000,2]);        
    });
});

var exampleJson: any = [
    { "Name": "GridLockTest-Westeros", "Width": 2, "Height": 2, "TopLeftCoordinate": { "X": 1, "Y": 1 } },
    { "Name": "GridLockTest-Novegrad", "Width": 1, "Height": 1, "TopLeftCoordinate": { "X": 3, "Y": 1 } },
    { "Name": "GridLockTest-Tinseltown", "Width": 1, "Height": 1, "TopLeftCoordinate": { "X": 1, "Y": 3 } },
    { "Name": "GridLockTest-Smallville", "Width": 1, "Height": 1, "TopLeftCoordinate": { "X": 1, "Y": 4 } },
    { "Name": "GridLockTest-Timbuktu", "Width": 1, "Height": 1, "TopLeftCoordinate": { "X": 1, "Y": 5 } },
    { "Name": "GridLockTest-Melee Island", "Width": 2, "Height": 1, "TopLeftCoordinate": { "X": 1, "Y": 6 } }
];

describe('GenerateNodesFromJson', () => {
    it('should generate correctly', () => {
        console.log('hello');
        let cm = new ClusterManager();
        //let nodesObject = require('../../src/Model/ExampleModel.json');        
        cm.GenerateNodesFromJson(exampleJson);
        let nodes = cm.Grid.GetNodes();

        expect(nodes.length).toBe(6);

        expect(nodes[0].Name).toBe("GridLockTest-Westeros");
        expect(nodes[1].Name).toBe("GridLockTest-Novegrad");
        expect(nodes[2].Name).toBe("GridLockTest-Tinseltown");
        expect(nodes[3].Name).toBe("GridLockTest-Smallville");
        expect(nodes[4].Name).toBe("GridLockTest-Timbuktu");
        expect(nodes[5].Name).toBe("GridLockTest-Melee Island");

        expect(nodes[0].TeleportZones.values()[0].GenerateTeleportZoneInFactorioCoordinates()).toEqual(['East to GridLockTest-Novegrad',950,-1000,50,1000,1]);
        expect(nodes[0].TeleportZones.values()[1].GenerateTeleportZoneInFactorioCoordinates()).toEqual(['South to GridLockTest-Tinseltown',-1000,950,1000,50,2]);
        
        nodes.forEach(node => {
            console.log('Node: ' + node.Name)
            node.TeleportZones.values().forEach(tz => {
                console.log('\t' + tz.GenerateTeleportZoneInFactorioCoordinates());
            })
        })
    });
});