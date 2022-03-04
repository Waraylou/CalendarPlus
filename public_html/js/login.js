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

    // Username field creation
    const username = document.createElement('input');
    username.type = 'text';
    username.id ='username';
    username.name ='username';
    username.minLength = 8;
    username.placeholder = 'Username or Email';
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
    
    checkLoginInfo();
}

// Initializes the Registration form
function initializeRegistration() {
    const registrationForm = document.createElement('form');
    registrationForm.name = 'registrationForm';

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
    register.id = 'register';
    register.innerText = 'Sign Up';
    register.addEventListener('click', () => {
        checkPasswordsMatch();
        if (registrationForm.checkValidity()) {
            // Any code or functions meant to execute if field requirements are met should go here
            console.log('Registration Valid');
        }
        else {
            console.log('Registration Not Valid')
        }
    })
    registrationForm.appendChild(register);
    
    main.appendChild(registrationForm);

    checkRegistrationInfo();
}

// Clears all elements from the main container
function clearMain() {
    main.innerHTML = '';
}

// Checks if account information meets requirements
function checkLoginInfo() {
    const form = document.querySelector("form[name='loginForm'");

    form.addEventListener("submit", function(event) {
        // Prevents "Log In" button from submitting the form and refreshing the page
        event.preventDefault();

        // Gets data from the form
        const formData = new FormData(this);
        var userName = formData.get('username');
        var password = formData.get('password');

        // None of these if statements should be necessary, it is now taken care of through HTML attributes, 
        // and should not "submit" the form unless all information meets the length requirements.
        if(userName.length < 8){
            //show error
            console.log("ERROR: UserName Length")
        }
        if(password.length < 8){
            //show error
            console.log("ERROR: password length")
        }

        // DEBUGGING: Shows all form information upon success
        for (const formElement of formData) {
        console.log(formElement);
        }
    });
}

// Checks if account information meets requirements
function checkRegistrationInfo() {
    const form = document.querySelector("form[name='registrationForm'");

    form.addEventListener("submit", function(event) {
        // Prevents "Sign Up" button from submitting the form and refreshing the page
        event.preventDefault();

        // Gets data from the form
        const formData = new FormData(this);
        var userName = formData.get('username');
        var email = formData.get('email'); // Not currently used
        var password = formData.get('password');
        var password2 = formData.get('confpass');

        // None of these if statements should be necessary, it is now taken care of through HTML attributes, 
        // and should not "submit" the form unless all information meets the length requirements
        // and passwords match.
        if(userName.length < 8){
            //show error
            console.log("ERROR: UserName Length")
        }
        if(password.length < 8){
            //show error
            console.log("ERROR: password length")
        }
        if(password !== password2){
            //show error
            console.log("ERROR: password does not match " + password + " " + password2)
        }

        // DEBUGGING: Shows all form information upon success
        for (const formElement of formData) {
        console.log(formElement);
        }
    });
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