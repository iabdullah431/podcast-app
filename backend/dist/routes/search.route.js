"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const itunes_service_1 = require("../services/itunes.service");
const client_1 = require("../prisma/client");
const router = express_1.default.Router();
router.get("/", async (req, res) => {
    const term = req.query.term;
    const type = req.query.type || "overview";
    if (!term) {
        return res.status(400).json({ error: "Missing search term" });
    }
    try {
        // Store search term in DB
        await client_1.prisma.searchHistory.create({ data: { term } });
        // Fetch podcasts from iTunes
        const podcasts = await (0, itunes_service_1.searchiTunes)(term, type);
        // Save to DB (optional)
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
        // Return all results (no pagination)
        return res.json({ results: podcasts });
    }
    catch (error) {
        console.error("Search failed:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
});
exports.default = router;
