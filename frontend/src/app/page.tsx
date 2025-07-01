"use client";

import { useEffect, useState } from "react";
import PodcastCard from "@/components/PodcastCard";
import PodcastListItem from "@/components/PodcastListItem";
import SearchBar from "@/components/SearchBar";
import LayoutToggle from "@/components/LayoutToggle";
import { Podcast } from "@/types/podcast";
import SkeletonListItem from "@/Skeleton/SkeletonListItem";
import SkeletonCard from "@/Skeleton/SkeletonCard";
import { getOverview, getEpisodes } from "@/api/podcastService";
import { OverviewScroll } from "@/components/OverviewScroll";

export default function Home() {
  const [term, setTerm] = useState("فنجان");

  // Overview state: data, loading, and error
  const [overview, setOverview] = useState<Podcast[]>([]);
  const [overviewLoading, setOverviewLoading] = useState(false);
  const [overviewError, setOverviewError] = useState<Error | null>(null);

  // Episodes state: data, loading, and error
  const [episodes, setEpisodes] = useState<Podcast[]>([]);
  const [episodesLoading, setEpisodesLoading] = useState(false);
  const [episodesError, setEpisodesError] = useState<Error | null>(null);

  // Layout state for episodes display
  const [layout, setLayout] = useState<"scroll" | "grid" | "compact">(
    "compact"
  );

  // Fetch overview data when search term changes
  useEffect(() => {
    if (!term) return;
    setOverviewLoading(true);
    setOverviewError(null);

    getOverview(term)
      .then(setOverview)
      .catch(setOverviewError)
      .finally(() => setOverviewLoading(false));
  }, [term]);

  // Fetch episodes data when search term changes
  useEffect(() => {
    if (!term) return;
    setEpisodesLoading(true);
    setEpisodesError(null);

    getEpisodes(term)
      .then(setEpisodes)
      .catch(setEpisodesError)
      .finally(() => setEpisodesLoading(false));
  }, [term]);

  return (
    <div className="bg-[#0f0f1a] text-white min-h-screen px-6 py-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-bold">Arabic Podcasts</h1>
      </div>

      {/* Search Bar */}
      <SearchBar onSearch={setTerm} />

      {/* Overview Section */}
      <div className="my-6">
        <>
          {!overviewLoading && overview.length > 0 && (
            <>
              <h2 className="text-lg font-semibold mb-3">
                نظرة عامة لـ: <span className="text-purple-400">{term}</span>
              </h2>

              <OverviewScroll>
                {overview.map((podcast: any, index: number) => (
                  <PodcastCard
                    key={podcast.id || podcast.name || index}
                    podcast={podcast}
                  />
                ))}
              </OverviewScroll>
            </>
          )}
        </>
        {/* Loading skeletons for overview */}
        {overviewLoading && (
          <div className="flex gap-4 overflow-x-auto pb-2">
            {Array(5)
              .fill(0)
              .map((_, i) => (
                <SkeletonCard key={i} />
              ))}
          </div>
        )}

        {/* Error message for overview */}
        {overviewError && (
          <p className="text-red-500">Failed to load overview data.</p>
        )}
      </div>

      {/* Episodes Section */}
      <div className="flex justify-between items-center mt-10 mb-4">
        {!episodesLoading && episodes.length > 0 && (
          <>
            <h2 className="text-lg font-semibold">
              أفضل الحلقات لـ: <span className="text-purple-400">{term}</span>
            </h2>
            <LayoutToggle layout={layout} setLayout={setLayout} />
          </>
        )}
      </div>

      {/* Loading skeletons for episodes */}
      {episodesLoading && (
        <div
          className={`${
            layout === "compact"
              ? "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
              : layout === "grid"
              ? "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6"
              : "flex overflow-x-auto gap-4 pb-2 scrollbar-thin scrollbar-thumb-purple-600 scrollbar-track-transparent"
          }`}
        >
          {Array(6)
            .fill(0)
            .map((_, i) => (
              <SkeletonListItem key={i} />
            ))}
        </div>
      )}

      {/* Episodes Grid Layout */}
      {!episodesLoading && episodes.length > 0 && (
        <>
          {layout === "scroll" ? (
            <OverviewScroll>
              {episodes.map((podcast) => (
                <PodcastListItem key={podcast.id} podcast={podcast} />
              ))}{" "}
            </OverviewScroll>
          ) : (
            <div
              className={`${
                layout === "compact"
                  ? "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4"
                  : layout === "grid"
                  ? "grid grid-cols-2 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
                  : layout === "list"
                  ? "flex flex-col gap-4"
                  : ""
              }`}
            >
              {episodes.map((podcast) => (
                <PodcastListItem key={podcast.id} podcast={podcast} />
              ))}
            </div>
          )}
        </>
      )}

      {/* Error message for episodes */}
      {episodesError && (
        <p className="text-red-500">Failed to load episodes data.</p>
      )}
    </div>
  );
}
