import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import dbConnect from "./dbConnect";

export const collectionNames = {
  CUSTOMER_DATA: "customers",
  PRODUCT_DATA: "products",
};

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "Enter your Email",
        },
        password: {
          label: "Password",
          type: "password",
          placeholder: "Enter your Password",
        },
      },
      async authorize(credentials, req) {
        // Log received credentials
        // console.log("Credentials:", credentials);
        const { email, password } = credentials;

        // Fetch user from the database
        const user = await dbConnect(collectionNames.CUSTOMER_DATA).findOne({
          email,
          password,
        });

        // Check the password
        const isPasswordValid = password == user?.password;

        // Simple test user
        // const user = { id: "1", name: "Md. Tahmid Sarker Mahi", email: "tahmid@engineer.com" };

        // If user exists, return it
        if (user && isPasswordValid) {
          return user;
        } else {
          // Return null if user data could not be retrieved
          return null;
        }
      },
    }),
    GoogleProvider({
    clientId: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET
  })
  ],
  callbacks: {
    async session({ session, token }) {
        if(token) {
            session.user.email = token.email;
            session.user.role = token.role;
        }
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.email = user.email;
        token.role = user.role;
      }
      return token;
    },
  },
};
