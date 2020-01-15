export let state = {
  'user': {},
  'view': 'home',
  'todo': {},
  'tag': {},
  'transaction': {},
  'inrequest': {},
  'outrequest': {},
  'users:': {}
};

export const setState = update => {
  state = Object.assign({}, state, update);
};
