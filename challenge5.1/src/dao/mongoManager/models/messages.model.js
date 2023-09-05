import mongoose from 'mongoose'

const messagesCollections = 'messages'

const messagesSchema = new mongoose.Schema({
    user: {type: String, require: true},
    message: {type: String, require: true},
})

const messagesModel = mongoose.model(messagesCollections, messagesSchema)

export default messagesModel
