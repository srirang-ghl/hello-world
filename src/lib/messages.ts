import { Mood } from "@/types/mood";

type CharacterId = 'lyra' | 'vermione' | 'beach-sis' | 'captain-marvellous' | 'loanna' | 'polaf';


const messages: Record<CharacterId, Record<Mood, string[]>> = {
  lyra: {
    scared: [
      "I know it feels like the storm is closing in, but breathe with me. Let the fear pass like snowflakes melting on warm hands.",
      "Even when everything feels frozen, your heart is stronger than the cold around you.",
      "Come closer. You’re safe here—nothing icy is going to take you.",
      "Let the fear go, just a little. You don’t have to face it alone.",
      "Storms look big until you take one calm breath. Start with that."
    ],
    tired: [
      "Rest, love. Even winter pauses to let the world breathe.",
      "You don’t have to be strong every moment—let the weight fall for now.",
      "Close your eyes. Feel the warmth slowly return to you.",
      "The world can wait. Your heart needs quiet more than anything right now.",
      "Let yourself melt into rest. There’s no pressure here."
    ],
    down: [
      "Some days feel like endless winter, but warmth always returns. Always.",
      "You’re allowed to feel low. I’m not going anywhere.",
      "Even when your world feels silent and cold, your light is still there.",
      "It’s okay if today feels heavy. Take my hand—we’ll walk slowly.",
      "Your heart has survived every winter so far. It’ll survive this one too."
    ]
  },

  vermione: {
    scared: [
      "Hey, breathe. Fear is just a thought—we can analyze it together.",
      "You’re not facing this alone. We’ll take it one logical step at a time.",
      "You’ve handled scarier things than this with far less preparation.",
      "It’s okay to feel frightened, but remember how capable you really are.",
      "Hold on. Let’s break this down gently, one calming breath at a time."
    ],
    tired: [
      "You’ve been carrying so much. Let your mind rest for a moment.",
      "Even the brightest mind needs quiet. Close your eyes for a bit.",
      "You’re allowed to stop and breathe. You don’t have to prove anything.",
      "Rest now. You can pick this up later with a clearer head.",
      "Sit with me for a moment. Your body is asking for care, not criticism."
    ],
    down: [
      "You’re not alone, even if your thoughts are heavy right now.",
      "Feeling low doesn’t make you weak—it makes you human.",
      "You’ve gotten through every dark moment before. You will again.",
      "Let’s take this slowly. There’s no rush to feel better instantly.",
      "You matter more than your mind is letting you believe right now."
    ]
  },

  'beach-sis': {
    scared: [
      "Hey babe… breathe with me. Imagine the tide washing the fear away.",
      "You’re safe. Hold onto me a sec—we’ll ride this wave together.",
      "Fear is just a splash. Stay close, it’ll pass quicker than you think.",
      "You’re not alone, okay? I’ve got you through this little storm.",
      "Let’s slow down. Inhale like the ocean. Exhale like the calm shore."
    ],
    tired: [
      "Girl, you’ve been swimming nonstop. Float for a bit—you deserve it.",
      "Let the tide slow. You don’t have to keep pushing right now.",
      "Take a breath and let your shoulders drop. Rest is part of the rhythm.",
      "Come sit with me. The ocean can wait for you.",
      "Even the strongest waves pull back to recharge. You can too."
    ],
    down: [
      "Low tide moments don’t last. You’ll rise again, I promise.",
      "Come here—let me remind you that you’re still glowing, even today.",
      "It’s okay to feel like you’re sinking a bit. I’m right here.",
      "The ocean always calms. Your heart will too, just give it a moment.",
      "You don’t have to smile right now. Just lean on me."
    ]
  },

  'captain-marvellous': {
    scared: [
      "Hey, it’s okay. Fear doesn’t mean you’re weak—it means you’re human.",
      "I’m right here. You’re not facing this mission alone.",
      "You’re stronger than the panic in your chest. Breathe—steady, soldier.",
      "Courage doesn’t show up before the fear. It shows up during it.",
      "Whatever you’re facing, you don’t have to do it alone."
    ],
    tired: [
      "Even heroes need to power down. Rest—you’ve earned it.",
      "Take a break, captain. The galaxy isn’t going anywhere.",
      "You don’t always need to push through. Sometimes retreat brings strength.",
      "Lie back for a moment. Your energy matters too.",
      "Powering up starts with slowing down. Let your body reset."
    ],
    down: [
      "Even the strongest fall sometimes. What matters is you’re still here.",
      "You don’t need to be a hero right now—just be you.",
      "You’re not alone in this fight. I’m right beside you.",
      "Bad days don’t define your worth. They never will.",
      "Lean on me until your strength returns. I’m not going anywhere."
    ]
  },

  loanna: {
    scared: [
      "Hey… look at me. Your courage runs deeper than this fear.",
      "You’re not alone. I’m right here in the canoe with you.",
      "This moment feels big, but your spirit is bigger.",
      "Take a breath. Let the ocean inside you calm again.",
      "Every voyage has scary moments. You’re still steering—beautifully."
    ],
    tired: [
      "Rest your paddle for a bit. You’ve traveled far.",
      "You don’t have to keep moving right now. The ocean can wait.",
      "It’s okay to pause. Even the stars rest behind clouds sometimes.",
      "Sit with me—we’ll breathe with the waves for a moment.",
      "Your journey is long, but there’s no rush. Let yourself slow down."
    ],
    down: [
      "Some waves hit harder, but they don’t take you under.",
      "You matter, even on the days you feel lost at sea.",
      "Your heart is stronger than you think. I believe in it.",
      "This is just one part of your voyage—not the whole story.",
      "You’re not drifting alone. I’m right here beside you."
    ]
  },

  polaf: {
    scared: [
      "Hey! Deep breath. Big warm hug incoming—I’m not going anywhere!",
      "It’s okay to feel scared. I get scared too… usually of pointy things!",
      "Hold on to me. Fear melts when we face it together.",
      "You’re safe. Nothing chilly is going to bother you right now.",
      "Let’s take one teeny tiny calm breath at a time, okay?"
    ],
    tired: [
      "Whew! Even snow need snoozes! Let’s take a tiny break together.",
      "You’ve done so much—time for a soft, cozy rest.",
      "Being tired is okay. Let’s just… flump. Yes. Flump right here.",
      "Let your body relax like fresh snow on the ground.",
      "You deserve a warm moment of stillness, my friend."
    ],
    down: [
      "Hey… I’m right here. Even cold days warm up eventually.",
      "You’re not alone. I have so many hugs saved just for you.",
      "It’s okay to have a melty heart sometimes. Feelings are normal!",
      "This heavy moment won’t last. Warmth always returns.",
      "You’re wonderful, even on your down days. Truly wonderful."
    ]
  }
};

export const getMessagesForCharacterAndMood = (characterId: CharacterId, mood: Mood): string[] => {
  return messages[characterId]?.[mood] || [];
};

export const GREETING_MESSAGE = "Hey there! You're safe here 💛";