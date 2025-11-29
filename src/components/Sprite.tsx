import { CSSProperties, useEffect, useState } from 'react';

interface SpriteProps {
  variant?: 'idle' | 'talk';
  srcBase: string;
  size?: number | string;
  images?: string[]; // Optional: specify image names, otherwise auto-detects common ones
}

export function Sprite({
  variant = 'idle',
  srcBase,
  size = 100,
  images,
}: SpriteProps) {
  // Default image list if not provided - tries common names
  const defaultImages = ['idle.png', 'talk.png', 'frame1.png', 'frame2.png', 'frame3.png', 'frame4.png', 'frame5.png'];
  const imageList = images || defaultImages;

  const [currentImageIndex, setCurrentImageIndex] = useState(0); // Index in existingImages array
  const [imageStates, setImageStates] = useState<Record<string, boolean>>({});
  const [existingImages, setExistingImages] = useState<string[]>([]);

  // Check which images exist
  useEffect(() => {
    const checkImages = async () => {
      const states: Record<string, boolean> = {};

      for (const imageName of imageList) {
        const img = new Image();
        const imagePath = `${srcBase}/${imageName}`;

        await new Promise<void>((resolve) => {
          img.onload = () => {
            states[imageName] = true;
            resolve();
          };
          img.onerror = () => {
            states[imageName] = false;
            resolve();
          };
          img.src = imagePath;
        });
      }

      setImageStates(states);
      const existing = imageList.filter(img => states[img]);
      setExistingImages(existing);
      setCurrentImageIndex(0); // Reset to first image
    };

    checkImages();
  }, [srcBase, imageList.join(',')]);

  // Cycle through all existing images every 3 seconds total
  useEffect(() => {
    if (existingImages.length <= 1) return;

    const totalDuration = 3000; // 3 seconds total
    const intervalPerImage = totalDuration / existingImages.length;

    const interval = setInterval(() => {
      setCurrentImageIndex(prev => (prev + 1) % existingImages.length);
    }, intervalPerImage);

    return () => clearInterval(interval);
  }, [existingImages]);

  // Override with variant prop if provided (temporary override, loop continues)
  useEffect(() => {
    if (existingImages.length === 0) return;

    if (variant === 'talk' && imageStates['talk.png']) {
      const talkIndex = existingImages.findIndex(img => img === 'talk.png');
      if (talkIndex !== -1) {
        setCurrentImageIndex(talkIndex);
        // After 1.2s, let the loop continue naturally
        const timer = setTimeout(() => {
          // Loop will continue from here
        }, 1200);
        return () => clearTimeout(timer);
      }
    } else if (variant === 'idle' && imageStates['idle.png']) {
      const idleIndex = existingImages.findIndex(img => img === 'idle.png');
      if (idleIndex !== -1) {
        setCurrentImageIndex(idleIndex);
      }
    }
  }, [variant, imageStates, existingImages]);

  const hasAnyImages = existingImages.length > 0;
  const currentImageName = existingImages[currentImageIndex] || existingImages[0];

  const containerStyle: CSSProperties = {
    position: 'relative',
    width: size,
    height: size,
    backgroundColor: !hasAnyImages ? '#FFD54F' : undefined,
    borderRadius: !hasAnyImages ? '50%' : undefined,
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
      {existingImages.map((imageName, index) => {
        const isActive = imageName === currentImageName;
        return (
          <div
            key={imageName}
            style={{
              ...imageStyle,
              backgroundImage: `url(${srcBase}/${imageName})`,
              opacity: isActive ? 1 : 0,
              zIndex: isActive ? existingImages.length : index,
            }}
          />
        );
      })}
    </div>
  );
}