
type password = {
    password: string;
    confirmPass: string;
};

// Define a type for the error object
type passwordErrors = {
    password?: string;
    confirmPassword?: string;
};

const validation = (passwordData: password): passwordErrors => {
    let errors: passwordErrors = {};
    
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\W).{8,}$/;

    // Check if the email is not provided
    if (!passwordData.password) {
        errors.password = 'Password is required';
    } else if (!passwordRegex.test(passwordData.password)) {
        // Check if the email format is invalid
        errors.password = 'Your password does not fit the requirements';
    }

    if (passwordData.confirmPass !== passwordData.password) {
        errors.confirmPassword = 'Confirmation password does not match';
    }


    return errors;
};

export default validation;