// Create fetch to .netcore database
// Todo: Fetch all from DB and display in blogs component

export const fetchPosts = fetch('http://localhost:5169/postItems', {method: 'GET'}).then((res) => {
    return res.body
}).catch((err) => {throw new Error(err)})