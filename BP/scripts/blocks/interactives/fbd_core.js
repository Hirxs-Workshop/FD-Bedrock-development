import { world, BlockPermutation, ItemStack } from '@minecraft/server'

world.beforeEvents.worldInitialize.subscribe(function (initEvent) {
  initEvent.blockComponentRegistry.registerCustomComponent('fbd:seat_function', {
    onPlayerInteract: function (e) {
      if (e.player.isSneaking) return;
      let blockStr = e.block.x + " " + e.block.y + " " + e.block.z;
      e.dimension.runCommand("summon fbd:seat " + blockStr);
      e.dimension.runCommand("execute as @e[type=fbd:seat,c=1] run tp @s " + blockStr + " facing @p");
      e.dimension.runCommand(`ride @p start_riding @e[type=fbd:seat,c=1] teleport_rider`);
    },
    onPlayerDestroy: function (e) {
      if (!e.player) return;
      let playerLoc = e.player.location;
      playerLoc.x -= 0.5;
      playerLoc.z -= 0.5;

      if (playerLoc.x != e.block.location.x) return;
      if (playerLoc.y != e.block.location.y) return;
      if (playerLoc.z != e.block.location.z) return;

      e.player.runCommand("ride @s stop_riding");
    },
    onPlace: function (e) {
      if (!e.block) return;
      let block = e.block.above();
      if (!block) return;
    }
  });
});


world.beforeEvents.worldInitialize.subscribe((initEvent) => {
  initEvent.blockComponentRegistry.registerCustomComponent("fbd:clock_sound", {
    onTick: (event) => {
      const { player, block } = event;
      let { x, y, z } = event.block.location;
      block.dimension.runCommand(`playsound fb.clock_ticking @p`);
    }
  });
});

world.beforeEvents.worldInitialize.subscribe((initEvent) => {
  initEvent.blockComponentRegistry.registerCustomComponent("fbd:changer_tool_tip", {
    onTick: (event) => {
      const { player, block } = event;
      let { x, y, z } = event.block.location;
      if (block.permutation.getState("p:changer") === 0) {
        block.dimension.spawnParticle("fb:changer_2", { x: block.location.x + 0.5, y: block.location.y + 0.5, z: block.location.z + 0.5 });
        block.dimension.spawnParticle("fb:changertool", { x: block.location.x + 0.5, y: block.location.y + 0.5, z: block.location.z + 0.5 });
        block.dimension.runCommand(`title @p actionbar §3[INFO] §bYou need to crouch to be able to change the variant`);
      }

    }
  });
});

world.beforeEvents.worldInitialize.subscribe(initEvent => {
  initEvent.blockComponentRegistry.registerCustomComponent('fbd:add_coins', {
    onPlayerInteract: e => {
      const { player, block } = e;
      const { x, y, z } = block.location;
      const coins_add = e.block.permutation.getState("p:coins");
      const coins = block.permutation.withState("p:coins", coins_add + 1);
      const equipment = player.getComponent('equippable');
      const selectedItem = equipment.getEquipment('Mainhand');
      if (selectedItem && (selectedItem.typeId === 'fb:faz_coin_item') && block.permutation.getState("p:coins") < 3) {
        player.playSound("use.candle");
        block.setPermutation(coins);
        return;
      }
    }
  });
});

world.beforeEvents.worldInitialize.subscribe(initEvent => {
  initEvent.blockComponentRegistry.registerCustomComponent('fbd:door_function', {
    onPlayerInteract: e => {
      const { player, block, entity } = e;
      const { x, y, z } = block.location;
      const open_block = block.permutation.withState("fb:block_status", 2);
      const close_block = block.permutation.withState("fb:block_status", 1);
      if (block.permutation.getState("fb:block_status") === 1) {
        player.runCommandAsync(`event entity @e[r=3] fb:open_door_ex`);
        block.setPermutation(open_block);
        player.playSound("fb.office_door_button")
        return;

      }
      if (block.permutation.getState("fb:block_status") === 2) {
        player.runCommandAsync(`event entity @e[r=3] fb:closed_door_ex`);
        block.setPermutation(close_block);
        player.playSound("fb.office_door_button")

        return;
      }
    }
  });
});

world.beforeEvents.worldInitialize.subscribe(initEvent => {
  initEvent.blockComponentRegistry.registerCustomComponent('fbd:light_function', {
    onPlayerInteract: e => {
      const { player, block, entity } = e;
      const { x, y, z } = block.location;
      if (block.permutation.getState("fb:block_status") === 1) {
        block.dimension.runCommandAsync(`fill ~-4 ~-2 ~4 ~4 ~7 ~-4 fb:office_light_off [] replace fb:office_light`);
        player.playSound("random.click")
        return;

      }
      if (block.permutation.getState("fb:block_status") === 2) {
        block.dimension.runCommandAsync(`fill ~-4 ~-2 ~4 ~4 ~7 ~-4 fb:office_light [] replace fb:office_light_off`);
        player.playSound("random.click")

        return;
      }
    }
  });
});

world.beforeEvents.worldInitialize.subscribe(initEvent => {
  initEvent.blockComponentRegistry.registerCustomComponent('fbd:lamp_cc', {
    onPlayerInteract: e => {

      const { player, block, entity } = e;
      const { x, y, z } = block.location;
      const off_lamp = block.permutation.withState("p:is_lit", 0);
      const on_lamp = block.permutation.withState("p:is_lit", 1);
      if (block.permutation.getState("p:is_lit") === 0) {
        block.dimension.runCommandAsync(`summon fd:lamp_light_ray ${x} ${y + 0.45} ${z}`);
        player.playSound("random.click")
        block.setPermutation(on_lamp);
        return;
      }
      if (block.permutation.getState("p:is_lit") === 1) {
        player.runCommandAsync(`event entity @e[r=7] destroy`);
        player.playSound("random.click")
        block.setPermutation(off_lamp);
        return;
      }
    }
  });
});

world.beforeEvents.worldInitialize.subscribe(initEvent => {
  initEvent.blockComponentRegistry.registerCustomComponent('fbd:fan_interactive', {
    onPlayerInteract: e => {
      const { player, block, entity } = e;
      const { x, y, z, r } = block.location;
      const fan_on = block.permutation.withState("fb:block_status", 2);
      const fan_off = block.permutation.withState("fb:block_status", 1);
      if (block.permutation.getState("fb:block_status") === 1) {
        block.setPermutation(fan_on);
        player.playSound("random.click")

        return;

      }
      if (block.permutation.getState("fb:block_status") === 2) {
        block.setPermutation(fan_off);
        player.playSound("random.click");
        return;
      }
    }
  });
});

world.beforeEvents.worldInitialize.subscribe(initEvent => {
  initEvent.blockComponentRegistry.registerCustomComponent('fbd:wall_light_cc', {
    onPlayerInteract: e => {
      const { player, block, entity } = e;
      const { x, y, z, r } = block.location;
      const wall_light_off = block.permutation.withState("p:changer", 1);
      const wall_light_on = block.permutation.withState("p:changer", 0);
      if (block.permutation.getState("p:changer") === 0) {
        block.setPermutation(wall_light_off);
        player.playSound("random.click")
        return;

      }
      if (block.permutation.getState("p:changer") === 1) {
        block.setPermutation(wall_light_on);
        player.playSound("random.click");
        return;
      }
    }
  });
});

world.beforeEvents.worldInitialize.subscribe(initEvent => {
  initEvent.blockComponentRegistry.registerCustomComponent('fbd:toilet_function', {
    onPlayerInteract: e => {
      const { player, block } = e;
      const { x, y, z } = block.location;
      const toilet_open = block.permutation.withState("fbd:bathroom_vars", 1);
      const toilet_close = block.permutation.withState("fbd:bathroom_vars", 0);
      if (player.isSneaking && block.permutation.getState("fbd:bathroom_vars") === 0) {
        block.setPermutation(toilet_open);
        return;
      }
      if (player.isSneaking && block.permutation.getState("fbd:bathroom_vars") === 1) {
        block.setPermutation(toilet_close);
        player.playSound("fbd:toilet");
        return;
      }
    }
  });
});

world.beforeEvents.worldInitialize.subscribe(initEvent => {
  initEvent.blockComponentRegistry.registerCustomComponent('fbd:light_lever_interactive', {
    onPlayerInteract: e => {
      const { player, block, entity } = e;
      const { x, y, z, r } = block.location;
      const lever_on = block.permutation.withState("fb:block_status", 2);
      const lever_off = block.permutation.withState("fb:block_status", 1);
      if (block.permutation.getState("fb:block_status") === 1) {
        block.setPermutation(lever_on);
        player.playSound("block.lantern.fall")
        return;

      }
      if (block.permutation.getState("fb:block_status") === 2) {
        block.setPermutation(lever_off);
        player.playSound("block.lantern.fall");
        return;
      }
    }
  });
});

// Unused changer tool CC
// world.beforeEvents.worldInitialize.subscribe(initEvent => {
//  initEvent.blockComponentRegistry.registerCustomComponent('fd:changer_tool_function', {
//    onPlayerInteract: e => {
//      const { player, block } = e;
//      const { x, y, z } = block.location;
//      const equipment = player.getComponent('equippable');
//      const selectedItem = equipment.getEquipment('Mainhand');
//      const updates = e.block.permutation.getState("p:changer");
//      const update = block.permutation.withState("p:changer", updates + 1);
//      if (selectedItem && (selectedItem.typeId === 'fb:changer_tool_item')) {
//        player.playSound("block.lantern.break");
//        block.dimension.spawnParticle("foxes:texture", { x: block.location.x + 0.5, y: block.//location.y + 0.5, z: block.location.z + 0.5 });
//        block.setPermutation(update);
//      }
//    }
//  });
//});

world.beforeEvents.worldInitialize.subscribe(eventData => {
  eventData.blockComponentRegistry.registerCustomComponent('fbd:emergency_light_switch', {
    onPlayerInteract(e) {
      const { player, block } = e;
      const { x, y, z } = block.location;
      const emergency_light_on = block.permutation.withState("p:var", 1);
      const emergency_light_off = block.permutation.withState("p:var", 0);
      if (block.permutation.getState("p:var") === 0) {
        block.setPermutation(emergency_light_on);
        player.playSound("random.click")
        return;
      }
      if (block.permutation.getState("p:var") === 1) {
        block.setPermutation(emergency_light_off);
        player.playSound("random.click")
        return;
      }

    }
  });
});

world.beforeEvents.worldInitialize.subscribe(eventData => {
  eventData.blockComponentRegistry.registerCustomComponent('fbd:on_interact', {
    onPlayerInteract(e) {
      const { block, player, face } = e;

      const equipment = player.getComponent('equippable');

      const selectedItem = equipment.getEquipment('Mainhand');

      if (selectedItem?.typeId === block.typeId && !block.permutation.getState('fbd:double')) {
        const verticalHalf = block.permutation.getState('minecraft:vertical_half');
        const isBottomUp = verticalHalf === 'bottom' && face === 'Up';
        const isTopDown = verticalHalf === 'top' && face === 'Down';
        if (isBottomUp || isTopDown) {
          if (player.getGameMode() !== "creative") {
            if (selectedItem.amount > 1) {
              selectedItem.amount -= 1;
              equipment.setEquipment('Mainhand', selectedItem);
            } else if (selectedItem.amount === 1) {
              equipment.setEquipment('Mainhand', undefined);
            }
          }
          block.setPermutation(block.permutation.withState('fbd:double', true));
          block.setWaterlogged(false);
          player.playSound('use.stone');
        }
      }

      if (selectedItem?.typeId === 'minecraft:water_bucket' && !block.permutation.getState('fbd:waterlogged') && !block.permutation.getState('fbd:double')) {
        player.playSound('bucket.empty_water');
        if (player.getGameMode() !== "creative") {
          equipment.setEquipment('Mainhand', new ItemStack('minecraft:bucket', 1));
        }
        block.setPermutation(block.permutation.withState('fbd:waterlogged', true));
        const verticalHalf = block.permutation.getState('minecraft:vertical_half');
        const slabType = block.typeId.split(':')[1];
        const structureName = (verticalHalf === 'bottom') ? `mystructure:${slabType}_bottomSlab` : `mystructure:${slabType}_topSlab`;
        const { x, y, z } = block;
        world.structureManager.place(structureName, e.dimension, { x, y, z });
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
  initEvent.blockComponentRegistry.registerCustomComponent('fbd:cake_explode', {
    onPlayerInteract: e => {
      const { player, block } = e;
      const { x, y, z } = block.location;
      if (!player.isSneaking) {
        player.playSound("fb:freddy_noze");
        block.dimension.spawnParticle("fb:conteffi_rain", { x: block.location.x + 0.5, y: block.location.y + 0.5, z: block.location.z + 0.5 });
      }
      if (player.isSneaking) {
        player.playSound("random.fizz");
        block.dimension.spawnParticle("fb:conteffi_rain", { x: block.location.x + 0.5, y: block.location.y + 0.5, z: block.location.z + 0.5 });
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

world.beforeEvents.worldInitialize.subscribe(initEvent => {
  initEvent.blockComponentRegistry.registerCustomComponent('fbd:phone_function', {
    onPlayerInteract: e => {
      const { player, block } = e;
      const { x, y, z } = block.location;
      const updates = e.block.permutation.getState("fb:channel");
      const update = block.permutation.withState("fb:channel", updates + 1);
      if (block.permutation.getState("fb:channel") === 0) {
        player.playSound("random.click");
        player.runCommandAsync('stopsound @a[r=15] fb:phone5');
        player.playSound("fb:phone1");
        player.runCommandAsync('title @s actionbar §jConnected... §l§q[Call Night 1]');
        block.setPermutation(update);
        return;
      }
      if (block.permutation.getState("fb:channel") === 1) {
        player.playSound("random.click");
        player.runCommandAsync('stopsound @a[r=15] fb:phone1');
        player.playSound("fb:phone2");
        player.runCommandAsync('title @s actionbar §jConnected... §l§q[Call Night 2]');
        block.setPermutation(update);
        return;
      }
      if (block.permutation.getState("fb:channel") === 2) {
        player.playSound("random.click");
        player.runCommandAsync('stopsound @a[r=15] fb:phone2');
        player.playSound("fb:phone3");
        player.runCommandAsync('title @s actionbar §jConnected... §l§q[Call Night 3]');
        block.setPermutation(update);
        return;
      }
      if (block.permutation.getState("fb:channel") === 3) {
        player.playSound("random.click");
        player.runCommandAsync('stopsound @a[r=15] fb:phone3');
        player.playSound("fb:phone4");
        player.runCommandAsync('title @s actionbar §jConnected... §l§q[Call Night 4]');
        block.setPermutation(update);
        return;
      }
      if (block.permutation.getState("fb:channel") === 4) {
        player.playSound("random.click");
        player.runCommandAsync('stopsound @a[r=15] fb:phone4');
        player.playSound("fb:phone5");
        player.runCommandAsync('title @s actionbar §jConnected... §l§k§q[Call Night 5]§r');
        block.setPermutation(update);
        return;
      }
      if (block.permutation.getState("fb:channel") === 5) {
        player.playSound("random.click");
        player.playSound("random.fizz");
        player.runCommandAsync('stopsound @a[r=15] fb:phone5');
        player.runCommandAsync('title @s actionbar §gWarning... §l§m[Call deactivated]');
        block.setPermutation(update);
        return;
      }
    }
  });
});

// 								"gamerule sendcommandfeedback false",
//								"playsound random.click @p ~~~ 1 2",
//								"stopsound @a[r=15] fb:phone5",
//								"playsound fb:phone1 @a[r=15] ~~~"

//								"playsound random.click @p ~~~ 1 2",
//								"playsound random.fizz @a[r=15] ~~~ 40",
//								"stopsound @a[r=15] fb:phone5"

world.beforeEvents.worldInitialize.subscribe(initEvent => {
  initEvent.blockComponentRegistry.registerCustomComponent('fbd:stars_change_quantity', {
    onPlayerInteract: e => {
      const { player, block } = e;
      const { x, y, z } = block.location;
      const equipment = player.getComponent('equippable');
      const selectedItem = equipment.getEquipment('Mainhand');
      const stars_var_1 = block.permutation.withState("fb:box", 0);
      const stars_var_2 = block.permutation.withState("fb:box", 1);
      const stars_var_3 = block.permutation.withState("fb:box", 2);
      const stars_var_4 = block.permutation.withState("fb:box", 3);
      const stars_var_5 = block.permutation.withState("fb:box", 4);
      const stars_var_6 = block.permutation.withState("fb:box", 5);
      const stars_var_7 = block.permutation.withState("fb:box", 6);
      const stars_var_8 = block.permutation.withState("fb:box", 7);
      const stars_var_9 = block.permutation.withState("fb:box", 8);
      if (selectedItem && (selectedItem.typeId === 'fb:stars_item') && block.permutation.getState("fb:box") < 2) {
        block.setPermutation(stars_var_4);
        return;
      }
      if (selectedItem && (selectedItem.typeId === 'fb:stars_item') && block.permutation.getState("fb:box") < 5) {
        block.setPermutation(stars_var_7);
        return;
      }
      if (selectedItem && (selectedItem.typeId === 'fb:stars_item') && block.permutation.getState("fb:box") < 8) {
        block.setPermutation(stars_var_1);
        return;
      }
      if (player.isSneaking && block.permutation.getState("fb:box") === 0) {
        block.setPermutation(stars_var_2);
        return;
      }
      if (player.isSneaking && block.permutation.getState("fb:box") === 1) {
        block.setPermutation(stars_var_3);
        return;
      }
      if (player.isSneaking && block.permutation.getState("fb:box") === 2) {
        block.setPermutation(stars_var_1);
        return;
      }

      if (player.isSneaking && block.permutation.getState("fb:box") === 3) {
        block.setPermutation(stars_var_5);
        return;
      }
      if (player.isSneaking && block.permutation.getState("fb:box") === 4) {
        block.setPermutation(stars_var_6);
        return;
      }
      if (player.isSneaking && block.permutation.getState("fb:box") === 5) {
        block.setPermutation(stars_var_4);
        return;
      }

      if (player.isSneaking && block.permutation.getState("fb:box") === 6) {
        block.setPermutation(stars_var_8);
        return;
      }
      if (player.isSneaking && block.permutation.getState("fb:box") === 7) {
        block.setPermutation(stars_var_9);
        return;
      }
      if (player.isSneaking && block.permutation.getState("fb:box") === 8) {
        block.setPermutation(stars_var_7);
        return;
      }
    }
  });
});

world.beforeEvents.worldInitialize.subscribe(initEvent => {
  initEvent.blockComponentRegistry.registerCustomComponent('fbd:soda_remove', {
    onPlayerInteract: e => {
      const { player, block } = e;
      const { x, y, z } = block.location;
      const soda_get = new ItemStack("fb:soda_item");
      const blue_soda_get = new ItemStack("fb:blue_soda_item");
      if (!player.isSneaking && block.hasTag('red_soda')) {
        player.playSound("break.big_dripleaf");
        block.dimension.spawnItem(soda_get, { x: block.location.x + 0.5, y: block.location.y + 1, z: block.location.z + 0.5 });
        block.dimension.runCommandAsync(`setblock ${x} ${y} ${z} air[]`);
        block.dimension.spawnParticle("foxes:texture", { x: block.location.x + 0.5, y: block.location.y + 0.5, z: block.location.z + 0.5 })
        return;
      }
      if (!player.isSneaking && block.hasTag('blue_soda')) {
        player.playSound("break.big_dripleaf");
        block.dimension.spawnItem(blue_soda_get, { x: block.location.x + 0.5, y: block.location.y + 1, z: block.location.z + 0.5 });
        block.dimension.runCommandAsync(`setblock ${x} ${y} ${z} air[]`);
        block.dimension.spawnParticle("foxes:texture", { x: block.location.x + 0.5, y: block.location.y + 0.5, z: block.location.z + 0.5 })
        return;
      }

    }
  });
});

world.beforeEvents.worldInitialize.subscribe(initEvent => {
  initEvent.blockComponentRegistry.registerCustomComponent('fbd:pizza_slice_remove', {
    onPlayerInteract: e => {
      const { player, block } = e;
      const { x, y, z } = block.location;
      const pizza_slice_2 = new ItemStack("fb:pizza_2_slice_item");
      const pizza_slice = new ItemStack("fb:pizza_slice_item");
      if (!player.isSneaking && block.hasTag('pizza_slice_2')) {
        player.playSound("break.big_dripleaf");
        block.dimension.spawnItem(pizza_slice_2, { x: block.location.x + 0.5, y: block.location.y + 1, z: block.location.z + 0.5 });
        block.dimension.runCommandAsync(`setblock ${x} ${y} ${z} air[]`);
        block.dimension.spawnParticle("foxes:texture", { x: block.location.x + 0.5, y: block.location.y + 0.5, z: block.location.z + 0.5 })
        return;
      }
      if (!player.isSneaking && block.hasTag('pizza_slice')) {
        player.playSound("break.big_dripleaf");
        block.dimension.spawnItem(pizza_slice, { x: block.location.x + 0.5, y: block.location.y + 1, z: block.location.z + 0.5 });
        block.dimension.runCommandAsync(`setblock ${x} ${y} ${z} air[]`);
        block.dimension.spawnParticle("foxes:texture", { x: block.location.x + 0.5, y: block.location.y + 0.5, z: block.location.z + 0.5 })
        return;
      }

    }
  });
});

function getPreciseRotation(playerYRotation) {
  if (playerYRotation < 0) playerYRotation += 360;
  const rotation = Math.round(playerYRotation / 22.5);

  return rotation !== 16 ? rotation : 0;
}

world.beforeEvents.worldInitialize.subscribe(({ blockComponentRegistry }) => {
  blockComponentRegistry.registerCustomComponent("fbd:ar_for_ceiling_blocks", {
    beforeOnPlayerPlace(event) {
      const { player } = event;
      if (!player) return;

      const blockFace = event.permutationToPlace.getState("minecraft:block_face");
      if (blockFace !== "down") return;

      const playerYRotation = player.getRotation().y;
      const rotation = getPreciseRotation(playerYRotation);

      event.permutationToPlace = event.permutationToPlace.withState("fb:rotation", rotation);
    }
  });
});

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
  })
});

world.beforeEvents.worldInitialize.subscribe(event => {
  event.blockComponentRegistry.registerCustomComponent("fbd:snack_variants_function", {
    onPlace: (onPlaceEvent => {
      onPlaceEvent.block.setPermutation(onPlaceEvent.block.permutation.withState("fbd:snack_variants", Math.round(Math.random() * 10)))
    })
  })
});

world.beforeEvents.worldInitialize.subscribe(initEvent => {
  initEvent.blockComponentRegistry.registerCustomComponent('fbd:trash_cc', {
    onPlayerInteract: e => {
      const { player, block } = e;
      const { x, y, z } = block.location;
      const equipment = player.getComponent('equippable');
      const selectedItem = equipment.getEquipment('Mainhand');

      if (!player.isSneaking && selectedItem) {
        player.playSound("random.pop2");
        player.playSound("composter.ready");
        if (selectedItem.amount > 1) {
          selectedItem.amount -= 1;
          equipment.setEquipment('Mainhand', selectedItem);
        } else {
          equipment.setEquipment('Mainhand', undefined);
        }
        return;
      }
    },
  });
});


// ITEMS

// world.beforeEvents.worldInitialize.subscribe(initEvent => {
//  initEvent.itemComponentRegistry.registerCustomComponent('fbd:stars_change', {
//    onUseOn: e => {
//      const { block, player } = e;
//      const stars_change_1 = block.permutation.withState("fb:box", 3);
//      if (block.hasTag('stars') && block.permutation.getState("fb:box") < 2) {
//        block.setPermutation(stars_change_1);
//        return;
//      }
//    }
//  });
//})