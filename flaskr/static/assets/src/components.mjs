export const transactionForm = props => {
  return (
    `
      <div class='row my-3'>
        <h4 class='mx-auto'>Add New Transaction</h4>
      </div>
      <div class='row mb-3'>
        <div class='col-sm'>
          <form class='d-flex flex-column form-group ml-auto' style='max-widtd: 330px;'>
            <input type='text' class='form-control mb-3' name='name' placeholder='Transaction Name'>
            <input type='date' class='form-control mb-3' name='date'>
            <input type='number' class='form-control mb-3' name='amount' placeholder='Amount'>
            <input type='text' class='form-control mb-3' name='note' placeholder='Note'>
            <button id='submitTransaction' class='btn btn-md btn-success'>Submit New Transaction</button>
          </form>
        </div>
        <div class='col-sm'>
        <div class="d-flex flex-row">
          <div class="p-2">
            <h4>Tags</h4>
          </div>
          <div class="p-2 ml-auto">
            <button type='button' class='btn btn-sm btn-primary rounded'>
              New Tag
            </button>
          </div>
        </div>
      </div>


    `
  );
};

export const home = props => {
  return (
    `
    <div class="container-fluid p-0 m-0">
      <div class="row mb-3 mx-5">
        <h2 class="hello-title">Hello, ${props.user.username}!</h2>
      </div>
      <div class="row mb-3 d-flex justify-content-center mx-3" style="padding-bottom: 30px;">
        <div class="text-center d-flex justify-content-center flex-column">
          <h4>Add Transaction</h4>
          <button type="button" class='font-weight-bold d-flex justify-content-center btn btn-lg addButton text-white rounded mx-auto' id='addTransaction'>+</a>
        </div>
      </div>
      <div class="card-group mx-5">
        <div class="card">
          <div class='card-body'>
            <h4>Quick Stats</h4>
            <table>
              <tr>
                <td>Today:</td>
                <td class='amount'>$72.05</td>
              </tr>
              <tr>
                <td>Last 7 Days:</td>
                <td class='amount'>something</td>
              </tr>
              <tr>
                <td>This Month:</td>
                <td class='amount'>something</td>
              </tr>
              <tr>
                <td>This Year:</td>
                <td class='amount'>something</td>
              </tr>
            </table>
          </div>
        </div>
        <div class="card">
          <div class='card-body'>
            <h4>Tags</h4>
          </div>
        </div>
      </div>
    </div>
    `
  );
};

export const transaction = props => {
  return (
    `
    <div class="d-flex flex-row">
      <div class="p-2">
        <h4>Transactions</h4>
      </div>
      <div class="p-2 ml-auto">
        <button type='button' id='addTransaction' class='btn btn-sm btn-success rounded'>
          Add Transaction
        </button>
        ${props.transaction.map(t => JSON.stringify(t))}
      </div>
    </div>


    <div class="container-fluid p-0 m-0">
      <div class="card-group mx-5">
        <div class="card">
          <div class='card-body'>
          </div>
        </div>
      </div>
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
    <button type='button' id='addTodo' class='btn btn-sm btn-primary rounded ml-auto'>
      Add Todo
    </button >
    ${props.todos.map(t => JSON.stringify(t))}
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
    <div class='p-5'>
      <div class='d-flex justify-content-center flex-column container-fluid px-3'>
        ${view()}
      </div>
    </div>
    `
  );
};
