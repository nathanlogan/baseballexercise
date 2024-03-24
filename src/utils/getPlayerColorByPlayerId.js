export function getPlayerColorByPlayerId(players, playerId) {
    for (let i = 0; i < players.length; i++) {
        if (players[i].playerId === playerId) return players[i].color
    }
    return '#000'
}