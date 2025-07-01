import axios from "axios";

export async function searchiTunes(
  term: string,
  type: "overview" | "episode" = "overview"
) {
  const url = "https://itunes.apple.com/search";
  const response = await axios.get(url, {
    params: {
      term,
      type: "podcast",
      limit: 28,
    },
  });

  const results = response.data.results as any[];

  // Filter by type
  const filtered =
    type === "overview"
      ? results.filter((item) => item.kind === "podcast")
      : results.filter((item) => item.kind !== "podcast");

  return filtered.map((item) => ({
    id: item.collectionId || item.trackId,
    name: item.collectionName || item.trackName,
    artist: item.artistName,
    image: item.artworkUrl100,
    link: item.trackViewUrl || item.collectionViewUrl,
    genre: item.primaryGenreName,
  }));
}
