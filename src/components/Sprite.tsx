import { CSSProperties, useEffect, useState } from 'react';

interface SpriteProps {
  variant?: 'idle' | 'talk';
  srcBase: string;
  size?: number | string;
}

export function Sprite({
  variant = 'idle',
  srcBase,
  size = 100,
}: SpriteProps) {
  const [isIdle, setIsIdle] = useState(true);
  const [idleImageExists, setIdleImageExists] = useState(true);
  const [talkImageExists, setTalkImageExists] = useState(true);

  const idlePath = `${srcBase}/idle.png`;
  const talkPath = `${srcBase}/talk.png`;

  // Check if images exist
  useEffect(() => {
    const idleImg = new Image();
    idleImg.src = idlePath;
    idleImg.onload = () => setIdleImageExists(true);
    idleImg.onerror = () => setIdleImageExists(false);

    const talkImg = new Image();
    talkImg.src = talkPath;
    talkImg.onload = () => setTalkImageExists(true);
    talkImg.onerror = () => setTalkImageExists(false);
  }, [idlePath, talkPath]);

  // Auto-alternate between idle and talk every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setIsIdle(prev => !prev);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  // Override with variant prop if provided (for external control)
  useEffect(() => {
    if (variant === 'talk') {
      setIsIdle(false);
    } else if (variant === 'idle') {
      setIsIdle(true);
    }
  }, [variant]);

  const containerStyle: CSSProperties = {
    position: 'relative',
    width: size,
    height: size,
    backgroundColor: (!idleImageExists && !talkImageExists) ? '#FFD54F' : undefined,
    borderRadius: (!idleImageExists && !talkImageExists) ? '50%' : undefined,
  };

  const imageStyle: CSSProperties = {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundSize: 'contain',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    transition: 'opacity 0.8s ease-in-out',
  };

  return (
    <div
      role="img"
      aria-label="friendly helper sprite"
      className="sprite-container"
      style={containerStyle}
    >
      {idleImageExists && (
        <div
          style={{
            ...imageStyle,
            backgroundImage: `url(${idlePath})`,
            opacity: isIdle ? 1 : 0,
            zIndex: isIdle ? 2 : 1,
          }}
        />
      )}
      {talkImageExists && (
        <div
          style={{
            ...imageStyle,
            backgroundImage: `url(${talkPath})`,
            opacity: isIdle ? 0 : 1,
            zIndex: isIdle ? 1 : 2,
          }}
        />
      )}
    </div>
  );
}