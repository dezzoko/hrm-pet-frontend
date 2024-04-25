export interface SignInInput{
    email:string;
    password:string;
}

export interface SignInResult{
    accessToken:string;
    refreshToken:string;
    userId:string;
    roles:string[];
}
