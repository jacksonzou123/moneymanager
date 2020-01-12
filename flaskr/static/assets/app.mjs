import { app } from './src/components.mjs';
import { state, setState } from './src/store.mjs';
import { handleHome, handleAddTransaction } from './src/actions.mjs';

window.onload = async _ => {
  const response = await fetch(`${window.location.origin}/octa/userinfo`, { method: 'FETCH' });
  const responseObject = await response.json();
  setState({ 'user': { 'username': responseObject.username, 'id': responseObject.id } });
  switch (window.location.pathname) {
    case '/new/transaction':
      return handleAddTransaction(app);
    default:
      return handleHome(app);
  };
};
