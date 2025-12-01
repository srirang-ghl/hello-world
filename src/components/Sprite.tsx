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
  const [currentImageIndex, setCurrentImageIndex] = useState(0); // Index in existingImages array
  const [imageStates, setImageStates] = useState<Record<string, boolean>>({});
  const [existingImages, setExistingImages] = useState<string[]>([]);

  // Generate list of potential image names to check
  const generateImageList = (): string[] => {
    if (images) return images;

    const imageList: string[] = [];

    // Common names
    imageList.push('idle.png', 'talk.png');

    // Numbered patterns: 1.png, 2.png, etc. (up to 50)
    for (let i = 1; i <= 50; i++) {
      imageList.push(`${i}.png`);
    }

    // Frame patterns: frame1.png, frame2.png, etc. (up to 50)
    for (let i = 1; i <= 50; i++) {
      imageList.push(`frame${i}.png`);
    }

    return imageList;
  };

  // Check which images exist by attempting to load them
  useEffect(() => {
    const checkImages = async () => {
      const states: Record<string, boolean> = {};
      const imageList = generateImageList();
      const foundImages: string[] = [];

      // Check images in parallel batches to speed up discovery
      const batchSize = 10;
      for (let i = 0; i < imageList.length; i += batchSize) {
        const batch = imageList.slice(i, i + batchSize);
        const promises = batch.map(imageName => {
          return new Promise<{ name: string; exists: boolean }>((resolve) => {
            const img = new Image();
            const imagePath = `${srcBase}/${imageName}`;

            img.onload = () => {
              states[imageName] = true;
              foundImages.push(imageName);
              resolve({ name: imageName, exists: true });
            };
            img.onerror = () => {
              states[imageName] = false;
              resolve({ name: imageName, exists: false });
            };
            img.src = imagePath;
          });
        });

        await Promise.all(promises);

        // If we found images in this batch, continue; otherwise we might stop early
        // But let's check all to be thorough
      }

      // Sort found images: common names first, then numbered
      foundImages.sort((a, b) => {
        const aIsCommon = a === 'idle.png' || a === 'talk.png';
        const bIsCommon = b === 'idle.png' || b === 'talk.png';
        if (aIsCommon && !bIsCommon) return -1;
        if (!aIsCommon && bIsCommon) return 1;
        return a.localeCompare(b);
      });

      setImageStates(states);
      setExistingImages(foundImages);
      setCurrentImageIndex(0); // Reset to first image
    };

    checkImages();
  }, [srcBase, images?.join(',')]);

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