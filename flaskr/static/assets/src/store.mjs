export let state = { 'username': '', 'addTransaction': false };

export const setState = update => {
  state = Object.assign({}, state, update);
};