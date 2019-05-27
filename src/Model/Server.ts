import { NodeInstance } from ".";

/**
 * A server. Can contain multiple nodes (Factorio server instances).
 */
export class Server {
    public Name: string;
    public readonly Nodes: Array<NodeInstance> = new Array<NodeInstance>();

    public constructor(name: string) {
        this.Name = name;
    }

    public AddNodeInstance(node: NodeInstance) {
        this.Nodes.push(node);
    }
}