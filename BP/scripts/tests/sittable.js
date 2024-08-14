export function sittable(block) {
    const entityOffset = [block.x, block.y, block.z]
    const dimension = block.dimension
    dimension.runCommand(`summon ff:seat ${entityOffset.join(` `)}`)
}