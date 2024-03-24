import { useQuery } from "@tanstack/react-query";
import axios from "axios";

import KEY from './KEY'

const ENDPOINT = "https://project.trumedianetworks.com/api/token";

export function useGetToken() {
  return useQuery({
    staleTime: 24 * 60 * 60 * 1000, // 24 hours in milliseconds
    queryKey: [ENDPOINT],
    queryFn: () =>
      axios
        .get(ENDPOINT, { headers: { apiKey: KEY } })
        .then((res) => {
          // TODO: clean up this temp hack!
          window.TOKEN = res.data.token
          return res.data.token
        })
  });
}
