import { world, ItemStack } from "@minecraft/server";
import SelectionBoxes from "../utils/selection_boxes"; // Import the SelectionBoxes class to use it

// Support orientation along both horizontal axes
const pots = {
  x: new SelectionBoxes({ origin: [-8, 0, -8], size: [16, 16, 0] }, { origin: [-8, 0, -8], size: [0, 16, 16] }, { origin: [-8, 0, 8], size: [16, 16, 0] }, { origin: [8, 0, -8], size: [0, 16, 16] }),
  z: new SelectionBoxes({ origin: [-8, 0, -8], size: [16, 16, 0] }),
};

// The state value and sound associated with each plant
const plants = {
  "minecraft:purple_dye": {
    value: "dandelion",
    sound: "block.lantern.break",
  },
  "minecraft:black_dye": {
    value: "cactus",
    sound: "block.lantern.break",
  },
};

// Get the selected pot for the appropriate axis
const getSelectedPot = (e) => pots[e.block.permutation.getState("wiki:axis")].getSelected(e.faceLocation);

const isPotOccupied = (block, pot) => block.permutation.getState(`wiki:pot_${pot}_plant`) !== "none";

const setPotPlant = (block, pot, plant) => block.setPermutation(block.permutation.withState(`wiki:pot_${pot}_plant`, plant));

// Our flower pots even have sound effects!
const playPlantSound = (dimension, location, sound) => dimension.runCommand(`playsound ${sound} @a ${location.x} ${location.y} ${location.z} 0.5`);

// If a pot is not selected (the inbetween area is targeted) or is already filled, the item use is cancelled.
world.beforeEvents.itemUseOn.subscribe((e) => {
  if (e.block.typeId !== "fb:advanced_wall" || !plants[e.itemStack.typeId]) return;

  const selectedPot = getSelectedPot(e);

  if (selectedPot === undefined || isPotOccupied(e.block, selectedPot)) e.cancel = true;
});

// -------------------------------
//    Plant in the selected pot
// -------------------------------
world.afterEvents.itemUseOn.subscribe((e) => {
  if (e.block.typeId !== "fb:advanced_wall" || !plants[e.itemStack.typeId] || e.source.isSneaking) return;

  const selectedPot = getSelectedPot(e);
  const plant = plants[e.itemStack.typeId];

  setPotPlant(e.block, selectedPot, plant.value);
  playPlantSound(e.block.dimension, e.block.location, plant.sound);
});

// -------------------------------
//  Release plants on destruction
// -------------------------------
function releasePlants(e) {
  const states = (e.brokenBlockPermutation ?? e.explodedBlockPermutation).getAllStates();

  // Array of plant state values e.g. ["cactus", "dandelion"]
  const storedPlants = Object.entries(states)
    .filter(([state, value]) => state.startsWith("wiki:pot") && value !== "none")
    .map(([state, value]) => value);

  if (storedPlants.length === 0) return;

}

world.afterEvents.playerBreakBlock.subscribe((e) => {
  if (e.brokenBlockPermutation.type.id === "wiki:double_flower_pot") releasePlants(e);
});
world.afterEvents.blockExplode.subscribe((e) => {
  if (e.explodedBlockPermutation.type.id === "wiki:double_flower_pot") releasePlants(e);
});
