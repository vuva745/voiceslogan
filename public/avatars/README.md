# Avatar Images Folder

This folder contains avatar images for user profiles in the VoiceSlogan Dashboard.

## Usage

Place avatar images (PNG, JPG, or SVG format) in this folder and reference them in your components.

## Example

```tsx
<img 
  src="/avatars/user-avatar.png" 
  alt="User avatar"
  className="w-12 h-12 rounded-full"
/>
```

## Current Avatars

The dashboard currently uses avatar URLs from external services (dicebear.com) for mock data. To use local avatars:

1. Add avatar images to this folder
2. Update the avatar URLs in the mock data or components
3. Reference them using `/avatars/filename.ext`

## Recommended Image Specifications

- **Format**: PNG or JPG
- **Size**: 200x200px or larger (square)
- **Aspect Ratio**: 1:1 (square)
- **File Size**: Keep under 100KB for performance


