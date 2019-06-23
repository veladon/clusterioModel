import { NodeInstance } from "../../src/Model";

describe('constructFromJson', () => {
    it('should construct a single NodeInstance from Json', async () => {
        let jsonStr = '{ "Name": "test", "Width": 1, "Height": 2, "TopLeftCoordinate": {"X":3,"Y":4} }';
        let json = JSON.parse(jsonStr);        
        let instance: NodeInstance = json;

        expect(instance.Name).toBe("test");
        expect(instance.Width).toBe(1);
        expect(instance.Height).toBe(2);
        expect(instance.TopLeftCoordinate.X).toBe(3);
        expect(instance.TopLeftCoordinate.Y).toBe(4);
    });

    it('should construct a multiple NodeInstances from Json', async () => {
        let jsonStr = '[{ "Name": "test1", "Width": 1, "Height": 2, "TopLeftCoordinate": {"X":3,"Y":4} }, { "Name": "test2", "Width": 5, "Height": 6, "TopLeftCoordinate": {"X":7,"Y":8} }]';
        let json = JSON.parse(jsonStr);        
        let instance: NodeInstance[] = NodeInstance.CreateFromJson(json);

        expect(instance.length).toBe(2);

        expect(instance[0].Name).toBe("test1");
        expect(instance[0].Width).toBe(1);
        expect(instance[0].Height).toBe(2);
        expect(instance[0].TopLeftCoordinate.X).toBe(3);
        expect(instance[0].TopLeftCoordinate.Y).toBe(4);

        expect(instance[1].Name).toBe("test2");
        expect(instance[1].Width).toBe(5);
        expect(instance[1].Height).toBe(6);
        expect(instance[1].TopLeftCoordinate.X).toBe(7);
        expect(instance[1].TopLeftCoordinate.Y).toBe(8);

        instance[1].AddTeleportZonePoint();
    });
}); 