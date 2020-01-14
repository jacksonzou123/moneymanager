export let state = { 'user': {}, 'view': 'home', 'todos': {}, 'tags': {}, transaction: {} };

export const setState = update => {
  state = Object.assign({}, state, update);
};
