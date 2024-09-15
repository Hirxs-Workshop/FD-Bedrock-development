import {
  world,
  BlockPermutation,
  ItemStack
} from '@minecraft/server'
import { ElectricSystemFBD } from './electric/wires';

world.beforeEvents.worldInitialize.subscribe((e) => {
  e.blockComponentRegistry.registerCustomComponent("fbd:electric_system_reworked", new ElectricSystemFBD());
});

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

world.beforeEvents.worldInitialize.subscribe(function (initEvent) {
  initEvent.blockComponentRegistry.registerCustomComponent('fbd:seat_function_pizzeria', {
    onPlayerInteract: function (e) {
      if (e.player.isSneaking) return;
      let blockStr = e.block.x + " " + e.block.y + " " + e.block.z;
      e.dimension.runCommand("summon fbd:seat_2 " + blockStr);
      e.dimension.runCommand("execute as @e[type=fbd:seat_2,c=1] run tp @s " + blockStr + " facing @p");
      e.dimension.runCommand(`ride @p start_riding @e[type=fbd:seat_2,c=1] teleport_rider`);
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
      const {
        player,
        block
      } = event;
      let {
        x,
        y,
        z
      } = event.block.location;
      block.dimension.runCommand(`playsound fb.clock_ticking @p`);
    }
  });
});

world.beforeEvents.worldInitialize.subscribe((initEvent) => {
  initEvent.blockComponentRegistry.registerCustomComponent("fbd:changer_tool_tip", {
    onTick: (event) => {
      const {
        player,
        block
      } = event;
      let {
        x,
        y,
        z
      } = event.block.location;
      if (block.permutation.getState("p:changer") === 0) {
        block.dimension.spawnParticle("fb:changer_2", {
          x: block.location.x + 0.5,
          y: block.location.y + 0.5,
          z: block.location.z + 0.5
        });
        block.dimension.spawnParticle("fb:changertool", {
          x: block.location.x + 0.5,
          y: block.location.y + 0.5,
          z: block.location.z + 0.5
        });
        block.dimension.runCommand(`title @p actionbar §3[INFO] §bYou need to crouch to be able to change the variant`);
      }

    }
  });
});

world.beforeEvents.worldInitialize.subscribe(initEvent => {
  initEvent.blockComponentRegistry.registerCustomComponent('fbd:add_coins', {
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
  initEvent.blockComponentRegistry.registerCustomComponent('fbd:items_place', {
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
      const pizza_slice = block.permutation.withState("fd:item", 1);
      const pizza_slice_2 = block.permutation.withState("fd:item", 2);
      const cake_slice = block.permutation.withState("fd:item", 3);
      const remove_item = block.permutation.withState("fd:item", 0);
      const get_pizza_slice = new ItemStack("fb:pizza_slice_item");
      const get_pizza_slice_2 = new ItemStack("fb:pizza_2_slice_item");
      const get_cake_slice = new ItemStack("fb:cake_slice_item");
      if (selectedItem && (selectedItem.typeId === 'fb:pizza_slice_item') && block.permutation.getState("fd:item") === 0) {
        player.playSound("random.pop")
        block.setPermutation(pizza_slice);
        if (selectedItem.amount > 1) {
          selectedItem.amount -= 1;
          equipment.setEquipment('Mainhand', selectedItem);
        } else {
          equipment.setEquipment('Mainhand', undefined);
        }
        return;

      }
      if (selectedItem && (selectedItem.typeId === 'fb:pizza_2_slice_item') && block.permutation.getState("fd:item") === 0) {
        player.playSound("random.pop")
        block.setPermutation(pizza_slice_2);
        if (selectedItem.amount > 1) {
          selectedItem.amount -= 1;
          equipment.setEquipment('Mainhand', selectedItem);
        } else {
          equipment.setEquipment('Mainhand', undefined);
        }
        return;

      }
      if (selectedItem && (selectedItem.typeId === 'fb:cake_slice_item') && block.permutation.getState("fd:item") === 0) {
        player.playSound("random.pop")
        block.setPermutation(cake_slice);
        if (selectedItem.amount > 1) {
          selectedItem.amount -= 1;
          equipment.setEquipment('Mainhand', selectedItem);
        } else {
          equipment.setEquipment('Mainhand', undefined);
        }
        return;

      }
      if (block.permutation.getState("fd:item") === 1) {
        player.playSound("random.pop2")
        block.setPermutation(remove_item);
        block.dimension.spawnItem(get_pizza_slice, { x: block.location.x + 0.5, y: block.location.y + 1, z: block.location.z + 0.5 });
        return;

      }
      if (block.permutation.getState("fd:item") === 2) {
        player.playSound("random.pop2")
        block.setPermutation(remove_item);
        block.dimension.spawnItem(get_pizza_slice_2, { x: block.location.x + 0.5, y: block.location.y + 1, z: block.location.z + 0.5 });
        return;

      }
      if (block.permutation.getState("fd:item") === 3) {
        player.playSound("random.pop2")
        block.setPermutation(remove_item);
        block.dimension.spawnItem(get_cake_slice, { x: block.location.x + 0.5, y: block.location.y + 1, z: block.location.z + 0.5 });
        return;

      }

    }
  });
});

world.beforeEvents.worldInitialize.subscribe(initEvent => {
  initEvent.blockComponentRegistry.registerCustomComponent('fbd:soda_machine', {
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
      const updates = e.block.permutation.getState("fbd:sodas");
      const update = block.permutation.withState("fbd:sodas", updates + 1);
      const butter_soda_get = new ItemStack("fd:butter_soda_item");
      const foxys_fruity_cove_coole_hw_get = new ItemStack("fd:foxys_fruity_cove_coole_hw_item");
      const exotic_beverage_soda_get = new ItemStack("fd:exotic_beverage_item");
      if (player.isSneaking) {
        block.setPermutation(update);
        player.playSound("fb.selection_machine")
        return;
      }
      if (selectedItem && (selectedItem.typeId === 'fb:faz_coin_item') && block.permutation.getState("fbd:sodas") === 1) {
        player.playSound("fb.coins")
        player.playSound("fb.soda_dispenser")
        block.dimension.spawnItem(butter_soda_get, { x: block.location.x + 0.5, y: block.location.y + 1, z: block.location.z + 0.5 });
        if (selectedItem.amount > 1) {
          selectedItem.amount -= 1;
          equipment.setEquipment('Mainhand', selectedItem);
        } else {
          equipment.setEquipment('Mainhand', undefined);
        }
        return;
      }
      if (selectedItem && (selectedItem.typeId === 'fb:faz_coin_item') && block.permutation.getState("fbd:sodas") === 2) {
        player.playSound("fb.coins")
        player.playSound("fb.soda_dispenser")
        block.dimension.spawnItem(exotic_beverage_soda_get, { x: block.location.x + 0.5, y: block.location.y + 1, z: block.location.z + 0.5 });

        if (selectedItem.amount > 1) {
          selectedItem.amount -= 1;
          equipment.setEquipment('Mainhand', selectedItem);
        } else {
          equipment.setEquipment('Mainhand', undefined);
        }
        return;
      }
      if (selectedItem && (selectedItem.typeId === 'fb:faz_coin_item') && block.permutation.getState("fbd:sodas") === 3) {
        player.playSound("fb.coins")
        player.playSound("fb.soda_dispenser")
        block.dimension.spawnItem(foxys_fruity_cove_coole_hw_get, { x: block.location.x + 0.5, y: block.location.y + 1, z: block.location.z + 0.5 });

        if (selectedItem.amount > 1) {
          selectedItem.amount -= 1;
          equipment.setEquipment('Mainhand', selectedItem);
        } else {
          equipment.setEquipment('Mainhand', undefined);
        }
        return;
      }

    }
  });
});

world.beforeEvents.worldInitialize.subscribe(initEvent => {
  initEvent.blockComponentRegistry.registerCustomComponent('fbd:door_function', {
    onPlayerInteract: e => {
      const {
        player,
        block,
        entity
      } = e;
      const {
        x,
        y,
        z
      } = block.location;
      const open_block = block.permutation.withState("fb:block_status", 2);
      const close_block = block.permutation.withState("fb:block_status", 1);
      if (block.permutation.getState("fb:block_status") === 1) {
        block.dimension.runCommandAsync(`execute at @e[type=fb:new_office_door] positioned ${x} ${y} ${z} run event entity @e[r=3] fb:closed_door_ex`);

        player.playSound("fb.office_door_button")
        block.setPermutation(open_block);

        return;

      }
      if (block.permutation.getState("fb:block_status") === 2) {

        block.dimension.runCommandAsync(`execute positioned ${x} ${y} ${z} run event entity @e[r=3] fb:open_door_ex`);
        block.setPermutation(close_block);
        player.playSound("fb.office_door_button")
        return;
      }
    }
  });
});

world.beforeEvents.worldInitialize.subscribe(initEvent => {
  initEvent.blockComponentRegistry.registerCustomComponent('fbd:vent_open', {
    onPlayerInteract: e => {
      const {
        player,
        block,
        entity
      } = e;
      const {
        x,
        y,
        z
      } = block.location;
      const open_block = block.permutation.withState("fb:block_status", 2);
      const close_block = block.permutation.withState("fb:block_status", 1);
      if (block.permutation.getState("fb:block_status") === 1) {
        player.playSound("open_trapdoor.copper")
        block.setPermutation(open_block);

        return;

      }
      if (block.permutation.getState("fb:block_status") === 2) {
        block.setPermutation(close_block);
        player.playSound("open_trapdoor.copper")
        return;
      }
    }
  });
});

world.beforeEvents.worldInitialize.subscribe(initEvent => {
  initEvent.blockComponentRegistry.registerCustomComponent('fbd:light_function', {
    onPlayerInteract: e => {
      const {
        player,
        block,
        entity
      } = e;
      const {
        x,
        y,
        z
      } = block.location;
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
  initEvent.blockComponentRegistry.registerCustomComponent('fbd:vent_button', {
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
        block.dimension.runCommandAsync(`fill ${x - 6} ${y - 2} ${z + 6} ${x + 6} ${y + 6} ${z - 6} fb:vent_light_on[] replace fb:vent_light`);
        player.playSound("random.click")
        return;

      }
      if (block.permutation.getState("fb:block_status") === 2) {
        block.setPermutation(lever_off);
        block.dimension.runCommandAsync(`fill ${x - 6} ${y - 2} ${z + 6} ${x + 6} ${y + 6} ${z - 6} fb:vent_light[] replace fb:vent_light_on`);
        player.playSound("random.click");
        return;
      }
    }
  });
});

world.beforeEvents.worldInitialize.subscribe(initEvent => {
  initEvent.blockComponentRegistry.registerCustomComponent('fbd:lamp_cc', {
    onTick: e => {
      const {
        player,
        block,
        entity
      } = e;
      const {
        x,
        y,
        z
      } = block.location;
      if (block.permutation.getState("p:is_lit") === 1) {
        block.dimension.spawnParticle("fbd:light_sparkle", { x: block.location.x + 0.5, y: block.location.y, z: block.location.z + 0.5 });
        block.dimension.spawnParticle("fbd:light_sparkle", { x: block.location.x + 0.5, y: block.location.y, z: block.location.z + 0.5 });
        return;
      }
    },
    onPlace: e => {
      const {
        player,
        block,
        entity
      } = e;
      const {
        x,
        y,
        z
      } = block.location;
      if (block.permutation.getState("p:is_lit") === 0) {
        block.dimension.runCommandAsync(`execute at @e[type=fd:lamp_light_ray] positioned ${x} ${y} ${z} run event entity @e[r=0.5] destroy`);
        return;
      }
      if (block.permutation.getState("p:is_lit") === 1) {
        block.dimension.runCommandAsync(`summon fd:lamp_light_ray ${x} ${y + 0.45} ${z}`);
        return;
      }
    },
    onPlayerDestroy: e => {
      const {
        player,
        block,
        entity
      } = e;
      const {
        x,
        y,
        z
      } = block.location;
      block.dimension.runCommandAsync(`execute at @e[type=fd:lamp_light_ray] positioned ${x} ${y} ${z} run event entity @e[r=0.5] destroy`);
    },
    onPlayerInteract: e => {
      const {
        player,
        block,
        entity
      } = e;
      const {
        x,
        y,
        z
      } = block.location;
      const off_lamp = block.permutation.withState("p:is_lit", 0);
      const on_lamp = block.permutation.withState("p:is_lit", 1);
      if (block.permutation.getState("p:is_lit") === 0) {
        block.dimension.runCommandAsync(`summon fd:lamp_light_ray ${x} ${y + 0.45} ${z}`);
        player.playSound("random.click")
        block.setPermutation(on_lamp);
        return;
      }
      if (block.permutation.getState("p:is_lit") === 1) {
        block.dimension.runCommandAsync(`execute at @e[type=fd:lamp_light_ray] positioned ${x} ${y} ${z} run event entity @e[r=0.5] destroy`);
        player.playSound("random.click")
        block.setPermutation(off_lamp);
        return;
      }
    },
    onStepOn: e => {
      const {
        player,
        block,
        entity
      } = e;
      const {
        x,
        y,
        z
      } = block.location;
      const destroy_lamp = block.permutation.withState("p:is_lit", 2);
      if (block.permutation.getState("p:is_lit") === 1) {
        block.dimension.runCommandAsync(`execute at @a positioned ${x} ${y} ${z} run playsound block.lantern.fall @e[r=7`);
        block.setPermutation(destroy_lamp);
        return;
      }
    }
  });
});

world.beforeEvents.worldInitialize.subscribe(eventData => {

  eventData.blockComponentRegistry.registerCustomComponent('fbd:lamp_tick', {
    onTick(e) {
      const {
        player,
        block,
        entity
      } = e;
      const {
        x,
        y,
        z
      } = block.location;
      const drestroyed_off = block.permutation.withState("p:is_lit", 3);
      const drestroyed_on = block.permutation.withState("p:is_lit", 2);
      if (block.permutation.getState("p:is_lit") === 2) {

        block.dimension.runCommandAsync(`execute at @e[type=fd:lamp_light_ray] positioned ${x} ${y} ${z} run event entity @e[r=0.5] destroy`);
        block.setPermutation(drestroyed_off);
        return;
      }
      if (block.permutation.getState("p:is_lit") === 3) {
        block.dimension.runCommandAsync(`summon fd:lamp_light_ray ${x} ${y + 0.45} ${z}`);
        block.setPermutation(drestroyed_on);
        return;
      }
    }
  });
});

world.beforeEvents.worldInitialize.subscribe(eventData => {

  eventData.blockComponentRegistry.registerCustomComponent('fbd:lightbulb_change', {
    onPlayerInteract: e => {
      const {
        player,
        block,
        entity
      } = e;
      const {
        x,
        y,
        z
      } = block.location;
      const off_lamp = block.permutation.withState("fb:block_status", 1);
      const on_lamp = block.permutation.withState("fb:block_status", 2);
      if (block.permutation.getState("fb:block_status") === 1) {
        player.playSound("random.click")
        block.setPermutation(on_lamp);
        return;
      }
      if (block.permutation.getState("fb:block_status") === 2) {
        block.setPermutation(off_lamp);
        return;
      }
      if (block.permutation.getState("fb:block_status") === 3) {
        block.setPermutation(off_lamp);
        return;
      }
    },
    onTick(e) {
      const {
        player,
        block,
        entity
      } = e;
      const {
        x,
        y,
        z
      } = block.location;
      const drestroyed_off = block.permutation.withState("fb:block_status", 3);
      const drestroyed_on = block.permutation.withState("fb:block_status", 2);
      if (block.permutation.getState("fb:block_status") === 2) {
        block.setPermutation(drestroyed_off);
        return;
      }
      if (block.permutation.getState("fb:block_status") === 3) {
        block.setPermutation(drestroyed_on);
        return;
      }
    }
  });
});

world.beforeEvents.worldInitialize.subscribe(initEvent => {
  initEvent.blockComponentRegistry.registerCustomComponent('fbd:spotlight_ray', {
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
      if (block.permutation.getState("fb:rotation") === 0) {
        block.dimension.runCommandAsync(`summon fd:spotlight_ray_new ${x} ${y} ${z} 180 0`);
        return;
      }
      if (block.permutation.getState("fb:rotation") === 1) {
        block.dimension.runCommandAsync(`summon fd:spotlight_ray_new ${x} ${y} ${z} 200 0`);
        return;
      }
      if (block.permutation.getState("fb:rotation") === 2) {
        block.dimension.runCommandAsync(`summon fd:spotlight_ray_new ${x} ${y} ${z} 225 0`);
        return;
      }
      if (block.permutation.getState("fb:rotation") === 3) {
        block.dimension.runCommandAsync(`summon fd:spotlight_ray_new ${x} ${y} ${z} 250 0`);
        return;
      }
      if (block.permutation.getState("fb:rotation") === 4) {
        block.dimension.runCommandAsync(`summon fd:spotlight_ray_new ${x} ${y} ${z} 270 0`);
        return;
      }
      if (block.permutation.getState("fb:rotation") === 5) {
        block.dimension.runCommandAsync(`summon fd:spotlight_ray_new ${x} ${y} ${z} 290 0`);
        return;
      }
      if (block.permutation.getState("fb:rotation") === 6) {
        block.dimension.runCommandAsync(`summon fd:spotlight_ray_new ${x} ${y} ${z} 315 0`);
        return;
      }
      if (block.permutation.getState("fb:rotation") === 7) {
        block.dimension.runCommandAsync(`summon fd:spotlight_ray_new ${x} ${y} ${z} 335 0`);
        return;
      }
      if (block.permutation.getState("fb:rotation") === 8) {
        block.dimension.runCommandAsync(`summon fd:spotlight_ray_new ${x} ${y} ${z} 0 0`);
        return;
      }
      if (block.permutation.getState("fb:rotation") === 9) {
        block.dimension.runCommandAsync(`summon fd:spotlight_ray_new ${x} ${y} ${z} 25 0`);
        return;
      }
      if (block.permutation.getState("fb:rotation") === 10) {
        block.dimension.runCommandAsync(`summon fd:spotlight_ray_new ${x} ${y} ${z} 45 0`);
        return;
      }
      if (block.permutation.getState("fb:rotation") === 11) {
        block.dimension.runCommandAsync(`summon fd:spotlight_ray_new ${x} ${y} ${z} 70 0`);
        return;
      }
      if (block.permutation.getState("fb:rotation") === 12) {
        block.dimension.runCommandAsync(`summon fd:spotlight_ray_new ${x} ${y} ${z} 90 0`);
        return;
      }
      if (block.permutation.getState("fb:rotation") === 13) {
        block.dimension.runCommandAsync(`summon fd:spotlight_ray_new ${x} ${y} ${z} 115 0`);
        return;
      }
      if (block.permutation.getState("fb:rotation") === 14) {
        block.dimension.runCommandAsync(`summon fd:spotlight_ray_new ${x} ${y} ${z} 135 0`);
        return;
      }
      if (block.permutation.getState("fb:rotation") === 15) {
        block.dimension.runCommandAsync(`summon fd:spotlight_ray_new ${x} ${y} ${z} 160 0`);
        return;
      }
    }
  });
});


world.beforeEvents.worldInitialize.subscribe(initEvent => {
  initEvent.blockComponentRegistry.registerCustomComponent('fbd:silver_spotlight_ray', {
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
      if (block.permutation.getState("fb:rotation") === 0) {
        block.dimension.runCommandAsync(`summon fd:silver_spotlight_ray ${x} ${y} ${z} 180 0`);
        return;
      }
      if (block.permutation.getState("fb:rotation") === 1) {
        block.dimension.runCommandAsync(`summon fd:silver_spotlight_ray ${x} ${y} ${z} 200 0`);
        return;
      }
      if (block.permutation.getState("fb:rotation") === 2) {
        block.dimension.runCommandAsync(`summon fd:silver_spotlight_ray ${x} ${y} ${z} 225 0`);
        return;
      }
      if (block.permutation.getState("fb:rotation") === 3) {
        block.dimension.runCommandAsync(`summon fd:silver_spotlight_ray ${x} ${y} ${z} 250 0`);
        return;
      }
      if (block.permutation.getState("fb:rotation") === 4) {
        block.dimension.runCommandAsync(`summon fd:silver_spotlight_ray ${x} ${y} ${z} 270 0`);
        return;
      }
      if (block.permutation.getState("fb:rotation") === 5) {
        block.dimension.runCommandAsync(`summon fd:silver_spotlight_ray ${x} ${y} ${z} 290 0`);
        return;
      }
      if (block.permutation.getState("fb:rotation") === 6) {
        block.dimension.runCommandAsync(`summon fd:silver_spotlight_ray ${x} ${y} ${z} 315 0`);
        return;
      }
      if (block.permutation.getState("fb:rotation") === 7) {
        block.dimension.runCommandAsync(`summon fd:silver_spotlight_ray ${x} ${y} ${z} 335 0`);
        return;
      }
      if (block.permutation.getState("fb:rotation") === 8) {
        block.dimension.runCommandAsync(`summon fd:silver_spotlight_ray ${x} ${y} ${z} 0 0`);
        return;
      }
      if (block.permutation.getState("fb:rotation") === 9) {
        block.dimension.runCommandAsync(`summon fd:silver_spotlight_ray ${x} ${y} ${z} 25 0`);
        return;
      }
      if (block.permutation.getState("fb:rotation") === 10) {
        block.dimension.runCommandAsync(`summon fd:silver_spotlight_ray ${x} ${y} ${z} 45 0`);
        return;
      }
      if (block.permutation.getState("fb:rotation") === 11) {
        block.dimension.runCommandAsync(`summon fd:silver_spotlight_ray ${x} ${y} ${z} 70 0`);
        return;
      }
      if (block.permutation.getState("fb:rotation") === 12) {
        block.dimension.runCommandAsync(`summon fd:silver_spotlight_ray ${x} ${y} ${z} 90 0`);
        return;
      }
      if (block.permutation.getState("fb:rotation") === 13) {
        block.dimension.runCommandAsync(`summon fd:silver_spotlight_ray ${x} ${y} ${z} 115 0`);
        return;
      }
      if (block.permutation.getState("fb:rotation") === 14) {
        block.dimension.runCommandAsync(`summon fd:silver_spotlight_ray ${x} ${y} ${z} 135 0`);
        return;
      }
      if (block.permutation.getState("fb:rotation") === 15) {
        block.dimension.runCommandAsync(`summon fd:silver_spotlight_ray ${x} ${y} ${z} 160 0`);
        return;
      }
    }
  });
});


world.beforeEvents.worldInitialize.subscribe(initEvent => {
  initEvent.blockComponentRegistry.registerCustomComponent('fbd:fan_interactive', {
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
      const {
        player,
        block
      } = e;
      const {
        x,
        y,
        z
      } = block.location;
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
0

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
      const {
        player,
        block
      } = e;
      const {
        x,
        y,
        z
      } = block.location;
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
      const {
        block,
        player,
        face
      } = e;

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
        const {
          x,
          y,
          z
        } = block;
        world.structureManager.place(structureName, e.dimension, {
          x,
          y,
          z
        });
      }
    }
  });
});

world.beforeEvents.worldInitialize.subscribe(initEvent => {
  initEvent.blockComponentRegistry.registerCustomComponent('fb:plushy_sound_interaction', {
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
      if (!player.isSneaking) {
        player.playSound("fb:freddy_noze");
        block.dimension.spawnParticle("foxes:texture", {
          x: block.location.x + 0.5,
          y: block.location.y + 0.5,
          z: block.location.z + 0.5
        });
      }
      if (player.isSneaking) {
        player.playSound("random.fizz");
        block.dimension.spawnParticle("fb:smoke", {
          x: block.location.x + 0.5,
          y: block.location.y + 0.5,
          z: block.location.z + 0.5
        });
        block.dimension.runCommandAsync(`setblock ${x} ${y} ${z} air[] destroy`);
      }

    }
  });
});

world.beforeEvents.worldInitialize.subscribe(initEvent => {
  initEvent.blockComponentRegistry.registerCustomComponent('fbd:cake_explode', {
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
      if (!player.isSneaking) {
        player.playSound("fb:freddy_noze");
        block.dimension.spawnParticle("fb:conteffi_rain", {
          x: block.location.x + 0.5,
          y: block.location.y + 0.5,
          z: block.location.z + 0.5
        });
      }
      if (player.isSneaking) {
        player.playSound("random.fizz");
        block.dimension.spawnParticle("fb:conteffi_rain", {
          x: block.location.x + 0.5,
          y: block.location.y + 0.5,
          z: block.location.z + 0.5
        });
        block.dimension.runCommandAsync(`setblock ${x} ${y} ${z} air[] destroy`);
      }

    }
  });
});

world.beforeEvents.worldInitialize.subscribe(initEvent => {
  initEvent.blockComponentRegistry.registerCustomComponent('fb:arcade_room_sign_interactive', {
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
      const {
        player,
        block
      } = e;
      const {
        x,
        y,
        z
      } = block.location;
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

world.beforeEvents.worldInitialize.subscribe(initEvent => {
  initEvent.blockComponentRegistry.registerCustomComponent('fbd:notes', {
    onTick: (event) => {
      const {
        player,
        block
      } = event;
      let {
        x,
        y,
        z
      } = event.block.location;
      block.dimension.spawnParticle("fbd:note", {
        x: block.location.x + 0.5,
        y: block.location.y + 0.5,
        z: block.location.z + 0.5
      })
    }
  });
});

world.beforeEvents.worldInitialize.subscribe(initEvent => {
  initEvent.blockComponentRegistry.registerCustomComponent('fbd:song_selector', {
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
      const updates = e.block.permutation.getState("fbd:music");
      const update = block.permutation.withState("fbd:music", updates + 1);

      if (block.permutation.getState("fbd:music") === 0) {
        player.runCommandAsync('stopsound @a[r=15] fb5');
        player.runCommandAsync('music play fb1 0.5 1 loop');
        player.runCommandAsync('title @s actionbar §7The speaker is playing... §l§f[FNAF 1 Song]');
        block.setPermutation(update);
        return;

      }
      if (block.permutation.getState("fbd:music") === 1) {
        player.runCommandAsync('stopsound @a[r=15] fb5');
        player.runCommandAsync('music play fb2 0.5 1 loop');
        player.runCommandAsync(`title @s actionbar §7The speaker is playing... §l§f[It's been so long]`);
        block.setPermutation(update);
        return;
      }
      if (block.permutation.getState("fbd:music") === 2) {
        player.runCommandAsync('stopsound @a[r=15] fb5');
        player.runCommandAsync('music play fb3 0.5 1 loop');
        player.runCommandAsync('title @s actionbar §7The speaker is playing... §l§f[Showtime]');
        block.setPermutation(update);
        return;
      }
      if (block.permutation.getState("fbd:music") === 3) {
        player.runCommandAsync('stopsound @a[r=15] fb5');
        player.runCommandAsync('music play fb4 0.5 1 loop');
        player.runCommandAsync('title @s actionbar §7The speaker is playing... §l§f[Music Box 1]');
        block.setPermutation(update);
        return;
      }
      if (block.permutation.getState("fbd:music") === 4) {
        player.runCommandAsync('stopsound @a[r=15] fb5');
        player.runCommandAsync('music play fb5 0.5 1 loop');
        player.runCommandAsync('title @s actionbar §7The speaker is playing... §l§f[Music Box 2]');
        block.setPermutation(update);
        return;
      }
      if (block.permutation.getState("fbd:music") === 5) {
        player.runCommandAsync('stopsound @a[r=15] fb5');
        player.runCommandAsync('music play fb6 0.5 1 loop');
        player.runCommandAsync('title @s actionbar §7The speaker is playing... §l§f[Birthday]');
        block.setPermutation(update);
        return;
      }
      if (block.permutation.getState("fbd:music") === 6) {
        player.runCommandAsync('stopsound @a[r=15] fb5');
        player.runCommandAsync('music play fb7 0.5 1 loop');
        player.runCommandAsync('title @s actionbar §7The speaker is playing... §l§f[Stage Performance]');
        block.setPermutation(update);
        return;
      }
      if (block.permutation.getState("fbd:music") === 7) {
        player.runCommandAsync('stopsound @a[r=15] fb5');
        player.runCommandAsync('music play fb8 0.5 1 loop');
        player.runCommandAsync('title @s actionbar §7The speaker is playing... §l§f[I cant fix you]');
        block.setPermutation(update);

        return;
      }
      if (block.permutation.getState("fbd:music") === 8) {
        player.runCommandAsync('stopsound @a[r=15] fb5');
        player.runCommandAsync('music play fb9 0.5 1 loop');
        player.runCommandAsync('title @s actionbar §7The speaker is playing... §l§f[Never be alone]');
        block.setPermutation(update);
        return;
      }
      if (block.permutation.getState("fbd:music") === 9) {
        player.runCommandAsync('stopsound @a[r=15] fb5');
        player.runCommandAsync('music play fb10 0.5 1 loop');
        player.runCommandAsync('title @s actionbar §7The speaker is playing... §l§f[Bad Ending FNAF 3]');
        block.setPermutation(update);
        return;
      }
      if (block.permutation.getState("fbd:music") === 10) {
        player.runCommandAsync('stopsound @a[r=15] fb5');
        player.runCommandAsync('music play fb11 0.5 1 loop');
        player.runCommandAsync('title @s actionbar §7The speaker is playing... §l§f[Creepin Towards The Door]');
        block.setPermutation(update);
        return;
      }
      if (block.permutation.getState("fbd:music") === 11) {
        player.runCommandAsync('stopsound @a[r=15] fb5');
        player.runCommandAsync('music play fb12 0.5 1 loop');
        player.runCommandAsync('title @s actionbar §7The speaker is playing... §l§f[Showcase Instrumental]');
        block.setPermutation(update);
        return;
      }
      if (block.permutation.getState("fbd:music") === 12) {
        player.runCommandAsync('stopsound @a[r=15] fb5');
        player.runCommandAsync('music play fb13 0.5 1 loop');
        player.runCommandAsync('title @s actionbar §7The speaker is playing... §l§f[Forgotten Notes]');
        block.setPermutation(update);
        return;
      }
      if (block.permutation.getState("fbd:music") === 13) {
        player.playSound("random.click");
        player.runCommandAsync('playsound random.fizz @a[r=15] ~~~ 40');
        player.runCommandAsync('music stop 1');
        block.dimension.spawnParticle("fd:stage_notes_deny", {
          x: block.location.x + 0.5,
          y: block.location.y + 0.5,
          z: block.location.z + 0.5
        });
        player.runCommandAsync('title @s actionbar §7The speakers were turned... §l§c[OFF]');
        block.setPermutation(update);
        return;
      }
    },
    onPlayerDestroy: e => {
      const {
        player,
        block
      } = e;
      const {
        x,
        y,
        z
      } = block.location;
      player.runCommandAsync('music stop 1');
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
      const {
        player,
        block
      } = e;
      const {
        x,
        y,
        z
      } = block.location;
      const soda_get = new ItemStack("fb:soda_item");
      const blue_soda_get = new ItemStack("fb:blue_soda_item");
      const butter_soda_get = new ItemStack("fd:butter_soda_item");
      const foxys_fruity_cove_coole_hw_get = new ItemStack("fd:foxys_fruity_cove_coole_hw_item");
      const exotic_beverage_soda_get = new ItemStack("fd:exotic_beverage_item");
      if (!player.isSneaking && block.hasTag('red_soda')) {
        player.playSound("break.big_dripleaf");
        block.dimension.spawnItem(soda_get, {
          x: block.location.x + 0.5,
          y: block.location.y + 1,
          z: block.location.z + 0.5
        });
        block.dimension.runCommandAsync(`setblock ${x} ${y} ${z} air[]`);
        block.dimension.spawnParticle("foxes:texture", {
          x: block.location.x + 0.5,
          y: block.location.y + 0.5,
          z: block.location.z + 0.5
        })
        return;
      }
      if (!player.isSneaking && block.hasTag('blue_soda')) {
        player.playSound("break.big_dripleaf");
        block.dimension.spawnItem(blue_soda_get, { x: block.location.x + 0.5, y: block.location.y + 1, z: block.location.z + 0.5 });
        block.dimension.runCommandAsync(`setblock ${x} ${y} ${z} air[]`);
        block.dimension.spawnParticle("foxes:texture", {
          x: block.location.x + 0.5,
          y: block.location.y + 0.5,
          z: block.location.z + 0.5
        })
        return;
      }
      if (!player.isSneaking && block.hasTag('butter_soda')) {
        player.playSound("break.big_dripleaf");
        block.dimension.spawnItem(butter_soda_get, {
          x: block.location.x + 0.5,
          y: block.location.y + 1,
          z: block.location.z + 0.5
        });
        block.dimension.runCommandAsync(`setblock ${x} ${y} ${z} air[]`);
        block.dimension.spawnParticle("foxes:texture", {
          x: block.location.x + 0.5,
          y: block.location.y + 0.5,
          z: block.location.z + 0.5
        })
        return;
      }
      if (!player.isSneaking && block.hasTag('foxys_fruity_cove_coole_hw')) {
        player.playSound("break.big_dripleaf");
        block.dimension.spawnItem(foxys_fruity_cove_coole_hw_get, {
          x: block.location.x + 0.5,
          y: block.location.y + 1,
          z: block.location.z + 0.5
        });
        block.dimension.runCommandAsync(`setblock ${x} ${y} ${z} air[]`);
        block.dimension.spawnParticle("foxes:texture", {
          x: block.location.x + 0.5,
          y: block.location.y + 0.5,
          z: block.location.z + 0.5
        })
        return;
      }
      if (!player.isSneaking && block.hasTag('exotic_beverage')) {
        player.playSound("break.big_dripleaf");
        block.dimension.spawnItem(exotic_beverage_soda_get, {
          x: block.location.x + 0.5,
          y: block.location.y + 1,
          z: block.location.z + 0.5
        });
        block.dimension.runCommandAsync(`setblock ${x} ${y} ${z} air[]`);
        block.dimension.spawnParticle("foxes:texture", {
          x: block.location.x + 0.5,
          y: block.location.y + 0.5,
          z: block.location.z + 0.5
        })
        return;
      }

    }
  });
});

world.beforeEvents.worldInitialize.subscribe(initEvent => {
  initEvent.blockComponentRegistry.registerCustomComponent('fbd:pizza_box_cc', {
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
      const updates = e.block.permutation.getState("fb:box")
      block.setPermutation(block.permutation.withState("fb:box", updates + 1));
      const pizza_slice = new ItemStack("fb:pizza_slice_item");
      if (!player.isSneaking && block.permutation.getState("fb:box") === 0) {
        player.playSound("random.pop2");
      }
      if (!player.isSneaking && block.permutation.getState("fb:box") === 1) {
        player.playSound("random.pop2");
        return;
      }
      if (!player.isSneaking && block.permutation.getState("fb:box") === 1) {
        player.playSound("random.pop");
        block.dimension.spawnItem(pizza_slice, {
          x: block.location.x + 0.5,
          y: block.location.y + 1,
          z: block.location.z + 0.5
        });
        return;
      }
      if (!player.isSneaking && block.permutation.getState("fb:box") === 2) {
        player.playSound("random.pop");
        block.dimension.spawnItem(pizza_slice, {
          x: block.location.x + 0.5,
          y: block.location.y + 1,
          z: block.location.z + 0.5
        });
        return;
      }
      if (!player.isSneaking && block.permutation.getState("fb:box") === 3) {
        player.playSound("random.pop");
        block.dimension.spawnItem(pizza_slice, {
          x: block.location.x + 0.5,
          y: block.location.y + 1,
          z: block.location.z + 0.5
        });
        return;
      }
      if (!player.isSneaking && block.permutation.getState("fb:box") === 4) {
        player.playSound("random.pop");
        block.dimension.spawnItem(pizza_slice, {
          x: block.location.x + 0.5,
          y: block.location.y + 1,
          z: block.location.z + 0.5
        });
        return;
      }
      if (!player.isSneaking && block.permutation.getState("fb:box") === 5) {
        player.playSound("random.pop");
        block.dimension.spawnItem(pizza_slice, {
          x: block.location.x + 0.5,
          y: block.location.y + 1,
          z: block.location.z + 0.5
        });
        return;
      }
      if (!player.isSneaking && block.permutation.getState("fb:box") === 6) {
        player.playSound("random.fizz");
        block.dimension.spawnParticle("fb:smoke", {
          x: block.location.x + 0.5,
          y: block.location.y + 0.5,
          z: block.location.z + 0.5
        });
        block.dimension.runCommandAsync(`setblock ${x} ${y} ${z} air[] destroy`);
        return;
      }
    }
  });
});

world.beforeEvents.worldInitialize.subscribe(initEvent => {
  initEvent.blockComponentRegistry.registerCustomComponent('fbd:pizza_box_cc', {
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
      const updates = e.block.permutation.getState("fb:box")
      block.setPermutation(block.permutation.withState("fb:box", updates + 1));
      const pizza_slice = new ItemStack("fb:pizza_slice_item");
      if (!player.isSneaking && block.permutation.getState("fb:box") === 0) {
        player.playSound("random.pop2");
      }
      if (!player.isSneaking && block.permutation.getState("fb:box") === 1) {
        player.playSound("random.pop2");
        return;
      }
      if (!player.isSneaking && block.permutation.getState("fb:box") === 1) {
        player.playSound("random.pop");
        block.dimension.spawnItem(pizza_slice, {
          x: block.location.x + 0.5,
          y: block.location.y + 1,
          z: block.location.z + 0.5
        });
        return;
      }
      if (!player.isSneaking && block.permutation.getState("fb:box") === 2) {
        player.playSound("random.pop");
        block.dimension.spawnItem(pizza_slice, {
          x: block.location.x + 0.5,
          y: block.location.y + 1,
          z: block.location.z + 0.5
        });
        return;
      }
      if (!player.isSneaking && block.permutation.getState("fb:box") === 3) {
        player.playSound("random.pop");
        block.dimension.spawnItem(pizza_slice, {
          x: block.location.x + 0.5,
          y: block.location.y + 1,
          z: block.location.z + 0.5
        });
        return;
      }
      if (!player.isSneaking && block.permutation.getState("fb:box") === 4) {
        player.playSound("random.pop");
        block.dimension.spawnItem(pizza_slice, {
          x: block.location.x + 0.5,
          y: block.location.y + 1,
          z: block.location.z + 0.5
        });
        return;
      }
      if (!player.isSneaking && block.permutation.getState("fb:box") === 5) {
        player.playSound("random.pop");
        block.dimension.spawnItem(pizza_slice, {
          x: block.location.x + 0.5,
          y: block.location.y + 1,
          z: block.location.z + 0.5
        });
        return;
      }
      if (!player.isSneaking && block.permutation.getState("fb:box") === 6) {
        player.playSound("random.fizz");
        block.dimension.spawnParticle("fb:smoke", {
          x: block.location.x + 0.5,
          y: block.location.y + 0.5,
          z: block.location.z + 0.5
        });
        block.dimension.runCommandAsync(`setblock ${x} ${y} ${z} air[] destroy`);
        return;
      }
    }
  });
});

world.beforeEvents.worldInitialize.subscribe(initEvent => {
  initEvent.blockComponentRegistry.registerCustomComponent('fbd:pizza_box_cc_2', {
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
      const updates = e.block.permutation.getState("fb:box")
      block.setPermutation(block.permutation.withState("fb:box", updates + 1));
      const pizza_slice = new ItemStack("fb:pizza_2_slice_item");
      if (!player.isSneaking && block.permutation.getState("fb:box") === 0) {
        player.playSound("random.pop2");
      }
      if (!player.isSneaking && block.permutation.getState("fb:box") === 1) {
        player.playSound("random.pop2");
        return;
      }
      if (!player.isSneaking && block.permutation.getState("fb:box") === 1) {
        player.playSound("random.pop");
        block.dimension.spawnItem(pizza_slice, {
          x: block.location.x + 0.5,
          y: block.location.y + 1,
          z: block.location.z + 0.5
        });
        return;
      }
      if (!player.isSneaking && block.permutation.getState("fb:box") === 2) {
        player.playSound("random.pop");
        block.dimension.spawnItem(pizza_slice, {
          x: block.location.x + 0.5,
          y: block.location.y + 1,
          z: block.location.z + 0.5
        });
        return;
      }
      if (!player.isSneaking && block.permutation.getState("fb:box") === 3) {
        player.playSound("random.pop");
        block.dimension.spawnItem(pizza_slice, {
          x: block.location.x + 0.5,
          y: block.location.y + 1,
          z: block.location.z + 0.5
        });
        return;
      }
      if (!player.isSneaking && block.permutation.getState("fb:box") === 4) {
        player.playSound("random.pop");
        block.dimension.spawnItem(pizza_slice, {
          x: block.location.x + 0.5,
          y: block.location.y + 1,
          z: block.location.z + 0.5
        });
        return;
      }
      if (!player.isSneaking && block.permutation.getState("fb:box") === 5) {
        player.playSound("random.pop");
        block.dimension.spawnItem(pizza_slice, {
          x: block.location.x + 0.5,
          y: block.location.y + 1,
          z: block.location.z + 0.5
        });
        return;
      }
      if (!player.isSneaking && block.permutation.getState("fb:box") === 6) {
        player.playSound("random.fizz");
        block.dimension.spawnParticle("fb:smoke", {
          x: block.location.x + 0.5,
          y: block.location.y + 0.5,
          z: block.location.z + 0.5
        });
        block.dimension.runCommandAsync(`setblock ${x} ${y} ${z} air[] destroy`);
        return;
      }
    }
  });
});

world.beforeEvents.worldInitialize.subscribe(initEvent => {
  initEvent.blockComponentRegistry.registerCustomComponent('fbd:pizza_slice_remove', {
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
      const pizza_slice_2 = new ItemStack("fb:pizza_2_slice_item");
      const pizza_slice = new ItemStack("fb:pizza_slice_item");
      if (!player.isSneaking && block.hasTag('pizza_slice_2')) {
        player.playSound("break.big_dripleaf");
        block.dimension.spawnItem(pizza_slice_2, {
          x: block.location.x + 0.5,
          y: block.location.y + 1,
          z: block.location.z + 0.5
        });
        block.dimension.runCommandAsync(`setblock ${x} ${y} ${z} air[]`);
        block.dimension.spawnParticle("foxes:texture", {
          x: block.location.x + 0.5,
          y: block.location.y + 0.5,
          z: block.location.z + 0.5
        })
        return;
      }
      if (!player.isSneaking && block.hasTag('pizza_slice')) {
        player.playSound("break.big_dripleaf");
        block.dimension.spawnItem(pizza_slice, {
          x: block.location.x + 0.5,
          y: block.location.y + 1,
          z: block.location.z + 0.5
        });
        block.dimension.runCommandAsync(`setblock ${x} ${y} ${z} air[]`);
        block.dimension.spawnParticle("foxes:texture", {
          x: block.location.x + 0.5,
          y: block.location.y + 0.5,
          z: block.location.z + 0.5
        })
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

world.beforeEvents.worldInitialize.subscribe(({
  blockComponentRegistry
}) => {
  blockComponentRegistry.registerCustomComponent("fbd:ar_for_ceiling_blocks", {
    beforeOnPlayerPlace(event) {
      const {
        player
      } = event;
      if (!player) return;

      const blockFace = event.permutationToPlace.getState("minecraft:block_face");
      if (blockFace !== "down") return;

      const playerYRotation = player.getRotation().y;
      const rotation = getPreciseRotation(playerYRotation);

      event.permutationToPlace = event.permutationToPlace.withState("fb:rotation", rotation);
    }
  });
});

world.beforeEvents.worldInitialize.subscribe(({
  blockComponentRegistry
}) => {
  blockComponentRegistry.registerCustomComponent("fd:advanced_rotation_v1", {
    beforeOnPlayerPlace(event) {
      const {
        player
      } = event;
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
      const {
        block,
        player
      } = e;
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

world.beforeEvents.worldInitialize.subscribe(({ blockComponentRegistry }) => {
  blockComponentRegistry.registerCustomComponent("fbd:balloons_down", {
    onPlace(event) {
      const { block } = event;
      const { x, y, z } = block.location;

      if (block.dimension.getBlock({ x: x, y: y, z: z }).typeId === "fb:balloons_down" && block.hasTag(`north`)) {
        block.dimension.runCommand(`setblock ${x} ${y + 1} ${z} fb:balloons_up ["minecraft:cardinal_direction"="north"]`);
      }
      if (block.dimension.getBlock({ x: x, y: y, z: z }).typeId === "fb:balloons_down" && block.hasTag(`east`)) {
        block.dimension.runCommand(`setblock ${x} ${y + 1} ${z} fb:balloons_up ["minecraft:cardinal_direction"="east"]`);
      }
      if (block.dimension.getBlock({ x: x, y: y, z: z }).typeId === "fb:balloons_down" && block.hasTag(`south`)) {
        block.dimension.runCommand(`setblock ${x} ${y + 1} ${z} fb:balloons_up ["minecraft:cardinal_direction"="south"]`);
      }
      if (block.dimension.getBlock({ x: x, y: y, z: z }).typeId === "fb:balloons_down" && block.hasTag(`west`)) {
        block.dimension.runCommand(`setblock ${x} ${y + 1} ${z} fb:balloons_up ["minecraft:cardinal_direction"="west"]`);
      }
    }
  })
});

world.beforeEvents.worldInitialize.subscribe(({ blockComponentRegistry }) => {
  blockComponentRegistry.registerCustomComponent("fbd:balloons_up", {
    onPlayerDestroy(event) {
      const { block } = event;
      const { x, y, z } = block.location;
      block.dimension.getBlock({ x: x, y: y - 1, z: z }).setPermutation(BlockPermutation.resolve("minecraft:air"))
    }
  })
});

world.beforeEvents.worldInitialize.subscribe(({ blockComponentRegistry }) => {
  blockComponentRegistry.registerCustomComponent("fbd:balloons_down_destroy", {
    onPlayerDestroy(event) {
      const { block } = event;
      const { x, y, z } = block.location;
      block.dimension.getBlock({ x: x, y: y + 1, z: z }).setPermutation(BlockPermutation.resolve("minecraft:air"))
    }
  })
});

world.beforeEvents.worldInitialize.subscribe(({ blockComponentRegistry }) => {
  blockComponentRegistry.registerCustomComponent("fbd:silver_lamp_up", {
    onPlace(event) {
      const { block } = event;
      const { x, y, z } = block.location;

      if (block.dimension.getBlock({ x: x, y: y, z: z }).typeId === "fb:office_light_up") {
        block.dimension.runCommand(`setblock ${x} ${y - 1} ${z} fb:office_light_down`);
      }
    }
  })
});

world.beforeEvents.worldInitialize.subscribe(({ blockComponentRegistry }) => {
  blockComponentRegistry.registerCustomComponent("fbd:silver_lamp_down", {
    onPlayerDestroy(event) {
      const { block } = event;
      const { x, y, z } = block.location;
      block.dimension.getBlock({ x: x, y: y + 1, z: z }).setPermutation(BlockPermutation.resolve("minecraft:air"))
    }
  })
});

world.beforeEvents.worldInitialize.subscribe(({ blockComponentRegistry }) => {
  blockComponentRegistry.registerCustomComponent("fbd:silver_lamp_destroy", {
    onPlayerDestroy(event) {
      const { block } = event;
      const { x, y, z } = block.location;
      block.dimension.getBlock({ x: x, y: y - 1, z: z }).setPermutation(BlockPermutation.resolve("minecraft:air"))
    }
  })
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