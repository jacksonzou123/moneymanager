export let state = { 'user': {}, 'view': 'home' , 'todos': {}};

export const setState = update => {
  state = Object.assign({}, state, update);
};
