import { RequestHandler } from "express";
export default interface ISettings {
    MODULE_NAME:string,

    TEMPLATE_DIR:string,

    STATIC_DIR:string,

    BACKEND:{
        TYPE:string,
        DATABASE_PATH?:string,  
        DATABASE?:string,
        USERNAME?:string,
        PASSWORD?:string,
        HOST?:string      
    },

    PRODUCTION:boolean,

    STATIC_PATH: string,

    MIDDLEWARES: RequestHandler[],

    SECRET:string | number[],

    PORT: number,
}