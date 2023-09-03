import mongoose from 'mongoose'

const userCollections =  'users'

const userSchema = mongoose.Schema({
    email: {
        unique: true,
        type: String
    },
    password: String,
    first_name: String,
    last_name: String,
    age: String,
    role: {
        type:String,
        default: 'user'
    }

})

const UserModel = mongoose.model(userCollections, userSchema)

export default UserModel