const expanded = (state = false, action) => (
  (action.type === 'EXPANDED')
    ? action.expanded
    : state
)

export default expanded;