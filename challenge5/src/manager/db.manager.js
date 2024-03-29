import productsModel from "../models/product.model.js";

class dbManager {

    constructor() {
    }

    getNextId = (list) => {
        return (list.length == 0) ? 1 : list[list.length - 1].id + 1
    }

    get = async (req, res) => {
            try {
              const products = await productsCollections.find({});
              res.json(products);
              console.log(products)
            } catch (error) {
              res.status(500).json({ error: 'Error al obtener los productos' });
            }
          };
    
    getById = async (id) => {
        const data = await this.get()
        return data.find(d => d.id == id)
    }

    set = async (data) => {
        const list = await this.get()
        data.id = this.getNextId(list)
        list.push(data)
        return fs.promises.writeFile(this.filename, JSON.stringify(list))
    }

    update = async (data) => {
        const list = await this.get()
        const idx = list.findIndex(a => a.id == data.id)
        list[idx] = data
        
        return fs.promises.writeFile(this.filename, JSON.stringify(list))
    }

}

export default dbManager