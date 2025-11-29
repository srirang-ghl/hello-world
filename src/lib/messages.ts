import { Mood } from "@/types/mood";

const messages: Record<Mood, string[]> = {
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
};

export const getMessagesForMood = (mood: Mood): string[] => messages[mood];

export const GREETING_MESSAGE = "Hey there! You're safe here 💛";