import mongoose from 'mongoose'

const userCollections =  'users'

const userSchema = mongoose.Schema({
    email: {
        type: String,
        unique: true
    },
    password: String,
    name: String
})

const UserModel = mongoose.model(userCollections, userSchema)

export default UserModel