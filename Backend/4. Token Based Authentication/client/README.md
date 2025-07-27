# The Lesson We Have Learned

## ✅ Authentication with Context API

### 🔹 How it works

1️⃣ **Create a Context**

Holds user data and auth functions.

```js
export const AuthContext = createContext(null);
```

---

2️⃣ **Create a Provider**

Wrap your app with `<AuthProvider>` in `main.jsx` to share auth state everywhere.

---

3️⃣ **Add Auth Functions**

Typical functions:

```js
createUser(email, password) // Sign up
loginUser(email, password)  // Sign in
logoutUser()                // Sign out
```

---

4️⃣ **Track User State**

Use Firebase’s `onAuthStateChanged` in your provider:

```js
useEffect(() => {
  const unsubscribe = onAuthStateChanged(auth, currentUser => {
    setUser(currentUser);
  });
  return () => unsubscribe(); // cleanup
}, []);
```

---

5️⃣ **One Source of Truth**

When Firebase auth changes, React state updates automatically — so all components know the current user.

✅ **Good for:** Global auth state in React.

---

## ✅ Token-Based Authentication

---

## A) Using Local Storage

📌 **Where?** Stored in `localStorage` in the browser.

### How it works

1️⃣ **Client requests token**

```js
if (currentUser?.email) {
  const userEmail = { email: currentUser.email };

  axios.post("http://localhost:3000/jwt/local", userEmail)
    .then(response => {
      localStorage.setItem("token", response.data.token);
    })
    .catch(console.error);
}
```

---

2️⃣ **Server creates JWT**

```js
app.post("/jwt/local", (req, res) => {
  const userEmail = req.body;
  const token = jwt.sign(userEmail, "secret", { expiresIn: "1d" });
  res.send({ token });
});
```

---

3️⃣ **Store JWT**

```js
localStorage.setItem("token", token);
```

---

4️⃣ **Send JWT with requests**

```js
axios.get("url", {
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});
```

---

5️⃣ **Verify JWT**

```js
const verifyLocalToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).send({ message: "Unauthorized" });

  const token = authHeader.split(" ")[1];
  jwt.verify(token, "secret", (err, decoded) => {
    if (err) return res.status(401).send({ message: "Unauthorized" });
    req.decoded = decoded;
    next();
  });
};
```

✅ **Good for:** Small/demo projects
⚠️ **Risk:** Vulnerable to XSS

---

## B) Using Cookies

📌 **Where?** Stored in a `httpOnly` cookie.

---

### How it works

##### Generate Random Secret Key
You can generate a random secret key for JWT signing using Node.js:
* First on terminal type node:
  
  ```bash
  node
  ```
* Then Type this code to get a random secret key:
  
  ```bash
  require('crypto').randomBytes(64).toString('hex')
  ```

1️⃣ **Client logs in**

* `axios` ➜ `withCredentials: true`
* `fetch` ➜ `credentials: 'include'`

```js
if (currentUser?.email) {
  const userEmail = { email: currentUser.email };

  axios.post("url", userEmail, {
    withCredentials: true,
  }).then(console.log)
    .catch(console.error);
}
```

---

2️⃣ **Server creates JWT + sets cookie**

```js
app.post("url", (req, res) => {
  const userEmail = req.body;
  const token = jwt.sign(userEmail, process.env.JWT_ACCESS_SECRET, { expiresIn: "1d" });

  res.cookie("token", token, {
    httpOnly: true,
    secure: false, // true if HTTPS
  });

  res.send({ message: "Cookie set", token });
});
```

---

3️⃣ **Server CORS config**

```js
app.use(cors({
  origin: ["http://localhost:5173"],
  credentials: true,
}));
```

---

4️⃣ **Use `cookie-parser`**

```js
const cookieParser = require('cookie-parser');
app.use(cookieParser());
```

---

5️⃣ **Verify cookie JWT**

```js
const verifyCookieToken = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) return res.status(401).send({ message: "Unauthorized" });

  jwt.verify(token, process.env.JWT_ACCESS_SECRET, (err, decoded) => {
    if (err) return res.status(401).send({ message: "Unauthorized" });
    req.decoded = decoded;
    next();
  });
};
```

✅ **Good for:** Production — safer than local storage
⚠️ **Risk:** Must prevent CSRF

---

## C) Using Firebase ID Token

📌 **Where?** Firebase generates and manages the token.

---

### 🔹 How it works

1️⃣ **Sign in**

```js
const user = await signInWithEmailAndPassword(auth, email, password);
const idToken = await user.getIdToken().then(token => {
  // Use token for requests
  console.log("ID Token:", token);
});
// OR
const accessToken = await user.accessToken;
```

---

2️⃣ **Send ID token**

```js
fetch("url", {
  credentials: "include",
  headers: {
    authorization: `Bearer ${idToken}`, 
    // OR
    authorization: `Bearer ${user.accessToken}` // You can also capitalize on 'Authorization'
  },
});
```

---

3️⃣ **Server setup**

```js
const admin = require("firebase-admin");
const serviceAccount = require("./firebase-admin-key.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});
```

---

4️⃣ **Verify ID token**

```js
const verifyFirebaseToken = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
   return res.status(401).send({ message: "Unauthorized" });
  }
  const token = authHeader.split(" ")[1];
  const userInfo = await admin.auth().verifyIdToken(token); // **Must use async/await**
  req.tokenEmail = userInfo.email;
  next();
};
```

✅ **Good for:** Firebase Auth + custom backend
✅ **Advantage:** Firebase handles login; your server only checks tokens.

---

## ✅ General JWT Verify Flow

No matter the method:

1️⃣ Check token exists → else `401 Unauthorized`
2️⃣ Verify it (`jwt.verify()` or Firebase Admin)
3️⃣ Attach decoded user to `req.user`
4️⃣ For protected routes, confirm user owns resource → else `403 Forbidden`

---

## ✅ Quick Comparison

| Method             | Storage          | How Sent             | Best For                       |
| ------------------ | ---------------- | -------------------- | ------------------------------ |
| Local Storage      | `localStorage`   | Auth header (Bearer) | Small apps / learning          |
| Cookies (httpOnly) | Secure cookie    | Sent automatically   | Production, safer, less XSS    |
| Firebase ID Token  | Firebase backend | Auth header (Bearer) | Firebase auth + custom backend |

---

## ✅ Best Practices

* Use `httpOnly` cookies in production
* Set `secure: true` for HTTPS
* Add `sameSite` for CSRF protection
* Keep secrets in env variables
* Always verify tokens on server
* Clean up `onAuthStateChanged` listeners

---

## Axios Interceptors

1️⃣ **Create an Axios instance**

  ```js
  import axios from 'axios';
  const api = axios.create({
    baseURL: 'http://localhost:3000',
    withCredentials: true, // For cookies
  });
  ```
2️⃣ **Add request interceptor**

  ```js
  api.interceptors.request.use(config => {
    const token = localStorage.getItem('token'); // or get from cookies
    if (token) {
      config.headers.Authorization = `Bearer ${token}`; // or `Bearer ${user.accessToken}` for Firebase
    }
    return config;
  }, error => {
    return Promise.reject(error);
  });
  ```
3️⃣ **Add response interceptor**

  ```js
  api.interceptors.response.use(response => {
    return response;
  }, error => {
    if (error.response.status === 401 || error.response.status === 403) {
      // Handle unauthorized access
      console.error("Unauthorized access - redirecting to login");
    }
    return Promise.reject(error);
  });
  ```
4️⃣ **Use the Axios instance**

  ```js
  api.get('/protected-route')
    .then(response => {
      console.log("Protected data:", response.data);
    })
    .catch(error => {
      console.error("Error fetching protected data:", error);
    });
  ```