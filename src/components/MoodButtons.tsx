import { Mood } from "@/types/mood";

interface MoodButtonsProps {
  onPick: (mood: Mood) => void;
}

const moodConfig = {
  scared: {
    emoji: "😰",
    label: "I'm scared",
    hoverBg: "#E8D5FF",
  },
  tired: {
    emoji: "😴",
    label: "I'm tired",
    hoverBg: "#D5E8FF",
  },
  down: {
    emoji: "😔",
    label: "I feel down",
    hoverBg: "#FFD5E8",
  },
} as const;

export function MoodButtons({ onPick }: MoodButtonsProps) {
  return (
    <div className="flex flex-row items-center justify-center gap-4 flex-wrap">
      {(Object.entries(moodConfig) as [Mood, typeof moodConfig[keyof typeof moodConfig]][]).map(([mood, config]) => (
        <button
          key={mood}
          onClick={() => onPick(mood)}
          className="mood-button"
          style={{
            padding: '12px 24px',
            borderRadius: '12px',
            border: '2px solid white',
            backgroundColor: 'rgba(255, 255, 255, 0.9)',
            color: '#333',
            fontSize: '16px',
            fontWeight: '500',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
            transition: 'all 0.2s ease-out',
            cursor: 'pointer',
            width: 'auto',
            minWidth: '150px',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = config.hoverBg;
            e.currentTarget.style.transform = 'translateY(-2px)';
            e.currentTarget.style.boxShadow = '0 6px 16px rgba(0, 0, 0, 0.2)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.9)';
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
          }}
          onMouseDown={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.15)';
          }}
          onMouseUp={(e) => {
            e.currentTarget.style.transform = 'translateY(-2px)';
            e.currentTarget.style.boxShadow = '0 6px 16px rgba(0, 0, 0, 0.2)';
          }}
          onFocus={(e) => {
            e.currentTarget.style.outline = '3px solid #FFD54F';
            e.currentTarget.style.outlineOffset = '2px';
          }}
          onBlur={(e) => {
            e.currentTarget.style.outline = 'none';
          }}
          aria-label={config.label}
        >
          <span style={{ fontSize: '24px', display: 'block', marginBottom: '4px' }}>{config.emoji}</span>
          {config.label}
        </button>
      ))}
    </div>
  );
}