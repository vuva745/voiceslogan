import { useRef } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Headphones, Plane, Download } from "lucide-react";
import { toast } from "sonner";
import html2canvas from "html2canvas";

/**
 * Tab 5: Sponsor Insights
 * 
 * TODO Integration Points:
 * - Replace with Sponsor dashboard integration
 * - Add real analytics data source
 */
const SponsorInsightsTab = () => {
  const contentRef = useRef<HTMLDivElement>(null);

  const handleExportSnapshot = async () => {
    if (!contentRef.current) {
      toast.error("Failed to capture snapshot");
      return;
    }

    try {
      toast.info("Capturing snapshot...");
      
      // Capture the content as canvas
      const canvas = await html2canvas(contentRef.current, {
        backgroundColor: null,
        scale: 2,
        useCORS: true,
        logging: false,
      });

      // Convert canvas to blob and download
      canvas.toBlob((blob) => {
        if (!blob) {
          toast.error("Failed to create snapshot");
          return;
        }

        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `sponsor-insights-snapshot-${new Date().toISOString().split('T')[0]}.png`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        toast.success("Snapshot exported successfully");
      }, "image/png");
    } catch (error) {
      console.error("Snapshot export error:", error);
      toast.error("Failed to export snapshot");
    }
  };

  const campaigns = [
    { name: "Airline Campaign", slogan: "Win on the fly!", listeners: 74051, icon: Plane },
    { name: "NeoCare Campaign", slogan: "Healing starts at home.", listeners: 58337, icon: Headphones },
  ];

  const topSlogans = [
    { text: "Win on the fly!", plays: 38204 },
    { text: "Healing starts at home", plays: 24489 },
    { text: "Empathy in every step.", plays: 19908 },
  ];

  const ageDistribution = [
    { range: "< 18", percent: 34 },
    { range: "18-24", percent: 20 },
    { range: "25-34", percent: 18 },
    { range: "35-44", percent: 18 },
    { range: "45-54", percent: 13 },
  ];

  return (
    <div ref={contentRef} className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Sponsor Insights</h2>
          <p className="text-muted-foreground">Campaign Slogan Performance</p>
        </div>
        <Button 
          variant="outline" 
          onClick={handleExportSnapshot}
        >
          <Download className="w-4 h-4 mr-2" />
          Export Snapshot
        </Button>
      </div>

      {/* Campaign Cards - Matching mockup */}
      <div className="grid md:grid-cols-2 gap-6">
        {campaigns.map((campaign) => {
          const Icon = campaign.icon;
          return (
            <Card key={campaign.name} className="p-6 bg-card border border-border">
              <div className="flex items-start gap-4 mb-6">
                <div className="p-3 bg-primary/10 rounded-lg">
                  <Icon className="w-6 h-6 text-primary" />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-lg mb-1 text-foreground">{campaign.name}</h3>
                  <p className="text-sm text-muted-foreground">"{campaign.slogan}"</p>
                </div>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-2">Unique Listeners</p>
                <p className="text-4xl font-bold text-primary">{campaign.listeners.toLocaleString()}</p>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Top Slogans - Matching mockup */}
      <Card className="p-6 bg-card border border-border">
        <h3 className="text-lg font-bold mb-6 text-foreground">Top Slogans</h3>
        <div className="space-y-4">
          {topSlogans.map((slogan, i) => (
            <div key={i} className="flex items-center justify-between">
              <div className="flex items-center gap-4 flex-1">
                <span className="text-2xl font-bold text-muted-foreground w-8">{i + 1}.</span>
                <span className="text-foreground">"{slogan.text}"</span>
              </div>
              <span className="text-lg font-bold text-primary">{slogan.plays.toLocaleString()} Plays</span>
            </div>
          ))}
        </div>
      </Card>

      {/* Demographics - Matching mockup */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Age Distribution */}
        <Card className="p-6 bg-card border border-border">
          <h3 className="text-lg font-bold mb-6 text-foreground">Listener Demographics</h3>
          <p className="text-sm font-semibold text-muted-foreground mb-4">Age Distribution</p>
          <div className="space-y-3">
            {ageDistribution.map((age) => (
              <div key={age.range}>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm text-foreground">{age.range}</span>
                  <span className="text-sm font-semibold text-foreground">{age.percent}%</span>
                </div>
                <div className="h-8 bg-muted rounded overflow-hidden">
                  <div
                    className="h-full bg-primary transition-all duration-500"
                    style={{ width: `${age.percent}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Gender Distribution - Matching mockup (Male 44%, Female 56%) */}
        <Card className="p-6 bg-card border border-border">
          <h3 className="text-lg font-bold mb-6 text-foreground">Gender Distribution</h3>
          <div className="flex items-center justify-center gap-8 py-8">
            {/* Male */}
            <div className="text-center">
              <div className="relative w-32 h-32 mb-4">
                <svg className="w-full h-full transform -rotate-90">
                  <circle
                    cx="64"
                    cy="64"
                    r="56"
                    fill="none"
                    stroke="hsl(var(--muted))"
                    strokeWidth="12"
                  />
                  <circle
                    cx="64"
                    cy="64"
                    r="56"
                    fill="none"
                    stroke="hsl(var(--primary))"
                    strokeWidth="12"
                    strokeDasharray={`${44 * 2 * Math.PI * 0.44} ${44 * 2 * Math.PI}`}
                    strokeLinecap="round"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <p className="text-3xl font-bold text-foreground">44%</p>
                  </div>
                </div>
              </div>
              <p className="font-semibold text-foreground">MALE</p>
            </div>

            {/* Female */}
            <div className="text-center">
              <div className="relative w-32 h-32 mb-4">
                <svg className="w-full h-full transform -rotate-90">
                  <circle
                    cx="64"
                    cy="64"
                    r="56"
                    fill="none"
                    stroke="hsl(var(--muted))"
                    strokeWidth="12"
                  />
                  <circle
                    cx="64"
                    cy="64"
                    r="56"
                    fill="none"
                    stroke="hsl(var(--chart-tertiary))"
                    strokeWidth="12"
                    strokeDasharray={`${56 * 2 * Math.PI * 0.56} ${56 * 2 * Math.PI}`}
                    strokeLinecap="round"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <p className="text-3xl font-bold text-foreground">56%</p>
                  </div>
                </div>
              </div>
              <p className="font-semibold text-foreground">FEMALE</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-center gap-8 py-4">
        <span className="text-sm font-semibold text-muted-foreground">BLOCKCHAIN</span>
        <span className="text-sm font-semibold text-muted-foreground">SPUNSORS</span>
      </div>
    </div>
  );
};

export default SponsorInsightsTab;
