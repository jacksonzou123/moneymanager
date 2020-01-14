export let state = { 'user': {}, 'view': 'home' , 'todos': {}, 'tags': {}};

export const setState = update => {
  state = Object.assign({}, state, update);
};
