'use client';

import { GREETING_MESSAGE, getMessagesForCharacterAndMood } from '@/lib/messages';
import { useEffect, useState } from 'react';

import { MessageBubble } from '@/components/MessageBubble';
import { Mood } from '@/types/mood';
import { MoodButtons } from '@/components/MoodButtons';
import { Sprite } from '@/components/Sprite';
import { pickRandomNonRepeat } from '@/lib/random';

// Character list
const CHARACTERS = [
  { id: 'lyra', name: 'Lyra' },
  { id: 'vermione', name: 'Vermione' },
  { id: 'beach-sis', name: 'Beach Sis'},
  { id: 'captain-marvellous', name: 'Captain Marvellous'},
  { id: 'loanna', name: 'Loanna'},
  { id: 'polaf', name: 'Polaf'},

] as const;

type CharacterId = typeof CHARACTERS[number]['id'];

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
  const [currentCharacter, setCurrentCharacter] = useState<CharacterId>('lyra');
  const isTalking = useTalkOnMessage(message);

  // Load last mood and character from localStorage
  useEffect(() => {
    const savedCharacter = localStorage.getItem('lastCharacter') as CharacterId | null;
    const characterToUse = savedCharacter && CHARACTERS.some(c => c.id === savedCharacter)
      ? savedCharacter
      : 'lyra';

    if (savedCharacter && CHARACTERS.some(c => c.id === savedCharacter)) {
      setCurrentCharacter(savedCharacter);
    }

    const savedMood = localStorage.getItem('lastMood') as Mood | null;
    if (savedMood) {
      const messages = getMessagesForCharacterAndMood(characterToUse, savedMood);
      if (messages.length > 0) {
        setMessage(pickRandomNonRepeat(messages));
      }
    }
  }, []);

  const handleMoodPick = (mood: Mood) => {
    const messages = getMessagesForCharacterAndMood(currentCharacter, mood);
    const newMessage = pickRandomNonRepeat(messages, lastMessage);
    setMessage(newMessage);
    setLastMessage(newMessage);
    localStorage.setItem('lastMood', mood);
  };

  const handleNextCharacter = () => {
    const characterIds = CHARACTERS.map(c => c.id);
    const nextCharacter = pickRandomNonRepeat(characterIds, currentCharacter) as CharacterId;
    setCurrentCharacter(nextCharacter);
    localStorage.setItem('lastCharacter', nextCharacter);

    // Update message if there's a saved mood
    const savedMood = localStorage.getItem('lastMood') as Mood | null;
    if (savedMood) {
      const messages = getMessagesForCharacterAndMood(nextCharacter, savedMood);
      if (messages.length > 0) {
        const newMessage = pickRandomNonRepeat(messages);
        setMessage(newMessage);
        setLastMessage(newMessage);
      }
    }
  };

  const currentCharacterData = CHARACTERS.find(c => c.id === currentCharacter) || CHARACTERS[0];

  return (
    <main className="min-h-screen p-6 flex flex-col items-center justify-center">
      <h1 className="fancy-title text-4xl sm:text-5xl font-light text-center mb-2">
        My Helpful Voices Within
      </h1>
      <p className="text-center text-gray-500 mb-4">We are here to help you feel better.</p>

      <div className="relative flex flex-col sm:flex-row items-center justify-center gap-4 mb-2 pb-2">
        <div className="flex flex-col items-center">
          <h2 className="text-xl font-semibold mb-2 text-gray-700">{currentCharacterData.name}</h2>
          <Sprite
            srcBase={`/sprites/${currentCharacter}`}
            variant={isTalking ? 'talk' : 'idle'}
          />
        </div>
        <div className="flex flex-col items-center gap-2">
          <MessageBubble message={message} />
          <button
            onClick={handleNextCharacter}
            className="flex items-center justify-center w-12 h-12 rounded-full bg-white
                     shadow-md hover:shadow-lg transition-all
                     active:scale-95 focus:outline-none focus:ring-4 focus:ring-offset-2 focus:ring-yellow-300"
            aria-label="Next character"
          >
            <span className="text-2xl text-gray-500">→</span>
          </button>
        </div>
      </div>

      <div className="mt-6" style={{ marginTop: '50px' }}>
        <MoodButtons onPick={handleMoodPick} />
      </div>
    </main>
  );
}
