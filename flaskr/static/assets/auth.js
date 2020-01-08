const signin = `
<form class='form-signin text-center' action='/auth/signin' method='POST'>
  <h1 class='h3 mb-3 font-weight-normal'>Sign In</h1>
  <input type='text' class='form-control' placeholder='Username' name='username' required autofocus>
  <input type='password' class='form-control' placeholder='Password' name='password' oninput='matchPassword()' required>
  <hr>
  <button class='btn btn-md btn-primary btn-block' type='submit'>Sign in</button>
  <button class='btn btn-md btn-danger btn-block' type='button' onClick='switchAuth("register")'>
    Register
  </button>
</form>
`;

const register = `
<form class='form-signin text-center' action='/auth/register' method='POST'>
  <h1 class='h3 mb-3 font-weight-normal'>Register</h1>
  <input type='text' class='form-control' placeholder='Username' name='username' required autofocus>
  <input type='password' class='form-control' placeholder='Password' name='password' oninput='matchPassword()' required>
  <input type='password' class='form-control' placeholder='Confirm Password' oninput='matchPassword()' name='confirmPassword' required>
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

const matchPassword = _ => {
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
}

window.onload = _ => {
  if (window.location.pathname.includes('signin'))
    switchAuth('signin');
  else
    switchAuth('register');
};

