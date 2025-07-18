// Define a type for the input parameter
type UserLogin = {
    name: string;
    password: string;
};

// Define a type for the error object
type LoginErrors = {
    username?: string;
    password?: string;
};

const loginValidation = (loginData: UserLogin): LoginErrors => {
    let errors: LoginErrors = {};
    
    // Check if the username and password are not provided
    if (!loginData.name) {
        errors.username = 'Username is required';
    } else if (loginData.name.length < 3) {
        // Check if the username is too short
        errors.username = 'Username must be at least 3 characters';
    }

    if (!loginData.password) {
        errors.password = 'Password is required';
    }

    return errors;
};

export default loginValidation;