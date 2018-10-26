/**
 * Actions for screen size responsiveness
 */
const expanded = 'EXPANDED';

export default {
  expandApp,
  shrinkApp,
};

export function expandApp() {
  return { type: expanded, expanded: true };
};

export function shrinkApp() {
  return { type: expanded, expanded: false };
};