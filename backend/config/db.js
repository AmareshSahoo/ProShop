import mongoose from 'mongoose'

const connectDB = async() => {
    try {
        const conn = await mongoose.connect('mongodb+srv://amarDB:Amardb@mydb-rabpp.mongodb.net/ECOM?retryWrites=true&w=majority', {
            useUnifiedTopology: true,
            useNewUrlParser: true,
            useCreateIndex: true,
        })

        console.log(`MongoDB Connected: ${conn.connection.host}`.cyan.underline)
    } catch (error) {
        console.error(`Error: ${error.message}`.red.underline.bold)
        process.exit(1)
    }
}

export default connectDB