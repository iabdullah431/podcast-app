import express from "express";
import { searchiTunes } from "../services/itunes.service";
import { prisma } from "../prisma/client";

const router = express.Router();

router.get("/", async (req: any, res: any) => {
  const term = req.query.term as string;
  const type = (req.query.type as "overview" | "episode") || "overview";

  if (!term) {
    return res.status(400).json({ error: "Missing search term" });
  }

  try {
    // Store search term in DB
    await prisma.searchHistory.create({ data: { term } });

    // Fetch podcasts from iTunes
    const podcasts = await searchiTunes(term, type);

    // Save to DB (optional)
    for (const podcast of podcasts) {
      await prisma.podcast.upsert({
        where: { id: podcast.id },
        update: {},
        create: {
          id: podcast.id,
          name: podcast.name,
          artist: podcast.artist,
          image: podcast.image,
          link: podcast.link,
          genre: podcast.genre,
        },
      });
    }

    // Return all results (no pagination)
    return res.json({ results: podcasts });
  } catch (error) {
    console.error("Search failed:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
