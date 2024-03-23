import styles from "./PlayerList.module.css";

export function PlayerList({ loading, error, players = [], selectedPlayerIds, toggleSelect }) {
  if (loading) return <div>Loading players...</div>;
  if (error) return <div>Error encountered while loading players: {error}</div>;

  return (
    <ul className={styles.container}>
      {players?.map((player) => (
        <li key={player.playerId}>
            <label>
                <input
                    type="checkbox"
                    id={player.playerId}
                    value={player.playerFullName}
                    checked={selectedPlayerIds.has(player.playerId)}
                    onChange={() => toggleSelect(player.playerId)}
                />
                {player.playerFullName}
            </label>
        </li>
      ))}
    </ul>
  );
}
