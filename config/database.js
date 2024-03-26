import mongoose from 'mongoose'

let connected = false
const connectDB = async () => {
    mongoose.set('strictQuery', true)
    // If connected, dont connect again(bcuz next works diff from expressjs backend)
    // nextjs api routes are just serverless functions
    // advantage:-
    //    we dont need seperate servers for backend(like expressjs) and frontend
    //    single deployment(can avoid hosting configurations)
    //    while deploying API routes become serverles functions
    //    rapid development
    //    easier deployement
    if (connected) {
        console.log("MongoDB is already connected...")
        return;
    }
    // Connect to MongoDB
    try {
        await mongoose.connect(process.env.MONGODB_URI)
        connected = true
        console.log('MongoDB connected..')
    } catch (error) {
        console.log(error)
    }
}

export default connectDB