"use strict";
/**
 * These tests only work when cluster master is running and you have a valid
 * config.json to point at the cluster master.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const ClusterioMasterProxy_1 = require("../../src/Model/ClusterioMasterProxy");
const ServiceHostType_1 = require("../../src/Model/ServiceHostType");
const util = require("util");
const fs = require("fs");
describe('RunRconCommand', () => {
    it('should print hello', async () => {
        let config = require('G:/linux/factorioClusterio/config.json');
        let proxy = new ClusterioMasterProxy_1.ClusterioMasterProxy(config.masterIP, config.masterPort, config.masterAuthToken, ServiceHostType_1.ServiceHostType.pm2);
        await proxy.RunRconCommand("-324437645", "/c game.print('hello')", "log test");
    });
});
describe('GetSlaves', () => {
    it('should get slaves', async () => {
        let config = require('G:/linux/factorioClusterio/config.json');
        let proxy = new ClusterioMasterProxy_1.ClusterioMasterProxy(config.masterIP, config.masterPort, config.masterAuthToken, ServiceHostType_1.ServiceHostType.pm2);
        let slaves = await proxy.GetSlaves();
        slaves.forEach((slave, index, array) => {
            console.log(`Instance: ${slave.id}`);
            console.log(`name: ${slave.instanceName}`);
        });
    });
});
describe('EditingJsonFile', () => {
    it('should get slaves', async () => {
        return;
        let mapPath = './map-gen-settings.clusterio.json';
        const readFile = util.promisify(fs.readFile);
        let f = await readFile(mapPath);
        let s = String(f);
        let x = JSON.parse(s);
        //let mapSettings = require(mapPath);
        expect(x.width).toBe(1112);
        expect(x.height).toBe(222);
        x.width = 123;
        x.height = 456;
        const writeFile = util.promisify(fs.writeFile);
        //await writeFile(mapPath, JSON.stringify(mapSettings));
        await writeFile(mapPath, '{"aaa":"b"}');
        let mapSettings2Str = fs.readFileSync(mapPath);
        let m = JSON.parse(mapSettings2Str);
        expect(m.aaa).toBe('b');
        //let mapSettings2 = require(mapPath);
        //expect(mapSettings2.width).toBe(123);
        //expect(mapSettings2.height).toBe(456);
    });
});
//# sourceMappingURL=ClusterioMasterProxyIntegrationTests.spec.js.map