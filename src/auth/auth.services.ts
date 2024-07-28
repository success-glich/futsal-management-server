import { IUser, User } from './../users/users';

class AuthServices {
    private User;
    constructor(){
        this.User = User;
    }

    async findByEmail(email:string){
        try{
            const user = await this.User.findOne({where:{email}});
            console.log("user", user);
            return user;
        }catch(err){
            throw err;
        }
    }
    async save(data:IUser){
        try{
           const user = await this.User.create(data);
           return user;
        }catch(err){
            throw err;
        }

    }
    async update(uuid:string, data:Partial<IUser>){
        try{
            const user = await this.User.update(data, {where:{uuid:uuid}});
            return user;
        }catch(err){
            throw err;
        }
    }
}

export default AuthServices;