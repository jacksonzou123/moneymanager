import { app } from './src/components.mjs';
import { setState } from './src/store.mjs';
import { handleHome, handleAddTransaction, handleTransaction } from './src/actions.mjs';

const fetchUserInfo = async _ => {
  const response = await fetch(
    `${window.location.origin}/octa/fetch/userinfo`,
    { method: 'FETCH' }
  );
  const responseObject = await response.json();
  setState({ 'user': { 'username': responseObject.username, 'id': responseObject.id } });
};

const fetchTransactions = async _ => {
  const response = await fetch(
    `${window.location.origin}/octa/fetch/transaction`,
    { method: 'FETCH' }
  );
  const responseObject = await response.json();
  setState({ 'transaction': responseObject });
};

window.onload = async _ => {
  await fetchUserInfo();
  await fetchTransactions();

  switch (window.location.pathname) {
    case '/new/transaction':
      return handleAddTransaction(app);
    case '/transactions':
      return handleTransaction(app);
    default:
      return handleHome(app);
  };
};
