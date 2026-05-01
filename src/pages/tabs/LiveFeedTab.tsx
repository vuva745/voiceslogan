import { useMemo, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNeoNodeLiveFeed } from "@/lib/mocks/stubs";
import FeedItem from "@/components/dashboard/FeedItem";
import AudioWaveform from "@/components/dashboard/AudioWaveform";

/**
 * Tab 2: Live Slogan Feed
 */
const LiveFeedTab = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSponsor, setSelectedSponsor] = useState<string>("all");
  const [sortBy, setSortBy] = useState<"time" | "score">("time");
  const [sortOrder, setSortOrder] = useState<"desc" | "asc">("desc");
  const [isPaused, setIsPaused] = useState(false);
  const { items, isLive, togglePause } = useNeoNodeLiveFeed();

  const sponsors = ["DOXIA", "genesis", "METRON"];
  
  const sortedAndFilteredItems = useMemo(() => {
    const filteredItems = items.filter((item) => {
      const query = searchQuery.trim().toLowerCase();
      const matchesSearch =
        item.name.toLowerCase().includes(query) ||
        item.uid.toLowerCase().includes(query) ||
        item.transcript.toLowerCase().includes(query) ||
        item.sponsor.toLowerCase().includes(query);

      const matchesSponsor = selectedSponsor === "all" || item.sponsor === selectedSponsor;

      return matchesSearch && matchesSponsor;
    });

    const sortedItems = [...filteredItems].sort((a, b) => {
      if (sortBy === "score") {
        const scoreA = typeof a.score === "number" ? a.score : 0;
        const scoreB = typeof b.score === "number" ? b.score : 0;
        return sortOrder === "desc" ? scoreB - scoreA : scoreA - scoreB;
      }

      const timeA = typeof a.createdAt === "number" ? a.createdAt : 0;
      const timeB = typeof b.createdAt === "number" ? b.createdAt : 0;
      return sortOrder === "desc" ? timeB - timeA : timeA - timeB;
    });

    return sortedItems;
  }, [items, searchQuery, selectedSponsor, sortBy, sortOrder]);

  return (
    <div className="space-y-6">
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Left: Feed List - Perfect match to mockup */}
        <Card className="p-6 bg-card border border-border flex flex-col">
          <h3 className="text-lg font-bold mb-4 text-foreground">Live Slogan Feed</h3>

          <div className="grid sm:grid-cols-2 gap-2 mb-4">
            <input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search name, UID, transcript, sponsor"
              className="h-10 rounded-md border border-input bg-background px-3 text-sm"
              aria-label="Search feed"
            />
            <select
              value={selectedSponsor}
              onChange={(e) => setSelectedSponsor(e.target.value)}
              className="h-10 rounded-md border border-input bg-background px-3 text-sm"
              aria-label="Filter by sponsor"
            >
              <option value="all">All sponsors</option>
              {sponsors.map((sponsor) => (
                <option key={sponsor} value={sponsor}>
                  {sponsor}
                </option>
              ))}
            </select>
          </div>

          <div className="grid sm:grid-cols-2 gap-2 mb-4">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as "time" | "score")}
              className="h-10 rounded-md border border-input bg-background px-3 text-sm"
              aria-label="Sort feed by"
            >
              <option value="time">Sort by time</option>
              <option value="score">Sort by score</option>
            </select>
            <select
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value as "desc" | "asc")}
              className="h-10 rounded-md border border-input bg-background px-3 text-sm"
              aria-label="Sort order"
            >
              <option value="desc">Descending</option>
              <option value="asc">Ascending</option>
            </select>
          </div>

          <div className="space-y-4 flex-1">
            {sortedAndFilteredItems.map((item) => (
              <FeedItem key={item.id} item={item} />
            ))}
            {sortedAndFilteredItems.length === 0 && (
              <p className="text-sm text-muted-foreground">No feed items match the current filters.</p>
            )}
          </div>
          
          {/* Bottom left: VIGELOGAN and SPUNSORS - Matching mockup exactly */}
          <div className="mt-auto pt-6 border-t border-border">
            <p className="text-sm font-bold text-foreground">VIGELOGAN</p>
            <p className="text-xs text-muted-foreground mt-0.5">SPUNSORS</p>
          </div>
        </Card>

        {/* Right: Stats and Waveform - Perfect match to mockup */}
        <div className="space-y-6">
          {/* Live Slogans Today Count */}
          <Card className="p-6 bg-card border border-border">
            <div className="text-center">
              <p className="text-4xl font-bold text-foreground">2,607</p>
              <p className="text-sm text-muted-foreground mt-2">Live Slogans Today</p>
            </div>
          </Card>

          {/* First Waveform Section with STOP RECORDING button - Matching mockup */}
          <Card className="p-6 bg-card border border-border">
            <h3 className="text-lg font-bold mb-4 text-foreground">Incoming Slogans</h3>
            <AudioWaveform
              isRecording={isLive && !isPaused}
              barCount={40}
              height={192}
              className="mb-4"
            />
            
            <Button
              variant="outline"
              className="w-full border-2"
              onClick={() => {
                setIsPaused(!isPaused);
                togglePause();
              }}
            >
              {isLive && !isPaused ? "STOP RECORDING" : "START RECORDING"}
            </Button>
          </Card>

          {/* Second Waveform Section (no button) - Matching mockup */}
          <Card className="p-6 bg-card border border-border">
            <h3 className="text-lg font-bold mb-4 text-foreground">Incoming Slogans</h3>
            <AudioWaveform
              isRecording={isLive && !isPaused}
              barCount={40}
              height={192}
            />
          </Card>

          {/* Sponsor Logos */}
          <Card className="p-6 bg-card border border-border">
            <p className="text-xs text-muted-foreground mb-4 uppercase tracking-wider">SPONSORED BY</p>
            <div className="flex items-center justify-between gap-4">
              <div className="text-xl font-bold text-foreground">DOXIA</div>
              <div className="text-xl font-bold text-foreground">genesis</div>
              <div className="text-xl font-bold text-foreground">METRON</div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default LiveFeedTab;
