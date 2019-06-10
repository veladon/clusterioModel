import { IClusterioMasterProxy } from "./IClusterioMasterProxy";
import child_process = require('child_process');
import needle = require('needle')
import { NodeInstance } from "./NodeInstance";
import { IApiSlave } from "./IApiSlaves";
import { asyncForEach } from "./Helpers";
import { TeleportZone } from "./TeleportZone";
import fs = require('fs')
import util = require('util')
import { ServiceHostType } from "./ServiceHostType";

/**
 * Contains all interactions between the cluster model, the
 * Clusterio master.js/client.js infrastructure and the operating system.
 */
export class ClusterioMasterProxy implements IClusterioMasterProxy {
    private readonly _masterIP;
    private readonly _needleOptionsWithTokenAuthHeader;

    public constructor(masterIP: string, masterPort: string, masterAuthToken: string, serviceHostType: ServiceHostType) {
        this._masterIP = `${masterIP}:${masterPort}`;
        this._needleOptionsWithTokenAuthHeader = {
            headers: {
                'x-access-token': masterAuthToken,
            },
        };
    }

    public async RunRconCommand(instanceId: string, command: string, logDescription: string) {
        console.log("Running command: " + logDescription);
        let request = { instanceID: instanceId, command };
        let response = await needle("post", this._masterIP + "/api/runCommand", request, this._needleOptionsWithTokenAuthHeader);
    }

    public async GetSlaves(): Promise<IApiSlave[]> {
        let response = await needle("get", this._masterIP + "/api/slaves", this._needleOptionsWithTokenAuthHeader);
        let body = <Object>response.body;
        let slaves = new Array<IApiSlave>();
        Object.entries(body).forEach((keyValuePair, index, array) => {
            let slave = <IApiSlave>keyValuePair[1];
            slave.id = keyValuePair[0];
            slaves.push(slave);
        });
        return slaves;
    }

    public async CreateNodeInstancesOnLocalServer(nodes: NodeInstance[]) {
        await asyncForEach(nodes, async (node: NodeInstance) => {
            await this.CreateNodeInstanceOnLocalServer(node);
        });
        await asyncForEach(nodes, async (node: NodeInstance) => {
            await this.CreateTeleportZonesForANodeInstance(node);
        });
        await this.sleep(1000);
        await asyncForEach(nodes, async (node: NodeInstance) => {
            await this.CreateTeleportRestrictionsForANodeInstance(node);
            await this.sleep(100);
        });
    }

    public async CreateNodeInstanceOnLocalServer(node: NodeInstance) {
        console.log(`Creating instance ${node.Name}...`);
        
        await this.CreateNodeInstanceOnLocalServerUsingPm2(node);

        console.log("Waiting for node to connect to cluster master...");
        while (true) {
            await this.sleep(1000);
            //TODO: Use /api/getSlaveMeta/
            let slaves = await this.GetSlaves();
            let slave = slaves.find((slave, index, array) => slave.instanceName === node.Name);
            if (slave != null) {
                node.ClusterioWorldId = slave.id;
                break;
            }
        }
    }

    private async CreateNodeInstanceOnLocalServerUsingPm2(node: NodeInstance) {
        let proc = child_process.spawn("pm2", ['start', '--name', node.Name, 'client.js', '--', 'start', node.Name]);
        proc.stdout.on('data', (data: string) => {  console.log(`stdout: ${data}`) });
        proc.stderr.on('data', data => { console.log(`stderr: ${data}`) });
        proc.on('error', error => { console.log(`error: ${error}`) });
    }

    private async CreateNodeInstanceOnLocalServerUsingScreen(node: NodeInstance) {
        // first call of client.js start for a new node creates map from HotPatch scenario then exits.
        let proc = child_process.spawn("screen", ['-dmS', node.Name, '-L', '-Logfile', node.Name + '.log', 'node', 'client.js', 'start', node.Name]);
        proc.stdout.on('data', (data: string) => {  console.log(`stdout: ${data}`) });
        proc.stderr.on('data', data => { console.log(`stderr: ${data}`) });
        proc.on('error', error => { console.log(`error: ${error}`) });

        console.log("Waiting for creation of new map...");
        // create awaiter for fs.readFile
        const readFile = util.promisify(fs.readFile);
        while(true) {
            await this.sleep(1000);
            let fileData = await readFile(node.Name + '.log');
            if(fileData.includes('Instance created')){
                break;
            }
        }

        // start node
        proc = child_process.spawn("screen", ['-dmS', node.Name, '-L', '-Logfile', node.Name + '.log', 'node', 'client.js', 'start', node.Name]);
        proc.stdout.on('data', data => { console.log(`stdout: ${data}`) });
        proc.stderr.on('data', data => { console.log(`stderr: ${data}`) });
        proc.on('error', error => { console.log(`error: ${error}`) })
    }

    public async CreateTeleportZonesForANodeInstance(nodeInstance: NodeInstance) {
        await asyncForEach(nodeInstance.TeleportZones.values(), async (zone: TeleportZone) => {
            let o = zone.GenerateTeleportZoneInFactorioCoordinates();
            let cmd = `CreateZone('${o[0]}',${o[1]},${o[2]},${o[3]},${o[4]},${o[5]},true)`;
            await this.RunRconCommand(nodeInstance.ClusterioWorldId,
                `/c remote.call('trainTeleports','runCode',\"${cmd}\")`,
                cmd);
        });
    }

    public async CreateTeleportRestrictionsForANodeInstance(nodeInstance: NodeInstance) {
        await asyncForEach(nodeInstance.TeleportZones.values(), async (zone: TeleportZone) => {
            let o = zone.GenerateZoneRestriction();
            let cmd = `CreateZoneRestriction(${o[0]},'${o[1]}','${o[2]}')`;
            await this.RunRconCommand(nodeInstance.ClusterioWorldId,
                `/c remote.call('trainTeleports','runCode',\"${cmd}\")`,
                cmd);
        });
    }

    sleep(ms: number) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}



