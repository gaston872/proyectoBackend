class productManager {

    #products

    constructor() {
        this.#products = []
    }

    #generateID = () => {
        let id
        if (this.#products.length === 0) id = 1
        else id = this.#products[this.#products.length-1].id + 1
        return id
    }

    addProduct = (title, description, price, thumbnail, code, stock) => { 

        let id = this.#generateID()

        if (!title || !description || !price || !thumbnail || !code || !stock) {
            console.error('campos incompletos')
            return
        } else if (this.#products.find(prod => prod.code === code)) {
            console.error('Ya existe un producto con ese codigo')
            return
        }

    let newProduct = {
        id, title, description, price, thumbnail, code, stock
    }
        this.#products.push(newProduct)

    }

    getProducts = () => {
        return this.#products
    }

    getProductsById = (id) => {
        const encontrado = this.#products.find(prod => prod.id === id)
        if (!encontrado) throw new Error('No se encontro un producto con ese ID')
        return encontrado
    }

}

const productManager = new ProductManager()