import { system, BlockPermutation, Direction, world, EquipmentSlot, Player } from "@minecraft/server"
import { switchBlockFaces, getPlayerYRot } from "fbd_data_files/detectSidesBlocks"
import { isReplaceable } from "fbd_data_files/blocksReplaceables"
import { destroyMultiBlock } from "fbd_data_files/whenPlayerDestroy"
import { decrementStack } from "fbd_data_files/invItems"

const isBlockSized = [2, 2, 1]
const rotate_IsBlockSized = [1, 2, 2]
const ajustConnection = [
    `fb:stage_sun`
]

for (const blockIDs of ajustConnection) {
    world.beforeEvents.itemUseOn.subscribe(
        event => {
            const player = event.source;
            const item = event.itemStack.typeId;
            const dimension = player.dimension;
            if (!(item.match(blockIDs))) return

            const oldLog = console.log[JSON.stringify(item)];
            console.log[JSON.stringify(item)] = Date.now();
            if ((oldLog + 150) >= Date.now()) return
            const targetBlock = switchBlockFaces(event, Direction)
            let cm1, cm2, cm3, cm4
            const direction = getPlayerYRot(event.source)
            switch (getPlayerYRot(event.source)) {
                case 2:
                    cm1 = targetBlock.above()
                    cm3 = targetBlock.above().east()
                    cm4 = targetBlock.east()
                    break
                case 3:
                    cm1 = targetBlock.above()
                    cm3 = targetBlock.above().south()
                    cm4 = targetBlock.south()
                    break
                case 0:
                    cm1 = targetBlock.above()
                    cm3 = targetBlock.above().west()
                    cm4 = targetBlock.west()
                    break
                default:
                    cm1 = targetBlock.above()
                    cm3 = targetBlock.above().north()
                    cm4 = targetBlock.north()
                    break
            }
            const listPlacedBlocks = [targetBlock, cm1, cm3, cm4]
            if (!listPlacedBlocks.every(isReplaceable)) return
            system.run(
                () => {
                    decrementStack(player, item)
                    cm1.setPermutation(BlockPermutation.resolve(
                        item, { "fbd:direction": direction, "fbd:connected_models": 0, "fbd:block_placed": 1 }
                    ))
                    targetBlock.setPermutation(BlockPermutation.resolve(
                        item, { "fbd:direction": direction, "fbd:connected_models": 1, "fbd:block_placed": 1 }
                    ))
                    cm3.setPermutation(BlockPermutation.resolve(
                        item, { "fbd:direction": direction, "fbd:connected_models": 2, "fbd:block_placed": 1 }
                    ))
                    cm4.setPermutation(BlockPermutation.resolve(
                        item, { "fbd:direction": direction, "fbd:connected_models": 3, "fbd:block_placed": 1 }
                    ))
                    dimension.spawnParticle("fbd:block.dust", targetBlock)
                    dimension.spawnParticle("fbd:block.dust", cm4)
                    world.playSound('fbd:placement.medium', player.location)
                }
            )
        }
    )

    world.beforeEvents.playerBreakBlock.subscribe(
        event => {
            const permutation = event.block.permutation

            if (!(permutation.matches(blockIDs))) return
            const destroyedBlock = event.block
            let fillTargetBlock, isRotated

            switch (true) {
                case permutation.matches(blockIDs, { "fbd:direction": 2, "fbd:connected_models": 0 }):
                    fillTargetBlock = destroyedBlock.below()
                    isRotated = false
                    break
                case permutation.matches(blockIDs, { "fbd:direction": 2, "fbd:connected_models": 1 }):
                    fillTargetBlock = destroyedBlock
                    isRotated = false
                    break
                case permutation.matches(blockIDs, { "fbd:direction": 2, "fbd:connected_models": 2 }):
                    fillTargetBlock = destroyedBlock.below().west()
                    isRotated = false
                    break
                case permutation.matches(blockIDs, { "fbd:direction": 2, "fbd:connected_models": 3 }):
                    fillTargetBlock = destroyedBlock.west()
                    isRotated = false
                    break
                case permutation.matches(blockIDs, { "fbd:direction": 0, "fbd:connected_models": 0 }):
                    fillTargetBlock = destroyedBlock.below().west()
                    isRotated = false
                    break
                case permutation.matches(blockIDs, { "fbd:direction": 0, "fbd:connected_models": 1 }):
                    fillTargetBlock = destroyedBlock.west()
                    isRotated = false
                    break
                case permutation.matches(blockIDs, { "fbd:direction": 0, "fbd:connected_models": 2 }):
                    fillTargetBlock = destroyedBlock.below()
                    isRotated = false
                    break
                case permutation.matches(blockIDs, { "fbd:direction": 0, "fbd:connected_models": 3 }):
                    fillTargetBlock = destroyedBlock
                    isRotated = false
                    break
                case permutation.matches(blockIDs, { "fbd:direction": 3, "fbd:connected_models": 0 }):
                    fillTargetBlock = destroyedBlock.below()
                    isRotated = true
                    break
                case permutation.matches(blockIDs, { "fbd:direction": 3, "fbd:connected_models": 1 }):
                    fillTargetBlock = destroyedBlock
                    isRotated = true
                    break
                case permutation.matches(blockIDs, { "fbd:direction": 3, "fbd:connected_models": 2 }):
                    fillTargetBlock = destroyedBlock.below().north()
                    isRotated = true
                    break
                case permutation.matches(blockIDs, { "fbd:direction": 3, "fbd:connected_models": 3 }):
                    fillTargetBlock = destroyedBlock.north()
                    isRotated = true
                    break
                case permutation.matches(blockIDs, { "fbd:direction": 1, "fbd:connected_models": 0 }):
                    fillTargetBlock = destroyedBlock.below().north()
                    isRotated = true
                    break
                case permutation.matches(blockIDs, { "fbd:direction": 1, "fbd:connected_models": 1 }):
                    fillTargetBlock = destroyedBlock.north()
                    isRotated = true
                    break
                case permutation.matches(blockIDs, { "fbd:direction": 1, "fbd:connected_models": 2 }):
                    fillTargetBlock = destroyedBlock.below()
                    isRotated = true
                    break
                case permutation.matches(blockIDs, { "fbd:direction": 1, "fbd:connected_models": 3 }):
                    fillTargetBlock = destroyedBlock
                    isRotated = true
                    break
            }

            system.run(
                () => {
                    switch (true) {
                        case !isRotated:
                            destroyMultiBlock(fillTargetBlock, isBlockSized)
                            break
                        case isRotated:
                            destroyMultiBlock(fillTargetBlock, rotate_IsBlockSized)
                            break
                    }
                }
            )
        }
    )
}
