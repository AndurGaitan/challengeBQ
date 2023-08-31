import mongoose from 'mongoose'

const userCollections =  'users'

const userSchema = mongoose.Schema({
    email: {
        unique: true,
        type: String
    },
    password: String,
    name: String
})

const UserModel = mongoose.model(userCollections, userSchema)

export default UserModel