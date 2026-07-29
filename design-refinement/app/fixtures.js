// Local content fixtures for the two sample programme worlds.
// All content is illustrative sprint material — not final copy, not medical advice.

// Day states used by journey visualisations:
//  'done' | 'missed' | 'mended' (missed then recovered) | 'rest' | 'today' | 'future'

function week(n, title, focus) {
  return { n, title, focus };
}

// A deterministic journey log shared by both worlds so directions can be
// compared like-for-like. Position: week 3 underway (day 2 of the week).
// Week 2 contains one mended day so recovery marks are visible in journey views.
export function journeyLog(currentWeek, currentDayOfWeek) {
  const weeks = [];
  for (let w = 1; w <= 12; w++) {
    const days = [];
    for (let d = 1; d <= 7; d++) {
      if (w < currentWeek) {
        if (w === 2 && d === 4) days.push('mended');
        else if (d === 7) days.push('rest');
        else days.push('done');
      } else if (w === currentWeek) {
        if (d < currentDayOfWeek) days.push('done');
        else if (d === currentDayOfWeek) days.push('today');
        else days.push('future');
      } else {
        days.push('future');
      }
    }
    weeks.push(days);
  }
  return weeks;
}

const SUBSCRIPTION = {
  headline: 'One programme. Twelve weeks. One price.',
  price: '£44.99',
  per: 'once, for the twelve-week programme',
  monthlyAlt: 'or £16.99 a month while you keep it — £50.97 over the same twelve weeks, renews monthly until you cancel',
  trial: 'Week One is free — a real week of the programme, not a tour. No card is needed for Week One, and nothing is ever charged without asking you first.',
  includes: [
    'The full twelve-week programme, one day at a time',
    'Every “show me how”, alternative and recovery path',
    'Your record of the twelve weeks — a certificate of what you did, kept forever',
  ],
  terms: [
    'The price is the price. No introductory rate that rises later.',
    'Cancel any time from this screen — we show you exactly where, and it takes about as long as subscribing did.',
    'If you cancel, everything you made stays yours to keep and export.',
    'The full terms, privacy policy and refund policy live one tap away, in readable English.',
  ],
  renewal: 'The one-off price never renews by itself. It renews only if you begin another programme — and we will ask first.',
  cancelBeside:
    'Cancelling is one screen away, any time — Programme & Support → Membership. It takes about as long as subscribing did, and everything you made stays yours.',
};

// Programme & Support hub (R1) — shared by both worlds.
const SUPPORT = {
  title: 'Programme & Support',
  intro: 'Membership, pace and help — one quiet place. No settings maze.',
  rows: [
    { title: 'Membership', note: '£44.99 once · Week One free', go: 'subscription' },
    { title: 'Change my weekly days', note: 'same programme, a calendar that fits', go: 'long-absence' },
    { title: 'Pause the programme', note: 'your place and record kept', go: 'programme-pause' },
    { title: 'Restore purchase', note: 'from this or another device', go: 'restore' },
  ],
  help: {
    title: 'Help',
    line: 'Write to hello@twelveweeks.example — a person reads it, usually the same day. There is no chatbot to get past.',
  },
  termsLine: 'The full terms, privacy policy and refund policy live one tap away, in readable English.',
};

export const WORLDS = {
  strength: {
    id: 'strength',
    name: 'Beginner Strength Foundations',
    short: 'Strength',
    programme: {
      title: 'Foundations of Strength',
      subtitle: 'Twelve weeks from “I sit down carefully” to “I trust my body again.”',
      promise:
        'Strength-led, not weight-loss-led. You will learn six movements your body was built for, one pattern at a time, with support until you no longer need it.',
      whoFor: [
        'Adults starting from little or no training — including in your 60s and 70s',
        'People returning after years away, injury-cautious and short on confidence',
        'Anyone who wants capability — stairs, floors, luggage, grandchildren — over aesthetics',
      ],
      expectations: [
        'About 15–25 minutes on programme days, five days a week',
        'No gym required until week 8, and even then it stays optional',
        'Mild muscle effort is expected; sharp joint pain never is — every action has a gentler form',
        'Progress is measured in what you can do, not what you weigh',
      ],
      notFor:
        'This programme is general conditioning, not medical care. If you are recovering from surgery, managing a heart condition, have had a fall or blackout in the last year, or have been told to limit exertion, talk to your clinician before starting.',
    },
    weeks: [
      week(1, 'Standing Tall', 'Posture, breath and balance — the ground floor of every lift'),
      week(2, 'The Hinge', 'Bending from the hips, sparing the back'),
      week(3, 'The Squat', 'Sitting and rising with control — supported first'),
      week(4, 'The Push', 'Wall to counter to floor, at your pace'),
      week(5, 'The Pull', 'Rows and carries for a back that holds you up'),
      week(6, 'The Carry', 'Strength you take to the shops'),
      week(7, 'Patterns Together', 'Two movements become one session'),
      week(8, 'Adding Load', 'The first deliberate weight — only what you can control'),
      week(9, 'Tempo & Control', 'Slower is stronger'),
      week(10, 'Capability Week', 'Testing what has changed — kindly'),
      week(11, 'Consolidation', 'Making it yours for good'),
      week(12, 'The Demonstration', 'Twelve movements, one session, all yours'),
    ],
    position: { week: 3, day: 2, dayOfProgramme: 16, weekTheme: 'The Squat' },
    log: journeyLog(3, 2),
    today: {
      title: 'Learn the supported squat',
      shortTitle: 'Supported squat',
      kicker: 'Week 3 · Day 2 · The Squat',
      duration: 14,
      durationLabel: '14 minutes',
      why:
        'The squat is how you get out of a car, down to a grandchild, up from the floor. This week you own the movement with support — depth and control come first, load comes much later.',
      whyDeeper:
        'Yesterday you found your stance. Today you add the counter-hold, which lets your hips learn the full pattern while your hands are there to steady you. When the hold starts to feel like habit rather than help — for many people that’s later this week — it will begin to leave. Readiness decides that, not the calendar.',
      prep: [
        'A sturdy counter, heavy table or windowsill — it must not slide',
        'Clear floor, about two steps square',
        'Flat shoes or bare feet, not socks on a hard floor',
        'Water within reach',
      ],
      how: [
        { step: 'Stand an arm’s length from the counter, feet a little wider than your hips, toes turned out slightly.', detail: 'Comfort decides the width. There is no prize for narrow feet.' },
        { step: 'Rest your hands on the counter — lightly. They are your balance, not your lift.', detail: 'If your knuckles are white, you are holding, not resting.' },
        { step: 'Sit back and down over three slow seconds, as if reaching for a chair behind you.', detail: 'Knees travel over toes as far as is comfortable. That is allowed — and normal.' },
        { step: 'Pause where you feel steady. That depth is today’s depth.', detail: 'Depth grows over weeks. Forcing it today buys nothing.' },
        { step: 'Press through the whole foot to stand, breathe out on the way up.', detail: 'Heel, big toe, little toe — all three stay planted.' },
        { step: 'Today’s dose: five slow squats, then a full minute’s rest. Three rounds.', detail: 'Stop the set the moment control fades. Ragged repetitions teach the wrong lesson.' },
      ],
      safety:
        'Mild muscle effort is expected. Sharp pain in a joint is not — if it appears, stop, and take the easier form today. It counts the same. Stop for the day if you feel dizzy, light-headed, or short of breath beyond normal effort.',
      easier: {
        title: 'Sit-to-stand from a raised, firm chair',
        why: 'The same pattern with a higher, safer finish. Every repetition counts toward the same milestone.',
        detail: 'Use a firm chair with armrests. Stand up and sit down slowly, hands helping as much as needed. Eight calm repetitions.',
      },
      advanced: {
        title: 'Counterweight squat',
        why: 'Ready for more? A small weight held at your chest acts as a balancing partner while you slow the descent even further — same depth, more control.',
        detail: 'Hold a filled water bottle or a small bag at your chest. Five slow seconds down, the same depth as the plain form. Six repetitions.',
      },
      milestone: 'This week builds toward your first unassisted squat to chair height — it arrives when the hold feels like habit, not by deadline.',
      question: {
        prompt: 'How did the depth feel today?',
        why: 'Your answer shapes tomorrow — nothing else is done with it.',
        options: ['Comfortable', 'Challenging but fine', 'Too deep for now'],
        acknowledgements: [
          'Noted. Tomorrow keeps this depth and adds one slow repetition.',
          'Noted. Tomorrow holds steady — challenge is where the change is.',
          'Thank you for saying so. Tomorrow starts higher, with the chair. That is the programme working, not you failing.',
        ],
      },
      activity: {
        kind: 'timer',
        segments: [
          { label: 'Settle & breathe', mins: 2 },
          { label: 'Practice descents', mins: 5 },
          { label: 'Working sets', mins: 5 },
          { label: 'Slow finish', mins: 2 },
        ],
        pauseNote: 'Paused. The counter isn’t going anywhere — carry on when you’re ready.',
      },
      acknowledgement: {
        headline: 'Day 16 is yours.',
        line: 'Supported squat — learned. Two more practice days and the support starts to leave.',
        weekLine: 'Week 3 of 12 · The Squat · 2 of 5 programme days done',
      },
    },
    recovery: {
      oneDay: {
        headline: 'Yesterday got away. Today is here.',
        line: 'One quiet day changes nothing about your twelve weeks. The squat is exactly where you left it.',
        action: 'Pick up today',
        altAction: 'Make today lighter',
        altDetail: 'Five minutes of sit-to-stands instead of the full session. It keeps the week moving.',
      },
      severalDays: {
        headline: 'Three days away. The programme kept your place.',
        line: 'Weeks 1 and 2 are built and banked — nothing you earned is gone. The only question is how to step back in.',
        options: [
          { title: 'Rejoin today, as planned', detail: 'Continue with day 2 of The Squat. The missed days simply become part of the story.' },
          { title: 'Step back in gently', detail: 'One short re-entry session — yesterday’s movements at half volume — then the plan resumes tomorrow.' },
        ],
      },
      longAbsence: {
        headline: 'Welcome back. It has been three weeks.',
        line: 'What you built in weeks 1 and 2 is still in your body — strength fades far slower than schedules do. Nothing is reset; nothing needs explaining.',
        capacityPrompt: 'How much do you have today?',
        capacities: [
          { title: 'Not much — ease me in', detail: 'A ten-minute refresher of Standing Tall. The plan re-opens tomorrow.', does: 'Begin — 10 minutes' },
          { title: 'A steady session', detail: 'Rejoin at week 3, day 1 — one day rewound, everything else kept.', does: 'Begin — week 3, day 1' },
          { title: 'I’m ready — full session', detail: 'Straight back to today’s supported squat.', does: 'Begin — 14 minutes, today in full' },
        ],
        reschedule: 'Or, if five days a week was never realistic: rebuild the remaining weeks around three days. Same programme, a calendar that fits.',
      },
      pause: {
        headline: 'Paused, on purpose.',
        line: 'Life gets loud — surgery, travel, a new baby, a hard month. Pausing is a decision, not a lapse. Your place, your record and your milestones are kept exactly as they are.',
        detail: 'The programme will wait quietly. One tap re-opens it; we will suggest a re-entry day, never a restart.',
        action: 'Pause my programme',
      },
    },
    completion: {
      headline: 'Twelve weeks. Kept.',
      line: 'On day one, standing from a chair took both hands. Today you squatted, pushed, pulled and carried — in one unbroken session.',
      record: [
        { label: 'Programme days kept', value: '54 of 60' },
        { label: 'Squat', value: 'assisted → 12 unassisted' },
        { label: 'Carry', value: '0 → 8 kg, 40 metres' },
        { label: 'Floor to standing', value: 'with support → freely' },
      ],
      artefact: {
        title: 'Record of Capability',
        subtitle: 'Foundations of Strength · Twelve weeks',
        note: 'Yours to keep and export, whatever you do next. No subscription required to see it, ever.',
      },
      handover: {
        line: 'Strength likes company. Where next?',
        options: [
          { title: 'Rest week', detail: 'A deliberate week off, with your place kept. Recommended.' },
          { title: 'Foundations II', detail: 'Same patterns, real load. Twelve more weeks.' },
          { title: 'A different world', detail: 'Browse other programmes — writing, and what comes after.' },
        ],
      },
    },
    system: {
      loading: 'Setting out today…',
      offline: 'You’re offline. Today’s session is already on your phone — everything works, and your record will sync when you’re back.',
      error: 'Something on our side went wrong. Your record is safe on this phone. Try again in a moment.',
      empty: 'Week 4 opens when week 3 closes on Sunday. The programme reveals itself one week at a time — that’s deliberate.',
    },
    expired: {
      headline: 'Your membership has lapsed.',
      line: 'Weeks 1–3 and everything you recorded remain yours — read them any time. To continue day 17 with guidance, renew below.',
      action: 'Renew · £44.99 per programme',
      secondary: 'Export my record',
    },
    restore: {
      headline: 'Already a member?',
      line: 'If you bought 12 Weeks on this or another device, one tap brings it back. No account needed — the store remembers.',
      action: 'Restore purchase',
      done: 'Membership restored. Week 3, day 2 is waiting.',
    },
    subscription: SUBSCRIPTION,
    support: SUPPORT,
  },

  writing: {
    id: 'writing',
    name: 'First-Draft Writing',
    short: 'Writing',
    programme: {
      title: 'The First Draft',
      subtitle: 'Twelve weeks from “one day I’ll write it” to a finished first draft.',
      promise:
        'Not a course about writing — a structure for doing it. One scene-sized task each day, one craft idea each week, and a draft that exists at the end.',
      whoFor: [
        'People with a story that has waited years for a calendar',
        'Beginners who want craft without workshops or homework-shame',
        'Returners with three abandoned chapter ones and no chapter two',
      ],
      expectations: [
        'About 25–40 minutes on writing days, five days a week',
        'A first draft is measured in existence, not excellence — ugly pages count in full',
        'You will fall behind at least once; the programme is built for the return',
        'By week 12: a complete draft. For some that is 25,000 words, for others 60,000 — complete counts either way',
      ],
      notFor:
        'This is a drafting programme, not an editing service or a publishing promise. It will not critique your pages — it will get them written.',
    },
    weeks: [
      week(1, 'Claiming the Hour', 'A daily writing time that survives real life'),
      week(2, 'People Before Plot', 'Characters who want things badly'),
      week(3, 'The Engine of Want', 'Desire, obstacle, and why scenes move'),
      week(4, 'Scenes That Turn', 'Every scene changes something — or goes'),
      week(5, 'Speech', 'Dialogue that sounds like people'),
      week(6, 'The Long Middle', 'Crossing the swamp without turning back'),
      week(7, 'Raising the Cost', 'Stakes that grow because they must'),
      week(8, 'Braids', 'Subplots that feed the main current'),
      week(9, 'The Dark Turn', 'When it gets worse before it gets better'),
      week(10, 'Convergence', 'Threads begin to pull together'),
      week(11, 'Endings', 'Landing the thing'),
      week(12, 'The Complete Draft', 'The last scene, and the words THE END'),
    ],
    position: { week: 4, day: 2, dayOfProgramme: 23, weekTheme: 'Scenes That Turn' },
    log: journeyLog(4, 2),
    today: {
      title: 'Write the scene where something becomes impossible to ignore',
      shortTitle: 'The undeniable scene',
      kicker: 'Week 4 · Day 2 · Scenes That Turn',
      duration: 25,
      durationLabel: '25 minutes',
      why:
        'Every story turns on the moment a problem stops being avoidable. Today you write yours — and let someone else in the scene see it happen. Badly is allowed. A first draft’s only job is to exist.',
      whyDeeper:
        'This is the scene your weeks of character work were for: the want you gave your protagonist in week 2 now collides with the obstacle from week 3, in front of a witness. After today, your story cannot go back — which is exactly what act one is for.',
      prep: [
        'The same seat as yesterday — ritual is half the work',
        'Phone face down, somewhere else',
        'Yesterday’s last paragraph, read once, aloud if you can',
        'One line, written before the timer: what do they want in this scene?',
      ],
      how: [
        { step: 'Re-read only the last paragraph you wrote. Not the chapter. The paragraph.', detail: 'Re-reading more is editing in disguise, and editing is a different programme.' },
        { step: 'Name what your character wants in this scene — one line, above the scene.', detail: 'You will delete the line later. The scene will keep its spine.' },
        { step: 'Start in the middle: the door already open, the letter already torn.', detail: 'Arrivals and weather are where first drafts go to stall.' },
        { step: 'Write forward only. No deleting, no re-reading, no fixing names.', detail: 'Square brackets are your friend: [CHECK], [BETTER WORD], [HER SISTER’S NAME].' },
        { step: 'When the timer ends, stop — mid-sentence if you can bear it.', detail: 'A broken sentence is tomorrow’s open door.' },
      ],
      safety:
        'If the scene refuses to come, write the list version instead — ten lines of what happens. That is not failure; that is scaffolding, and it counts.',
      easier: {
        title: 'List ten things your character notices',
        why: 'Low energy still moves the draft. Noticing is how scenes begin.',
        detail: 'In the room where your scene happens, list ten things your character notices — and one they refuse to look at. Ten minutes.',
      },
      advanced: {
        title: 'Write the scene twice',
        why: 'If the draft is flowing, run the scene again from the other character’s head — you will keep the insight, not the pages.',
        detail: 'Same events, second point of view, in your notebook rather than the draft. Notice what each narrator cannot see. Add 20 minutes.',
      },
      milestone: 'This scene closes Act One — most turning scenes are smaller; this is the big one.',
      question: {
        prompt: 'Where did the resistance show up today?',
        why: 'Your answer shapes tomorrow’s start ritual — nothing else is done with it.',
        options: ['Getting started', 'The middle stretch', 'It didn’t, today'],
        acknowledgements: [
          'Noted. Tomorrow’s ritual gets a stronger on-ramp: a two-minute list before the timer.',
          'Noted. Tomorrow we’ll split the session — two short climbs instead of one long one.',
          'Then tomorrow changes nothing. Days like this are worth remembering on the other kind.',
        ],
      },
      activity: {
        kind: 'timer',
        segments: [
          { label: 'Read back & spine line', mins: 3 },
          { label: 'Drafting — forward only', mins: 20 },
          { label: 'Stop & leave a door open', mins: 2 },
        ],
        pauseNote: 'Paused. Leave the cursor where it is — the sentence will hold.',
      },
      acknowledgement: {
        headline: 'Day 23: written.',
        line: 'The undeniable scene exists now. It didn’t this morning.',
        weekLine: 'Week 4 of 12 · Scenes That Turn · 2 of 5 writing days done',
      },
    },
    recovery: {
      oneDay: {
        headline: 'Yesterday went unwritten. The draft didn’t notice.',
        line: 'One missed day in a twelve-week draft is a comma, not a full stop. Your scene is still open where you left it.',
        action: 'Write today',
        altAction: 'Make today lighter',
        altDetail: 'Ten minutes: the list version of the scene. Scaffolding counts.',
      },
      severalDays: {
        headline: 'Four days away. Twenty-two days written.',
        line: 'The twenty-two days are banked — nothing unwritten can touch them. The draft holds its breath; it doesn’t hold a grudge.',
        options: [
          { title: 'Rejoin today, as planned', detail: 'Back to the undeniable scene. The gap becomes part of how this draft got made.' },
          { title: 'Step back in gently', detail: 'One ten-minute read-back-and-notes session tonight; full drafting resumes tomorrow.' },
        ],
      },
      longAbsence: {
        headline: 'Welcome back. The draft waited — that’s what drafts do.',
        line: 'Three weeks away changes the writer, not the pages. 14,200 words exist because of you. They are exactly where you left them, and so is your place.',
        capacityPrompt: 'How much do you have today?',
        capacities: [
          { title: 'Not much — ease me in', detail: 'Read your last three pages. Write one square-bracket note. That’s the whole task.', does: 'Begin — a 10-minute read-back' },
          { title: 'A steady session', detail: 'Rejoin at week 4, day 1 — one day rewound, all words kept.', does: 'Begin — week 4, day 1' },
          { title: 'I’m ready — full session', detail: 'Straight into the undeniable scene, 25 minutes.', does: 'Begin — 25 minutes, today in full' },
        ],
        reschedule: 'Or, if five days a week was never realistic: re-lay the remaining weeks at three days. The draft finishes later, and finishes.',
      },
      pause: {
        headline: 'Paused, on purpose.',
        line: 'Some seasons are for living the material, not writing it. Pausing is a writer’s decision, not a lapse. Every word and milestone stays put.',
        detail: 'The draft will keep. One tap re-opens the programme with a gentle read-back day, never a restart.',
        action: 'Pause my programme',
      },
    },
    completion: {
      headline: 'THE END. You wrote that.',
      line: 'Twelve weeks ago this was “one day.” Today it is 52,000 words with a beginning, a middle, and the words you just typed.',
      record: [
        { label: 'Writing days kept', value: '51 of 60' },
        { label: 'Words drafted', value: '52,340' },
        { label: 'Scenes', value: '61' },
        { label: 'First line → last line', value: '“The ferry was late.” → “She let it go.”' },
      ],
      artefact: {
        title: 'The Draft Record',
        subtitle: 'The First Draft · Twelve weeks',
        note: 'The draft is yours — export it, print it, rest it in a drawer. No subscription required to open it, ever.',
      },
      handover: {
        line: 'Every draft earns a rest before its second life. Then?',
        options: [
          { title: 'Rest the draft', detail: 'Six weeks in the drawer, on purpose. We’ll mind the calendar. Recommended.' },
          { title: 'The Revision', detail: 'Twelve weeks turning a draft into a book.' },
          { title: 'A different world', detail: 'Browse other programmes — strength, and what comes after.' },
        ],
      },
    },
    system: {
      loading: 'Opening the draft…',
      offline: 'You’re offline. The programme and your draft live on this phone — write on, and everything syncs later.',
      error: 'Something on our side went wrong. Your words are safe on this phone. Try again in a moment.',
      empty: 'Week 5 opens when week 4 closes on Sunday. One week at a time is how drafts get finished — that’s deliberate.',
    },
    expired: {
      headline: 'Your membership has lapsed.',
      line: 'Your 14,200 words and your record stay yours — open and export them any time. To continue day 24 with guidance, renew below.',
      action: 'Renew · £44.99 per programme',
      secondary: 'Export my draft',
    },
    restore: {
      headline: 'Already a member?',
      line: 'If you bought 12 Weeks on this or another device, one tap brings it back. No account needed — the store remembers.',
      action: 'Restore purchase',
      done: 'Membership restored. Week 4, day 2 is waiting.',
    },
    subscription: SUBSCRIPTION,
    support: SUPPORT,
  },
};

export const WORLD_IDS = ['strength', 'writing'];
