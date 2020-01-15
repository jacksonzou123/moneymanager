export let state = {
  'user': {},
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
