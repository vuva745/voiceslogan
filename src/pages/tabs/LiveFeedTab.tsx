import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNeoNodeLiveFeed } from "@/lib/mocks/stubs";
import FeedItem from "@/components/dashboard/FeedItem";
import AudioWaveform from "@/components/dashboard/AudioWaveform";
import { getAvatarForName } from "@/lib/utils";

/**
 * Tab 2: Live Slogan Feed
 * 
 * TODO Integration Points:
 * - Replace useNeoNodeLiveFeed() with NeoNode websocket helper
 * - Add real-time SSE/websocket connection
 */
const LiveFeedTab = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSponsor, setSelectedSponsor] = useState<string>("all");
  const [isPaused, setIsPaused] = useState(false);
  const { items, isLive, togglePause } = useNeoNodeLiveFeed();

  const sponsors = ["DOXIA", "genesis", "METRON"];
  
  const filteredItems = items.filter((item) => {
    const matchesSearch = 
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.uid.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.transcript.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesSponsor = selectedSponsor === "all" || item.sponsor === selectedSponsor;
    
    return matchesSearch && matchesSponsor;
  });

  // Female avatar images for live feed (ensuring each female gets a different one)
  const femaleAvatars = [
    '/avatars/ChatGPT Image Dec 1, 2025, 10_11_28 AM.png',
    '/avatars/ChatGPT Image Dec 1, 2025, 10_13_59 AM.png',
    '/avatars/ChatGPT Image Dec 1, 2025, 10_15_57 AM.png',
    '/avatars/ChatGPT Image Dec 1, 2025, 10_16_56 AM.png',
    '/avatars/ChatGPT Image Dec 1, 2025, 10_17_58 AM.png',
  ];

  // Exact items from mockup - assigning different female avatars to each female
  const mockupItems = [
    { name: "Lauren Weaver", transcript: "Healing starts at home.", timestamp: "50 seconds ago", avatar: femaleAvatars[0] },
    { name: "Jack Palmer", transcript: "Care, respect, and dignity.", timestamp: "2 minutes ago", avatar: getAvatarForName("Jack Palmer") },
    { name: "Aisha Khan", transcript: "Together, we heal.", timestamp: "3 minutes ago", avatar: femaleAvatars[1] },
    { name: "Marcus Reed", transcript: "Your health, our mission.", timestamp: "5 minutes ago", avatar: getAvatarForName("Marcus Reed") },
    { name: "Emma Clark", transcript: "Caring for every moment.", timestamp: "6 minutes ago", avatar: femaleAvatars[2] },
    { name: "Taylor Harris", transcript: "Empathy in every step.", timestamp: "8 minutes ago", avatar: femaleAvatars[3] },
  ];

  return (
    <div className="space-y-6">
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Left: Feed List - Perfect match to mockup */}
        <Card className="p-6 bg-card border border-border flex flex-col">
          <h3 className="text-lg font-bold mb-4 text-foreground">Live Slogan Feed</h3>
          <div className="space-y-4 flex-1">
            {mockupItems.map((item, i) => (
              <div key={i} className="flex items-start gap-3 pb-4 border-b border-border/50 last:border-0 last:pb-0">
                <img
                  src={item.avatar}
                  alt={item.name}
                  className="w-12 h-12 rounded-full flex-shrink-0 object-cover"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-sm text-foreground leading-tight">{item.name}</p>
                      <p className="text-sm text-foreground mt-1.5 leading-relaxed">"{item.transcript}"</p>
                    </div>
                    <span className="text-xs text-muted-foreground whitespace-nowrap ml-3 flex-shrink-0">
                      {item.timestamp}
                    </span>
                  </div>
                </div>
              </div>
            ))}
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
