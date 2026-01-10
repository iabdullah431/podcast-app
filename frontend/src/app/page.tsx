"use client";

import { useEffect, useState } from "react";
import PodcastCard from "@/components/PodcastCard";
import PodcastListItem from "@/components/PodcastListItem";
import SearchBar from "@/components/SearchBar";
import LayoutToggle from "@/components/LayoutToggle";
import SkeletonListItem from "@/Skeleton/SkeletonListItem";
import SkeletonCard from "@/Skeleton/SkeletonCard";
import { OverviewScroll } from "@/components/OverviewScroll";
import { useOverviewSearch, useEpisodeSearch, useSearchHistory } from "@/hooks";
import { Podcast } from "@/types/podcast";

export default function Home() {
  const [userTerm, setUserTerm] = useState("");
  const [queryTerm, setQueryTerm] = useState("فنجان");
  const [layout, setLayout] = useState<"scroll" | "grid" | "compact">("compact");

  const {
    data: overview = [],
    isLoading: overviewLoading,
    isError: overviewIsError,
  } = useOverviewSearch(queryTerm);

  const {
    data: episodes = [],
    isLoading: episodesLoading,
    isError: episodesIsError,
    isSuccess: episodesSuccess,
  } = useEpisodeSearch(queryTerm);

  const { data: history = [], refetch: refetchHistory } = useSearchHistory();

  useEffect(() => {
    if (episodesSuccess) {
      refetchHistory();
    }
  }, [episodesSuccess, refetchHistory]);

  return (
    <div className="bg-[#0f0f1a] text-white min-h-screen px-6 py-8">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-bold">الإعلام المسموع 🎧</h1>
      </div>

      <SearchBar
        value={userTerm}
        onChange={setUserTerm}
        onSearch={setQueryTerm}
        onClear={() => setUserTerm("")}
        history={history}
        onPickHistory={(val) => {
          setUserTerm(val);
          setQueryTerm(val);
        }}
      />

      <div className="my-6">
        {overviewLoading && (
          <div className="flex gap-4 overflow-x-auto pb-2">
            {Array(5)
              .fill(0)
              .map((_, i) => (
                <SkeletonCard key={i} />
              ))}
          </div>
        )}

        {!overviewLoading && overview.length > 0 && (
          <>
            <h2 className="text-lg font-semibold mb-3">
              نظرة عامة لـ: <span className="text-purple-400">{queryTerm}</span>
            </h2>
            <OverviewScroll>
              {overview.map((podcast: Podcast, i: number) => (
                <PodcastCard
                  key={podcast.id || podcast.link || podcast.name || i}
                  podcast={podcast}
                />
              ))}
            </OverviewScroll>
          </>
        )}

        {overviewIsError && (
          <p className="text-red-500">فشل تحميل البيانات</p>
        )}
      </div>

      <div className="flex justify-between items-center mt-10 mb-4">
        {!episodesLoading && episodes.length > 0 && (
          <>
            <h2 className="text-lg font-semibold">
              أفضل الحلقات لـ: <span className="text-purple-400">{queryTerm}</span>
            </h2>
            <LayoutToggle layout={layout} setLayout={setLayout} />
          </>
        )}
      </div>

      {episodesLoading && (
        <div
          className={
            layout === "compact"
              ? "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
              : layout === "grid"
              ? "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6"
              : "flex overflow-x-auto gap-4 pb-2 scrollbar-thin scrollbar-thumb-purple-600 scrollbar-track-transparent"
          }
        >
          {Array(6)
            .fill(0)
            .map((_, i) => (
              <SkeletonListItem key={i} />
            ))}
        </div>
      )}

      {!episodesLoading && episodes.length > 0 && (
        <>
          {layout === "scroll" ? (
            <OverviewScroll>
              {episodes.map((podcast: Podcast, index: number) => (
                <PodcastListItem
                  key={(podcast.id ?? podcast.link ?? "ep") + "-" + index}
                  podcast={podcast}
                />
              ))}
            </OverviewScroll>
          ) : (
            <div
              className={
                layout === "compact"
                  ? "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
                  : layout === "grid"
                  ? "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6"
                  : "flex flex-col gap-4"
              }
            >
              {episodes.map((podcast: Podcast, index: number) => (
                <PodcastListItem
                  key={(podcast.id ?? podcast.link ?? "ep") + "-" + index}
                  podcast={podcast}
                />
              ))}
            </div>
          )}
        </>
      )}

      {episodesIsError && (
        <p className="text-red-500">فشل تحميل الحلقات</p>
      )}
    </div>
  );
}
