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

