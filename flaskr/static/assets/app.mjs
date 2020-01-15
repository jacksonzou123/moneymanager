import { app } from './src/components.mjs';
import { handleViewUpdate, fetchFrom } from './src/actions.mjs';

window.onload = async _ => {
  await fetchFrom('/octa/fetch/userinfo', 'user');
  await fetchFrom('/octa/fetch/transaction', 'transaction');
  await fetchFrom('/octa/fetch/todo', 'todo');
  await fetchFrom('/octa/fetch/tag', 'tag');
  await fetchFrom('/octa/fetch/inrequest', 'inrequest');
  await fetchFrom('/octa/fetch/outrequest', 'outrequest');
  await fetchFrom('/octa/getusers', 'users');

  switch (window.location.pathname) {
    case '/new/transaction':
      return handleViewUpdate(app, 'New Transaction');
    case '/transactions':
      return handleViewUpdate(app, 'Transactions');
    case '/requests':
      return handleViewUpdate(app, 'Requests');
    case '/todos':
      return handleViewUpdate(app, 'Todos');
    case '/settings':
      return handleViewUpdate(app, 'Settings');
    default:
      return handleViewUpdate(app, 'Home');
  };
};
