// ─────────────────────────────────────────────────────────────
// EVERY MOOD LIVES HERE. Edit any text freely.
//
// Each mood has:
//   label / emoji / sub      → what she sees on the mood card
//   greeting                 → the first line on that mood's page
//   notes                    → little notes from Nafay (she can shuffle them)
//   tools                    → the interactive bits on that page, in order
//   cat                      → which cat shows up ('hades' or 'percy') and what they say
//   theme                    → colours (Tailwind classes)
//
// Written from her own answers:
//  - when sad she wants space first, and comes to talk on her own
//  - never: "you're not alone", "I know you're going through a lot",
//    repeated lines, or assuming what she feels
//  - she likes roasting Nafay, long texts (sometimes a random 1-min voice note),
//    rainy days, chai, ice cream, chicken tenders & wings, ASMR, "princess"
//  - comfort songs: Tum & Pyaar by Murtaza Qizilbash
//  - Hades: introverted. Percy: mischievous. She has Percy energy lately.
// ─────────────────────────────────────────────────────────────

export const moods = [
  // ── HAPPY ────────────────────────────────────────────────
  {
    id: 'happy',
    emoji: '🥰',
    label: 'Happy',
    sub: 'good day, good vibes',
    greeting: 'YESSS. Happy princess is my favourite princess. Tell me everything.',
    notes: [
      "You laugh at everything, which is great news for my jokes. They need all the help they can get.",
      'Whatever happened today, I want the full story. Long text please. Paragraphs. Details.',
      "Save this mood somewhere. Screenshot it. Frame it. Show it to Hades so he learns what joy looks like.",
      "Happy you is my favourite notification.",
    ],
    tools: ['confetti', 'places', 'notes'],
    cat: {
      who: 'percy',
      lines: ['Percy is doing zoomies in your honour. 🐾', 'Percy demands the gossip. Percy is very mischievous about gossip.'],
    },
    theme: { bg: 'from-butter-100 via-peony-50 to-cream', card: 'from-butter-100 to-butter-200', accent: 'from-butter-400 to-peony-400' },
  },

  // ── COZY ─────────────────────────────────────────────────
  {
    id: 'cozy',
    emoji: '☕',
    label: 'Cozy',
    sub: 'content and sleepy',
    greeting: 'Content and sleepy is a perfect combination. Chai in hand, princess. Rain on.',
    notes: [
      'This is the best kind of day. Nothing to fix, nothing to do. Just exist nicely.',
      "If it's raining where you are right now, the universe is showing off for you specifically.",
      "Blanket. Chai. Something good on a very, very clean screen. You know the rules.",
      'Rest is a whole personality today. Embrace it.',
    ],
    tools: ['rain', 'song', 'notes'],
    cat: {
      who: 'hades',
      lines: ['Hades has been in cozy mode since birth. Welcome to the club. 😼', 'Hades will share the blanket. He will not share the chai.'],
    },
    theme: { bg: 'from-butter-50 via-cream to-forest-50', card: 'from-butter-100 to-forest-100', accent: 'from-forest-400 to-butter-400' },
  },

  // ── SAD ──────────────────────────────────────────────────
  {
    id: 'sad',
    emoji: '😔',
    label: 'Sad',
    sub: 'low, teary, heavy',
    greeting: "Take your space first, princess. Come find me whenever you feel like it.",
    notes: [
      "No speeches. No advice. When you want to talk, I'll just listen.",
      "You don't have to explain it, or even know what it is.",
      "Cry, sleep, watch something, ignore everyone. Any order works.",
      "Whenever you feel like talking, my phone is on loud. That's it, that's the note.",
    ],
    tools: ['space', 'song', 'vent', 'jokes'],
    cat: {
      who: 'percy',
      lines: [
        'Percy has climbed onto your lap. He is not leaving. That is the whole plan.',
        'Percy says: snacks are allowed. Percy says snacks are always allowed.',
        'Percy is purring as loudly as he possibly can.',
      ],
    },
    theme: { bg: 'from-icy-100 via-cream to-peony-50', card: 'from-icy-100 to-icy-200', accent: 'from-icy-400 to-icy-500' },
  },

  // ── EMPTY ────────────────────────────────────────────────
  {
    id: 'empty',
    emoji: '🌫️',
    label: 'Empty',
    sub: 'blank, meh, nothing',
    greeting: 'Nothing to explain and nothing to fix. You can just be here for a bit.',
    notes: [
      "Some days are just blank. You don't have to fill them with anything.",
      "You don't need a reason for feeling like this.",
      'Small things only today. One sip of chai counts as an achievement.',
      "I'm not going to ask what's wrong. If you want to say something, say anything. Even 'meh' is a full sentence.",
    ],
    tools: ['tiny', 'song', 'rain', 'notes'],
    cat: {
      who: 'hades',
      lines: ['Hades sits next to you. Says nothing. Perfect company.', 'Hades is also feeling meh. Hades always feels meh. He is thriving.'],
    },
    theme: { bg: 'from-icy-50 via-cream to-forest-50', card: 'from-icy-50 to-forest-50', accent: 'from-icy-400 to-forest-400' },
  },

  // ── STUDY EXHAUSTED ──────────────────────────────────────
  {
    id: 'study',
    emoji: '📚',
    label: 'Study exhausted',
    sub: 'brain fried',
    greeting: "Okay, brain is fried. Let's make it smaller: one tiny thing, then a break.",
    notes: [
      "You've been studying so much. That counts, even on days it feels like it doesn't.",
      'Drink some water. Unclench your jaw. Drop your shoulders. Okay. Continue.',
      "Your brain is a good brain. It just needs a break and some chicken tenders.",
      "Whatever the result, I'm proud of how hard you're trying. That part is already done.",
      'Studying hard and then texting me is my favourite routine of yours. 📚',
    ],
    tools: ['steps', 'break', 'notes'],
    cat: {
      who: 'hades',
      lines: ['Hades has never studied a day in his life. Hades is doing fine. Just saying.', 'Hades says: take a nap, the books will still be there.'],
    },
    theme: { bg: 'from-forest-50 via-butter-50 to-cream', card: 'from-forest-100 to-butter-100', accent: 'from-forest-400 to-forest-500' },
  },

  // ── MISSING YOU ──────────────────────────────────────────
  {
    id: 'missing',
    emoji: '🫂',
    label: 'Missing you',
    sub: 'wish you were here',
    greeting: "I miss you too. Probably more. Don't argue. 😌",
    notes: [
      "If you're missing me right now, I was probably thinking about you at the exact same time.",
      'Distance is just a number. A very annoying number. But still just a number.',
      "Text me whenever you miss me. I'll reply faster than Percy runs to his food bowl. 🐾",
      'I still think about that phone call. A lot. Probably more than I should admit.',
    ],
    tools: ['days', 'hug', 'openWhen', 'notes'],
    cat: {
      who: 'percy',
      lines: ['Percy volunteers as a temporary Nafay. He is smaller, cuter and more mischievous.', "Percy misses you even when you're in the next room."],
    },
    theme: { bg: 'from-peony-100 via-cream to-butter-50', card: 'from-peony-100 to-peony-200', accent: 'from-peony-400 to-peony-600' },
  },

  // ── ANGRY AT NAFAY ───────────────────────────────────────
  {
    id: 'angry',
    emoji: '😤',
    label: 'Angry at Nafay',
    sub: 'he did something (again)',
    greeting: "Sorry first. Then you're allowed to stay mad for as long as you want. Both are allowed.",
    notes: [
      "I'd rather you be mad and tell me than be quiet and annoyed.",
      "I'm not perfect. You knew that already. Now you have proof.",
      "Being mad at me doesn't change how much I like you. Not even a little.",
      "Take your time. I'll be here with an apology and a very long text with zero excuses.",
    ],
    tools: ['pillow', 'sorry', 'youreRight', 'punish', 'notes'],
    cat: {
      who: 'hades',
      lines: ["Hades has always said Nafay was suspicious. 😼", 'Hades supports you. Hades always supports you.'],
    },
    theme: { bg: 'from-peony-200 via-peony-50 to-butter-100', card: 'from-peony-200 to-peony-300', accent: 'from-peony-500 to-peony-600' },
  },

  // ── OVERTHINKING ─────────────────────────────────────────
  {
    id: 'anxious',
    emoji: '🌀',
    label: 'Overthinking',
    sub: 'the 2am kind',
    greeting: 'Ah, the 2am thoughts. Slow down with me for a minute. Breathe first, think later.',
    notes: [
      'Loud thoughts are not the same as true thoughts.',
      "You don't have to solve anything tonight. Just this one breath. Then the next one.",
      "Write it down, close the page, and look at it again in daylight. 2am thoughts never survive daylight.",
      'Overthinking is just your brain being too smart for its own good. Annoying, but impressive.',
    ],
    tools: ['breathe', 'ground', 'notes'],
    cat: {
      who: 'hades',
      lines: ['Hades never overthinks. Hades just naps. Be like Hades. 😼', 'Hades recommends: lie down, blink slowly, ignore everyone.'],
    },
    theme: { bg: 'from-icy-100 via-forest-50 to-cream', card: 'from-icy-100 to-forest-100', accent: 'from-icy-400 to-forest-400' },
  },

  // ── QUIET ────────────────────────────────────────────────
  {
    id: 'quiet',
    emoji: '🫥',
    label: 'Quiet',
    sub: "don't want to talk right now",
    greeting: "That's okay. No talking needed. I'll wait until you come back.",
    notes: [
      'No pressure, no questions, no double texts. (Okay, maybe one. I will try.)',
      "Going quiet is allowed. Your head is a nice place to be. I'll be here when you're out.",
      "I'm not mad and I'm not reading anything into it. Promise.",
    ],
    tools: ['notes', 'quietButtons'],
    cat: {
      who: 'hades',
      lines: ['Hades understands completely. Hades is an introvert too. Respect.', 'Hades will sit nearby. Not too close. Just nearby.'],
    },
    theme: { bg: 'from-forest-50 via-cream to-icy-50', card: 'from-forest-50 to-forest-100', accent: 'from-forest-400 to-forest-500' },
  },

  // ── BORED ────────────────────────────────────────────────
  {
    id: 'bored',
    emoji: '🙄',
    label: 'Bored',
    sub: 'entertain me',
    greeting: "Bored? Say less. I've prepared some extremely important activities.",
    notes: [
      'Option 1: clean your screen. Option 2: clean it again. You know you want to.',
      "You could also roast me. I'm right here. Unprotected. Defenceless.",
    ],
    tools: ['pop', 'wyr', 'question', 'jokes'],
    cat: {
      who: 'percy',
      lines: ['Percy suggests knocking something off a table. Works every time.', 'Percy is plotting something. Percy is always plotting something.'],
    },
    theme: { bg: 'from-butter-50 via-icy-50 to-peony-50', card: 'from-icy-100 to-butter-100', accent: 'from-icy-400 to-peony-400' },
  },

  // ── CAN'T SLEEP ──────────────────────────────────────────
  {
    id: 'sleepless',
    emoji: '🌙',
    label: "Can't sleep",
    sub: 'night owl hours',
    greeting: "Night owl hours, princess. Lights low, volume low. Let's get you sleepy.",
    notes: [
      'Put on an ASMR video, volume low, phone face down. Let someone tap on a microphone until you drift off.',
      "Whatever you're thinking about, it will still be there in the morning. And you'll be less tired then.",
      'Goodnight, princess. Sleep before Percy steals the entire pillow.',
      "You've done enough today. Your only job now is to rest.",
    ],
    tools: ['rain', 'breatheSlow', 'sheep', 'notes'],
    cat: {
      who: 'percy',
      lines: ['Percy is already asleep on your pillow. Take notes.'],
    },
    dark: true,
    theme: { bg: 'from-forest-900 via-forest-800 to-forest-900', card: 'from-forest-800 to-forest-700', accent: 'from-icy-400 to-forest-400' },
  },

  // ── CLINGY ───────────────────────────────────────────────
  {
    id: 'clingy',
    emoji: '🐾',
    label: 'Clingy',
    sub: 'need attention. now.',
    greeting: 'Percy energy detected. All the attention is yours.',
    notes: [
      "You're never too much. I like it when you're clingy. Don't tell anyone.",
      'If you want my attention, you have it. You always do.',
      "You said it yourself: you've got Percy energy lately. Hades is very offended.",
      "Percy is clingy, you're clingy. I'm outnumbered and I like it.",
    ],
    tools: ['hug', 'attention', 'notes'],
    cat: {
      who: 'percy',
      lines: ['Percy and you are the same person right now. Clingy, mischievous, adorable.', 'Percy is holding onto your sleeve. He will not let go.'],
    },
    theme: { bg: 'from-peony-100 via-cream to-icy-50', card: 'from-peony-100 to-icy-100', accent: 'from-peony-400 to-peony-500' },
  },

  // ── NOT ENOUGH ───────────────────────────────────────────
  {
    id: 'insecure',
    emoji: '🪞',
    label: 'Not feeling enough',
    sub: 'doubting myself',
    greeting: "I'm going to argue with that feeling. Respectfully. With evidence.",
    notes: [
      "I don't like some perfect version of you. I like you, exactly as you are.",
      "You're the prettier one. We've already settled this. It's on the record.",
      'Read the true things above again. Slowly. They were all written on purpose.',
    ],
    tools: ['truths', 'notes'],
    cat: {
      who: 'hades',
      lines: ['Hades does not like most people. Hades likes you. That should tell you everything.'],
    },
    theme: { bg: 'from-peony-50 via-butter-50 to-icy-50', card: 'from-peony-100 to-butter-100', accent: 'from-peony-400 to-butter-400' },
  },

  // ── NOT FEELING WELL ─────────────────────────────────────
  {
    id: 'unwell',
    emoji: '🤒',
    label: 'Not feeling well',
    sub: 'tired, achy, blah',
    greeting: "Aww, no. Today's only job: rest and be babied.",
    notes: [
      'Consider this my annoyingly caring text: have you had water? Have you eaten? Go do both. 💧',
      'Rest is not lazy. Rest is how you get better.',
      'Feel better soon, princess. If it gets worse, please tell someone at home or see a doctor, okay? 🤍',
    ],
    tools: ['rest', 'notes'],
    cat: {
      who: 'percy',
      lines: ['Percy has appointed himself your nurse. He is not qualified. He is very warm though.'],
    },
    theme: { bg: 'from-icy-50 via-cream to-forest-50', card: 'from-icy-100 to-forest-50', accent: 'from-icy-400 to-icy-500' },
  },

  // ── HUNGRY ───────────────────────────────────────────────
  {
    id: 'hungry',
    emoji: '🍗',
    label: 'Hungry',
    sub: 'snack time',
    greeting: "Hungry princess detected. Chicken tenders are probably the answer.",
    notes: [
      "Tenders or wings: the only hard decision you should make today.",
      "Hungry you and angry you are basically the same person. Let's not risk it.",
      'Ice cream counts as dessert, a snack, and emotional support. All three.',
    ],
    tools: ['snack', 'notes'],
    cat: {
      who: 'percy',
      lines: ['Percy smells chicken. Percy is coming. You have been warned.', 'Percy is also hungry. Percy is always hungry.'],
    },
    theme: { bg: 'from-butter-100 via-peony-50 to-cream', card: 'from-butter-100 to-peony-100', accent: 'from-butter-400 to-peony-500' },
  },

  // ── PANDA MODE ───────────────────────────────────────────
  {
    id: 'panda',
    emoji: '🐼',
    label: 'Panda mode',
    sub: 'lazy, sleepy, grumpy',
    greeting: 'Panda mode activated. Only Nafay knows about this. Your secret is safe. 🐼',
    notes: [
      'Pandas eat, sleep and roll around. They are still adored by literally everyone. So are you.',
      "You don't have to be productive today. Pandas aren't. Pandas are thriving.",
      'Grumpy panda is still my favourite panda.',
    ],
    tools: ['slip', 'notes', 'jokes'],
    cat: {
      who: 'percy',
      lines: ['Percy confirms: mama is a panda today. 😋'],
    },
    theme: { bg: 'from-forest-50 via-cream to-forest-100', card: 'from-cream to-forest-100', accent: 'from-forest-500 to-forest-600' },
  },
]

// ── Shared bits used across moods ─────────────────────────────

// she picked "roasting me" over silly jokes, so most of these roast Nafay
export const jokes = [
  "Nafay tried to be romantic once. Hades walked out of the room.",
  "Nafay's sense of humour is like a blurry screen. You'd want to clean it immediately.",
  "What do Nafay and slightly wet clothes have in common? Both are mildly annoying and somehow still around.",
  'Nafay says he is a good listener. He is. He just also talks for 40 minutes after.',
  "Nafay thinks he's mysterious. Percy figured him out in two seconds.",
  "Why doesn't Hades ever say sorry? Because he's never been wrong. Same as you, apparently. 😌",
  "I'd tell you a joke about Hades, but he wouldn't care.",
  "You rewatch World War Z for fun. Nafay rewatches your texts for fun. Who's more concerning?",
  "What do you call a panda that refuses to get out of bed? You, on a Sunday. 🐼",
  "Why did the overthinker bring a ladder? To finally get over it.",
  "If you were a cat you'd be a ragdoll. If Nafay were a cat he'd be the one that falls off the sofa and pretends it was on purpose.",
  "What's ice cream's favourite day of the week? Sundae. Nafay thinks this is his best joke. It is not.",
]

export const questions = [
  'If Hades and Percy could talk for one day, what would each of them say first?',
  'Tromsø, Cappadocia or Disney World: which one first, and why?',
  "What's a tiny thing that made you smile this week?",
  'If we opened a cat café, what would we name it?',
  "What's your most useless talent?",
  'Describe me in exactly three emojis. Be honest. Be mean.',
  'Tenders or wings, and what sauce? This is important.',
  'Which ASMR sound is the best one?',
  'What colour is your mood today?',
  'What is the most dramatic thing Percy has ever done?',
  'Roast me in one sentence. Go.',
]

export const wouldYouRather = [
  ['See the northern lights in Tromsø', 'Watch the hot air balloons in Cappadocia'],
  ['Have Percy talk', 'Have Hades talk'],
  ['Unlimited chicken tenders', 'Unlimited ice cream'],
  ['A rainy day with chai', 'A sunny beach day at sunset'],
  ['A perfectly clean screen forever', 'Never wear slightly wet clothes again'],
  ['Be a ragdoll cat for a day', 'Be a panda for a day'],
  ['A long text from me', 'A random 1-minute voice note from me'],
  ['Hades energy', 'Percy energy'],
]

export const openWhen = [
  { title: 'Open when you miss my voice', text: "Text me. Even if it's late. Even if it's just 'hi'. I might send a random 1-minute voice note back." },
  { title: 'Open when you think about that phone call', text: "Me too. More than you'd think." },
  { title: "Open when you can't remember why", text: 'June 4. You started talking to me, and slowly, then all at once, you became my favourite person.' },
  { title: 'Open when you need a promise', text: 'Har khushi har gham mein tera saath chahta rahoon. I meant every word. 🤍' },
]

export const sorryLevels = [
  'Slightly sorry. Not enough.',
  'Getting more sorry…',
  'Quite sorry now. Visibly nervous.',
  'Very sorry. Drafting a very long apology text.',
  'Extremely sorry. Has sent 14 sorry stickers.',
  'MAXIMUM SORRY. Offering a long text, a random voice note, and the right to be right forever. 🏳️',
]

export const punishments = [
  'a long text about why you were right 📝',
  'a random 1-minute voice note 🎙️',
  'a list of 10 things he likes about you 💌',
  'one hour of undivided attention',
  'letting you roast him with no comebacks',
  'admitting you were right, in writing',
]

export const truths = [
  'You care more deeply than most people ever will. That is rare.',
  'You laugh easily, which makes everyone around you feel funnier than they are. Especially me.',
  'You make Hades, a famously introverted cat, choose you. Do you know how hard that is?',
  "Percy thinks you're the entire world. Percy is a very good judge of character.",
  'You can be practical and still have the softest heart. Both. At once.',
  'You notice the tiniest blur on a screen. Imagine how much else you notice that nobody else does.',
  "You're the prettier one. It's on the record. Case closed.",
]

export const snacks = [
  'chicken tenders 🍗',
  'chicken wings 🍗',
  'ice cream 🍦',
  'tenders AND ice cream (separately, please) 🍗🍦',
  'chai and something crunchy ☕',
  'a proper meal first, then ice cream 🍽️',
  'whatever is in the fridge that nobody claimed 👀',
  'chocolate 🍫',
]

export const restList = [
  'Drink some water 💧',
  'Get under a blanket 🛌',
  'Phone on low brightness 📱',
  'Warm chai ☕',
  'A little bit of ice cream (medicinal) 🍦',
  'Let Percy sit on you 🐈',
  'Rest. Actually rest. 💤',
]

// tiny things for the "empty" mood: pick one, that's it
export const tinyThings = [
  'Make a cup of chai. Just the chai. Nothing else.',
  'Clean your screen until it sparkles. Very satisfying.',
  'Put on one ASMR video.',
  'Play Tum by Murtaza Qizilbash. Once.',
  'Open a window. Look outside for one minute.',
  'Find Percy. Bother him a little.',
  'Sit near Hades in silence. He will approve.',
  'Eat something. Tenders count.',
  'Change into dry, comfy clothes. Fully dry ones.',
  'Put on your comfiest socks.',
]

export const comfortSongs = [
  { title: 'Tum', artist: 'Murtaza Qizilbash' },
  { title: 'Pyaar', artist: 'Murtaza Qizilbash' },
]

export const dreamPlaces = [
  { name: 'Tromsø, Norway', emoji: '🌌', line: 'Northern lights dancing over snow. In winter the sun barely rises, so the sky gets to show off for months.' },
  { name: 'Cappadocia, Turkey', emoji: '🎈', line: 'Hundreds of hot air balloons floating up at sunrise over fairy-tale rock chimneys.' },
  { name: 'Walt Disney World, Florida', emoji: '🏰', line: 'Castles, fireworks, and being allowed to act like a kid all day. Princess-approved.' },
]

export const groundingSteps = [
  { n: 5, text: 'Name 5 things you can see around you.' },
  { n: 4, text: 'Notice 4 things you can feel (your clothes, the floor, a blanket).' },
  { n: 3, text: 'Listen for 3 things you can hear.' },
  { n: 2, text: 'Find 2 things you can smell. Bonus points if one is coffee beans.' },
  { n: 1, text: 'Think of 1 thing you like about yourself. (Need help? Check the "not feeling enough" page.)' },
]
