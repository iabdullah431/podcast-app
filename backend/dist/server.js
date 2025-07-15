"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const search_route_1 = __importDefault(require("./routes/search.route"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use("/api/search", search_route_1.default);
app.listen(process.env.PORT || 3001, () => {
    console.log("✅ Backend API running on port " + (process.env.PORT || 3001));
});
