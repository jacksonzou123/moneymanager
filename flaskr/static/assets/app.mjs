import { state } from './src/store.mjs';
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

  if (state.user === null) {
    return window.location.replace('/signin');
  }

  switch (window.location.pathname) {
    case '/new/transaction':
      return handleViewUpdate(app, 'New Transaction');
    case '/new/tag':
      return handleViewUpdate(app, 'New Tag');
    case '/new/request':
      return handleViewUpdate(app, 'New Request');
    case '/new/todo':
      return handleViewUpdate(app, 'New Todo');
    case '/transactions':
      return handleViewUpdate(app, 'Transactions');
    case '/requests':
      return handleViewUpdate(app, 'Requests');
    case '/todos':
      return handleViewUpdate(app, 'Todos');
    case '/settings':
      return handleViewUpdate(app, 'Settings');
    case '/search':
      return handleViewUpdate(app, 'Search');
    default:
      return handleViewUpdate(app, 'Home');
  };
};
