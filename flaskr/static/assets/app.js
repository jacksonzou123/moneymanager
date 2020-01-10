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
<<<<<<< HEAD
  history.pushState(null, '', '/add/transaction');
=======
  history.pushState(null, '', '/add/transaction')
>>>>>>> cf8783101dc96439abb5051d21d4f0505559d4f0
  renderApp('Add Transaction', app(state));
}

const handleHome = app => {
  setState({}, homeState);
<<<<<<< HEAD
  history.pushState(null, '', '');
=======
>>>>>>> cf8783101dc96439abb5051d21d4f0505559d4f0
  renderApp('Home', app(state));
}

const transactionForm = `
  <form class='form-group text-center mw-50'>
    <input type="text" class='form-control mb-3' name="transactionName" placeholder="Transaction Name">
    <input type="number" class='form-control mb-3' name="transactionAmount" placeholder="Transaction Amount">
    <input type="text" class='form-control mb-3' name="transactionNote" placeholder="Transaction Note">
    <input type="text" class='form-control mb-3' name="transactionTag" placeholder="Transaction Tag">
    <button type="button" class="btn btn-sm btn-primary rounded-pill">
      Submit New Transaction
    </button>
  </form>
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
              <a class="nav-link" href="/auth/logout">Log Out</a>
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
<<<<<<< HEAD
    <div class="d-flex justify-content-between flex-column pb-4">
      <div class="container d-flex flex-row mb-3"> 
        <h3>Hello, ${props.username}!</h3>
        <button type="button" class="btn btn-sm btn-primary rounded ml-auto" onClick='handleAddTransaction(app)' >
          Add Transaction
        </button >
      </div>
      <div class="container rounded border">
        <div class="row rounded">
          <div class="col-md border-right">
            <h4>Quick Stats</h4>
          </div>
          <div class="col-md">
            <h4>Tags</h4>
          </div>
=======
    <div class="d-flex justify-content-between pb-4">
      <h3>Hello, ${props.username}!</h3>
      <button type="button" class="btn btn-sm btn-primary rounded-pill" onClick='handleAddTransaction(app)' >
        Add Transaction
      </button >
      </div >
    <div class="container rounded-pill border">
      <div class="row rounded">
        <div class="col-md border-right">
          <h4>Quick Stats</h4>
        </div>
        <div class="col-md">
          <h4>Tags</h4>
>>>>>>> cf8783101dc96439abb5051d21d4f0505559d4f0
        </div>
      </div>
    </div>
    `
  );
};

<<<<<<< HEAD
window.onload = async _ => {
  const url = window.location.origin;
  if (window.location.pathname === '/') {
    const response = await fetch(`${url}/octa/userinfo`, { method: 'FETCH' });
    const responseObject = await response.json();
    setState({ 'username': responseObject.username })
    homeState = state;
    renderApp('Home', app(state));
  };
=======
window.onload = _ => {
  const url = 'http://localhost:5000';
  if (window.location.pathname === '/') {
    fetch(`${url}/octa/userinfo`, { method: 'POST' })
      .then(response => response)
      .then(response => response.json())
      .then(({ username }) => renderApp(home({ name: username })));
    document.title = 'Home';
  }
>>>>>>> cf8783101dc96439abb5051d21d4f0505559d4f0
};
