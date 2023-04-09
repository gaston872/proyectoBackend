const express = require ('epress');
const path = require ('path');
const ProductManager = require ('./ProductManager');
const manager = new ProductManager('./products.js');

const app = express();
app.use(express.json());
const port = 8080;

app.get('/products', (req, res) =>{
    const products = manager.getProducts()
    res.json(products);
})

app.get('/products/:pid', (req, res) => {
    const id = parseInt(req.params.pid);
    const product = manager.getProductsById(id);
    if (product) { 
        res.json(product)   
    } else {
        res.status(404).json({ error: 'Producto no encontrado'})
    }
    
});

app.listen(8080, () => console.log('Server up'))