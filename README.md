# Feel Better 💛

A tiny, gentle single-page site with cute sprite animations and encouraging messages.

## Quick Start

```bash
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Features

- Three mood buttons: "I'm scared", "I'm tired", "I feel down"
- Randomized encouraging messages (12 per mood)
- Sprite animations with talk/idle states
- Mobile-first, accessible design
- Bright, sunny color palette

## Adding Sprites

### Folder Structure

Place sprite assets in:
```
public/sprites/<sprite-name>/idle.png
public/sprites/<sprite-name>/talk.png  (optional)
```

### Spritesheet Format

- **Format**: Single horizontal PNG with N frames
- **Dimensions**: Each frame should be square (e.g., 160x160 per frame)
- **Total width**: `frameCount × frameWidth` (e.g., 6 frames × 160px = 960px wide)
- **Height**: `frameHeight` (e.g., 160px)

Example for 6 frames:
- `idle.png`: 960px × 160px (6 frames horizontally)
- `talk.png`: 960px × 160px (optional, slightly different mouth/eyes)

### Using Sprites

In `app/page.tsx`, update the `Sprite` component:

```tsx
<Sprite
  srcBase="/sprites/your-sprite-name"
  variant={isTalking ? 'talk' : 'idle'}
  frameCount={6}  // Number of frames in your spritesheet
  frameRate={8}   // Animation speed (frames per second)
  size={160}      // Display size in pixels
/>
```

**Note**: If `talk.png` doesn't exist, the component will fall back to `idle.png` automatically.

## Adding New Moods

1. **Update the type** in `src/types/mood.ts`:
   ```ts
   export type Mood = "scared" | "tired" | "down" | "your-new-mood";
   ```

2. **Add messages** in `src/lib/messages.ts`:
   ```ts
   const messages: Record<Mood, string[]> = {
     // ... existing moods
     "your-new-mood": [
       "Message 1",
       "Message 2",
       // ... 10-15 messages
     ]
   };
   ```

3. **Add button** in `src/components/MoodButtons.tsx`:
   ```ts
   const moodConfig = {
     // ... existing configs
     "your-new-mood": { emoji: "😊", label: "Your label" },
   };
   ```

## Project Structure

```
src/
  app/
    page.tsx          # Main page with state management
    layout.tsx        # Root layout
    globals.css       # Tailwind + custom animations
  components/
    Sprite.tsx        # Sprite animation component
    MessageBubble.tsx # Message display with pop-in animation
    MoodButtons.tsx   # Three mood selection buttons
  lib/
    messages.ts       # Message pools per mood
    random.ts         # Random selection utility
  types/
    mood.ts           # Mood type definition
public/
  sprites/            # Sprite assets
    placeholder/
      idle.png        # Placeholder sprite (fallback to CSS if missing)
      talk.png        # Optional
```

## Technical Details

- **Framework**: Next.js 15 (App Router) with TypeScript
- **Styling**: Tailwind CSS v4 with custom CSS variables
- **State**: React hooks (useState, useEffect)
- **Accessibility**: ARIA labels, focus states, aria-live regions
- **Animation**: CSS keyframes with `steps()` for sprite animation

## Placeholder Sprite

Until you add real sprite assets, the component will show a yellow circular fallback. The sprite system is ready to use once you add your spritesheets!
