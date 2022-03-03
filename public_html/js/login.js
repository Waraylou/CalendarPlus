const main = document.getElementById('main');

function initializeMain() {
    const logo = document.createElement('h1');
    logo.className = 'logo';
    logo.innerText = 'Calendar+';
    main.appendChild(logo);
}

function initializeLogin() {
    const loginForm = document.createElement('form');
    loginForm.name = 'loginForm';

    const username = document.createElement('input');
    username.type = 'text';
    username.id ='username';
    username.name ='username';
    username.placeholder = 'Username or Email';
    loginForm.appendChild(username);

    const password = document.createElement('input');
    password.type = 'password';
    password.id = 'password';
    password.name = 'password';
    password.placeholder = 'Password';
    loginForm.appendChild(password);

    const register = document.createElement('button');
    register.type = 'button';
    register.id = 'register';
    register.innerText = 'Sign Up';
    register.addEventListener('click', () => {
        clearMain();
        initializeMain();
        initializeRegistration();
    });
    loginForm.appendChild(register);

    const login = document.createElement('button');
    login.id = 'login';
    login.innerText = 'Log In';
    loginForm.appendChild(login);
    
    main.appendChild(loginForm);
}

function initializeRegistration() {
    const registrationForm = document.createElement('form');
    registrationForm.name = 'registrationForm';

    const username = document.createElement('input');
    username.type = 'text';
    username.id ='username';
    username.name ='username';
    username.placeholder = 'Username';
    registrationForm.appendChild(username);

    const email = document.createElement('input');
    email.type = 'email';
    email.id ='email';
    email.name ='email';
    email.placeholder = 'Email';
    registrationForm.appendChild(email);

    const password = document.createElement('input');
    password.type = 'password';
    password.id = 'password';
    password.name = 'password';
    password.placeholder = 'Password';
    registrationForm.appendChild(password);

    const confirmPassword = document.createElement('input');
    confirmPassword.type = 'password';
    confirmPassword.id = 'confpass';
    confirmPassword.name = 'confpass';
    confirmPassword.placeholder = 'Confirm Password';
    registrationForm.appendChild(confirmPassword);

    const back = document.createElement('button');
    back.type = 'button';
    back.id = 'back';
    back.innerText = 'Back';
    back.addEventListener('click', () => {
        clearMain();
        initializeMain();
        initializeLogin();
    });
    registrationForm.appendChild(back);

    const register = document.createElement('button');
    register.id = 'register';
    register.innerText = 'Sign Up';
    registrationForm.appendChild(register);
    
    main.appendChild(registrationForm);
}

function clearMain() {
    main.innerHTML = '';
}

initializeMain();
initializeLogin();