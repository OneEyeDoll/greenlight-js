import crypto from "crypto"

export default class GreenlightAuth{

    /**
     * login:
     * Authenticates an user. Basically if the username and passwords are matched the session will be authenticated
     */
    static async login(Request,User,Username:string,Password:string,) {
        const results = await User.findOne({ where: { username: Username,password: Password } });
        if(results!==null)
            Request.session.loggedIn=true;
    }

    //Logout Method
    static logout(Request){
        Request.session.loggedIn=false;
    }

    //Signup Method
    static signup(User,Username:string,firstName:string,Password:string,lastName:string="",Email:string=""){
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