import { useState, useEffect, useCallback } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { callVoiceMatchAI } from "@/lib/mocks/stubs";
import { Check, X, AlertTriangle, TrendingUp } from "lucide-react";
import { getAvatarForName } from "@/lib/utils";

/**
 * Tab 3: AI VoiceMatch Review
 * 
 * TODO Integration Points:
 * - Replace callVoiceMatchAI() with NeoNode AI microservice
 * - Add Audit.recordDecision() for approve/flag/reject actions
 */
const AIReviewTab = () => {
  const [items] = useState(() => {
    return Array.from({ length: 6 }, (_, i) => {
      const name = ["Erik Brown", "Kayla Jenkins", "Gary Lewis", "Maya Martinez", "Alex Chen", "Sarah Wilson"][i];
      const mockResult = callVoiceMatchAI(`audio-${i}`);
      return {
        id: `item-${i}`,
        name,
        avatar: getAvatarForName(name),
        ...mockResult,
      };
    });
  });

  const [sortBy, setSortBy] = useState<"score" | "time">("score");
  const [selectedItemId, setSelectedItemId] = useState<string | null>(null);

  const sortedItems = [...items].sort((a, b) => {
    if (sortBy === "score") {
      return b.match - a.match;
    }
    return 0; // time sorting would go here
  });

  const handleApprove = useCallback((id: string) => {
    // TODO: Replace with Audit.recordDecision(uid, "approve")
    console.log("Approving item:", id);
    toast.success("Item approved");
  }, []);

  // Keyboard shortcut: Ctrl+A to approve selected item
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'a') {
        e.preventDefault();
        if (selectedItemId) {
          handleApprove(selectedItemId);
        } else if (sortedItems.length > 0) {
          // Approve first item if none selected
          handleApprove(sortedItems[0].id);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedItemId, sortedItems, handleApprove]);

  const handleFlag = (id: string) => {
    // TODO: Replace with Audit.recordDecision(uid, "flag")
    console.log("Flagging item:", id);
    toast.warning("Item flagged for review");
  };

  const handleReject = (id: string) => {
    // TODO: Replace with Audit.recordDecision(uid, "reject")
    console.log("Rejecting item:", id);
    toast.error("Item rejected");
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold bg-gradient-to-r from-gold to-gold-glow bg-clip-text text-transparent drop-shadow-[0_0_8px_hsl(var(--gold-glow)/0.6)]">
            AI Slogan Match
          </h2>
          <p className="text-muted-foreground">Trends & Slogan Analytics</p>
        </div>
        <div className="flex gap-2">
          <Button
            variant={sortBy === "score" ? "default" : "outline"}
            onClick={() => setSortBy("score")}
            size="sm"
          >
            Sort by Score
          </Button>
          <Button
            variant={sortBy === "time" ? "default" : "outline"}
            onClick={() => setSortBy("time")}
            size="sm"
          >
            Sort by Time
          </Button>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Slogan Trends Chart - Matching mockup (Y: 0-250) */}
        <Card className="p-6 bg-card border border-border">
          <h3 className="text-lg font-bold mb-4 text-foreground">Slogan Trends</h3>
          <div className="relative h-64">
            <svg className="w-full h-full" viewBox="0 0 400 200">
              {/* Grid lines */}
              <line x1="0" y1="0" x2="0" y2="200" stroke="hsl(var(--border))" strokeWidth="1" />
              <line x1="0" y1="200" x2="400" y2="200" stroke="hsl(var(--border))" strokeWidth="1" />
              
              {/* Y-axis grid lines */}
              {[0, 50, 100, 150, 200, 250].map((val, i) => {
                const y = 200 - (val / 250) * 200;
                return (
                  <line key={i} x1="0" y1={y} x2="400" y2={y} stroke="hsl(var(--border))" strokeWidth="0.5" strokeDasharray="2,2" />
                );
              })}
              
              {/* Trend line - matching mockup curve */}
              <path
                d="M 0,180 L 60,150 L 120,120 L 180,100 L 240,70 L 300,50 L 360,30"
                fill="none"
                stroke="hsl(var(--primary))"
                strokeWidth="3"
                strokeLinecap="round"
              />
              
              {/* Data points */}
              {[0, 60, 120, 180, 240, 300, 360].map((x, i) => (
                <circle
                  key={i}
                  cx={x}
                  cy={[180, 150, 120, 100, 70, 50, 30][i]}
                  r="4"
                  fill="hsl(var(--primary))"
                />
              ))}
            </svg>
            {/* X-axis labels */}
            <div className="flex justify-between mt-2 text-xs text-muted-foreground">
              <span>6 AM</span>
              <span>6A</span>
              <span>9M</span>
              <span>12P</span>
              <span>4P</span>
              <span>8PM</span>
            </div>
            {/* Y-axis labels */}
            <div className="absolute left-0 top-0 h-64 flex flex-col justify-between text-xs text-muted-foreground -ml-8">
              <span>250</span>
              <span>200</span>
              <span>150</span>
              <span>100</span>
              <span>50</span>
              <span>0</span>
            </div>
          </div>
        </Card>

        {/* Match Analysis - Matching mockup */}
        <Card className="p-6 bg-card border border-border">
          <h3 className="text-lg font-bold mb-4 text-foreground">Match Analysis</h3>
          <div className="space-y-3">
            {[
              { level: "High", percent: 72, label: "Slogan-to-audio", color: "bg-primary" },
              { level: "Medium", percent: 24, label: "Slogan-to-audio", color: "bg-muted" },
              { level: "Low", percent: 4, label: "Slogan-to-audio", color: "bg-muted" },
            ].map((item) => (
              <div key={item.level} className={`${item.level === 'High' ? 'bg-primary/10' : 'bg-secondary'} rounded-lg p-4 border border-border`}>
                <div className="flex justify-between items-center mb-2">
                  <span className="font-semibold text-foreground">{item.level}</span>
                  <span className="text-2xl font-bold text-primary">{item.percent}%</span>
                </div>
                <p className="text-sm text-muted-foreground">{item.label}</p>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Match History - Matching mockup (showing AI Score percentages) */}
      <Card className="p-6 bg-card border border-border">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-bold text-foreground">Match History</h3>
          <div className="text-sm text-muted-foreground">
            Model: VoiceMatch v2.1 | Threshold: 65%
          </div>
        </div>
        <div className="space-y-4">
          {sortedItems.slice(0, 4).map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between p-4 bg-secondary/50 rounded-lg hover:bg-secondary transition-colors"
            >
              <div className="flex items-center gap-4">
                <img
                  src={item.avatar}
                  alt={item.name}
                  className="w-12 h-12 rounded-full"
                />
                <div>
                  <p className="font-semibold text-foreground">{item.name}</p>
                  <p className="text-sm text-muted-foreground">AI Score</p>
                </div>
              </div>

              <div className="flex items-center gap-6">
                {/* AI Score - matching mockup */}
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">{item.match}%</div>
                </div>

                {/* Actions */}
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleApprove(item.id)}
                  >
                    <Check className="w-4 h-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleFlag(item.id)}
                  >
                    <AlertTriangle className="w-4 h-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleReject(item.id)}
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};

export default AIReviewTab;
