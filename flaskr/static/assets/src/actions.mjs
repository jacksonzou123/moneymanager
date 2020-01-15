import { app } from './components.mjs';
import { state, setState } from './store.mjs';

const g = id => document.getElementById(id);

const bbind = (id, func, action = 'click') => {
  console.log(action)
  g(id).addEventListener(
    action,
    e => {
      e.preventDefault();
      func(e);
    }
  );
};

const serializeForm = query => {
  return JSON.stringify(
    Object.fromEntries(
      new FormData(document.querySelector(query))
    )
  );
};

export const fetchFrom = async (endpoint, stateAttribute) => {
  const promise = await fetch(
    `${window.location.origin}${endpoint}`,
    { method: 'FETCH' }
  )
  const resolve = await promise.json();
  setState({ [stateAttribute]: resolve });
};

export const postTo = async (endpoint, form, resolve) => {
  const response = await fetch(
    `${window.location.origin}${endpoint}`,
    { method: 'POST', body: serializeForm(form) }
  );
  const responseObject = await response.json();
  if (responseObject.success) {
    await resolve();
    document.querySelector(form).reset();
  };
};

export const handleViewUpdate = (app, view) => {
  setState({ 'view': view });
  history.pushState(null, '', `/${(view.split(' ').map(t => t.toLowerCase())).join('/')}`);
  renderApp(view, app(state));
};

export const renderApp = (name, component) => {
  document.title = name;
  g('app').innerHTML = component;
  bbind('returnHome', handleViewUpdate.bind(this, app, 'Home'));
  bbind('toTransactions', handleViewUpdate.bind(this, app, 'Transactions'));
  bbind('toRequests', handleViewUpdate.bind(this, app, 'Requests'));
  bbind('toTodos', handleViewUpdate.bind(this, app, 'Todos'));
  bbind('toSettings', handleViewUpdate.bind(this, app, 'Settings'));
  bbind('searchByTag',
    e => {
      if (e.keyCode === 13) {
        setState({ 'searchedTag': g('searchByTag').value });
        handleViewUpdate(app, 'Search');
        console.log(state.transaction)
      }
    }, 'keyup')
  switch (window.location.pathname) {
    case '/home':
    case '/transactions':
      bbind('addTransaction', handleViewUpdate.bind(this, app, 'New Transaction'));
      return;
    case '/requests':
      bbind('addRequest', handleViewUpdate.bind(this, app, 'New Request'));
      return;
    case '/todos':
      bbind('addTodo', handleViewUpdate.bind(this, app, 'New Todo'));
      return;
    case '/new/transaction':
      bbind('newTag', handleViewUpdate.bind(this, app, 'New Tag'));
      bbind('submitTransaction',
        postTo.bind(
          this, '/octa/new/transaction', 'form',
          fetchFrom.bind(this, '/octa/fetch/transaction', 'transaction')
        )
      );
      return;
    case '/new/request':
      bbind('submitRequest',
        postTo.bind(
          this, '/octa/new/request', 'form',
          fetchFrom.bind(this, '/octa/fetch/request', 'request')
        )
      )
      return;
    case '/new/tag':
      bbind('submitTag',
        postTo.bind(
          this, '/octa/new/tag', 'form',
          fetchFrom.bind(this, '/octa/fetch/tag', 'tag')
        )
      );
      return;
    case '/new/todo':
      bbind('submitTodo',
        postTo.bind(
          this, '/octa/new/todo', 'form',
          fetchFrom.bind(this, '/octa/fetch/todo', 'todo')
        ))
      return;
    case '/settings':
      bbind('updatepassword',
        postTo.bind(
          this, '/octa/updatepassword', 'form',
          fetchFrom.bind(this, '/octa/fetch/userinfo', 'user')
        )
      )
      return;
    default:
      return;
  }
};
