import { world, BlockPermutation, ItemStack } from '@minecraft/server'


world.beforeEvents.worldInitialize.subscribe(initEvent => {
  initEvent.blockComponentRegistry.registerCustomComponent('fbd:silver_spotlight_ray_colors_change', {
    onPlayerInteract: e => {

      const {
        player,
        block
      } = e;
      const {
        x,
        y,
        z
      } = block.location;
      const equipment = player.getComponent('equippable');
      const selectedItem = equipment.getEquipment('Mainhand');
      const updates = e.block.permutation.getState("light:colors");
      const update = block.permutation.withState("light:colors", updates + 1);
      if (selectedItem && (selectedItem.typeId === 'fb:changer_tool_item') && block.permutation.getState("light:colors") === 0) {
        block.setPermutation(update);
        block.dimension.runCommandAsync(`execute positioned ${x} ${y} ${z} run event entity @e[r=0.5] fb:color_blue`);
        return;
      }
      if (selectedItem && (selectedItem.typeId === 'fb:changer_tool_item') && block.permutation.getState("light:colors") === 1) {
        block.setPermutation(update);
        block.dimension.runCommandAsync(`execute positioned ${x} ${y} ${z} run event entity @e[r=0.5] fb:color_red`);
        return;
      }
      if (selectedItem && (selectedItem.typeId === 'fb:changer_tool_item') && block.permutation.getState("light:colors") === 2) {
        block.setPermutation(update);
        block.dimension.runCommandAsync(`execute positioned ${x} ${y} ${z} run event entity @e[r=0.5] fb:color_green`);
        return;
      }
      if (selectedItem && (selectedItem.typeId === 'fb:changer_tool_item') && block.permutation.getState("light:colors") === 3) {
        block.setPermutation(update);
        block.dimension.runCommandAsync(`execute positioned ${x} ${y} ${z} run event entity @e[r=0.5] fb:color_pink`);
        return;
      }
      if (selectedItem && (selectedItem.typeId === 'fb:changer_tool_item') && block.permutation.getState("light:colors") === 4) {
        block.setPermutation(update);
        block.dimension.runCommandAsync(`execute positioned ${x} ${y} ${z} run event entity @e[r=0.5] fb:color_default`);
        return;
      }
    },
    onPlace: e => {

      const {
        player,
        block
      } = e;
      const {
        x,
        y,
        z
      } = block.location;
      const updates = e.block.permutation.getState("light:colors");
      const update = block.permutation.withState("light:colors", updates + 1);
      if (block.permutation.getState("light:colors") === 1) {
        block.dimension.runCommandAsync(`execute positioned ${x} ${y} ${z} run event entity @e[r=0.5] fb:color_red`);
        return;
      }
      if (block.permutation.getState("light:colors") === 2) {
        block.dimension.runCommandAsync(`execute positioned ${x} ${y} ${z} run event entity @e[r=0.5] fb:color_green`);
        return;
      }
      if (block.permutation.getState("light:colors") === 3) {
        block.dimension.runCommandAsync(`execute positioned ${x} ${y} ${z} run event entity @e[r=0.5] fb:color_pink`);
        return;
      }
      if (block.permutation.getState("light:colors") === 4) {
        block.dimension.runCommandAsync(`execute positioned ${x} ${y} ${z} run event entity @e[r=0.5] fb:color_default`);
        return;
      }
    }
  });
});


world.beforeEvents.worldInitialize.subscribe(initEvent => {
  initEvent.blockComponentRegistry.registerCustomComponent('fbd:spotlight_ray_colors_change', {
    onPlayerInteract: e => {

      const {
        player,
        block
      } = e;
      const {
        x,
        y,
        z
      } = block.location;
      const equipment = player.getComponent('equippable');
      const selectedItem = equipment.getEquipment('Mainhand');
      const updates = e.block.permutation.getState("light:colors");
      const update = block.permutation.withState("light:colors", updates + 1);
      if (selectedItem && (selectedItem.typeId === 'fb:changer_tool_item') && block.permutation.getState("light:colors") === 0) {
        block.setPermutation(update);
        block.dimension.runCommandAsync(`execute positioned ${x} ${y} ${z} run event entity @e[r=0.5] fb:color_blue`);
        return;
      }
      if (selectedItem && (selectedItem.typeId === 'fb:changer_tool_item') && block.permutation.getState("light:colors") === 1) {
        block.setPermutation(update);
        block.dimension.runCommandAsync(`execute positioned ${x} ${y} ${z} run event entity @e[r=0.5] fb:color_red`);
        return;
      }
      if (selectedItem && (selectedItem.typeId === 'fb:changer_tool_item') && block.permutation.getState("light:colors") === 2) {
        block.setPermutation(update);
        block.dimension.runCommandAsync(`execute positioned ${x} ${y} ${z} run event entity @e[r=0.5] fb:color_purple`);
        return;
      }
      if (selectedItem && (selectedItem.typeId === 'fb:changer_tool_item') && block.permutation.getState("light:colors") === 3) {
        block.setPermutation(update);
        block.dimension.runCommandAsync(`execute positioned ${x} ${y} ${z} run event entity @e[r=0.5] fb:color_orange`);
        return;
      }
      if (selectedItem && (selectedItem.typeId === 'fb:changer_tool_item') && block.permutation.getState("light:colors") === 4) {
        block.setPermutation(update);
        block.dimension.runCommandAsync(`execute positioned ${x} ${y} ${z} run event entity @e[r=0.5] fb:color_green`);
        return;
      }
      if (selectedItem && (selectedItem.typeId === 'fb:changer_tool_item') && block.permutation.getState("light:colors") === 5) {
        block.setPermutation(update);
        block.dimension.runCommandAsync(`execute positioned ${x} ${y} ${z} run event entity @e[r=0.5] fb:color_default`);
        return;
      }
    },
    onPlace: e => {

      const {
        player,
        block
      } = e;
      const {
        x,
        y,
        z
      } = block.location;
      const updates = e.block.permutation.getState("light:colors");
      const update = block.permutation.withState("light:colors", updates + 1);
      if (block.permutation.getState("light:colors") === 1) {
        block.dimension.runCommandAsync(`execute positioned ${x} ${y} ${z} run event entity @e[r=0.5] fb:color_red`);
        return;
      }
      if (block.permutation.getState("light:colors") === 2) {
        block.dimension.runCommandAsync(`execute positioned ${x} ${y} ${z} run event entity @e[r=0.5] fb:color_purple`);
        return;
      }
      if (block.permutation.getState("light:colors") === 3) {
        block.dimension.runCommandAsync(`execute positioned ${x} ${y} ${z} run event entity @e[r=0.5] fb:color_orange`);
        return;
      }
      if (block.permutation.getState("light:colors") === 4) {
        block.dimension.runCommandAsync(`execute positioned ${x} ${y} ${z} run event entity @e[r=0.5] fb:color_green`);
        return;
      }
      if (block.permutation.getState("light:colors") === 5) {
        block.dimension.runCommandAsync(`execute positioned ${x} ${y} ${z} run event entity @e[r=0.5] fb:color_default`);
        return;
      }
    }
  });
});
