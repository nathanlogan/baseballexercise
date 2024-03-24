import { DERIVED_STATS_LABELED, STATS_LABELED } from "../../utils/constants";
import styles from "./TopPlayers.module.css";

export function TopPlayers({ players = [], label, title, stat }) {
  const playersFinalStats = players.map(playerData => playerData[playerData.length - 1])
  const sortedPlayersByStat = playersFinalStats.sort((a, b) => b[stat] - a[stat])

  return (
    <div className={styles.container}>
        <h3 title={title}>{label}</h3>
        <ol>
            {sortedPlayersByStat.map((player) => (
                <li key={player.playerId}>
                    {player.playerFullName}: <strong>{player[stat]}</strong>
                </li>
            ))}
        </ol>
    </div>
  );
}


        