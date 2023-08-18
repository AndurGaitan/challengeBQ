import dbManager from "./db.manager.js"

export default class ProductManager extends dbManager{
    constructor() {
        
    }
    create = async(data) => {
        const result = await this.set(data)
        return result
    }

    list = async () => {
        const result = await this.get()
        console.log('Esta es la lista', result)
        return result
    }

}

