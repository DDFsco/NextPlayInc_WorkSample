export interface UserLogin {
    name: string,
    password: string,
    staySignedIn: boolean
}

export interface UserSignup_ {
    name: string,
    email: string,
    password: string,
    first_name: "NA",
    last_name: "NA",
    date_of_birth: "1970-01-01",
    zip_code: "000000",
    referralCode?: string,
    recaptcha: string
}

export interface User_ {
    id: number,
    name: string,
    email: string,
    password_hash: string,
    first_name: string,
    last_name: string,
    date_of_birth: Date,
    state: string,
    zip_code: string,
    is_active: boolean,
    creation_date: Date,
    last_login: Date,
    verification_status_id: number
}

export interface UserResponse_ {
    data: User_,
    token: string
}


export interface UserSignup {
    name: string,
    email: string,
    password: string,
    referralCode?: string
}

export interface User {
    id: number,
    name: string,
    email: string,
    password_hash: string,
    state: string,
    is_active: boolean,
    creation_date: Date,
    last_login: Date,
    verification_status_id: number
}

export interface UserResponse {
    data: User,
    token: string
}

export interface UserEdits {
    // name: string,
    email: string, 
    password: string,
    // date_of_birth: string,
    // verification_status_id: number
}

export interface ErrorResponse {
    error: string
}

export const PersonaVerificationStatus = { 1: "Verified", 2: "Pending", 3: "Declined" };




