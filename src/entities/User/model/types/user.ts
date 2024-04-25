export enum Roles {
    ADMIN = 'admin',
}
export interface User {
    id: number;
    email: string;
    name: string;
    surname: string;
    roles: Roles[];
}

export interface UserSchema {
    isAuth?: boolean;
    user?: User;
    _inited?: boolean;
}
