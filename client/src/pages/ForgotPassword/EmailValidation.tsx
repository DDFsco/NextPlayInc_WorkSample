
// Define a type for the error object
type emailErrors = {
    email?: string;
    verificationCode?: string;
};

type emailCheck = {
    email: string;
};


const emailValidation = (emailData: emailCheck): emailErrors => {
    let errors: emailErrors = {};
    
    // Regex pattern for validating an email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Check if the email is not provided
    if (!emailData.email) {
        errors.email = 'Email is required';
    } else if (!emailRegex.test(emailData.email)) {
        // Check if the email format is invalid
        errors.email = 'Please enter a valid email address';
    }


    return errors;
};

export default emailValidation;