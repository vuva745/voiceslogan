interface DigitalNeoCardProps {
  userId: string;
  campaignId: string;
  voicesloganCount: number;
  targetCount: number;
}

export function DigitalNeoCard({
  userId,
  campaignId,
  voicesloganCount,
  targetCount,
}: DigitalNeoCardProps) {
  const unlockStatus = voicesloganCount >= targetCount;
  const remaining = Math.max(targetCount - voicesloganCount, 0);

  return (
    <div>
      <h2>Digital NeoCard</h2>
      <p>User: {userId}</p>
      <p>Campaign: {campaignId}</p>
      <p>
        {voicesloganCount} / {targetCount} VoiceSlogans
      </p>
      {!unlockStatus ? (
        <p>{remaining} remaining to unlock</p>
      ) : (
        <p>Unlocked</p>
      )}
    </div>
  );
}

