const signin = `
<form class='form-signin text-center'>
  <h1 class='h3 mb-3 font-weight-normal'>Sign In</h1>
  <input type='text' class='form-control' placeholder='Username' name='username' required autofocus>
  <input type='password' class='form-control' placeholder='Password' name='password' required>
  <hr>
  <button class='btn btn-md btn-primary btn-block' type='submit'>Sign in</button>
  <button class='btn btn-md btn-danger btn-block' type='button' onClick='switchAuth("register")'>
    Register
  </button>
</form>
`;

const register = `
<form class='form-signin text-center'>
  <h1 class='h3 mb-3 font-weight-normal'>Register</h1>
  <input type='text' class='form-control' placeholder='Username' name='username' required autofocus>
  <input type='password' class='form-control' placeholder='Password' name='password' required>
  <input type='password' class='form-control' placeholder='Confirm Password' name='confirmPassword' required>
  <hr>
  <button class='btn btn-md btn-primary btn-block' type='submit'>
    Register
  </button>
  <button class='btn btn-md btn-danger btn-block' type='button' onClick='switchAuth("signin")'>
    Return to Sign In
  </button>
</form>
`

const renderAuth = component => {
  document.getElementById('auth-form').innerHTML = component;
}

const switchAuth = target => {
  if (target === 'register') {
    history.pushState(null, '', '/auth/register');
    renderAuth(register);
  }
  else if (target === 'signin') {
    history.pushState(null, '', '/auth/signin');
    renderAuth(signin);
  }
};

window.onload = _ => {
  if (window.location.pathname.includes('signin'))
    switchAuth('signin');
  else
    switchAuth('register');
};
