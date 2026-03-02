import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import connectDb from "./app/lib/db"
import User from "./app/models/user.model"
import bcrypt from "bcryptjs"

export const { handlers, signIn, signOut, auth } = NextAuth({
    providers: [
        Credentials({
            credentials: {
                email: { label: "email", type: "email" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) {
                    throw new Error("Email and password required")
                }

                await connectDb()

                const email = credentials.email;
                const password = credentials.password as string;
                const user = await User.findOne({ email });


                if (!user) {
                    throw new Error("User dose not exist")
                };

                const isMatch = await bcrypt.compare(password, user.password)

                if (!isMatch) {
                    throw new Error("incorrect password")
                };
                return {
                    id: user._id.toString(),
                    email: user.email,
                    name: user.name,
                    role: user.role
                };

            }
        })
    ],
    callbacks: {
        jwt({ token, user }) {
            if (user) {
                token.id = user.id
                token.name = user.name
                token.email = user.email
                token.role = user.role
            }
            return token
        },
        session({ session, token }) {
            if (session.user) {
                session.user.id = token.id as string
                session.user.name = token.name as string
                session.user.email = token.email as string
                session.user.role = token.role as string

            }
            return session
        }

    },
    pages: {
        signIn: "/login",
        error: "/login"
    },
    session: {
        strategy: "jwt",
        maxAge: 10 * 24 * 60 * 60
    },
    secret: process.env.AUTH_SECRET
})

// connect db
// email chack
// password match
//