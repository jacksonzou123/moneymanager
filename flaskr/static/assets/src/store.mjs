export let state = {
  'user': {},
  'all_users': {},
  'view': 'home',
  'todo': {},
  'tag': {},
  'transaction': {},
  'inrequest': {},
  'outrequest': {},
  'searchedTag': '',
};

export const setState = update => {
  state = Object.assign({}, state, update);
};
