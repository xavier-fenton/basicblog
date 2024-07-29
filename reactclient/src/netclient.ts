// Todo: add rest of crud ops endpoints


export const fetchPosts = async () => {
    try{
        const response = await fetch("http://localhost:5169/postItems", {method: "GET", mode: "cors"})
        const readData = await response.json()
        
        return readData
    } catch (error){
        throw new Error('Something went wrong. Please try again later.')
    }
} 

export const updatePost = async (blogPost: BodyInit) => {
    try{
        
        const request = await fetch(`http://localhost:5169/postItems/${blogPost.id}`, {method: "PUT", body: JSON.stringify(blogPost), headers: {
            'Content-Type': 'application/json',
          }})
        const success = request.ok      
        return success;  
    } catch (error){
        throw new Error('Something went wrong. Please try again later.')
    }
} 


export const createPost = async (blogPost: BodyInit) => {
    try{
        const request = await fetch(`http://localhost:5169/postItems/`, {method: "POST", body: JSON.stringify(blogPost), headers: {
            'Content-Type': 'application/json',
          }})
        const success = request.ok  
        console.log(success)
            
        return success;  
    } catch (error){
        throw new Error('Something went wrong. Please try again later.')
    }
} 