import { env } from "@/config/env";

export async function getOverview(term: string) {
  const res = await fetch(
    `${env.BASE_URL}/api/search?term=${encodeURIComponent(term)}&type=overview`
  );
  if (!res.ok) throw new Error("Failed to fetch overview");
  const data = await res.json();
  return data.results || [];
}

export async function getEpisodes(term: string) {
  const res = await fetch(
    `${env.BASE_URL}/api/search?term=${encodeURIComponent(term)}&type=episode`
  );
  if (!res.ok) throw new Error("Failed to fetch episodes");
  const data = await res.json();
  return data.results || [];
}
