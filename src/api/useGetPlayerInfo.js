import { useQuery } from "@tanstack/react-query";
import axios from "axios";

import { useGetToken } from "./useGetToken";

export function useGetPlayerInfo(playerId) {
  const { data, isLoading, isError } = useGetToken()

  const ENDPOINT = "https://project.trumedianetworks.com/api/mlb/player/" + playerId;

  return useQuery({
    queryKey: [ENDPOINT],
    queryFn: () => axios.get(ENDPOINT, { headers: { tempToken: data } }).then((res) => res.data),
    enabled: !!data && !isLoading && !isError
  });
}
