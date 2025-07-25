const express = require("express");
const app = express();
const cors = require("cors");
const PORT = process.env.PORT || 3000;
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
require("dotenv").config();

// Middleware means a function that runs before the request reaches the route handler
// This is used to handle CORS and JSON requests

app.use(
  cors({
    origin: ["http://localhost:5173"], // Adjust this to your client URL
    credentials: true, // Allow credentials (cookies, authorization headers, etc.)
  })
);
app.use(express.json());
app.use(cookieParser());

// Firebase Admin SDK setup
var admin = require("firebase-admin");
var serviceAccount = require("./firebase-admin-key.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

// Middleware to log requests. (Optional)
const logger = (req, res, next) => {
  // console.log("Inside the logger middleware.");
  next();
};

// Option 1: Create a JWT token endpoint and store the token in localStorage
app.post("/jwt/local", async (req, res) => {
  const userEmail = req.body;
  const token = jwt.sign(userEmail, "secret", { expiresIn: "1d" }); // Object, Secret, Options
  // Send the token back to the client (for example, to store in localStorage)
  res.send({ token });
});

// Option 2: Create a JWT token endpoint and store the token in a cookie
app.post("/jwt/cookie", async (req, res) => {
  const userEmail = req.body;
  const token = jwt.sign(userEmail, process.env.JWT_ACCESS_SECRET, { expiresIn: "1d" });
  // Set the token in a cookie
  res.cookie("token", token, {
    httpOnly: true, // Prevents client-side JavaScript from accessing the cookie
    secure: false, // Set to true if using HTTPS

    // In production, you might want to set secure and sameSite attributes:
    // secure: process.env.NODE_ENV === 'production',
    // sameSite: process.env.NODE_ENV === 'production' ? 'None' : 'Lax',
    // maxAge: 10 * 24 * 60 * 60 * 1000, // 10 days
  });
  // Send the token back to the client
  res.send({ cookie: "Token set in cookie", token });
  // Send a success message
  // res.send({ success: true});
});

// Option 3: Firebase does not require a separate endpoint for JWT token generation
// Firebase automatically generates a JWT token when a user signs in or signs up
// You can use the Firebase Admin SDK to verify the token in your server-side code.

// Option 1: Middleware to verify JWT token. (Local Storage)
const verifyLocalToken = (req, res, next) => {
  const authHeader = req?.headers?.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).send({ message: "Unauthorize Access" });
  }
  const token = authHeader.split(" ")[1];
  // console.log("Inside the verifyLocalToken middleware: ", token);
  // Verify Local Storage token
  jwt.verify(token, "secret", (error, decode) => {
    if (error) {
      return res.status(401).send({ message: "Unauthorize Access" });
    }
    // console.log(decode)
    req.decode = decode;
    next();
  });
};

// Option 2: Middleware to verify JWT token. (Cookie)
const verifyCookieToken = (req, res, next) => {
  const token = req.cookies.token;
  // console.log("Inside the verifyCookieToken middleware: ", token);
  if (!token) {
    return res.status(401).send({ message: "Unauthorize Access" });
  }
  // Verify Token
  jwt.verify(token, process.env.JWT_ACCESS_SECRET, (error, decode) => {
    if (error) {
      return res.status(401).send({ message: "Unauthorize Access" });
    }
    // console.log(decode)
    req.decode = decode;
    next();
  });
};

// Option 3: Middleware to verify JWT token. (Firebase)
const verifyFirebaseToken = async (req, res, next) => {
  const authHeader = req?.headers?.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).send({ message: "Unauthorize Access" });
  }
  const token = authHeader.split(" ")[1]; // Extract the token from the Authorization header
  // console.log("Inside the verifyFirebaseToken middleware: ", token);
  // Verify Firebase Token
  try {
    const decode = await admin.auth().verifyIdToken(token);
    // console.log("Inside the verifyFirebaseToken middleware: ", decode);
    req.decode = decode;  // Store the decoded token in the request object
  } catch (error) {
    return res.status(401).send({ message: "Unauthorize Access" });
  } finally {
    next();
  }
};


// Sample Products Data
const products = [
  { id: 1, name: "Product 1", price: 100 },
  { id: 2, name: "Product 2", price: 200 },
  { id: 3, name: "Product 3", price: 300 },
  { id: 4, name: "Product 4", price: 400 },
  { id: 5, name: "Product 5", price: 500 },
];

app.get("/products", logger, verifyLocalToken, (req, res) => {
  if (req.decode.email !== "connect.tahmid@gmail.com") {
    return res.status(403).send({ message: "Forbidden Access" });
  } else {
    res.send(products);
  }
});

// Sample Users Data
const users = [
  { id: 1, name: "John Doe", email: "jhon@doe.me" },
  { id: 2, name: "Jane Smith", email: "jane@smith.me" },
  { id: 3, name: "Alice Johnson", email: "alice@jhonson.me" },
  { id: 4, name: "Bob Brown", email: "bob@brown.me" },
  { id: 5, name: "Charlie White", email: "charlie@white.me" },
];

app.get("/users", logger, verifyCookieToken, (req, res) => {
  // console.log("Inside Applications API: ", req.cookies);
  if (req.decode.email !== "connect.tahmid@gmail.com") {
    return res.status(403).send({ message: "Forbidden Access" });
  } else {
    res.send(users);
  }
});

// Sample Quotes Data
const quotes = [
  { id: 1, text: "The best way to get started is to quit talking and begin doing."},
  { id: 2, text: "Don’t let yesterday take up too much of today." },
  { id: 3, text: "You learn more from failure than from success. Don’t let it stop you. Failure builds character." },
  { id: 4, text: "It’s not whether you get knocked down, it’s whether you get up." },
  { id: 5, text: "If you are working on something that you really care about, you don’t have to be pushed. The vision pulls you." },
];

app.get("/quotes", logger, verifyFirebaseToken, (req, res) => {
  if (req.decode.email !== "connect.tahmid@gmail.com") {
    return res.status(403).send({ message: "Forbidden Access" });
  } else {
    res.send(quotes);
  }
});

// Sample Post Data
const posts = [
  { id: 1, title: "Post 1", content: "Content of Post 1" },
  { id: 2, title: "Post 2", content: "Content of Post 2" },
  { id: 3, title: "Post 3", content: "Content of Post 3" },
  { id: 4, title: "Post 4", content: "Content of Post 4" },
  { id: 5, title: "Post 5", content: "Content of Post 5" },
];

app.get("/posts", verifyFirebaseToken, (req, res) => {
  if (req.decode.email !== "connect.tahmid@gmail.com") {
    return res.status(403).send({ message: "Forbidden Access" });
  } else {
    res.send(posts);
  }
});

app.get("/", (req, res) => {
  res.send("Welcome to the Token Based Authentication Server!");
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});