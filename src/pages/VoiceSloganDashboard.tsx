import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Mic, Radio, Brain, Database, TrendingUp, Trophy, Coins } from "lucide-react";
import LiveRecorderTab from "./tabs/LiveRecorderTab";
import LiveFeedTab from "./tabs/LiveFeedTab";
import AIReviewTab from "./tabs/AIReviewTab";
import SevenDLogTab from "./tabs/SevenDLogTab";
import SponsorInsightsTab from "./tabs/SponsorInsightsTab";
import WinnerSelectTab from "./tabs/WinnerSelectTab";
import TokenExportTab from "./tabs/TokenExportTab";

/**
 * VoiceSlogan Dashboard - Main Shell Component
 * 
 * Keyboard shortcuts:
 * - 1-7: Switch between tabs
 * - Ctrl+R: Start/stop recording (Tab 1)
 * - Ctrl+A: Approve selected (Tab 3)
 * - Ctrl+E: Export (Tab 7)
 */
const VoiceSloganDashboard = () => {
  const [activeTab, setActiveTab] = useState("recorder");

  const tabs = [
    { id: "recorder", label: "Live Recorder", icon: Mic, number: "1" },
    { id: "feed", label: "Live Feed", icon: Radio, number: "2" },
    { id: "ai-review", label: "AI Review", icon: Brain, number: "3" },
    { id: "log", label: "7D Log", icon: Database, number: "4" },
    { id: "insights", label: "Sponsor Insights", icon: TrendingUp, number: "5" },
    { id: "winner", label: "Winner Select", icon: Trophy, number: "6" },
    { id: "export", label: "Token Export", icon: Coins, number: "7" },
  ];

  // Keyboard shortcuts
  const handleKeyDown = (e: KeyboardEvent) => {
    const num = parseInt(e.key);
    if (num >= 1 && num <= 7) {
      setActiveTab(tabs[num - 1].id);
    }
  };

  return (
    <div 
      className="min-h-screen bg-background text-foreground flex"
      onKeyDown={handleKeyDown as any}
      tabIndex={0}
    >
      {/* Left Sidebar Navigation */}
      <aside className="w-64 border-r border-border bg-card/50 backdrop-blur-sm flex flex-col sticky top-0 h-screen">
        {/* Header in Sidebar */}
        <h1 className="text-2xl font-bold bg-gradient-to-r from-gold via-gold-glow to-gold bg-clip-text text-transparent drop-shadow-[0_0_10px_hsl(var(--gold-glow)/1),0_0_20px_hsl(var(--gold-glow)/0.9),0_0_30px_hsl(var(--gold-glow)/0.8),0_0_40px_hsl(var(--gold-glow)/0.7),0_0_50px_hsl(var(--gold-glow)/0.6)] [text-shadow:0_0_5px_hsl(var(--gold-glow)/1),0_0_10px_hsl(var(--gold-glow)/0.9),0_0_15px_hsl(var(--gold-glow)/0.8),0_0_20px_hsl(var(--gold-glow)/0.7)] animate-glow-pulse px-6 pt-6">
          VoiceSlogan
        </h1>
        <p className="text-xs text-gold/70 mt-1 drop-shadow-[0_0_8px_hsl(var(--gold-glow)/0.5)] px-6 pb-6">DASHBOARD</p>

        {/* Tabs as Menu Items */}
        <nav className="flex-1 p-4 space-y-2">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`
                  w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-all
                  ${isActive 
                    ? 'bg-gradient-to-r from-gold/20 to-gold-glow/10 text-gold border border-gold/30 shadow-[0_0_10px_hsl(var(--gold-glow)/0.6),0_0_20px_hsl(var(--gold-glow)/0.5),0_0_30px_hsl(var(--gold-glow)/0.4)] [text-shadow:0_0_5px_hsl(var(--gold-glow)/0.8),0_0_10px_hsl(var(--gold-glow)/0.6)]' 
                    : 'text-muted-foreground hover:text-gold hover:bg-muted/50 hover:border hover:border-gold/20 hover:shadow-[0_0_8px_hsl(var(--gold-glow)/0.4),0_0_15px_hsl(var(--gold-glow)/0.3)] hover:[text-shadow:0_0_3px_hsl(var(--gold-glow)/0.6)]'
                  }
                `}
              >
                <Icon className={`w-5 h-5 ${isActive 
                  ? 'drop-shadow-[0_0_5px_hsl(var(--gold-glow)/1),0_0_10px_hsl(var(--gold-glow)/0.8),0_0_15px_hsl(var(--gold-glow)/0.6)]' 
                  : 'drop-shadow-[0_0_2px_hsl(var(--gold-glow)/0.3)] group-hover:drop-shadow-[0_0_5px_hsl(var(--gold-glow)/0.6),0_0_10px_hsl(var(--gold-glow)/0.4)]'
                }`} />
                <div className="flex-1">
                  <span className="text-sm font-medium">{tab.label}</span>
                </div>
                <span className={`text-xs opacity-50 ${isActive ? 'text-gold/80 drop-shadow-[0_0_3px_hsl(var(--gold-glow)/0.6)]' : ''}`}>{tab.number}</span>
              </button>
            );
          })}
        </nav>

        {/* Footer in Sidebar */}
        <div className="p-4 border-t border-border text-xs text-muted-foreground space-y-1">
          <p className="font-semibold text-foreground">BLOCKCHAIN</p>
          <p className="font-semibold text-foreground">SPONSORS</p>
          <p className="mt-2">© 2024 VoiceSlogan</p>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 overflow-auto">
        <div className="container mx-auto px-6 py-8">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsContent value="recorder" className="animate-fade-in mt-0">
              <LiveRecorderTab />
            </TabsContent>

            <TabsContent value="feed" className="animate-fade-in mt-0">
              <LiveFeedTab />
            </TabsContent>

            <TabsContent value="ai-review" className="animate-fade-in mt-0">
              <AIReviewTab />
            </TabsContent>

            <TabsContent value="log" className="animate-fade-in mt-0">
              <SevenDLogTab />
            </TabsContent>

            <TabsContent value="insights" className="animate-fade-in mt-0">
              <SponsorInsightsTab />
            </TabsContent>

            <TabsContent value="winner" className="animate-fade-in mt-0">
              <WinnerSelectTab />
            </TabsContent>

            <TabsContent value="export" className="animate-fade-in mt-0">
              <TokenExportTab />
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
};

export default VoiceSloganDashboard;
