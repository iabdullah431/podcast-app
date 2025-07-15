"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.searchiTunes = searchiTunes;
const axios_1 = __importDefault(require("axios"));
async function searchiTunes(term, type = "overview") {
    const url = "https://itunes.apple.com/search";
    const response = await axios_1.default.get(url, {
        params: {
            term,
            type: "podcast",
            limit: 28,
        },
    });
    const results = response.data.results;
    // Filter by type
    const filtered = type === "overview"
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
