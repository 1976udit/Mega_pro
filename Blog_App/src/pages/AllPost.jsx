import React from "react";
import { PostCard,Container } from "../components";
import service from "../appwrite/configure";

function AllPost(){
    const [posts , setPost] = React.useState([])
    service.getPosts([]).then((posts) => {
        if(posts){
            setPost(posts);
        }
    } )
    return(
         <div className="w-full py-8">
                <Container>
                   <div className="flex flex-wrap">
                    {posts.map((post) => (
                       <div key={post.$id} className="p-2 w-1">
                        <PostCard post={post} />
                       </div>
                    ))}
                   </div>
                </Container>
         </div>
    )
}

export default AllPost;