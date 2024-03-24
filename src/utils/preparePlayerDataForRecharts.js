export const preparePlayerDataForRecharts = (players, stat) => {
    const allDates = players.flatMap(player => player.map(game => game.date))
    const startDate = new Date(Math.min(...allDates.map(date => new Date(date))))
    const endDate = new Date(Math.max(...allDates.map(date => new Date(date))))

    // generate an array of dates that covers the time span of all players
    // - while we won't have data on every day, this will keep our graph to scale
    const dateRange = [];
    for (let date = startDate; date <= endDate; date.setDate(date.getDate() + 1)) {
        dateRange.push(new Date(date))
    }

    // prepare data for Recharts
    return dateRange.map(date => {
        const formattedDate = date.toISOString().split('T')[0]
        const dataPoint = { date: formattedDate }

        players.forEach(player => {
            const game = player.find(game => game.date.split(' ')[0] === formattedDate)
            if (game) dataPoint[game.playerFullName] = game[stat]
        })
        return dataPoint
    })
}
