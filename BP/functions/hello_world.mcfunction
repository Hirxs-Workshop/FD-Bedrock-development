scoreboard objectives add join dummy
scoreboard players set @a[tag=!join] join 100
tag @a add join
scoreboard players add @a[scores={join=!0}] join -1
execute @a[scores={join=1}] ~~~ function join_book
execute @a[scores={join=1}] ~~~ tellraw @s {"rawtext":[{"text":  "         §9§l¡FNAF's §cDecor§cations §g(BE§eTA)!§r\n         §6- Created By Hirxs#0002 §r\n§b         @Hirxs_MC in Twitter!§r\n\n§6  - Animations By: HyruleanBear#1747 §r\n§d         @HyruleanBear in Twitter!§r\n\n §l§e       Thanks for downloading §f§r\n\n         §9- Discord: \n§f          §7https://discord.gg/zRYvw9Ft8e§r"}]}

execute @e[type=player,hasitem={location=slot.armor.head,item=fb:freddy_suit,quantity=1}] ~~~ effect @s slowness 1 1 true
execute @e[type=player,hasitem={location=slot.armor.head,item=fb:freddy_suit,quantity=1}] ~~~ effect @s night_vision 1 1 true
execute @e[type=player,hasitem={location=slot.armor.head,item=fb:freddy_suit,quantity=1}] ~~~ effect @s invisibility 1 1 true
execute @e[type=player,hasitem={location=slot.armor.head,item=fb:bonnie_suit,quantity=1}] ~~~ effect @s slowness 1 2 true
execute @e[type=player,hasitem={location=slot.armor.head,item=fb:bonnie_suit,quantity=1}] ~~~ effect @s night_vision 10 1 true
execute @e[type=player,hasitem={location=slot.armor.head,item=fb:bonnie_suit,quantity=1}] ~~~ effect @s invisibility 1 1 true
execute @e[type=player,hasitem={location=slot.armor.head,item=fb:chica_suit,quantity=1}] ~~~ effect @s slowness 1 1 true
execute @e[type=player,hasitem={location=slot.armor.head,item=fb:chica_suit,quantity=1}] ~~~ effect @s night_vision 1 1 true
execute @e[type=player,hasitem={location=slot.armor.head,item=fb:chica_suit,quantity=1}] ~~~ effect @s invisibility 1 1 true
execute @e[type=player,hasitem={location=slot.armor.head,item=fb:foxy_suit,quantity=1}] ~~~ effect @s slowness 1 1 true
execute @e[type=player,hasitem={location=slot.armor.head,item=fb:foxy_suit,quantity=1}] ~~~ effect @s night_vision 1 1 true
execute @e[type=player,hasitem={location=slot.armor.head,item=fb:foxy_suit,quantity=1}] ~~~ effect @s invisibility 1 1 true
execute @e[type=player,hasitem={location=slot.armor.head,item=fb:fixed_foxy_suit,quantity=1}] ~~~ effect @s slowness 1 1 true
execute @e[type=player,hasitem={location=slot.armor.head,item=fb:fixed_foxy_suit,quantity=1}] ~~~ effect @s night_vision 1 1 true
execute @e[type=player,hasitem={location=slot.armor.head,item=fb:fixed_foxy_suit,quantity=1}] ~~~ effect @s invisibility 1 1 true
execute @e[type=player,hasitem={location=slot.armor.head,item=fb:endo_suit,quantity=1}] ~~~ effect @s slowness 1 1 true
execute @e[type=player,hasitem={location=slot.armor.head,item=fb:endo_suit,quantity=1}] ~~~ effect @s night_vision 1 1 true
execute @e[type=player,hasitem={location=slot.armor.head,item=fb:endo_suit,quantity=1}] ~~~ effect @s invisibility 1 1 true
execute @e[type=player,hasitem={location=slot.armor.head,item=fb:golden_freddy_suit,quantity=1}] ~~~ effect @s slowness 1 1 true
execute @e[type=player,hasitem={location=slot.armor.head,item=fb:golden_freddy_suit,quantity=1}] ~~~ effect @s night_vision 1 1 true
execute @e[type=player,hasitem={location=slot.armor.head,item=fb:golden_freddy_suit,quantity=1}] ~~~ effect @s invisibility 1 1 true
execute @e[type=player,hasitem={location=slot.armor.head,item=fb:fredbear_suit,quantity=1}] ~~~ effect @s slowness 1 1 true
execute @e[type=player,hasitem={location=slot.armor.head,item=fb:fredbear_suit,quantity=1}] ~~~ effect @s night_vision 1 1 true
execute @e[type=player,hasitem={location=slot.armor.head,item=fb:fredbear_suit,quantity=1}] ~~~ effect @s invisibility 1 1 true
execute @e[type=player,hasitem={location=slot.armor.head,item=fb:springbonnie_suit,quantity=1}] ~~~ effect @s slowness 1 1 true
execute @e[type=player,hasitem={location=slot.armor.head,item=fb:springbonnie_suit,quantity=1}] ~~~ effect @s night_vision 1 1 true
execute @e[type=player,hasitem={location=slot.armor.head,item=fb:springbonnie_suit,quantity=1}] ~~~ effect @s invisibility 1 1 true
execute @e[type=player,hasitem={location=slot.armor.head,item=fb:bloody_fredbear_suit,quantity=1}] ~~~ effect @s slowness 1 1 true
execute @e[type=player,hasitem={location=slot.armor.head,item=fb:bloody_fredbear_suit,quantity=1}] ~~~ effect @s night_vision 1 1 true
execute @e[type=player,hasitem={location=slot.armor.head,item=fb:bloody_fredbear_suit,quantity=1}] ~~~ effect @s invisibility 1 1 true
execute @e[type=player,hasitem={location=slot.armor.head,item=fb:itp_springbonnie_suit,quantity=1}] ~~~ effect @s slowness 1 1 true
execute @e[type=player,hasitem={location=slot.armor.head,item=fb:itp_springbonnie_suit,quantity=1}] ~~~ effect @s night_vision 1 1 true
execute @e[type=player,hasitem={location=slot.armor.head,item=fb:itp_springbonnie_suit,quantity=1}] ~~~ effect @s invisibility 1 1 true
execute @e[type=player,hasitem={location=slot.armor.head,item=fb:withered_freddy_suit,quantity=1}] ~~~ effect @s slowness 1 1 true
execute @e[type=player,hasitem={location=slot.armor.head,item=fb:withered_freddy_suit,quantity=1}] ~~~ effect @s night_vision 1 1 true
execute @e[type=player,hasitem={location=slot.armor.head,item=fb:withered_freddy_suit,quantity=1}] ~~~ effect @s invisibility 1 1 true
execute @e[type=player,hasitem={location=slot.armor.head,item=fb:withered_bonnie_suit,quantity=1}] ~~~ effect @s slowness 1 2 true
execute @e[type=player,hasitem={location=slot.armor.head,item=fb:withered_bonnie_suit,quantity=1}] ~~~ effect @s night_vision 10 1 true
execute @e[type=player,hasitem={location=slot.armor.head,item=fb:withered_bonnie_suit,quantity=1}] ~~~ effect @s invisibility 1 1 true
execute @e[type=player,hasitem={location=slot.armor.head,item=fb:withered_chica_suit,quantity=1}] ~~~ effect @s slowness 1 1 true
execute @e[type=player,hasitem={location=slot.armor.head,item=fb:withered_chica_suit,quantity=1}] ~~~ effect @s night_vision 1 1 true
execute @e[type=player,hasitem={location=slot.armor.head,item=fb:withered_chica_suit,quantity=1}] ~~~ effect @s invisibility 1 1 true
execute @e[type=player,hasitem={location=slot.armor.head,item=fb:withered_foxy_suit,quantity=1}] ~~~ effect @s slowness 1 1 true
execute @e[type=player,hasitem={location=slot.armor.head,item=fb:withered_foxy_suit,quantity=1}] ~~~ effect @s night_vision 1 1 true
execute @e[type=player,hasitem={location=slot.armor.head,item=fb:withered_foxy_suit,quantity=1}] ~~~ effect @s invisibility 1 1 true
execute @e[type=player,hasitem={location=slot.armor.head,item=fb:jr_cat_suit,quantity=1}] ~~~ effect @s slowness 1 1 true
execute @e[type=player,hasitem={location=slot.armor.head,item=fb:jr_cat_suit,quantity=1}] ~~~ effect @s night_vision 1 1 true
execute @e[type=player,hasitem={location=slot.armor.head,item=fb:jr_cat_suit,quantity=1}] ~~~ effect @s invisibility 1 1 true
execute @e[type=player,hasitem={location=slot.armor.head,item=fb:trimer_suit,quantity=1}] ~~~ effect @s slowness 1 1 true
execute @e[type=player,hasitem={location=slot.armor.head,item=fb:trimer_suit,quantity=1}] ~~~ effect @s night_vision 1 1 true
execute @e[type=player,hasitem={location=slot.armor.head,item=fb:trimer_suit,quantity=1}] ~~~ effect @s invisibility 1 1 true
execute @e[type=player,hasitem={location=slot.armor.head,item=fb:cyrus_suit,quantity=1}] ~~~ effect @s slowness 1 1 true
execute @e[type=player,hasitem={location=slot.armor.head,item=fb:cyrus_suit,quantity=1}] ~~~ effect @s night_vision 1 1 true
execute @e[type=player,hasitem={location=slot.armor.head,item=fb:cyrus_suit,quantity=1}] ~~~ effect @s invisibility 1 1 true
