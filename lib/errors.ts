import express from "express"

/*
 * Error handling class. This class will handle all internal server errors, and will try to avoid  
 */

//Generic greenlight error
export class GreenlightError extends Error{
    constructor(message:string,response:express.Response){
        super(message);
        if(response){
            response.status(400).end(this.stack)
        }
    }


}

//Backend related error
export class BackendError extends Error{
    constructor(message:string){
        super(message);
    }
}


