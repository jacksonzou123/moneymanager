export const transactionForm = props => {
  return (
    `
      <div class='row my-3'>
        <h4 class='mx-auto'>Add New Transaction</h4>
      </div>
      <div class='row mx-auto mb-3'>
        <form class='d-flex justify-content-center flex-column form-group text-center m-auto' style='max-width: 330px;'>
          <input type='text' class='form-control mb-3' name='name' placeholder='Transaction Name'>
          <input type='date' class='form-control mb-3' name='date'>
          <input type='number' class='form-control mb-3' name='amount' placeholder='Amount'>
          <input type='text' class='form-control mb-3' name='note' placeholder='Note'>
          <input type='text' class='form-control mb-3' name='tag' placeholder='Tag'>
          <button type='button' id='submitTransaction' class='btn btn-md btn-primary'>Submit New Transaction</button>
        </form>
      </div>
    `
  );
};

export const home = props => {
  return (
    `
    <div class="container-fluid">
      <div class="row mb-3">
        <h2 class="hello-title">Hello, ${props.user.username}!</h2>
      </div>
      <div class="row mb-3">
        <div class="col overflow-auto text-center">
          <h4>Add Transaction</h4>
          <a class='addButton' id='addTransaction' style='color: white'>+</a>
        </div>
      </div>
      <div class="row rounded">
        <div class="col-md col-md-custom border">
          <h4>Quick Stats</h4>
        </div>
        <div class="col-md col-md-custom border">
          <h4>Tags</h4>
        </div>
      </div>
    </div>
    `
  );
};

export const transaction = props => {
  return (
    `
      <div>
      <button type='button' id='addTransaction' class='btn btn-sm btn-primary rounded ml-auto'>
        Add Transaction
      </button >
      ${props.transaction.map(t => JSON.stringify(t))}
      </div>
    `
  );
};

export const requests = props => {
  return (
    `
      <div>
      requests
      </div>
    `
  );
};

export const todos = props => {
  return (
    `
      <div>
      todos
      </div>
    `
  );
};

export const settings = props => {
  return (
    `
      <div>
      settings
      </div>
    `
  );
};

export const app = props => {
  const view = _ => {
    switch (props.view) {
      case 'addTransaction':
        return transactionForm(props);
      case 'transaction':
        return transaction(props);
      case 'requests':
        return requests(props);
      case 'todos':
        return todos(props);
      case 'settings':
        return settings(props);
      default:
        return home(props)
    }
  }
  return (
    `
      <nav class='navbar navbar-expand-lg navbar-light bg-light'>
        <button type='button' id='returnHome' class='navbar-brand btn btn-link'>Spendie</button>
        <button class='navbar-toggler' type='button' data-toggle='collapse' data-target='#navbarNav'>
          <span class='navbar-toggler-icon'></span>
        </button>
        <div class='collapse navbar-collapse justify-content-end' id='navbarNav'>
          <ul class='navbar-nav'>
            <li class='nav-item'>
              <input class="form-control" type="text" placeholder="Search">
            </li>
            <li class='nav-item'>
              <a type='button' id='toTransactions' class='navbar-link btn btn-link text-muted'>Transactions</a>
            </li>
            <li class='nav-item'>
              <a type='button' id='toRequests' class='navbar-link btn btn-link text-muted'>Requests</a>
            </li>
            <li class='nav-item'>
              <a type='button' id='toTodos' class='navbar-link btn btn-link text-muted'>Todos</a>
            </li>
            <li class='nav-item'>
              <a type='button' id='toSettings' class='navbar-link btn btn-link text-muted'>Settings</a>
            </li>
            <li class='nav-item'>
              <a type='button' class='navbar-link btn btn-link text-muted' href='/logout'>Log Out</a>
            </li>
          </ul>
        </div>
      </nav >
      <div class='p-3'>
        <div class='d-flex justify-content-center flex-column container-fluid mx-3'>
          ${view()}
        </div>
      </div>
    `
  );
};