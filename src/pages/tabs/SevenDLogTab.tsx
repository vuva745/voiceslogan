import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { useNeoVaultLogger } from "@/lib/mocks/stubs";
import { Download, FileJson, FileSpreadsheet, Shield } from "lucide-react";

/**
 * Tab 4: 7D Slogan Log
 * 
 * TODO Integration Points:
 * - Replace useNeoVaultLogger() with NeoVault datalogger script
 * - Add real blockchain proof verification
 */
const SevenDLogTab = () => {
  const { exportCSV, exportJSON } = useNeoVaultLogger();
  const [selectedLog, setSelectedLog] = useState<any>(null);
  
  // Mock logs matching mockup data
  const logs = [
    { id: "781413", geo: "NeoCare Event", time: "Apr 25, 06 1:02 am", timestamp: new Date().toISOString(), nurseId: "549", device: "NeoCam", aiMatch: 96, hash: "0x1234...", bioLayer: "BIO-12" },
    { id: "782411", geo: "Airport Event", time: "Apr 23, 05 11:10 am", timestamp: new Date().toISOString(), nurseId: "364", device: "NeoCam", aiMatch: 85, hash: "0x5678...", bioLayer: "BIO-34" },
    { id: "781412", geo: "NeoCare Event", time: "Apr 23, 04 11:45 am", timestamp: new Date().toISOString(), nurseId: "089", device: "NeoCam", aiMatch: 64, hash: "0x9abc...", bioLayer: "BIO-56" },
    { id: "781811", geo: "Airport Event", time: "Apr 26, 03 11:10 am", timestamp: new Date().toISOString(), nurseId: "312", device: "PUBLIC", aiMatch: 55, hash: "0xdef0...", bioLayer: "BIO-78" },
    { id: "781413", geo: "NeoCare Event", time: "Apr 25, 02 11:30 am", timestamp: new Date().toISOString(), nurseId: "312", device: "NeoCam", aiMatch: 88, hash: "0x1111...", bioLayer: "BIO-90" },
    { id: "432810", geo: "Airport Event", time: "Apr 24, 20 11:05 am", timestamp: new Date().toISOString(), nurseId: "278", device: "PUBLIC", aiMatch: 75, hash: "0x2222...", bioLayer: "BIO-11" },
    { id: "432752", geo: "Apr 27, 1 Event", time: "Apr 23, 20 2:15 pm", timestamp: new Date().toISOString(), nurseId: "278", device: "NeoCam", aiMatch: 79, hash: "0x3333...", bioLayer: "BIO-22" },
    { id: "432785", geo: "Apr 24, 1 Event", time: "Apr 22, 19 1:45 pm", timestamp: new Date().toISOString(), nurseId: "278", device: "NeoCam", aiMatch: 62, hash: "0x4444...", bioLayer: "BIO-33" },
    { id: "432818", geo: "Apr 23, 1 Event", time: "Apr 21, 18 3:30 am", timestamp: new Date().toISOString(), nurseId: "478", device: "PUBLIC", aiMatch: 76, hash: "0x5555...", bioLayer: "BIO-44" },
    { id: "432817", geo: "Apr 22, 1 Event", time: "Apr 19, 17 5:15 pm", timestamp: new Date().toISOString(), nurseId: "381", device: "S8KuEn", aiMatch: 55, hash: "0x6666...", bioLayer: "BIO-55" },
  ];

  const handleViewProof = (log: any) => {
    setSelectedLog(log);
  };

  const handleExportCSV = () => {
    exportCSV(logs);
    toast.success("CSV file downloaded");
  };

  const handleExportJSON = () => {
    exportJSON(logs);
    toast.success("JSON file downloaded");
  };

  const handleVerifyHash = (hash: string) => {
    // TODO: Replace with real blockchain verification
    console.log("Verifying hash:", hash);
    toast.success("Hash verified successfully");
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">7d Slogan Log</h2>
          <p className="text-muted-foreground">One-week Slogan Log</p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="text-lg px-4 py-2 border border-border">
            1,005 SLOGANS
          </Badge>
        </div>
      </div>

      {/* Export Actions */}
      <Card className="p-4 bg-card border border-border">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold">Export Options</h3>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={handleExportCSV}>
              <FileSpreadsheet className="w-4 h-4 mr-2" />
              Export CSV
            </Button>
            <Button variant="outline" size="sm" onClick={handleExportJSON}>
              <FileJson className="w-4 h-4 mr-2" />
              Export JSON
            </Button>
          </div>
        </div>
      </Card>

      {/* Data Table - Matching mockup */}
      <Card className="p-6 overflow-x-auto bg-card border border-border">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left py-3 px-4 text-sm font-semibold text-muted-foreground">UID</th>
              <th className="text-left py-3 px-4 text-sm font-semibold text-muted-foreground">GEO</th>
              <th className="text-left py-3 px-4 text-sm font-semibold text-muted-foreground">TIME</th>
              <th className="text-left py-3 px-4 text-sm font-semibold text-muted-foreground">NURSE ID</th>
              <th className="text-left py-3 px-4 text-sm font-semibold text-muted-foreground">DEVICE</th>
              <th className="text-left py-3 px-4 text-sm font-semibold text-muted-foreground">AI MATCH</th>
              <th className="text-left py-3 px-4 text-sm font-semibold text-muted-foreground">ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {logs.map((log) => (
              <tr key={log.id} className="border-b border-border/50 hover:bg-secondary/30 transition-colors">
                <td className="py-3 px-4 font-mono text-sm">{log.id}</td>
                <td className="py-3 px-4">
                  <p className="font-medium text-sm text-foreground">{log.geo}</p>
                </td>
                <td className="py-3 px-4">
                  <div className="text-sm">
                    <p>{log.time}</p>
                  </div>
                </td>
                <td className="py-3 px-4 font-mono text-sm">{log.nurseId}</td>
                <td className="py-3 px-4 text-sm">{log.device}</td>
                <td className="py-3 px-4">
                  <div className="flex items-center gap-2">
                    <div className="w-16 h-2 bg-muted rounded-full overflow-hidden">
                      <div
                        className={`h-full ${
                          log.aiMatch >= 75 ? "bg-success" :
                          log.aiMatch >= 50 ? "bg-warning" :
                          "bg-destructive"
                        }`}
                        style={{ width: `${log.aiMatch}%` }}
                      />
                    </div>
                    <span className="text-sm font-semibold">{log.aiMatch}%</span>
                  </div>
                </td>
                <td className="py-3 px-4">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleViewProof(log)}
                  >
                    <Shield className="w-4 h-4 mr-1" />
                    View Proof
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>

      {/* Proof Modal */}
      {selectedLog && (
        <div
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
          onClick={() => setSelectedLog(null)}
        >
          <Card
            className="max-w-2xl w-full p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold">Blockchain Proof</h3>
              <Button variant="ghost" size="sm" onClick={() => setSelectedLog(null)}>
                ✕
              </Button>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">UID</p>
                  <p className="font-mono text-sm">{selectedLog.id}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Timestamp</p>
                  <p className="text-sm">{selectedLog.timestamp}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Location</p>
                  <p className="text-sm">{selectedLog.geo}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Biometric Layer</p>
                  <p className="text-sm">{selectedLog.bioLayer}</p>
                </div>
              </div>

              <div>
                <p className="text-sm text-muted-foreground mb-1">Blockchain Hash</p>
                <div className="bg-secondary p-3 rounded font-mono text-xs break-all">
                  {selectedLog.hash}
                </div>
              </div>

              <div>
                <p className="text-sm text-muted-foreground mb-2">Verification Status</p>
                <Badge variant="default" className="bg-success">
                  ✓ Verified
                </Badge>
              </div>

              <div className="flex gap-2 pt-4">
                <Button
                  variant="outline"
                  onClick={() => handleVerifyHash(selectedLog.hash)}
                  className="flex-1"
                >
                  Re-verify Hash
                </Button>
                <Button
                  variant="outline"
                  onClick={() => toast.info("Re-publish initiated")}
                  className="flex-1"
                >
                  Re-publish
                </Button>
              </div>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
};

export default SevenDLogTab;
