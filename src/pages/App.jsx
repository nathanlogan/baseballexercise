import { useEffect, useState } from 'react';
import classes from './App.module.css'

import { DERIVED_STATS_LABELED, STATS_LABELED } from '../utils/constants'

import { useGetPlayers } from "../api/useGetPlayers";
import { getPlayerInfo } from '../utils/getPlayerInfo';

import { PlayerList } from '../components/PlayerList';
import { Chart } from '../components/Chart'
import { TopPlayers } from '../components/TopPlayers/TopPlayers';

export default function App() {
  const [selectedPlayerIds, setSelectedPlayerIds] = useState(new Set())
  const [downloadedPlayerData, setDownloadedPlayerData] = useState({})
  const [availablePlayerData, setAvailablePlayerData] = useState([])
  const [topPlayersModules, setTopPlayersModules] = useState(new Set(["AVG", "OBP", "OPS", "ISO"]))
  const [use10Day, setUse10Day] = useState(false)

  const { data, isLoading, error } = useGetPlayers()

  useEffect(() => {
    const selectedAndDownloadedPlayerData = []
    
    // go through selected player IDs & add the ones that have been downloaded
    selectedPlayerIds.forEach(id => {
      downloadedPlayerData[id] && selectedAndDownloadedPlayerData.push(downloadedPlayerData[id])
    })
    
    setAvailablePlayerData(selectedAndDownloadedPlayerData)
  }, [selectedPlayerIds, downloadedPlayerData])

  const togglePlayer = (playerId) => {
    setSelectedPlayerIds(prev => {
      const nextState = new Set(prev)

      if (prev.has(playerId)) nextState.delete(playerId)
      else {
        nextState.add(playerId)

        // go retrieve this player
        if (!downloadedPlayerData[playerId]) {
          getPlayerInfo(playerId)
            .then(data => {
                setDownloadedPlayerData(current => {
                  const nextState = {...current}
                  nextState[playerId] = data
                  return nextState
                })
            })
        }
      }

      return nextState
    })
  }
  
  return (
    <div className={classes.container}>
      <PlayerList
        loading={isLoading}
        error={error?.message}
        players={data}
        selectedPlayerIds={selectedPlayerIds}
        toggleSelect={togglePlayer}
      />

      <section>
        <div className={classes.toggle}>
          <label>
            <input type="checkbox" checked={use10Day} onChange={() => setUse10Day(!use10Day)} />
            Use rolling 10-game data, instead of full-season (reveals shorter-term trends)
          </label>
        </div>

        <h3>Season Graph</h3>
        <Chart players={availablePlayerData} isRollingAvg={use10Day} />

        <h3>Selected Player Rankings {use10Day ? "(over last 10 games)" : ""}</h3>
        {Array.from(topPlayersModules).map(stat => {
          const title = DERIVED_STATS_LABELED[stat]?.label || STATS_LABELED[stat]?.label
          return <TopPlayers key={stat} players={availablePlayerData} label={stat} title={title} stat={use10Day ? `ROLLING_${stat}` : stat} />
        })}
      </section>
    </div>
  )
}
