import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Sparkles, Loader2 } from "lucide-react";

/**
 * Tab 6: WinnerSelect AI
 * 
 * TODO Integration Points:
 * - Implement actual RNG algorithm
 * - Add fairness verification
 * - Integrate with Audit dashboard for winner approval
 */
const WinnerSelectTab = () => {
  const [algorithm, setAlgorithm] = useState<"random" | "score" | "weighted" | "hybrid">("hybrid");
  const [neverWonBooster, setNeverWonBooster] = useState(true);
  const [showSimulation, setShowSimulation] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  const [simulationProgress, setSimulationProgress] = useState(0);
  const [aiSelections, setAiSelections] = useState<Array<{ name: string; confidence: number }>>([]);

  const candidatePool = [
    "Olivia Reynolds", "Cameron Flores", "Sophia Lee", "Caleb Powell",
    "Emma Thompson", "James Wilson", "Ava Martinez", "Noah Anderson",
    "Isabella Garcia", "Lucas Brown", "Mia Davis", "Alexander Taylor"
  ];

  const handleRunSimulation = async () => {
    setIsRunning(true);
    setShowSimulation(false);
    setSimulationProgress(0);
    setAiSelections([]);

    toast.info("Starting simulation...");

    // Simulate progress steps
    const steps = [
      "Analyzing candidate pool...",
      "Applying algorithm parameters...",
      "Calculating fairness scores...",
      "Running RNG selection...",
      "Verifying distribution...",
      "Generating AI confidence scores..."
    ];

    for (let i = 0; i < steps.length; i++) {
      await new Promise(resolve => setTimeout(resolve, 500));
      setSimulationProgress(((i + 1) / steps.length) * 100);
      toast.info(steps[i]);
    }

    // Generate AI selections based on algorithm
    const generateSelections = () => {
      const selections: Array<{ name: string; confidence: number }> = [];
      const usedNames = new Set<string>();
      
      // Select 4 winners
      for (let i = 0; i < 4; i++) {
        let candidate: string;
        do {
          candidate = candidatePool[Math.floor(Math.random() * candidatePool.length)];
        } while (usedNames.has(candidate));
        
        usedNames.add(candidate);
        
        // Calculate confidence based on algorithm
        let baseConfidence = 0.75;
        if (algorithm === "score") {
          baseConfidence = 0.80 + Math.random() * 0.15;
        } else if (algorithm === "weighted") {
          baseConfidence = 0.78 + Math.random() * 0.12;
        } else if (algorithm === "hybrid") {
          baseConfidence = 0.82 + Math.random() * 0.13;
        } else {
          baseConfidence = 0.70 + Math.random() * 0.20;
        }
        
        // Apply NeverWon booster
        if (neverWonBooster && Math.random() > 0.5) {
          baseConfidence += 0.05;
        }
        
        selections.push({
          name: candidate,
          confidence: Math.min(0.99, baseConfidence)
        });
      }
      
      // Sort by confidence descending
      return selections.sort((a, b) => b.confidence - a.confidence);
    };

    const newSelections = generateSelections();
    setAiSelections(newSelections);
    setShowSimulation(true);
    setIsRunning(false);
    setSimulationProgress(100);
    toast.success(`Simulation complete! Selected ${newSelections.length} winners.`);
  };

  const handleAIApprove = () => {
    toast.success("AI selections approved and recorded");
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold bg-gradient-to-r from-gold to-gold-glow bg-clip-text text-transparent drop-shadow-[0_0_8px_hsl(var(--gold-glow)/0.6)]">
          WinnerSelect AI
        </h2>
        <p className="text-muted-foreground">RNG & Prize Pool Analytics</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Generated RNG Results - Matching mockup */}
        <Card className="p-6 bg-card border border-border">
          <h3 className="text-lg font-bold mb-6 text-foreground">Generated RNG Results</h3>
          <div className="relative h-64">
            <svg className="w-full h-full" viewBox="0 0 400 200">
              {/* Grid */}
              <line x1="0" y1="0" x2="0" y2="200" stroke="hsl(var(--border))" strokeWidth="1" />
              <line x1="0" y1="200" x2="400" y2="200" stroke="hsl(var(--border))" strokeWidth="1" />
              
              {/* Y-axis grid lines */}
              {[0, 15, 50, 75, 100].map((val, i) => {
                const y = 200 - (val / 100) * 200;
                return (
                  <line key={i} x1="0" y1={y} x2="400" y2={y} stroke="hsl(var(--border))" strokeWidth="0.5" strokeDasharray="2,2" />
                );
              })}
              
              {/* Curve - matching mockup (starts low, peaks around 2PM, dips) */}
              <path
                d="M 40,180 L 80,170 L 120,160 L 180,120 L 240,60 L 300,50 L 360,70"
                fill="none"
                stroke="hsl(var(--primary))"
                strokeWidth="3"
                strokeLinecap="round"
              />
              
              {/* Data points */}
              {[
                { x: 40, y: 180 },
                { x: 80, y: 170 },
                { x: 120, y: 160 },
                { x: 180, y: 120 },
                { x: 240, y: 60 },
                { x: 300, y: 50 },
                { x: 360, y: 70 },
              ].map((point, i) => (
                <circle
                  key={i}
                  cx={point.x}
                  cy={point.y}
                  r="4"
                  fill="hsl(var(--primary))"
                />
              ))}
            </svg>
            {/* X-axis labels */}
            <div className="flex justify-between mt-2 text-xs text-muted-foreground">
              <span>10 AM</span>
              <span>6 PM</span>
              <span>9 PM</span>
              <span>2 PM</span>
              <span>4 PM</span>
              <span>8 PM</span>
            </div>
            {/* Y-axis labels */}
            <div className="absolute left-0 top-0 h-64 flex flex-col justify-between text-xs text-muted-foreground -ml-8">
              <span>100</span>
              <span>75</span>
              <span>50</span>
              <span>15</span>
              <span>0</span>
            </div>
          </div>
        </Card>

        {/* Prize Pool Statistics - Matching mockup */}
        <Card className="p-6 bg-card border border-border">
          <h3 className="text-lg font-bold mb-6 text-foreground">Prize Pool Statistics</h3>
          <div className="space-y-6">
            <div className="text-center py-4 bg-secondary/30 rounded-lg">
              <p className="text-sm text-muted-foreground mb-2">Grand prize</p>
              <p className="text-5xl font-bold text-primary">$1000</p>
            </div>

            <div className="text-center py-4 bg-secondary/30 rounded-lg">
              <p className="text-sm text-muted-foreground mb-2">Total of prizes</p>
              <p className="text-5xl font-bold text-foreground">18</p>
            </div>

            <div className="text-center py-4 bg-secondary/30 rounded-lg">
              <p className="text-sm text-muted-foreground mb-2">Probability of win</p>
              <p className="text-5xl font-bold text-primary">1 in 215</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Algorithm Controls */}
      <Card className="p-6 bg-card border border-border">
        <h3 className="text-lg font-bold mb-6 text-gold drop-shadow-[0_0_15px_hsl(var(--gold-glow)/0.8),0_0_30px_hsl(var(--gold-glow)/0.5)]">Algorithm Configuration</h3>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <Label className="text-sm font-semibold mb-3 block">Selection Algorithm</Label>
            <div className="space-y-2">
              {[
                { value: "random", label: "Random Selection", desc: "Pure RNG with no bias" },
                { value: "score", label: "Score-Based", desc: "Weighted by AI match scores" },
                { value: "weighted", label: "Weighted Distribution", desc: "Fair demographic balance" },
                { value: "hybrid", label: "Hybrid Approach", desc: "Combines multiple factors" },
              ].map((algo) => (
                <button
                  key={algo.value}
                  onClick={() => setAlgorithm(algo.value as any)}
                  className={`w-full text-left p-3 rounded-lg border transition-colors ${
                    algorithm === algo.value
                      ? "border-primary bg-primary/10"
                      : "border-border hover:border-primary/50"
                  }`}
                >
                  <p className="font-semibold text-sm mb-1">{algo.label}</p>
                  <p className="text-xs text-muted-foreground">{algo.desc}</p>
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <div className="flex items-center justify-between p-4 bg-secondary/30 rounded-lg">
              <div className="flex-1">
                <Label htmlFor="never-won" className="font-semibold">
                  NeverWon Booster
                </Label>
                <p className="text-xs text-muted-foreground mt-1">
                  Increase probability for users who haven't won yet
                </p>
              </div>
              <Switch
                id="never-won"
                checked={neverWonBooster}
                onCheckedChange={setNeverWonBooster}
              />
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-semibold">Fair Distribution Preview</Label>
              <div className="space-y-2">
                {[
                  { block: "Block A (18-24)", count: 4 },
                  { block: "Block B (25-34)", count: 5 },
                  { block: "Block C (35-44)", count: 5 },
                  { block: "Block D (45+)", count: 4 },
                ].map((block) => (
                  <div key={block.block} className="flex justify-between items-center text-sm p-2 bg-secondary/30 rounded">
                    <span>{block.block}</span>
                    <Badge variant="outline">{block.count} winners</Badge>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <Button
                onClick={handleRunSimulation}
                disabled={isRunning}
                className="w-full bg-gradient-to-r from-gold/90 via-gold-glow/90 to-gold/90 hover:from-gold hover:via-gold-glow hover:to-gold text-foreground font-semibold shadow-[0_0_30px_hsl(var(--gold-glow)/0.7),0_0_60px_hsl(var(--gold-glow)/0.5),inset_0_0_20px_hsl(var(--gold-glow)/0.3)] border-2 border-gold/50 hover:shadow-[0_0_40px_hsl(var(--gold-glow)/0.9),0_0_80px_hsl(var(--gold-glow)/0.7),0_0_120px_hsl(var(--gold-glow)/0.4)] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                size="lg"
              >
                {isRunning ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin drop-shadow-[0_0_8px_hsl(var(--gold-glow)/0.9),0_0_15px_hsl(var(--gold-glow)/0.6)]" />
                    Running Simulation...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 mr-2 drop-shadow-[0_0_8px_hsl(var(--gold-glow)/0.9),0_0_15px_hsl(var(--gold-glow)/0.6)]" />
                    Run Simulation
                  </>
                )}
              </Button>
              {isRunning && (
                <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-gold via-gold-glow to-gold transition-all duration-500"
                    style={{ width: `${simulationProgress}%` }}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </Card>

      {/* AI Selections - Matching mockup */}
      {showSimulation && (
        <Card className="p-6 bg-card border border-border">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-foreground">AI Selections</h3>
            <Button 
              onClick={handleAIApprove}
            >
              <Sparkles className="w-4 h-4 mr-2" />
              AI Approve
            </Button>
          </div>

          <div className="space-y-3">
            {aiSelections.map((selection, i) => (
              <div
                key={i}
                className="flex items-center justify-between p-4 bg-secondary/50 rounded-lg"
              >
                <div className="flex items-center gap-4">
                  <span className="text-2xl font-bold text-muted-foreground w-8">{i + 1}</span>
                  <span className="font-semibold">{selection.name}</span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <p className="text-xs text-muted-foreground">AI Confidence</p>
                    <p className="text-sm font-bold text-primary">
                      {(selection.confidence * 100).toFixed(0)}%
                    </p>
                  </div>
                  <div className="w-24 h-2 bg-muted rounded-full overflow-hidden">
                    <div
                      className="h-full bg-primary transition-all"
                      style={{ width: `${selection.confidence * 100}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 flex items-center justify-between p-4 bg-secondary/30 rounded-lg">
            <span className="font-semibold text-foreground">7D-Audit Tokens</span>
            <Badge variant="outline" className="text-lg px-4 py-2 border border-border">362</Badge>
          </div>
        </Card>
      )}
    </div>
  );
};

export default WinnerSelectTab;
