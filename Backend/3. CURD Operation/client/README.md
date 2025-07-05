# The Lesson We Have Learned

- CURD => Create, Read, Update, Post
- Create - Post from client side. Must include method: post, headers, body JSON stringify
- Server => Use req.body and make sure you use cors and express.json as middleware
- Read if you want all data in the collection
- toArray()
- Delete a specific one by id.