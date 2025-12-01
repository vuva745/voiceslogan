import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { getAudioStream, releaseAudioStream } from '@/lib/audio/simpleAudio';

interface AudioWaveformProps {
  isRecording: boolean;
  barCount?: number;
  height?: number;
  className?: string;
}

/**
 * AudioWaveform - Simple working audio waveform
 */
const AudioWaveform = ({
  isRecording,
  barCount = 40,
  height = 120,
  className = '',
}: AudioWaveformProps) => {
  const [barHeights, setBarHeights] = useState<number[]>(new Array(barCount).fill(8));
  const [error, setError] = useState<string | null>(null);
  const [isReady, setIsReady] = useState(false);

  const streamRef = useRef<MediaStream | null>(null);
  const contextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const animationRef = useRef<number | null>(null);
  const dataArrayRef = useRef<Uint8Array | null>(null);

  // Initialize audio
  useEffect(() => {
    let mounted = true;

    const init = async () => {
      try {
        // Get shared microphone stream
        const stream = await getAudioStream();
        if (!stream || !mounted) {
          if (stream) releaseAudioStream();
          return;
        }

        streamRef.current = stream;

        // Create audio context
        const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
        const context = new AudioContextClass();
        contextRef.current = context;

        if (context.state === 'suspended') {
          await context.resume();
        }

        // Create analyser
        const analyser = context.createAnalyser();
        analyser.fftSize = 2048;
        analyser.smoothingTimeConstant = 0.8;
        analyserRef.current = analyser;

        // Connect
        const source = context.createMediaStreamSource(stream);
        source.connect(analyser);

        // Data array
        const bufferLength = analyser.frequencyBinCount;
        dataArrayRef.current = new Uint8Array(bufferLength);

        if (mounted) {
          setIsReady(true);
          setError(null);
        }
      } catch (err) {
        if (mounted) {
          setError(err instanceof Error ? err.message : 'Microphone error');
          setIsReady(false);
        }
      }
    };

    init();

    return () => {
      mounted = false;
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
        animationRef.current = null;
      }
      if (contextRef.current) {
        contextRef.current.close().catch(() => {});
        contextRef.current = null;
      }
      analyserRef.current = null;
      dataArrayRef.current = null;
      releaseAudioStream();
    };
  }, []);

  // Animation loop
  useEffect(() => {
    if (!isReady || !analyserRef.current || !dataArrayRef.current) {
      return;
    }

    const update = () => {
      if (!analyserRef.current || !dataArrayRef.current) {
        return;
      }

      analyserRef.current.getByteFrequencyData(dataArrayRef.current);

      const bufferLength = analyserRef.current.frequencyBinCount;
      const heights = new Array(barCount).fill(0);
      const samplesPerBar = Math.floor(bufferLength / barCount);

      for (let i = 0; i < barCount; i++) {
        let sum = 0;
        const start = i * samplesPerBar;
        const end = Math.min(start + samplesPerBar, bufferLength);
        for (let j = start; j < end; j++) {
          sum += dataArrayRef.current[j];
        }
        const avg = sum / samplesPerBar;
        heights[i] = Math.min(100, Math.max(5, Math.round(avg * 1.5)));
      }

      setBarHeights(heights);
      animationRef.current = requestAnimationFrame(update);
    };

    update();

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
        animationRef.current = null;
      }
    };
  }, [isReady, barCount]);

  if (error) {
    return (
      <div
        className={`flex items-center justify-center rounded-lg bg-secondary/20 border border-destructive/20 ${className}`}
        style={{ height: `${height}px` }}
      >
        <p className="text-sm text-destructive px-4">{error}</p>
      </div>
    );
  }

  if (!isReady) {
    return (
      <div
        className={`flex items-center justify-center rounded-lg bg-secondary/20 ${className}`}
        style={{ height: `${height}px` }}
      >
        <div className="flex gap-1">
          {[0, 1, 2, 3, 4].map(i => (
            <div
              key={i}
              className="w-1 h-8 bg-primary/40 rounded-full animate-pulse"
              style={{ animationDelay: `${i * 0.1}s` }}
            />
          ))}
        </div>
      </div>
    );
  }

  const barWidth = 100 / barCount;
  const maxHeight = height * 0.85;

  return (
    <div
      className={`relative rounded-lg bg-secondary/20 border border-border/30 overflow-hidden ${className}`}
      style={{ height: `${height}px` }}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-secondary/10 to-transparent" />
      
      <div className="relative w-full h-full flex items-end justify-center gap-[2px] px-2 py-2">
        {barHeights.map((h, i) => {
          const barHeight = Math.max(6, (h / 100) * maxHeight);
          return (
            <motion.div
              key={i}
              className="flex-shrink-0 rounded-full"
              style={{
                width: `calc(${barWidth}% - 2px)`,
                minWidth: '2px',
                height: `${barHeight}px`,
                background: 'linear-gradient(to top, hsl(180 100% 50%), hsl(180 100% 60%))',
                boxShadow: `0 0 ${Math.max(2, barHeight * 0.1)}px hsl(180 100% 60% / 0.6)`,
              }}
              animate={{ height: `${barHeight}px` }}
              transition={{ duration: 0.1, ease: 'easeOut' }}
            />
          );
        })}
      </div>
    </div>
  );
};

export default AudioWaveform;

