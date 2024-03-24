import { useState } from 'react'
import styles from './Chart.module.css'

import { STATS_LABELED, DERIVED_STATS_LABELED } from '../../utils/constants';

import { LineChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Line, ResponsiveContainer } from 'recharts';
import { getPlayerColorByPlayerId } from '../../utils/getPlayerColorByPlayerId';

const preparePlayerDataForCharting = (players, stat) => {
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



// TODO: optimize processed player data calculations through memoization or shared state or ?
export function Chart({players, playersData, isRollingAvg}) {
  const [selectedStat, setSelectedStat] = useState('OPS')

  const playersAsArray = playersData && Object.entries(playersData).map(([key, value]) => (value))
  const chartData = playersAsArray && preparePlayerDataForCharting(playersAsArray, isRollingAvg ? `ROLLING_${selectedStat}` : selectedStat)

  return (
    <div className={styles.container}>
      <label>
        Select stat:
        <select value={selectedStat} onChange={e => setSelectedStat(e.target.value)}>
          <optgroup label="Tallied Stats">
            {Object.entries(STATS_LABELED).map(([key, val]) => <option key={key} value={`AGG_${key}`}>{key}: {val.label}</option>)}
          </optgroup>
          <optgroup label="Calculated Stats">
            {Object.entries(DERIVED_STATS_LABELED).map(([key, val]) => <option key={key} value={key}>{key}: {val.label}</option>)}
          </optgroup>
        </select>
      </label>

      {chartData && (
        <div style={{ width: '100%', height: '400px' }}>
          <ResponsiveContainer>
            <LineChart width={1400} height={400} data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 10 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              {playersAsArray.map(playerGames => {
                return (
                  <Line
                    key={playerGames[0].playerFullName}
                    type="monotone"
                    dataKey={playerGames[0].playerFullName}
                    stroke={getPlayerColorByPlayerId(players, playerGames[0].playerId)}
                    dot={({isHover}) => (isHover ? <circle cx={props.cx} cy={props.cy} r={4} /> : null)}
                    connectNulls
                  />
                )
              })}
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
}
