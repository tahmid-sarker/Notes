# The Lesson We Have Learned

### For POST

- You have to mention method in fetch.
- Add an object (fetch object) after the url of the fetch.
- Inside the object must mention method: "POST".
- Mention the header: which is an object itself.
- In the headers object, mention content-type and the value will be 'application/json' to inform the server that you are sending JSON data.
- Add body to the fetch option.
- Value of the body will be the data that you want to send to the server.
- Make sure to use 'JSON.stringfy' to convert the data into JSON string.