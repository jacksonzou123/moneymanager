import { calendar } from './calendar.mjs';

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

const home = props => {
  return (
    `
    <div class='container-fluid p-0 m-0'>
    <div class='container'>
      <div class='row mb-3 mx-5 d-flex justify-content-between'>
        <h3 class='hello-title'>Hello, ${props.user.username}!</h3>
        <h4>${new Intl.DateTimeFormat('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }).format(new Date())}</h4>
      </div>
      <div class='row mb-3 d-flex justify-content-center mx-3 p-3'>
        <div class='text-center d-flex justify-content-center flex-column'>
          <button type='button' class='d-flex justify-content-center btn addButton text-white rounded mx-auto font-weight-bolder p-3' id='addTransaction'>Add Transaction</a>
        </div>
      </div>
      <div class='card-group mx-5 mb-3 mb-5'>
        <div class='card'>
          <div class='card-body m-0 p-0'>
            <div class="card-header">
              Quick Stats
            </div>
            <ul class="list-group list-group-flush">
              <li class="list-group-item">Today: </li>
              <li class="list-group-item">This Week: </li>
              <li class="list-group-item">This Month: </li>
            </ul>
          </div>
        </div>
        <div class='card'>
          <div class='card-body m-0 p-0'>
            <div class='card-header'>
              <div class='d-flex justify-content-between'>
                Tags
                <button type='button' id='newTag' class='btn btn-sm btn-primary rounded' style='margin:-5px;'>New Tag</button>
              </div>
            </div>
            <ul class='list-group list-group-flush'>
                ${props.tag.map(t => `
                  <li class='list-group-item d-flex flex-column'>
                    <h5>${t.tag_type}</h5>
                    <p class='amount'>something</p>
                  </li>
                `).join('')}
            </ul>
          </div>
        </div>
      </div>
      ${calendar(props)}
    `
  );
};

const transaction = props => {
  return (
    `
    <div class='container-fluid p-0 m-0'>
      <div class='d-flex flex-row justify-content-between p-0 m-0 mb-3'>
        <h4>Transactions</h4>
        <button type='button' id='addTransaction' class='btn btn-sm btn-success rounded'>
          Add Transaction
        </button>
      </div>
      <div class='card p-3'>
          ${props.transaction.map(t => `
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
        <input type='date' class='form-control mb-3' name='amount' placeholder='Amount'>
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
      <div>
        <button type='button' id='addRequest' class='btn btn-sm btn-primary rounded ml-auto'>
          Add Request
        </button>
      </div>
      <div>
      Outgoing requests
      ${props.outrequest.map(
      t => `
          <br>
          Request to ${props.users[t.recipient_id - 1]["username"]} for $${t.req_amount}
          <br>
          Note: ${t.req_note}
        `
    )}
      </div>
      <br>
      <div>
      Incoming requests
      ${props.inrequest.map(
      t => `
          <br>
          Request from ${props.users[t.sender_id - 1]["username"]} for $${t.req_amount}
          <br>
          Note: ${t.req_note}
        `
    )}
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
        <button type='button' name='button' id='submitTodo' class='btn btn-block btn-success'>Submit New Todo</button>
      </form>
    </div>
    `
  );
};

const todos = props => {
  return (
    `
    <div>
    <button type='button' id='addTodo' class='btn btn-sm btn-primary rounded ml-auto'>
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
  const allowButton = _ => {
    const but = document.querySelector('button');
    const password = document.querySelector('input[name=password]').value;
    const confirmPassword = document.querySelector('input[name=confirmPassword').value;
    if ((password !== confirmPassword) || (password === '' && confirmPassword === '')) {
      but.className = but.className.match(/disabled/) ? but.className + ' disabled' : but.className;
      but.attributes = but.setAttribute('disabled', '');
    }
    else {
      but.className = but.className.replace(/disabled/, '');
      but.attributes = but.removeAttribute('disabled');
    }
  };
  return (
    `
      <div class='row mb-3'>
        <h4 class='mx-auto'>Settings</h4>
      </div>
      <div class='row mb-3 d-flex flex-column justify-content-center mx-auto'>
        <form class='text-center mb-3'>
          <input type='password' class='form-control mb-3' name='oldpassword' placeholder='Enter Old Password' oninput='${_ => allowButton()}' required>
          <input type='password' class='form-control mb-3' name='newpassword' placeholder='New Password' oninput='${_ => allowButton()}' required>
          <button type='button' name='button' id='updatepassword' class='btn btn-block btn-md btn-danger'>Update Password</button>
          <hr>
        <button type='button' name='button' id='export' class='btn btn-block btn-primary'>Export to Google Sheets</button>
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
    ${
    filtered().map(t => `
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
          `).join('')
    }
      </div >
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
    <button type='button' id='returnHome' class='navbar-brand btn btn-link'>Spendie</button>
    <button class='navbar-toggler' type='button' data-toggle='collapse' data-target='#navbarNav'>
      <span class='navbar-toggler-icon'></span>
    </button>
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
