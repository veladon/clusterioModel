console.log("started.")

import { ClusterioMasterProxy } from "./ClusterioMasterProxy";
import { ClusterManager } from "./ClusterManager";
import { asyncForEach } from "./Helpers";

const argv = require('minimist')(process.argv.slice(2));

let configPath = argv['configPath'];
if(configPath === undefined || configPath === null || configPath === "") {
    throw new Error("configPath is null.")
};
let config = require(configPath);

let proxy = new ClusterioMasterProxy(
    config.masterIP,
    config.masterPort,
    config.masterAuthToken
);

function sleep(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// main
(async () => {
    let manager = new ClusterManager();
    manager.GenerateBasicGridOfNodes(2,2,'GridLockTest');
    await proxy.CreateNodeInstancesOnLocalServer(manager.Grid.GetNodes());
    return;
})();
