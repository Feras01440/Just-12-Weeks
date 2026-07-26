// The 33 required experiences, grouped for the lab navigator.
// Every direction must render every state for both programme worlds.

export const STATE_GROUPS = [
  {
    id: 'begin',
    label: 'Beginning',
    states: [
      { id: 'first-launch', label: 'First launch', n: 1 },
      { id: 'explanation', label: 'Product explanation', n: 2 },
      { id: 'explore', label: 'Programme exploration', n: 3 },
      { id: 'suitability', label: 'Suitability & expectations', n: 4 },
      { id: 'start-journey', label: 'Starting the twelve weeks', n: 5 },
    ],
  },
  {
    id: 'today',
    label: 'Today',
    states: [
      { id: 'today', label: "Today's primary action", n: 6 },
      { id: 'why', label: 'Why this matters', n: 7 },
      { id: 'how', label: 'Show me how', n: 8 },
      { id: 'prep', label: 'Preparation', n: 9 },
      { id: 'easier', label: 'Easier alternative', n: 10 },
      { id: 'advanced', label: 'Advanced alternative', n: 11 },
    ],
  },
  {
    id: 'activity',
    label: 'Activity',
    states: [
      { id: 'begin', label: 'Beginning the activity', n: 12 },
      { id: 'active', label: 'Activity in progress', n: 13 },
      { id: 'paused', label: 'Paused', n: 14 },
      { id: 'complete', label: 'Completing the action', n: 15 },
      { id: 'question', label: 'Contextual question', n: 16 },
      { id: 'acknowledge', label: 'Progress acknowledgement', n: 17 },
    ],
  },
  {
    id: 'journey',
    label: 'Journey',
    states: [
      { id: 'journey', label: 'Twelve-week journey', n: 18 },
      { id: 'week-transition', label: 'Week transition', n: 19 },
      { id: 'week-12', label: 'Week-12 completion', n: 28 },
      { id: 'artefact', label: 'Completion artefact', n: 29 },
      { id: 'handover', label: 'Next-journey handover', n: 30 },
    ],
  },
  {
    id: 'recovery',
    label: 'Recovery',
    states: [
      { id: 'missed-one', label: 'One missed day', n: 20 },
      { id: 'missed-several', label: 'Several missed days', n: 21 },
      { id: 'long-absence', label: 'Longer absence', n: 22 },
      { id: 'programme-pause', label: 'Programme pause', n: 23 },
    ],
  },
  {
    id: 'system',
    label: 'System',
    states: [
      { id: 'loading', label: 'Loading', n: 25 },
      { id: 'offline', label: 'Offline', n: 24 },
      { id: 'error', label: 'Error', n: 26 },
      { id: 'empty', label: 'Not yet available', n: 27 },
    ],
  },
  {
    id: 'commerce',
    label: 'Membership',
    states: [
      { id: 'subscription', label: 'Subscription presentation', n: 31 },
      { id: 'expired', label: 'Expired subscription', n: 32 },
      { id: 'restore', label: 'Restore purchase', n: 33 },
    ],
  },
];

export const ALL_STATES = STATE_GROUPS.flatMap((g) => g.states.map((s) => ({ ...s, group: g.id })));

export const STATE_IDS = ALL_STATES.map((s) => s.id);

export function stateById(id) {
  return ALL_STATES.find((s) => s.id === id) || null;
}

export const VIEWPORTS = [
  { id: 'small', label: 'Small phone', w: 320, h: 640 },
  { id: 'standard', label: 'Standard phone', w: 390, h: 780 },
  { id: 'large', label: 'Large phone', w: 430, h: 860 },
  { id: 'tablet', label: 'Tablet', w: 834, h: 900 },
];
