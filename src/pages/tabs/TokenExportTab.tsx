import { useState, useEffect, useCallback, useMemo } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { exportTokensBatch } from "@/lib/mocks/stubs";
import { Download, Check, X, Package } from "lucide-react";
import JSZip from "jszip";

/**
 * Tab 7: Token Engine / Export
 * 
 * TODO Integration Points:
 * - Replace exportTokensBatch() with real token generation
 * - Add DAB™ packaging logic
 * - Implement hash verification against blockchain
 */
const TokenExportTab = () => {
  const [exporting, setExporting] = useState(false);
  const [showPackaging, setShowPackaging] = useState(false);
  const [verificationResults, setVerificationResults] = useState<Record<string, boolean>>({});

  const stats = {
    generated: 12548,
    exported: 0,
    valuePerToken: 30,
  };

  // Mock token data for export preview (memoized to prevent regeneration)
  const mockTokens = useMemo(() => 
    Array.from({ length: 5 }, (_, i) => ({
      id: `TKN-${1000 + i}`,
      hash: `0x${Math.random().toString(16).substr(2, 64)}`,
      value: stats.valuePerToken,
    })), []
  );

  const handleExportTokens = useCallback(async () => {
    setExporting(true);
    try {
      const result = await exportTokensBatch(mockTokens);
      toast.success(`Exported ${result.count} tokens`);
      setShowPackaging(true);
    } catch (error) {
      toast.error("Export failed");
      console.error("Export error:", error);
    } finally {
      setExporting(false);
    }
  }, [mockTokens]);

  // Keyboard shortcut: Ctrl+E to export tokens
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'e') {
        e.preventDefault();
        if (!exporting) {
          handleExportTokens();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [exporting, handleExportTokens]);

  const handleVerifyHash = (tokenId: string) => {
    // TODO: Replace with real blockchain verification
    const verified = Math.random() > 0.1; // 90% success rate for demo
    setVerificationResults((prev) => ({ ...prev, [tokenId]: verified }));
    toast[verified ? "success" : "error"](
      verified ? "Hash verified" : "Hash verification failed"
    );
  };

  const handleDownloadJSON = () => {
    const tokensData = {
      tokens: mockTokens,
      metadata: {
        format: "DAB™ v2.1",
        count: mockTokens.length,
        totalValue: mockTokens.length * stats.valuePerToken,
        exportDate: new Date().toISOString(),
      },
    };
    const blob = new Blob([JSON.stringify(tokensData, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "tokens.json";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast.success("tokens.json downloaded");
  };

  const handleDownloadZIP = async () => {
    try {
      const tokensData = {
        tokens: mockTokens,
        metadata: {
          format: "DAB™ v2.1",
          count: mockTokens.length,
          totalValue: mockTokens.length * stats.valuePerToken,
          exportDate: new Date().toISOString(),
        },
      };
      
      // Create ZIP file
      const zip = new JSZip();
      const jsonContent = JSON.stringify(tokensData, null, 2);
      
      // Add tokens.json to ZIP
      zip.file("tokens.json", jsonContent);
      
      // Add metadata file
      zip.file("metadata.txt", `DAB™ Package v2.1\nExport Date: ${tokensData.metadata.exportDate}\nToken Count: ${tokensData.metadata.count}\nTotal Value: €${tokensData.metadata.totalValue}`);
      
      // Generate ZIP file
      const zipBlob = await zip.generateAsync({ type: "blob" });
      
      // Download ZIP file
      const url = URL.createObjectURL(zipBlob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `tokens-${new Date().toISOString().split('T')[0]}.zip`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      toast.success("tokens.zip downloaded");
    } catch (error) {
      console.error("ZIP export error:", error);
      toast.error("Failed to create ZIP file");
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold bg-gradient-to-r from-gold to-gold-glow bg-clip-text text-transparent drop-shadow-[0_0_8px_hsl(var(--gold-glow)/0.6)]">
          Token Engine / Export
        </h2>
        <p className="text-muted-foreground">Manage and export tokens</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Token Stats - Matching mockup */}
        <Card className="p-6 bg-card border border-border">
          <h3 className="text-lg font-bold mb-6 text-foreground">TOKEN STATS</h3>
          <div className="space-y-6">
            <div>
              <p className="text-5xl font-bold mb-2">{stats.generated.toLocaleString()}</p>
              <p className="text-muted-foreground">Tokens Generated</p>
            </div>

            <div>
              <p className="text-5xl font-bold mb-2">{stats.exported}</p>
              <p className="text-muted-foreground">Tokens Exported</p>
            </div>

            <div>
              <p className="text-5xl font-bold mb-2">€{stats.valuePerToken}</p>
              <p className="text-muted-foreground">Value Per Token</p>
            </div>
          </div>
        </Card>

        {/* Token Export - Matching mockup */}
        <Card className="p-6 bg-card border border-border">
          <h3 className="text-lg font-bold mb-6 text-foreground">TOKEN EXPORT</h3>
          <div className="space-y-6">
            <div className="flex items-center justify-between py-4 bg-secondary/30 rounded-lg px-4">
              <div>
                <p className="font-semibold">Total Earnings:</p>
                <p className="text-sm text-muted-foreground">Date Range</p>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-primary">€ 376,440</p>
                <p className="text-sm text-muted-foreground">Last 7 Days</p>
              </div>
            </div>

            <Button
              onClick={handleExportTokens}
              disabled={exporting}
              size="lg"
              className="w-full"
            >
              {exporting ? (
                "Exporting..."
              ) : (
                <>
                  <Download className="w-4 h-4 mr-2" />
                  EXPORT TOKENS
                </>
              )}
            </Button>
          </div>
        </Card>
      </div>

      {/* Weekly Token Generation Chart - Matching mockup */}
      <Card className="p-6 bg-card border border-border">
        <h3 className="text-lg font-bold mb-6 text-foreground">WEEKLY TOKEN GENERATION</h3>
        <div className="relative h-64">
          <svg className="w-full h-full" viewBox="0 0 700 300">
            {/* Grid lines */}
            <line x1="0" y1="0" x2="0" y2="300" stroke="hsl(var(--border))" strokeWidth="1" />
            <line x1="0" y1="300" x2="700" y2="300" stroke="hsl(var(--border))" strokeWidth="1" />
            
            {/* Data points and lines - Matching mockup (SUN: ~100, MON: ~300, TUE: ~700, WED: ~1100, THU: ~1700, FRI: ~2400, SAT: ~2400) */}
            {[
              { x: 100, y: 280, val: 100 },   // SUN
              { x: 200, y: 260, val: 300 },   // MON
              { x: 300, y: 230, val: 700 },   // TUE
              { x: 400, y: 190, val: 1100 },  // WED
              { x: 500, y: 130, val: 1700 },  // THU
              { x: 600, y: 80, val: 2400 },   // FRI
              { x: 700, y: 80, val: 2400 },   // SAT
            ].map((point, i, arr) => (
              <g key={i}>
                {i < arr.length - 1 && (
                  <line
                    x1={point.x}
                    y1={point.y}
                    x2={arr[i + 1].x}
                    y2={arr[i + 1].y}
                    stroke="hsl(var(--primary))"
                    strokeWidth="3"
                    strokeLinecap="round"
                  />
                )}
                <circle
                  cx={point.x}
                  cy={point.y}
                  r="6"
                  fill="hsl(var(--primary))"
                />
              </g>
            ))}
          </svg>
          {/* X-axis labels */}
          <div className="flex justify-between mt-2 text-sm text-muted-foreground">
            <span>SUN</span>
            <span>MON</span>
            <span>TUE</span>
            <span>WED</span>
            <span>THU</span>
            <span>FRI</span>
            <span>SAT</span>
          </div>
          {/* Y-axis labels */}
          <div className="absolute left-0 top-0 h-64 flex flex-col justify-between text-xs text-muted-foreground -ml-10">
            <span>3,000</span>
            <span>2,000</span>
            <span>1,000</span>
            <span>200</span>
            <span>0</span>
          </div>
        </div>
      </Card>

      {/* Token Verification */}
      <Card className="p-6 bg-card border border-border">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-bold text-gold drop-shadow-[0_0_15px_hsl(var(--gold-glow)/0.8),0_0_30px_hsl(var(--gold-glow)/0.5)]">Token Batch Verification</h3>
          <Button
            variant="outline"
            size="sm"
            onClick={() => mockTokens.forEach((t) => handleVerifyHash(t.id))}
          >
            Verify All
          </Button>
        </div>
        <div className="space-y-2">
          {mockTokens.map((token) => (
            <div
              key={token.id}
              className="flex items-center justify-between p-4 bg-secondary/50 rounded-lg"
            >
              <div className="flex items-center gap-4 flex-1">
                <span className="font-mono text-sm font-semibold">{token.id}</span>
                <div className="flex-1 font-mono text-xs text-muted-foreground truncate">
                  {token.hash}
                </div>
              </div>
              <div className="flex items-center gap-3">
                {verificationResults[token.id] !== undefined && (
                  <Badge
                    variant={verificationResults[token.id] ? "default" : "destructive"}
                    className="gap-1"
                  >
                    {verificationResults[token.id] ? (
                      <>
                        <Check className="w-3 h-3" /> Verified
                      </>
                    ) : (
                      <>
                        <X className="w-3 h-3" /> Failed
                      </>
                    )}
                  </Badge>
                )}
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleVerifyHash(token.id)}
                  disabled={exporting}
                >
                  Verify Hash
                </Button>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* DAB Packaging Preview Modal */}
      {showPackaging && (
        <div
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
          onClick={() => setShowPackaging(false)}
        >
          <Card
            className="max-w-2xl w-full p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <Package className="w-6 h-6 text-primary" />
                <h3 className="text-xl font-bold">DAB™ Packaging Preview</h3>
              </div>
              <Button variant="ghost" size="sm" onClick={() => setShowPackaging(false)}>
                ✕
              </Button>
            </div>

            <div className="space-y-4">
              <div className="bg-secondary/50 p-4 rounded-lg">
                <p className="text-sm text-muted-foreground mb-2">Package Metadata</p>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div>
                    <span className="text-muted-foreground">Format:</span> DAB™ v2.1
                  </div>
                  <div>
                    <span className="text-muted-foreground">Tokens:</span> {mockTokens.length}
                  </div>
                  <div>
                    <span className="text-muted-foreground">Total Value:</span> €{mockTokens.length * stats.valuePerToken}
                  </div>
                  <div>
                    <span className="text-muted-foreground">Compression:</span> GZIP
                  </div>
                </div>
              </div>

              <div className="bg-secondary/50 p-4 rounded-lg">
                <p className="text-sm text-muted-foreground mb-2">Transaction Hash (Mock)</p>
                <p className="font-mono text-xs break-all">
                  0x{Math.random().toString(16).substr(2, 64)}
                </p>
              </div>

              <div className="flex gap-2 pt-4">
                <Button variant="outline" className="flex-1" onClick={handleDownloadJSON}>
                  <Download className="w-4 h-4 mr-2" />
                  Download tokens.json
                </Button>
                <Button variant="outline" className="flex-1" onClick={handleDownloadZIP}>
                  <Download className="w-4 h-4 mr-2" />
                  Download tokens.zip
                </Button>
              </div>

              <Button
                variant="default"
                className="w-full"
                onClick={() => toast.info("Mock explorer link")}
              >
                View on Block Explorer
              </Button>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
};

export default TokenExportTab;
