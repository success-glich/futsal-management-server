import { Application, NextFunction, Request, Response } from "express";
import { Sequelize } from "sequelize";
import express from 'express';
import cors from 'cors';
import helmet from "helmet";
import httpStatus from "http-status";
import Database from "./config/database";
import { AuthRoutes } from "./auth/auth.routes";

 class App{
    public app:Application;
    public db: Sequelize |undefined;
    public authRoutes:AuthRoutes;

    constructor(){
        this.app = express();
        this.databaseSync()
        this.authRoutes=new AuthRoutes();
        this.routes();
        this.globalErrorHandler();
    }
    protected plugins():void{
        this.app.use(cors)
        this.app.use(express.json());
        this.app.use(express.urlencoded({extended:true}));
        this.app.use(helmet());
        this.app.use((req,res,next)=>{
            console.log("api is hit", req.originalUrl);
            res.setHeader('Access-Control-Allow-Origin', '*');
            res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, PUT, DELETE');
            res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Authorization,x-access-token,Accept,Origin');
            res.setHeader('Cache-Control', 'no-cache="Set-Cookie, Set-Cookie2"');
            next();
        });
    }
    protected databaseSync():void{
        this.db = new Database().sequelize;
        this.db?.sync({
            force: false,
            // alter: {
            //     drop: false,

            // }
            alter:true,
           
        });
    }
    protected routes():void{
        // initialize routes
        this.app.use('/api/v1/health-check',(_:Request,res:Response)=>{
            res.status(httpStatus.OK)
            .send({
                message: 'Welcome to Futsal Management Backend'
            })
        });
        this.app.use("/api/v1/auth",this.authRoutes.router)
    }
    protected globalErrorHandler():void{
        this.app.use(
            (error: Error, req: Request, res: Response, next: NextFunction) => {
                console.log("error caught ::", error);
                // const errorRes: ErrorRequestHandler = handleGlobalException(error, process.env.NODE_ENV === "production");
                return res.status(500).json(error.message);
            }
        );
    }

};
const app = new App();
export default app;