import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";
import { Mic, Square } from "lucide-react";
import AudioWaveform from "@/components/dashboard/AudioWaveform";
import { uploadSloganAudio, getSponsorConfig } from "@/lib/mocks/stubs";

/**
 * Tab 1: Live Slogan Recorder
 * 
 * TODO Integration Points:
 * - Replace uploadSloganAudio() with NeoCard/NeoVault uploader
 * - Replace getSponsorConfig() with Sponsor dashboard integration
 */
const LiveRecorderTab = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const [audioUrl, setAudioUrl] = useState<string>("");
  const timerRef = useRef<NodeJS.Timeout>();
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const maxDuration = 12; // seconds
  
  const sponsor = getSponsorConfig();

  // Cleanup audio URL to prevent memory leaks
  useEffect(() => {
    return () => {
      if (audioUrl) {
        URL.revokeObjectURL(audioUrl);
      }
    };
  }, [audioUrl]);

  // Cleanup stream and recorder on unmount
  useEffect(() => {
    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (isRecording) {
      timerRef.current = setInterval(() => {
        setRecordingTime((prev) => {
          if (prev >= maxDuration) {
            // Stop recording when max duration reached
            if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
              if (mediaRecorderRef.current.state === 'recording') {
                mediaRecorderRef.current.requestData();
              }
              mediaRecorderRef.current.stop();
            }
            return maxDuration;
          }
          return prev + 0.1;
        });
      }, 100);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isRecording]);

  // Keyboard shortcut: Ctrl+R to start/stop recording
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'r') {
        e.preventDefault();
        if (isRecording) {
          handleStop();
        } else if (!audioBlob || recordingTime < maxDuration) {
          handleStart();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isRecording, audioBlob, recordingTime]);

  const handleStart = async () => {
    if (isRecording) {
      return; // Already recording
    }

    try {
      // Request microphone access
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;

      // Determine the best audio MIME type
      let mimeType = 'audio/webm';
      if (!MediaRecorder.isTypeSupported(mimeType)) {
        mimeType = 'audio/webm;codecs=opus';
        if (!MediaRecorder.isTypeSupported(mimeType)) {
          mimeType = 'audio/mp4';
          if (!MediaRecorder.isTypeSupported(mimeType)) {
            mimeType = ''; // Use default
          }
        }
      }

      // Create MediaRecorder
      const mediaRecorder = new MediaRecorder(stream, {
        mimeType: mimeType || undefined,
      });
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      // Handle data available
      mediaRecorder.ondataavailable = (event) => {
        if (event.data && event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      // Handle recording stop
      mediaRecorder.onstop = () => {
        // Ensure we have chunks before creating blob
        if (audioChunksRef.current.length === 0) {
          console.warn("No audio chunks recorded");
          setIsRecording(false);
          toast.error("No audio recorded. Please try again.");
          if (streamRef.current) {
            streamRef.current.getTracks().forEach(track => track.stop());
            streamRef.current = null;
          }
          return;
        }

        const blobType = mediaRecorder.mimeType || 'audio/webm';
        const audioBlob = new Blob(audioChunksRef.current, { 
          type: blobType
        });
        
        // Verify blob was created and has content
        if (audioBlob.size === 0) {
          console.error("Created empty audio blob");
          setIsRecording(false);
          toast.error("Recording failed. Please try again.");
          if (streamRef.current) {
            streamRef.current.getTracks().forEach(track => track.stop());
            streamRef.current = null;
          }
          return;
        }

        console.log("Audio blob created:", { size: audioBlob.size, type: blobType });
        setAudioBlob(audioBlob);
        
        // Revoke old URL if exists
        if (audioUrl) {
          URL.revokeObjectURL(audioUrl);
        }
        
        const newAudioUrl = URL.createObjectURL(audioBlob);
        setAudioUrl(newAudioUrl);

        // Stop all tracks
        if (streamRef.current) {
          streamRef.current.getTracks().forEach(track => track.stop());
          streamRef.current = null;
        }

        // Ensure recording state is stopped
        setIsRecording(false);
        toast.success("Recording stopped");
      };

      // Handle errors
      mediaRecorder.onerror = (event) => {
        console.error('MediaRecorder error:', event);
        toast.error("Recording error occurred");
        handleStop();
      };

      // Start recording
      // Use timeslice to ensure chunks are collected regularly
      mediaRecorder.start(100); // Collect data every 100ms
      audioChunksRef.current = []; // Clear previous chunks
      setIsRecording(true);
      setRecordingTime(0);
      setAudioBlob(null);
      if (audioUrl) {
        URL.revokeObjectURL(audioUrl);
        setAudioUrl("");
      }
      toast.info("Recording started");
    } catch (error) {
      console.error("Error accessing microphone:", error);
      toast.error("Failed to access microphone. Please check permissions.");
    }
  };

  const handleStop = () => {
    if (!isRecording) {
      return; // Not recording
    }

    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
      // Request any remaining data before stopping
      if (mediaRecorderRef.current.state === 'recording') {
        mediaRecorderRef.current.requestData();
      }
      mediaRecorderRef.current.stop();
      // State will be updated in onstop handler
    } else {
      // Fallback: just stop if recorder isn't available
      setIsRecording(false);
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
        streamRef.current = null;
      }
    }
  };

  const handleSpeakAgain = () => {
    setRecordingTime(0);
    setAudioBlob(null);
    if (audioUrl) {
      URL.revokeObjectURL(audioUrl);
    }
    setAudioUrl("");
    setIsRecording(false);
    toast.info("Ready to record again");
  };

  const handleSubmit = async () => {
    if (!audioBlob) {
      toast.error("No recording to submit");
      return;
    }

    try {
      const meta = {
        uid: `UID-${Date.now()}`,
        sponsor: sponsor.name,
        timestamp: new Date().toISOString(),
        duration: recordingTime,
      };

      await uploadSloganAudio(audioBlob, meta);
      toast.success("Slogan submitted successfully!");
      handleSpeakAgain();
    } catch (error) {
      toast.error("Failed to submit slogan");
      console.error(error);
    }
  };

  return (
    <div className="space-y-6">
      {/* Main Recording Card - Matching mockup */}
      <Card className="relative bg-card border border-border rounded-lg p-8">
        <div className="max-w-md mx-auto text-center space-y-6">
          <h3 className="text-2xl font-bold text-foreground">Record a live slogan</h3>

          {/* Audio Waveform */}
          <div className="w-full">
            <AudioWaveform
              isRecording={isRecording}
              barCount={40}
              height={120}
            />
          </div>

          {/* Timer */}
          {(isRecording || recordingTime > 0) && (
            <div className="text-xl font-mono text-foreground">
              {recordingTime.toFixed(1)}s / {maxDuration}s
            </div>
          )}

          {/* Recording Button - Simple red circle with grey ring like mockup */}
          <div className="flex justify-center">
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                if (isRecording) {
                  handleStop();
                } else {
                  handleStart();
                }
              }}
              disabled={!isRecording && recordingTime >= maxDuration}
              className="relative w-24 h-24 rounded-full focus:outline-none focus:ring-2 focus:ring-primary disabled:opacity-50 disabled:cursor-not-allowed transition-transform hover:scale-105 active:scale-95 cursor-pointer z-10"
              aria-label={isRecording ? "Stop recording" : "Start recording"}
            >
              {/* Grey outer ring */}
              <div className="absolute inset-0 rounded-full border-4 border-muted pointer-events-none" />
              {/* Red inner circle */}
              <div className={`absolute inset-2 rounded-full transition-all pointer-events-none ${isRecording ? 'bg-recording animate-pulse' : 'bg-recording/80'}`} />
              {/* Icon */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
                {isRecording ? (
                  <Square className="w-6 h-6 text-white" fill="currentColor" />
                ) : (
                  <Mic className="w-6 h-6 text-white" />
                )}
              </div>
            </button>
          </div>

          <p className="text-foreground">Tap the button and speak your slogan</p>
        </div>
      </Card>

      {/* Audio Preview - Hidden in mockup but kept for functionality */}
      {audioUrl && audioBlob && (
        <Card className="p-4 bg-card border border-border">
          <audio 
            key={audioUrl}
            controls 
            src={audioUrl} 
            className="w-full"
            preload="auto"
            crossOrigin="anonymous"
            onError={(e) => {
              console.error("Audio playback error:", e);
              toast.error("Failed to play audio. The recording may be corrupted.");
            }}
          >
            Your browser does not support the audio element.
          </audio>
          <div className="flex gap-4 justify-center mt-4">
            <Button
              onClick={handleSpeakAgain}
              variant="outline"
              disabled={isRecording || !audioBlob}
              size="sm"
            >
              Speak Again
            </Button>
            <Button
              onClick={handleSubmit}
              disabled={isRecording || !audioBlob}
              size="sm"
            >
              Submit
            </Button>
          </div>
        </Card>
      )}

      {/* Recent Events - Matching mockup */}
      <Card className="p-6 bg-card border border-border">
        <h3 className="text-lg font-bold mb-4 text-foreground">Recent Events</h3>
        <div className="space-y-3">
          {[
            { event: "7d Token generated", location: "NeoCare Event", time: "2min ago" },
            { event: "Action recognized: \"Win on the fly!\"", location: "Airport Event", time: "1h ago" },
            { event: "Token created from 8 logged actions", location: "NeoCare Event", time: "2h ago" },
            { event: "AI Visit scheduled", location: "", time: "Yesterday" },
          ].map((item, i) => (
            <div key={i} className="flex justify-between items-start text-sm border-b border-border pb-3 last:border-0">
              <div className="flex-1">
                <p className="font-medium text-foreground">{item.event}</p>
                {item.location && <p className="text-muted-foreground text-xs mt-1">{item.location}</p>}
              </div>
              <span className="text-muted-foreground text-xs ml-4">{item.time}</span>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};

export default LiveRecorderTab;
