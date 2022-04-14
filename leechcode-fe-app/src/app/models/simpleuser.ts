export class simpleUser {
    uid: string;
    email: string;
    isAdmin: boolean;
    constructor(uid:string, email: string, isAdmin: boolean){
        this.uid = uid;
        this.email = email;
        this.isAdmin = isAdmin;

    }
}