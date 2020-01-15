export let state = {
  'user': {},
  'view': 'home',
  'todo': {},
  'tag': {},
  'transaction': {}
};

export const setState = update => {
  state = Object.assign({}, state, update);
};
