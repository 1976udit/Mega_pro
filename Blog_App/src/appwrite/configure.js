import config from "../config/config"
import {Client , ID , Databases , Query , Storage} from 'appwrite'

export class Service{
    client = new Client();
    databases;
    bucket;

    constructor(){
        this.client.setEndpoint(config.appwriteUrl)
                   .setProject(config.projectId);

        this.databases = new Databases(this.client)
        this.bucket = new Storage(this.client)
    }

    // function to create post
    async createPost({title,slug,content,featuredImage,status,user_Id}){
         try {
            return await this.databases.createDocument(config.databaseId , config.collectionId , slug ,
        {
            title,
            slug,
            content,
            featuredImage,
            status,
            user_Id,
            
        }
        )
         } catch (error) {
            console.log("this is a createPost error")
         }
    }

    // function to update the post
    async updatePost(slug , {title,content,featuredImage,status}){
        try {
            return await this.databases.updateDocument(config.databaseId , config.collectionId ,slug,
            {
                title,
                content,
                featuredImage,
                status
            }
            )
        } catch (error) {
            console.log("This is a error in updatePost")
        }
    }

    // function to delete post
    async deletePost(slug){
        try {
            await this.databases.deleteDocument(config.databaseId , config.collectionId , slug)
            return true;
        } catch (error) {
            console.log("This a error in deletePost")
            return false;
        }
    }

    // function to get a single post
    async getPost(slug){
        try {
            return await this.databases.getDocument(config.databaseId , config.collectionId , slug)
        } catch (error) {
            console.log("This is a error in viewPost")
        }
    }

    // function to get all post with active status(quaries)
    async getPosts(quaries = [Query.equal("status","active")]){
         try {
            return await this.databases.listDocuments(config.databaseId , config.collectionId , quaries)
         } catch (error) {
            console.log("This is a error in getPosts")
            return false;
         }
    }

   // file upload services [Use of Storage]

    async uploadFile(file){
         try {
            return await this.bucket.createFile(config.bucketId , ID.unique(), file)
         } catch (error) {
            console.log("This is a error in uploadFile")
            return false;
         }
  }

    async deleteFile(fileId){
    try {
        await this.bucket.deleteFile(config.bucketId,fileId)
        return true;
    } catch (error) {
        console.log("This is a error in deleteFile")
        return false;
    }
  }

    getFilePreview(fileId){
        return this.bucket.getFilePreview(config.bucketId,fileId)
    }
}

const service = new Service()
export default service;