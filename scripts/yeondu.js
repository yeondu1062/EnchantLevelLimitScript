import { system, world } from "@minecraft/server";
system.events.beforeWatchdogTerminate.subscribe(evd => evd.cancel = true);

const kick_message = '최대 인챈트 레벨 제한에 의해 추방당하셨습니다.'; //추방 메시지

world.events.tick.subscribe(()=>{
    world.getAllPlayers().forEach(player=>{
        try{
            const player_itemData = player.getComponent("minecraft:inventory").container.getItem(Math.floor(Math.random() * 9));
            const player_enchant = [...player_itemData.getComponent("minecraft:enchantments").enchantments];
            player_enchant.forEach(data => {
                if(data.level > data.type.maxLevel) {
                    player.runCommandAsync(`tellraw @s {"rawtext":[{"text":"${player.nameTag}님이 ${kick_message} made by YEONDU"}]}`);
                    player.runCommandAsync(`kick @s ${kick_message + '\nmade by yeondu'}`);
                }
            })
        }catch{}
    })
})
