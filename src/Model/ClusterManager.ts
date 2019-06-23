import { NodeInstance } from './NodeInstance'
import { Server } from './Server'
import { Point } from './Point';
import { Grid } from './Grid';
import { JsonConvert } from 'json2typescript';

/**
 * Manages all nodes within the cluster
 */
export class ClusterManager {
    private readonly _nodeArray: Array<Array<NodeInstance>>;
    private _servers: { [key: string]: Server }
    public Grid: Grid = new Grid();

    /**
     * Generates a x*y grid of 1x1 nodes
     * @param width How wide to make the node grid
     * @param height How high to make the node grid
     * @param nodeNamePrefix The prefix used for the initial node names. The name will be in the format <prefix>_x_y.
     */
    public GenerateBasicGridOfNodes(width: number, height: number, nodeNamePrefix: string) {
        for (let x: number = 0; x < width; x++) {
            for (let y: number = 0; y < height; y++) {
                let newNode = new NodeInstance(nodeNamePrefix + "-" + (x+1) + "-" + (y+1), new Point(x,y), 1, 1);
                this.Grid.AddNodeToGrid(newNode);
            }
        }
    }

    public GenerateNodesFromJson(nodes: NodeInstance[]) {
        let nodeClassInstances = NodeInstance.CreateFromJson(nodes);
        nodeClassInstances.forEach(node => this.Grid.AddNodeToGrid(node));
    }

    /**
     * Assigns all nodes that currently do not have a server assigned to the given server
     * @param server Server to assign all unassigned nodes to
     */
    public AssignAllUnassignedNodesToServer(server: Server) {
        this.CheckServerArray(server);
        this.Grid.GetNodes()
            .filter(node => {node.Server === null})
            .forEach(node => {
                server.AddNodeInstance(node);
                node.Server = server;
            });
    }

    /**
     * Assigns a node to a server
     * @param x x co-ordinate of the node
     * @param y y co-ordinate of the node
     * @param serverName server name
     */
    public AssignNodeToServer(x: number, y: number, server: Server) {

        this._nodeArray[x][y].Server = server;
    }

    private CheckServerArray(server: Server) {
        let s = this._servers[server.Name];
        if (s == null) {
            this._servers[server.Name] = server;
        }
    }
}