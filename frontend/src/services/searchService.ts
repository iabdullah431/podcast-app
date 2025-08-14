import { getEpisodes, getHistory, getOverview } from "@/api/podcastService";

export async function fetchOverview(term: string) {
  return await getOverview(term);
}

export async function fetchEpisodes(term: string) {
  return await getEpisodes(term);
}

export async function fetchHistory() {
  return await getHistory();
}
