import axios from "axios";
import { deriveAggregateStats } from "./deriveStats";

export function getPlayerInfo(playerId) {
  const ENDPOINT = "https://project.trumedianetworks.com/api/mlb/player/" + playerId;

  return axios
    .get(ENDPOINT, { headers: { tempToken: window.TOKEN } })
    .then((res) => {
      return deriveAggregateStats(res.data)
    })
}
