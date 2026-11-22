
class InventoryService {

    constructor(repository, logger = null) {
        this.repository = repository;

        // Dependencia opcional para registrar eventos
        this.logger = logger || {
            info: () => {}
        };
    }

    // Registrar productos
    registerProduct(product) {

        const existingProduct =
            this.repository.findBySku(product.sku);

        if (existingProduct) {
            throw new Error('El producto ya existe');
        }

        this.repository.save(product);

        this.logger.info('Producto registrado');

        return product;
    }

    // Recibir mercancía
    receiveStock(sku, quantity) {

        const product = this.findProduct(sku);

        product.addStock(quantity);

        this.repository.save(product);

        this.logger.info('Existencias aumentadas');

        return product.stock;
    }

    // Vender productos
    sell(sku, quantity) {

        const product = this.findProduct(sku);

        product.removeStock(quantity);

        this.repository.save(product);

        this.logger.info('Venta realizada');

        return product.stock;
    }

    // Consultar existencias
    getStock(sku) {

        const product = this.findProduct(sku);

        return product.stock;
    }

    // Consultar todos los productos
    getAllProducts() {
        return this.repository.findAll();
    }

    // Buscar un producto
    findProduct(sku) {

        const product = this.repository.findBySku(sku);

        if (!product) {
            throw new Error('Producto no encontrado');
        }

        return product;
    }
}

module.exports = InventoryService;