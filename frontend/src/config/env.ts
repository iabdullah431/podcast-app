import axios from "axios";

const apiPodcast = axios.create({
  baseURL:
    process.env.NEXT_PUBLIC_API_URL ||
    "https://backendpodcast-production.up.railway.app",
  headers: { "Content-Type": "application/json" },
});

export default apiPodcast;
