import { calendar } from './calendar.mjs';

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
            <div class='d-flex flex-row mb-3'>
              <div class='flex-fill'>
                <select class='form-control' name='tag'>
                  <option value='NULL'>None</option>
                  ${props.tag.map(t => `<option>${t.tag_type}</option>`)}
                </select>
              </div>
              <div class='justify-content-center'>
                <button type='button' class='btn btn-primary rounded ml-2'>New Tag</button>
              </div>
            </div>
            <button type='button' name='button' id='submitTransaction' class='btn btn-md btn-success'>Submit New Transaction</button>
          </form>
        </div>
      </div>
    `
  );
};

export const home = props => {
  return (
    `
    <div class='container-fluid p-0 m-0'>
      <div class='row mb-3 mx-5'>
        <h2 class='hello-title'>Hello, ${props.user.username}!</h2>
      </div>
      <div class='row mb-3 d-flex justify-content-center mx-3' style='padding-bottom: 30px;'>
        <div class='text-center d-flex justify-content-center flex-column'>
          <h4>Add Transaction</h4>
          <button type='button' class='d-flex justify-content-center btn addButton text-white rounded mx-auto' id='addTransaction'>+</a>
        </div>
      </div>
      <div class='card-group mx-5'>
        <div class='card'>
          <div class='card-body'>
            <h4>Quick Stats</h4>
          </div>
        </div>
        <div class='card'>
          <div class='card-body'>
            <h4>Tags</h4>
            <table>
                ${props.tag.map(t => `
                  <tr>
                  <td>${t.tag_type}</td>
                  <td class='amount'>something</td>
                  </tr>
                `).join('')}
            </table>
          </div>
        </div>
      </div>
      <div class='row'>
        ${calendar(props)}
      </div>
    `
  );
};

export const transaction = props => {
  return (
    `
    <div class='d-flex flex-row justify-content-between'>
      <div class='p-2'>
        <h4>Transactions</h4>
      </div>
      <div class='p-2'>
        <button type='button' id='addTransaction' class='btn btn-sm btn-success rounded'>
          Add Transaction
        </button>
      </div>
    </div>
    <div class='container-fluid p-0 m-0'>
      <div class='card'>
          ${props.transaction.map(t => `
            <div class='card-text border-bottom p-1'>
              <div class='row'>
                <div class='col-3 d-flex flex-column'>
                  <h6 class='font-weight-bolder'>${t.transaction_name}</h6>
                  <p>
                    ${new Intl.DateTimeFormat('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }).format(new Date(t.transaction_date))}<br>
                    <span class='text-success'>$${t.transaction_amount}</span>
                  </p>
                </div>
                <div class='col d-flex flex-column'>
                  <h6 class='font-weight-bold'>Note:</h6>
                  <p>${t.transaction_note}</p>
                </div>
                <div class='col'>
                  <a class='float-right' href='#'>
                    <svg class='bi bi-pencil' width='1.5em' height='1.5em' viewBox='0 0 20 20' fill='currentColor' xmlns='http://www.w3.org/2000/svg'>
                      <path fill-rule='evenodd' d='M13.293 3.293a1 1 0 011.414 0l2 2a1 1 0 010 1.414l-9 9a1 1 0 01-.39.242l-3 1a1 1 0 01-1.266-1.265l1-3a1 1 0 01.242-.391l9-9zM14 4l2 2-9 9-3 1 1-3 9-9z' clip-rule='evenodd'/>
                      <path fill-rule='evenodd' d='M14.146 8.354l-2.5-2.5.708-.708 2.5 2.5-.708.708zM5 12v.5a.5.5 0 00.5.5H6v.5a.5.5 0 00.5.5H7v.5a.5.5 0 00.5.5H8v-1.5a.5.5 0 00-.5-.5H7v-.5a.5.5 0 00-.5-.5H5z' clip-rule='evenodd'/>
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          `).join('')}
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
    </button>
    ${props.todo.map(t => JSON.stringify(t))}
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
      case 'New Transaction':
        return transactionForm(props);
      case 'Transactions':
        return transaction(props);
      case 'Requests':
        return requests(props);
      case 'Todos':
        return todos(props);
      case 'Settings':
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
            <input class='form-control' type='text' placeholder='Search'>
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
