import { LocationOutOfWorldBoundariesError } from "@minecraft/server";

class blockRegionAnyBlockMatchResult {
    constructor(success=false, block=undefined, blockTypeId=undefined, location=undefined) {
        this.success = success;
        this.block = block;
        this.blockTypeId = blockTypeId;
        this.location = location;
    }
}

export class blockRegion {
    constructor(dimension, min, max) {
        this.dimension = dimension;
        this.min = min;
        this.max = max;
    }
    static aroundOrigin(dimension, origin, halfExtents) {
        return new blockRegion(
            dimension,
            {
                x: origin.x-halfExtents.x,
                y: origin.y-halfExtents.y,
                z: origin.z-halfExtents.z
            },
            {
                x: origin.x+halfExtents.x,
                y: origin.y+halfExtents.y,
                z: origin.z+halfExtents.z
            });
    }
    toString() {
        return `blockRegion(${this.dimension.id}, ${JSON.stringify(this.min)}, ${JSON.stringify(this.max)})`;
    }
    anyBlockMatch(blockIds) {
        for (let y=this.min.y; y<this.max.y; y++) {
            for (let x=this.min.x; x<this.max.x; x++) {
                for (let z=this.min.z; z<this.max.z; z++) {
                    let blockLocation = {x: x, y: y, z: z};
                    let block;
                    try {
                        block = this.dimension.getBlock(blockLocation);
                    } catch(exception) {
                        if (exception instanceof LocationOutOfWorldBoundariesError) {
                            continue;
                        } else {
                            throw exception;
                        }
                    }
                    if (block === undefined) continue;
                    for (let blockTypeId of blockIds) {
                        if (block.permutation.matches(blockTypeId)) return new blockRegionAnyBlockMatchResult(
                            true,
                            block,
                            blockTypeId,
                            blockLocation);
                    }
                }
            }
        }
        return new blockRegionAnyBlockMatchResult(false);
    }
}