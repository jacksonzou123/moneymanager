import { app } from './components.mjs';
import { state, setState } from './store.mjs';

const views = {
  'returnHome': 'Home',
  'toTransactions': 'Transactions',
  'toRequests': 'Requests',
  'toTodos': 'Todos',
  'toSettings': 'Settings'
};

const g = id => document.getElementById(id);

const bbind = (id, func, action = 'click') => {
  g(id).addEventListener(
    action,
    e => {
      e.preventDefault();
      func();
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
  console.log(serializeForm(form))
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
  Object.entries(views).forEach(([action, view]) =>
    bbind(action, handleViewUpdate.bind(this, app, view))
  );
  g('searchByTag').addEventListener(
    'keyup',
    e => {
      if (e.keyCode === 13) {
        setState({ 'searchedTag': g('searchByTag').value });
        handleViewUpdate(app, 'Search');
      }
    }
  );
  switch (window.location.pathname) {
    case '/home':
      bbind('newTag', handleViewUpdate.bind(this, app, 'New Tag'));
      return bbind('addTransaction', handleViewUpdate.bind(this, app, 'New Transaction'));
    case '/transactions':
      return bbind('addTransaction', handleViewUpdate.bind(this, app, 'New Transaction'));
    case '/requests':
      return bbind('addRequest', handleViewUpdate.bind(this, app, 'New Request'));
    case '/todos':
      return bbind('addTodo', handleViewUpdate.bind(this, app, 'New Todo'));
    case '/new/transaction':
      bbind('newTag', handleViewUpdate.bind(this, app, 'New Tag'));
      return bbind('submitTransaction',
        postTo.bind(
          this, '/octa/new/transaction', 'form',
          fetchFrom.bind(this, '/octa/fetch/transaction', 'transaction')
        )
      );
    case '/new/request':
      return bbind('submitRequest',
        postTo.bind(
          this, '/octa/new/request', 'form',
          fetchFrom.bind(this, '/octa/fetch/outrequest', 'outrequest')
        )
      );
    case '/new/tag':
      return bbind('submitTag',
        postTo.bind(
          this, '/octa/new/tag', 'form',
          fetchFrom.bind(this, '/octa/fetch/tag', 'tag')
        )
      );
    case '/new/todo':
      return bbind('submitTodo',
        postTo.bind(
          this, '/octa/new/todo', 'form',
          fetchFrom.bind(this, '/octa/fetch/todo', 'todo')
        ))
    case '/settings':
      return document.querySelector('button').addEventListener(
        'click',
        e => {
          let formObj = JSON.parse(serializeForm('form'));
          for (let field in formObj) {
            if (formObj[field] === "") {
              return;
            };
          };
          e.preventDefault();
          postTo(
            '/octa/updatepassword', 'form',
            fetchFrom.bind(this, '/octa/fetch/userinfo', 'user')
          );
          document.querySelector('form').reset()
        }
      );
    default:
      return;
  }
};
