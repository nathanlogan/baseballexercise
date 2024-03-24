import { useState } from 'react'
import styles from './Chart.module.css'

import { STATS_LABELED, DERIVED_STATS_LABELED } from '../../utils/constants'

import { LineChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Line, ResponsiveContainer } from 'recharts'
import { getPlayerColorByPlayerId } from '../../utils/getPlayerColorByPlayerId'
import { preparePlayerDataForRecharts } from '../../utils/preparePlayerDataForRecharts'

// TODO: optimize processed player data calculations through memoization or shared state or ?
export function Chart({players, playersData, isRollingAvg}) {
  const [selectedStat, setSelectedStat] = useState('OPS')

  const playersAsArray = playersData && Object.entries(playersData).map(([key, value]) => (value))
  const chartData = playersAsArray && preparePlayerDataForRecharts(playersAsArray, isRollingAvg ? `ROLLING_${selectedStat}` : selectedStat)

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
