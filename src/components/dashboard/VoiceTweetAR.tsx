interface VoiceTweetARProps {
  unlockStatus: boolean;
  voicesloganCount: number;
  targetCount: number;
}

export function VoiceTweetAR({
  unlockStatus,
  voicesloganCount,
  targetCount,
}: VoiceTweetARProps) {
  const clampedTarget = Math.max(targetCount, 1);
  const percentage = Math.min(
    (voicesloganCount / clampedTarget) * 100,
    100
  );

  return (
    <div className="space-y-3">
      <h2 className="text-base font-semibold">VoiceTweet AR</h2>

      {/* Progress state */}
      <div className="space-y-1">
        <p className="text-sm text-muted-foreground">
          Progress: {voicesloganCount} / {clampedTarget} VoiceSlogans
        </p>
        <progress value={percentage} max={100} />
      </div>

      {/* Unlock state */}
      <div className="text-sm">
        {unlockStatus ? (
          <p className="font-medium">Unlock state: AR experience unlocked</p>
        ) : (
          <p>
            Unlock state:{" "}
            <span className="text-muted-foreground">
              {Math.max(clampedTarget - voicesloganCount, 0)} remaining to
              unlock
            </span>
          </p>
        )}
      </div>
    </div>
  );
}

