const replaceable = [
    "minecraft:air",
    "minecraft:snow_layer",
    "minecraft:tallgrass",
    "minecraft:double_plant"
]



export function isReplaceable(block) {
    const permutation = block.permutation
    const dimension = block.dimension
    return (
        dimension.getEntitiesAtBlockLocation(block.location).length == 0 &&

        replaceable.some((id) => permutation.matches(id))
    )
}

export function isSemiReplaceable(block) {
    const permutation = block.permutation
    return replaceable.some((id) => permutation.matches(id))
}
