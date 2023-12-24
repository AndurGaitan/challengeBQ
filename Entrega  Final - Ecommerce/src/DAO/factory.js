import config from "../config/config.js";
import mongoose from "mongoose";

export let User
export let Product
export let Cart
export let Mensagge
export let Ticket

console.log(`Persistence with ${config.persistence}`)

switch (config.persistence) {
    case 'MONGO':

        const dbName = config.databaseNAME
        mongoose.connect(config.databaseURL, { dbName} )
            .then(() => console.log('DB connected'))
            .catch((e) => {throw 'DB can not connected'})

        const { default: UserMongo } = await import('./mongo/users.dao.mongo.js')
        const { default: ProductMongo } = await import('./mongo/products.dao.mongo.js')
        const { default: CartMongo } = await import('./mongo/cart.dao.mongo.js')
        //const { default: TicketMongo } = await import('./mongo/tickets.dao.mongo.js')

        User = UserMongo
        Product = ProductMongo
        Cart = CartMongo
        //Ticket = TicketMongo

        break;

    // case 'FILE':
    //     const { default: UserFile} = await import('./file/user.dao.file.js')
    //     User = UserFile

    //     break;
    // default:
    //     throw 'Persistence is not defined'
}