import { useQuery } from "@tanstack/react-query";
import { fetchHistory } from "@/services/searchService";

export function useSearchHistory() {
  return useQuery({
    queryKey: ["history"],
    queryFn: fetchHistory,
  });
}
