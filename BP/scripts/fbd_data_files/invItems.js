
import { GameMode } from "@minecraft/server";
import { ItemStack, system } from "@minecraft/server"

export function decrementStack(entity, item) {
  const targetItem = item
  if (entity.matches({ gameMode: GameMode.creative })) return

  system.run(
    () => entity.runCommand(`clear @s ${targetItem} 0 1`)
  )
}

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
