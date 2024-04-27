import config from "../config/config"
import {Account,Client,ID} from 'appwrite'

class AuthService{
    client = new Client()
    account;              // we have some requirements before making account which are associated with clint
    // we went to make a account only we some user make the object of this class so we constructer

    constructor(){
        this.client.setEndpoint(config.appwriteUrl)
                   .setProject(config.projectId);
        
        // Now we can define the account
        this.account = new Account(this.client)
    }

    async createAccount({email, password , name}){

        // In some cases login can be failed so we use try-catch

        try {

           const userAccount =  await this.account.create(ID.unique() , email , password , name)  // this is format or syntex id should be first
           if (userAccount) {
            //  return userAccount;
            // call another method [ if the account exist then make the user logged in]
           return this.login({email,password});

           } else {
             return userAccount;
           }

        } catch (error) {
            throw error;
        }

    }

    async login({email,password}){
        try {
            return this.account.createEmailPasswordSession(email , password)

        } catch (error) {
            throw error;
        }
    }

    async getCurrentUser(){
        try {
            return await this.account.get()
        } catch (error) {
            console.log("This is a appwrite error {getCurrentUser}")
        }

        return null;
    }
    
    // if you get any promise statement to execute than use await keyword
    async logout(){
        try {
            await this.account.deleteSessions()
        } catch (error) {
            console.log("this is a error")
        }
    }

    
}

// Here we introduce class bcz for each individual user we required seperate object
// but if we just define class user has to make a instanse or object itself
// so we make object nad export so user can directly acces all the methods and functionalities

const authService = new AuthService()

export default authService;