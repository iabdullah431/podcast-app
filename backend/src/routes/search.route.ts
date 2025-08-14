import express from "express";
import { searchiTunes } from "../services/itunes.service";
import { prisma } from "../prisma/client";

const router = express.Router();

async function saveTerm(term: string) {
  await prisma.$transaction(async (tx) => {
    const existing = await tx.searchHistory.findFirst({ where: { term } });

    if (existing) {
      await tx.searchHistory.update({
        where: { id: existing.id },
        data: { createdAt: new Date() },
      });
    } else {
      await tx.searchHistory.create({ data: { term } });
    }

    const keep = await tx.searchHistory.findMany({
      orderBy: { createdAt: "desc" },
      take: 5,
      select: { id: true },
    });

    await tx.searchHistory.deleteMany({
      where: { id: { notIn: keep.map((x) => x.id) } },
    });
  });
}

router.get("/", async (req: any, res: any) => {
  const term = req.query.term as string;
  const type = (req.query.type as "overview" | "episode") || "overview";

  if (!term) return res.status(400).json({ error: "Missing search term" });

  try {
    await saveTerm(term);

    const podcasts = await searchiTunes(term, type);
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

    return res.json({ results: podcasts });
  } catch (error) {
    console.error("Search failed:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/history", async (_req, res) => {
  const items = await prisma.searchHistory.findMany({
    orderBy: { createdAt: "desc" },
    take: 5,
  });
  res.json(items.map((i) => i.term));
});

export default router;
