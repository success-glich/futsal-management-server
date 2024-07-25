import { AuthController } from './auth.controller';
import express from "express";

export class AuthRoutes{
    public router:express.Router;
    constructor(){
        this.router = express.Router();
        this.routes();
    }
    public routes(){
        this.router.get("/",(_,res)=>{
            return res.status(200).json({
                message:"Auth route is working fine"
            })
        })
        this.router.post('/login',AuthController.login)
       
        this.router.post('/register',AuthController.register)
    }
}