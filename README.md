# NeoCare VoiceSlogan Dashboard

Production-ready frontend-only implementation of the VoiceSlogan Dashboard with 7 tabs. This is a UI-only implementation backed by mock services in the repo.

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
