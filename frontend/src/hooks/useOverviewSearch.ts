import { fetchOverview } from "@/services/searchService";
import { useQuery } from "@tanstack/react-query";

export function useOverviewSearch(term: string) {
  return useQuery({
    queryKey: ["overview", term],
    queryFn: () => fetchOverview(term),
    enabled: !!term,
  });
}
