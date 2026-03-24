import { useEffect } from "react";
import { sendStatusToNeoCard } from "@/lib/mocks/stubs";

interface VoiceSloganProgressProps {
  voicesloganCount: number;
  targetCount: number;
  status: string;
}

export function VoiceSloganProgress({
  voicesloganCount,
  targetCount,
  status,
}: VoiceSloganProgressProps) {
  const percentage =
    targetCount > 0 ? Math.min((voicesloganCount / targetCount) * 100, 100) : 0;

  // Send current status to NeoCard integration stub
  useEffect(() => {
    sendStatusToNeoCard({ voicesloganCount, targetCount, status });
  }, [voicesloganCount, targetCount, status]);

  return (
    <div className="space-y-2">
      <h2 className="text-base font-semibold">VoiceSlogan Progress</h2>
      <p className="text-sm text-muted-foreground">
        Progress: {voicesloganCount} / {targetCount}
      </p>
      <progress value={percentage} max={100} />
      <p className="text-sm">
        Engagement: <span className="font-mono">{voicesloganCount}</span>
      </p>
      <p className="text-sm">
        Status: <span className="font-medium">{status}</span>
      </p>
    </div>
  );
}
