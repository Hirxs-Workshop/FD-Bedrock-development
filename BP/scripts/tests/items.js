
import { GameMode } from "@minecraft/server";
import { ItemStack, system } from "@minecraft/server"

/**
 * 
 * @author
 * yanasakana
 * 
 * @remarks
 * Removes 1 item stack
 * from the specified entity
 * 
 * @param { import("@minecraft/server").Entity } entity 
 * @param { import("@minecraft/server").ItemStack } item 
 */
export function decrementStack(entity, item) {
  const targetItem = item
  if (entity.matches({ gameMode: GameMode.creative })) return

  system.run(
    () => entity.runCommand(`clear @s ${targetItem} 0 1`)
  )
}


/**
 * 
 * @author
 * r4isen1920
 * 
 * @remarks
 * Returns the specified item
 * found within the entity's inventory
 * 
 * @param { import("@minecraft/server").Entity } entity 
 * @param { string } itemId
 * @returns  { import("@minecraft/server").ItemStack }
 */
export function findItem(entity, itemId) {
  const inventory = entity.getComponent('inventory');
  if (inventory == undefined) return false;

  const inventorySize = inventory.inventorySize;
  const inventoryContainer = inventory.container;

  for (let i = 0; i < inventorySize; i++) {
    const itemStack = inventoryContainer.getItem(i);
    if (itemStack?.typeId != itemId) continue;
    if (itemStack.typeId == itemId) {
      return itemStack;
    }
  }
}
