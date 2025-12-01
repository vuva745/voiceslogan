# NeoCare VoiceSlogan Dashboard

Production-ready frontend-only implementation of the VoiceSlogan Dashboard with 7 tabs. This is a UI-only implementation with clear integration points for backend services.

## 🎯 Overview

A modern, dark-themed dashboard for managing voice slogans with AI review, live feeds, analytics, and token export functionality. Built with React, TypeScript, and Tailwind CSS.

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

Navigate to `/#/` to see the dashboard.

## 📋 Features

### Tab 1: Live Slogan Recorder
- Real-time audio recording with waveform visualization
- 12-second maximum duration with countdown timer
- Sponsor overlay integration
- Audio preview and submission
- **Keyboard shortcut**: Ctrl+R (start/stop recording)

### Tab 2: Live Slogan Feed
- Real-time feed with SSE/websocket simulation
- Search and filtering by name, UID, transcript, sponsor
- Pause/resume live updates
- Expandable feed items with audio preview
- Send to AI review functionality

### Tab 3: AI VoiceMatch Review
- AI-powered voice analysis (match %, emotion, accuracy)
- Approve/flag/reject workflow
- Sortable match history
- Trends visualization
- **Keyboard shortcut**: Ctrl+A (approve selected)

### Tab 4: 7D Slogan Log
- Complete 7-day history table
- Blockchain proof viewing
- CSV and JSON export
- Hash verification UI
- Geo, timestamp, and device tracking

### Tab 5: Sponsor Insights
- Campaign performance metrics
- Top slogans leaderboard
- Demographic analytics (age, gender)
- Snapshot export functionality

### Tab 6: WinnerSelect AI
- RNG algorithm selection (Random, Score-based, Weighted, Hybrid)
- Fair distribution preview
- NeverWon booster toggle
- AI winner selection with confidence scores
- Prize pool statistics

### Tab 7: Token Engine / Export
- Token statistics dashboard
- Weekly generation chart
- Batch export with DAB™ packaging
- Hash verification per token
- Mock blockchain integration

## 🔌 Integration Points

All integration stubs are located in `src/lib/mocks/stubs.ts`. Each function is clearly marked with TODO comments and expected integration patterns.

### Required Replacements

#### 1. NeoVault Logger
```typescript
// Current stub
import { useNeoVaultLogger } from '@/lib/mocks/stubs'

// Replace with
import { useDataLogger } from '@/lib/neovault'
```

**Functions to replace:**
- `useNeoVaultLogger()` - Returns `{ logs, exportCSV, exportJSON }`
- Expected: Real datalogger hook from NeoVault

#### 2. NeoNode Live Feed
```typescript
// Current stub
import { useNeoNodeLiveFeed } from '@/lib/mocks/stubs'

// Replace with
import { useWebSocketFeed } from '@/lib/neonode'
```

**Functions to replace:**
- `useNeoNodeLiveFeed()` - Returns `{ items, isLive, togglePause }`
- Expected: Real websocket/SSE connection

#### 3. NeoCard/NeoVault Upload
```typescript
// Current stub
import { uploadSloganAudio } from '@/lib/mocks/stubs'

// Replace with
import { uploadAudio } from '@/lib/neocard'
```

**Function signature:**
```typescript
uploadSloganAudio(blob: Blob, meta: {
  uid: string,
  sponsor: string,
  timestamp: string,
  duration: number
}): Promise<{ success: boolean, id: string, url: string }>
```

#### 4. Sponsor Integration
```typescript
// Current stub
import { getSponsorConfig } from '@/lib/mocks/stubs'

// Replace with
import { getSponsorData } from '@/lib/sponsor'
```

**Returns:**
```typescript
{
  name: string,
  logo: string,
  tagline?: string
}
```

#### 5. AI Voice Matching
```typescript
// Current stub
import { callVoiceMatchAI } from '@/lib/mocks/stubs'

// Replace with
import { analyzeVoice } from '@/lib/neonode/ai'
```

**Returns:**
```typescript
{
  match: number,        // 0-100
  emotion: string,
  emotionIntensity: number,
  accuracy: number,
  passed: boolean,
  explainability: {
    topFeatures: string[]
  }
}
```

#### 6. Token Export
```typescript
// Current stub
import { exportTokensBatch } from '@/lib/mocks/stubs'

// Replace with
import { generateTokens } from '@/lib/token-engine'
```

**Returns:**
```typescript
{
  success: boolean,
  count: number,
  transactionHash: string,
  packageUrl: string
}
```

#### 7. Audit Integration
For approve/flag/reject actions in AI Review tab:

```typescript
// Add to AI Review tab
import { recordDecision } from '@/lib/audit'

// Call on approve/flag/reject
await recordDecision(uid, decision) // decision: "approve" | "flag" | "reject"
```

## 🎨 Design System

The dashboard uses a dark, tech-forward theme with teal/cyan accents. All design tokens are defined in:
- `src/index.css` - CSS custom properties
- `tailwind.config.ts` - Tailwind theme extensions

### Key Colors
- **Primary**: `hsl(180 65% 52%)` - Teal/cyan for CTAs and highlights
- **Background**: `hsl(192 30% 8%)` - Dark base
- **Card**: `hsl(192 28% 12%)` - Slightly lighter cards
- **Success**: `hsl(142 76% 36%)` - Green for success states
- **Recording**: `hsl(0 84% 60%)` - Red for recording indicator

### Typography
Modern sans-serif with monospace for data (UIDs, hashes, timestamps).

## ⌨️ Keyboard Shortcuts

- `1-7`: Switch between tabs
- `Ctrl+R`: Start/stop recording (Tab 1)
- `Ctrl+A`: Approve selected item (Tab 3)
- `Ctrl+E`: Export tokens (Tab 7)
- `Esc`: Close modals

## 🧪 QA Scenarios

### Scenario 1: Record and Submit Slogan
1. Navigate to Tab 1
2. Click record button (or press Ctrl+R)
3. Watch waveform animate and timer count up
4. Click stop at any point (or wait for 12s auto-stop)
5. Preview audio in player
6. Click "Submit" - should show success toast

### Scenario 2: Live Feed → AI Review → Approve
1. Navigate to Tab 2
2. Watch live feed populate with new items
3. Click an item to expand details
4. Click "Send to AI Review"
5. Navigate to Tab 3
6. Find the item in match history
7. Click approve button (green checkmark)
8. Should show success toast

### Scenario 3: View Proof and Export Log
1. Navigate to Tab 4
2. Click "View Proof" on any row
3. Modal shows blockchain proof details
4. Click "Re-verify Hash"
5. Close modal
6. Click "Export CSV" - success toast

### Scenario 4: Winner Selection Simulation
1. Navigate to Tab 6
2. Select an algorithm (e.g., Hybrid)
3. Toggle NeverWon booster
4. Click "Run Simulation"
5. View AI selections with confidence scores
6. Click "AI Approve" - success toast

### Scenario 5: Token Export with Verification
1. Navigate to Tab 7
2. Click "EXPORT TOKENS"
3. Wait for export to complete
4. DAB packaging preview modal appears
5. Click "Verify All" in verification table
6. Download tokens.json/tokens.zip

### Scenario 6: Sponsor Insights Export
1. Navigate to Tab 5
2. Review campaign metrics
3. Click "Export Snapshot"
4. Success toast confirms export

## 🎯 Accessibility

- All interactive elements are keyboard focusable
- ARIA labels on all buttons and controls
- Color contrast meets WCAG AA standards
- Screen reader announcements for state changes
- Focus trapping in modals
- Reduced motion respect for animations

## 📱 Responsive Design

- Desktop-first (1920px → 1280px → 1024px)
- Tablet support (768px)
- Mobile stacking (375px minimum)
- Tab labels adapt on small screens
- Tables scroll horizontally on mobile

## 🔧 Technical Stack

- **React 18** - Function components with hooks
- **TypeScript** - Full type safety
- **Tailwind CSS** - Utility-first styling
- **Radix UI** - Accessible components (via shadcn)
- **Lucide React** - Icon library
- **Sonner** - Toast notifications
- **Vite** - Build tool

## 📦 Component Structure

```
src/
├── pages/
│   ├── VoiceSloganDashboard.tsx    # Main shell with tab navigation
│   └── tabs/
│       ├── LiveRecorderTab.tsx
│       ├── LiveFeedTab.tsx
│       ├── AIReviewTab.tsx
│       ├── SevenDLogTab.tsx
│       ├── SponsorInsightsTab.tsx
│       ├── WinnerSelectTab.tsx
│       └── TokenExportTab.tsx
├── components/
│   ├── dashboard/
│   │   ├── WaveformCanvas.tsx      # Audio waveform visualization
│   │   └── FeedItem.tsx            # Individual feed item
│   └── ui/                         # shadcn components
├── lib/
│   └── mocks/
│       └── stubs.ts                # Integration stubs (REPLACE THESE)
└── index.css                        # Design system tokens
```

## 🚧 Known Limitations

1. **MediaRecorder not implemented** - Uses mock Blob for audio recording
2. **No real WebSocket** - Simulated with setInterval
3. **No blockchain verification** - Returns mock success/fail
4. **Charts use SVG** - Can be replaced with charting library if needed
5. **Waveform is simulated** - Real implementation needs Web Audio API

## 🔜 Production Checklist

- [ ] Replace all stubs in `src/lib/mocks/stubs.ts`
- [ ] Implement real MediaRecorder for audio capture
- [ ] Add WebSocket/SSE connection for live feed
- [ ] Integrate blockchain proof verification
- [ ] Add real token generation and packaging
- [ ] Implement HTML-to-canvas for snapshot export
- [ ] Add error boundary for production
- [ ] Set up analytics tracking
- [ ] Add loading states for async operations
- [ ] Implement pagination for large tables
- [ ] Add unit tests for critical paths

## 📞 Support

For integration questions or issues, contact the NeoCard/NeoVault/NeoNode team or refer to their respective documentation.

## 📄 License

This is a UI implementation for the NeoCare VoiceSlogan Dashboard. All rights reserved.
