/**
 * AudioWaveform Component - Example Usage
 * 
 * This file demonstrates how to use the AudioWaveform component
 * in your VoiceSlogan Dashboard.
 */

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import AudioWaveform from './AudioWaveform';
import { Mic, Square } from 'lucide-react';

/**
 * Example 1: Basic Usage
 */
export const BasicExample = () => {
  const [isRecording, setIsRecording] = useState(false);

  return (
    <Card className="p-6">
      <h3 className="text-lg font-bold mb-4">Basic Audio Waveform</h3>
      <AudioWaveform isRecording={isRecording} />
      <Button
        onClick={() => setIsRecording(!isRecording)}
        className="mt-4"
      >
        {isRecording ? 'Stop Recording' : 'Start Recording'}
      </Button>
    </Card>
  );
};

/**
 * Example 2: Custom Bar Count and Height
 */
export const CustomExample = () => {
  const [isRecording, setIsRecording] = useState(false);

  return (
    <Card className="p-6">
      <h3 className="text-lg font-bold mb-4">Custom Waveform (48 bars, 150px height)</h3>
      <AudioWaveform
        isRecording={isRecording}
        barCount={48}
        height={150}
      />
      <Button
        onClick={() => setIsRecording(!isRecording)}
        className="mt-4"
      >
        {isRecording ? 'Stop Recording' : 'Start Recording'}
      </Button>
    </Card>
  );
};

/**
 * Example 3: In Live Recorder Tab (Real-world usage)
 */
export const LiveRecorderExample = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);

  const handleStart = () => {
    setIsRecording(true);
    setRecordingTime(0);
  };

  const handleStop = () => {
    setIsRecording(false);
  };

  return (
    <Card className="p-8">
      <div className="max-w-2xl mx-auto space-y-6">
        <h3 className="text-2xl font-bold text-center">Record a live slogan</h3>
        
        {/* Waveform visualization */}
        <AudioWaveform
          isRecording={isRecording}
          barCount={40}
          height={120}
          className="w-full"
        />

        {/* Recording button */}
        <div className="flex justify-center">
          <button
            onClick={isRecording ? handleStop : handleStart}
            className={`
              relative w-24 h-24 rounded-full
              transition-all duration-300
              focus:outline-none focus:ring-2 focus:ring-primary
              ${isRecording 
                ? 'bg-destructive shadow-lg shadow-destructive/50' 
                : 'bg-primary shadow-lg shadow-primary/50 hover:shadow-xl'
              }
            `}
          >
            {isRecording ? (
              <Square className="w-8 h-8 text-white absolute inset-0 m-auto" />
            ) : (
              <Mic className="w-8 h-8 text-white absolute inset-0 m-auto" />
            )}
          </button>
        </div>

        {/* Timer */}
        {isRecording && (
          <p className="text-center text-lg font-mono">
            {Math.floor(recordingTime / 60)}:{(recordingTime % 60).toString().padStart(2, '0')}
          </p>
        )}

        <p className="text-center text-muted-foreground">
          {isRecording ? 'Recording... Click to stop' : 'Tap the button and speak your slogan'}
        </p>
      </div>
    </Card>
  );
};

/**
 * Example 4: In Live Feed Tab (Multiple waveforms)
 */
export const LiveFeedExample = () => {
  const [isRecording, setIsRecording] = useState(true);

  return (
    <div className="grid lg:grid-cols-2 gap-6">
      {/* First waveform */}
      <Card className="p-6">
        <h3 className="text-lg font-bold mb-4">Incoming Slogans</h3>
        <AudioWaveform
          isRecording={isRecording}
          barCount={40}
          height={192}
        />
        <Button
          variant="outline"
          className="w-full mt-4"
          onClick={() => setIsRecording(!isRecording)}
        >
          {isRecording ? 'STOP RECORDING' : 'START RECORDING'}
        </Button>
      </Card>

      {/* Second waveform */}
      <Card className="p-6">
        <h3 className="text-lg font-bold mb-4">Incoming Slogans</h3>
        <AudioWaveform
          isRecording={isRecording}
          barCount={40}
          height={192}
        />
      </Card>
    </div>
  );
};

/**
 * Example 5: Minimal Usage (Default props)
 */
export const MinimalExample = () => {
  const [isRecording, setIsRecording] = useState(false);

  return (
    <div>
      <AudioWaveform isRecording={isRecording} />
      <Button
        onClick={() => setIsRecording(!isRecording)}
        className="mt-2"
        size="sm"
      >
        Toggle
      </Button>
    </div>
  );
};


