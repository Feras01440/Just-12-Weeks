// The refined prototype's render targets: the 33 lab experiences, plus the
// Programme & Support hub (R1), the first-launch motif study (R5), and the
// type specimen. Order is the review order.

export const STATES = [
  // beginning
  'first-launch', 'explanation', 'explore', 'suitability', 'start-journey',
  // today
  'today', 'why', 'how', 'prep', 'easier', 'advanced',
  // activity
  'begin', 'active', 'paused', 'complete', 'question', 'acknowledge',
  // journey
  'journey', 'week-transition', 'week-12', 'artefact', 'handover',
  // recovery
  'missed-one', 'missed-several', 'long-absence', 'programme-pause',
  // system
  'loading', 'offline', 'error', 'empty',
  // commerce
  'subscription', 'expired', 'restore',
  // refinement additions
  'settings', 'motif-study', 'specimen',
];

export const VIEWPORTS = {
  small: [320, 640],
  standard: [390, 780],
  large: [430, 860],
  tablet: [834, 900],
};

// R1 — the selvedge bar's three destinations, and which destination each
// state belongs to (used for aria-current="page").
export const NAV_DESTS = [
  { state: 'today', label: 'Today' },
  { state: 'journey', label: 'The Twelve Weeks' },
  { state: 'settings', label: 'Programme & Support' },
];

const JOURNEY_STATES = new Set(['journey', 'week-transition', 'week-12', 'artefact', 'handover']);
const SUPPORT_STATES = new Set(['settings', 'subscription', 'expired', 'restore', 'programme-pause']);

export function destFor(state) {
  if (JOURNEY_STATES.has(state)) return 'journey';
  if (SUPPORT_STATES.has(state)) return 'settings';
  return 'today';
}

// The bar yields only to the running session (guidance-first: the session
// owns the screen) and does not exist before the programme does (the entry
// sequence) or on lab-only sheets (motif study, specimen).
const NAV_HIDDEN = new Set([
  'active',
  'first-launch', 'explanation', 'explore', 'suitability', 'start-journey',
  'motif-study', 'specimen',
]);

export function showsNav(state) {
  return !NAV_HIDDEN.has(state);
}
