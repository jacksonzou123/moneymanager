let state = {
  'username': '',
  'addTransaction': false,
};

const focus = props => {
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
          <div class="col" style="text-align: center">
            <h4>Add Transaction</h4>
            ${addTransaction}
          </div>
        </div>

        <div class="row" style="padding-bottom: 50px;">
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

        <div class="row" style="padding-bottom: 50px;">
          <div class="container rounded border">
            <div class="row rounded">
              <div class="col-md col-md-custom border">
                <h4>Recent Transactions</h4>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
    `
  );
};

const transactionForm = `
  <div style="padding: 30px;">
    <div class="container-fluid">
      <div class="row" style="padding-bottom: 30px;">
        <h4>Add New Transaction</h4>
      </div>
      <div class="row" style="padding-bottom: 30px;">
        <div class="col-md">
          <form class='form-group text-center mw-50'>
            <input type="text" class='form-control mb-3' name="transactionName" placeholder="Transaction Name">
            <input type="date" class="mb-3" name="transactionDate">
            <input type="number" class='form-control mb-3' name="transactionAmount" placeholder="Amount">
            <input type="text" class='form-control mb-3' name="transactionNote" placeholder="Note">
            <button type="button" class="btn btn-success">Submit New Transaction</button>
          </form>
        </div>
      </div>
    </div>
  </div>
`;

const addTransaction = `
  <a onClick={handleAddTransaction()} class="addButton" style="color: white;">+</a>
`;

const handleAddTransaction = props => {
  state = Object.assign({}, state, { addTransaction: true });
  renderApp(home(state));
}

const home = props => {
  return (
    `
    <div class="p-3">
      <div class="container-fluid">
        ${state.addTransaction ? transactionForm : focus({ 'username': props.username })}
      </div>
    </div>
    `
  );
};

const renderApp = component => {
  document.getElementById('app').innerHTML = component;
};

window.onload = async _ => {
  const url = 'http://localhost:5000';
  if (window.location.pathname === '/') {
    const response = await fetch(`${url}/octa/userinfo`, { method: 'POST', mode: 'cors' });
    const responseObject = await response.json();
    state = Object.assign({}, state, { 'username': responseObject.username })
    renderApp(home(state));
    document.title = 'Home';
  };
};
