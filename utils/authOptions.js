import GoogleProvider from "next-auth/providers/google";
import connectDB from "@/config/database";
import User from "@/models/User";

export const authOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            authorization: {
                params: {
                    prompt: "consent",
                    access_type: "offline",
                    response_type: "code"
                }
            }
        })
    ],
    callbacks: {
        // invoked on successfull sign
        async signIn({ profile }) {
            // 1.connect to db
            await connectDB()
            // 2.user exists
            const userExists = await User.findOne({ email: profile.email })
            console.log(userExists)
            // 3.add user to db
            if (!userExists) {
                const username = profile.name.slice(0, 20)
                await User.create({
                    email: profile.email,
                    username,
                    image: profile.picture
                });
            }
            // 4.return true to allow sign in
            return true
        },
        // Modifies section object
        async session({ session }) {
            // 1.get user from db
            const user = await User.findOne({ email: session.user.email })
            // 2.Assign the user id to session
            session.user.id = user._id
            // 3.return the session
            return session
        }
    }
}