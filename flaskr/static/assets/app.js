let state = {
  'username': '',
  'addTransaction': false,
};

const focus = props => {
  return (
    `
    <div class="d-flex justify-content-between pb-4">
      <h3>Hello, ${props.username}!</h3>
      ${addTransaction}
    </div>
    <div class="focus-container container rounded-pill border">
      <div class="row rounded">
        <div class="col-md border-right">
          <h4>Quick Stats</h4>
        </div>
        <div class="col-md">
          <h4>Tags</h4>
        </div>
      </div>
    </div>
    `
  );
};

const transactionForm = `
  <form>
    <input type="text" name="transactionName">
    <input type="text" name="transactionAmount">
    <input type="text" name="transactionNone">
    <input type="text" name="transactionTag">
    <button type="button">
      Submite New Transaction
    </button>
  </form>
`;

const addTransaction = `
  <button type="button" class="btn btn-sm btn-primary rounded-pill" onClick={handleAddTransaction()}>
    Add Transaction
  </button>
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
    const response = await fetch(`${url}/octa/userinfo`, { method: 'POST' });
    const responseObject = await response.json();
    state = Object.assign({}, state, { 'username': responseObject.username })
    renderApp(home(state));
    document.title = 'Home';
  };
};
