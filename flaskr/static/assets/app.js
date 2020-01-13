let state = {
  'username': '',
  'addTransaction': false
};

let homeState;

const setState = (update, currentState = state) => {
  state = Object.assign({}, currentState, update);
};

const renderApp = (name, component) => {
  document.title = name;
  document.getElementById('app').innerHTML = component;
};

const handleAddTransaction = app => {
  setState({ addTransaction: true });
  history.pushState(null, '', '/add/transaction');
  renderApp('Add Transaction', app(state));
}

const handleHome = app => {
  setState({}, homeState);
  history.pushState(null, '', '/');
  renderApp('Home', app(state));
}

const transactionForm = `
  <div style="padding: 30px;">
    <div class="container-fluid">

      <div class="row">
        <h3>Add New Transaction</h3>
      </div>

      <div class="row">
        <form class='d-flex justify-content-center flex-column form-group text-center m-auto'>
          <input type="text" class='form-control mb-3' name="transactionName" placeholder="Transaction Name">
          <input type="number" class='form-control mb-3' name="transactionAmount" placeholder="Transaction Amount">
          <input type="date" class='form-control mb-3' name="transactionDate" placeholder="Transaction Date">
          <input type="text" class='form-control mb-3' name="transactionNote" placeholder="Transaction Note">
          <input type="text" class='form-control mb-3' name="transactionTag" placeholder="Transaction Tag">
          <button type="button" class="btn btn-sm btn-primary rounded">
            Submit New Transaction
          </button>
        </form>
      </div>

    </div>
  </div>
`;

const app = props => {
  return (
    `
      <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <button class="navbar-brand btn btn-link" type="button" onClick="handleHome(app)">Spendie</button>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse justify-content-end" id="navbarNav">
          <ul class="navbar-nav">
            <li class="nav-item">
              <a class="nav-link" href="/transactions">Transactions</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="/requests">Requests</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="/todos">Todos</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="/settings">Settings</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="/logout">Log Out</a>
            </li>
          </ul>
        </div>
      </nav >
      <div class="p-3">
        <div class="container-fluid">
          ${props.addTransaction ? transactionForm : home({ 'username': props.username })}
        </div>
      </div>
    `
  );
};

const home = props => {
  return (
    `
    <div style="padding: 30px;">
      <div class="container-fluid">

        <div class="row" style="padding-bottom: 30px;">
          <div class="col-sm">
            <h2>Hello, ${props.username}!</h2>
          </div>
          <div class="col-sm">
            <input class="form-control searchbar" type="text" placeholder="Search" aria-label="Search">
          </div>
        </div>

        <div class="row" style="padding-bottom: 50px;">
          <div class="col col-md-custom" style="text-align: center">
            <h4>Add Transaction</h4>
            <button href="#" class="addButton" onClick='handleAddTransaction(app)'>+</button>
          </div>
        </div>

        <div class="container rounded border">
          <div class="row rounded">
            <div class="col-md col-md-custom border">
              <h4>Quick Stats</h4>
            </div>
            <div class="col-md col-md-custom border">
              <h4>Tags</h4>
            </div>
          </div>
        </div>

      </div>

    </div>
    `
  );
};

window.onload = async _ => {
  const url = window.location.origin;

  const response = await fetch(`${url}/octa/userinfo`, { method: 'FETCH' });
  const responseObject = await response.json();
  setState({ 'username': responseObject.username })
  homeState = state;

  if (window.location.pathname === '/') {
    renderApp('Home', app(state));
  }
  else if (window.location.pathname.includes('add/transaction')) {
    handleAddTransaction(app)
  }
};
