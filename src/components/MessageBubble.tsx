'use client';

import { useEffect, useState } from 'react';

interface MessageBubbleProps {
  message: string;
}

export function MessageBubble({ message }: MessageBubbleProps) {
  const [displayedWords, setDisplayedWords] = useState<string[]>([]);

  useEffect(() => {
    // Reset when message changes
    setDisplayedWords([]);

    const words = message.split(' ');
    const timeouts: NodeJS.Timeout[] = [];

    // Show words one by one
    words.forEach((word, index) => {
      const timeout = setTimeout(() => {
        setDisplayedWords(prev => [...prev, word]);
      }, index * 150); // 150ms delay between each word
      timeouts.push(timeout);
    });

    // Cleanup timeouts if message changes
    return () => {
      timeouts.forEach(timeout => clearTimeout(timeout));
    };
  }, [message]);

  return (
    <div
      role="status"
      aria-live="polite"
      className="message-bubble chat-bubble animate-bob"
      style={{
        position: 'relative',
        backgroundColor: 'white',
        borderRadius: '20px',
        padding: '16px 20px',
        maxWidth: '320px',
        boxShadow: '0 4px 16px rgba(0, 0, 0, 0.15)',
        animation: 'pop-in 0.3s ease-out forwards, bob 3s ease-in-out 0.3s infinite',
      }}
    >
      <p style={{ margin: 0, fontSize: '16px', lineHeight: '1.5', color: '#333' }}>
        {displayedWords.map((word, index) => (
          <span key={index} style={{ animation: 'fadeIn 0.2s ease-in' }}>
            {word}
            {index < displayedWords.length - 1 && ' '}
          </span>
        ))}
      </p>
      {/* Chat bubble tail pointing left */}
      <div
        style={{
          position: 'absolute',
          left: '-10px',
          top: '50%',
          transform: 'translateY(-50%)',
          width: 0,
          height: 0,
          borderTop: '10px solid transparent',
          borderBottom: '10px solid transparent',
          borderRight: '10px solid white',
        }}
      />
    </div>
  );
}