import { world, ItemStack } from "@minecraft/server";
import FaceSelectionPlains from "../utils/face_selection_plains"; // Import the FaceSelectionPlains class to use it

// Slot bounds
const slots = new FaceSelectionPlains(
  { origin: [0, 0], size: [6, 8] }
);

const isFrontFace = (block, face) => block.permutation.getState("minecraft:cardinal_direction") === face.toLowerCase();

// Cancel the use if a slot was not selected, is occupied, or if not interacting with paper
world.beforeEvents.itemUseOn.subscribe((e) => {
  if (e.block.typeId !== "fb:poster_1" || !isFrontFace(e.block, e.blockFace) || (e.source.isSneaking)) return;
});


// ------------------------------
//    Insert paper on interact
// ------------------------------
world.afterEvents.playerInteractWithBlock.subscribe((e) => {

  e.source.runCommand(`playsound insert.chiseled_bookshelf @a`);
});