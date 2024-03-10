console.warn("§aFarmer´s Delight Add-on§r: Do you have the §6§lcreator settings§r activated? if you find any error let me know on my discord: §bPupy200mine#5915§r. I spent a long time perfecting the addon :)")

import * as server from "@minecraft/server"

import {
    ActionFormData
} from '@minecraft/server-ui'

import {
    //world,
    system
} from '@minecraft/server'

system.afterEvents.scriptEventReceive.subscribe(result => {
    if (result.id == "fb:firstJoin" && !result.sourceEntity.hasTag("fb")) {
        firstJoin(result.sourceEntity)
    }
    else if (result.id == "fd:security_manual") {
        showBook(result.sourceEntity)
    }
})

/**
* @param {server.Entity} player
*/

function firstJoin(player) {
    const firstJoin = new ActionFormData()
        .title("§2Farmers Delight Bedrock")
        .body({ "rawtext": [{ "translate": "delight.welcome0" }, { "text": "\n" }, { "translate": "delight.welcome1" }, { "text": "\n" }, { "translate": "delight.welcome2" }, { "text": "\n" }, { "translate": "delight.welcome3" }] })
        .button("accessibility.button.close", "textures/ui/exit")


    player.runCommand("gamerule sendcommandfeedback false")
    player.runCommand("gamerule recipesunlock false")
    player.runCommand("give @s fd:security_manual")
    player.addTag("fb")

    firstJoin.show(player).then(response => {

        if (response.canceled) return;

        switch (response.selection) {
            case 0:
                break;
        }
    })
}

function showBook(player) {
    const showBook = new ActionFormData()
        .title("farmersbook.name")
        .body("farmersbook.body")
        .button("farmersbook.howToPlantAddonCrops", "textures/ui/farmland_for_ui")
        .button("farmersbook.howToUseCuttingBoard", "textures/ui/cutting_board_for_ui")
        .button("farmersbook.howToUseCookingPot", "textures/ui/cooking_pot_for_ui")
        .button("farmersbook.howToUseSkillet", "textures/ui/skillet_for_ui")
        .button("farmersbook.howCabinetsWork", "textures/ui/cabinet_for_ui")
        .button("farmersbook.howToUseOrganicCompost", "textures/ui/organic_compost_for_ui")
        .button("farmersbook.howToCreateMushroomColony", "textures/blocks/mushroom_colony/red_mushroom_colony_stage3")
        .button("farmersbook.howTogetHam", "textures/items/ham")
        .button("farmersbook.cabbageandbeetroots", "textures/items/wild_cabbages")
        .button("farmersbook.potatoes", "textures/items/wild_potatoes")
        .button("farmersbook.carrotandonions", "textures/items/wild_carrots")
        .button("farmersbook.tomatoes", "textures/items/wild_tomatoes")
        .button("farmersbook.rice", "textures/items/wild_rice");

    showBook.show(player).then(response => {
        if (response.canceled) return;

        switch (response.selection) {
            case 0:
                howToPlantAddonCrops(player)
                break;
            case 1:
                howToUseCuttingBoard(player)
                break;
            case 2:
                howToUseCookingPot(player)
                break;
            case 3:
                howToUseSkillet(player)
                break;
            case 4:
                howCabinetsWork(player)
                break;
            case 5:
                howToUseOrganicCompost(player)
                break;
            case 6:
                howToCreateMushroomColony(player)
                break;
            case 7:
                howToGetHam(player)
                break;
            case 8:
                cabbageandbeetroots(player)
                break;
            case 9:
                potatoes(player)
                break;
            case 10:
                carrotandonions(player)
                break;
            case 11:
                tomatoes(player)
                break;
            case 12:
                rice(player)
                break;
        }
    })
}

function howToPlantAddonCrops(player) {
    const howToPlantAddonCrops = new ActionFormData()
        .title("farmersbook.howToPlantAddonCrops")
        .body("farmersbook.howToPlantAddonCropsDescription")
        .button("accessibility.button.back", "textures/ui/exit");
    howToPlantAddonCrops.show(player).then(response => {
        if (!response.canceled) {
            if (response.selection == 0) {
                showBook(player)
            }
        }
    })
}

function howToUseCuttingBoard(player) {
    const howToUseCuttingBoard = new ActionFormData()
        .title("farmersbook.howToUseCuttingBoard")
        .body("farmersbook.howToUseCuttingBoardDescription")
        .button("accessibility.button.back", "textures/ui/exit");
    howToUseCuttingBoard.show(player).then(response => {
        if (!response.canceled) {
            if (response.selection == 0) {
                showBook(player)
            }
        }
    })
}

function howToUseCookingPot(player) {
    const howToUseCookingPot = new ActionFormData()
        .title("farmersbook.howToUseCookingPot")
        .body("farmersbook.howToUseCookingPotDescription")
        .button("accessibility.button.back", "textures/ui/exit");
    howToUseCookingPot.show(player).then(response => {
        if (!response.canceled) {
            if (response.selection == 0) {
                showBook(player)
            }
        }
    })
}

function howToUseSkillet(player) {
    const howToUseSkillet = new ActionFormData()
        .title("farmersbook.howToUseSkillet")
        .body("farmersbook.howToUseSkilletDescription")
        .button("accessibility.button.back", "textures/ui/exit");
    howToUseSkillet.show(player).then(response => {
        if (!response.canceled) {
            if (response.selection == 0) {
                showBook(player)
            }
        }
    })
}

function howCabinetsWork(player) {
    const howCabinetsWork = new ActionFormData()
        .title("farmersbook.howCabinetsWork")
        .body("farmersbook.howCabinetsWorkDescription")
        .button("accessibility.button.back", "textures/ui/exit");
    howCabinetsWork.show(player).then(response => {
        if (!response.canceled) {
            if (response.selection == 0) {
                showBook(player)
            }
        }
    })
}

function howToUseOrganicCompost(player) {
    const howToUseOrganicCompost = new ActionFormData()
        .title("farmersbook.howToUseOrganicCompost")
        .body("farmersbook.howToUseOrganicCompostDescription")
        .button("accessibility.button.back", "textures/ui/exit");
    howToUseOrganicCompost.show(player).then(response => {
        if (!response.canceled) {
            if (response.selection == 0) {
                showBook(player)
            }
        }
    })
}

function howToCreateMushroomColony(player) {
    const howToCreateMushroomColony = new ActionFormData()
        .title("farmersbook.howToCreateMushroomColony")
        .body("farmersbook.howToCreateMushroomColonyDescription")
        .button("farmersbook.howToUseOrganicCompost")
        .button("accessibility.button.back", "textures/ui/exit");
    howToCreateMushroomColony.show(player).then(response => {
        if (!response.canceled) {
            if (response.selection == 0) {
                howToUseOrganicCompost(player)
            }
            else if (response.selection == 1) {
                showBook(player)
            }
        }
    })
}

function howToGetHam(player) {
    const howToGetHam = new ActionFormData()
        .title("farmersbook.howToGetHam")
        .body("farmersbook.howToGetHamDescription")
        .button("accessibility.button.back", "textures/ui/exit");
    howToGetHam.show(player).then(response => {
        if (!response.canceled) {
            if (response.selection == 0) {
                showBook(player)
            }
        }
    })
}

function cabbageandbeetroots(player) {
    const cabbageandbeetroots = new ActionFormData()
        .title("farmersbook.cabbageandbeetroots")
        .body("farmersbook.cabbageandbeetrootsDescription")
        .button("accessibility.button.back", "textures/ui/exit");
    cabbageandbeetroots.show(player).then(response => {
        if (!response.canceled) {
            if (response.selection == 0) {
                showBook(player)
            }
        }
    })
}

function potatoes(player) {
    const potatoes = new ActionFormData()
        .title("farmersbook.potatoes")
        .body("farmersbook.potatoesDescription")
        .button("accessibility.button.back", "textures/ui/exit");
    potatoes.show(player).then(response => {
        if (!response.canceled) {
            if (response.selection == 0) {
                showBook(player)
            }
        }
    })
}

function carrotandonions(player) {
    const carrotandonions = new ActionFormData()
        .title("farmersbook.carrotandonions")
        .body("farmersbook.carrotandonionsDescription")
        .button("accessibility.button.back", "textures/ui/exit");
    carrotandonions.show(player).then(response => {
        if (!response.canceled) {
            if (response.selection == 0) {
                showBook(player)
            }
        }
    })
}

function tomatoes(player) {
    const tomatoes = new ActionFormData()
        .title("farmersbook.tomatoes")
        .body("farmersbook.tomatoesDescription")
        .button("accessibility.button.back", "textures/ui/exit");
    tomatoes.show(player).then(response => {
        if (!response.canceled) {
            if (response.selection == 0) {
                showBook(player)
            }
        }
    })
}

function rice(player) {
    const rice = new ActionFormData()
        .title("farmersbook.rice")
        .body("farmersbook.riceDescription")
        .button("accessibility.button.back", "textures/ui/exit");
    rice.show(player).then(response => {
        if (!response.canceled) {
            if (response.selection == 0) {
                showBook(player)
            }
        }
    })
}