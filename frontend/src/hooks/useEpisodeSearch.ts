import { useQuery } from "@tanstack/react-query";
import { fetchEpisodes } from "@/services/searchService";

export function useEpisodeSearch(term: string) {
  return useQuery({
    queryKey: ["episodes", term],
    queryFn: () => fetchEpisodes(term),
    enabled: !!term,
  });
}
