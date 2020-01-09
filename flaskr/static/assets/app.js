const home = props => {
  return (
    `
    <div class="p-3">
      <div class="container-fluid">
        <div class="d-flex justify-content-between pb-4">
          <h3>Hello, ${props.name}!</h3>
          <button type="button" class="btn btn-sm btn-primary rounded-pill">
            Add Transaction
          </button>
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
      </div>
    </div>
    `
  )
};

const renderApp = component => {
  document.getElementById('app').innerHTML = component;
};

window.onload = _ => {
  const url = 'http://localhost:5000';
  if (window.location.pathname === '/') {
    fetch(`${url}/octa/userinfo`, { method: 'POST' })
      .then(response => response)
      .then(response => response.json())
      .then(({ username }) => renderApp(home({ name: username })));
    document.title = 'Home';
  }
};
