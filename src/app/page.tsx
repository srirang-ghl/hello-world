'use client';

import { GREETING_MESSAGE, getMessagesForMood } from '@/lib/messages';
import { useEffect, useState } from 'react';

import { MessageBubble } from '@/components/MessageBubble';
import { Mood } from '@/types/mood';
import { MoodButtons } from '@/components/MoodButtons';
import { Sprite } from '@/components/Sprite';
import { pickRandomNonRepeat } from '@/lib/random';

function useTalkOnMessage(message: string) {
  const [isTalking, setIsTalking] = useState(false);

  useEffect(() => {
    setIsTalking(true);
    const timer = setTimeout(() => setIsTalking(false), 1200);
    return () => clearTimeout(timer);
  }, [message]);

  return isTalking;
}

export default function Home() {
  const [message, setMessage] = useState(GREETING_MESSAGE);
  const [lastMessage, setLastMessage] = useState<string>();
  const isTalking = useTalkOnMessage(message);

  // Load last mood from localStorage
  useEffect(() => {
    const savedMood = localStorage.getItem('lastMood') as Mood | null;
    if (savedMood) {
      const messages = getMessagesForMood(savedMood);
      setMessage(pickRandomNonRepeat(messages));
    }
  }, []);

  const handleMoodPick = (mood: Mood) => {
    const messages = getMessagesForMood(mood);
    const newMessage = pickRandomNonRepeat(messages, lastMessage);
    setMessage(newMessage);
    setLastMessage(newMessage);
    localStorage.setItem('lastMood', mood);
  };

  return (
    <main className="min-h-screen p-6 flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold text-center mb-4">
        How are you feeling?
      </h1>

      <div className="relative flex flex-row items-center justify-center gap-4 flex-wrap mb-2">
        <Sprite
          srcBase="/sprites/lyra"
          variant={isTalking ? 'talk' : 'idle'}
        />
        <MessageBubble message={message} />
      </div>

      <div className="mt-6" style={{ marginTop: '50px' }}>
        <MoodButtons onPick={handleMoodPick} />
      </div>
    </main>
  );
}
