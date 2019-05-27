var RBush: any = require('rbush')

describe('rbush', () => {
    it('test', () => {
        let tree = new RBush()
        const item = {
            minX: 0,
            minY: 0,
            maxX: 2,
            maxY: 2,
            foo: 'bar',
            a: 1
        };
        tree.insert(item);
        let item2 = {minX: 1, minY: 1, maxX: 2, maxY: 2};
        let collision = tree.collides(item2);
        expect(collision).toBe(true);
    });
})