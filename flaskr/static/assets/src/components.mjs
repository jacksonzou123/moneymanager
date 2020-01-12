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

export const transaction = props => {
  return (
    `
      <div>
      ${props.transaction.map(t => JSON.stringify(t))}
      </div>
    `
  )
}

export const home = props => {
  return (
    `
      <div class='d-flex justify-content-between flex-column pb-4'>
        <div class='container d-flex flex-row mb-3'>
          <h3>Hello, ${props.user.username}!</h3>
          <button type='button' id='addTransaction' class='btn btn-sm btn-primary rounded ml-auto'>
            Add Transaction
          </button >
        </div>
        <div class='container rounded border'>
          <div class='row rounded'>
            <div class='col-md border-right'>
              <h4>Quick Stats</h4>
            </div>
            <div class='col-md'>
              <h4>Tags</h4>
            </div>
          </div>
        </div>
      </div>
    `
  );
};

export const app = props => {
  const view = _ => {
    switch (props.view) {
      case 'addTransaction':
        return transactionForm(props)
      case 'transaction':
        return transaction(props)
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
              <a type='button' id='toTransaction' class='navbar-link btn btn-link text-muted'>Transactions</a>
            </li>
            <li class='nav-item'>
              <a class='nav-link' href='/requests'>Requests</a>
            </li>
            <li class='nav-item'>
              <a class='nav-link' href='/todos'>Todos</a>
            </li>
            <li class='nav-item'>
              <a class='nav-link' href='/settings'>Settings</a>
            </li>
            <li class='nav-item'>
              <a class='nav-link' href='/logout'>Log Out</a>
            </li>
          </ul>
        </div>
      </nav >
      <div class='p-3'>
        <div class='container-fluid'>
          ${view()}
        </div>
      </div>
    `
  );
};