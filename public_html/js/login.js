const main = document.getElementById('main');

// Initializes the main container
function initializeMain() {
    const logo = document.createElement('h1');
    logo.className = 'logo';
    logo.innerText = 'Calendar+';
    main.appendChild(logo);
}
// Initializes the Login Form
function initializeLogin() {
    const loginForm = document.createElement('form');
    loginForm.name = 'loginForm';
    loginForm.method = 'POST'
    loginForm.action = '/api/login'

    // Username field creation
    const username = document.createElement('input');
    username.type = 'text';
    username.id ='username';
    username.name ='username';
    username.minLength = 8;
    username.placeholder = 'Username';
    username.required = 'required';
    loginForm.appendChild(username);

    // Password field creation
    const password = document.createElement('input');
    password.type = 'password';
    password.id = 'password';
    password.name = 'password';
    password.minLength = 8;
    password.placeholder = 'Password';
    password.required = 'required';
    loginForm.appendChild(password);

    // Sign Up button creation (redirects to account creation)
    const register = document.createElement('button');
    register.type = 'button';
    register.id = 'register';
    register.innerText = 'Sign Up';
    register.addEventListener('click', () => {
        // Clears all elements in the main container
        clearMain();
        // Re-initializes the main container
        initializeMain();
        // Swaps to the Registration form
        initializeRegistration();
    });
    loginForm.appendChild(register);

    // Log In button creation
    const login = document.createElement('button');
    login.id = 'login';
    login.innerText = 'Log In';
    login.addEventListener('click', () => {
        if (loginForm.checkValidity()) {
            // Any code or functions meant to execute if field requirements are met should go here
            console.log('Login Valid');
        }
        else {
            console.log('Login Not Valid')
        }
    })
    loginForm.appendChild(login);
    
    main.appendChild(loginForm);
}

// Initializes the Registration form
function initializeRegistration() {
    const registrationForm = document.createElement('form');
    registrationForm.name = 'registrationForm';
    registrationForm.method = "POST";
    registrationForm.action = "/api/user";
    
    
    // Username field creation
    const username = document.createElement('input');
    username.type = 'text';
    username.id ='username';
    username.name ='username';
    username.minLength = 8;
    username.placeholder = 'Username';
    username.required = 'required';
    registrationForm.appendChild(username);

    // Email field creation
    const email = document.createElement('input');
    email.type = 'email';
    email.id ='email';
    email.name ='email';
    email.placeholder = 'Email';
    email.required = 'required';
    registrationForm.appendChild(email);

    // Password field creation
    const password = document.createElement('input');
    password.type = 'password';
    password.id = 'password';
    password.name = 'password';
    password.minLength = 8;
    password.placeholder = 'Password';
    password.required = 'required';
    registrationForm.appendChild(password);

    // Password Confirmation field creation
    const confirmPassword = document.createElement('input');
    confirmPassword.type = 'password';
    confirmPassword.id = 'confpass';
    confirmPassword.name = 'confpass';
    confirmPassword.minLength = 8;
    confirmPassword.placeholder = 'Confirm Password';
    confirmPassword.required = 'required';
    confirmPassword.addEventListener('click', () => {
        checkPasswordsMatch();
    });
    registrationForm.appendChild(confirmPassword);

    // Back button creation
    const back = document.createElement('button');
    back.type = 'button';
    back.id = 'back';
    back.innerText = 'Back';
    back.addEventListener('click', () => {
        // Clears all elements in the main container
        clearMain();
        // Re-initializes the main container
        initializeMain();
        // Swaps to the Registration form
        initializeLogin();
    });
    registrationForm.appendChild(back);

    // Register / "submit" button creation
    const register = document.createElement('button');
    register.type = 'submit';
    register.id = 'register';
    register.innerText = 'Sign Up';
    register.addEventListener('click', () => {
        checkPasswordsMatch();
        if (registrationForm.checkValidity()) {
            // Any code or functions meant to execute if field requirements are met should go here
            console.log('Registration Valid');
            createAccount();
            console.log('Registration success');
        }
        else {
            console.log('Registration Not Valid')
        }
    })
    registrationForm.appendChild(register);
    
    main.appendChild(registrationForm);
}

// Clears all elements from the main container
function clearMain() {
    main.innerHTML = '';
}

// Checks if the passwords match, and if not, creates a popup notification + doesn't allow the form to submit
function checkPasswordsMatch() {
    var password = document.getElementById('password');
    var confpass = document.getElementById('confpass');

    if (confpass.value != password.value) {
        // If passwords don't match, a field pops up notifying the user
        confpass.setCustomValidity('Passwords must be matching.');
    }
    else {
        confpass.setCustomValidity('');
    }
}

initializeMain();
initializeLogin();