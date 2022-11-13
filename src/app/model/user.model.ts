export interface User {
    name: string;
    email: string;
    username: string;
    password: string;
    cnfmpassword?: string;
    profilepic: string | ArrayBuffer;
    gender: string;
    education: string;
    hobbies: Array<string>;
    activate: boolean;
}
