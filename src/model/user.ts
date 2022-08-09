export type User = {
    email: string;
    password: string;
    token: string;

    video: string;
    expireDate: Date;
    isBlocked: boolean;
    isAdmin: boolean;
}

export type UserDto = Omit<User, 'password'>