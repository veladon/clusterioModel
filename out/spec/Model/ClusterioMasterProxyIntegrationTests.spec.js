"use strict";
/**
 * These tests only work when cluster master is running and you have a valid
 * config.json to point at the cluster master.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const ClusterioMasterProxy_1 = require("../../src/Model/ClusterioMasterProxy");
const ServiceHostType_1 = require("../../src/Model/ServiceHostType");
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
//# sourceMappingURL=ClusterioMasterProxyIntegrationTests.spec.js.map