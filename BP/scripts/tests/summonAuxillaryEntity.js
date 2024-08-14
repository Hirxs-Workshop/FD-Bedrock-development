
export function summonAuxillaryEntity(block, entity, spawnEvent) {
    const commandPosition = [block.x, block.y, block.z]
    const dimension = block.dimension
    
    dimension.runCommandAsync(`summon ${entity} ${commandPosition.join(` `)} ~ ~ ${spawnEvent}`)
}