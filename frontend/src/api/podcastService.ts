import apiPodcast from "@/config/env";

export async function getOverview(term: string) {
  const { data } = await apiPodcast.get("/api/search", {
    params: { term, type: "overview" },
  });
  return data.results || [];
}

export async function getEpisodes(term: string) {
  const { data } = await apiPodcast.get("/api/search", {
    params: { term, type: "episode" },
  });
  return data.results || [];
}

export async function getHistory() {
  const { data } = await apiPodcast.get("/api/search/history");
  return Array.isArray(data) ? data : [];
}
