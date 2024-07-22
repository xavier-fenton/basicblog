// Create fetch to .netcore database

export const fetchPosts = fetch('http://localhost:5169/postItems', {method: 'GET'}).then((res) => {
    return res.body
}).catch((err) => {throw new Error(err)})