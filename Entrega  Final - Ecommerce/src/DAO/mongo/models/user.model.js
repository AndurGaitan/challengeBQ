import mongoose from 'mongoose'

const UserModel = mongoose.model('users', new mongoose.Schema({
    email: String,
    name: String,
    password: String,
    role: String,
    social: String,
    documents: [
        {
        name: String,
        reference: String
        }
    ],
    last_connection: Date
}))

export default UserModel