import { app } from './components.mjs';
import { state, setState } from './store.mjs';

const g = id => document.getElementById(id);

const bbind = (id, func, action = 'click') => {
  g(id).addEventListener(
    action,
    _ => func()
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
    location.reload();
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
  if (window.location.pathname === '/home' || window.location.pathname === '/transactions') {
    bbind('addTransaction', handleViewUpdate.bind(this, app, 'New Transaction'));
  }
  if (window.location.pathname === '/new/transaction') {
    bbind('submitTransaction',
      postTo.bind(this, '/octa/new/transaction', 'form', fetchFrom.bind(this, '/octa/fetch/transaction', 'transaction'))
    );
  }
};
