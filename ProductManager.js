import fs from 'fs'

class ProductManager {
    #productos
    #path

    constructor(path) {
        this.#path = path;
        this.#productos = [];
        this.sigId = 1;
        this.sigCode = '1'
        this.cargarProductos();
    }

    cargarProductos() {
        const data = fs.readFile(this.#path, 'utf-8');
        this.#productos = JSON.parse(data);
        this.sigId = this.#productos.reduce((a, p) => Math.max(a, p.id), 0) + 1;
        this.sigCode = this.#productos.reduce((a, p) => Math.reduce(a, p.code), 0) + 1
    }

    guardarProductos() {
        const data = JSON.stringify(this.#productos, null, 4);
        fs.writeFile(this.#path, data)
    }

    addProduct(title, category, description, price, thumbnail, stock) {
        const producto = {
            id: this.sigId++,
            title,
            category,
            description,
            price,
            thumbnail,
            code: this.sigCode++,
            stock,
        }
        this.#productos.push(producto);

        this.guardarProductos();
        return producto;
    }

    getProducts() {
        return [...this.#productos];
    }

    getProductsById(id){
        const indexId = this.#productos.find(p => p.id === id);
        if (indexId) {
            console.log(indexId);
        } else {
            console.log('No se encontró el producto');
        }
    }

    updateProduct (id, data) {
        const index = this.#productos.findIndex(p => p.id === id);
        if (index !== -1) {
            const producto = {...this.#productos[index], ...data, id};
            this.#productos.splice(index, 1, producto);
            this.guardarProductos();
            return producto;
        }
    }

    deleteProduct(id) {
        const index = this.#productos.findIndex(p => p.id === id);
        if (index !== -1) {
            this.#productos.splice(index, 1);
            this.guardarProductos();
            return true;
        }
        return false;
    }



}

const manager = new ProductManager('products.json');

manager.addProduct('retrato rita', 'retrato', 'pintura al oleo', 18200, 'imagen', 3)
manager.addProduct('autoretrato', 'retrato', 'pintura al oleo', 20500, 'imagen', 2)
manager.addProduct('rita en sueño', 'pintura', 'dibujo con lapiz', 8500, 'imagen', 4)

console.log(manager.getProducts());






