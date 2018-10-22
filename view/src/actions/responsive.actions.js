const expanded = 'EXPANDED';

export default {
  shrinkApp,
  expandApp
}

export function shrinkApp() {
  return {type: expanded, expanded: false }
}

export function expandApp() {
  return {type: expanded, expanded: true }
}