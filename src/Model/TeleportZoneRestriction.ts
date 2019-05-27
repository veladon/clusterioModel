import { TeleportZone } from "./TeleportZone";

export class TeleportZoneRestriction {
    public ParentTeleportZone: TeleportZone;
    public RestrictingTeleportZone: TeleportZone;

    constructor(parentTeleportZone: TeleportZone, restrictingTeleportZone: TeleportZone) {
        this.ParentTeleportZone = parentTeleportZone;
        this.RestrictingTeleportZone = restrictingTeleportZone;
    }
}