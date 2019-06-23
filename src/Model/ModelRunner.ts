console.log("Started.")

import { ClusterioMasterProxy } from "./ClusterioMasterProxy";
import { ClusterManager } from "./ClusterManager";
import { ServiceHostType } from "./ServiceHostType";

const argv = require('minimist')(process.argv.slice(2));

// arg: configPath
// description: should point to the clusterio config.json file.
let configPath = argv['configPath'];
if(configPath === undefined || configPath === null || configPath === "") {
    configPath = "../../config.json";
};
let config = require(configPath);

// arg: serviceHostType
// description: what program to use to host the client.js instances.
let serviceHostType = argv['serviceHostType'];
if(serviceHostType === undefined || serviceHostType === null || serviceHostType === "") {
    throw new Error("serviceHostType is null. serviceHostType must be either 'pm2' or 'screen'.");
};
if(serviceHostType != "pm2" && serviceHostType != "screen") {
    throw new Error("serviceHostType must be either 'pm2' or 'screen'.");
}

// arg: mode
// description: should be GenerateBasicGridOfNodes or GenerateNodesFromJson.
let mode = argv['mode'];
if(mode === undefined || mode === null || mode === "") {
    throw new Error("mode is null. mode must be 'GenerateBasicGridOfNodes' or 'GenerateNodesFromJson'");
};

let proxy = new ClusterioMasterProxy(
    config.masterIP,
    config.masterPort,
    config.masterAuthToken,
    serviceHostType
);

var command: () => Promise<void> = async () => {};

if(mode === "GenerateBasicGridOfNodes") {
    // arg: width
    // description: width of node grid
    let width = argv['width'];
    if(width === undefined || width === null || width === "") {
        throw new Error("width is null. width must be an int > 0.");
    };

    // arg: height
    // description: height of node grid
    let height = argv['height'];
    if(height === undefined || height === null || height === "") {
        throw new Error("height is null. height must be an int > 0.");
    };

    // arg: namePrefix
    // description: namePrefix of node grid
    let namePrefix = argv['namePrefix'];
    if(namePrefix === undefined || namePrefix === null || namePrefix === "") {
        throw new Error("namePrefix is null.");
    };

    // main
    command = (async () => {
        let manager = new ClusterManager();
        manager.GenerateBasicGridOfNodes(width, height, namePrefix);
        await proxy.CreateNodeInstancesOnLocalServer(manager.Grid.GetNodes());
    });
}
else if(mode === "GenerateNodesFromJson") {
    // arg: nodesJson
    // description: should point to the a json file containing a list of nodes in the format:
    // '[{ "Name": "test1", "Width": 1, "Height": 2, "TopLeftCoordinate": {"X":3,"Y":4} }, { "Name": "test2", "Width": 5, "Height": 6, "TopLeftCoordinate": {"X":7,"Y":8} }]'
    let nodesJsonPath = argv['nodesJson'];
    if(nodesJsonPath === undefined || nodesJsonPath === null || nodesJsonPath === "") {
        throw new Error("nodesJson is null. nodesJson must point to a json file containing a list of nodes.");
    };
    let nodesObject = require(nodesJsonPath);

    // main
    command = (async () => {
        let manager = new ClusterManager();
        manager.GenerateNodesFromJson(nodesObject);
        await proxy.CreateNodeInstancesOnLocalServer(manager.Grid.GetNodes());
    });
}

command();