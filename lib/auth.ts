import crypto from "crypto"
import express from "express"
import {RequestAuth} from "./types.js"
import { Request } from 'express-serve-static-core';


export default class GreenlightAuth{
/**
    * Given a request, it will authenticate if an user has those credentials
    *
    *
    * @param {express.Request} Request - Request that handles the session
    * @param {Any} User - The User model that will be used for the query
    * @param {String} Username - The user to authenticated's username
    * @param {Password} Password - The user to authenticated's password
*/
    public static async login(Request:RequestAuth,User,Username:string,Password:string,):Promise<void> {
        //creating hash object 
        let hash = crypto.createHash('sha512');
        //passing the data to be hashed
        let data = hash.update(Password);
        //Creating the hash in the required format
        let PasswordHash= data.digest('hex');

        const results = await User.findOne({ where: { username: Username,password: PasswordHash } });
        if(results!==null )
            Request.session.loggedIn=true;
    }
/**
    * Given a request, it will deauthenticate the session
    *
    *
    * @param {express.Request} Request - Request that handles the session
*/
    public static  logout(Request:RequestAuth):void{
        Request.session.loggedIn=false;
    }

/**
    * Creates a new User in the Users table. This will be done through Sequelize, so ensure to pass a GreenlightUser model to this method.
    *
    *
    * @param {Any} User - The User model that will be used for the query
    * @param {String} Username - The new user's username
    * @param {String} firstName - The new user's first name
    * @param {String} Password - The new user's password
    * @param {String} lastName - The new user's last name
    * @param {String} Email - The new user's Email
    */

    public static signup(User,Username:string,firstName:string,Password:string,lastName:string="",Email:string=""):void{
        //creating hash object 
        let hash = crypto.createHash('sha512');
        //passing the data to be hashed
        let data = hash.update(Password);
        //Creating the hash in the required format
        let PasswordHash= data.digest('hex');

        //Building the user
        let new_user=User.build({username:Username,firstName:firstName,password:PasswordHash,lastName:lastName,email:Email})

        //Saving the user
        new_user.save();

        

    }
}