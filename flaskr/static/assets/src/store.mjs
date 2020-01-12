export let state = { 'user': {}, 'view': 'home' };

export const setState = update => {
  state = Object.assign({}, state, update);
};