import { EquipmentSlot } from "@minecraft/server"

export function getHeldItem(origin) {
    const item = origin
        .getComponent("minecraft:equippable")
        .getEquipment(EquipmentSlot.Mainhand)
    const defaultValue = "mainhand"

    if (item == undefined) return defaultValue
    else return item.typeId
}