
import bcrypt from "bcrypt";
const SALT=10;
export const AuthHelper ={
    hash: async(password:string)=>{
        try {
            const salt = await bcrypt.genSalt(SALT);
            const hashedPassword = await bcrypt.hash(password,salt);
            return hashedPassword;
        } catch (error) {
            throw error;
        }
        
    },
    compareHash: async(password:string, hashedPassword:string)=>{
        try {
            const match = await bcrypt.compare(password, hashedPassword);
            return match;
        } catch (error) {
            throw error;
        }
    },
    buildUser: (user:any)=>{

        return {
            name:user.name,
            email:user.email,
            password:user.password,
         
        }
      
    }
}