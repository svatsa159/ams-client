export interface RegisterUserWrapper{
    username: string,
    name:string,
    dob: string,
    city: string,
    class: string,
    password: string
}


export interface User{
    _id:string,
    username: string,
    name:string,
    dob: string,
    city: string,
    class: string,
    password: string,
    isAdmin: boolean,
}