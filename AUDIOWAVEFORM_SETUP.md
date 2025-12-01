# AudioWaveform Component Setup

## Installation

The AudioWaveform component requires **Framer Motion** for smooth animations. Install it with:

```bash
npm install framer-motion
```

or

```bash
yarn add framer-motion
```

or

```bash
pnpm add framer-motion
```

## Files Created

1. **`src/hooks/useAudioAnalyser.ts`** - Custom hook for Web Audio API integration
2. **`src/components/dashboard/AudioWaveform.tsx`** - Main waveform component
3. **`src/components/dashboard/AudioWaveform.example.tsx`** - Usage examples

## Quick Start

```tsx
import AudioWaveform from '@/components/dashboard/AudioWaveform';

function MyComponent() {
  const [isRecording, setIsRecording] = useState(false);

  return (
    <AudioWaveform
      isRecording={isRecording}
      barCount={40}
      height={120}
    />
  );
}
```

## Component Props

```typescript
interface AudioWaveformProps {
  isRecording: boolean;      // Whether audio is currently being recorded
  barCount?: number;          // Number of bars (default: 40, range: 32-48)
  height?: number;           // Height in pixels (default: 120)
  className?: string;         // Additional CSS classes
}
```

## Features

✅ Real microphone input via Web Audio API  
✅ Smooth animated vertical bars  
✅ Teal/cyan glowing bars on dark background  
✅ Freezes when recording stops  
✅ Subtle idle animation when not recording  
✅ Responsive and reusable  
✅ Error handling for microphone permissions  
✅ Loading states  

## Browser Compatibility

- Requires modern browser with Web Audio API support
- Chrome, Firefox, Safari, Edge (latest versions)
- Requires HTTPS (or localhost) for microphone access

## Troubleshooting

### Microphone Permission Denied
- Check browser permissions
- Ensure site is served over HTTPS or localhost
- User must grant microphone access

### No Animation
- Ensure `isRecording` prop is `true`
- Check browser console for errors
- Verify Framer Motion is installed

### Bars Not Showing
- Check that microphone is connected
- Verify browser supports Web Audio API
- Check console for error messages


