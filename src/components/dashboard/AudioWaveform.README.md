# AudioWaveform Component

A complete, reusable audio waveform visualization component for the NeoCare VoiceSlogan Dashboard.

## Features

✨ **Real Microphone Input** - Uses Web Audio API for live audio analysis  
🎨 **Smooth Animations** - Framer Motion powered smooth bar animations  
🌊 **Teal/Cyan Glow** - Beautiful glowing bars matching the mockup design  
❄️ **Freeze on Stop** - Bars freeze at last position when recording stops  
💫 **Idle Animation** - Subtle breathing animation when not recording  
📱 **Responsive** - Works on all screen sizes  
♻️ **Reusable** - Easy to integrate anywhere  

## Installation

```bash
npm install framer-motion
```

## Basic Usage

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

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `isRecording` | `boolean` | **required** | Whether audio is currently being recorded |
| `barCount` | `number` | `40` | Number of bars to display (32-48 recommended) |
| `height` | `number` | `120` | Height of the waveform container in pixels |
| `className` | `string` | `''` | Additional CSS classes |

## Examples

### Example 1: Basic Usage

```tsx
import { useState } from 'react';
import AudioWaveform from '@/components/dashboard/AudioWaveform';
import { Button } from '@/components/ui/button';

function BasicExample() {
  const [isRecording, setIsRecording] = useState(false);

  return (
    <div>
      <AudioWaveform isRecording={isRecording} />
      <Button onClick={() => setIsRecording(!isRecording)}>
        {isRecording ? 'Stop' : 'Start'}
      </Button>
    </div>
  );
}
```

### Example 2: Custom Configuration

```tsx
<AudioWaveform
  isRecording={isRecording}
  barCount={48}      // More bars for finer detail
  height={150}       // Taller waveform
  className="w-full" // Full width
/>
```

### Example 3: In Live Feed Tab

```tsx
<Card className="p-6">
  <h3 className="text-lg font-bold mb-4">Incoming Slogans</h3>
  <AudioWaveform
    isRecording={isLive && !isPaused}
    barCount={40}
    height={192}
  />
  <Button
    variant="outline"
    className="w-full mt-4"
    onClick={togglePause}
  >
    {isLive && !isPaused ? 'STOP RECORDING' : 'START RECORDING'}
  </Button>
</Card>
```

### Example 4: In Live Recorder Tab

```tsx
<Card className="p-8">
  <h3 className="text-2xl font-bold text-center mb-6">
    Record a live slogan
  </h3>
  
  <AudioWaveform
    isRecording={isRecording}
    barCount={40}
    height={120}
    className="mb-6"
  />
  
  <button
    onClick={isRecording ? handleStop : handleStart}
    className="w-24 h-24 rounded-full bg-primary"
  >
    {isRecording ? <Square /> : <Mic />}
  </button>
</Card>
```

## How It Works

1. **Microphone Access**: When `isRecording={true}`, the component requests microphone access via `navigator.mediaDevices.getUserMedia()`

2. **Audio Analysis**: Uses Web Audio API (`AudioContext`, `AnalyserNode`) to analyze frequency data in real-time

3. **Data Processing**: Converts raw frequency data into normalized bar heights (0-100%)

4. **Smooth Animation**: Uses linear interpolation (lerp) to smooth bar height changes, preventing jumpy animations

5. **Visual Rendering**: Each bar is rendered with:
   - Teal/cyan gradient (`hsl(180 100% 50%)` to `hsl(180 100% 60%)`)
   - Glow effect using CSS box-shadow
   - Rounded ends for modern look
   - Framer Motion for smooth height transitions

6. **Idle State**: When `isRecording={false}`, bars freeze at last position with subtle breathing animation

## Styling

The component uses Tailwind CSS classes and can be customized via the `className` prop:

```tsx
<AudioWaveform
  isRecording={isRecording}
  className="rounded-xl border-2 border-primary/20"
/>
```

### Custom Colors

To change the bar color, modify the gradient in `AudioWaveform.tsx`:

```tsx
// Current (teal/cyan)
background: 'linear-gradient(to top, hsl(180 100% 50%), hsl(180 100% 60%))'

// Example: Blue
background: 'linear-gradient(to top, hsl(200 100% 50%), hsl(200 100% 60%))'

// Example: Green
background: 'linear-gradient(to top, hsl(150 100% 50%), hsl(150 100% 60%))'
```

## Browser Compatibility

- ✅ Chrome/Edge (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Requires HTTPS (or localhost) for microphone access

## Error Handling

The component automatically handles:
- Microphone permission denied
- Microphone not available
- Web Audio API not supported
- Network errors

Errors are displayed as a user-friendly message in the component.

## Performance

- **Update Rate**: ~60 FPS (16ms intervals)
- **Smoothing**: Linear interpolation prevents jumpy animations
- **Memory**: Efficient cleanup when component unmounts
- **CPU**: Optimized for smooth performance

## Troubleshooting

### Bars Not Animating
- Ensure `isRecording={true}`
- Check browser console for errors
- Verify microphone permissions
- Ensure site is served over HTTPS or localhost

### Microphone Permission Denied
- User must grant microphone access
- Check browser settings
- Try refreshing the page

### No Bars Visible
- Check that microphone is connected
- Verify Web Audio API support
- Check console for error messages

## Files

- `src/components/dashboard/AudioWaveform.tsx` - Main component
- `src/hooks/useAudioAnalyser.ts` - Web Audio API hook
- `src/components/dashboard/AudioWaveform.example.tsx` - Usage examples

## License

Part of the NeoCare VoiceSlogan Dashboard project.


