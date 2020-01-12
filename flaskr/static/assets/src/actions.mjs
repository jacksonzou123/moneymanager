import { state, setState } from './store.mjs';

export const renderApp = (name, component) => {
  document.title = name;
  document.getElementById('app').innerHTML = component;
};

export const handleAddTransaction = app => {
  setState({ addTransaction: true });
  history.pushState(null, '', '/new/transaction');
  renderApp('Add Transaction', app(state));
  document.getElementById('returnHome').addEventListener(
    'click',
    _ => handleHome(app)
  );
}

export const handleHome = app => {
  setState({ addTransaction: false });
  history.pushState(null, '', '/');
  renderApp('Home', app(state));
  document.getElementById('addTransaction').addEventListener(
    'click',
    _ => handleAddTransaction(app)
  );
}