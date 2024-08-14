import { world, BlockPermutation, ItemStack } from '@minecraft/server'

world.beforeEvents.worldInitialize.subscribe(initEvent => {
  initEvent.blockComponentRegistry.registerCustomComponent('fd:changer_tool_function', {
    onPlayerInteract: e => {
      const { player, block } = e;
      const { x, y, z } = block.location;
      const equipment = player.getComponent('equippable');
      const selectedItem = equipment.getEquipment('Mainhand');
      const updates = e.block.permutation.getState("p:changer");
      const update = block.permutation.withState("p:changer", updates + 1);
      if (selectedItem && (selectedItem.typeId === 'fb:changer_tool_item')) {
        player.playSound("block.lantern.break");
        block.dimension.spawnParticle("foxes:texture", { x: block.location.x + 0.5, y: block.location.y + 0.5, z: block.location.z + 0.5 });
        block.setPermutation(update);
      }
    }
  });
});

world.beforeEvents.worldInitialize.subscribe(initEvent => {
  initEvent.blockComponentRegistry.registerCustomComponent('fb:plushy_sound_interaction', {
    onPlayerInteract: e => {
      const { player, block } = e;
      const { x, y, z } = block.location;
      if (!player.isSneaking) {
        player.playSound("fb:freddy_noze");
        block.dimension.spawnParticle("foxes:texture", { x: block.location.x + 0.5, y: block.location.y + 0.5, z: block.location.z + 0.5 });
      }
      if (player.isSneaking) {
        player.playSound("random.fizz");
        block.dimension.spawnParticle("fb:smoke", { x: block.location.x + 0.5, y: block.location.y + 0.5, z: block.location.z + 0.5 });
        block.dimension.runCommandAsync(`setblock ${x} ${y} ${z} air[] destroy`);
      }

    }
  });
});

world.beforeEvents.worldInitialize.subscribe(initEvent => {
  initEvent.blockComponentRegistry.registerCustomComponent('fb:arcade_room_sign_interactive', {
    onPlayerInteract: e => {
      const { player, block } = e;
      const { x, y, z } = block.location;
      const updates = e.block.permutation.getState("fb:sign_sype");
      const update = block.permutation.withState("fb:sign_sype", updates + 1);
      if (block.permutation.getState("fb:sign_sype") === 0) {
        player.playSound("random.click");
        player.runCommandAsync('title @s actionbar §eArcade Sign on,the pattern is §7(Swivel)');
        block.setPermutation(update);
        return;
      }
      if (block.permutation.getState("fb:sign_sype") === 1) {
        player.playSound("random.click");
        player.runCommandAsync('title @s actionbar §eArcade Sign on,the pattern is §7(Impulse)');
        block.setPermutation(update);
        return;
      }
      if (block.permutation.getState("fb:sign_sype") === 2) {
        player.playSound("random.click");
        player.runCommandAsync('title @s actionbar §eThe sign was turned §7(Off)');
        block.setPermutation(update);
      }
    }
  });
});

/** @param {number} playerYRotation */
function getPreciseRotation(playerYRotation) {
  if (playerYRotation < 0) playerYRotation += 360;
  const rotation = Math.round(playerYRotation / 22.5);

  return rotation !== 16 ? rotation : 0;
}

world.beforeEvents.worldInitialize.subscribe(({ blockComponentRegistry }) => {
  blockComponentRegistry.registerCustomComponent("fd:advanced_rotation_v1", {
    beforeOnPlayerPlace(event) {
      const { player } = event;
      if (!player) return;

      const blockFace = event.permutationToPlace.getState("minecraft:block_face");
      if (blockFace !== "up") return;

      const playerYRotation = player.getRotation().y;
      const rotation = getPreciseRotation(playerYRotation);

      event.permutationToPlace = event.permutationToPlace.withState("fb:rotation", rotation);
    }
  });
});

world.beforeEvents.worldInitialize.subscribe(initEvent => {
  initEvent.itemComponentRegistry.registerCustomComponent('test:changer_tool', {
    onUseOn: e => {
      const { block, player } = e;
      if (block.hasTag('changeable')) {
        const updates = e.block.permutation.getState("p:changer")
        block.setPermutation(block.permutation.withState("p:changer", updates + 1));
        block.dimension.playSound("block.lantern.break", block.center());
        block.dimension.spawnParticle("foxes:texture", block.center());
      }
    }
  });
})