import { app } from './components.mjs';
import { state, setState } from './store.mjs';

export const g = id => document.getElementById(id);

const serializeForm = query => {
  return JSON.stringify(Object.fromEntries(new FormData(document.querySelector(query))))
}

export const fetchUserInfo = async _ => {
  const response = await fetch(
    `${window.location.origin}/octa/fetch/userinfo`,
    { method: 'FETCH' }
  );
  const responseObject = await response.json();
  setState({ 'user': { 'username': responseObject.username, 'id': responseObject.id } });
};

export const fetchTransactions = async _ => {
  const response = await fetch(
    `${window.location.origin}/octa/fetch/transaction`,
    { method: 'FETCH' }
  );
  const responseObject = await response.json();
  setState({ 'transaction': responseObject });
};

export const fetchTodos = async _ => {
  const response = await fetch(
    `${window.location.origin}/octa/fetch/todo`,
    { method: 'FETCH' }
  );
  const responseObject = await response.json();
  console.log(state)
  setState({ 'todos': responseObject });
};

export const fetchTags = async _ => {
  const response = await fetch(
    `${window.location.origin}/octa/fetch/tag`,
    { method: 'FETCH' }
  );
  const responseObject = await response.json();
  console.log(state)
  setState({ 'tags': responseObject });
};

export const renderApp = (name, component) => {
  document.title = name;
  g('app').innerHTML = component;
  g('returnHome').addEventListener(
    'click',
    _ => handleHome(app)
  );
  g('toTransactions').addEventListener(
    'click',
    _ => handleTransactions(app)
  );
  g('toRequests').addEventListener(
    'click',
    _ => handleRequests(app)
  )
  g('toTodos').addEventListener(
    'click',
    _ => handleTodos(app)
  )
  g('toSettings').addEventListener(
    'click',
    _ => handleSettings(app)
  )
};

export const handleAddTransaction = app => {
  setState({ 'view': 'addTransaction' });
  history.pushState(null, '', '/new/transaction');
  renderApp('Add Transaction', app(state));
  g('submitTransaction').addEventListener(
    'click',
    async _ => {
      console.log(serializeForm('form'))
      const response = await fetch(
        `${window.location.origin}/octa/new/transaction`,
        { method: 'POST', body: serializeForm('form') }
      );
      const responseObject = await response.json();
      if (responseObject.success) {
        await fetchTransactions();
        handleAddTransaction(app);
      }
    }
  );
}

export const handleTransactions = app => {
  setState({ 'view': 'transaction' })
  history.pushState(null, '', '/transactions');
  renderApp('Transactions', app(state));
  g('addTransaction').addEventListener(
    'click',
    _ => handleAddTransaction(app)
  );
};

export const handleRequests = app => {
  setState({ 'view': 'requests' });
  history.pushState(null, '', '/requests');
  renderApp('Requests', app(state));
}

export const handleTodos = app => {
  setState({ 'view': 'todos' });
  history.pushState(null, '', '/todos');
  renderApp('Todos', app(state));
};

export const handleSettings = app => {
  setState({ 'view': 'settings' });
  history.pushState(null, '', '/settings');
  renderApp('Settings', app(state));
};

export const handleHome = app => {
  setState({ 'view': 'home' });
  history.pushState(null, '', '/');
  renderApp('Home', app(state));
  g('addTransaction').addEventListener(
    'click',
    _ => handleAddTransaction(app)
  );
};
