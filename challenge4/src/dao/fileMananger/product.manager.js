import FileManager from "./file.manager.js";

export default class ProductManager extends FileManager {

    constructor() {
        super('./products.json')
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