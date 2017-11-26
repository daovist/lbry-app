export const handleActions = (actionMap, defaultState) => {
  return (state = defaultState, action) => {
    const handler = actionMap[action.type];
    const newState = handler ? handler(state, action) : {};
    return Object.assign({}, state, newState);
  };
};
