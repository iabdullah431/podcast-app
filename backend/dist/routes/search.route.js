"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const itunes_service_1 = require("../services/itunes.service");
const client_1 = require("../prisma/client");

const router = express_1.default.Router();

// --- Save last 5 unique search terms
async function saveTerm(term) {
  await client_1.prisma.$transaction(async (tx) => {
    const existing = await tx.searchHistory.findFirst({ where: { term } });

    if (existing) {
      // If the term already exists, update its timestamp to move it to the top
      await tx.searchHistory.update({
        where: { id: existing.id },
        data: { createdAt: new Date() },
      });
    } else {
      // Otherwise, create a new entry
      await tx.searchHistory.create({ data: { term } });
    }

    // Keep only the last 5 items
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

// GET /api/search?term=...&type=overview|episode
router.get("/", async (req, res) => {
  const term = req.query.term;
  const type = req.query.type === "episode" ? "episode" : "overview";

  if (!term) {
    return res.status(400).json({ error: "Missing search term" });
  }

  try {
    // Save search term with smart logic
    await saveTerm(term);

    // Call iTunes API
    const podcasts = await (0, itunes_service_1.searchiTunes)(term, type);

    // Upsert results into DB (optional)
    for (const podcast of podcasts) {
      await client_1.prisma.podcast.upsert({
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

// --- GET /api/search/history → Last 5 searches
router.get("/history", async (_req, res) => {
  try {
    const items = await client_1.prisma.searchHistory.findMany({
      orderBy: { createdAt: "desc" },
      take: 5,
    });
    res.json(items.map((i) => i.term));
  } catch (err) {
    console.error("History fetch failed:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

exports.default = router;
