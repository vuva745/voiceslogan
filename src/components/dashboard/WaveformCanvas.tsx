import { useEffect, useRef } from "react";

interface WaveformCanvasProps {
  isActive?: boolean;
  height?: number;
}

/**
 * WaveformCanvas - Live audio waveform visualization
 * 
 * Renders an animated waveform when active.
 * Uses canvas for high-performance rendering.
 */
const WaveformCanvas = ({ isActive = false, height = 120 }: WaveformCanvasProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();

  // Set canvas size to match container
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const updateSize = () => {
      // Get the parent container (the div wrapper)
      const container = canvas.parentElement?.parentElement;
      if (container) {
        const rect = container.getBoundingClientRect();
        const dpr = window.devicePixelRatio || 1;
        const containerWidth = rect.width || 800;
        const containerHeight = height || 192;
        
        canvas.width = containerWidth * dpr;
        canvas.height = containerHeight * dpr;
        canvas.style.width = `${containerWidth}px`;
        canvas.style.height = `${containerHeight}px`;
      } else {
        // Fallback if no container
        const dpr = window.devicePixelRatio || 1;
        canvas.width = 800 * dpr;
        canvas.height = height * dpr;
        canvas.style.width = '800px';
        canvas.style.height = `${height}px`;
      }
    };

    // Use requestAnimationFrame to ensure DOM is ready
    const rafId = requestAnimationFrame(() => {
      updateSize();
      // Also update after a short delay to catch any layout changes
      setTimeout(updateSize, 100);
    });
    
    window.addEventListener('resize', updateSize);
    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('resize', updateSize);
    };
  }, [height]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    let phase = 0;

    const draw = () => {
      const currentCanvas = canvasRef.current;
      if (!currentCanvas || !ctx) return;
      
      // Reset transform before clearing
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.clearRect(0, 0, currentCanvas.width, currentCanvas.height);
      
      // Scale for high DPI
      ctx.scale(dpr, dpr);

      // Always draw animated blue waveform (matching mockup - blue color)
      ctx.strokeStyle = "hsl(199 89% 48%)"; // Blue color from mockup
      ctx.lineWidth = 2.5;
      ctx.beginPath();

      const effectiveWidth = currentCanvas.width / dpr;
      const effectiveHeight = currentCanvas.height / dpr;
      const centerYPos = effectiveHeight / 2;
      const baseAmplitude = 40;
      
      for (let x = 0; x < effectiveWidth; x += 2) {
        const frequency = 0.012;
        const amplitude = baseAmplitude;
        
        // Multiple sine waves for richer waveform (blue like mockup)
        const y1 = Math.sin(x * frequency + phase) * amplitude;
        const y2 = Math.sin(x * frequency * 2.5 + phase * 1.5) * (amplitude * 0.65);
        const y3 = Math.sin(x * frequency * 0.6 + phase * 0.7) * (amplitude * 0.45);
        const y4 = Math.sin(x * frequency * 4 + phase * 2.2) * (amplitude * 0.25);
        
        const y = centerYPos + y1 + y2 + y3 + y4;

        if (x === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      }

      ctx.stroke();
      
      // Reset transform
      ctx.setTransform(1, 0, 0, 1, 0, 0);

      phase += 0.1;
      animationRef.current = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isActive, height]);

  return (
    <div className="w-full h-full relative">
      <canvas
        ref={canvasRef}
        className="absolute inset-0"
        style={{ display: 'block', width: '100%', height: '100%' }}
      />
    </div>
  );
};

export default WaveformCanvas;
