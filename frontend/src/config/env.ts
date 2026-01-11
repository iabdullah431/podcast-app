import axios from "axios";

const apiPodcast = axios.create({
  baseURL:
    process.env.NEXT_PUBLIC_API_URL || "https://podcast-app-euyh.vercel.app",
  headers: { "Content-Type": "application/json" },
});

export default apiPodcast;
