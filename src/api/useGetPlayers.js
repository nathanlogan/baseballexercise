import { useQuery } from "@tanstack/react-query";
import axios from "axios";

import { useGetToken } from "./useGetToken";
const ENDPOINT = "https://project.trumedianetworks.com/api/mlb/players";

export function useGetPlayers() {
  const { data, isLoading, isError } = useGetToken()

  return useQuery({
    queryKey: [ENDPOINT],
    queryFn: () => axios.get(ENDPOINT, { headers: { tempToken: data } })
      .then((res) => res.data.sort((a, b) => {
        return (a.playerFullName.toUpperCase() < b.playerFullName.toUpperCase()) ? -1 : 1
      })),
    enabled: !!data && !isLoading && !isError
  });
}
