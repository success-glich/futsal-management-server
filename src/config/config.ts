import * as dotenv from "dotenv";
dotenv.config();

const _config = {
    port:Number(process.env.PORT),
    dbName:String(process.env.POSTGRES_DB),
    dbPort:Number(process.env.POSTGRES_PORT),
    dbHost:String(process.env.POSTGRES_HOST),
    dbUser:String(process.env.POSTGRES_USER),
    dbPassword:String(process.env.POSTGRES_PASSWORD),
    
}

export const config = Object.freeze(_config);