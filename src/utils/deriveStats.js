import { DERIVED_STATS_LABELED, STATS } from "./constants";

export function deriveAggregateStats(allPlayerGames) {
    allPlayerGames.forEach((game, i) => {
        const clonedGame = structuredClone(game)

        // iterate through each base stat
        STATS.forEach(stat => {
            // sum aggregate of current stat and previous sum stat (& add as "SUM" property)
            game[`AGG_${stat}`] = (i === 0) ? game[stat] : game[stat] + allPlayerGames[i - 1][`AGG_${stat}`]

            // keep rolling aggregate, then when i is over 10, subtract out value of i-10
            game[`ROLLING_AGG_${stat}`] = (i < 10) ? game[`AGG_${stat}`] : game[`AGG_${stat}`] - allPlayerGames[i - 10][`AGG_${stat}`]

            // since our calculations are already mapped to "AGG_" stat, this is a quick hack to let us keep the calculations simple
            clonedGame[`AGG_${stat}`] = game[`ROLLING_AGG_${stat}`]
        })

        // iterate through each calculated stat
        Object.entries(DERIVED_STATS_LABELED).forEach(([abbr, obj]) => {
            game[abbr] = obj.calc(game)

            game[`ROLLING_${abbr}`] = obj.calc(clonedGame)
        })
    })
    
    return allPlayerGames
}