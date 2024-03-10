scoreboard objectives add join dummy 
scoreboard players set @a[tag=!join] join 100
tag @a add join
scoreboard players add @a[scores={join=!0}] join -1
execute as @a[scores={join=1}] run function join_book
execute as @a[scores={join=1}] run tellraw @s {"rawtext":[{"text":  "         §9§l¡FNAF's §cDecor§cations §g(BE§eTA)!§r\n         §6- Created By Hirxs#0002 §r\n§b         @Hirxs_MC in Twitter!§r\n\n§6  - Animations By: HyruleanBear#1747 §r\n§d         @HyruleanBear in Twitter!§r\n\n §l§e       Thanks for downloading §f§r\n\n         §9- Discord: \n§f          §7https://discord.gg/zRYvw9Ft8e§r"}]}

replaceitem entity @e[hasitem={location=slot.armor.head,item=fb:faztab_effect_item,quantity=1}] slot.armor.head 1 air

execute as @e[type=player,hasitem={location=slot.armor.head,item=fb:freddy_suit,quantity=1}] run effect @s slowness 1 1 true
execute as @e[type=player,hasitem={location=slot.armor.head,item=fb:freddy_suit,quantity=1}] run effect @s night_vision 1 1 true
execute as @e[type=player,hasitem={location=slot.armor.head,item=fb:freddy_suit,quantity=1}] run effect @s invisibility 1 1 true
execute as @e[type=player,hasitem={location=slot.armor.head,item=fb:bonnie_suit,quantity=1}] run effect @s slowness 1 2 true
execute as @e[type=player,hasitem={location=slot.armor.head,item=fb:bonnie_suit,quantity=1}] run effect @s night_vision 10 1 true
execute as @e[type=player,hasitem={location=slot.armor.head,item=fb:bonnie_suit,quantity=1}] run effect @s invisibility 1 1 true
execute as @e[type=player,hasitem={location=slot.armor.head,item=fb:chica_suit,quantity=1}] run effect @s slowness 1 1 true
execute as @e[type=player,hasitem={location=slot.armor.head,item=fb:chica_suit,quantity=1}] run effect @s night_vision 1 1 true
execute as @e[type=player,hasitem={location=slot.armor.head,item=fb:chica_suit,quantity=1}] run effect @s invisibility 1 1 true
execute as @e[type=player,hasitem={location=slot.armor.head,item=fb:foxy_suit,quantity=1}] run effect @s slowness 1 1 true
execute as @e[type=player,hasitem={location=slot.armor.head,item=fb:foxy_suit,quantity=1}] run effect @s night_vision 1 1 true
execute as @e[type=player,hasitem={location=slot.armor.head,item=fb:foxy_suit,quantity=1}] run effect @s invisibility 1 1 true
execute as @e[type=player,hasitem={location=slot.armor.head,item=fb:fixed_foxy_suit,quantity=1}] run effect @s slowness 1 1 true
execute as @e[type=player,hasitem={location=slot.armor.head,item=fb:fixed_foxy_suit,quantity=1}] run effect @s night_vision 1 1 true
execute as @e[type=player,hasitem={location=slot.armor.head,item=fb:fixed_foxy_suit,quantity=1}] run effect @s invisibility 1 1 true
execute as @e[type=player,hasitem={location=slot.armor.head,item=fb:endo_suit,quantity=1}] run effect @s slowness 1 1 true
execute as @e[type=player,hasitem={location=slot.armor.head,item=fb:endo_suit,quantity=1}] run effect @s night_vision 1 1 true
execute as @e[type=player,hasitem={location=slot.armor.head,item=fb:endo_suit,quantity=1}] run effect @s invisibility 1 1 true
execute as @e[type=player,hasitem={location=slot.armor.head,item=fb:golden_freddy_suit,quantity=1}] run effect @s slowness 1 1 true
execute as @e[type=player,hasitem={location=slot.armor.head,item=fb:golden_freddy_suit,quantity=1}] run effect @s night_vision 1 1 true
execute as @e[type=player,hasitem={location=slot.armor.head,item=fb:golden_freddy_suit,quantity=1}] run effect @s invisibility 1 1 true
execute as @e[type=player,hasitem={location=slot.armor.head,item=fb:fredbear_suit,quantity=1}] run effect @s slowness 1 1 true
execute as @e[type=player,hasitem={location=slot.armor.head,item=fb:fredbear_suit,quantity=1}] run effect @s night_vision 1 1 true
execute as @e[type=player,hasitem={location=slot.armor.head,item=fb:fredbear_suit,quantity=1}] run effect @s invisibility 1 1 true
execute as @e[type=player,hasitem={location=slot.armor.head,item=fb:springbonnie_suit,quantity=1}] run effect @s slowness 1 1 true
execute as @e[type=player,hasitem={location=slot.armor.head,item=fb:springbonnie_suit,quantity=1}] run effect @s night_vision 1 1 true
execute as @e[type=player,hasitem={location=slot.armor.head,item=fb:springbonnie_suit,quantity=1}] run effect @s invisibility 1 1 true
execute as @e[type=player,hasitem={location=slot.armor.head,item=fb:bloody_fredbear_suit,quantity=1}] run effect @s slowness 1 1 true
execute as @e[type=player,hasitem={location=slot.armor.head,item=fb:bloody_fredbear_suit,quantity=1}] run effect @s night_vision 1 1 true
execute as @e[type=player,hasitem={location=slot.armor.head,item=fb:bloody_fredbear_suit,quantity=1}] run effect @s invisibility 1 1 true
execute as @e[type=player,hasitem={location=slot.armor.head,item=fb:itp_springbonnie_suit,quantity=1}] run effect @s slowness 1 1 true
execute as @e[type=player,hasitem={location=slot.armor.head,item=fb:itp_springbonnie_suit,quantity=1}] run effect @s night_vision 1 1 true
execute as @e[type=player,hasitem={location=slot.armor.head,item=fb:itp_springbonnie_suit,quantity=1}] run effect @s invisibility 1 1 true
execute as @e[type=player,hasitem={location=slot.armor.head,item=fb:withered_freddy_suit,quantity=1}] run effect @s slowness 1 1 true
execute as @e[type=player,hasitem={location=slot.armor.head,item=fb:withered_freddy_suit,quantity=1}] run effect @s night_vision 1 1 true
execute as @e[type=player,hasitem={location=slot.armor.head,item=fb:withered_freddy_suit,quantity=1}] run effect @s invisibility 1 1 true
execute as @e[type=player,hasitem={location=slot.armor.head,item=fb:withered_bonnie_suit,quantity=1}] run effect @s slowness 1 2 true
execute as @e[type=player,hasitem={location=slot.armor.head,item=fb:withered_bonnie_suit,quantity=1}] run effect @s night_vision 10 1 true
execute as @e[type=player,hasitem={location=slot.armor.head,item=fb:withered_bonnie_suit,quantity=1}] run effect @s invisibility 1 1 true
execute as @e[type=player,hasitem={location=slot.armor.head,item=fb:withered_chica_suit,quantity=1}] run effect @s slowness 1 1 true
execute as @e[type=player,hasitem={location=slot.armor.head,item=fb:withered_chica_suit,quantity=1}] run effect @s night_vision 1 1 true
execute as @e[type=player,hasitem={location=slot.armor.head,item=fb:withered_chica_suit,quantity=1}] run effect @s invisibility 1 1 true
execute as @e[type=player,hasitem={location=slot.armor.head,item=fb:withered_foxy_suit,quantity=1}] run effect @s slowness 1 1 true
execute as @e[type=player,hasitem={location=slot.armor.head,item=fb:withered_foxy_suit,quantity=1}] run effect @s night_vision 1 1 true
execute as @e[type=player,hasitem={location=slot.armor.head,item=fb:withered_foxy_suit,quantity=1}] run effect @s invisibility 1 1 true
execute as @e[type=player,hasitem={location=slot.armor.head,item=fb:jr_cat_suit,quantity=1}] run effect @s slowness 1 1 true
execute as @e[type=player,hasitem={location=slot.armor.head,item=fb:jr_cat_suit,quantity=1}] run effect @s night_vision 1 1 true
execute as @e[type=player,hasitem={location=slot.armor.head,item=fb:jr_cat_suit,quantity=1}] run effect @s invisibility 1 1 true
execute as @e[type=player,hasitem={location=slot.armor.head,item=fb:trimer_suit,quantity=1}] run effect @s slowness 1 1 true
execute as @e[type=player,hasitem={location=slot.armor.head,item=fb:trimer_suit,quantity=1}] run effect @s night_vision 1 1 true
execute as @e[type=player,hasitem={location=slot.armor.head,item=fb:trimer_suit,quantity=1}] run effect @s invisibility 1 1 true
execute as @e[type=player,hasitem={location=slot.armor.head,item=fb:cyrus_suit,quantity=1}] run effect @s slowness 1 1 true
execute as @e[type=player,hasitem={location=slot.armor.head,item=fb:cyrus_suit,quantity=1}] run effect @s night_vision 1 1 true
execute as @e[type=player,hasitem={location=slot.armor.head,item=fb:cyrus_suit,quantity=1}] run effect @s invisibility 1 1 true

execute as @e[type=player,hasitem={location=slot.armor.head,item=fb:mask_freddy,quantity=1}] run effect @s slowness 2 1 true

execute as  @e[type=player,hasitem={location=slot.armor.head,item=fb:mask_freddy,quantity=1}] run title @s actionbar "Now you are protected!"

execute as @e[type=player,hasitem={location=slot.weapon.mainhand,item=fb:remover_tool,quantity=1}] run function remover_particles

execute as @e[type=player,hasitem={location=slot.weapon.mainhand,item=fb:rotate,quantity=1}] run function rotate_particles

execute as @a[hasitem={item=fb:flashlight,location=slot.weapon.mainhand}] run function flashlight_light
