export class ElectricSystemFBD {
  onPlace(e) {
    const {
      player,
      block
    } = e;
    const {
      x,
      y,
      z
    } = block.location;
    if (block.hasTag('electric_on')) {
      block.dimension.runCommandAsync(`fill ${x + 1} ${y - 1} ${z} ${x - 1} ${y + 1} ${z} fb:electric_wires_on[] replace fb:electric_wires_off`);
      block.dimension.runCommandAsync(`fill ${x} ${y - 1} ${z + 1} ${x} ${y + 1} ${z - 1} fb:electric_wires_on[] replace fb:electric_wires_off`);

      block.dimension.runCommandAsync(`fill ${x + 1} ${y + 1} ${z - 1} ${x - 1} ${y - 1} ${z + 1} fb:lever_wires["minecraft:cardinal_direction"="south"] replace fb:lever_wires_off["minecraft:cardinal_direction"="south"]`);
      block.dimension.runCommandAsync(`fill ${x + 1} ${y + 1} ${z - 1} ${x - 1} ${y - 1} ${z + 1} fb:lever_wires["minecraft:cardinal_direction"="north"] replace fb:lever_wires_off["minecraft:cardinal_direction"="north"]`);
      block.dimension.runCommandAsync(`fill ${x + 1} ${y + 1} ${z - 1} ${x - 1} ${y - 1} ${z + 1} fb:lever_wires["minecraft:cardinal_direction"="east"] replace fb:lever_wires_off["minecraft:cardinal_direction"="east"]`);
      block.dimension.runCommandAsync(`fill ${x + 1} ${y + 1} ${z - 1} ${x - 1} ${y - 1} ${z + 1} fb:lever_wires["minecraft:cardinal_direction"="west"] replace fb:lever_wires_off["minecraft:cardinal_direction"="west"]`);

      block.dimension.runCommandAsync(`fill ${x + 1} ${y + 1} ${z - 1} ${x - 1} ${y - 1} ${z + 1} fb:electric_block_on[] replace fb:electric_block_off`);

      block.dimension.runCommandAsync(`fill ${x} ${y - 1} ${z} ${x} ${y - 2} ${z} fb:ceiling_large_light["minecraft:cardinal_direction"="south"] replace fb:ceiling_large_light_off["minecraft:cardinal_direction"="south"]`);
      block.dimension.runCommandAsync(`fill ${x} ${y - 1} ${z} ${x} ${y - 2} ${z} fb:ceiling_large_light["minecraft:cardinal_direction"="north"] replace fb:ceiling_large_light_off["minecraft:cardinal_direction"="north"]`);
      block.dimension.runCommandAsync(`fill ${x} ${y - 1} ${z} ${x} ${y - 2} ${z} fb:ceiling_large_light["minecraft:cardinal_direction"="west"] replace fb:ceiling_large_light_off["minecraft:cardinal_direction"="west"]`);
      block.dimension.runCommandAsync(`fill ${x} ${y - 1} ${z} ${x} ${y - 2} ${z} fb:ceiling_large_light["minecraft:cardinal_direction"="east"] replace fb:ceiling_large_light_off["minecraft:cardinal_direction"="east"]`);
      block.dimension.runCommandAsync(`fill ${x} ${y} ${z} ${x} ${y - 2} ${z} fb:light_2["p:is_lit"=1] replace fb:light_2["p:is_lit"=0]`);
      block.dimension.runCommandAsync(`fill ${x} ${y} ${z} ${x} ${y - 2} ${z} fb:roof_light_on [] replace fb:roof_light_off`);
      block.dimension.runCommandAsync(`fill ${x} ${y} ${z} ${x} ${y - 2} ${z} fb:roof_light_on [] replace fb:roof_light_off`);
      block.dimension.runCommandAsync(`fill ${x} ${y} ${z} ${x} ${y - 2} ${z} fb:light_on [] replace fb:light_off`);

    }
    if (block.hasTag('electric_off')) {
      block.dimension.runCommandAsync(`fill ${x + 1} ${y - 1} ${z} ${x - 1} ${y + 1} ${z} fb:electric_wires_off[] replace fb:electric_wires_on`);
      block.dimension.runCommandAsync(`fill ${x} ${y - 1} ${z + 1} ${x} ${y + 1} ${z - 1} fb:electric_wires_off[] replace fb:electric_wires_on`);

      block.dimension.runCommandAsync(`fill ${x + 1} ${y + 1} ${z - 1} ${x - 1} ${y - 1} ${z + 1} fb:electric_block_off[] replace fb:electric_block_on`);

      block.dimension.runCommandAsync(`fill ${x + 1} ${y + 1} ${z - 1} ${x - 1} ${y - 1} ${z + 1} fb:lever_wires_off["minecraft:cardinal_direction"="south"] replace fb:lever_wires["minecraft:cardinal_direction"="south"]`);
      block.dimension.runCommandAsync(`fill ${x + 1} ${y + 1} ${z - 1} ${x - 1} ${y - 1} ${z + 1} fb:lever_wires_off["minecraft:cardinal_direction"="north"] replace fb:lever_wires["minecraft:cardinal_direction"="north"]`);
      block.dimension.runCommandAsync(`fill ${x + 1} ${y + 1} ${z - 1} ${x - 1} ${y - 1} ${z + 1} fb:lever_wires_off["minecraft:cardinal_direction"="east"] replace fb:lever_wires["minecraft:cardinal_direction"="east"]`);
      block.dimension.runCommandAsync(`fill ${x + 1} ${y + 1} ${z - 1} ${x - 1} ${y - 1} ${z + 1} fb:lever_wires_off["minecraft:cardinal_direction"="west"] replace fb:lever_wires["minecraft:cardinal_direction"="west"]`);

      block.dimension.runCommandAsync(`fill ${x} ${y - 1} ${z} ${x} ${y - 2} ${z} fb:ceiling_large_light_off["minecraft:cardinal_direction"="south"] replace fb:ceiling_large_light["minecraft:cardinal_direction"="south"]`);
      block.dimension.runCommandAsync(`fill ${x} ${y - 1} ${z} ${x} ${y - 2} ${z} fb:ceiling_large_light_off["minecraft:cardinal_direction"="north"] replace fb:ceiling_large_light["minecraft:cardinal_direction"="north"]`);
      block.dimension.runCommandAsync(`fill ${x} ${y - 1} ${z} ${x} ${y - 2} ${z} fb:ceiling_large_light_off["minecraft:cardinal_direction"="west"] replace fb:ceiling_large_light["minecraft:cardinal_direction"="west"]`);
      block.dimension.runCommandAsync(`fill ${x} ${y - 1} ${z} ${x} ${y - 2} ${z} fb:ceiling_large_light_off["minecraft:cardinal_direction"="east"] replace fb:ceiling_large_light["minecraft:cardinal_direction"="east"]`);
      block.dimension.runCommandAsync(`fill ${x} ${y} ${z} ${x} ${y - 2} ${z} fb:light_off [] replace fb:light_on`);

      block.dimension.runCommandAsync(`fill ${x} ${y} ${z} ${x} ${y - 2} ${z} fb:roof_light_off [] replace fb:roof_light_on`);

      block.dimension.runCommandAsync(`fill ${x} ${y} ${z} ${x} ${y - 2} ${z} fb:light_2["p:is_lit"=0] replace fb:light_2["p:is_lit"=1]`);

    }
  }
  onPlayerInteract(e) {
    const {
      block,
      player
    } = e;
    const {
      x,
      y,
      z
    } = block.location;
    if (block.permutation.getState("fb:block_status") === 1) {
      block.dimension.runCommandAsync(`fill ${x} ${y + 1} ${z} ${x} ${y - 1} ${z} fb:lever_wires_off["minecraft:cardinal_direction"="south"] replace fb:lever_wires["minecraft:cardinal_direction"="south"]`);
      block.dimension.runCommandAsync(`fill ${x} ${y + 1} ${z} ${x} ${y - 1} ${z} fb:lever_wires_off["minecraft:cardinal_direction"="north"] replace fb:lever_wires["minecraft:cardinal_direction"="north"]`);
      block.dimension.runCommandAsync(`fill ${x} ${y + 1} ${z} ${x} ${y - 1} ${z} fb:lever_wires_off["minecraft:cardinal_direction"="east"] replace fb:lever_wires["minecraft:cardinal_direction"="east"]`);
      block.dimension.runCommandAsync(`fill ${x} ${y + 1} ${z} ${x} ${y - 1} ${z} fb:lever_wires_off["minecraft:cardinal_direction"="west"] replace fb:lever_wires["minecraft:cardinal_direction"="west"]`);
      player.runCommandAsync('title @s actionbar §2WARNING! §cWait for all the lights/wires to turn (off) correctly');
      block.dimension.runCommandAsync(`fill ${x + 1} ${y + 1} ${z - 1} ${x - 1} ${y - 1} ${z + 1} fb:electric_block_off[] replace fb:electric_block_on`);

      return;
    }
    if (block.permutation.getState("fb:block_status") === 2) {
      block.dimension.runCommandAsync(`fill ${x} ${y + 1} ${z} ${x} ${y - 2} ${z} fb:lever_wires["minecraft:cardinal_direction"="south"] replace fb:lever_wires_off["minecraft:cardinal_direction"="south"]`);
      block.dimension.runCommandAsync(`fill ${x} ${y + 1} ${z} ${x} ${y - 2} ${z} fb:lever_wires["minecraft:cardinal_direction"="north"] replace fb:lever_wires_off["minecraft:cardinal_direction"="north"]`);
      block.dimension.runCommandAsync(`fill ${x} ${y + 1} ${z} ${x} ${y - 2} ${z} fb:lever_wires["minecraft:cardinal_direction"="east"] replace fb:lever_wires_off["minecraft:cardinal_direction"="east"]`);
      block.dimension.runCommandAsync(`fill ${x} ${y + 1} ${z} ${x} ${y - 2} ${z} fb:lever_wires["minecraft:cardinal_direction"="west"] replace fb:lever_wires_off["minecraft:cardinal_direction"="west"]`);
      player.runCommandAsync('title @s actionbar §2WARNING! §cWait for all the lights/wires to turn (on) correctly');
      block.dimension.runCommandAsync(`fill ${x + 1} ${y + 1} ${z - 1} ${x - 1} ${y - 1} ${z + 1} fb:electric_block_on[] replace fb:electric_block_off`);
      return;
    }
  }
}