import GoogleProvider from "next-auth/providers/google";

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
            // 2.user exists
            // 3.add user to db
            // 4.return true to allow sign in
        },
        // Modifies section object
        async session({session}) {
            // 1.get user from db
            // 2.Assign the user id to session
            // 3.return the session
        }
    }
}