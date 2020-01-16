import { calendar } from './calendar.mjs';

const home = props => {
  const filterAmount = filtered => {
    let amount = 0;
    if (filtered.length) {
      filtered.forEach(({ transaction_amount }) => amount += transaction_amount);
    }
    return `<span class='text-success'>$${amount.toFixed(2)}</span>`;
  };

  return (
    `
    <div class='container-fluid p-0 m-0'><div class='container'>
      <div class='row mb-3 mx-5 d-flex justify-content-between'>
        <h3>Hello, ${props.user.username}!</h3>
        <h4>${new Intl.DateTimeFormat('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }).format(new Date())}</h4>
      </div>
      <div class='row mb-3 d-flex justify-content-center mx-3 p-3'>
        <div class='text-center d-flex justify-content-center flex-column'>
          <button type='button' class='d-flex justify-content-center btn addButton text-white rounded mx-auto font-weight-bolder p-3' id='addTransaction'>Add Transaction</a>
        </div>
      </div>
      <div class='card-group mx-5 mb-3'>
        <div class='card'>
          <div class='card-body m-0 p-0'>
            <div class="card-header">
              <h5>Quick Stats</h5>
            </div>
            <ul class="list-group list-group-flush">
              <li class="list-group-item d-flex justify-content-between">Today: ${filterAmount(props.transaction.filter(
                  ({ transaction_date }) => new Date(transaction_date).getUTCDate() === new Date().getDate()
                ))}</li>
              <li class="list-group-item d-flex justify-content-between">Past 7 Day: ${filterAmount(props.transaction.filter(({ transaction_date }) => new Date(transaction_date).getUTCDate() - new Date().getDate() <= 7))}</li>
              <li class="list-group-item d-flex justify-content-between">Past 30 Days: ${filterAmount(props.transaction.filter(({ transaction_date }) => new Date(transaction_date).getUTCDate() - new Date().getDate() <= 30))}</li>
            </ul>
          </div>
        </div>
        <div class='card'>
          <div class='card-body m-0 p-0'>
            <div class='card-header'>
              <div class='d-flex justify-content-between'>
                <h5>Tags</h5>
                <button type='button' id='newTag' class='btn btn-sm btn-primary rounded mr-1'>New Tag</button>
              </div>
            </div>
            <div style='max-height:140px; overflow-y: auto;'>
              <ul class='list-group list-group-flush flex-column'>
                ${props.tag.map(t => `
                  <li class='list-group-item d-flex justify-content-between' style='border-bottom: 0 none; padding: 12px 25px 0px 25px;'>
                    ${t.tag_type}
                    <div class='text-success'>something</div>
                  </li>
                `).join('')}
              </ul>
            </div>
          </div>
        </div>
      </div>
      ${calendar(props)}
    </div></div>
    `
  );
};

const transactionForm = props => {
  return (
    `
      <div class='row mb-3'>
        <h4 class='mx-auto'>Add New Transaction</h4>
      </div>
      <div class='row mb-3'>
        <div class='col-sm'>
          <form class='d-flex flex-column form-group mx-auto w-50'>
            <input type='text' class='form-control mb-3' name='name' placeholder='Transaction Name'>
            <input type='date' class='form-control mb-3' name='date'>
            <input type='number' class='form-control mb-3' name='amount' placeholder='Amount'>
            <input type='text' class='form-control mb-3' name='note' placeholder='Note'>
            <input type='text' class='form-control mb-3' name='location' placeholder='Location'>
            <div class='d-flex flex-row mb-3'>
              <div class='w-75'>
                <select class='form-control' name='tag'>
                  <option value='NULL'>None</option>
                  ${props.tag.map(t => `<option>${t.tag_type}</option>`)}
                </select>
              </div>
              <div class='ml-2 flex-fill'>
                <button type='button' id='newTag' class='btn btn-primary btn-block rounded'>New Tag</button>
              </div>
            </div>
            <button type='button' name='button' id='submitTransaction' class='btn btn-md btn-success'>Submit New Transaction</button>
          </form>
        </div>
      </div>
    `
  );
};

const transaction = props => {
  return (
    `
    <div class="container-fluid p-0 m-0"><div class='container'>
      <div class='d-flex flex-row justify-content-between p-0 m-0 mb-3'>
        <h4>Transactions</h4>
        <button type='button' id='addTransaction' class='btn btn-sm btn-success rounded'>
          Add Transaction
        </button>
      </div>
      <div class='card'>
          ${props.transaction.map(t => `
            <div class='card-text border-bottom'>
              <div class='row p-2'>
                <div class='col-3 d-flex flex-column'>
                  <h6 class='font-weight-bolder'>${t.transaction_name}</h6>
                  <p>
                    ${new Intl.DateTimeFormat('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }).format(new Date(t.transaction_date))}<br>
                    <span class='text-success'>$${t.transaction_amount}</span><br>
                    <b>Tag:</b> ${t.tag_type}
                  </p>
                </div>
                <div class='col d-flex flex-column'>
                  <b>Note:</b>
                  <p>${t.transaction_note}</p>
                  <b>Location:</b>
                  <p>${t.transaction_location}</p>
                </div>
                <div class='col'>
                  <button id='deleteTransaction${t.transaction_id}' class='float-right btn' type='button' value='${t.transaction_id}'>
                    <svg class="bi bi-trash-fill" width="1em" height="1em" viewBox="0 0 20 20" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                      <path fill-rule="evenodd" d="M4.5 3a1 1 0 00-1 1v1a1 1 0 001 1H5v9a2 2 0 002 2h6a2 2 0 002-2V6h.5a1 1 0 001-1V4a1 1 0 00-1-1H12a1 1 0 00-1-1H9a1 1 0 00-1 1H4.5zm3 4a.5.5 0 01.5.5v7a.5.5 0 01-1 0v-7a.5.5 0 01.5-.5zM10 7a.5.5 0 01.5.5v7a.5.5 0 01-1 0v-7A.5.5 0 0110 7zm3 .5a.5.5 0 00-1 0v7a.5.5 0 001 0v-7z" clip-rule="evenodd"/>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          `).join('')}
      </div>
    </div></div>
    `
  );
};

const tagForm = props => {
  return (
    `
    <div class='row mb-3'>
      <h4 class='mx-auto'>Add New Tag</h4>
    </div>
    <div class='row mb-3 d-flex flex-column justify-content-center mx-auto'>
      <form class='text-center'>
        <input type='text' class='form-control mb-3' name='name' placeholder='Tag Name'>
        <input type='text' class='form-control mb-3' name='summary' placeholder='Tag Detail'>
        <button type='button' name='button' id='submitTag' class='btn btn-block btn-success'>Submit New Tag</button>
      </form>
    </div>
    `
  );
};

const requestForm = props => {
  return (
    `
    <div class='row mb-3'>
      <h4 class='mx-auto'>Add New Request</h4>
    </div>
    <div class='row mb-3 d-flex flex-column justify-content-center mx-auto'>
      <form class='text-center'>
        <input type='text' class='form-control mb-3' name='name' placeholder='Recipient Name'>
        <input type='number' class='form-control mb-3' name='amount' placeholder='Amount'>
        <input type='text' class='form-control mb-3' name='note' placeholder='Note'>
        <button type='button' name='button' id='submitRequest' class='btn btn-block btn-success'>Submit Request</button>
      </form>
    </div>
    `
  );
};

const requests = props => {
  return (
    `
    <div class='container-fluid p-0 m-0'><div class='container'>
      <div class='d-flex flex-row justify-content-between p-0 m-0 mb-3'>
        <h4>Requests</h4>
        <button type='button' id='addRequest' class='btn btn-sm btn-success rounded'>
          Add Request
        </button>
      </div>
      <div class='card-group mb-3 mb-5'>
        <div class='card'>
          <div class='card-body m-0 p-0'>
            <div class="card-header">
              Outgoing Requests
            </div>
            <ul class='list-group list-group-flush'>
              ${props.outrequest.map(t => `
                <li class='list-group-item d-flex flex-column'>
                  <span class='mb-1'>
                    Request to <b>${props.users[t.sender_id - 1]["username"]}</b> for <span class='text-success'>$${t.req_amount}</span>
                  </span>
                  <span class='mb-1'><b>Note:</b> ${t.req_note}</span>
                  <button class='btn btn-sm btn-danger mr-auto mt-1'>Cancel</button>
                </li>
              `).join('')}
            </ul>
          </div>
        </div>
        <div class='card'>
          <div class='card-body m-0 p-0'>
            <div class="card-header">
              Incoming Requests
            </div>
            <ul class='list-group list-group-flush'>
              ${props.inrequest.map(t => `
                <li class='list-group-item d-flex flex-column'>
                  <span class='mb-1'>
                    Request from <b>${props.users[t.sender_id - 1]["username"]}</b> for <span class='text-danger'>$${t.req_amount}</span>
                  </span>
                  <span class='mb-1'><b>Note: </b> ${t.req_note}</span>
                  <button class='btn btn-sm btn-success mr-auto mt-1'>Finished</button>
                </li>
              `).join('')}
            </ul>
          </div>
        </div>
      </div>
    `
  );
};

const todoForm = props => {
  return (
    `
    <div class='row mb-3'>
      <h4 class='mx-auto'>Add New Todo</h4>
    </div>
    <div class='row mb-3 d-flex flex-column justify-content-center mx-auto'>
      <form class='text-center'>
        <input type='text' class='form-control mb-3' name='name' placeholder='Todo Name'>
        <input type='text' class='form-control mb-3' name='summary' placeholder='Todo Detail'>
        <input type='date' class='form-control mb-3' name='deadline' placeholder='Todo Date'>
        <button type='button' name='button' id='submitTodo' class='btn btn-block btn-danger'>Submit New Todo</button>
      </form>
    </div>
    `
  );
};

const todos = props => {
  return (
    `
    <div>
    <button type='button' id='addTodo' class='btn btn-sm btn-success rounded ml-auto'>
      Add Todo
    </button>
    </div>
    <div class='d-flex flex-column'>
    ${props.todo.map(t =>
      `
        <h5>Title:${t.todo_title}</h5>
        <p>Body:${t.todo_body}</p>
        <p>Deadline:${t.todo_deadline}</p>
      `
    ).join('')}
    </div>
    `
  );
};

const settings = props => {
  return (
    `
      <div class='row mb-3'>
        <h4 class='mx-auto'>Settings</h4>
      </div>
      <div class='row mb-3 d-flex flex-column justify-content-center mx-auto'>
        <form class='text-center mb-3'>
          <input type='password' class='form-control mb-3' name='oldpassword' placeholder='Enter Old Password' value='' required="true">
          <input type='password' class='form-control mb-3' name='newpassword' placeholder='New Password' value='' required="true">
          <button type='submit' class='btn btn-block btn-md btn-danger'>Update Password</button>
          <hr>
        <button type='button' name='submit' id='export' class='btn btn-block btn-primary'>Export to Google Sheets</button>
        </form >
      </div >
  `
  );
};

const search = props => {
  const filtered = _ => props.transaction.filter(t => t.tag_type === props.searchedTag);
  return (
    `
    <div class='card p-3'>
      ${filtered().map(t => `
        <div class='card-text border-bottom'>
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
              <p>${t.transaction_location}</p>
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
    `
  )
};

export const app = props => {
  const view = _ => {
    switch (props.view) {
      case 'New Transaction':
        return transactionForm(props);
      case 'New Request':
        return requestForm(props);
      case 'New Tag':
        return tagForm(props);
      case 'New Todo':
        return todoForm(props);
      case 'New Request':
        return reqForm(props);
      case 'Transactions':
        return transaction(props);
      case 'Requests':
        return requests(props);
      case 'Todos':
        return todos(props);
      case 'Settings':
        return settings(props);
      case 'Search':
        return search(props);
      default:
        return home(props)
    }
  }
  return (
    `
   <nav class='navbar navbar-expand-lg navbar-light bg-light'>
    <a type='button' id='returnHome' class='navbar-brand btn btn-link'>Spendie</a>
    <a class='navbar-toggler' type='button' data-toggle='collapse' data-target='#navbarNav'>
      <span class='navbar-toggler-icon'></span>
    </a>
    <div class='collapse navbar-collapse justify-content-end' id='navbarNav'>
      <ul class='navbar-nav'>
        <li class='nav-item'>
          <input class='form-control' id='searchByTag' type='text' placeholder='Search by Tag...'>
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
            <a type='button' class='navbar-link btn btn-link text-muted text-decoration-none' href='/logout'>Log Out</a>
          </li>
        </ul>
      </div>
    </nav >
    <div class='p-3'>
      <div class='d-flex justify-content-center flex-column container-fluid px-3'>
        ${view()}
      </div>
    </div>
    `
  );
};
