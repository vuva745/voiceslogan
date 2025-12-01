// Simple shared audio stream - prevents multiple requests

let sharedStream: MediaStream | null = null;
let refCount = 0;

export const getAudioStream = async (): Promise<MediaStream | null> => {
  if (sharedStream) {
    refCount++;
    return sharedStream;
  }

  try {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    sharedStream = stream;
    refCount = 1;
    return stream;
  } catch (error) {
    console.error('Failed to get audio stream:', error);
    return null;
  }
};

export const releaseAudioStream = () => {
  refCount--;
  if (refCount <= 0 && sharedStream) {
    sharedStream.getTracks().forEach(track => track.stop());
    sharedStream = null;
    refCount = 0;
  }
};


