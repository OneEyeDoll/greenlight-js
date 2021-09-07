/*
 * Error handling class. This class will handle all internal server errors, and will try to avoid  
 */

//Generic greenlight error
export class GreenlightError extends Error{
    constructor(message,response){
        super(message);
        if(response){
            response.end(this.stack)
        }
    }


}

//Backend related error
export class BackendError extends Error{
    constructor(message){
        super(message);
    }
}


