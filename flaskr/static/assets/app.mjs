import { app } from './src/components.mjs';
import {
  handleHome,
  handleAddTransaction,
  handleTransactions,
  handleRequests,
  handleTodos,
  handleSettings,
  fetchUserInfo,
  fetchTransactions,
  fetchTodos,
  fetchTags
} from './src/actions.mjs';

window.onload = async _ => {
  await fetchUserInfo();
  await fetchTransactions();
  await fetchTodos();
  await fetchTags();

  switch (window.location.pathname) {
    case '/new/transaction':
      return handleAddTransaction(app);
    case '/transactions':
      return handleTransactions(app);
    case '/requests':
      return handleRequests(app);
    case '/todos':
      return handleTodos(app);
    case '/settings':
      return handleSettings(app);
    default:
      return handleHome(app);
  };
};
