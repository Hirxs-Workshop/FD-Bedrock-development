tag @s add selected
execute @s ~ ~ ~ execute @p[rym=-45,ry=45] ~~~ execute @e[r=3,c=1,tag=selected] ~ ~ ~ tp @s ~ ~ ~0.5
execute @s ~ ~ ~ execute @p[rym=45,ry=135] ~~~ execute @e[r=3,c=1,tag=selected] ~ ~ ~ tp @s ~-0.5 ~ ~
execute @s ~ ~ ~ execute @p[rym=135,ry=180] ~~~ execute @e[r=3,c=1,tag=selected] ~ ~ ~ tp @s ~ ~ ~-0.5
execute @s ~ ~ ~ execute @p[rym=-180,ry=-135] ~~~ execute @e[r=3,c=1,tag=selected] ~ ~ ~ tp @s ~ ~ ~-0.5
execute @s ~ ~ ~ execute @p[rym=-135,ry=-45] ~~~ execute @e[r=3,c=1,tag=selected] ~ ~ ~ tp @s ~0.5 ~ ~
tag @s remove selected