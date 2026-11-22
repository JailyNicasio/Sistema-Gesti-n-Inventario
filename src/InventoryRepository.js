
class InventoryRepository {

    constructor() {
        this.products = new Map();
    }

    // Guardar un producto
    save(product) {
        this.products.set(product.sku, product);
        return product;
    }

    // Buscar un producto por su código
    findBySku(sku) {
        return this.products.get(sku) || null;
    }

    // Obtener todos los productos
    findAll() {
        return Array.from(this.products.values());
    }
}

module.exports = InventoryRepository;