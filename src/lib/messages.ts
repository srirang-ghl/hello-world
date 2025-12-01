import { Mood } from "@/types/mood";

type CharacterId = 'lyra' | 'vermione' | 'beach-sis' | 'captain-marvellous' | 'loanna' | 'polaf';

const messages: Record<CharacterId, Record<Mood, string[]>> = {
  lyra: {
    scared: [
      "Take a deep breath with me. You're safe right now 💛",
      "I'm here with you, and this feeling will pass",
      "You're braver than you know, and that's a fact!",
      "Let's focus on what's real right here, right now",
      "Your feelings are valid, and you're handling them well",
      "Remember: you've got through every scary moment before",
      "We can take this one tiny step at a time",
      "You're not alone in feeling this way, I promise",
      "Your strength is still there, even when you're scared",
      "This moment is temporary, and you are so resilient",
      "Let's ground ourselves together - feel your feet on the floor",
      "You've got this, and I'm right here with you"
    ],
    tired: [
      "Rest is not lazy - it's essential and you deserve it",
      "Your body is telling you something - it's okay to listen",
      "Take that break, the world can wait a moment",
      "Being tired means you've been showing up - that's brave",
      "Small steps still move us forward, rest when you need",
      "Your worth isn't measured by your productivity",
      "Sometimes the bravest thing is taking care of yourself",
      "Rest now, recharge, return stronger when you're ready",
      "It's okay to take things slower today",
      "Your energy is precious - protect it without guilt",
      "Even the sun sets to rest - you can too",
      "Honor your needs - tiredness is a valid feeling"
    ],
    down: [
      "These feelings are real, and they won't last forever",
      "You matter so much, even on the harder days",
      "It's okay to not be okay sometimes - I'm here",
      "Your feelings are valid, no matter what they are",
      "Small victories count - you're doing better than you think",
      "This is just a chapter, not your whole story",
      "The world is better with you in it, truly",
      "It's okay to take this one moment at a time",
      "You've made it through every hard day so far - 100% success rate!",
      "Your feelings are weather - they change, they pass",
      "I believe in you, especially when it's tough to believe in yourself",
      "You're not alone in this, even when it feels that way"
    ]
  },
  vermione: {
    scared: [
      "Hey, I see you're feeling scared. That's completely okay 💜",
      "Let's breathe together - in and out, slowly",
      "You're stronger than this fear, I know it",
      "I'm right here with you, you're not facing this alone",
      "These scary feelings will pass, they always do",
      "You've handled tough moments before - you can do this",
      "Let's take it one breath at a time, together",
      "Your courage is still there, even when it's hard to feel",
      "This feeling is temporary, and you are so capable",
      "We can get through this moment, step by step",
      "You're safe here, and I'm not going anywhere",
      "Remember your strength - it's still there, I promise"
    ],
    tired: [
      "You deserve rest, no questions asked 💜",
      "Listen to what your body needs - it knows best",
      "Taking a break isn't giving up, it's being smart",
      "You've been working hard - rest is your right",
      "It's okay to slow down and recharge",
      "Your value isn't tied to how much you do",
      "Resting is an act of self-care, not laziness",
      "Take the time you need - you'll come back stronger",
      "There's no shame in needing to rest",
      "Your energy is valuable - use it wisely",
      "Even the strongest need to rest sometimes",
      "Honor your body's need for rest - it's valid"
    ],
    down: [
      "I see you're feeling down, and that's okay 💜",
      "These feelings won't last forever, I promise",
      "You matter, even when it doesn't feel like it",
      "It's okay to not be okay - I'm here for you",
      "You're doing better than you think, really",
      "This is just one moment in your story",
      "The world needs you here, I mean that",
      "Take it one moment at a time, that's enough",
      "You've survived every bad day so far - that's amazing",
      "Feelings come and go, like clouds in the sky",
      "I believe in you, even when you can't believe in yourself",
      "You're not alone, even when it feels that way"
    ]
  },
  'beach-sis': {
    scared: [
      "Hey, I'm here with you! Let's ride this wave together 🌊",
      "Take a moment, breathe with the ocean rhythm - you've got this"
    ],
    tired: [
      "Rest is like the tide - it comes and goes, and that's natural 🌊",
      "You've been swimming hard - time to float and recharge"
    ],
    down: [
      "Even the ocean has calm days - this feeling will pass 🌊",
      "You're like a wave - you'll rise again, I promise"
    ]
  },
  'captain-marvellous': {
    scared: [
      "Ahoy! Every great captain faces storms - you'll navigate through this ⚓",
      "Steady as she goes! You're braver than you think, sailor"
    ],
    tired: [
      "Even the best captains need to drop anchor and rest ⚓",
      "You've been sailing hard - time to dock and recharge, captain"
    ],
    down: [
      "Rough seas don't last forever - smoother waters ahead, I promise ⚓",
      "You're a strong captain - you've weathered storms before, you'll weather this one too"
    ]
  },
  loanna: {
    scared: [
      "I see you're feeling scared - that's completely valid, and I'm here 💙",
      "Let's take this together, one step at a time. You're not alone"
    ],
    tired: [
      "Your body knows what it needs - rest is not a weakness, it's wisdom 💙",
      "It's okay to pause and recharge - you'll come back even stronger"
    ],
    down: [
      "These feelings are real, and they're also temporary - this will pass 💙",
      "You matter, and you're doing better than you think. I believe in you"
    ]
  },
  polaf: {
    scared: [
      "Hey, feeling scared is okay - let's face this together ❄️",
      "You're stronger than this fear. Take a deep breath - we'll get through this"
    ],
    tired: [
      "Rest is essential, like the quiet after a snowstorm ❄️",
      "You've been working hard - time to rest and let yourself recharge"
    ],
    down: [
      "Even the coldest days end - warmth always returns ❄️",
      "You're going through a tough time, but you're not alone. This feeling will pass"
    ]
  }
};

export const getMessagesForCharacterAndMood = (characterId: CharacterId, mood: Mood): string[] => {
  return messages[characterId]?.[mood] || [];
};

export const GREETING_MESSAGE = "Hey there! You're safe here 💛";