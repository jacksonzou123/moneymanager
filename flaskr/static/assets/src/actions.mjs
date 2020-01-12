import { app } from './components.mjs';
import { state, setState } from './store.mjs';

export const g = id => document.getElementById(id);

const serializeForm = query => {
  const obj = Object.values(document.querySelector(query)).reduce(
    (obj, field) => {
      obj[field.name] = field.value;
      return obj
    }, {});
  return JSON.stringify(obj)
}

export const renderApp = (name, component) => {
  document.title = name;
  g('app').innerHTML = component;
  g('returnHome').addEventListener(
    'click',
    _ => handleHome(app)
  );
  g('toTransaction').addEventListener(
    'click',
    _ => handleTransaction(app)
  )
};

export const handleAddTransaction = app => {
  setState({ 'view': 'addTransaction' });
  history.pushState(null, '', '/new/transaction');
  renderApp('Add Transaction', app(state));
  g('submitTransaction').addEventListener(
    'click',
    async _ => {
      const response = await fetch(
        `${window.location.origin}/octa/new/transaction`,
        { method: 'POST', body: serializeForm('form') }
      );
      const responseObject = await response.json();
      if (responseObject.success) {
        handleAddTransaction(app);
      }
    }
  );
}

export const handleTransaction = app => {
  setState({ 'view': 'transaction' })
  history.pushState(null, '', '/transactions');
  renderApp('Transactions', app(state));
  g('returnHome').addEventListener(
    'click',
    _ => handleHome(app)
  );
}

export const handleHome = app => {
  setState({ 'view': 'home' });
  history.pushState(null, '', '/');
  renderApp('Home', app(state));
  g('addTransaction').addEventListener(
    'click',
    _ => handleAddTransaction(app)
  );
}