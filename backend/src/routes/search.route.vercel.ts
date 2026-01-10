import express from "express";
import { searchiTunes } from "../services/itunes.service";
import { kv } from "@vercel/kv";

const router = express.Router();

async function saveTerm(term: string) {
  try {
    // history
    const history = (await kv.get<string[]>("search_history")) || [];

    // Remove term
    const filtered = history.filter((t) => t !== term);

    // Add to front
    const updated = [term, ...filtered].slice(0, 5);

    // Save back
    await kv.set("search_history", updated);
  } catch (error) {
    console.error("Failed to save search term:", error);
  }
}

async function savePodcast(podcast: any) {
  try {
    await kv.set(`podcast:${podcast.id}`, podcast);
  } catch (error) {
    console.error("Failed to save podcast:", error);
  }
}

router.get("/", async (req: any, res: any) => {
  const term = req.query.term as string;
  const type = (req.query.type as "overview" | "episode") || "overview";

  if (!term) return res.status(400).json({ error: "Missing search term" });

  try {
    await saveTerm(term);

    const podcasts = await searchiTunes(term, type);

    // Save podcasts to KV
    for (const podcast of podcasts) {
      await savePodcast(podcast);
    }

    return res.json({ results: podcasts });
  } catch (error) {
    console.error("Search failed:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/history", async (_req, res) => {
  try {
    const history = (await kv.get<string[]>("search_history")) || [];
    res.json(history);
  } catch (error) {
    console.error("Failed to get history:", error);
    res.json([]);
  }
});

export default router;
