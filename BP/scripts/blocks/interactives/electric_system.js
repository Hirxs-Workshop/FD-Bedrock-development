import {
  world,
  BlockPermutation,
  ItemStack
} from '@minecraft/server'

world.beforeEvents.worldInitialize.subscribe(initEvent => {
  initEvent.blockComponentRegistry.registerCustomComponent('fbd:switch_cc', {
    onPlayerInteract: e => {
      const {
        player,
        block,
        entity
      } = e;
      const {
        x,
        y,
        z,
        r
      } = block.location;
      const lever_on = block.permutation.withState("fb:block_status", 2);
      const lever_off = block.permutation.withState("fb:block_status", 1);
      if (block.permutation.getState("fb:block_status") === 1) {
        block.setPermutation(lever_on);
        block.dimension.runCommandAsync(`fill ${x - 8} ${y - 2} ${z + 8} ${x + 8} ${y + 6} ${z - 8} fb:light_off [] replace fb:light_on`);
        block.dimension.runCommandAsync(`fill ${x - 8} ${y - 2} ${z + 8} ${x + 8} ${y + 6} ${z - 8} fb:lightbulb_down [] replace fb:lightbulb_on`);
        block.dimension.runCommandAsync(`fill ${x - 8} ${y - 2} ${z + 8} ${x + 8} ${y + 6} ${z - 8} fb:roof_light_off [] replace fb:roof_light_on`);
        block.dimension.runCommandAsync(`fill ${x - 8} ${y - 2} ${z + 8} ${x + 8} ${y + 6} ${z - 8} fb:ceiling_large_light_off [] replace fb:ceiling_large_light`);
        block.dimension.runCommandAsync(`fill ${x - 8} ${y - 2} ${z + 8} ${x + 8} ${y + 6} ${z - 8} fb:light_2["p:is_lit"=0] replace fb:light_2["p:is_lit"=1]`);
        player.playSound("random.click")
        return;

      }
      if (block.permutation.getState("fb:block_status") === 2) {
        block.setPermutation(lever_off);
        block.dimension.runCommandAsync(`fill ${x - 8} ${y - 2} ${z + 8} ${x + 8} ${y + 6} ${z - 8} fb:light_on [] replace fb:light_off`);
        block.dimension.runCommandAsync(`fill ${x - 8} ${y - 2} ${z + 8} ${x + 8} ${y + 6} ${z - 8} fb:lightbulb_on [] replace fb:lightbulb_down`);
        block.dimension.runCommandAsync(`fill ${x - 8} ${y - 2} ${z + 8} ${x + 8} ${y + 6} ${z - 8} fb:roof_light_on [] replace fb:roof_light_off`);
        block.dimension.runCommandAsync(`fill ${x - 8} ${y - 2} ${z + 8} ${x + 8} ${y + 6} ${z - 8} fb:ceiling_large_light [] replace fb:ceiling_large_light_off`);
        block.dimension.runCommandAsync(`fill ${x - 8} ${y - 2} ${z + 8} ${x + 8} ${y + 6} ${z - 8} fb:light_2["p:is_lit"=1] replace fb:light_2["p:is_lit"=0]`);
        player.playSound("random.click");
        return;
      }
    }
  });
});

world.beforeEvents.worldInitialize.subscribe(initEvent => {
  initEvent.blockComponentRegistry.registerCustomComponent('fbd:office_light', {
    onPlayerInteract: e => {
      const {
        player,
        block,
        entity
      } = e;
      const {
        x,
        y,
        z,
        r
      } = block.location;
      const lever_on = block.permutation.withState("fb:block_status", 2);
      const lever_off = block.permutation.withState("fb:block_status", 1);
      if (block.permutation.getState("fb:block_status") === 1) {
        block.setPermutation(lever_on);
        block.dimension.runCommandAsync(`fill ${x - 8} ${y - 2} ${z + 8} ${x + 8} ${y + 6} ${z - 8} fb:office_light[] replace fb:office_light_off`);
        player.playSound("random.click")
        return;

      }
      if (block.permutation.getState("fb:block_status") === 2) {
        block.setPermutation(lever_off);
        block.dimension.runCommandAsync(`fill ${x - 8} ${y - 2} ${z + 8} ${x + 8} ${y + 6} ${z - 8} fb:office_light_off[] replace fb:office_light`);
        player.playSound("random.click");
        return;
      }
    }
  });
});

// Eelectric wires/block CC

// Light lever CC

world.beforeEvents.worldInitialize.subscribe(initEvent => {
  initEvent.blockComponentRegistry.registerCustomComponent('fbd:electric_system_reworked_vw', {
    onPlace(e) {
      const {
        block,
        player
      } = e;
      const {
        x,
        y,
        z
      } = block.location;
      if (block.hasTag('electric_on')) {
        block.dimension.runCommandAsync(`fill ${x} ${y} ${z} ${x} ${y + 2} ${z} fb:electric_wires_on[] replace fb:electric_wires_off`);
        block.dimension.runCommandAsync(`fill ${x + 1} ${y - 1} ${z} ${x - 1} ${y} ${z} fb:electric_wires_on[] replace fb:electric_wires_off`);
        block.dimension.runCommandAsync(`fill ${x} ${y - 1} ${z + 1} ${x} ${y} ${z - 1} fb:electric_wires_on[] replace fb:electric_wires_off`);
        block.dimension.runCommandAsync(`fill ${x} ${y + 1} ${z} ${x} ${y - 1} ${z} fb:lever_wires["minecraft:cardinal_direction"="south"] replace fb:lever_wires_off["minecraft:cardinal_direction"="south"]`);
        block.dimension.runCommandAsync(`fill ${x} ${y + 1} ${z} ${x} ${y - 1} ${z} fb:lever_wires["minecraft:cardinal_direction"="north"] replace fb:lever_wires_off["minecraft:cardinal_direction"="north"]`);
        block.dimension.runCommandAsync(`fill ${x} ${y + 1} ${z} ${x} ${y - 1} ${z} fb:lever_wires["minecraft:cardinal_direction"="east"] replace fb:lever_wires_off["minecraft:cardinal_direction"="east"]`);
        block.dimension.runCommandAsync(`fill ${x} ${y + 1} ${z} ${x} ${y - 1} ${z} fb:lever_wires["minecraft:cardinal_direction"="west"] replace fb:lever_wires_off["minecraft:cardinal_direction"="west"]`);

        block.dimension.runCommandAsync(`fill ${x + 1} ${y + 1} ${z - 1} ${x - 1} ${y - 1} ${z + 1} fb:electric_block_on[] replace fb:electric_block_off`);

      }
      if (block.hasTag('electric_off')) {
        block.dimension.runCommandAsync(`fill ${x + 1} ${y + 1} ${z - 1} ${x - 1} ${y - 1} ${z + 1} fb:electric_block_off[] replace fb:electric_block_on`);

        block.dimension.runCommandAsync(`fill ${x + 1} ${y - 1} ${z} ${x - 1} ${y} ${z} fb:electric_wires_off[] replace fb:electric_wires_on`);
        block.dimension.runCommandAsync(`fill ${x} ${y - 1} ${z + 1} ${x} ${y} ${z - 1} fb:electric_wires_off[] replace fb:electric_wires_on`);

        block.dimension.runCommandAsync(`fill ${x} ${y} ${z} ${x} ${y + 2} ${z} fb:electric_wires_off[] replace fb:electric_wires_on`);

        block.dimension.runCommandAsync(`fill ${x} ${y + 1} ${z} ${x} ${y - 1} ${z} fb:lever_wires_off["minecraft:cardinal_direction"="south"] replace fb:lever_wires["minecraft:cardinal_direction"="south"]`);
        block.dimension.runCommandAsync(`fill ${x} ${y + 1} ${z} ${x} ${y - 1} ${z} fb:lever_wires_off["minecraft:cardinal_direction"="north"] replace fb:lever_wires["minecraft:cardinal_direction"="north"]`);
        block.dimension.runCommandAsync(`fill ${x} ${y + 1} ${z} ${x} ${y - 1} ${z} fb:lever_wires_off["minecraft:cardinal_direction"="east"] replace fb:lever_wires["minecraft:cardinal_direction"="east"]`);
        block.dimension.runCommandAsync(`fill ${x} ${y + 1} ${z} ${x} ${y - 1} ${z} fb:lever_wires_off["minecraft:cardinal_direction"="west"] replace fb:lever_wires["minecraft:cardinal_direction"="west"]`);

      }
    }
  });
});